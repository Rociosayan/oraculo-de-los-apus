import { describe, expect, it } from 'vitest'
import { SPREADS, getSpreadById } from '../data/spreads'
import { ANDEAN_CARDS, getCardById } from '../data/cards'
import { drawReading } from './reading'
import {
  ADVERTENCIA_RELOJ,
  contarPalabras,
  extraerEnfoqueConsulta,
  generarLectura,
} from './interpretacion'
import type { DrawnCard, ReadingNarrative, SpreadDefinition } from '../types'

/* ============================================================
 * Utilidades de prueba
 * ============================================================ */

function spread(id: string): SpreadDefinition {
  const s = getSpreadById(id)
  if (!s) throw new Error(`Tirada no encontrada: ${id}`)
  return s
}

/** Construye una tirada con cartas elegidas a mano (para forzar escenarios). */
function tiradaForzada(
  spreadId: string,
  ids: number[],
  reversed: boolean[] = [],
): DrawnCard[] {
  const s = spread(spreadId)
  if (ids.length !== s.cardCount) {
    throw new Error(`Se esperaban ${s.cardCount} cartas para ${spreadId}`)
  }
  return s.positions.map((position, i) => ({
    card: getCardById(ids[i])!,
    position,
    reversed: reversed[i] ?? false,
    revealed: true,
  }))
}

function textoCompleto(n: ReadingNarrative): string {
  return [...n.relato, n.oculto, n.respuesta, n.consejo].join(' ')
}

const FRASES_PROHIBIDAS = [
  'te hicieron brujería',
  'te hicieron brujeria',
  'alguien te está trabajando',
  'alguien te esta trabajando',
  'es culpable',
  'esta persona es culpable',
]

/* ============================================================
 * Cantidad y orden de cartas por tirada
 * ============================================================ */

describe('cantidades exactas de cartas por tirada', () => {
  const esperado: Record<string, number> = {
    'carta-del-dia': 1,
    'una-carta': 1,
    'tres-cartas': 3,
    amor: 7,
    trabajo: 7,
    'camino-siete': 7,
    'reloj-sombras': 12,
  }

  it('define las 8 tiradas', () => {
    expect(SPREADS).toHaveLength(8)
  })

  it('la lectura de acción usa intención, condicionante y acción probable', () => {
    const s = spread('accion-tres')
    expect(s.cardCount).toBe(3)
    expect(s.positions.map((p) => p.lens)).toEqual(['intencion', 'bloqueo', 'accion'])
  })

  for (const [id, n] of Object.entries(esperado)) {
    it(`${id} extrae exactamente ${n} carta(s)`, () => {
      const s = spread(id)
      expect(s.cardCount).toBe(n)
      expect(s.positions).toHaveLength(n)
      const drawn = drawReading(s, ANDEAN_CARDS)
      expect(drawn).toHaveLength(n)
    })
  }

  it('amor nunca funciona con solo tres cartas', () => {
    expect(spread('amor').cardCount).toBe(7)
    expect(spread('trabajo').cardCount).toBe(7)
  })

  it('el reloj de las sombras extrae 12 cartas sin repetir', () => {
    for (let i = 0; i < 30; i++) {
      const drawn = drawReading(spread('reloj-sombras'), ANDEAN_CARDS)
      const ids = drawn.map((d) => d.card.id)
      expect(new Set(ids).size).toBe(12)
    }
  })

  it('las cartas salen en el orden de las posiciones de la tirada', () => {
    for (const s of SPREADS) {
      const drawn = drawReading(s, ANDEAN_CARDS)
      drawn.forEach((d, i) => {
        expect(d.position.id).toBe(s.positions[i].id)
      })
    }
  })

  it('las posiciones de amor cubren las siete dimensiones pedidas', () => {
    const lentes = spread('amor').positions.map((p) => p.lens)
    expect(lentes).toEqual([
      'sentimiento-propio',
      'sentimiento-ajeno',
      'mostrado',
      'oculto',
      'bloqueo',
      'accion',
      'tendencia',
    ])
  })

  it('el reloj tiene las doce posiciones en orden horario', () => {
    const lentes = spread('reloj-sombras').positions.map((p) => p.lens)
    expect(lentes).toEqual([
      'energia',
      'origen-visible',
      'origen-oculto',
      'entorno',
      'persona',
      'intencion',
      'bloqueo',
      'miedo',
      'evidencia-favor',
      'evidencia-contra',
      'proteccion',
      'sintesis',
    ])
  })
})

