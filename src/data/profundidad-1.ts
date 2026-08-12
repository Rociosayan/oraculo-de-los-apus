import type { CardDepth } from '../types'

/** Significados profundos de las cartas 0 a 7.
 *  Cada texto es propio de su carta: refleja su imagen, su símbolo andino
 *  y su correspondencia con el arcano mayor. */
export const PROFUNDIDAD_1: Record<number, CardDepth> = {
  0: {
    correspondenciaArcano: 'El Loco',
    palabrasClave: [
      'comienzo',
      'noticia',
      'atreverse',
      'inocencia',
      'movimiento',
      'confianza',
    ],
    simbolosAndinos: ['chaski', 'quipu', 'pututu', 'camino de montaña', 'estrella del alba'],
    ejes: ['movimiento', 'cielo'],
    polaridad: 1,
    significadoGeneral:
      'El Mensajero es el primer paso del camino: el chaski que sale del tambo antes del amanecer sin conocer todavía el final de la ruta. Como El Loco del tarot, no habla de imprudencia sino de confianza en el movimiento: hay etapas que solo se entienden una vez que se han comenzado. Cuando aparece, algo nuevo pide nacer: una noticia en camino, una invitación inesperada o un impulso interno que ya no acepta más espera. La carta no promete que el terreno esté despejado; promete que la energía disponible es la del inicio, fresca y sin deudas con el pasado. Suele señalar también mensajes literales: conversaciones pendientes, llamadas que llegan o palabras que tú misma deberías enviar. El momento favorece a quien se atreve primero.',
    significadoAmor:
      'En el amor, el Mensajero anuncia una etapa que empieza o que quiere empezar: una persona nueva, un mensaje que rompe un silencio o unas ganas de volver a ilusionarse después de un tiempo cerrado. Si preguntas por alguien concreto, la carta describe un sentimiento joven y sincero, más entusiasmo que certeza: hay atracción real, pero todavía no hay raíces, y confundir una cosa con la otra sería apresurado. En vínculos largos, invita a recuperar la frescura de los primeros tiempos, a proponer en lugar de esperar, a decir primero lo que se siente. También puede señalar que la comunicación es la llave del asunto: lo que no se ha dicho todavía pesa más que lo que ya ocurrió. El paso siguiente es hablar, no adivinar.',
    significadoTrabajoDinero:
      'En trabajo y dinero, el Mensajero abre puertas: una propuesta que llega, una vacante que se publica, un proyecto que por fin arranca o la señal de que es momento de presentarse sin esperar condiciones perfectas. La carta favorece candidaturas, lanzamientos, primeras reuniones y todo aquello que implique dar el primer paso visible. No garantiza el resultado final, pero sí indica que el terreno premia la iniciativa: quien pregunta, quien escribe, quien toca la puerta, obtiene ventaja sobre quien espera. En lo económico sugiere movimientos pequeños y ágiles antes que grandes apuestas: probar, medir, corregir. Si estás dudando entre quedarte quieta o intentarlo, la carta se inclina claramente por intentarlo, empezando por lo más simple que puedas hacer esta misma semana.',
    significadoEspiritual:
      'En lo espiritual, el chaski recuerda que el mensaje sagrado necesita piernas: la intuición que no se pone en práctica se queda en el tambo, sin entregar. Es una carta de fe sencilla, la del caminante que confía en que el siguiente tramo aparecerá cuando llegue a la curva. Invita a soltar la necesidad de tener el mapa completo antes de moverse y a tratar cada día como una etapa de la ruta, con su propio mensaje que recoger y su propio mensaje que entregar. La ligereza no es superficialidad: es viajar sin cargar piedras ajenas.',
    significadoSombra:
      'En su cara de sombra, el Mensajero se vuelve dispersión: empezar mucho y terminar poco, prometer antes de medir, correr para no sentir. Puede señalar noticias que se esperan con ansiedad, decisiones tomadas por impulso para escapar de una incomodidad, o una tendencia a huir hacia adelante cada vez que un vínculo o un proyecto piden profundidad. Invertida o mal acompañada, sugiere revisar si el entusiasmo es genuino o si es una forma elegante de no comprometerse. El antídoto no es frenar del todo, sino elegir un solo comienzo y sostenerlo.',
    consejoPractico:
      'Da hoy un primer paso pequeño y visible: envía ese mensaje, pide esa reunión, inscríbete en eso que llevas semanas mirando. No esperes tener el plan completo; basta con que el paso sea concreto y pueda darse antes de que termine el día. Si hay una conversación pendiente, ábrela tú. Y elige un solo comienzo: el impulso rinde cuando se concentra.',
    preguntasDeReflexion: [
      '¿Qué mensaje llevo semanas sin enviar o sin responder?',
      '¿Qué comenzaría hoy si no necesitara garantías?',
      '¿Estoy avanzando por entusiasmo o escapando de algo que no quiero mirar?',
    ],
    frases: {
      esencia: 'un comienzo fresco que pide valor y pie ligero',
      sentimiento: 'una ilusión joven y sincera, con más entusiasmo que raíces',
      conducta: 'una actitud abierta y espontánea, que se muestra tal cual es',
      oculto: 'unas ganas de empezar de nuevo que todavía no se confiesan',
      obstaculo: 'una impaciencia que quiere saltarse etapas necesarias',
      accion: 'dar el primer paso visible sin esperar condiciones perfectas',
      desenlace: 'una etapa nueva que se abre si alguien se atreve primero',
      sombra: 'un impulso disperso que promete antes de medir',
    },
  },
  1: {
    correspondenciaArcano: 'El Mago',
    palabrasClave: [
      'intención',
      'recursos',
      'enfoque',
      'voluntad',
      'preparación',
      'poder personal',
    ],
    simbolosAndinos: ['paqo', 'mesa ceremonial', 'hojas de coca', 'ofrenda', 'sol de oro'],
    ejes: ['luz', 'transformacion'],
    polaridad: 1,
    significadoGeneral:
      'El Oficiante es el paqo ante su mesa: cada objeto en su lugar, cada gesto con propósito. Como El Mago del tarot, afirma que ya cuentas con lo necesario —capacidad, contactos, experiencia, tiempo— y que lo único que falta es ordenarlo alrededor de una intención clara. Es una carta de poder personal en su sentido más práctico: no el poder de dominar a otros, sino el de convertir lo disperso en obra. Cuando aparece, la pregunta correcta deja de ser «¿podré?» y pasa a ser «¿para qué exactamente quiero esto?». Señala un momento fértil para planificar, negociar, presentar proyectos y poner en marcha aquello que se ha preparado con cuidado. La voluntad enfocada, dice el paqo, ordena el resto de las piezas casi sola.',
    significadoAmor:
      'En el amor, el Oficiante habla de intención consciente: no basta con sentir, hay que decidir qué se quiere construir con lo que se siente. Puede describir a una persona segura de sí, atractiva por su claridad, que sabe lo que busca en un vínculo; o puede pedirte a ti esa misma claridad antes de dar el siguiente paso. Favorece las conversaciones donde se ponen las cartas sobre la mesa: definir la relación, expresar deseos concretos, acordar cómo se cuida el lazo. Advierte, eso sí, contra la seducción calculada: cuando la palabra bonita no coincide con el gesto cotidiano, el encanto se vuelve manipulación. Si la relación atraviesa dudas, la carta sugiere que el vínculo mejora en cuanto ambos declaran con honestidad qué están dispuestos a ofrecer.',
    significadoTrabajoDinero:
      'En trabajo y dinero, el Oficiante es una de las cartas más favorables para emprender, negociar y presentar. Indica que tienes herramientas suficientes y que el entorno responderá bien a una propuesta bien armada: currículum puesto al día, presupuesto claro, proyecto con nombre y fecha. Favorece los oficios donde la habilidad personal marca la diferencia y las gestiones que dependen de tu palabra: entrevistas, ventas, acuerdos. En lo económico pide administrar con intención: cada gasto y cada inversión deberían responder a un plan, no al impulso del momento. Si esperas una oportunidad, la carta sugiere que no llegará sola: se convoca preparando la mesa, es decir, dejando todo listo para que cuando la puerta se abra puedas cruzarla en el acto.',
    significadoEspiritual:
      'En lo espiritual, el paqo enseña que el rito ordena la vida: los gestos hechos con conciencia —encender una vela, preparar la mesa, agradecer antes de comer— convierten el día común en camino. La carta invita a unir cielo y tierra en lo cotidiano: que lo que crees se note en lo que haces. También recuerda que la intención es una ofrenda: lo que pides a los apus debe estar acompañado por lo que tú misma pones sobre la mesa. La espiritualidad que propone no es espera pasiva, sino colaboración activa con lo sagrado.',
    significadoSombra:
      'En sombra, el Oficiante se vuelve manipulador o disperso: alguien que usa su encanto para obtener sin dar, que promete con palabras precisas lo que no piensa cumplir, o que gasta su talento en diez frentes a la vez sin terminar ninguno. También puede señalar autoengaño: convencerse de que se tiene un plan cuando solo se tiene un deseo. Si la carta aparece en posiciones difíciles, revisa dónde estás usando la habilidad para evitar la verdad, propia o ajena, y devuelve la palabra al lugar donde se demuestra: los hechos.',
    consejoPractico:
      'Escribe tu intención en una sola frase y ponla donde la veas a diario. Después revisa tu semana: cada compromiso debería sostener esa frase o salir de la agenda. Prepara lo que depende de ti —documentos, propuesta, conversación— como el paqo prepara su mesa: con tiempo, con orden y sin dejar cabos sueltos, para que cuando llegue el momento solo tengas que actuar.',
    preguntasDeReflexion: [
      '¿Puedo decir en una sola frase qué quiero lograr con esto?',
      '¿Qué recurso tengo a mano que todavía no estoy usando?',
      '¿En qué momento mis palabras y mis actos no están diciendo lo mismo?',
    ],
    frases: {
      esencia: 'una intención clara que ordena todos los recursos disponibles',
      sentimiento: 'un interés decidido que sabe lo que busca',
      conducta: 'una presencia segura, que prepara el terreno antes de actuar',
      oculto: 'un plan que ya está trazado aunque aún no se declare',
      obstaculo: 'una voluntad dispersa que gasta su fuerza en varios frentes',
      accion: 'preparar la mesa con cuidado y declarar la intención en voz alta',
      desenlace: 'un logro construido con enfoque y preparación paciente',
      sombra: 'un encanto calculado que promete más de lo que piensa dar',
    },
  },
  2: {
    correspondenciaArcano: 'La Sacerdotisa',
    palabrasClave: [
      'intuición',
      'silencio',
      'misterio',
      'ciclos',
      'mundo interior',
      'espera fértil',
    ],
    simbolosAndinos: ['Mama Quilla', 'luna llena', 'lago quieto', 'tupu de plata', 'noche andina'],
    ejes: ['cielo', 'sombra'],
    polaridad: 0,
    significadoGeneral:
      'Mama Quilla es la sabia que contempla el lago de noche: sabe que la luna se refleja entera solo cuando el agua deja de agitarse. Como La Sacerdotisa, custodia el conocimiento que no se aprende en libros: la corazonada, el sueño revelador, la certeza sin argumentos. Cuando aparece, algo importante se mueve por debajo de la superficie y todavía no es tiempo de actuar: es tiempo de observar, escuchar y dejar que la verdad termine de formarse. Suele indicar que la respuesta que buscas ya está dentro de ti, pero llega en voz baja y el ruido exterior la tapa. También marca ritmos: hay procesos con fases, como la luna, y forzarlos solo los malogra. La paciencia, aquí, no es pasividad: es atención sostenida.',
    significadoAmor:
      'En el amor, Mama Quilla habla de lo que se siente y no se dice. Puede describir a una persona reservada, de aguas profundas, cuyo silencio no es frialdad sino pudor: siente más de lo que muestra y necesita seguridad antes de abrirse. Si preguntas por un vínculo, la carta sugiere que hay corrientes emocionales reales que ninguno de los dos está nombrando todavía, y que presionar para obtener declaraciones inmediatas puede cerrar la puerta en lugar de abrirla. Invita a leer los gestos pequeños más que las palabras grandes, y a confiar en tu propia intuición: si algo te dice que hay más —o que hay menos— de lo que aparenta, esa señal merece atención. El vínculo madura en la penumbra antes de mostrarse a plena luz.',
    significadoTrabajoDinero:
      'En trabajo y dinero, Mama Quilla aconseja prudencia y lectura fina del ambiente. No es momento de anunciar planes ni de firmar a ciegas: hay información que aún no se ha revelado, intenciones que no se han declarado, cifras que conviene revisar dos veces. La carta favorece la investigación silenciosa: preguntar poco y escuchar mucho, estudiar el terreno, guardar las propias estrategias hasta que el panorama se aclare. En decisiones económicas sugiere esperar el momento del ciclo adecuado antes que apurar la operación; lo que hoy parece urgente puede verse distinto en unos días. También valora los oficios de mirada profunda: análisis, cuidado, enseñanza, terapia. Tu ventaja actual no es la velocidad, es la percepción: úsala antes de mover cualquier pieza.',
    significadoEspiritual:
      'En lo espiritual, Mama Quilla es la maestra de la vida interior: enseña que hay conocimientos que solo se entregan en el silencio, cuando se apaga la necesidad de controlar y se enciende la disposición a recibir. Invita a cuidar los sueños, las señales y los tiempos del propio cuerpo, que también es luna y tiene fases. Es la carta del retiro fértil: apartarse un poco del ruido no es huir del mundo, es volver a escuchar la voz que el mundo tapa. Lo sagrado, recuerda, se acerca a quien sabe estar quieta.',
    significadoSombra:
      'En sombra, Mama Quilla se vuelve confusión y secreto que daña: emociones revueltas que impiden distinguir la intuición del miedo, silencios que ya no protegen sino que esconden, verdades a medias que van minando la confianza. Puede señalar a alguien que calla demasiado, o una etapa en la que tú misma no logras verte con claridad y llenas los vacíos con suposiciones. El riesgo es decidir en plena niebla o, al revés, quedarse eternamente en la espera usando la prudencia como excusa. Cuando la luna se nubla, conviene aplazar el veredicto y buscar tierra firme.',
    consejoPractico:
      'Antes de decidir, date una noche completa: consulta el asunto con la almohada y anota lo primero que sientas al despertar, sin corregirlo. Reduce el ruido esta semana —menos opiniones ajenas, menos pantalla— y observa qué señales se repiten. Si alguien guarda silencio, no lo llenes con suposiciones: pregunta una sola vez, con calma, y da espacio para la respuesta.',
    preguntasDeReflexion: [
      '¿Qué estoy sintiendo desde hace tiempo que aún no me atrevo a nombrar?',
      '¿Este silencio me protege o me esconde?',
      '¿Qué señal se me ha repetido últimamente y sigo pasando por alto?',
    ],
    frases: {
      esencia: 'una verdad que madura en silencio y pide escucha',
      sentimiento: 'una emoción honda y reservada que no se muestra entera',
      conducta: 'una actitud discreta, que observa mucho y declara poco',
      oculto: 'una corriente de fondo que ninguno ha nombrado todavía',
      obstaculo: 'una niebla emocional que confunde la intuición con el miedo',
      accion: 'guardar silencio estratégico y escuchar antes de mover pieza',
      desenlace: 'una claridad que llega sola cuando el agua se aquieta',
      sombra: 'un secreto o una confusión que enturbia la confianza',
    },
  },
  3: {
    correspondenciaArcano: 'La Emperatriz',
    palabrasClave: [
      'abundancia',
      'cuidado',
      'fertilidad',
      'cuerpo',
      'crecimiento',
      'generosidad',
    ],
    simbolosAndinos: ['Pachamama', 'maíz y papa', 'llama', 'andenes fértiles', 'semilla en la mano'],
    ejes: ['tierra', 'vinculo', 'luz'],
    polaridad: 2,
    significadoGeneral:
      'Pachamama es la madre que sostiene todo lo que crece: la mujer sentada entre maizales con una planta nueva en las manos y la llama echada a su lado. Como La Emperatriz, es la carta de la abundancia que se cultiva: nada florece por decreto, todo florece por cuidado constante. Cuando aparece, indica una etapa fértil donde lo sembrado empieza a dar fruto: proyectos que crecen, vínculos que se afianzan, cuerpo y ánimo que piden nutrirse bien. También recuerda una ley simple: se cosecha lo que se atiende. Si algo importante está débil —una relación, la salud, un trabajo— la carta no sugiere abandonarlo sino regarlo. Es señal de protección, de generosidad que vuelve multiplicada y de decisiones que deben tomarse a favor de la vida.',
    significadoAmor:
      'En el amor, Pachamama es de las mejores compañías: habla de un afecto nutritivo, que abraza, alimenta y da calor de hogar. Puede describir una relación que madura hacia algo más estable —convivencia, familia, proyectos compartidos— o a una persona de corazón generoso que demuestra el amor cuidando, más con gestos que con discursos. Si preguntas por sentimientos, indica un cariño real y cálido, con deseo de proteger al otro. En vínculos desgastados, propone volver al cuerpo y a lo simple: cocinar juntos, descansar juntos, tocarse más y discutir menos. Advierte solamente contra el exceso de dar: si una parte alimenta todo el tiempo y la otra solo recibe, la tierra más fértil también se agota. El amor sano, como la chacra, se trabaja entre dos.',
    significadoTrabajoDinero:
      'En trabajo y dinero, Pachamama anuncia crecimiento sostenido: el proyecto que por fin echa raíces, el negocio que empieza a rendir, la etapa en la que el esfuerzo acumulado se nota. Favorece todo lo que se construye a mediano plazo —ahorro constante, clientes cuidados, equipos bien tratados— por encima de las ganancias rápidas. Es buena señal para actividades ligadas a la tierra, la alimentación, la salud, el hogar y el cuidado de personas. En lo económico aconseja administrar como buena chacarera: guardar semilla de cada cosecha, no gastarlo todo en la fiesta de la abundancia y diversificar lo plantado. Si esperas resultados, la carta pide paciencia de agricultora: el fruto ya está creciendo, aunque todavía no se vea desde el camino.',
    significadoEspiritual:
      'En lo espiritual, Pachamama enseña la gratitud como práctica: agradecer antes de pedir, devolver algo de todo lo que se recibe, tratar el cuerpo como primer territorio sagrado. Invita a reconectar con lo simple y vivo: caminar sobre tierra, tocar plantas, comer con atención, descansar sin culpa. Recuerda que la espiritualidad no siempre mira al cielo: también madura hacia abajo, en las raíces, en lo cotidiano bien cuidado. Quien se siente perdida, dice esta carta, puede empezar por cuidar algo concreto y dejar que ese cuidado la ordene por dentro.',
    significadoSombra:
      'En sombra, Pachamama se vuelve exceso y asfixia: dar hasta vaciarse, proteger hasta ahogar, confundir amor con control de la vida ajena. Puede señalar dependencias afectivas disfrazadas de cuidado, descuido del propio cuerpo por atender el de todos los demás, o una comodidad material que adormece el crecimiento. También advierte sobre la avaricia de la buena cosecha: acumular sin compartir seca la tierra. Si aparece en posición difícil, pregunta dónde estás alimentando de más lo que deberías dejar madurar solo, y dónde te estás olvidando de comer tú.',
    consejoPractico:
      'Elige una cosa importante y débilmente atendida —un vínculo, tu descanso, un proyecto— y dale cuidado concreto y regular esta semana: tiempo fijo, atención plena, sin multitarea. Cuida también tu cuerpo como parte de la consulta: comida real, sueño suficiente, algo de tierra o naturaleza. Y guarda semilla: aparta hoy una parte de lo que recibas, por pequeña que sea.',
    preguntasDeReflexion: [
      '¿Qué estoy cuidando bien y qué estoy dejando secar?',
      '¿Doy desde la abundancia o doy para que me necesiten?',
      '¿Qué necesita mi cuerpo que llevo tiempo posponiendo?',
    ],
    frases: {
      esencia: 'una abundancia que crece donde hay cuidado constante',
      sentimiento: 'un cariño cálido y protector, que quiere dar hogar',
      conducta: 'una actitud generosa que demuestra afecto con gestos concretos',
      oculto: 'una necesidad de cuidado que no se pide en voz alta',
      obstaculo: 'un exceso de dar que agota la tierra y desequilibra el lazo',
      accion: 'nutrir con constancia lo que se quiere ver florecer',
      desenlace: 'una cosecha generosa que premia el esfuerzo sostenido',
      sombra: 'un cuidado que asfixia o una comodidad que adormece',
    },
  },
  4: {
    correspondenciaArcano: 'El Emperador',
    palabrasClave: [
      'estructura',
      'autoridad',
      'límites',
      'protección',
      'firmeza',
      'responsabilidad',
    ],
    simbolosAndinos: ['apu tutelar', 'muro inca', 'vara de mando', 'montaña nevada', 'piedra labrada'],
    ejes: ['autoridad', 'tierra'],
    polaridad: 1,
    significadoGeneral:
      'El Apu es la montaña hecha señor: el que permanece cuando todo lo demás cambia, el que da orden al valle con su sola presencia. Como El Emperador, habla de estructura, autoridad legítima y límites que protegen. Cuando aparece, la situación pide firmeza: poner reglas claras, asumir el mando de lo propio, construir sobre piedra y no sobre promesas. Puede representar a una figura de autoridad en tu vida —jefe, padre, institución— o al llamado a ejercer tu propia autoridad sin pedir disculpas por ello. La carta valora lo probado sobre lo improvisado: contratos escritos, acuerdos explícitos, cimientos revisados. Recuerda que el orden verdadero no aplasta la vida, la hace posible: como los andenes, que sostienen la cosecha justamente porque tienen bordes firmes.',
    significadoAmor:
      'En el amor, El Apu describe vínculos donde la estabilidad pesa más que la efusividad: personas leales y protectoras que demuestran afecto resolviendo, sosteniendo y estando, aunque les cueste hablar de sentimientos. Si preguntas por alguien, es probable que sienta más de lo que expresa y que su aparente rigidez sea en realidad defensa: la montaña también protege lo que guarda dentro. La carta pide, sin embargo, no confundir solidez con control: cuando la firmeza se vuelve necesidad de tener razón o de decidir por el otro, el vínculo se enfría. Favorece los compromisos formales y las conversaciones donde se establecen acuerdos claros: qué puede esperar cada uno del otro. Un amor con estructura no es menos amor: es amor que se puede habitar.',
    significadoTrabajoDinero:
      'En trabajo y dinero, El Apu es carta de consolidación: ascensos por mérito sostenido, negocios que se formalizan, estructuras que por fin se ordenan. Favorece todo trato con instituciones, jefaturas y autoridades, y aconseja moverse dentro de las reglas: papeles en regla, acuerdos firmados, cuentas claras. Si diriges personas o proyectos, pide liderazgo presente: decidir, comunicar y sostener lo decidido. En lo económico representa el patrimonio que se construye piedra sobre piedra: ahorro disciplinado, deudas bajo control, inversiones conservadoras antes que apuestas. Si hay conflicto laboral, sugiere resolverlo por los canales formales y con documentación en mano. El mensaje central: lo que quieras que dure, dale estructura ahora, aunque tome más tiempo que la vía rápida.',
    significadoEspiritual:
      'En lo espiritual, El Apu enseña la disciplina como forma de devoción: el rezo a la misma hora, el compromiso que se cumple aunque no haya ganas, la palabra dada como cosa sagrada. Invita a buscar la montaña interior: ese lugar firme dentro de ti que no se mueve con cada tormenta emocional, y desde el cual se puede proteger a otros sin perderse. También recuerda que toda autoridad verdadera sirve: el apu no domina el valle, lo cuida. Pregúntate a quién y a qué sirve tu firmeza.',
    significadoSombra:
      'En sombra, El Apu se vuelve rigidez y autoritarismo: la necesidad de controlar cada detalle, la incapacidad de mostrar vulnerabilidad, el orgullo que prefiere perder el vínculo antes que ceder un centímetro. Puede señalar a alguien endurecido por viejas heridas que confunde protegerse con amurallarse, o una estructura —laboral, familiar— que ya no sostiene sino que aplasta. También advierte contra la frialdad como costumbre: tanto sostener a los demás puede dejarte sin registro de lo que tú sientes. La montaña, recuerda, también tiene manantiales: la firmeza sin ternura se vuelve piedra muerta.',
    consejoPractico:
      'Pon por escrito los acuerdos importantes de esta etapa: qué se espera de cada parte, plazos y límites. Si te toca decidir, decide y comunica sin rodeos; la ambigüedad prolongada daña más que un no claro. Reserva también un espacio donde puedas quitarte la armadura: una persona o momento del día donde no tengas que ser la fuerte.',
    preguntasDeReflexion: [
      '¿Dónde me falta poner un límite claro y a quién le temo decírselo?',
      '¿Mi firmeza está protegiendo algo o solo defendiendo mi orgullo?',
      '¿Qué estructura de mi vida necesita reparación antes de seguir construyendo encima?',
    ],
    frases: {
      esencia: 'una firmeza que protege y da estructura a lo que importa',
      sentimiento: 'un afecto leal y contenido, que siente más de lo que dice',
      conducta: 'una actitud seria y defensiva, con la guardia en alto',
      oculto: 'una vulnerabilidad guardada tras un muro de aparente dureza',
      obstaculo: 'una rigidez que prefiere tener razón antes que acercarse',
      accion: 'poner reglas claras y sostenerlas con calma',
      desenlace: 'una estabilidad construida piedra sobre piedra',
      sombra: 'un control endurecido que confunde proteger con dominar',
    },
  },
  5: {
    correspondenciaArcano: 'El Hierofante',
    palabrasClave: [
      'enseñanza',
      'tradición',
      'consejo',
      'experiencia',
      'valores',
      'guía',
    ],
    simbolosAndinos: ['amauta', 'quipu del saber', 'escalinata de piedra', 'discípulos', 'poncho de maestro'],
    ejes: ['autoridad', 'luz'],
    polaridad: 1,
    significadoGeneral:
      'El Amauta es el maestro sentado en la escalinata, mostrando el quipu a quienes quieren aprender: la memoria viva de un pueblo convertida en enseñanza. Como El Hierofante, representa el saber que se transmite, las tradiciones que sostienen y los valores que orientan cuando el camino se confunde. Cuando aparece, sugiere buscar consejo en quien ya recorrió esta ruta: un mentor, una persona mayor, un profesional con experiencia. También puede indicar que te toca a ti enseñar, formalizar lo aprendido o convertirte en referente. La carta valora lo probado por el tiempo: métodos que funcionan, instituciones serias, acuerdos con historia. No es enemiga del cambio, pero pide que lo nuevo dialogue con lo aprendido en lugar de despreciarlo: quien olvida el quipu repite los nudos.',
    significadoAmor:
      'En el amor, El Amauta habla de vínculos con valores compartidos: relaciones que se sostienen no solo en la atracción sino en acuerdos profundos sobre cómo vivir. Favorece los compromisos serios y los pasos formales —presentaciones familiares, promesas, matrimonio— y las parejas que aprenden una de la otra. Si hay conflicto, sugiere buscar ayuda experimentada: una terapia, un consejero, una pareja mayor cuyo ejemplo sirva de espejo. Puede también señalar diferencias de tradición o de familia que piden respeto mutuo antes que victoria de una parte. Si preguntas por una persona, describe a alguien de principios firmes, quizá algo conservador, cuya palabra vale y cuyo cariño se demuestra en fidelidad a lo acordado. El consejo de fondo: construyan un código común y hónrenlo.',
    significadoTrabajoDinero:
      'En trabajo y dinero, El Amauta favorece la formación y la vía institucional: estudios que se completan, certificaciones que abren puertas, empleos en organizaciones establecidas, ascensos que premian la trayectoria. Aconseja aprender de quien sabe antes de improvisar: buscar mentoría, preguntar a colegas veteranos, estudiar cómo se hizo antes lo que quieres hacer ahora. En lo económico sugiere métodos probados y asesoría seria por encima de fórmulas milagrosas: si suena demasiado fácil, desconfía. Es buena carta para la docencia, la consultoría y todo oficio donde se transmite conocimiento. Si estás decidiendo entre lo seguro y lo experimental, invita a revisar qué dice la experiencia acumulada —la tuya y la ajena— antes de firmar nada.',
    significadoEspiritual:
      'En lo espiritual, El Amauta recuerda que nadie despierta solo: los caminos sagrados se transmiten de mano en mano, de maestro a discípulo, y saltarse esa cadena suele costar caro. Invita a honrar a quienes te enseñaron —personas, linajes, tradiciones— y a discernir entre guías verdaderos y vendedores de humo: el maestro auténtico te devuelve tu propio poder, no te vuelve dependiente. También sugiere que quizá sea tu turno de transmitir: enseñar lo aprendido es la forma más honda de terminar de aprenderlo.',
    significadoSombra:
      'En sombra, El Amauta se vuelve dogma: la tradición usada como jaula, el «siempre se hizo así» que impide crecer, la autoridad moral que juzga en lugar de acompañar. Puede señalar entornos rígidos donde disentir se castiga, consejeros que opinan desde el prejuicio, o tu propia tendencia a buscar permiso externo para decisiones que solo te corresponden a ti. También advierte contra el saber sin práctica: acumular cursos y citas ajenas para no arriesgar una idea propia. Respeta el quipu, dice la carta, pero recuerda que también se pueden anudar hilos nuevos.',
    consejoPractico:
      'Identifica a la persona con más experiencia real en el asunto que consultas y pídele una conversación esta semana; llega con preguntas concretas. Contrasta su consejo con tus propios valores antes de aplicarlo: la última palabra es tuya. Y si dominas algo que otros necesitan, ofrece enseñarlo: ordenar tu saber para otro te mostrará lo que aún te falta.',
    preguntasDeReflexion: [
      '¿A quién podría pedir consejo y qué me impide hacerlo?',
      '¿Qué tradición me sostiene y cuál me está quedando pequeña?',
      '¿Estoy buscando orientación o solo un permiso para no decidir yo?',
    ],
    frases: {
      esencia: 'una sabiduría heredada que orienta el paso presente',
      sentimiento: 'un afecto serio, fiel a los valores y a la palabra dada',
      conducta: 'una actitud correcta y formal, apegada a lo acordado',
      oculto: 'una lealtad a viejas enseñanzas que condiciona sin que se note',
      obstaculo: 'una norma o costumbre que ya no deja crecer',
      accion: 'buscar consejo experimentado antes de decidir',
      desenlace: 'un camino que se consolida por la vía probada y formal',
      sombra: 'un dogma que juzga y pide obediencia en lugar de acompañar',
    },
  },
  6: {
    correspondenciaArcano: 'Los Enamorados',
    palabrasClave: [
      'unión',
      'elección',
      'complementariedad',
      'acuerdo',
      'deseo',
      'encuentro',
    ],
    simbolosAndinos: ['yanantin', 'pareja ceremonial', 'sol y luna', 'dos montañas', 'manos unidas'],
    ejes: ['vinculo', 'luz'],
    polaridad: 2,
    significadoGeneral:
      'Yanantin es la pareja ceremonial bajo el sol y la luna: dos fuerzas distintas que se reconocen complementarias y eligen caminar juntas. Como Los Enamorados, habla de unión y también de elección: todo encuentro verdadero exige decidir, y toda decisión importante deja algo atrás. Cuando aparece, señala un vínculo significativo —amoroso, pero también una sociedad, una amistad, una alianza— que pide ser elegido con el corazón entero, no con la mitad. También puede marcar una encrucijada: dos caminos que no pueden recorrerse a la vez. La carta recuerda la ley andina de la dualidad: lo distinto no compite, se completa; el día necesita a la noche. La pregunta que trae es directa: ¿qué eliges, y estás dispuesta a sostener lo que esa elección pide?',
    significadoAmor:
      'En el amor, Yanantin es la carta del encuentro real: dos personas que se ven, se reconocen y se eligen. Señala reciprocidad de sentimientos, atracción correspondida y la posibilidad de un vínculo donde las diferencias suman en lugar de enfrentar. Si preguntas por lo que siente otra persona, la carta se inclina por un interés genuino y correspondido, aunque pide verificarlo en decisiones y no solo en palabras: elegir es un acto, no una emoción. En parejas establecidas, invita a renovar la elección: volver a decir sí conscientemente, en lugar de seguir juntos por costumbre. Si hay una tercera opción en juego o una decisión pendiente entre dos caminos afectivos, advierte que la indefinición prolongada lastima a todos: el corazón dividido termina perdiendo ambos lados.',
    significadoTrabajoDinero:
      'En trabajo y dinero, Yanantin habla de alianzas y decisiones: socios que se complementan, equipos donde las diferencias de talento se vuelven ventaja, acuerdos donde ambas partes ganan. Favorece las asociaciones bien conversadas, con roles claros y valores compatibles; advierte contra las sociedades nacidas solo del entusiasmo, sin acuerdos escritos. También puede marcar una elección profesional importante: dos ofertas, dos rumbos, dos maneras de trabajar. En ese caso pide decidir por afinidad profunda y no solo por cifras: el lugar donde tus valores respiran vale más a largo plazo que el que paga apenas un poco mejor. En lo económico sugiere decisiones tomadas en pareja o en equipo con transparencia total: las cuentas claras protegen los vínculos que importan.',
    significadoEspiritual:
      'En lo espiritual, Yanantin enseña que la unidad se hace de a dos: cielo y tierra, sol y luna, lo que doy y lo que recibo. Invita a reconciliar los propios opuestos internos —la parte que quiere seguridad y la que quiere libertad, la fuerza y la ternura— en lugar de amputar una mitad. También recuerda que el otro es maestro: lo que más te irrita del que amas suele señalar lo que aún no aceptas de ti. El camino sagrado, dice esta carta, no se recorre huyendo del vínculo sino a través de él.',
    significadoSombra:
      'En sombra, Yanantin se vuelve indecisión y desequilibrio: querer los dos caminos sin pagar el precio de ninguno, relaciones donde uno elige y el otro se deja elegir, complementariedad que degenera en dependencia. Puede señalar triángulos afectivos, lealtades divididas o acuerdos donde una parte cede siempre para evitar el conflicto. También advierte sobre la fantasía de la media naranja: esperar que el otro complete lo que no quieres trabajar en ti. Si la carta sale torcida, revisa si estás eligiendo de verdad o solo evitando el dolor de renunciar.',
    consejoPractico:
      'Si tienes una elección pendiente, ponle fecha: escribe qué ganas y qué dejas con cada camino, decide y comunica tu decisión a quien corresponda. En los vínculos, transforma la queja en acuerdo: propone algo concreto que ambos puedan cumplir esta semana. Y revisa la balanza del dar y recibir: si llevas tiempo cediendo de más, dilo ahora, con serenidad, antes de que se vuelva rencor.',
    preguntasDeReflexion: [
      '¿Qué elección llevo tiempo aplazando y qué me cuesta soltar de ella?',
      '¿En este vínculo elegimos los dos, o uno elige y el otro se acomoda?',
      '¿Qué cualidad del otro me irrita y qué me dice eso de mí?',
    ],
    frases: {
      esencia: 'un encuentro de fuerzas distintas que se completan',
      sentimiento: 'un afecto correspondido que quiere ser elegido de verdad',
      conducta: 'una cercanía visible, de gestos que buscan al otro',
      oculto: 'una elección ya tomada en el corazón que aún no se declara',
      obstaculo: 'una indecisión que quiere ambos caminos y no paga ninguno',
      accion: 'elegir con el corazón entero y sostener lo elegido',
      desenlace: 'una unión que prospera si ambos la eligen a diario',
      sombra: 'una lealtad dividida que lastima a todos los lados',
    },
  },
  7: {
    correspondenciaArcano: 'El Carro',
    palabrasClave: [
      'avance',
      'voluntad',
      'dirección',
      'disciplina',
      'viaje',
      'victoria',
    ],
    simbolosAndinos: ['Qhapaq Ñan', 'chaski en marcha', 'puente colgante', 'hitos de piedra', 'camino real'],
    ejes: ['movimiento', 'tierra'],
    polaridad: 1,
    significadoGeneral:
      'Qhapaq Ñan es el gran camino que une el imperio: miles de kilómetros de piedra que existen porque alguien decidió el rumbo y lo sostuvo tramo a tramo. Como El Carro, es la carta del avance con dirección: voluntad, disciplina y un destino claro. Cuando aparece, la etapa favorece el movimiento decidido: viajes, mudanzas, proyectos que pasan de la idea a la ejecución, obstáculos que se superan por constancia. Pero su condición es exigente: el camino premia a quien sabe adónde va. Avanzar por avanzar, sin rumbo, solo aleja. La carta pide tomar las riendas de fuerzas que tiran en direcciones distintas —deseos, miedos, opiniones ajenas— y alinearlas hacia una sola meta. El triunfo que anuncia no es suerte: es dirección sostenida en el tiempo.',
    significadoAmor:
      'En el amor, Qhapaq Ñan indica que el vínculo se mueve: la etapa de estancamiento termina y algo avanza, sea hacia el encuentro o hacia la distancia necesaria. Puede anunciar una relación que progresa con paso firme —formalización, convivencia, reencuentro tras la separación física— o la necesidad de que alguien tome la iniciativa de una vez. Si preguntas por otra persona, describe a alguien decidido cuando sabe lo que quiere, aunque a veces más centrado en sus metas que en los matices emocionales del otro: será importante verificar que en su camino haya espacio real para ti, y no solo un asiento de acompañante. En crisis, la carta aconseja definir el rumbo juntos: una pareja sin dirección compartida termina siendo dos viajeros que se cruzan.',
    significadoTrabajoDinero:
      'En trabajo y dinero, Qhapaq Ñan es carta de progreso comprobable: metas que se alcanzan, proyectos que avanzan por etapas, reconocimiento al esfuerzo disciplinado. Favorece los planes con hitos claros —como los tambos del camino inca— donde cada tramo tiene su meta y su descanso. Es propicia para viajes de trabajo, expansión hacia nuevos territorios o mercados, cambios de empleo que implican movimiento y logística. En lo económico premia la constancia sobre la genialidad: el ahorro sistemático, el pago puntual de deudas, el avance sostenido. Advierte contra dispersar la fuerza en varios rumbos a la vez: elige la meta principal del trimestre y ordena lo demás detrás de ella. La victoria que promete llega por kilómetros acumulados, no por atajos.',
    significadoEspiritual:
      'En lo espiritual, Qhapaq Ñan enseña que el camino se hace caminando, pero no de cualquier manera: los antiguos trazaron la ruta con dirección sagrada, uniendo santuarios, no vagando. Invita a poner rumbo a la práctica interior: una disciplina concreta sostenida en el tiempo vale más que mil entusiasmos de una semana. También recuerda la humildad del caminante: por señor que sea el camino, se recorre paso a paso, con descansos en los tambos y respeto por las alturas. La pregunta espiritual que trae: ¿hacia qué santuario está orientada tu vida?',
    significadoSombra:
      'En sombra, Qhapaq Ñan se vuelve fuga y atropello: moverse compulsivamente para no sentir, pasar por encima de otros por llegar primero, confundir velocidad con progreso. Puede señalar a alguien que corre de meta en meta sin habitar ninguna, viajes que son huidas, ambición que dejó de preguntarse para qué. También indica pérdida de rumbo: mucho esfuerzo en una dirección que ya no es la tuya, por pura inercia. Si aparece torcida, detén el carro un momento: revisa el mapa antes de gastar más fuerza, porque avanzar rápido en la dirección equivocada es la forma más cara de retroceder.',
    consejoPractico:
      'Define tu meta principal en una frase con plazo: adónde quieres llegar y cuándo. Divide el trayecto en tramos cortos con su propio hito, y celebra cada tramo cumplido como hacían los chaskis en los tambos. Esta semana, elimina una distracción que te desvía del rumbo y da un paso medible hacia la meta. Si llevas tiempo empujando sin avanzar, revisa el mapa antes que el motor.',
    preguntasDeReflexion: [
      '¿Hacia dónde estoy avanzando exactamente y quién eligió ese rumbo?',
      '¿Qué fuerzas internas tiran de mí en direcciones opuestas?',
      '¿Estoy caminando hacia algo o huyendo de algo?',
    ],
    frases: {
      esencia: 'un avance decidido que necesita rumbo claro',
      sentimiento: 'un interés activo que se demuestra en movimientos concretos',
      conducta: 'una actitud resuelta, que toma la iniciativa y marca el paso',
      oculto: 'una dirección ya tomada que todavía no se anuncia',
      obstaculo: 'una prisa o una inercia que no se detiene a revisar el mapa',
      accion: 'tomar las riendas y avanzar por etapas hacia una sola meta',
      desenlace: 'una llegada ganada tramo a tramo, con esfuerzo sostenido',
      sombra: 'una huida hacia adelante que confunde velocidad con progreso',
    },
  },
}
