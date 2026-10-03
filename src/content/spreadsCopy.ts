import type { Language } from '../context/LanguageContext'
import type { SpreadDefinition, SpreadId } from '../types'
import { SPREADS } from '../data/spreads'

type SpreadCopy = {
  title: string
  subtitle: string
  description: string
  positions: Record<string, string>
}

const spreads: Record<Language, Record<SpreadId, SpreadCopy>> = {
  es: {
    'cruz-cinco': {
      title: 'Cruz de cinco cartas', subtitle: 'Lectura de una persona o situación',
      description: 'Una carta arriba, tres de izquierda a derecha y una abajo. Significados provisionales hasta incorporar el método de la autora.',
      positions: { arriba: 'Arriba · lo visible', izquierda: 'Izquierda · antecedente', centro: 'Centro · núcleo', derecha: 'Derecha · tendencia', abajo: 'Abajo · raíz' },
    },
    'carta-del-dia': {
      title: 'Carta del día',
      subtitle: 'Orientación cotidiana',
      description: 'Una carta que acompaña tu jornada. Ideal para recibir un mensaje claro de los apus al despertar.',
      positions: { dia: 'Mensaje del día' },
    },
    'accion-tres': {
      title: 'Lectura de acción',
      subtitle: 'Respuesta de tres cartas',
      description: 'Tres posiciones para distinguir intención, condicionantes y la acción más probable dentro del tiempo consultado.',
      positions: {
        'intencion-actual': 'Intención actual de la persona',
        'condicion-conducta': 'Obstáculo o impulso',
        'accion-probable': 'Acción más probable',
      },
    },
    'una-carta': {
      title: 'Lectura directa',
      subtitle: 'Respuesta de una carta',
      description: 'Una sola carta para iluminar una pregunta concreta con profundidad y sencillez.',
      positions: { respuesta: 'Respuesta' },
    },
    'tres-cartas': {
      title: 'Pasado, presente y futuro',
      subtitle: 'Tirada de tres cartas',
      description: 'El hilo del tiempo: de dónde vienes, dónde estás y hacia dónde se abre el camino.',
      positions: { pasado: 'Pasado', presente: 'Presente', futuro: 'Futuro' },
    },
    amor: {
      title: 'Amor y relaciones',
      subtitle: 'Tirada de siete cartas',
      description: 'Siete posiciones para distinguir lo que se siente, lo que se muestra, lo que se esconde y hacia dónde tiende el vínculo.',
      positions: {
        'siente-consultante': 'Lo que sientes tú',
        'siente-otro': 'Lo que siente la otra persona',
        muestran: 'Lo que ambos muestran',
        oculto: 'Lo que permanece oculto',
        bloqueo: 'El bloqueo principal',
        cambio: 'La acción o cambio que se acerca',
        tendencia: 'Tendencia si nada cambia',
      },
    },
    trabajo: {
      title: 'Trabajo, dinero y decisiones',
      subtitle: 'Tirada de siete cartas',
      description: 'Siete posiciones para ver el terreno completo: recursos, dificultades visibles y ocultas, riesgos y resultado probable.',
      positions: {
        situacion: 'Situación actual',
        recursos: 'Recursos disponibles',
        dificultad: 'Dificultad visible',
        'factor-oculto': 'Factor oculto',
        riesgo: 'Riesgo a evitar',
        accion: 'Acción aconsejada',
        resultado: 'Resultado probable',
      },
    },
    'camino-siete': {
      title: 'Camino de los siete Apus',
      subtitle: 'Lectura completa encadenada',
      description: 'Siete cartas que forman una sola historia: desde el origen del asunto hasta el horizonte, pasando por el obstáculo y el aprendizaje.',
      positions: {
        origen: 'Origen del asunto',
        presente: 'Situación presente',
        sosten: 'Lo que te sostiene',
        obstaculo: 'Obstáculo central',
        aprendizaje: 'Aprendizaje necesario',
        accion: 'Acción recomendada',
        horizonte: 'Horizonte probable',
      },
    },
    'reloj-sombras': {
      title: 'El reloj de las sombras',
      subtitle: 'Tirada circular de doce cartas',
      description: 'Doce posiciones para explorar influencias ocultas, temores, conflictos y patrones que rodean una situación.',
      positions: {
        energia: 'Estado energético actual',
        'origen-visible': 'Origen visible del malestar',
        'origen-oculto': 'Origen oculto o inconsciente',
        entorno: 'Influencias del entorno',
        persona: 'Persona o vínculo relacionado',
        intencion: 'Intención que se percibe',
        bloqueo: 'Bloqueo principal',
        miedo: 'Miedo o percepción distorsionada',
        'evidencia-favor': 'Evidencia a favor de influencia externa',
        'evidencia-contra': 'Evidencia en contra o explicación alternativa',
        proteccion: 'Protección y recursos',
        sintesis: 'Síntesis y acción recomendada',
      },
    },
  },
  en: {
    'cruz-cinco': {
      title: 'Five-card cross', subtitle: 'A person or situation',
      description: 'One card above, three from left to right and one below. Position meanings are provisional until the author’s method is added.',
      positions: { arriba: 'Above · visible', izquierda: 'Left · background', centro: 'Center · core', derecha: 'Right · tendency', abajo: 'Below · root' },
    },
    'carta-del-dia': {
      title: 'Card of the day',
      subtitle: 'Daily guidance',
      description: 'One card to walk with you through the day. A clear message from the Apus as you begin.',
      positions: { dia: 'Message of the day' },
    },
    'accion-tres': {
      title: 'Action reading',
      subtitle: 'Three-card answer',
      description: 'Three positions to separate intention, what holds or pushes, and the most likely action.',
      positions: {
        'intencion-actual': 'Current intention',
        'condicion-conducta': 'Obstacle or impulse',
        'accion-probable': 'Most likely action',
      },
    },
    'una-carta': {
      title: 'Direct reading',
      subtitle: 'One-card answer',
      description: 'A single card to light one concrete question with depth and simplicity.',
      positions: { respuesta: 'Answer' },
    },
    'tres-cartas': {
      title: 'Past, present and future',
      subtitle: 'Three-card spread',
      description: 'The thread of time: where you come from, where you stand, and where the path opens.',
      positions: { pasado: 'Past', presente: 'Present', futuro: 'Future' },
    },
    amor: {
      title: 'Love and relationships',
      subtitle: 'Seven-card spread',
      description: 'Seven positions to tell apart what is felt, what is shown, what is hidden, and where the bond tends to go.',
      positions: {
        'siente-consultante': 'What you feel',
        'siente-otro': 'What the other person feels',
        muestran: 'What both show',
        oculto: 'What remains hidden',
        bloqueo: 'The main block',
        cambio: 'The action or change approaching',
        tendencia: 'Tendency if nothing changes',
      },
    },
    trabajo: {
      title: 'Work, money and decisions',
      subtitle: 'Seven-card spread',
      description: 'Seven positions to see the whole ground: resources, visible and hidden difficulties, risks and likely outcome.',
      positions: {
        situacion: 'Current situation',
        recursos: 'Available resources',
        dificultad: 'Visible difficulty',
        'factor-oculto': 'Hidden factor',
        riesgo: 'Risk to avoid',
        accion: 'Advised action',
        resultado: 'Likely result',
      },
    },
    'camino-siete': {
      title: 'Path of the seven Apus',
      subtitle: 'Full chained reading',
      description: 'Seven cards as one story: from the origin of the matter to the horizon, through the obstacle and the lesson.',
      positions: {
        origen: 'Origin of the matter',
        presente: 'Present situation',
        sosten: 'What supports you',
        obstaculo: 'Central obstacle',
        aprendizaje: 'Needed lesson',
        accion: 'Recommended action',
        horizonte: 'Likely horizon',
      },
    },
    'reloj-sombras': {
      title: 'The clock of shadows',
      subtitle: 'Twelve-card circle',
      description: 'Twelve positions to explore hidden influences, fears, conflicts and patterns around a situation.',
      positions: {
        energia: 'Current energy',
        'origen-visible': 'Visible origin of unease',
        'origen-oculto': 'Hidden or unconscious origin',
        entorno: 'Influences from the surroundings',
        persona: 'Related person or bond',
        intencion: 'Perceived intention',
        bloqueo: 'Main block',
        miedo: 'Fear or distorted perception',
        'evidencia-favor': 'Evidence for an outside influence',
        'evidencia-contra': 'Evidence against, or a simpler cause',
        proteccion: 'Protection and resources',
        sintesis: 'Synthesis and recommended action',
      },
    },
  },
  fr: {
    'cruz-cinco': {
      title: 'Croix de cinq cartes', subtitle: 'Une personne ou une situation',
      description: 'Une carte en haut, trois de gauche à droite et une en bas. Sens des positions provisoires en attendant la méthode de l’auteure.',
      positions: { arriba: 'Haut · visible', izquierda: 'Gauche · antécédent', centro: 'Centre · noyau', derecha: 'Droite · tendance', abajo: 'Bas · racine' },
    },
    'carta-del-dia': {
      title: 'Carte du jour',
      subtitle: 'Orientation quotidienne',
      description: 'Une carte pour accompagner votre journée. Un message clair des Apus au réveil.',
      positions: { dia: 'Message du jour' },
    },
    'accion-tres': {
      title: 'Tirage d’action',
      subtitle: 'Réponse en trois cartes',
      description: 'Trois positions pour distinguer l’intention, ce qui freine ou pousse, et l’action la plus probable.',
      positions: {
        'intencion-actual': 'Intention actuelle',
        'condicion-conducta': 'Obstacle ou élan',
        'accion-probable': 'Action la plus probable',
      },
    },
    'una-carta': {
      title: 'Tirage direct',
      subtitle: 'Réponse en une carte',
      description: 'Une seule carte pour éclairer une question concrète avec profondeur et simplicité.',
      positions: { respuesta: 'Réponse' },
    },
    'tres-cartas': {
      title: 'Passé, présent et futur',
      subtitle: 'Tirage en trois cartes',
      description: 'Le fil du temps : d’où vous venez, où vous êtes, et vers où le chemin s’ouvre.',
      positions: { pasado: 'Passé', presente: 'Présent', futuro: 'Futur' },
    },
    amor: {
      title: 'Amour et relations',
      subtitle: 'Tirage en sept cartes',
      description: 'Sept positions pour distinguer ce qui se sent, ce qui se montre, ce qui reste caché et où tend le lien.',
      positions: {
        'siente-consultante': 'Ce que vous ressentez',
        'siente-otro': 'Ce que ressent l’autre',
        muestran: 'Ce que tous deux montrent',
        oculto: 'Ce qui reste caché',
        bloqueo: 'Le blocage principal',
        cambio: 'L’action ou le changement qui s’approche',
        tendencia: 'Tendance si rien ne change',
      },
    },
    trabajo: {
      title: 'Travail, argent et décisions',
      subtitle: 'Tirage en sept cartes',
      description: 'Sept positions pour voir tout le terrain : ressources, difficultés visibles et cachées, risques et résultat probable.',
      positions: {
        situacion: 'Situation actuelle',
        recursos: 'Ressources disponibles',
        dificultad: 'Difficulté visible',
        'factor-oculto': 'Facteur caché',
        riesgo: 'Risque à éviter',
        accion: 'Action conseillée',
        resultado: 'Résultat probable',
      },
    },
    'camino-siete': {
      title: 'Chemin des sept Apus',
      subtitle: 'Lecture complète enchaînée',
      description: 'Sept cartes comme une seule histoire : de l’origine jusqu’à l’horizon, en passant par l’obstacle et l’apprentissage.',
      positions: {
        origen: 'Origine de la question',
        presente: 'Situation présente',
        sosten: 'Ce qui vous soutient',
        obstaculo: 'Obstacle central',
        aprendizaje: 'Apprentissage nécessaire',
        accion: 'Action recommandée',
        horizonte: 'Horizon probable',
      },
    },
    'reloj-sombras': {
      title: 'L’horloge des ombres',
      subtitle: 'Cercle de douze cartes',
      description: 'Douze positions pour explorer influences cachées, peurs, conflits et schémas autour d’une situation.',
      positions: {
        energia: 'État énergétique actuel',
        'origen-visible': 'Origine visible du malaise',
        'origen-oculto': 'Origine cachée ou inconsciente',
        entorno: 'Influences de l’entourage',
        persona: 'Personne ou lien concerné',
        intencion: 'Intention perçue',
        bloqueo: 'Blocage principal',
        miedo: 'Peur ou perception déformée',
        'evidencia-favor': 'Indices d’une influence extérieure',
        'evidencia-contra': 'Indices contraires, ou cause plus simple',
        proteccion: 'Protection et ressources',
        sintesis: 'Synthèse et action recommandée',
      },
    },
  },
}

export function getSpreadCopy(id: SpreadId, language: Language): SpreadCopy {
  return spreads[language][id]
}

export function localizeSpread(spread: SpreadDefinition, language: Language): SpreadDefinition {
  const copy = getSpreadCopy(spread.id, language)
  return {
    ...spread,
    title: copy.title,
    subtitle: copy.subtitle,
    description: copy.description,
    positions: spread.positions.map((position) => ({
      ...position,
      label: copy.positions[position.id] ?? position.label,
    })),
  }
}

export function localizedSpreads(language: Language): SpreadDefinition[] {
  return SPREADS.map((spread) => localizeSpread(spread, language))
}

export function positionLabel(
  spread: SpreadDefinition,
  positionId: string,
  language: Language,
): string {
  return getSpreadCopy(spread.id, language).positions[positionId]
    ?? spread.positions.find((p) => p.id === positionId)?.label
    ?? positionId
}
