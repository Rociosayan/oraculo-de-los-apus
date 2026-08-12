import type { AndeanCard, CardDepth, CardMotif } from '../types'
import { PROFUNDIDAD_1 } from './profundidad-1'
import { PROFUNDIDAD_2 } from './profundidad-2'
import { PROFUNDIDAD_3 } from './profundidad-3'

interface BaseCard {
  id: number
  name: string
  symbol: string
  arcanaRef: string
  keywords: string[]
  essence: string
  essenceReversed: string
  meaning: string
  reversedMeaning: string
  andeanMessage: string
  advice: string
  motif: CardMotif
}

/** 22 arcanos mayores reinterpretados con símbolos andinos.
 *  Los textos base usan lenguaje cotidiano; la profundidad por contexto
 *  vive en los archivos profundidad-1/2/3 y se fusiona al final.
 */
const BASE_CARDS: BaseCard[] = [
  {
    id: 0,
    name: 'El Mensajero',
    symbol: 'Chaski',
    arcanaRef: 'El Loco',
    keywords: ['comienzo', 'noticia', 'atreverse'],
    essence: 'un comienzo que pide valor',
    essenceReversed: 'un impulso que todavía no está listo',
    meaning:
      'Algo nuevo quiere empezar. Puede llegar una noticia, una invitación o simplemente las ganas de lanzarte sin tenerlo todo resuelto. Es momento de atreverte con eso que ya sientes.',
    reversedMeaning:
      'Estás dando vueltas o te falta información para decidir. Antes de lanzarte, aclara los datos y no prometas lo que aún no puedes cumplir.',
    andeanMessage:
      'El chaski corre de montaña en montaña llevando el mensaje. Lo suyo es ponerse en movimiento.',
    advice: 'Da hoy un primer paso pequeño y concreto, aunque no tengas todo el plan.',
    motif: 'chaski',
  },
  {
    id: 1,
    name: 'El Oficiante',
    symbol: 'Paqo',
    arcanaRef: 'El Mago',
    keywords: ['intención', 'recursos', 'enfoque'],
    essence: 'una intención clara que ordena tus recursos',
    essenceReversed: 'una intención dispersa o poco sincera',
    meaning:
      'Ya tienes lo que necesitas: capacidad, contactos y tiempo. Lo que falta es decidir para qué los usas. Cuando tu intención es clara, lo demás empieza a ordenarse solo.',
    reversedMeaning:
      'Estás gastando energía en muchas direcciones, o dices una cosa y haces otra. Vuelve a lo esencial y sé honesta contigo antes de seguir.',
    andeanMessage:
      'El paqo prepara la ofrenda con cuidado: cada elemento tiene una razón de estar ahí.',
    advice:
      'Escribe tu intención en una sola frase y revisa que lo que haces esta semana la sostenga.',
    motif: 'paqo',
  },
  {
    id: 2,
    name: 'Mama Quilla',
    symbol: 'La Luna',
    arcanaRef: 'La Sacerdotisa',
    keywords: ['intuición', 'ritmos', 'espera'],
    essence: 'una intuición que conviene escuchar',
    essenceReversed: 'una confusión emocional que enturbia la vista',
    meaning:
      'Hay algo que sientes antes de poder explicarlo, y esa señal merece atención. También es tiempo de respetar tus ritmos: no todo se consigue empujando.',
    reversedMeaning:
      'Las emociones están revueltas y cuesta separar lo real de lo que temes. Espera a estar más tranquila antes de decidir nada importante.',
    andeanMessage:
      'Mama Quilla marca los ciclos del agua y del descanso. Cada cosa tiene su fase.',
    advice:
      'Antes de resolver, deja pasar una noche y anota qué sientes al despertar.',
    motif: 'quilla',
  },
  {
    id: 3,
    name: 'Pachamama',
    symbol: 'Madre Tierra',
    arcanaRef: 'La Emperatriz',
    keywords: ['cuidado', 'abundancia', 'constancia'],
    essence: 'algo que crece porque lo estás cuidando',
    essenceReversed: 'un descuido de lo que te sostiene',
    meaning:
      'Lo que vienes cuidando está dando fruto o está por darlo. Buen momento para el hogar, el cuerpo, el dinero y los proyectos que necesitan constancia más que prisa.',
    reversedMeaning:
      'Estás descuidando tu salud, tu casa o tus finanzas por atender otras cosas. Vuelve a lo básico antes de exigirte más resultados.',
    andeanMessage:
      'La tierra devuelve a quien la trabaja con respeto y sin apuro.',
    advice:
      'Elige una cosa concreta que te sostiene —descanso, comida, ahorro— y ordénala esta semana.',
    motif: 'pachamama',
  },
  {
    id: 4,
    name: 'El Apu',
    symbol: 'Espíritu de la montaña',
    arcanaRef: 'El Emperador',
    keywords: ['orden', 'límites', 'autoridad'],
    essence: 'la necesidad de poner orden y límites',
    essenceReversed: 'rigidez excesiva o falta de rumbo',
    meaning:
      'Hace falta estructura: prioridades claras, horarios, reglas del juego. Puede aparecer una figura de autoridad, o la necesidad de que seas tú quien tome el mando.',
    reversedMeaning:
      'O te están imponiendo demasiado, o nadie está poniendo orden y todo se dispersa. Revisa quién decide qué y recupera la parte que te toca.',
    andeanMessage:
      'El apu sostiene el valle sin moverse. Su fuerza está en la firmeza tranquila.',
    advice:
      'Define un límite concreto —de tiempo, dinero o disponibilidad— y comunícalo.',
    motif: 'apu',
  },
  {
    id: 5,
    name: 'El Amauta',
    symbol: 'El maestro',
    arcanaRef: 'El Hierofante',
    keywords: ['consejo', 'estudio', 'experiencia'],
    essence: 'un aprendizaje o un consejo con experiencia detrás',
    essenceReversed: 'cerrarte al consejo o seguirlo sin criterio',
    meaning:
      'Es momento de estudiar, pedir consejo o dejarte guiar por alguien que ya pasó por esto. También puede ser que tú seas quien tiene algo que enseñar.',
    reversedMeaning:
      'Estás rechazando ayuda por orgullo, o siguiendo a alguien sin cuestionarlo. Busca fuentes confiables y piensa con cabeza propia.',
    andeanMessage:
      'El amauta guarda lo aprendido por generaciones y lo entrega sin apuro.',
    advice:
      'Consulta a alguien con experiencia real en el tema y escucha sin ponerte a la defensiva.',
    motif: 'amauta',
  },
  {
    id: 6,
    name: 'Yanantin',
    symbol: 'Dualidad complementaria',
    arcanaRef: 'Los Enamorados',
    keywords: ['vínculo', 'elección', 'acuerdo'],
    essence: 'un vínculo o una elección entre dos caminos',
    essenceReversed: 'un desequilibrio entre las dos partes',
    meaning:
      'Aparece una relación importante o una decisión en la que hay que elegir. Lo que funciona no es que sean iguales, sino que se complementen.',
    reversedMeaning:
      'Uno de los dos lados está dando o decidiendo más que el otro. Conviene hablarlo antes de que el desgaste haga lo suyo.',
    andeanMessage:
      'Yanantin: dos cosas distintas que, juntas, sostienen el mundo.',
    advice:
      'Di con claridad qué ofreces y qué necesitas, y pide lo mismo de la otra parte.',
    motif: 'yanantin',
  },
  {
    id: 7,
    name: 'Qhapaq Ñan',
    symbol: 'El gran camino',
    arcanaRef: 'El Carro',
    keywords: ['avance', 'rumbo', 'constancia'],
    essence: 'un avance real que ya está en marcha',
    essenceReversed: 'un avance frenado o mal dirigido',
    meaning:
      'Estás en movimiento y hay progreso concreto. Puede ser un viaje, un cambio de lugar o un proyecto que por fin arranca. Sostén el rumbo.',
    reversedMeaning:
      'Te estás dispersando, o avanzas rápido en una dirección que no te convence. Detente y revisa el destino, no solo la velocidad.',
    andeanMessage:
      'El gran camino une pueblos lejanos, y se recorre tramo por tramo.',
    advice:
      'Fija una meta para los próximos siete días y quita una distracción que te desvía.',
    motif: 'qhapaqnan',
  },
  {
    id: 8,
    name: 'Puma',
    symbol: 'Fuerza serena',
    arcanaRef: 'La Fuerza',
    keywords: ['calma', 'coraje', 'autocontrol'],
    essence: 'una fuerza tranquila que no necesita gritar',
    essenceReversed: 'reacciones impulsivas o miedo disfrazado de enojo',
    meaning:
      'Tienes más poder del que crees, y funciona mejor en calma. No hace falta alzar la voz ni imponerte para que te tomen en serio.',
    reversedMeaning:
      'Estás respondiendo desde el enojo o el miedo. La prisa te resta autoridad: respira antes de contestar.',
    andeanMessage: 'El puma camina en silencio y llega igual.',
    advice:
      'Cuando algo te altere, deja pasar un día antes de responder.',
    motif: 'puma',
  },
  {
    id: 9,
    name: 'La Ermita Andina',
    symbol: 'Solitario del Apu',
    arcanaRef: 'El Ermitaño',
    keywords: ['pausa', 'silencio', 'claridad'],
    essence: 'una pausa para ver con claridad',
    essenceReversed: 'un aislamiento que ya no te ayuda',
    meaning:
      'Necesitas silencio y algo de distancia del ruido para ver claro. No es escapar: es darte el espacio de escucharte.',
    reversedMeaning:
      'Te estás aislando de más y eso alimenta la confusión. Vuelve a hablar con alguien de confianza.',
    andeanMessage:
      'En la altura el aire es limpio y los pensamientos se acomodan solos.',
    advice:
      'Reserva un rato sin pantallas para caminar o escribir lo que te ronda.',
    motif: 'ermita',
  },
  {
    id: 10,
    name: 'Pachakuti',
    symbol: 'Vuelco del tiempo',
    arcanaRef: 'La Rueda de la Fortuna',
    keywords: ['cambio', 'ciclo', 'adaptación'],
    essence: 'un cambio de ciclo que ya empezó',
    essenceReversed: 'resistencia a un cambio que igual va a pasar',
    meaning:
      'Las cosas están girando. Algo termina y otra cosa empieza, muchas veces sin que lo hayas elegido. Adaptarte te costará menos que resistirte.',
    reversedMeaning:
      'Te aferras a algo que ya cambió. Cuanto más tardes en aceptarlo, más brusco será el giro.',
    andeanMessage:
      'Pachakuti da vuelta el mundo para que pueda volver a florecer.',
    advice:
      'Escribe qué está terminando y qué espacio libre deja; decide qué pones ahí.',
    motif: 'pachakuti',
  },
  {
    id: 11,
    name: 'Ayni',
    symbol: 'Reciprocidad',
    arcanaRef: 'La Justicia',
    keywords: ['equilibrio', 'intercambio', 'cuentas claras'],
    essence: 'un intercambio que necesita quedar parejo',
    essenceReversed: 'una cuenta desequilibrada que desgasta',
    meaning:
      'Es momento de ordenar cuentas, y no solo de dinero: también de tiempo, favores y afecto. Lo justo aquí es que el intercambio sea parejo.',
    reversedMeaning:
      'Estás dando mucho más de lo que recibes, o al revés. Eso desgasta el vínculo aunque nadie lo diga en voz alta.',
    andeanMessage:
      'Ayni: hoy por ti, mañana por mí. Así se sostiene la comunidad.',
    advice:
      'Devuelve algo que tengas pendiente, o pide con claridad la ayuda que necesitas.',
    motif: 'ayni',
  },
  {
    id: 12,
    name: 'Uku Pacha',
    symbol: 'Mundo interior',
    arcanaRef: 'El Colgado',
    keywords: ['perspectiva', 'espera', 'revisión'],
    essence: 'una pausa que te cambia la perspectiva',
    essenceReversed: 'quedarte atascada dándole vueltas',
    meaning:
      'Conviene detenerte y mirar el asunto desde otro ángulo. Lo que hoy parece un problema puede verse muy distinto si dejas de empujar.',
    reversedMeaning:
      'Llevas demasiado tiempo pensando sin actuar. Ya viste suficiente: ahora mueve una pieza.',
    andeanMessage:
      'Bajo la tierra las raíces trabajan aunque nadie las vea.',
    advice:
      'Posterga la decisión un día y anota qué cambió en tu forma de verla.',
    motif: 'ukupacha',
  },
  {
    id: 13,
    name: 'Mallki',
    symbol: 'Ancestro y semilla',
    arcanaRef: 'La Muerte',
    keywords: ['cierre', 'duelo', 'renacer'],
    essence: 'un final necesario que deja semilla',
    essenceReversed: 'un cierre que no terminas de hacer',
    meaning:
      'Algo se termina: una etapa, un vínculo o una forma de ser. Duele, pero abre espacio. Lo que sueltas alimenta lo que viene después.',
    reversedMeaning:
      'Estás sosteniendo algo que ya terminó, por miedo al vacío que deja. Permítete cerrarlo de verdad.',
    andeanMessage:
      'El ancestro y la semilla son la misma raíz: lo que muere alimenta lo que nace.',
    advice:
      'Despídete de forma concreta: guarda, regala o borra aquello que ya cumplió su ciclo.',
    motif: 'mallki',
  },
  {
    id: 14,
    name: 'Mama Qocha',
    symbol: 'Madre agua',
    arcanaRef: 'La Templanza',
    keywords: ['calma', 'punto medio', 'sanación'],
    essence: 'la búsqueda de un punto medio',
    essenceReversed: 'emociones desbordadas o distancia excesiva',
    meaning:
      'Es tiempo de bajar la intensidad y buscar el equilibrio. Mezclar en lugar de elegir un extremo: ni todo ni nada.',
    reversedMeaning:
      'O te desbordas o te cierras por completo. Busca un cauce: hablar a tiempo evita la inundación.',
    andeanMessage:
      'El agua del lago se mueve despacio y aun así llega a todas partes.',
    advice:
      'En el conflicto que tienes ahora, define qué puedes ceder sin traicionarte.',
    motif: 'qocha',
  },
  {
    id: 15,
    name: 'Supay',
    symbol: 'La sombra',
    arcanaRef: 'El Diablo',
    keywords: ['atadura', 'hábito', 'miedo'],
    essence: 'algo que te ata y prefieres no mirar',
    essenceReversed: 'el momento justo para cortar esa atadura',
    meaning:
      'Hay un hábito, un miedo o una relación que te tiene atrapada. No es un castigo: es un patrón que se repite porque todavía no lo has nombrado.',
    reversedMeaning:
      'Ya estás viendo la trampa, y eso solo la debilita. Es buen momento para cortar y no volver atrás.',
    andeanMessage:
      'Supay espera en el umbral: mirarlo de frente le quita poder.',
    advice:
      'Nombra en voz alta lo que te tiene atada y elige una acción pequeña para aflojarlo hoy.',
    motif: 'supay',
  },
  {
    id: 16,
    name: 'Illapa',
    symbol: 'El rayo',
    arcanaRef: 'La Torre',
    keywords: ['ruptura', 'verdad', 'sacudida'],
    essence: 'una ruptura repentina que deja las cosas claras',
    essenceReversed: 'una crisis que se viene anunciando hace rato',
    meaning:
      'Algo se cae de golpe: un plan, una idea o una certeza. Es incómodo, pero deja ver qué se sostenía de verdad y qué no.',
    reversedMeaning:
      'Estás postergando una ruptura que ya sabes necesaria. Cuanto antes la enfrentes, menos estruendo hará.',
    andeanMessage:
      'El rayo parte el cielo y después el aire queda limpio.',
    advice:
      'Ocúpate primero de lo urgente y de tu seguridad; la reconstrucción viene después, con calma.',
    motif: 'illapa',
  },
  {
    id: 17,
    name: 'Chaska',
    symbol: 'La estrella',
    arcanaRef: 'La Estrella',
    keywords: ['esperanza', 'guía', 'deseo'],
    essence: 'una esperanza que te orienta',
    essenceReversed: 'una ilusión que te desorienta',
    meaning:
      'Vuelve la confianza. Hay algo que te orienta: un deseo, un talento, una meta. Síguelo con paciencia; no hace falta correr.',
    reversedMeaning:
      'Estás persiguiendo algo que brilla pero no te lleva a ningún lado. Revisa si ese deseo sigue siendo tuyo o es de otros.',
    andeanMessage:
      'En la noche andina, las estrellas son el mapa.',
    advice:
      'Recuerda qué querías antes de las urgencias y dale un espacio real en tu semana.',
    motif: 'chaska',
  },
  {
    id: 18,
    name: 'Amaru',
    symbol: 'La serpiente sagrada',
    arcanaRef: 'La Luna',
    keywords: ['transformación', 'intuición', 'cautela'],
    essence: 'una transformación que ya está en marcha',
    essenceReversed: 'un cambio a medias o una información incompleta',
    meaning:
      'Estás cambiando de piel. No todo está claro todavía, y eso es normal: en estas etapas se avanza más por intuición que por certezas.',
    reversedMeaning:
      'Quieres cambiar sin soltar nada. También puede haber algo que no te están contando: verifica antes de confiar.',
    andeanMessage:
      'Amaru cambia de piel sin dejar de ser la misma serpiente.',
    advice:
      'Contrasta lo que intuyes con un dato concreto antes de decidir.',
    motif: 'amaru',
  },
  {
    id: 19,
    name: 'Inti',
    symbol: 'El sol',
    arcanaRef: 'El Sol',
    keywords: ['claridad', 'energía', 'reconocimiento'],
    essence: 'un momento de claridad y buena energía',
    essenceReversed: 'desgaste por exigirte de más',
    meaning:
      'Buen momento: hay claridad, ánimo y resultados que se notan. Es tiempo de mostrarte y de disfrutar lo logrado sin minimizarlo.',
    reversedMeaning:
      'Estás forzando el brillo o agotándote por sostener una imagen. Baja el ritmo antes de quemarte.',
    andeanMessage: 'Inti sale cada mañana sin pedir permiso.',
    advice:
      'Cuenta o celebra un logro reciente, aunque te parezca pequeño.',
    motif: 'inti',
  },
  {
    id: 20,
    name: 'Kuntur',
    symbol: 'El cóndor',
    arcanaRef: 'El Juicio',
    keywords: ['decisión', 'perspectiva', 'balance'],
    essence: 'una decisión importante que pide altura de mirada',
    essenceReversed: 'quedarte en el detalle y perder la vista de conjunto',
    meaning:
      'Hay algo que cierra toda una etapa y espera una respuesta tuya. Míralo con perspectiva: ¿qué de esto va a importar dentro de un año?',
    reversedMeaning:
      'Estás atrapada en detalles o en culpas viejas. Perdónate lo que ya no puedes cambiar y decide de una vez.',
    andeanMessage:
      'El cóndor sube alto para ver el valle completo.',
    advice:
      'Toma la decisión pendiente pensando en cómo la vas a ver dentro de un año.',
    motif: 'kuntur',
  },
  {
    id: 21,
    name: 'Chakana',
    symbol: 'Cruz andina',
    arcanaRef: 'El Mundo',
    keywords: ['cierre', 'plenitud', 'equilibrio'],
    essence: 'un ciclo que se cierra con las piezas en su sitio',
    essenceReversed: 'un área de tu vida que quedó fuera de lugar',
    meaning:
      'Se cierra un ciclo con sensación de completo. Lo que hiciste tiene sentido y las distintas áreas de tu vida encuentran su lugar.',
    reversedMeaning:
      'Algo quedó a medias, o hay un área —trabajo, cuerpo, afectos— desatendida que desequilibra al resto.',
    andeanMessage:
      'La chakana une los tres mundos y los mantiene cada uno en su sitio.',
    advice:
      'Cierra formalmente lo que ya terminaste y revisa qué área de tu vida está pidiendo atención.',
    motif: 'chakana',
  },
]

const PROFUNDIDAD: Record<number, CardDepth> = {
  ...PROFUNDIDAD_1,
  ...PROFUNDIDAD_2,
  ...PROFUNDIDAD_3,
}

/** Cartas completas: base + significados profundos por contexto. */
export const ANDEAN_CARDS: AndeanCard[] = BASE_CARDS.map((base) => {
  const depth = PROFUNDIDAD[base.id]
  return {
    ...base,
    ...depth,
    keywords: depth.palabrasClave,
    arcanaRef: depth.correspondenciaArcano,
  }
})

export function getCardById(id: number): AndeanCard | undefined {
  return ANDEAN_CARDS.find((c) => c.id === id)
}
