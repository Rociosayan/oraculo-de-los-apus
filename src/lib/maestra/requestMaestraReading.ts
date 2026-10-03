import type { DrawnCard, MaestraNarrative, MaestraReadingRequest, ReadingResult } from '../../types'

export class MaestraRequestError extends Error {
  readonly code: string
  readonly status: number

  constructor(code: string, status: number) {
    super(code)
    this.code = code
    this.status = status
  }
}

export function buildPriorContext(entries: ReadingResult[]): string | undefined {
  if (entries.length === 0) return undefined
  return entries
    .slice(0, 5)
    .map((entry) => {
      const cards = entry.cards
        .map((drawn) => {
          const orient = drawn.reversed ? 'invertida' : 'al derecho'
          return `${drawn.card.name} (${orient}, ${drawn.position.label})`
        })
        .join('; ')
      const pregunta = entry.question.trim() || '(sin pregunta)'
      return `${entry.spreadTitle}: ${pregunta}. Cartas: ${cards}.`
    })
    .join('\n')
}

export function toMaestraRequest(
  question: string,
  spreadType: string,
  drawn: DrawnCard[],
  language: NonNullable<MaestraReadingRequest['language']>,
  priorContext?: string,
): MaestraReadingRequest {
  return {
    question: question.trim(),
    spreadType,
    language,
    priorContext,
    cards: drawn.map((item) => ({
      name: item.card.name,
      position: item.position.label,
      orientation: item.reversed ? 'reversed' : 'upright',
      arcanaRef: item.card.arcanaRef,
    })),
  }
}

export async function requestMaestraReading(
  payload: MaestraReadingRequest,
): Promise<MaestraNarrative> {
  const response = await fetch('/api/maestra', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  const data = (await response.json().catch(() => null)) as
    | MaestraNarrative
    | { error?: string }
    | null

  if (!response.ok) {
    const code =
      data && typeof data === 'object' && 'error' in data && data.error
        ? data.error
        : 'MODEL_UNAVAILABLE'
    throw new MaestraRequestError(code, response.status)
  }

  if (
    !data ||
    typeof data !== 'object' ||
    !('oculto' in data) ||
    !('respuesta' in data) ||
    !('consejo' in data)
  ) {
    throw new MaestraRequestError('INVALID_MODEL_SHAPE', 502)
  }

  return data
}
