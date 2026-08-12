import type { SpreadDefinition } from '../types'

/** Las ocho tiradas del oráculo. El motor de interpretación usa la lente (`lens`)
 *  de cada posición para leer la carta según el lugar que ocupa. */
export const SPREADS: SpreadDefinition[] = [
  {
    id: 'carta-del-dia',
    title: 'Carta del día',
    subtitle: 'Orientación cotidiana',
    description:
      'Una carta que acompaña tu jornada. Ideal para recibir un mensaje claro de los apus al despertar.',
    cardCount: 1,
    requiresQuestion: false,
    layout: 'linea',
    positions: [
      {
        id: 'dia',
        label: 'Mensaje del día',
        description: 'La energía que te acompaña hoy',
        lens: 'dia',
      },
    ],
  },
  {
    id: 'accion-tres',
    title: 'Lectura de acción',
    subtitle: 'Respuesta de tres cartas',
    description:
      'Tres posiciones para distinguir intención, condicionantes y la acción más probable dentro del tiempo consultado.',
    cardCount: 3,
    requiresQuestion: true,
    layout: 'linea',
    positions: [
      {
        id: 'intencion-actual',
        label: 'Intención actual de la persona',
        description: 'Lo que esa persona desea o contempla hacer',
        lens: 'intencion',
      },
      {
        id: 'condicion-conducta',
        label: 'Obstáculo o impulso',
        description: 'Lo que frena o empuja su conducta',
        lens: 'bloqueo',
      },
      {
        id: 'accion-probable',
        label: 'Acción más probable',
        description: 'La conducta más probable dentro del tiempo consultado',
        lens: 'accion',
      },
    ],
  },
  {
    id: 'una-carta',
    title: 'Lectura directa',
    subtitle: 'Respuesta de una carta',
    description:
      'Una sola carta para iluminar una pregunta concreta con profundidad y sencillez.',
    cardCount: 1,
    requiresQuestion: true,
    layout: 'linea',
    positions: [
      {
        id: 'respuesta',
        label: 'Respuesta',
        description: 'Lo que los apus revelan a tu pregunta',
        lens: 'respuesta',
      },
    ],
  },
  {
    id: 'tres-cartas',
    title: 'Pasado, presente y futuro',
    subtitle: 'Tirada de tres cartas',
    description:
      'El hilo del tiempo: de dónde vienes, dónde estás y hacia dónde se abre el camino.',
    cardCount: 3,
    requiresQuestion: true,
    layout: 'linea',
    positions: [
      {
        id: 'pasado',
        label: 'Pasado',
        description: 'Raíces e influencias que aún resuenan',
        lens: 'pasado',
      },
      {
        id: 'presente',
        label: 'Presente',
        description: 'El momento que habitas ahora',
        lens: 'presente',
      },
      {
        id: 'futuro',
        label: 'Futuro',
        description: 'Tendencia si sigues el impulso actual',
        lens: 'futuro',
      },
    ],
  },
  {
    id: 'amor',
    title: 'Amor y relaciones',
    subtitle: 'Tirada de siete cartas',
    description:
      'Siete posiciones para distinguir lo que se siente, lo que se muestra, lo que se esconde y hacia dónde tiende el vínculo.',
    cardCount: 7,
    requiresQuestion: true,
    layout: 'linea',
    positions: [
      {
        id: 'siente-consultante',
        label: 'Lo que sientes tú',
        description: 'Lo que siente la persona consultante',
        lens: 'sentimiento-propio',
      },
      {
        id: 'siente-otro',
        label: 'Lo que siente la otra persona',
        description: 'La emoción real del otro lado del vínculo',
        lens: 'sentimiento-ajeno',
      },
      {
        id: 'muestran',
        label: 'Lo que ambos muestran',
        description: 'La conducta exterior, lo que se ve desde fuera',
        lens: 'mostrado',
      },
      {
        id: 'oculto',
        label: 'Lo que permanece oculto',
        description: 'Lo no dicho que circula entre ambos',
        lens: 'oculto',
      },
      {
        id: 'bloqueo',
        label: 'El bloqueo principal',
        description: 'Lo que impide que el vínculo avance',
        lens: 'bloqueo',
      },
      {
        id: 'cambio',
        label: 'La acción o cambio que se acerca',
        description: 'El movimiento que ya se está gestando',
        lens: 'accion',
      },
      {
        id: 'tendencia',
        label: 'Tendencia si nada cambia',
        description: 'Hacia dónde va el vínculo por inercia',
        lens: 'tendencia',
      },
    ],
  },
  {
    id: 'trabajo',
    title: 'Trabajo, dinero y decisiones',
    subtitle: 'Tirada de siete cartas',
    description:
      'Siete posiciones para ver el terreno completo: recursos, dificultades visibles y ocultas, riesgos y resultado probable.',
    cardCount: 7,
    requiresQuestion: true,
    layout: 'linea',
    positions: [
      {
        id: 'situacion',
        label: 'Situación actual',
        description: 'El terreno en el que estás parada hoy',
        lens: 'situacion',
      },
      {
        id: 'recursos',
        label: 'Recursos disponibles',
        description: 'Con qué cuentas, aunque no lo veas',
        lens: 'recursos',
      },
      {
        id: 'dificultad',
        label: 'Dificultad visible',
        description: 'El problema que ya está a la vista',
        lens: 'dificultad',
      },
      {
        id: 'factor-oculto',
        label: 'Factor oculto',
        description: 'Lo que influye sin mostrarse',
        lens: 'factor-oculto',
      },
      {
        id: 'riesgo',
        label: 'Riesgo a evitar',
        description: 'El error que conviene no cometer',
        lens: 'riesgo',
      },
      {
        id: 'accion',
        label: 'Acción aconsejada',
        description: 'El paso concreto hacia el equilibrio',
        lens: 'accion',
      },
      {
        id: 'resultado',
        label: 'Resultado probable',
        description: 'Adónde lleva el camino actual si se mantiene',
        lens: 'resultado',
      },
    ],
  },
  {
    id: 'camino-siete',
    title: 'Camino de los siete Apus',
    subtitle: 'Lectura completa encadenada',
    description:
      'Siete cartas que forman una sola historia: desde el origen del asunto hasta el horizonte, pasando por el obstáculo y el aprendizaje.',
    cardCount: 7,
    requiresQuestion: true,
    layout: 'linea',
    positions: [
      {
        id: 'origen',
        label: 'Origen del asunto',
        description: 'De dónde viene lo que consultas',
        lens: 'origen',
      },
      {
        id: 'presente',
        label: 'Situación presente',
        description: 'Dónde está el asunto hoy',
        lens: 'presente',
      },
      {
        id: 'sosten',
        label: 'Lo que te sostiene',
        description: 'El recurso o apoyo con el que cuentas',
        lens: 'sosten',
      },
      {
        id: 'obstaculo',
        label: 'Obstáculo central',
        description: 'Lo que traba el paso',
        lens: 'obstaculo',
      },
      {
        id: 'aprendizaje',
        label: 'Aprendizaje necesario',
        description: 'Lo que la situación viene a enseñar',
        lens: 'aprendizaje',
      },
      {
        id: 'accion',
        label: 'Acción recomendada',
        description: 'El paso concreto a dar',
        lens: 'accion',
      },
      {
        id: 'horizonte',
        label: 'Horizonte probable',
        description: 'Hacia dónde se abre el camino',
        lens: 'horizonte',
      },
    ],
  },
  {
    id: 'reloj-sombras',
    title: 'El reloj de las sombras',
    subtitle: 'Tirada circular de doce cartas',
    description:
      'Doce posiciones para explorar influencias ocultas, temores, conflictos y patrones que rodean una situación.',
    cardCount: 12,
    requiresQuestion: true,
    layout: 'reloj',
    positions: [
      {
        id: 'energia',
        label: 'Estado energético actual',
        description: 'Cómo está tu energía hoy',
        lens: 'energia',
      },
      {
        id: 'origen-visible',
        label: 'Origen visible del malestar',
        description: 'La causa que ya se puede nombrar',
        lens: 'origen-visible',
      },
      {
        id: 'origen-oculto',
        label: 'Origen oculto o inconsciente',
        description: 'Lo que empuja desde abajo sin mostrarse',
        lens: 'origen-oculto',
      },
      {
        id: 'entorno',
        label: 'Influencias del entorno',
        description: 'Lo que llega desde las personas y lugares cercanos',
        lens: 'entorno',
      },
      {
        id: 'persona',
        label: 'Persona o vínculo relacionado',
        description: 'El lazo humano que participa en el asunto',
        lens: 'persona',
      },
      {
        id: 'intencion',
        label: 'Intención que se percibe',
        description: 'La energía de intención que rodea la situación',
        lens: 'intencion',
      },
      {
        id: 'bloqueo',
        label: 'Bloqueo principal',
        description: 'Lo que impide que la energía circule',
        lens: 'bloqueo',
      },
      {
        id: 'miedo',
        label: 'Miedo o percepción distorsionada',
        description: 'Sugestión, temor o idea que agranda la sombra',
        lens: 'miedo',
      },
      {
        id: 'evidencia-favor',
        label: 'Evidencia a favor de influencia externa',
        description: 'Lo que apoyaría la idea de una influencia de fuera',
        lens: 'evidencia-favor',
      },
      {
        id: 'evidencia-contra',
        label: 'Evidencia en contra o explicación alternativa',
        description: 'Lo que sugiere una causa más simple o interna',
        lens: 'evidencia-contra',
      },
      {
        id: 'proteccion',
        label: 'Protección y recursos',
        description: 'Fortalezas y apoyos disponibles',
        lens: 'proteccion',
      },
      {
        id: 'sintesis',
        label: 'Síntesis y acción recomendada',
        description: 'La carta que cierra el círculo',
        lens: 'sintesis',
      },
    ],
  },
]

export function getSpreadById(id: string): SpreadDefinition | undefined {
  return SPREADS.find((s) => s.id === id)
}
