import { canUseMaestraReading } from './canUseMaestraReading.mjs'
import { examplesToMessages, selectMaestraExamples } from './maestraReadingExamples.mjs'
import { buildMaestraSystemPrompt } from './maestraPrompt.mjs'

const ANDEAN_NAMES = [
  'El Mensajero',
  'El Oficiante',
  'Mama Quilla',
  'Pachamama',
  'El Apu',
  'El Amauta',
  'Yanantin',
  'Qhapaq Ñan',
  'Puma',
  'La Ermita Andina',
  'Pachakuti',
  'Ayni',
  'Uku Pacha',
  'Mallki',
  'Mama Qocha',
  'Supay',
  'Illapa',
  'Chaska',
  'Amaru',
  'Inti',
  'Kuntur',
  'Chakana',
]

function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = []
    req.on('data', (chunk) => chunks.push(chunk))
    req.on('end', () => {
      try {
        const raw = Buffer.concat(chunks).toString('utf8')
        resolve(raw ? JSON.parse(raw) : {})
      } catch {
        reject(new Error('INVALID_JSON'))
      }
    })
    req.on('error', reject)
  })
}

function sendJson(res, status, payload) {
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'X-Content-Type-Options': 'nosniff',
  })
  res.end(JSON.stringify(payload))
}

export function parseAndValidateRequest(body) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return { error: 'INVALID_BODY', status: 400 }
  }
  const question = typeof body.question === 'string' ? body.question : ''
  const spreadType = typeof body.spreadType === 'string' ? body.spreadType.trim() : ''
  if (!spreadType) return { error: 'MISSING_SPREAD', status: 400 }
  if (!Array.isArray(body.cards) || body.cards.length === 0) {
    return { error: 'MISSING_CARDS', status: 400 }
  }

  const cards = []
  for (const card of body.cards) {
    if (!card || typeof card.name !== 'string' || !card.name.trim()) {
      return { error: 'INVALID_CARD', status: 400 }
    }
    if (typeof card.position !== 'string' || !card.position.trim()) {
      return { error: 'INVALID_CARD', status: 400 }
    }
    if (card.orientation !== 'upright' && card.orientation !== 'reversed') {
      return { error: 'INVALID_ORIENTATION', status: 400 }
    }
    cards.push({
      name: card.name.trim(),
      position: card.position.trim(),
      orientation: card.orientation,
      arcanaRef: typeof card.arcanaRef === 'string' ? card.arcanaRef.trim() : undefined,
    })
  }

  const language = body.language === 'en' || body.language === 'fr' ? body.language : 'es'
  const priorContext =
    typeof body.priorContext === 'string' && body.priorContext.trim()
      ? body.priorContext.trim()
      : undefined

  return { value: { question: question.trim(), spreadType, cards, language, priorContext } }
}

function buildUserMessage(request) {
  const lines = request.cards.map((card, i) => {
    const orient = card.orientation === 'reversed' ? 'invertida' : 'al derecho'
    const arcana = card.arcanaRef ? ` (arcano de referencia: ${card.arcanaRef})` : ''
    return `${i + 1}. ${card.name}${arcana} — posición: ${card.position} — ${orient}`
  })

  const idioma =
    request.language === 'en' ? 'English' : request.language === 'fr' ? 'français' : 'español'

  let text = `Idioma de la respuesta: ${idioma}.
Tipo de tirada: ${request.spreadType}
Pregunta: ${request.question || '(sin pregunta escrita; orientación abierta)'}
Cartas en orden:
${lines.join('\n')}`

  if (request.priorContext) {
    text += `\n\nContexto previo de lecturas guardadas:\n${request.priorContext}`
  } else {
    text +=
      '\n\nNo hay contexto previo. No inventes lecturas anteriores.'
  }

  return text
}

function flattenNarrative(narrative) {
  return [narrative.oculto, narrative.respuesta, narrative.consejo]
    .filter((value) => typeof value === 'string')
    .join('\n')
}

function mentionsName(text, name) {
  const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  return new RegExp(`(?:^|[^\\p{L}])${escaped}(?:$|[^\\p{L}])`, 'iu').test(text)
}

export function findInventedAndeanNames(narrative, cards, priorContext) {
  const allowed = new Set()
  for (const card of cards) {
    allowed.add(card.name.toLowerCase())
    if (card.arcanaRef) allowed.add(card.arcanaRef.toLowerCase())
  }
  const prior = priorContext ?? ''
  const text = flattenNarrative(narrative)
  return ANDEAN_NAMES.filter((name) => {
    if (allowed.has(name.toLowerCase()) || mentionsName(prior, name)) return false
    return mentionsName(text, name)
  })
}

function normalizeNarrative(raw) {
  if (!raw || typeof raw !== 'object') return null
  const oculto = typeof raw.oculto === 'string' ? raw.oculto.trim() : ''
  const respuesta = typeof raw.respuesta === 'string' ? raw.respuesta.trim() : ''
  const consejo = typeof raw.consejo === 'string' ? raw.consejo.trim() : ''
  if (!oculto || !respuesta || !consejo) return null
  return { oculto, respuesta, consejo }
}

async function callOpenAi(messages) {
  const key = process.env.OPENAI_API_KEY
  const model = process.env.OPENAI_MODEL || 'gpt-4o-mini'
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model,
      temperature: 0.7,
      response_format: { type: 'json_object' },
      messages,
    }),
  })

  const payload = await response.json().catch(() => null)
  if (!response.ok) {
    const message = payload?.error?.message || 'OPENAI_ERROR'
    throw Object.assign(new Error(message), { status: response.status === 429 ? 429 : 502 })
  }

  const content = payload?.choices?.[0]?.message?.content
  if (typeof content !== 'string' || !content.trim()) {
    throw Object.assign(new Error('EMPTY_MODEL'), { status: 502 })
  }
  return JSON.parse(content)
}

export async function handleMaestra(req, res) {
  if (req.method === 'OPTIONS') {
    res.writeHead(204)
    return res.end()
  }
  if (req.method !== 'POST') {
    return sendJson(res, 405, { error: 'METHOD_NOT_ALLOWED' })
  }

  let body
  try {
    body = await readJsonBody(req)
  } catch {
    return sendJson(res, 400, { error: 'INVALID_JSON' })
  }

  const parsed = parseAndValidateRequest(body)
  if (parsed.error) return sendJson(res, parsed.status, { error: parsed.error })

  const gate = canUseMaestraReading({ req })
  if (!gate.ok) {
    return sendJson(res, gate.status, { error: gate.reason })
  }

  const request = parsed.value
  const examples = selectMaestraExamples(request.spreadType, request.cards.length)
  const messages = [
    { role: 'system', content: buildMaestraSystemPrompt() },
    ...examplesToMessages(examples),
    { role: 'user', content: buildUserMessage(request) },
  ]

  try {
    const raw = await callOpenAi(messages)
    const narrative = normalizeNarrative(raw)
    if (!narrative) {
      return sendJson(res, 502, { error: 'INVALID_MODEL_SHAPE' })
    }
    const invented = findInventedAndeanNames(
      narrative,
      request.cards,
      request.priorContext,
    )
    if (invented.length > 0) {
      return sendJson(res, 502, { error: 'INVENTED_CARDS', cards: invented })
    }
    return sendJson(res, 200, narrative)
  } catch (err) {
    const status = err.status === 429 ? 429 : 502
    return sendJson(res, status, { error: 'MODEL_UNAVAILABLE' })
  }
}
