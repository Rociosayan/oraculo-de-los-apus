/**
 * Ejemplos few-shot del método de la Maestra.
 * No son datos de entrenamiento ni fine-tuning.
 * Array vacío hasta que existan 3–5 lecturas reales de la autora.
 * Listo para ampliar hasta ~20.
 *
 * Forma de cada ejemplo:
 * {
 *   pregunta: string,
 *   tipoTirada: string,
 *   cartas: [{ nombre, posicion, orientacion: 'normal' | 'invertida' }],
 *   interpretacionMaestra: string,
 *   placeholder?: true  // si es true, no se envía al modelo
 * }
 */

export const MAESTRA_READING_EXAMPLES = []

export function selectMaestraExamples(spreadType, cardCount, limit = 3) {
  const usable = MAESTRA_READING_EXAMPLES.filter((example) => !example.placeholder)
  if (usable.length === 0) return []

  const scored = usable.map((example) => {
    let score = 0
    if (example.tipoTirada === spreadType) score += 3
    if (Array.isArray(example.cartas) && example.cartas.length === cardCount) score += 2
    return { example, score }
  })

  scored.sort((a, b) => b.score - a.score)
  return scored.slice(0, limit).map((item) => item.example)
}

export function examplesToMessages(examples) {
  return examples.flatMap((example) => {
    const cartas = example.cartas
      .map(
        (carta, i) =>
          `${i + 1}. ${carta.nombre} — ${carta.posicion} — ${carta.orientacion}`,
      )
      .join('\n')
    return [
      {
        role: 'user',
        content: `Ejemplo de tirada (solo para estilo; no la copies).\nPregunta: ${example.pregunta}\nTipo: ${example.tipoTirada}\nCartas:\n${cartas}`,
      },
      {
        role: 'assistant',
        content: example.interpretacionMaestra,
      },
    ]
  })
}