describe('preguntas de acción con horizonte inmediato', () => {
  it('«¿Vendrá hoy?» detecta otra persona y acción', () => {
    const enfoque = extraerEnfoqueConsulta('¿Vendrá hoy?')
    expect(enfoque.sujetoPrincipal).toBe('otra_persona')
    expect(enfoque.objetoDeLaPregunta).toBe('acciones')
    expect(enfoque.personaGramatical).toBe('el_ella')
  })

  it('Ayni invertida responde sobre esa persona sin certeza absoluta', () => {
    const n = generarLectura(
      spread('carta-del-dia'),
      '¿Vendrá hoy?',
      tiradaForzada('carta-del-dia', [11], [true]),
    )
    const texto = textoCompleto(n).toLowerCase()
    expect(n.titulo).toBe('Bajo el signo de Ayni: ¿se concretará el encuentro hoy?')
    expect(n.respuesta).toContain('probablemente no hoy')
    expect(n.respuesta).toContain('tendencia y no una certeza')
    expect(texto).toContain('esa persona')
    expect(texto).not.toContain('tu deuda emocional')
    expect(texto).not.toContain('lo que hoy pide tu atención')
    expect(texto).not.toMatch(/\btú debes\b|\btu próxima decisión\b|\bqueda de tu lado\b/)
  })

  it('la tirada de acción distingue intención, freno y conducta', () => {
    const n = generarLectura(
      spread('accion-tres'),
      '¿Vendrá hoy?',
      tiradaForzada('accion-tres', [17, 4, 6]),
    )
    const texto = textoCompleto(n)
    expect(texto).toContain('intención actual')
    expect(texto).toContain('carta central y de giro')
    expect(texto).toContain('acción más probable')
    expect(texto).toMatch(/claridad (alto|medio|bajo)/)
  })
})

/* ============================================================
 * Profundidad de los datos de las 22 cartas
 * ============================================================ */

describe('datos profundos de las 22 cartas', () => {
  it('hay 22 cartas', () => {
    expect(ANDEAN_CARDS).toHaveLength(22)
  })

  for (const card of ANDEAN_CARDS) {
    it(`carta ${card.id} (${card.name}) cumple los mínimos de contenido`, () => {
      expect(contarPalabras(card.significadoGeneral)).toBeGreaterThanOrEqual(100)
      expect(contarPalabras(card.significadoAmor)).toBeGreaterThanOrEqual(100)
      expect(contarPalabras(card.significadoTrabajoDinero)).toBeGreaterThanOrEqual(100)
      expect(contarPalabras(card.significadoEspiritual)).toBeGreaterThanOrEqual(80)
      expect(contarPalabras(card.significadoSombra)).toBeGreaterThanOrEqual(80)
      expect(contarPalabras(card.consejoPractico)).toBeGreaterThanOrEqual(55)
      expect(card.palabrasClave.length).toBeGreaterThanOrEqual(5)
      expect(card.palabrasClave.length).toBeLessThanOrEqual(8)
      expect(card.correspondenciaArcano.length).toBeGreaterThan(0)
      expect(card.simbolosAndinos.length).toBeGreaterThanOrEqual(3)
      expect(card.preguntasDeReflexion.length).toBeGreaterThanOrEqual(3)
      expect(card.ejes.length).toBeGreaterThan(0)
      for (const clave of Object.keys(card.frases) as (keyof typeof card.frases)[]) {
        expect(card.frases[clave].length).toBeGreaterThan(10)
      }
    })
  }

  it('los significados no se repiten entre cartas', () => {
    const generales = new Set(ANDEAN_CARDS.map((c) => c.significadoGeneral))
    expect(generales.size).toBe(22)
    const amores = new Set(ANDEAN_CARDS.map((c) => c.significadoAmor))
    expect(amores.size).toBe(22)
  })
})

/* ============================================================
 * Motor de interpretación encadenada
 * ============================================================ */

