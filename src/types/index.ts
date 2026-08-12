/** Tipos del Oráculo de los Apus
 * Separan datos (cartas, tiradas), reglas de interpretación y componentes.
 * Preparados para auth, DB e interpretaciones con IA en el futuro.
 */

export type CardId = number

/* ============================================================
 * Ejes simbólicos y temas
 * ============================================================ */

/** Acumulaciones de símbolos que el motor detecta en una tirada */
export type SymbolAxis =
  | 'luz'
  | 'sombra'
  | 'autoridad'
  | 'movimiento'
  | 'vinculo'
  | 'tierra'
  | 'cielo'
  | 'transformacion'

/** Tema detectado a partir de la pregunta y del tipo de tirada */
export type ThemeId =
  | 'amor'
  | 'reconciliacion'
  | 'trabajo'
  | 'dinero'
  | 'decision'
  | 'crecimiento'
  | 'influencias-ocultas'
  | 'general'

/** Enfoque gramatical y semántico extraído de la pregunta antes de leer cartas. */
export interface EnfoqueConsulta {
  preguntaOriginal: string
  sujetoPrincipal: 'consultante' | 'otra_persona' | 'vinculo' | 'situacion'
  objetoDeLaPregunta:
    | 'sentimientos'
    | 'pensamientos'
    | 'intenciones'
    | 'acciones'
    | 'resultado'
    | 'otro'
  personaGramatical: 'tu' | 'el_ella' | 'ambos'
  restriccionesExplicitas: string[]
}

export type TipoRespuestaEsperada =
  | 'movimiento probable'
  | 'sentimiento predominante'
  | 'pensamiento predominante'
  | 'intención probable'
  | 'tendencia o resultado'
  | 'orientación contextual'

/* ============================================================
 * Cartas
 * ============================================================ */

/** Frases núcleo de cada carta, escritas para encadenarse dentro de
 *  oraciones más largas. Cada una es una cláusula, no una oración completa. */
export interface CardPhrases {
  /** qué energía trae la carta, en general */
  esencia: string
  /** cómo se lee cuando la posición habla de sentimientos */
  sentimiento: string
  /** cómo se lee cuando la posición habla de conducta visible */
  conducta: string
  /** cómo se lee cuando la posición habla de lo escondido */
  oculto: string
  /** cómo se lee cuando la posición habla de un bloqueo u obstáculo */
  obstaculo: string
  /** cómo se lee cuando la posición pide una acción */
  accion: string
  /** cómo se lee cuando la posición habla del desenlace o tendencia */
  desenlace: string
  /** matiz que aporta la carta cuando sale invertida */
  sombra: string
}

/** Significados profundos por contexto (100-160 palabras los largos) */
export interface CardDepth {
  significadoGeneral: string
  significadoAmor: string
  significadoTrabajoDinero: string
  significadoEspiritual: string
  significadoSombra: string
  consejoPractico: string
  /** 5 a 8 palabras clave */
  palabrasClave: string[]
  correspondenciaArcano: string
  simbolosAndinos: string[]
  /** mínimo 3 preguntas */
  preguntasDeReflexion: string[]
  /** ejes simbólicos que el motor usa para detectar acumulaciones */
  ejes: SymbolAxis[]
  /** -2 (muy sombría) a +2 (muy luminosa); invertida cambia el signo */
  polaridad: number
  frases: CardPhrases
}

export interface AndeanCard extends CardDepth {
  id: CardId
  /** Nombre en el oráculo (español + símbolo andino) */
  name: string
  /** Símbolo andino principal */
  symbol: string
  /** Arcano mayor de referencia (igual a correspondenciaArcano) */
  arcanaRef: string
  keywords: string[]
  /** Frase corta al derecho (compatibilidad con vistas previas) */
  essence: string
  essenceReversed: string
  meaning: string
  reversedMeaning: string
  andeanMessage: string
  advice: string
  /** Identificador del SVG / motivo visual */
  motif: CardMotif
}

