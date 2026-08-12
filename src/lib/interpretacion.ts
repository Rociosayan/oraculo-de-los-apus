/**
 * Motor de interpretación encadenada del Oráculo de los Apus.
 *
 * No concatena significados sueltos: construye una sola narración donde cada
 * carta modifica, amplía, confirma o contradice a la anterior. El texto se
 * genera con plantillas narrativas combinatorias (sin IA) alimentadas por:
 *   - la pregunta del usuario y el tema detectado,
 *   - la lente de cada posición (qué dimensión lee),
 *   - las frases núcleo y los significados contextuales de cada carta,
 *   - relaciones entre cartas consecutivas (refuerzo / contradicción / matiz),
 *   - acumulación de ejes simbólicos y progresión de la tirada.
 *
 * Un generador pseudoaleatorio sembrado con las cartas y la pregunta hace que
 * dos lecturas distintas nunca produzcan prácticamente el mismo texto, pero
 * que la misma tirada sea estable.
 */

import type {
  CardPhrases,
  DrawnCard,
  EnfoqueConsulta,
  LinkRelation,
  PositionLens,
  ReadingNarrative,
  SpreadDefinition,
  SymbolAxis,
  ThemeId,
} from '../types'

/* ============================================================
 * Utilidades
 * ============================================================ */

