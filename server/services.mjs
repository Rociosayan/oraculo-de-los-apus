const facts = {
  es: 'Lectura privada del Tarot de los Apus: US$80. Sesión individual por videollamada de 60 minutos, con lectura profunda, preguntas y resumen escrito posterior. Se reserva por WhatsApp; disponibilidad y pago se confirman personalmente. Grimorio digital de la Maestra de la Luz: precio de lanzamiento US$39, en preparación. Los fascículos y la colección estarán disponibles próximamente. No inventes otros precios, fechas ni formas de pago.',
  en: 'Private Tarot of the Apus reading: US$80. Individual 60-minute video session with an in-depth reading, questions and a written summary afterward. Book via WhatsApp; availability and payment are confirmed personally. Digital Maestra de la Luz grimoire: launch price US$39, in preparation. Booklets and collection are coming soon. Do not invent other prices, dates or payment methods.',
  fr: 'Tirage privé du Tarot des Apus : 80 $US. Séance individuelle de 60 minutes en visioconférence, questions et résumé écrit ensuite. Réservation sur WhatsApp ; disponibilité et paiement confirmés personnellement. Grimoire numérique de la Maestra de la Luz : prix de lancement 39 $US, en préparation. Fascicules et collection prochainement. Ne pas inventer d’autres prix, dates ou modalités de paiement.',
}

const fallback = {
  es: 'La lectura privada cuesta US$80. Es una videollamada individual de 60 minutos, con preguntas y resumen escrito. El grimorio digital está en preparación y tiene un precio de lanzamiento de US$39. Para disponibilidad, reserva o pago, escríbenos por WhatsApp.',
  en: 'The private reading costs US$80. It is an individual 60-minute video call with questions and a written summary. The digital grimoire is in preparation at a US$39 launch price. Please use WhatsApp for availability, booking and payment details.',
  fr: 'Le tirage privé coûte 80 $US. Il s’agit d’une visioconférence individuelle de 60 minutes avec questions et résumé écrit. Le grimoire numérique est en préparation au prix de lancement de 39 $US. Contactez-nous sur WhatsApp pour la disponibilité, la réservation et le paiement.',
}

export async function handleServices(req, res) {
  const send = (status, payload) => {
    res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'X-Content-Type-Options': 'nosniff' })
    res.end(JSON.stringify(payload))
  }
  if (req.method !== 'POST') return send(405, { error: 'METHOD_NOT_ALLOWED' })
  try {
    let raw = ''
    for await (const chunk of req) {
      raw += chunk.toString()
      if (raw.length > 4000) return send(413, { error: 'TOO_LARGE' })
    }
    const body = JSON.parse(raw)
    const question = typeof body.question === 'string' ? body.question.trim() : ''
    if (!question || question.length > 500) return send(400, { error: 'INVALID_QUESTION' })
    const language = ['es', 'en', 'fr'].includes(body.language) ? body.language : 'es'
    if (!process.env.OPENAI_API_KEY) return send(200, { answer: fallback[language], mode: 'information' })
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
        temperature: 0.2,
        max_tokens: 220,
        messages: [
          { role: 'system', content: `You answer questions about this business in the same language as the user. Use ONLY these facts. If a detail is absent, refer the person to WhatsApp. Do not claim to make bookings or payments. ${facts[language]}` },
          { role: 'user', content: question },
        ],
      }),
    })
    if (!response.ok) return send(502, { error: 'AI_UNAVAILABLE' })
    const data = await response.json()
    const answer = data?.choices?.[0]?.message?.content?.trim()
    if (!answer) return send(502, { error: 'EMPTY_ANSWER' })
    return send(200, { answer, mode: 'ai' })
  } catch {
    return send(400, { error: 'INVALID_REQUEST' })
  }
}