export type CardMotif =
  | 'chaski'
  | 'paqo'
  | 'quilla'
  | 'pachamama'
  | 'apu'
  | 'amauta'
  | 'yanantin'
  | 'qhapaqnan'
  | 'puma'
  | 'ermita'
  | 'pachakuti'
  | 'ayni'
  | 'ukupacha'
  | 'mallki'
  | 'qocha'
  | 'supay'
  | 'illapa'
  | 'chaska'
  | 'amaru'
  | 'inti'
  | 'kuntur'
  | 'chakana'

/* ============================================================
 * Tiradas y posiciones
 * ============================================================ */

export type SpreadId =
  | 'carta-del-dia'
  | 'una-carta'
  | 'tres-cartas'
  | 'accion-tres'
  | 'amor'
  | 'trabajo'
  | 'camino-siete'
  | 'reloj-sombras'

/** La "lente" de una posición: qué dimensión de la carta lee el motor.
 *  Cada lente define qué frase núcleo y qué contexto de significado usar. */
export type PositionLens =
  | 'dia'
  | 'respuesta'
  | 'pasado'
  | 'presente'
  | 'futuro'
  | 'sentimiento-propio'
  | 'sentimiento-ajeno'
  | 'mostrado'
  | 'oculto'
  | 'bloqueo'
  | 'accion'
  | 'tendencia'
  | 'situacion'
  | 'recursos'
  | 'dificultad'
  | 'factor-oculto'
  | 'riesgo'
  | 'resultado'
  | 'origen'
  | 'sosten'
  | 'obstaculo'
  | 'aprendizaje'
  | 'horizonte'
  | 'energia'
  | 'origen-visible'
  | 'origen-oculto'
  | 'entorno'
  | 'persona'
  | 'intencion'
  | 'miedo'
  | 'evidencia-favor'
  | 'evidencia-contra'
  | 'proteccion'
  | 'sintesis'

export interface SpreadPosition {
  id: string
  label: string
  description: string
  lens: PositionLens
}

export interface SpreadDefinition {
  id: SpreadId
  title: string
  subtitle: string
  description: string
  cardCount: number
  positions: SpreadPosition[]
  /** Si requiere pregunta obligatoria */
  requiresQuestion: boolean
  /** Disposición visual: fila/abanico o círculo de reloj */
  layout: 'linea' | 'reloj'
}

export interface DrawnCard {
  card: AndeanCard
  position: SpreadPosition
  reversed: boolean
  revealed: boolean
}

/* ============================================================
 * Narrativa de la lectura
 * ============================================================ */

/** Relación detectada entre dos cartas consecutivas */
export type LinkRelation = 'refuerza' | 'contradice' | 'matiza'

export interface ReadingNarrative {
  /** Título personalizado de la lectura */
  titulo: string
  /** Pregunta consultada (vacía en carta del día sin intención) */
  pregunta: string
  tema: ThemeId
  /** Enfoque que gobernó toda la interpretación. */
  enfoque: EnfoqueConsulta
  /** "El relato de la tirada": párrafos encadenados */
  relato: string[]
  /** "Lo que permanece oculto" */
  oculto: string
  /** "La respuesta más clara" */
  respuesta: string
  /** "Consejo de los Apus" */
  consejo: string
  /** Aviso orientativo (el reloj de las sombras añade el suyo propio) */
  advertencia: string
}

export interface ReadingResult {
  id: string
  spreadId: SpreadId
  spreadTitle: string
  question: string
  cards: DrawnCard[]
  createdAt: string
  /** Interpretación encadenada completa */
  narrative: ReadingNarrative
  /** Reserva para usuario autenticado */
  userId?: string | null
}

export type AppView =
  | 'inicio'
  | 'lecturas'
  | 'cartas'
  | 'diario'
  | 'acerca'
  | 'sesion'

export type ReadingPhase =
  | 'setup'
  | 'shuffling'
  | 'selecting'
  | 'revealing'
  | 'complete'