function mulberry32(seed: number): () => number {
  let a = seed >>> 0
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function seedFrom(cards: DrawnCard[], question: string): number {
  let seed = 2166136261
  cards.forEach((d, i) => {
    seed = Math.imul(seed ^ (d.card.id * 31 + i + (d.reversed ? 97 : 13)), 16777619)
  })
  for (let i = 0; i < question.length; i++) {
    seed = Math.imul(seed ^ question.charCodeAt(i), 16777619)
  }
  return seed >>> 0
}

function pick<T>(rng: () => number, items: T[]): T {
  return items[Math.floor(rng() * items.length)]
}

function capitalizar(t: string): string {
  return t.charAt(0).toUpperCase() + t.slice(1)
}

function listar(items: string[]): string {
  if (items.length === 0) return ''
  if (items.length === 1) return items[0]
  const ultimo = items[items.length - 1]
  const conjuncion = /^[ií]/i.test(ultimo) ? 'e' : 'y'
  return `${items.slice(0, -1).join(', ')} ${conjuncion} ${ultimo}`
}

function oraciones(texto: string): string[] {
  return texto
    .split(/(?<=\.)\s+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0)
}

export function contarPalabras(texto: string): number {
  return texto.split(/\s+/).filter(Boolean).length
}

function normalizar(texto: string): string {
  return texto
    .toLocaleLowerCase('es')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
}

/** Extrae el sujeto y el objeto antes de interpretar cualquier carta. */
export function extraerEnfoqueConsulta(preguntaOriginal: string): EnfoqueConsulta {
  const pregunta = preguntaOriginal.trim()
  const q = normalizar(pregunta)
  const restriccionesExplicitas: string[] = []
  const patronesRestriccion = [
    /(?:respond(?:e|as)|habla|enf[oó]cate|c[eé]ntrate)[^.!?]*(?:respecto a|sobre|en) (?:[ée]l|ella|esa persona|esa mujer|ese hombre)[^.!?]*/gi,
    /no (?:a|sobre|de|respecto a|acerca de|hables de|hablar de) m[íi]\b[^.!?]*/gi,
    /no (?:me|a m[íi]) (?:analices|aconsejes|interpretes|diagnostiques)[^.!?]*/gi,
  ]
  for (const patron of patronesRestriccion) {
    for (const coincidencia of pregunta.matchAll(patron)) {
      const texto = coincidencia[0].trim()
      if (texto && !restriccionesExplicitas.includes(texto)) restriccionesExplicitas.push(texto)
    }
  }

  const accionConSujetoImplicito = /\b(vendra|me buscara|me escribira|se acercara|que hara|que movimiento hara|contactara|llamara)\b/.test(q)
  const mencionaOtra = /\b(el|ella|esa persona|ese hombre|esa mujer|mi ex|mi pareja|esa pareja)\b/.test(q) || accionConSujetoImplicito
  const ordenaOtra = /(?:respecto a|sobre|enfocate en|centrate en) (?:el|ella|esa persona)|no (?:a|sobre|de|respecto a|hables de) mi/.test(q)
  const mencionaAmbos = /\b(ambos|los dos|nosotros|nuestro vinculo|nuestra relacion)\b/.test(q)
  const mencionaVinculo = /\b(vinculo|relacion|entre nosotros|reconciliacion)\b/.test(q)

  let objetoDeLaPregunta: EnfoqueConsulta['objetoDeLaPregunta'] = 'otro'
  if (/\b(que hara|que movimiento|realizara|vendra|me buscara|me escribira|se acercara|contactara|llamara|actuara)\b/.test(q)) {
    objetoDeLaPregunta = 'acciones'
  } else if (/\b(que siente|sentimientos?|emociones?|me ama|me quiere)\b/.test(q)) {
    objetoDeLaPregunta = 'sentimientos'
  } else if (/\b(que piensa|pensamientos?|idea de mi|opina)\b/.test(q)) {
    objetoDeLaPregunta = 'pensamientos'
  } else if (/\b(que quiere|intenciones?|pretende|planea)\b/.test(q)) {
    objetoDeLaPregunta = 'intenciones'
  } else if (/\b(resultado|terminara|desenlace|como acabara|que pasara)\b/.test(q)) {
    objetoDeLaPregunta = 'resultado'
  }

  let sujetoPrincipal: EnfoqueConsulta['sujetoPrincipal'] = 'situacion'
  if (ordenaOtra || (mencionaOtra && ['acciones', 'sentimientos', 'pensamientos', 'intenciones'].includes(objetoDeLaPregunta))) {
    sujetoPrincipal = 'otra_persona'
  } else if (mencionaAmbos || mencionaVinculo) {
    sujetoPrincipal = 'vinculo'
  } else if (/\b(yo|mi|mis|conmigo|para mi|debo|me conviene)\b/.test(q)) {
    sujetoPrincipal = 'consultante'
  }

  return {
    preguntaOriginal: pregunta,
    sujetoPrincipal,
    objetoDeLaPregunta,
    personaGramatical:
      sujetoPrincipal === 'otra_persona'
        ? 'el_ella'
        : sujetoPrincipal === 'vinculo'
          ? 'ambos'
          : 'tu',
    restriccionesExplicitas,
  }
}

/** Polaridad efectiva: la inversión tuerce la energía de la carta. */
function polaridadDe(d: DrawnCard): number {
  const p = d.card.polaridad
  if (!d.reversed) return p
  return p === 0 ? -1 : -p
}

/* ============================================================
 * Tema de la consulta
 * ============================================================ */

const PALABRAS_TEMA: [ThemeId, string[]][] = [
  [
    'influencias-ocultas',
    ['brujer', 'hechizo', 'amarre', 'mal de ojo', 'envidia', 'daño', 'trabajado', 'energía negativa', 'energia negativa', 'maldición', 'maldicion'],
  ],
  [
    'reconciliacion',
    ['volver con', 'volveremos', 'regresar', 'mi ex', 'reconcili', 'retomar', 'perdonar', 'segunda oportunidad'],
  ],
  [
    'amor',
    ['amor', 'pareja', 'relación', 'relacion', 'siente por mí', 'siente por mi', 'novi', 'espos', 'me quiere', 'me ama', 'enamora', 'vínculo', 'vinculo', 'matrimonio'],
  ],
  [
    'dinero',
    ['dinero', 'plata', 'deuda', 'ahorro', 'inversión', 'inversion', 'económic', 'economic', 'sueldo', 'pagar', 'cobrar'],
  ],
  [
    'trabajo',
    ['trabajo', 'empleo', 'jefe', 'oficina', 'negocio', 'emprend', 'carrera', 'ascenso', 'proyecto', 'renuncia', 'contrat'],
  ],
  [
    'decision',
    ['decidir', 'decisión', 'decision', 'elegir', 'elección', 'eleccion', 'qué camino', 'que camino', 'opción', 'opcion', 'debo o no', 'me conviene'],
  ],
  [
    'crecimiento',
    ['crecer', 'crecimiento', 'propósito', 'proposito', 'sanar', 'encontrarme', 'mi camino', 'paz', 'miedo a', 'seguridad en mí', 'seguridad en mi'],
  ],
]

export function detectarTema(pregunta: string, spread: SpreadDefinition): ThemeId {
  const q = pregunta.toLowerCase()
  for (const [tema, palabras] of PALABRAS_TEMA) {
    if (palabras.some((p) => q.includes(p))) return tema
  }
  if (spread.id === 'amor') return 'amor'
  if (spread.id === 'trabajo') return 'trabajo'
  if (spread.id === 'reloj-sombras') return 'influencias-ocultas'
  return 'general'
}

const NOMBRE_TEMA: Record<ThemeId, string> = {
  amor: 'el amor y los vínculos',
  reconciliacion: 'una posible reconciliación',
  trabajo: 'el trabajo y las decisiones',
  dinero: 'el dinero y los recursos',
  decision: 'una decisión pendiente',
  crecimiento: 'tu crecimiento personal',
  'influencias-ocultas': 'las influencias ocultas que rodean la situación',
  general: 'lo que hoy pide tu atención',
}

/** Qué significado contextual alimenta las elaboraciones según el tema. */
function significadoContextual(d: DrawnCard, tema: ThemeId): string {
  if (d.reversed) return d.card.significadoSombra
  switch (tema) {
    case 'amor':
    case 'reconciliacion':
      return d.card.significadoAmor
    case 'trabajo':
    case 'dinero':
    case 'decision':
      return d.card.significadoTrabajoDinero
    case 'influencias-ocultas':
      return d.card.significadoEspiritual
    default:
      return d.card.significadoGeneral
  }
}

/* ============================================================
 * Lentes de posición
 * ============================================================ */

interface LensConfig {
  /** plantillas de introducción; {name} = carta, {frase} = cláusula núcleo */
  intros: string[]
  fragmento: keyof CardPhrases
}

const LENTES: Record<PositionLens, LensConfig> = {
  dia: {
    intros: [
      'Para hoy, {name} marca el tono de la jornada: trae {frase}.',
      'El día se coloca bajo el signo de {name}, que trae {frase}.',
    ],
    fragmento: 'esencia',
  },
  respuesta: {
    intros: [
      'Como respuesta directa aparece {name}, que pone sobre la mesa {frase}.',
      'El mazo responde con {name}: en el centro de tu consulta hay {frase}.',
    ],
    fragmento: 'esencia',
  },
  pasado: {
    intros: [
      'En la raíz del asunto está {name}: todo parte de {frase}.',
      'El pasado lo cuenta {name}: vienes de {frase}.',
    ],
    fragmento: 'esencia',
  },
  presente: {
    intros: [
      'El presente lo ocupa {name}: hoy el asunto vive {frase}.',
      'En el momento actual aparece {name}, y con esa carta el presente se describe como {frase}.',
    ],
    fragmento: 'esencia',
  },
  futuro: {
    intros: [
      'Hacia adelante se perfila {name}: si sigues el impulso actual, el camino lleva a {frase}.',
      'El futuro lo insinúa {name}, que anuncia {frase}.',
    ],
    fragmento: 'desenlace',
  },
  'sentimiento-propio': {
    intros: [
      'En tu lado del vínculo aparece {name}: lo que sientes es {frase}.',
      'Tu corazón lo retrata {name}: dentro de ti hay {frase}.',
    ],
    fragmento: 'sentimiento',
  },
  'sentimiento-ajeno': {
    intros: [
      'Del otro lado responde {name}: en esa persona vive {frase}.',
      'Lo que siente la otra persona lo muestra {name}: allí hay {frase}.',
    ],
    fragmento: 'sentimiento',
  },
  mostrado: {
    intros: [
      'Hacia afuera, {name} describe lo que ambos muestran: {frase}.',
      'En la superficie del vínculo, {name} señala {frase}.',
    ],
    fragmento: 'conducta',
  },
  oculto: {
    intros: [
      'En lo que permanece oculto aparece {name}: entre ambos circula {frase}.',
      'Bajo la superficie, {name} revela {frase}.',
    ],
    fragmento: 'oculto',
  },
  bloqueo: {
    intros: [
      'El bloqueo principal lo nombra {name}: {frase}.',
      'Lo que impide avanzar tiene la forma de {name}: {frase}.',
    ],
    fragmento: 'obstaculo',
  },
  accion: {
    intros: [
      'Como acción aparece {name}: el paso que la tirada señala es {frase}.',
      'El movimiento que se acerca lo trae {name}, y consiste en {frase}.',
    ],
    fragmento: 'accion',
  },
  tendencia: {
    intros: [
      'Cierra la tirada {name}: si nada cambia, todo tiende hacia {frase}.',
      'La tendencia final la marca {name}, que apunta a {frase}.',
    ],
    fragmento: 'desenlace',
  },
  situacion: {
    intros: [
      'Tu situación actual la retrata {name}: estás parada sobre {frase}.',
      'El terreno presente lo describe {name}: hay {frase}.',
    ],
    fragmento: 'esencia',
  },
  recursos: {
    intros: [
      'Entre tus recursos aparece {name}: cuentas con {frase}.',
      'Lo que tienes a favor lo señala {name}: dispones de {frase}.',
    ],
    fragmento: 'esencia',
  },
  dificultad: {
    intros: [
      'La dificultad visible la encarna {name}: {frase}.',
      'El problema que ya está a la vista tiene el rostro de {name}: {frase}.',
    ],
    fragmento: 'obstaculo',
  },
  'factor-oculto': {
    intros: [
      'Como factor oculto opera {name}: por debajo influye {frase}.',
      'Fuera de la vista trabaja {name}: hay {frase}.',
    ],
    fragmento: 'oculto',
  },
  riesgo: {
    intros: [
      'El riesgo a evitar lo advierte {name}: cuidado con {frase}.',
      'Como advertencia aparece {name}: el error posible sería {frase}.',
    ],
    fragmento: 'sombra',
  },
  resultado: {
    intros: [
      'El resultado probable lo dibuja {name}: de seguir así, se llega a {frase}.',
      'Si el camino actual se mantiene, {name} anuncia {frase}.',
    ],
    fragmento: 'desenlace',
  },
  origen: {
    intros: [
      'El origen del asunto lo cuenta {name}: todo comenzó con {frase}.',
      'En el punto de partida está {name}: la raíz es {frase}.',
    ],
    fragmento: 'esencia',
  },
  sosten: {
    intros: [
      'Te sostiene {name}: tu apoyo real es {frase}.',
      'Como sostén aparece {name}: puedes apoyarte en {frase}.',
    ],
    fragmento: 'esencia',
  },
  obstaculo: {
    intros: [
      'El obstáculo central lo encarna {name}: {frase}.',
      'Lo que traba el paso tiene la forma de {name}: {frase}.',
    ],
    fragmento: 'obstaculo',
  },
  aprendizaje: {
    intros: [
      'El aprendizaje lo trae {name}: esta etapa enseña {frase}.',
      'Lo que la situación viene a enseñarte lo resume {name}: {frase}.',
    ],
    fragmento: 'esencia',
  },
  horizonte: {
    intros: [
      'En el horizonte se levanta {name}: el camino se abre hacia {frase}.',
      'El desenlace probable lo anuncia {name}: {frase}.',
    ],
    fragmento: 'desenlace',
  },
  energia: {
    intros: [
      'Tu estado energético lo retrata {name}: en este momento cargas {frase}.',
      'La primera hora del reloj la ocupa {name}: tu energía actual es {frase}.',
    ],
    fragmento: 'esencia',
  },
  'origen-visible': {
    intros: [
      'El origen visible del malestar lo nombra {name}: {frase}.',
      'La causa que ya puede nombrarse tiene el rostro de {name}: {frase}.',
    ],
    fragmento: 'esencia',
  },
  'origen-oculto': {
    intros: [
      'El origen oculto lo custodia {name}: desde lo hondo empuja {frase}.',
      'En lo inconsciente trabaja {name}: allí vive {frase}.',
    ],
    fragmento: 'oculto',
  },
  entorno: {
    intros: [
      'Del entorno llega {name}: a tu alrededor se mueve {frase}.',
      'Las influencias cercanas las describe {name}: {frase}.',
    ],
    fragmento: 'conducta',
  },
  persona: {
    intros: [
      'La persona o vínculo relacionado aparece como {name}: de ese lazo viene {frase}.',
      'En el lugar del vínculo humano está {name}: esa relación aporta {frase}.',
    ],
    fragmento: 'sentimiento',
  },
  intencion: {
    intros: [
      'La intención que se percibe la traduce {name}: alrededor del asunto flota {frase}.',
      'Como intención circundante aparece {name}: se percibe {frase}.',
    ],
    fragmento: 'oculto',
  },
  miedo: {
    intros: [
      'En la casa del miedo aparece {name}: lo que agranda la sombra es {frase}.',
      'La percepción distorsionada la señala {name}: aquí puede haber {frase}.',
    ],
    fragmento: 'oculto',
  },
  'evidencia-favor': {
    intros: [
      'A favor de una influencia externa habla {name}: la tirada muestra {frase}.',
      'Como señal a favor de algo venido de fuera aparece {name}: {frase}.',
    ],
    fragmento: 'oculto',
  },
  'evidencia-contra': {
    intros: [
      'En contra, o como explicación alternativa, responde {name}: también podría tratarse de {frase}.',
      'La explicación más simple la ofrece {name}: quizá solo haya {frase}.',
    ],
    fragmento: 'esencia',
  },
  proteccion: {
    intros: [
      'Entre tus protecciones se alza {name}: te ampara {frase}.',
      'Como fortaleza disponible aparece {name}: cuentas con {frase}.',
    ],
    fragmento: 'esencia',
  },
  sintesis: {
    intros: [
      'Cierra el círculo {name}: la síntesis de todo el reloj es {frase}.',
      'En la última hora aparece {name}, y con ella el reloj se resume en {frase}.',
    ],
    fragmento: 'accion',
  },
}

const GIROS_INVERTIDA = [
  'Pero sale invertida, y eso tuerce su energía: aquí pesa más {sombra}.',
  'La carta llega invertida, así que su lado difícil se impone: {sombra}.',
  'Al salir invertida, conviene leerla por su sombra: {sombra}.',
]

/* ============================================================
 * Relaciones entre cartas consecutivas
 * ============================================================ */

export function relacionEntre(a: DrawnCard, b: DrawnCard): LinkRelation {
  const pa = polaridadDe(a)
  const pb = polaridadDe(b)
  const compartenEje = a.card.ejes.some((e) => b.card.ejes.includes(e))

  if ((pa > 0 && pb < 0) || (pa < 0 && pb > 0)) return 'contradice'
  if (compartenEje && Math.sign(pa) === Math.sign(pb) && pa !== 0) return 'refuerza'
  if (Math.abs(pa - pb) >= 3) return 'contradice'
  if (compartenEje) return 'refuerza'
  return 'matiza'
}

const CONECTORES: Record<LinkRelation, string[]> = {
  refuerza: [
    'Esta energía se prolonga en la carta siguiente.',
    'La carta siguiente confirma el mismo movimiento.',
    'Ambas cartas juntas insisten en una sola dirección.',
    'Lejos de corregirse, la corriente se refuerza.',
  ],
  contradice: [
    'Sin embargo, aquí aparece una contradicción.',
    'Lo que hasta este punto parecía claro cambia cuando surge la carta siguiente.',
    'La tirada introduce ahora una fuerza contraria.',
    'Pero el hilo se tensa: la siguiente carta tira hacia el lado opuesto.',
  ],
  matiza: [
    'La siguiente carta añade un matiz que cambia la lectura.',
    'A esta corriente se le suma otra capa.',
    'El relato no se corta, pero sí cambia de tono.',
    'Sobre ese fondo se dibuja algo más.',
  ],
}

/* ============================================================
 * Ejes simbólicos
 * ============================================================ */

const NOMBRE_EJE: Record<SymbolAxis, string> = {
  luz: 'la luz (claridad, verdad visible, buenos desenlaces)',
  sombra: 'la sombra (lo oculto, los miedos, lo que no se dice)',
  autoridad: 'la autoridad (estructura, límites, figuras de poder)',
  movimiento: 'el movimiento (viajes, cambios, decisiones que avanzan)',
  vinculo: 'los vínculos (lazos, acuerdos, reciprocidad)',
  tierra: 'la tierra (lo concreto, el cuerpo, los recursos)',
  cielo: 'el cielo (la intuición, los ideales, lo espiritual)',
  transformacion: 'la transformación (cierres, mudanzas de piel, giros de ciclo)',
}

function ejesDominantes(cards: DrawnCard[]): [SymbolAxis, number][] {
  const cuenta = new Map<SymbolAxis, number>()
  cards.forEach((d) => {
    d.card.ejes.forEach((e) => cuenta.set(e, (cuenta.get(e) ?? 0) + 1))
    if (d.reversed) cuenta.set('sombra', (cuenta.get('sombra') ?? 0) + 1)
  })
  return [...cuenta.entries()].sort((x, y) => y[1] - x[1])
}

/* ============================================================
 * Construcción de oraciones por posición
 * ============================================================ */

function fraseNucleo(d: DrawnCard, lente: LensConfig): string {
  return d.card.frases[lente.fragmento]
}

function oracionDePosicion(d: DrawnCard, rng: () => number, tema: ThemeId): string {
  const lente = LENTES[d.position.lens]
  const intro = pick(rng, lente.intros)
    .replace('{name}', d.card.name)
    .replace('{frase}', fraseNucleo(d, lente))

  let frase = intro
  if (d.reversed) {
    frase +=
      ' ' + pick(rng, GIROS_INVERTIDA).replace('{sombra}', d.card.frases.sombra)
  }

  // Elaboración: una oración del significado contextual, para que cada carta
  // hable con su propia voz y no solo con la plantilla.
  const fuente = oraciones(significadoContextual(d, tema))
  if (fuente.length > 0) {
    const idx = 1 + Math.floor(rng() * Math.max(1, Math.min(3, fuente.length - 1)))
    frase += ' ' + fuente[Math.min(idx, fuente.length - 1)]
  }
  return frase
}

/* ============================================================
 * Párrafos de análisis global
 * ============================================================ */

function parrafoRelaciones(cards: DrawnCard[], rng: () => number): string | null {
  if (cards.length < 3) return null
  const refuerzos: string[] = []
  const contradicciones: string[] = []
  for (let i = 0; i < cards.length - 1; i++) {
    const rel = relacionEntre(cards[i], cards[i + 1])
    const par = `${cards[i].card.name}–${cards[i + 1].card.name}`
    if (rel === 'refuerza') refuerzos.push(par)
    if (rel === 'contradice') contradicciones.push(par)
  }
  const partes: string[] = []
  if (refuerzos.length > 0) {
    partes.push(
      pick(rng, [
        `Hay parejas de cartas que se refuerzan entre sí —${listar(refuerzos)}—, y esa insistencia marca el centro de gravedad de la lectura: cuando el mazo repite una corriente, no está decorando, está subrayando.`,
        `La combinación entre ${listar(refuerzos)} funciona como eco: la misma energía dicha dos veces, señal de que ahí está el núcleo del asunto.`,
      ]),
    )
  }
  if (contradicciones.length > 0) {
    partes.push(
      pick(rng, [
        `Al mismo tiempo, ${listar(contradicciones)} se contradicen abiertamente: la tirada no describe un camino liso sino una tensión real entre fuerzas que tiran en direcciones distintas, y esa tensión es precisamente lo que hay que resolver.`,
        `Conviene no pasar por alto la contradicción entre ${listar(contradicciones)}: donde dos cartas chocan, la vida suele estar pidiendo una decisión que se ha venido aplazando.`,
      ]),
    )
  }
  if (partes.length === 0) {
    partes.push(
      'Ninguna carta anula a otra: la tirada avanza por matices, como un tejido donde cada hilo cambia apenas el color del siguiente. Eso sugiere un proceso más maduro de lo que parece: no hay guerra interna, hay ajuste fino.',
    )
  }
  return partes.join(' ')
}

function parrafoProgresion(cards: DrawnCard[], rng: () => number): string | null {
  if (cards.length < 3) return null
  const tercio = Math.max(1, Math.floor(cards.length / 3))
  const inicio = cards.slice(0, tercio)
  const final = cards.slice(-tercio)
  const pInicio = inicio.reduce((s, d) => s + polaridadDe(d), 0) / inicio.length
  const pFinal = final.reduce((s, d) => s + polaridadDe(d), 0) / final.length
  const primera = cards[0]
  const ultima = cards[cards.length - 1]

  if (pFinal - pInicio > 0.6) {
    return pick(rng, [
      `Mirada de principio a fin, la tirada asciende: lo que empieza en ${primera.card.name} con tono más pesado se va despejando hasta llegar a ${ultima.card.name}. El desenlace retoma el conflicto inicial, pero lo devuelve transformado: el mensaje de fondo es que el proceso trabaja a tu favor si no lo interrumpes.`,
      `La progresión es clara: de la dificultad inicial hacia una salida más luminosa en ${ultima.card.name}. No es promesa de comodidad inmediata, es dirección: cada posición fue soltando peso.`,
    ])
  }
  if (pInicio - pFinal > 0.6) {
    return pick(rng, [
      `La progresión pide atención: la tirada comienza con más luz de la que conserva al final. Entre ${primera.card.name} y ${ultima.card.name} algo se va enturbiando, y ese descenso es la advertencia central: el rumbo actual gasta más de lo que construye, y conviene corregirlo antes del desenlace, no después.`,
      `Leída como camino, la tirada desciende: lo que abre ${primera.card.name} con buen pie se complica hacia ${ultima.card.name}. No es sentencia: es la foto de la inercia actual, y las inercias se cambian.`,
    ])
  }
  return pick(rng, [
    `De principio a fin la tirada mantiene una tensión pareja: ni cae ni despega sola. Entre ${primera.card.name} y ${ultima.card.name} el nivel se sostiene, lo que sugiere que el desenlace dependerá menos del azar y más de la acción concreta que se tome —o no se tome— en el medio.`,
    `La energía se mantiene estable a lo largo del recorrido: la diferencia no la pondrán las circunstancias sino la decisión que tomes entre ${primera.card.name} y ${ultima.card.name}.`,
  ])
}

function parrafoSimbolos(cards: DrawnCard[], rng: () => number): string | null {
  if (cards.length < 3) return null
  const dominantes = ejesDominantes(cards).filter(([, n]) => n >= 2)
  if (dominantes.length === 0) return null
  const [eje1, n1] = dominantes[0]
  const segunda = dominantes[1]
  let texto = pick(rng, [
    `En el conjunto se acumula un símbolo por encima de los demás: ${NOMBRE_EJE[eje1]}, presente en ${n1} cartas.`,
    `Si se cuentan los símbolos, domina ${NOMBRE_EJE[eje1]}, repetido en ${n1} de las cartas.`,
  ])
  if (segunda && segunda[1] >= 2 && segunda[0] !== eje1) {
    texto += ` Le sigue de cerca ${NOMBRE_EJE[segunda[0]]}, de modo que la lectura se juega entre esas dos corrientes: la pregunta práctica es cuál de las dos estás alimentando con tus actos de cada día.`
  } else {
    texto += ' Cuando un solo eje concentra tanto peso, la tirada está nombrando el terreno donde se decide todo lo demás: atiéndelo primero y el resto se acomodará detrás.'
  }
  return texto
}

/* ============================================================
 * Análisis específico de amor
 * ============================================================ */

const AFECTIVAS = new Set([3, 6, 11, 14, 17, 19, 21])
const DEFENSIVAS = new Set([4, 8, 9, 2, 12, 15])

function parrafoAmor(cards: DrawnCard[], rng: () => number): string | null {
  const porLente = (l: PositionLens) => cards.find((d) => d.position.lens === l)
  const propio = porLente('sentimiento-propio')
  const ajeno = porLente('sentimiento-ajeno')
  const accion = porLente('accion')
  const tendencia = porLente('tendencia')
  if (!propio || !ajeno) return null

  const partes: string[] = []

  // Sentimiento vs acción: no confundir sentir con hacer.
  if (accion) {
    partes.push(
      pick(rng, [
        `Esta secuencia diferencia lo que se siente de lo que realmente se hará: una cosa es la emoción que retratan ${propio.card.name} y ${ajeno.card.name}, y otra el movimiento concreto que anuncia ${accion.card.name}. El sentimiento sin acción es clima, no camino: observa los hechos de los próximos tiempos más que las declaraciones.`,
        `Conviene separar planos: ${propio.card.name} y ${ajeno.card.name} hablan de lo que se siente; ${accion.card.name}, de lo que se hará. En amor, la distancia entre esos dos planos —entre desear y comprometerse, entre pensar y actuar— es exactamente donde viven las decepciones y también las sorpresas.`,
      ]),
    )
  }

  // Afecto + defensa: sentimiento con resistencia.
  const hayAfecto = cards.some((d) => AFECTIVAS.has(d.card.id) && !d.reversed)
  const hayDefensa = cards.some((d) => DEFENSIVAS.has(d.card.id) || d.reversed)
  if (hayAfecto && hayDefensa) {
    const defensiva = cards.find((d) => DEFENSIVAS.has(d.card.id)) ?? cards.find((d) => d.reversed)
    partes.push(
      pick(rng, [
        `La tirada muestra a la vez cartas afectivas y cartas defensivas: puede existir sentimiento real y, al mismo tiempo, resistencia, miedo o falta de acción —${defensiva ? `${defensiva.card.name} pone nombre a esa guardia` : 'una de las cartas pone en guardia al conjunto'}—. Que alguien sienta no significa que esté listo para actuar sobre lo que siente, y esa diferencia hay que mirarla sin adornos.`,
        `Hay afecto en la mesa, pero no viaja libre: junto a las cartas cálidas aparecen defensas. La lectura honesta es doble: el cariño parece verdadero y, a la vez, hay murallas que no van a caer solas. La atracción no es amor, el pensamiento no es acción y el deseo no es compromiso: esta tirada pide distinguir los tres.`,
      ]),
    )
  }

  if (tendencia) {
    const pol = polaridadDe(tendencia)
    partes.push(
      pol >= 1
        ? `La tendencia final, con ${tendencia.card.name}, se inclina a favor del vínculo: si nada se fuerza ni se descuida, la inercia trabaja para el encuentro.`
        : pol <= -1
          ? `La tendencia final, con ${tendencia.card.name}, advierte: si nada cambia, la inercia no juega a favor del vínculo. No es un destino cerrado: es el aviso de que este lazo necesita un cambio real de conducta, no más espera.`
          : `La tendencia final, con ${tendencia.card.name}, queda abierta: el vínculo no está decidido ni a favor ni en contra, y será la próxima acción concreta —no las emociones— la que incline la balanza.`,
    )
  }

  return partes.length > 0 ? partes.join(' ') : null
}

/* ============================================================
 * Preguntas sobre acciones de otra persona
 * ============================================================ */

function porLente(cards: DrawnCard[], lente: PositionLens): DrawnCard | undefined {
  return cards.find((d) => d.position.lens === lente)
}

function nombreConOrientacion(d: DrawnCard): string {
  return `${d.card.name}${d.reversed ? ' invertida' : ''}`
}

function matizDeTerceraPersona(d: DrawnCard, campo: keyof CardPhrases): string {
  return d.card.frases[campo]
    .replace(/\btu\b/gi, 'su')
    .replace(/\btus\b/gi, 'sus')
    .replace(/\bte\b/gi, 'se')
    .replace(/\bcontigo\b/gi, 'con el vínculo')
    .replace(/\bestás\b/gi, 'está')
    .replace(/\btienes\b/gi, 'tiene')
}

function significadoAccionAjena(d: DrawnCard, plano: 'sentimiento' | 'oculto' | 'conducta' | 'obstaculo' | 'accion' | 'desenlace'): string {
  if (d.card.id === 8 && d.reversed) {
    return 'emoción o pasión contenida, orgullo herido y dificultad para manejar su reacción sin sentirse expuesto'
  }
  if (d.card.id === 9 && plano === 'conducta') {
    return 'distancia exterior, observación, repliegue y demora antes de dejar ver una decisión'
  }
  if (d.card.id === 17 && plano === 'oculto') {
    return 'esperanza y deseo oculto de recomponer la conexión, aunque todavía no lo convierta en una promesa'
  }
  if (d.card.id === 4 && plano === 'obstaculo') {
    return 'orgullo, rigidez, control y necesidad de imponer sus propias condiciones'
  }
  if (d.card.id === 6 && plano === 'accion') {
    return 'un acercamiento, diálogo, encuentro o búsqueda de reciprocidad; habla de contacto, no de compromiso automático'
  }
  if (d.card.id === 21 && d.reversed && plano === 'desenlace') {
    return 'un movimiento incompleto y sin cierre definitivo: el acercamiento todavía no consolida una nueva etapa'
  }
  return matizDeTerceraPersona(d, plano)
}

function construirRelatoAccionAjena(cards: DrawnCard[]): string[] {
  const contexto = porLente(cards, 'sentimiento-propio') ?? cards[0]
  const impulso = porLente(cards, 'sentimiento-ajeno') ?? cards[1] ?? cards[0]
  const oculto = porLente(cards, 'oculto') ?? cards[3] ?? impulso
  const mostrado = porLente(cards, 'mostrado') ?? cards[2] ?? impulso
  const bloqueo = porLente(cards, 'bloqueo') ?? cards[4] ?? impulso
  const accion = porLente(cards, 'accion') ?? cards[cards.length - 2]
  const tendencia = porLente(cards, 'tendencia') ?? cards[cards.length - 1]

  return [
    `${nombreConOrientacion(contexto)} no se usa aquí para diagnosticar a la persona consultante. Dada la instrucción de responder respecto a él, esta primera posición funciona solo como contexto mínimo: representa cómo él percibe la posición emocional que tiene enfrente y qué cree que podría encontrar si se acercara. Esa percepción puede influir en su cálculo, pero no cambia el sujeto de la lectura: el análisis sigue centrado en lo que él siente, controla, muestra y probablemente hará.`,
    `El impulso emocional de él aparece en ${nombreConOrientacion(impulso)}. La carta describe ${significadoAccionAjena(impulso, 'sentimiento')}. Este plano explica el motivo interno de su conducta, no la conducta misma. Puede haber intensidad, deseo, curiosidad afectiva o una reacción todavía activa y, aun así, él puede demorar el contacto. El sentimiento solo establece que el vínculo le produce una respuesta; no demuestra por sí solo que vaya a actuar, reconciliarse o asumir un compromiso.`,
    `Lo que él intenta controlar u ocultar lo representa ${nombreConOrientacion(oculto)}: ${significadoAccionAjena(oculto, 'oculto')}. Esta energía se mantiene debajo de sus decisiones visibles. En consecuencia, su silencio o reserva no equivale necesariamente a indiferencia, pero tampoco debe confundirse con una intención ya decidida. La carta habla de su mundo interno y permite entender por qué podría contemplar un acercamiento sin anunciarlo todavía ni revelar todas sus expectativas.`,
    `Hacia afuera, ${nombreConOrientacion(mostrado)} indica ${significadoAccionAjena(mostrado, 'conducta')}. Aquí aparece la diferencia entre lo que él guarda y lo que efectivamente deja ver. Su conducta exterior puede ser más fría, lenta o cautelosa que su impulso emocional. Esta contradicción sugiere que primero observará el terreno, medirá la respuesta posible y evitará exponerse de golpe. Por eso el movimiento, si ocurre, no parece impulsivo ni totalmente abierto desde el comienzo.`,
    `El obstáculo que frena su conducta es ${nombreConOrientacion(bloqueo)}: ${significadoAccionAjena(bloqueo, 'obstaculo')}. Esta carta no borra el interés anterior; lo condiciona. Él puede querer conservar control sobre el ritmo, el tono y las condiciones del intercambio, y esa necesidad reduce la espontaneidad. También explica una posible demora o un contacto que empieza de manera indirecta. El bloqueo pertenece a su forma de gestionar la situación, no a una decisión que deba tomar la persona consultante.`,
    `La acción concreta está en ${nombreConOrientacion(accion)}, no en las cartas de sentimiento. Esta posición anuncia ${significadoAccionAjena(accion, 'accion')}. Por ello, el movimiento más probable de él es abrir un canal: escribir, buscar una conversación, proponer verse, tantear una reconciliación o realizar un gesto que permita comprobar si aún existe reciprocidad. La carta señala aproximación y disposición a relacionarse; no garantiza que llegue con una propuesta firme, sostenida o completamente definida.`,
    `La carta final, ${nombreConOrientacion(tendencia)}, modifica esa acción con ${significadoAccionAjena(tendencia, 'desenlace')}. El desenlace no anula el movimiento indicado por ${accion.card.name}, pero limita su alcance. Él puede acercarse y aun así dejar asuntos sin resolver, avanzar por etapas o retroceder cuando el vínculo exija definición. La secuencia distingue con claridad tres planos: lo que él siente explica el impulso, lo que intenta controlar determina la demora y lo que hace aparece únicamente en la posición de acción.`,
  ]
}

function construirRespuestaAccionAjena(cards: DrawnCard[]): string {
  const accion = porLente(cards, 'accion') ?? cards[cards.length - 2]
  const tendencia = porLente(cards, 'tendencia') ?? cards[cards.length - 1]
  if (accion.card.id === 6 && tendencia.card.id === 21 && tendencia.reversed) {
    return `Existe posibilidad de que él realice un movimiento hacia el vínculo, pero será medido y condicionado. ${accion.card.name} señala que puede buscar contacto, conversación, encuentro o reconciliación; sin embargo, ${tendencia.card.name} invertida advierte que ese acercamiento no equivale todavía a una resolución completa ni a un compromiso firme.`
  }
  return `La tendencia es condicionada: él probablemente realizará el movimiento descrito por ${nombreConOrientacion(accion)} —${significadoAccionAjena(accion, 'accion')}—, pero su alcance queda modificado por ${nombreConOrientacion(tendencia)}. Esta carta final indica ${significadoAccionAjena(tendencia, 'desenlace')}. Por tanto, hay que distinguir el contacto probable de una resolución o compromiso que la tirada todavía no garantiza.`
}

function nivelClaridad(d: DrawnCard): 'alto' | 'medio' | 'bajo' {
  if (Math.abs(polaridadDe(d)) >= 2) return 'alto'
  if (Math.abs(polaridadDe(d)) >= 1) return 'medio'
  return 'bajo'
}

function generarAccionUnaCarta(
  pregunta: string,
  tema: ThemeId,
  enfoque: EnfoqueConsulta,
  d: DrawnCard,
): ReadingNarrative {
  const nombre = nombreConOrientacion(d)
  const esHoy = /\bhoy\b/i.test(pregunta)
  const esVenir = /vendr[aá]/i.test(pregunta)
  const polaridad = polaridadDe(d)
  const tendencia = polaridad > 0 ? 'probablemente sí' : polaridad < 0 ? (esHoy ? 'probablemente no hoy' : 'todavía no') : 'tendencia abierta'
  const respuestaAyni = d.card.id === 11 && d.reversed
    ? `Ayni invertida inclina la respuesta hacia un «probablemente no hoy» o hacia un encuentro que no logra concretarse en condiciones equilibradas. Puede existir una expectativa de contacto, pero la carta muestra falta de reciprocidad, descoordinación o una parte que no cumple lo esperado. Al tratarse de una sola carta, señala una tendencia y no una certeza: si ocurre un movimiento, podría ser tardío, incompleto o distinto de lo acordado.`
    : `${nombre} inclina la respuesta hacia «${tendencia}». La carta permite hablar de ${matizDeTerceraPersona(d, 'accion')}, pero no convierte esa tendencia simbólica en una certeza sobre lo que esa persona hará${esHoy ? ' hoy' : ''}.`
  const titulo = esVenir
    ? `Bajo el signo de ${d.card.name}: ¿se concretará el encuentro hoy?`
    : `${d.card.name} y la posibilidad de un acercamiento.`
  return {
    titulo,
    pregunta,
    tema,
    enfoque,
    relato: [
      `${respuestaAyni} Esa es la respuesta directa que permite esta posición. La lectura permanece centrada en la conducta de esa persona: no transforma la consulta en una reflexión personal ni atribuye causas psicológicas que una sola carta no puede demostrar.`,
      `${nombre} describe el tono probable del movimiento mediante ${matizDeTerceraPersona(d, 'conducta')}. Esto permite valorar si el gesto tiende a concretarse, demorarse o quedar incompleto. Sin cartas adicionales no puede separarse con precisión cuánto corresponde a su intención y cuánto a un obstáculo práctico; por eso la claridad de la respuesta es ${nivelClaridad(d)} y debe leerse como orientación, no como comprobación de hechos.`,
      `Dentro del horizonte consultado, la carta sostiene una tendencia ${polaridad > 0 ? 'favorable' : polaridad < 0 ? 'restrictiva' : 'ambigua'} para la acción. Si aparece algún movimiento, habrá que reconocerlo por lo que efectivamente ocurra, no por supuestos sobre sus emociones. Una carta responde al rumbo dominante del momento, pero no ofrece una descripción completa de todos los factores ni garantiza el desenlace.`,
    ],
    oculto: `Con una sola carta no hay base suficiente para afirmar motivos ocultos. ${nombre} únicamente sugiere ${matizDeTerceraPersona(d, 'oculto')}, sin presentarlo como hecho psicológico.`,
    respuesta: respuestaAyni,
    consejo: 'Consejo secundario: toma esta lectura como una tendencia del momento y distingue cualquier expectativa del movimiento que realmente ocurra.',
    advertencia: 'Esta lectura es simbólica y orientativa. Una sola carta expresa una tendencia, no una certeza ni una descripción completa de la conducta de otra persona.',
  }
}

function generarAccionTresCartas(
  pregunta: string,
  tema: ThemeId,
  enfoque: EnfoqueConsulta,
  cards: DrawnCard[],
): ReadingNarrative {
  const [intencion, condicion, accion] = cards
  const pol = polaridadDe(accion)
  const siNo = pol > 0 ? 'sí probable' : pol < 0 ? 'todavía no o no dentro del plazo' : 'respuesta abierta'
  return {
    titulo: `${accion.card.name} y su acción más probable dentro del tiempo consultado`,
    pregunta,
    tema,
    enfoque,
    relato: [
      `${nombreConOrientacion(intencion)} ocupa la intención actual de esa persona y muestra ${significadoAccionAjena(intencion, 'oculto')}. Esta primera carta habla de lo que contempla o desea hacer; todavía no constituye conducta. Su función es explicar la dirección interna desde la que parte, sin convertir pensamientos o deseos en promesas.`,
      `La carta central y de giro es ${nombreConOrientacion(condicion)}. Al situarse entre intención y conducta, revela el obstáculo o impulso que condiciona el paso: ${significadoAccionAjena(condicion, 'obstaculo')}. Esta carta puede reforzar el deseo inicial o frenarlo; la contradicción no se elimina, porque alguien puede querer acercarse y aun así no hacerlo dentro del plazo consultado.`,
      `La acción más probable la determina ${nombreConOrientacion(accion)}: ${significadoAccionAjena(accion, 'accion')}. Esta última posición pesa más que las anteriores para responder qué hará. Dentro del tiempo indicado, la respuesta simbólica se inclina a «${siNo}», con un grado de claridad ${nivelClaridad(accion)}. No es certeza absoluta: describe la conducta más coherente con la secuencia actual.`,
      `La combinación completa separa intención, condicionante y hecho probable. ${intencion.card.name} abre el impulso; ${condicion.card.name} cambia o modula ese impulso; ${accion.card.name} muestra aquello que tiene más posibilidades de materializarse. De este modo, la respuesta permanece centrada en esa persona y en su acción, no en decisiones ni estados emocionales de la consultante.`,
    ],
    oculto: `${nombreConOrientacion(intencion)} deja ver una intención que aún no equivale a una acción. ${nombreConOrientacion(condicion)} explica por qué esa intención puede cambiar antes de manifestarse.`,
    respuesta: `La tendencia es «${siNo}». ${nombreConOrientacion(accion)} gobierna la conducta más probable dentro del tiempo consultado, con un grado de claridad ${nivelClaridad(accion)} y sin garantía absoluta.`,
    consejo: 'Consejo secundario: valora el resultado por la conducta que efectivamente se produzca dentro del plazo, no solo por la intención sugerida.',
    advertencia: 'Esta lectura expresa una tendencia simbólica y no garantiza que una persona actúe de una forma determinada.',
  }
}

/* ============================================================
 * Análisis del reloj de las sombras
 * ============================================================ */

const INDICADORES = new Set([15, 12, 18])
const PROTECTORAS = new Set([19, 17, 20, 3, 4, 21])

export const ADVERTENCIA_RELOJ =
  'Esta lectura interpreta símbolos y patrones del tarot. No puede demostrar la existencia de brujería ni identificar responsables. Utilízala como una herramienta de reflexión y no como sustituto de ayuda médica, psicológica o legal.'

export function analizarReloj(cards: DrawnCard[]): string[] {
  const parrafos: string[] = []
  const indicadoras = cards.filter((d) => INDICADORES.has(d.card.id))
  const protectoras = cards.filter((d) => PROTECTORAS.has(d.card.id))
  const n = indicadoras.length

  // Nivel de concentración simbólica
  if (n === 0) {
    parrafos.push(
      'Ninguna de las tres cartas indicadoras de sombra —Supay, Uku Pacha y Amaru— aparece en el reloj. En el lenguaje simbólico de esta tirada, eso sugiere que el malestar consultado se explica mejor por causas visibles y cotidianas que por influencias ocultas: la tirada no muestra señales de sombra concentrada, y conviene explorar primero lo emocional, lo interpersonal y lo práctico.',
    )
  } else if (n === 1) {
    const d = indicadoras[0]
    parrafos.push(
      `Aparece una sola carta indicadora, ${d.card.name}, en la posición «${d.position.label}». Una sola carta de sombra no permite concluir nada sobre influencias ocultas: leída en su lugar, podría reflejar simplemente ${d.card.frases.oculto}. La tirada sugiere explorar esa dimensión sin darle todavía el peso de una señal.`,
    )
  } else if (n === 2) {
    parrafos.push(
      `El reloj muestra una presencia simbólica moderada de influencias ocultas: dos de las tres cartas indicadoras —${listar(indicadoras.map((d) => d.card.name))}— aparecen en el círculo, en las posiciones «${listar(indicadoras.map((d) => d.position.label))}». Esto no constituye una confirmación objetiva de nada externo: la tirada simboliza que hay material de sombra activo alrededor del asunto, y que vale la pena mirarlo con calma y sin alarma.`,
    )
  } else {
    parrafos.push(
      `El reloj muestra una concentración simbólica alta de cartas asociadas con sombras e influencias ocultas: Supay, Uku Pacha y Amaru aparecen los tres, en las posiciones «${listar(indicadoras.map((d) => d.position.label))}». Aun así, esta acumulación se lee como símbolo y no como prueba: podría reflejar una etapa de sombra interior intensa, un entorno cargado o patrones que se repiten, y no constituye una confirmación objetiva de que alguien esté actuando contra ti.`,
    )
  }

  // Matices por posición
  const supay = cards.find((d) => d.card.id === 15)
  if (supay && supay.position.lens === 'miedo') {
    parrafos.push(
      'Un matiz importante: Supay cae justamente en la casa del miedo. En esa posición habla menos de una acción externa y más de sugestión, obsesión o temor que agranda las sombras: la mente que teme dibuja cuernos en cualquier silueta. Antes de buscar culpables afuera, la tirada sugiere revisar qué miedo se está alimentando por dentro.',
    )
  }
  const uku = cards.find((d) => d.card.id === 12)
  if (uku && uku.position.lens === 'origen-oculto') {
    parrafos.push(
      'Uku Pacha en la posición del origen oculto apunta hacia adentro: puede señalar un trauma antiguo, una preocupación enterrada o un conflicto inconsciente que empuja el malestar desde abajo. Es de las señales que más se confunden con «algo externo», cuando en realidad describe material propio que pide salir a la luz, idealmente con acompañamiento.',
    )
  }
  const amaru = cards.find((d) => d.card.id === 18)
  if (amaru) {
    parrafos.push(
      `Amaru, presente en «${amaru.position.label}», merece lectura doble: representa energía intensa y ciclos que se repiten, pero también transformación profunda. No siempre es señal negativa: puede indicar que estás mudando de piel y que la incomodidad que sientes es la del crecimiento, no la de un ataque.`,
    )
  }

  // Evidencias 9 y 10
  const favor = cards.find((d) => d.position.lens === 'evidencia-favor')
  const contra = cards.find((d) => d.position.lens === 'evidencia-contra')
  if (favor && contra) {
    const rel = relacionEntre(favor, contra)
    const chocan =
      rel === 'contradice' || Math.sign(polaridadDe(favor)) !== Math.sign(polaridadDe(contra))
    if (chocan) {
      parrafos.push(
        `Las posiciones nueve y diez —${favor.card.name} a favor y ${contra.card.name} en contra— ofrecen explicaciones contradictorias, y esa contradicción debe decirse con honestidad: la tirada queda en incertidumbre. Cuando los símbolos no se ponen de acuerdo, la respuesta prudente no es elegir la versión que más miedo o más alivio da, sino sostener la pregunta abierta y buscar datos en la vida real.`,
      )
    } else {
      parrafos.push(
        `Las posiciones nueve y diez —${favor.card.name} y ${contra.card.name}— no se contradicen: leídas juntas, inclinan la balanza hacia la explicación más simple y verificable. La tirada sugiere agotar primero las causas emocionales, interpersonales, médicas o prácticas antes de atribuir el malestar a algo externo.`,
      )
    }
  }

  // Cartas protectoras
  if (protectoras.length >= 2) {
    parrafos.push(
      `Hay además ${protectoras.length} cartas luminosas o protectoras en el círculo —${listar(protectoras.map((d) => d.card.name))}—, y su presencia reduce la intensidad de cualquier advertencia: hablan de fortalezas, apoyos y luz disponibles que pesan más que las sombras contadas. La imagen final no es la de una persona desprotegida.`,
    )
  } else if (protectoras.length === 1) {
    parrafos.push(
      `Entre las doce cartas aparece una protectora, ${protectoras[0].card.name}, en «${protectoras[0].position.label}»: un punto firme de apoyo que matiza la lectura y recuerda que hay recursos disponibles.`,
    )
  }

  return parrafos
}

/* ============================================================
 * Título, secciones finales
 * ============================================================ */

function cartaDominante(cards: DrawnCard[]): DrawnCard {
  const sintesis = cards.find((d) => d.position.lens === 'sintesis')
  if (sintesis) return sintesis
  return [...cards].sort(
    (a, b) => Math.abs(b.card.polaridad) - Math.abs(a.card.polaridad),
  )[0]
}

function construirTitulo(
  cards: DrawnCard[],
  tema: ThemeId,
  spread: SpreadDefinition,
  rng: () => number,
): string {
  const dom = cartaDominante(cards)
  if (spread.id === 'reloj-sombras') {
    return pick(rng, [
      `El reloj de las sombras: lo que ${dom.card.name} revela del círculo`,
      `Doce horas alrededor de ${dom.card.name}`,
    ])
  }
  const temaCorto: Record<ThemeId, string> = {
    amor: 'tu vínculo',
    reconciliacion: 'ese posible regreso',
    trabajo: 'tu camino laboral',
    dinero: 'tus recursos',
    decision: 'tu encrucijada',
    crecimiento: 'tu crecimiento',
    'influencias-ocultas': 'las sombras que consultas',
    general: 'tu consulta',
  }
  return pick(rng, [
    `${dom.card.name} y ${temaCorto[tema]}: la historia que cuentan las cartas`,
    `Bajo el signo de ${dom.card.name}: una lectura sobre ${NOMBRE_TEMA[tema]}`,
    `Lo que los Apus dicen de ${temaCorto[tema]} a través de ${dom.card.name}`,
  ])
}

function construirOculto(cards: DrawnCard[], tema: ThemeId, rng: () => number): string {
  const lentesOcultas: PositionLens[] = ['oculto', 'factor-oculto', 'origen-oculto', 'miedo']
  const ocultas = cards.filter((d) => lentesOcultas.includes(d.position.lens))
  if (ocultas.length > 0) {
    const frases = ocultas.map(
      (d) => `${d.card.name} señala ${d.card.frases.oculto}`,
    )
    const extra = oraciones(significadoContextual(ocultas[0], tema))[0] ?? ''
    return `${capitalizar(listar(frases))}. Lo que no se dice está trabajando más que lo que se ve: ${extra} Nombrar esta capa —primero ante ti misma, luego donde corresponda— es la forma de quitarle el mando.`
  }
  const masOscura = [...cards].sort((a, b) => polaridadDe(a) - polaridadDe(b))[0]
  return pick(rng, [
    `La tirada no tiene una posición dedicada a lo oculto, pero la carta que más sombra carga es ${masOscura.card.name}: debajo de lo visible se mueve ${masOscura.card.frases.oculto}. Tenerlo presente evita sorpresas: es la parte del asunto que aún no ha hablado en voz alta.`,
    `Si algo permanece fuera de la vista, lo insinúa ${masOscura.card.name}: ${masOscura.card.frases.oculto}. No exige acción inmediata, pero sí honestidad: lo que se reconoce a tiempo no gobierna en secreto.`,
  ])
}

function construirRespuesta(
  cards: DrawnCard[],
  spread: SpreadDefinition,
): string {
  const ultima = cards[cards.length - 1]
  const pol =
    cards.reduce((s, d) => s + polaridadDe(d), 0) / cards.length +
    polaridadDe(ultima) * 0.5

  if (spread.id === 'reloj-sombras') {
    const nInd = cards.filter((d) => INDICADORES.has(d.card.id)).length
    return nInd >= 2
      ? `A tu pregunta, la respuesta más honesta del reloj es prudente: la tirada simboliza que sí hay material de sombra activo alrededor del asunto, pero no puede confirmar —ni confirma— que provenga de una acción externa dirigida contra ti. Sugiere explorar primero las causas emocionales, interpersonales, médicas o prácticas, reforzar tus protecciones cotidianas y no señalar a ninguna persona concreta: los símbolos orientan la reflexión, no dictan culpables.`
      : `A tu pregunta, el reloj responde con más calma que alarma: las señales simbólicas de influencia oculta son débiles, y el círculo se explica mejor por causas visibles: cansancio, conflictos, preocupaciones enterradas. La recomendación es ocuparte de lo concreto que la tirada nombró y tratar la idea de una influencia externa como hipótesis no confirmada, no como certeza.`
  }

  const cierre = `${ultima.card.name} en la última posición deja el sello final: ${ultima.card.frases.desenlace}.`
  if (pol > 0.7) {
    return `${cierre} Leída completa, la tirada responde que sí: la corriente de fondo está a favor de lo que consultas, siempre que acompañes con los pasos concretos que el propio relato señaló. No es un sí mágico: es un sí condicionado a tu movimiento.`
  }
  if (pol < -0.7) {
    return `${cierre} Leída completa, la tirada responde que no por este camino: tal como están las cosas, la corriente no acompaña, y forzarla costaría más de lo que daría. La puerta que sí abre es la del cambio de enfoque: lo que se corrige a tiempo convierte este «no» en un «todavía no».`
  }
  return `${cierre} Leída completa, la tirada responde con un «depende» exigente: las fuerzas están equilibradas y será tu próxima decisión —no el azar— la que incline la balanza. Las cartas ya mostraron dónde está el punto de apoyo; usarlo o no queda de tu lado.`
}

function construirConsejo(cards: DrawnCard[], rng: () => number): string {
  const accion =
    cards.find((d) => d.position.lens === 'accion') ??
    cards.find((d) => d.position.lens === 'sintesis') ??
    cards[cards.length - 1]
  const protectora = cards.find((d) => PROTECTORAS.has(d.card.id) && d !== accion)
  let consejo = `${accion.card.name} concentra el consejo de los Apus. ${accion.card.consejoPractico}`
  if (protectora) {
    consejo += ` Y recuerda el amparo que la tirada también mostró: ${protectora.card.name} te acompaña con ${protectora.card.frases.esencia}; apóyate en eso mientras das el paso.`
  } else {
    consejo += ` ${pick(rng, [
      'Da el paso pequeño antes que el discurso grande: los Apus responden al movimiento.',
      'Hazlo sencillo y hazlo pronto: la montaña se sube por pasos, no por saltos.',
    ])}`
  }
  return consejo
}

/* ============================================================
 * Extensión mínima
 * ============================================================ */

function minimoPalabras(n: number): number {
  if (n >= 12) return 900
  if (n >= 7) return 650
  if (n >= 3) return 350
  return 180
}

/** Si el relato quedó corto, se amplía con la dimensión espiritual y las
 *  preguntas de reflexión (material aún no usado, para no repetir). */
function asegurarExtension(
  narrativa: ReadingNarrative,
  cards: DrawnCard[],
  rng: () => number,
): void {
  const total = () =>
    contarPalabras(
      [...narrativa.relato, narrativa.oculto, narrativa.respuesta, narrativa.consejo].join(' '),
    )
  const minimo = minimoPalabras(cards.length)

  const candidatas = [...cards].sort(
    (a, b) => Math.abs(polaridadDe(b)) - Math.abs(polaridadDe(a)),
  )
  let i = 0
  while (total() < minimo && i < candidatas.length) {
    const d = candidatas[i]
    const espiritual = oraciones(d.card.significadoEspiritual).slice(0, 3).join(' ')
    narrativa.relato.push(
      `${pick(rng, [
        `Hay una capa más honda en ${d.card.name} que conviene llevarse de esta lectura.`,
        `Para terminar de entender el papel de ${d.card.name} en «${d.position.label}», ayuda su dimensión espiritual.`,
      ])} ${espiritual}`,
    )
    i++
  }
  if (total() < minimo) {
    const d = cartaDominante(cards)
    narrativa.relato.push(
      `Antes de cerrar, la tirada deja preguntas para el cuaderno, nacidas de ${d.card.name}: ${d.card.preguntasDeReflexion.join(' ')} No hace falta responderlas hoy: basta con no perderlas de vista.`,
    )
  }
}

/* ============================================================
 * Generador principal
 * ============================================================ */

export function generarLectura(
  spread: SpreadDefinition,
  question: string,
  cards: DrawnCard[],
): ReadingNarrative {
  const pregunta = question.trim()
  const rng = mulberry32(seedFrom(cards, pregunta))
  const tema = detectarTema(pregunta, spread)
  const enfoque = extraerEnfoqueConsulta(pregunta)

  if (enfoque.sujetoPrincipal === 'otra_persona' && enfoque.objetoDeLaPregunta === 'acciones') {
    if (cards.length === 1) return generarAccionUnaCarta(pregunta, tema, enfoque, cards[0])
    if (spread.id === 'accion-tres' && cards.length === 3) {
      return generarAccionTresCartas(pregunta, tema, enfoque, cards)
    }
  }

  // La pregunta manda sobre el nombre predeterminado de las posiciones.
  // Las consultas de acción sobre otra persona requieren un orden causal
  // propio y nunca deben terminar delegando la respuesta en el consultante.
  if (
    enfoque.sujetoPrincipal === 'otra_persona' &&
    enfoque.objetoDeLaPregunta === 'acciones' &&
    cards.length >= 7 &&
    cards.some((d) => d.position.lens === 'accion')
  ) {
    const oculta = porLente(cards, 'oculto') ?? cards[3]
    const narrativa: ReadingNarrative = {
      titulo: `El movimiento de esa persona: ${cards.find((d) => d.position.lens === 'accion')?.card.name ?? cards[cards.length - 1].card.name} marca el paso`,
      pregunta,
      tema,
      enfoque,
      relato: construirRelatoAccionAjena(cards),
      oculto: `${nombreConOrientacion(oculta)} muestra lo que él no expresa abiertamente: ${significadoAccionAjena(oculta, 'oculto')}. Este contenido oculto explica su motivación y sus reservas, pero no sustituye la evidencia de conducta que aporta la carta situada en la acción.`,
      respuesta: construirRespuestaAccionAjena(cards),
      consejo: 'Consejo secundario: conviene valorar el acercamiento por su continuidad y claridad, sin confundir el primer contacto con una decisión firme.',
      advertencia:
        'Esta lectura interpreta símbolos y es orientativa: úsala como herramienta de reflexión. No sustituye asesoramiento profesional médico, psicológico, legal ni financiero.',
    }
    asegurarExtension(narrativa, cards, rng)
    return narrativa
  }

  const relato: string[] = []

  // 1) Apertura: pregunta resumida + tema + marco de la tirada
  const marco =
    cards.length === 1
      ? 'con una sola carta, que concentra todo el mensaje'
      : cards.length === 12
        ? 'con doce cartas dispuestas en círculo, como las horas de un reloj que se recorre en sentido horario hasta cerrar en la síntesis'
        : `con ${cards.length} cartas que se leen encadenadas: cada una modifica, amplía o contradice a la anterior hasta formar una sola historia`
  relato.push(
    pregunta
      ? `Consultas por «${pregunta}», y la pregunta apunta a ${NOMBRE_TEMA[tema]}. El mazo responde ${marco}. Lo que sigue no es una suma de significados sueltos: es el relato que las cartas cuentan juntas, en el orden exacto en que salieron.`
      : `Sin pregunta escrita, la tirada se lee como orientación abierta sobre ${NOMBRE_TEMA[tema]}. El mazo responde ${marco}.`,
  )

  // 2) Recorrido encadenado por posiciones
  const chunk = cards.length >= 12 ? 3 : cards.length >= 5 ? 2 : 1
  let parrafo: string[] = []
  cards.forEach((d, i) => {
    if (i > 0) {
      const rel = relacionEntre(cards[i - 1], d)
      parrafo.push(pick(rng, CONECTORES[rel]))
    }
    parrafo.push(oracionDePosicion(d, rng, tema))
    if (parrafo.length >= chunk * 2 || i === cards.length - 1) {
      relato.push(parrafo.join(' '))
      parrafo = []
    }
  })

  // 3) Análisis global: refuerzos, contradicciones, progresión, símbolos
  const relaciones = parrafoRelaciones(cards, rng)
  if (relaciones) relato.push(relaciones)
  const progresion = parrafoProgresion(cards, rng)
  if (progresion) relato.push(progresion)
  const simbolos = parrafoSimbolos(cards, rng)
  if (simbolos) relato.push(simbolos)

  // 4) Análisis específicos
  if (spread.id === 'amor' || ((tema === 'amor' || tema === 'reconciliacion') && cards.length >= 7)) {
    const amor = parrafoAmor(cards, rng)
    if (amor) relato.push(amor)
  }
  if (spread.id === 'reloj-sombras') {
    relato.push(...analizarReloj(cards))
  }

  const narrativa: ReadingNarrative = {
    titulo: construirTitulo(cards, tema, spread, rng),
    pregunta,
    tema,
    enfoque,
    relato,
    oculto: construirOculto(cards, tema, rng),
    respuesta: construirRespuesta(cards, spread),
    consejo: construirConsejo(cards, rng),
    advertencia:
      spread.id === 'reloj-sombras'
        ? ADVERTENCIA_RELOJ
        : 'Esta lectura interpreta símbolos y es orientativa: úsala como herramienta de reflexión. No sustituye asesoramiento profesional médico, psicológico, legal ni financiero.',
  }

  asegurarExtension(narrativa, cards, rng)
  return narrativa
}

/** Versión de texto plano para descargar o compartir. */
export function narrativaToText(n: ReadingNarrative): string {
  const partes = [
    n.titulo.toUpperCase(),
    n.pregunta ? `Pregunta: ${n.pregunta}` : '',
    'EL RELATO DE LA TIRADA',
    ...n.relato,
    'LO QUE PERMANECE OCULTO',
    n.oculto,
    'LA RESPUESTA MÁS CLARA',
    n.respuesta,
    'CONSEJO DE LOS APUS',
    n.consejo,
    n.advertencia,
  ]
  return partes.filter((p) => p !== '').join('\n\n')
}