describe('interpretación encadenada', () => {
  it('menciona todas las cartas extraídas (todas las tiradas, varias corridas)', () => {
    for (const s of SPREADS) {
      for (let corrida = 0; corrida < 5; corrida++) {
        const drawn = drawReading(s, ANDEAN_CARDS)
        const n = generarLectura(s, '¿Qué necesito saber?', drawn)
        const texto = textoCompleto(n)
        for (const d of drawn) {
          expect(texto).toContain(d.card.name)
        }
      }
    }
  })

  it('cumple la extensión mínima por número de cartas', () => {
    const minimos: [string, number][] = [
      ['carta-del-dia', 180],
      ['una-carta', 180],
      ['tres-cartas', 350],
      ['amor', 650],
      ['trabajo', 650],
      ['camino-siete', 650],
      ['reloj-sombras', 900],
    ]
    for (const [id, minimo] of minimos) {
      for (let corrida = 0; corrida < 5; corrida++) {
        const s = spread(id)
        const drawn = drawReading(s, ANDEAN_CARDS)
        const n = generarLectura(s, '¿Cómo avanzará esta situación que consulto?', drawn)
        expect(contarPalabras(textoCompleto(n))).toBeGreaterThanOrEqual(minimo)
      }
    }
  })

  it('la síntesis no es una simple suma de significados', () => {
    const s = spread('camino-siete')
    const drawn = drawReading(s, ANDEAN_CARDS)
    const n = generarLectura(s, '¿Debo cambiar de rumbo?', drawn)
    const texto = textoCompleto(n)

    const sumaSimple = drawn.map((d) => d.card.significadoGeneral).join(' ')
    expect(texto).not.toBe(sumaSimple)

    // Debe haber conectores interpretativos entre cartas
    const conectores = [
      'se prolonga',
      'confirma',
      'contradic',
      'matiz',
      'tira hacia el lado opuesto',
      'insisten en una sola dirección',
      'capa',
      'cambia de tono',
      'fuerza contraria',
      'Sobre ese fondo',
    ]
    const usados = conectores.filter((c) => texto.includes(c))
    expect(usados.length).toBeGreaterThanOrEqual(2)

    // Y las secciones pedidas deben existir
    expect(n.titulo.length).toBeGreaterThan(5)
    expect(n.relato.length).toBeGreaterThanOrEqual(3)
    expect(n.oculto.length).toBeGreaterThan(40)
    expect(n.respuesta.length).toBeGreaterThan(40)
    expect(n.consejo.length).toBeGreaterThan(40)
    expect(n.advertencia.length).toBeGreaterThan(20)
  })

  it('dos lecturas con cartas distintas no producen el mismo texto', () => {
    const s = spread('amor')
    const a = generarLectura(
      s,
      '¿Qué siente por mí?',
      tiradaForzada('amor', [0, 2, 6, 12, 4, 7, 17]),
    )
    const b = generarLectura(
      s,
      '¿Qué siente por mí?',
      tiradaForzada('amor', [15, 9, 8, 18, 16, 13, 10]),
    )
    expect(textoCompleto(a)).not.toBe(textoCompleto(b))
    // Ni siquiera el relato debe parecerse: comparten menos del 60 % de oraciones
    const oracionesA = new Set(a.relato.join(' ').split('. '))
    const oracionesB = b.relato.join(' ').split('. ')
    const compartidas = oracionesB.filter((o) => oracionesA.has(o)).length
    expect(compartidas / oracionesB.length).toBeLessThan(0.6)
  })

  it('la misma tirada produce el mismo texto (estable para guardar)', () => {
    const cards = tiradaForzada('tres-cartas', [1, 10, 19])
    const s = spread('tres-cartas')
    const a = generarLectura(s, '¿Prosperará mi proyecto?', cards)
    const b = generarLectura(s, '¿Prosperará mi proyecto?', cards)
    expect(textoCompleto(a)).toBe(textoCompleto(b))
  })

  it('en amor diferencia sentimientos de acciones', () => {
    const n = generarLectura(
      spread('amor'),
      '¿Volveremos a estar juntos?',
      tiradaForzada('amor', [3, 4, 8, 12, 15, 7, 17]),
    )
    const texto = textoCompleto(n)
    expect(texto.includes('lo que se siente') || texto.includes('sentimiento')).toBe(true)
    // afecto + defensas => debe nombrar la resistencia
    expect(
      texto.includes('resistencia') ||
        texto.includes('defensiv') ||
        texto.includes('murallas') ||
        texto.includes('guardia'),
    ).toBe(true)
  })
})

describe('prioridad del sujeto de la pregunta', () => {
  const pregunta =
    '¿Qué movimiento hará esa persona hacia mí? Quiero que respondas con respecto a él, no a mí.'
  const cartas = tiradaForzada(
    'amor',
    [0, 8, 9, 17, 4, 6, 21],
    [false, true, false, false, false, false, true],
  )

  it('extrae obligatoriamente el enfoque y conserva la restricción explícita', () => {
    const enfoque = extraerEnfoqueConsulta(pregunta)
    expect(enfoque.preguntaOriginal).toBe(pregunta)
    expect(enfoque.sujetoPrincipal).toBe('otra_persona')
    expect(enfoque.objetoDeLaPregunta).toBe('acciones')
    expect(enfoque.personaGramatical).toBe('el_ella')
    expect(enfoque.restriccionesExplicitas.join(' ').toLowerCase()).toContain('no a mí')
  })

  it('mantiene a él como sujeto predominante y no diagnostica al consultante', () => {
    const n = generarLectura(spread('amor'), pregunta, cartas)
    const texto = textoCompleto(n).toLowerCase()
    const mencionesAjeno = (texto.match(/él|esa persona/g) ?? []).length
    const mencionesConsultante = (texto.match(/\btú\b|\bdebes\b|\bdecidirás\b/g) ?? []).length
    expect(mencionesAjeno).toBeGreaterThan(8)
    expect(mencionesAjeno).toBeGreaterThan(mencionesConsultante * 3)
    expect(texto).not.toContain('depende de tu próxima decisión')
    expect(texto).not.toContain('queda de tu lado')
  })

  it('mantiene el consejo breve y sin órdenes dirigidas al consultante', () => {
    const n = generarLectura(spread('amor'), pregunta, cartas)
    expect(contarPalabras(n.consejo)).toBeLessThanOrEqual(30)
    expect(n.consejo.toLowerCase()).not.toMatch(/\btú debes\b|\bdecidirás\b|\bqueda de tu lado\b/)
    expect(contarPalabras(n.consejo) / contarPalabras(textoCompleto(n))).toBeLessThan(0.15)
  })

  it('la respuesta final menciona la carta de acción y la de tendencia', () => {
    const n = generarLectura(spread('amor'), pregunta, cartas)
    expect(n.respuesta).toContain('Yanantin')
    expect(n.respuesta).toContain('Chakana invertida')
    expect(n.respuesta).toContain('contacto, conversación, encuentro o reconciliación')
    expect(n.respuesta).toContain('no equivale todavía a una resolución completa ni a un compromiso firme')
  })

  it('distingue sentimiento, intención y conducta en el orden pedido', () => {
    const n = generarLectura(spread('amor'), pregunta, cartas)
    const texto = n.relato.join(' ')
    expect(texto).toContain('impulso emocional')
    expect(texto).toContain('intenta controlar u ocultar')
    expect(texto).toContain('Hacia afuera')
    expect(texto).toContain('obstáculo')
    expect(texto).toContain('La acción concreta')
    expect(texto).toContain('La carta final')
    expect(texto.indexOf('impulso emocional')).toBeLessThan(texto.indexOf('intenta controlar u ocultar'))
    expect(texto.indexOf('intenta controlar u ocultar')).toBeLessThan(texto.indexOf('Hacia afuera'))
    expect(texto.indexOf('Hacia afuera')).toBeLessThan(texto.indexOf('obstáculo'))
    expect(texto.indexOf('obstáculo')).toBeLessThan(texto.indexOf('La acción concreta'))
  })

  it('aplica los seis significados específicos sin confundir acción con compromiso', () => {
    const n = generarLectura(spread('amor'), pregunta, cartas)
    const texto = textoCompleto(n)
    expect(texto).toContain('emoción o pasión contenida')
    expect(texto).toContain('distancia exterior, observación, repliegue y demora')
    expect(texto).toContain('esperanza y deseo oculto de recomponer la conexión')
    expect(texto).toContain('orgullo, rigidez, control')
    expect(texto).toContain('habla de contacto, no de compromiso automático')
    expect(texto).toContain('movimiento incompleto y sin cierre definitivo')
  })
})

/* ============================================================
 * El reloj de las sombras: reglas de detección
 * ============================================================ */

describe('el reloj de las sombras', () => {
  // Cartas neutras/luminosas para completar el círculo
  const relleno = [0, 1, 5, 6, 7, 10, 13, 14, 16]

  it('con tres indicadoras anuncia concentración simbólica alta', () => {
    // Supay(15), Uku Pacha(12) y Amaru(18) presentes
    const ids = [15, 12, 18, ...relleno].slice(0, 12)
    const n = generarLectura(
      spread('reloj-sombras'),
      '¿Me hicieron un daño?',
      tiradaForzada('reloj-sombras', ids),
    )
    const texto = textoCompleto(n)
    expect(texto).toContain(
      'concentración simbólica alta de cartas asociadas con sombras e influencias ocultas',
    )
    expect(n.advertencia).toBe(ADVERTENCIA_RELOJ)
  })

  it('con dos indicadoras anuncia presencia simbólica moderada', () => {
    const ids = [15, 12, ...relleno, 19].slice(0, 12)
    const n = generarLectura(
      spread('reloj-sombras'),
      '¿Hay envidia a mi alrededor?',
      tiradaForzada('reloj-sombras', ids),
    )
    expect(textoCompleto(n)).toContain(
      'presencia simbólica moderada de influencias ocultas',
    )
  })

  it('con una sola indicadora no concluye influencia oculta', () => {
    const ids = [15, ...relleno, 19, 17].slice(0, 12)
    const n = generarLectura(
      spread('reloj-sombras'),
      '¿Qué me está pasando?',
      tiradaForzada('reloj-sombras', ids),
    )
    const texto = textoCompleto(n)
    expect(texto).toContain('no permite concluir')
    expect(texto).not.toContain('concentración simbólica alta')
    expect(texto).not.toContain('presencia simbólica moderada')
  })

  it('Supay en la posición 8 se lee como miedo o sugestión', () => {
    // Colocamos a Supay en el índice 7 (posición 8, «miedo»)
    const ids = [0, 1, 5, 6, 7, 10, 13, 15, 14, 16, 19, 21]
    const n = generarLectura(
      spread('reloj-sombras'),
      '¿Alguien me quiere mal?',
      tiradaForzada('reloj-sombras', ids),
    )
    const texto = textoCompleto(n)
    expect(texto.includes('sugestión') || texto.includes('obsesión')).toBe(true)
  })

  it('las cartas protectoras reducen la intensidad de la advertencia', () => {
    // Tres indicadoras + varias protectoras (Inti, Chaska, Kuntur, Pachamama)
    const ids = [15, 12, 18, 19, 17, 20, 3, 0, 1, 5, 6, 7]
    const n = generarLectura(
      spread('reloj-sombras'),
      '¿Estoy cargada de algo negativo?',
      tiradaForzada('reloj-sombras', ids),
    )
    const texto = textoCompleto(n)
    expect(texto).toContain('reduce la intensidad')
  })

  it('nunca afirma la brujería como hecho, en ningún escenario', () => {
    const s = spread('reloj-sombras')
    // Escenarios forzados extremos + corridas aleatorias
    const escenarios: DrawnCard[][] = [
      tiradaForzada('reloj-sombras', [15, 12, 18, 0, 1, 5, 6, 7, 10, 13, 14, 16]),
      tiradaForzada(
        'reloj-sombras',
        [15, 12, 18, 0, 1, 5, 6, 7, 10, 13, 14, 16],
        Array(12).fill(true),
      ),
    ]
    for (let i = 0; i < 40; i++) escenarios.push(drawReading(s, ANDEAN_CARDS))

    for (const cards of escenarios) {
      const n = generarLectura(s, '¿Me hicieron brujería?', cards)
      const texto = textoCompleto(n).toLowerCase()
      // La pregunta citada puede contener la palabra; lo prohibido es afirmarlo
      for (const frase of FRASES_PROHIBIDAS) {
        expect(texto).not.toContain(frase)
      }
      expect(n.advertencia).toBe(ADVERTENCIA_RELOJ)
    }
  })

  it('menciona la incertidumbre cuando las evidencias 9 y 10 se contradicen', () => {
    // Posición 9 (evidencia a favor): Supay (polaridad -2)
    // Posición 10 (evidencia en contra): Inti (polaridad +2) => contradicción
    const ids = [0, 1, 5, 6, 7, 10, 13, 14, 15, 19, 17, 21]
    const n = generarLectura(
      spread('reloj-sombras'),
      '¿Hay una influencia externa sobre mí?',
      tiradaForzada('reloj-sombras', ids),
    )
    expect(textoCompleto(n)).toContain('incertidumbre')
  })
})
