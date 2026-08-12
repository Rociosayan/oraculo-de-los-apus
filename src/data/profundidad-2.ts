import type { CardDepth } from '../types'

/** Significados profundos de las cartas 8 a 15. */
export const PROFUNDIDAD_2: Record<number, CardDepth> = {
  8: {
    correspondenciaArcano: 'La Fuerza',
    palabrasClave: [
      'fuerza serena',
      'autodominio',
      'paciencia',
      'coraje',
      'instinto',
      'temple',
    ],
    simbolosAndinos: ['puma', 'mano sobre la fiera', 'roquedal andino', 'ichu', 'mirada tranquila'],
    ejes: ['tierra', 'luz'],
    polaridad: 1,
    significadoGeneral:
      'Puma es la mujer con la mano serena sobre la cabeza de la fiera: no la ha vencido con violencia sino con temple. Como La Fuerza del tarot, habla del poder que no grita: dominar el impulso sin matarlo, sostener la calma en medio de la provocación, tener el coraje suave de quien no necesita demostrar nada. Cuando aparece, indica que la situación se gana con paciencia y firmeza interior, no con choque frontal: la presión, la ira o el miedo que sientes pueden domesticarse y ponerse a trabajar a tu favor. También anuncia una reserva de energía mayor de la que crees tener: has pasado pruebas más duras que esta. El instinto no es enemigo de la serenidad; bien guiado, es su mejor aliado.',
    significadoAmor:
      'En el amor, Puma habla de la fuerza tranquila que sostiene los vínculos en tiempos difíciles: la paciencia con los procesos del otro, el autodominio en las discusiones, la pasión que no necesita dramatismo para estar viva. Puede describir una relación intensa donde conviene domar los arrebatos —celos, orgullo, palabras dichas en caliente— antes de que muerdan lo construido. Si preguntas por una persona, señala a alguien de emociones fuertes pero contenidas: bajo su calma hay fuego, y se abre solo con quien no intenta forzarla. La carta aconseja manejar los conflictos con suavidad firme: decir la verdad sin herir, sostener el límite sin gritar. La ternura, recuerda, no es debilidad: es la única mano que la fiera acepta.',
    significadoTrabajoDinero:
      'En trabajo y dinero, Puma indica que el desafío actual se supera con temple más que con talento: proyectos que exigen constancia bajo presión, entornos tensos donde conservar la calma es la verdadera ventaja competitiva, negociaciones donde gana quien no se desespera. Aconseja no responder en caliente a provocaciones laborales —correos agresivos, críticas injustas, plazos imposibles— sino tomar aire y contestar desde la serenidad: esa diferencia de tono decide carreras. En lo económico pide domar los impulsos de gasto y las decisiones tomadas por ansiedad: ni compras para calmarte ni ventas por pánico. Es buena carta para trabajos exigentes del cuerpo y del carácter. La recompensa llega para quien resiste con elegancia lo que a otros los quiebra.',
    significadoEspiritual:
      'En lo espiritual, Puma enseña la alianza con el propio instinto: la energía vital —rabia, deseo, miedo— no se reprime ni se obedece ciegamente: se escucha, se honra y se conduce. Es la carta del guerrero interior pacífico: fuerte porque conoce su sombra y ya no le teme. Invita a prácticas que unan cuerpo y serenidad —caminar en montaña, respirar profundo, moverse con conciencia— y a revisar dónde confundes espiritualidad con desconexión del cuerpo. El puma medita con los ojos abiertos: presente, alerta y en paz.',
    significadoSombra:
      'En sombra, Puma se vuelve represión o zarpazo: o tanta contención que la vida pierde sabor y el cuerpo enferma de lo no dicho, o estallidos desproporcionados cuando la presa interior por fin se suelta. Puede señalar ira antigua disfrazada de calma, orgullo que no pide ayuda, o una relación donde la intensidad se volvió lucha de poder. También advierte contra la prepotencia del fuerte: usar el temple para intimidar en silencio. Si sale torcida, pregúntate qué emoción llevas demasiado tiempo sujetando del cuello en lugar de escucharla.',
    consejoPractico:
      'Ante la próxima provocación, date tres respiraciones antes de responder: gana quien conserva el temple, no quien contesta primero. Identifica la emoción que más te está costando sostener estos días y dale una salida física —caminar fuerte, escribirla, decirla en voz alta a solas— antes de conversarla. Y no confundas calma con silencio eterno: hay límites que deben decirse esta semana, con voz suave y postura firme.',
    preguntasDeReflexion: [
      '¿Qué impulso me está pidiendo dirección en lugar de represión?',
      '¿Dónde estoy confundiendo aguantar con resolver?',
      '¿A qué le sigo teniendo miedo aunque ya tenga fuerza para enfrentarlo?',
    ],
    frases: {
      esencia: 'una fuerza serena que domina sin violencia',
      sentimiento: 'una pasión contenida que arde bajo la calma',
      conducta: 'una presencia tranquila y firme, que no se deja provocar',
      oculto: 'una intensidad guardada que solo se muestra en confianza',
      obstaculo: 'una tensión entre el impulso y el control que agota por dentro',
      accion: 'sostener el temple y conducir la emoción sin reprimirla',
      desenlace: 'una victoria paciente, ganada por quien no se desesperó',
      sombra: 'una rabia antigua que muerde cuando al fin se suelta',
    },
  },
  9: {
    correspondenciaArcano: 'El Ermitaño',
    palabrasClave: [
      'introspección',
      'búsqueda',
      'soledad fértil',
      'sabiduría',
      'retiro',
      'discernimiento',
    ],
    simbolosAndinos: ['anciano del apu', 'lámpara de aceite', 'sendero solitario', 'poncho oscuro', 'estrellas de altura'],
    ejes: ['tierra', 'cielo'],
    polaridad: 0,
    significadoGeneral:
      'La Ermita Andina es el anciano que sube solo hacia el apu con su lámpara encendida: no huye del mundo, va a buscar una respuesta que abajo, entre el ruido, no se deja encontrar. Como El Ermitaño, señala un tiempo de introspección necesaria: apartarse un poco, revisar el camino andado, escuchar la propia voz sin interferencias. Cuando aparece, la respuesta que buscas no está en más opiniones sino en más silencio: nadie puede subir esta cuesta por ti. También puede representar a un guía discreto —una persona mayor, un terapeuta, un maestro sin templo— cuya luz pequeña alumbra justo el siguiente paso. La carta no anuncia soledad triste sino soledad fértil: la que devuelve a la gente más entera de lo que salió.',
    significadoAmor:
      'En el amor, la Ermita pide honestidad sobre los tiempos: alguien en este vínculo —quizá tú, quizá el otro— necesita espacio para pensar, y ese retiro no es necesariamente rechazo. Puede describir a una persona que se ha replegado para ordenar lo que siente, o una etapa donde la relación gana más con pausas reflexivas que con conversaciones maratónicas. Si estás sola, sugiere que este periodo tiene propósito: conocerte sin espejo ajeno para no repetir viejas elecciones. Advierte contra dos errores opuestos: perseguir a quien pidió espacio, y usar el retiro como castigo silencioso. El amor maduro respeta las cuevas del otro y confía en el regreso. Cuando la persona vuelve de su montaña, suele volver con más claridad y más verdad para ofrecer.',
    significadoTrabajoDinero:
      'En trabajo y dinero, la Ermita aconseja pausa estratégica: antes de aceptar, renunciar, invertir o lanzar, date un tiempo de análisis sin presiones externas. Favorece el trabajo profundo y solitario —investigación, escritura, planificación, auditoría de las propias finanzas— y las decisiones tomadas tras revisar la experiencia acumulada. Puede indicar que el reconocimiento tardará más de lo deseado, pero que el dominio que estás construyendo en silencio valdrá la espera. En lo económico sugiere discreción: no anuncies planes ni cifras, revisa cuentas a puerta cerrada, desconfía del entusiasmo colectivo en las inversiones. Si te sientes estancada, el problema quizá no sea el terreno sino la falta de perspectiva: sube a mirar el conjunto antes de dar el siguiente paso.',
    significadoEspiritual:
      'En lo espiritual, la Ermita es la peregrinación interior: la subida al apu que todo buscador hace tarde o temprano, donde la única compañía es la lámpara propia. Enseña que la luz que sirve no es la que deslumbra sino la que alcanza para el paso siguiente. Invita al retiro con propósito: un día de silencio, un cuaderno, una caminata larga sin teléfono. También recuerda que la sabiduría encontrada arriba se confirma abajo: lo aprendido en soledad debe volver al valle y servir a alguien más, o se vuelve vanidad de altura.',
    significadoSombra:
      'En sombra, la Ermita se vuelve aislamiento y amargura: el retiro que empezó como búsqueda y terminó como escondite, la desconexión disfrazada de profundidad, el orgullo del que mira el valle desde arriba y desprecia a los que no suben. Puede señalar soledad no elegida que duele y no se confiesa, o el uso del silencio como muralla en un vínculo. También advierte contra la eterna preparación: estudiarlo todo para no arriesgar nunca nada. Si sale torcida, pregunta cuánto de tu soledad es camino y cuánto es miedo con lámpara.',
    consejoPractico:
      'Reserva esta semana un espacio real de silencio —una tarde, una caminata larga, una mañana sin pantallas— y llévate una sola pregunta escrita. No la respondas de inmediato: deja que camine contigo. Si alguien te pidió espacio, respétalo poniendo un plazo amable para retomar la conversación. Y cuando encuentres tu respuesta, no te la quedes en la montaña: actúa sobre ella al volver.',
    preguntasDeReflexion: [
      '¿Qué pregunta me llevaría a la montaña si pudiera hacer solo una?',
      '¿Mi soledad actual me está construyendo o me está escondiendo?',
      '¿Qué he aprendido en este retiro que todavía no he puesto en práctica?',
    ],
    frases: {
      esencia: 'una búsqueda interior que necesita silencio y distancia',
      sentimiento: 'un sentimiento real que se ha replegado para pensarse',
      conducta: 'una actitud reservada, que se aparta sin dar explicaciones',
      oculto: 'una reflexión solitaria que el otro no está mostrando',
      obstaculo: 'un aislamiento que ya dejó de ser búsqueda y se volvió escondite',
      accion: 'tomarse una pausa deliberada antes de decidir',
      desenlace: 'una claridad ganada a solas que ordena todo lo demás',
      sombra: 'una distancia que castiga en silencio en lugar de hablar',
    },
  },
  10: {
    correspondenciaArcano: 'La Rueda de la Fortuna',
    palabrasClave: [
      'ciclos',
      'cambio',
      'giro del destino',
      'oportunidad',
      'cosecha y siembra',
      'adaptación',
    ],
    simbolosAndinos: ['pachakuti', 'rueda agrícola', 'sol y luna alternando', 'chakana central', 'estaciones'],
    ejes: ['transformacion', 'movimiento'],
    polaridad: 0,
    significadoGeneral:
      'Pachakuti es el vuelco del tiempo: la rueda agrícola donde siembra, crecimiento, cosecha y descanso se suceden sin que nadie pueda detenerlas. Como La Rueda de la Fortuna, anuncia un giro del ciclo: lo que estaba arriba baja, lo que estaba abajo sube, y la situación que consultas está cambiando de fase ahora mismo. Cuando aparece, conviene soltar la ilusión de control total y afinar en cambio el sentido de la oportunidad: hay un momento para cada gesto, y reconocerlo vale más que forzarlo. Suele traer novedades externas —noticias, encuentros, vuelcos de circunstancia— que reordenan el tablero. El mensaje de fondo es esperanzador para quien atraviesa una mala racha y prudente para quien atraviesa una buena: ninguna de las dos es permanente; prepárate en ambas.',
    significadoAmor:
      'En el amor, Pachakuti señala que el vínculo entra en una fase nueva: lo que estaba estancado se mueve, lo que estaba en crisis puede girar hacia el reencuentro, lo que parecía seguro pide adaptarse a circunstancias que cambiaron. Encuentros que parecen casualidad, reapariciones del pasado, cambios externos —mudanzas, trabajos, distancias— que obligan a la relación a reinventarse: todo eso es territorio de esta carta. Si preguntas por sentimientos, indica emociones en transición: lo que el otro sentía hace meses no es exactamente lo que siente hoy, para bien o para necesidad de nueva conversación. Aconseja fluir sin aferrarse a cómo eran las cosas: los vínculos que sobreviven a los pachakutis son los que aprenden a girar juntos en lugar de exigirse mutuamente quietud.',
    significadoTrabajoDinero:
      'En trabajo y dinero, Pachakuti marca un punto de inflexión: cambios de escenario que no dependen de ti —reestructuraciones, mercados que giran, oportunidades que aparecen de pronto— y que premian a quien está lista para moverse. Aconseja flexibilidad estratégica: ten un plan, pero sostenlo con la mano abierta. Es buen momento para aprovechar rachas favorables sin asumir que durarán siempre: cosecha ahora, guarda semilla, y si la racha es mala, recuerda que las estaciones también se agotan: prepara la siembra siguiente en lugar de lamentar el invierno. En lo económico advierte contra las decisiones que suponen estabilidad eterna —deudas largas en tiempos volubles— y favorece las reservas que permiten girar rápido cuando la rueda gire.',
    significadoEspiritual:
      'En lo espiritual, Pachakuti enseña la sabiduría de los ciclos: nada de lo vivo es lineal, todo respira en estaciones, y resistirse al giro duele más que girar. Invita a preguntarte en qué fase estás —siembra, crecimiento, cosecha o descanso— y a honrar la que toca en lugar de exigirte la que no corresponde. También recuerda el sentido andino profundo del pachakuti: los grandes vuelcos no son castigo sino reordenamiento del mundo; lo que se derrumba estaba ya vencido, y el espacio que deja es semilla de un orden más justo.',
    significadoSombra:
      'En sombra, Pachakuti se vuelve vértigo y fatalismo: cambios que se encadenan sin dar respiro, la sensación de que nada depende de ti, o su reverso: culpar al destino de lo que en realidad son decisiones no tomadas. Puede señalar a quien apuesta todo a la suerte —en el dinero, en el amor— en lugar de trabajar el terreno, o a quien repite el mismo ciclo dañino esperando resultado distinto: la rueda que no se aprende se repite. Si sale torcida, distingue con honestidad qué parte del giro es azar y qué parte es tu propia mano empujando la rueda hacia el mismo barro.',
    consejoPractico:
      'Identifica en qué fase del ciclo está tu asunto —siembra, crecimiento, cosecha o descanso— y actúa según la fase, no según tu ansiedad: no se cosecha en agosto lo sembrado ayer. Aprovecha esta semana una oportunidad concreta que el cambio de escenario haya abierto, aunque sea pequeña. Y prepara una reserva para el próximo giro: algo de dinero, de tiempo o de energía guardada.',
    preguntasDeReflexion: [
      '¿En qué fase del ciclo está realmente este asunto?',
      '¿Qué patrón se me repite y qué me estará queriendo enseñar?',
      '¿Qué haría hoy si supiera que la racha actual —buena o mala— termina pronto?',
    ],
    frases: {
      esencia: 'un giro del ciclo que reordena el tablero',
      sentimiento: 'una emoción en transición, que ya no es la de antes',
      conducta: 'una conducta cambiante, que responde a un escenario en movimiento',
      oculto: 'un vuelco que ya se está gestando fuera de la vista',
      obstaculo: 'un ciclo que se repite porque aún no se aprende',
      accion: 'adaptarse al giro y aprovechar la puerta que se abre',
      desenlace: 'una fase nueva que llega, se esté o no preparada',
      sombra: 'un fatalismo que culpa a la suerte de lo que no se decide',
    },
  },
  11: {
    correspondenciaArcano: 'La Justicia',
    palabrasClave: [
      'reciprocidad',
      'equilibrio',
      'justicia',
      'acuerdos',
      'causa y efecto',
      'honestidad',
    ],
    simbolosAndinos: ['ayni', 'intercambio de cosechas', 'balanza de manos', 'trueque', 'comunidad'],
    ejes: ['vinculo', 'tierra'],
    polaridad: 1,
    significadoGeneral:
      'Ayni es la ley más antigua de los Andes: hoy por ti, mañana por mí; lo que se da vuelve, lo que se toma se debe. Como La Justicia del tarot, habla de equilibrio, acuerdos honestos y consecuencias: cada acto es una semilla contable, y la vida —tarde o temprano— cuadra los libros. Cuando aparece, el asunto que consultas se rige por causa y efecto más que por azar: lo que está ocurriendo es resultado de lo sembrado, y lo que ocurra dependerá de lo que siembres ahora. Puede señalar también asuntos literales de justicia: contratos, firmas, trámites, resoluciones pendientes. La carta pide honestidad exigente contigo misma: reconocer tu parte en el resultado es incómodo, pero es la única puerta hacia un resultado distinto.',
    significadoAmor:
      'En el amor, Ayni pone sobre la mesa la balanza del dar y recibir: ¿quién sostiene, quién escucha, quién cede, quién propone? Si la respuesta es siempre la misma persona, el vínculo está en deuda, y las deudas afectivas —a diferencia de las bancarias— se cobran en distancia y rencor. La carta favorece los acuerdos claros y las reparaciones: pedir perdón con hechos, restituir la confianza dañada, renegociar repartos injustos de tareas, tiempo y ternura. Si preguntas por una persona, indica que su comportamiento contigo será espejo del intercambio real: recibirás en proporción a lo que el vínculo le devuelve, no a lo que tú desearías. Amor sin reciprocidad, recuerda el ayni, no es amor: es tributo. Y nadie sostiene un tributo para siempre.',
    significadoTrabajoDinero:
      'En trabajo y dinero, Ayni es la carta de los acuerdos justos: contratos equilibrados, sueldos acordes al aporte, sociedades donde las cargas y ganancias se reparten con transparencia. Si algo se siente injusto —te pagan menos de lo que rindes, cargas trabajo ajeno, un socio aporta menos— la carta valida esa percepción y pide renegociar con datos, no con reproches. Favorece resoluciones legales y administrativas pendientes, cobros de deudas y formalización de tratos de palabra. En lo económico enseña contabilidad moral: el dinero que llega limpio se queda, el que llega torcido cobra intereses. También recuerda devolver a la comunidad parte de lo ganado: el ayni con el entorno —clientes, colegas, aprendices— es la inversión más rentable a largo plazo.',
    significadoEspiritual:
      'En lo espiritual, Ayni enseña que el universo es un tejido de intercambios: hasta la respiración es trueque con las plantas. Invita a revisar tu reciprocidad con la vida: cuánto pides y cuánto ofreces, a la tierra, a tu gente, a lo sagrado. La ofrenda andina no es soborno a los dioses: es reconocimiento de que todo lo recibido pide devolución. También recuerda que el equilibrio empieza dentro: darte a ti misma lo que das a otros, exigirte lo que exiges. La balanza interior calibra todas las demás.',
    significadoSombra:
      'En sombra, Ayni se vuelve contabilidad mezquina o deuda negada: llevar la cuenta exacta de cada favor para cobrarlo con intereses, dar solo para obligar, o al revés: recibir sin registrar, convencida de que todo se te debe. Puede señalar injusticias reales que se están cometiendo contigo y que ya toca nombrar, o la parte incómoda: aquella donde la injusticia la estás cometiendo tú, quizá sin verla. También advierte sobre pleitos que se eternizan por orgullo. Si sale torcida, pregunta qué deuda —dada o recibida— está envenenando el vínculo por no hablarse.',
    consejoPractico:
      'Haz la cuenta honesta de tu asunto: en una hoja, dos columnas, qué das y qué recibes. Si la balanza está torcida, no la equilibres con rencor sino con una renegociación concreta: pide lo que falta o deja de dar lo que sobra, y dilo esta semana. Salda también una deuda pequeña que tengas pendiente —una disculpa, un pago, un favor no devuelto—: el ayni se restaura por gestos, no por intenciones.',
    preguntasDeReflexion: [
      '¿Qué doy y qué recibo realmente en este asunto?',
      '¿Qué deuda —mía o ajena— sigue sin saldarse aquí?',
      '¿Qué parte del resultado actual sembré yo misma?',
    ],
    frases: {
      esencia: 'una balanza que pide equilibrio entre lo dado y lo recibido',
      sentimiento: 'un afecto que se mide en gestos correspondidos',
      conducta: 'una conducta correcta que espera el mismo trato de vuelta',
      oculto: 'una deuda no hablada que inclina la balanza en silencio',
      obstaculo: 'un intercambio desigual que va acumulando rencor',
      accion: 'renegociar el trato con honestidad y datos en mano',
      desenlace: 'un resultado que devuelve, tarde o temprano, lo sembrado',
      sombra: 'una cuenta mezquina que cobra cada favor con intereses',
    },
  },
  12: {
    correspondenciaArcano: 'El Colgado',
    palabrasClave: [
      'mundo interior',
      'pausa',
      'perspectiva',
      'lo enterrado',
      'entrega',
      'gestación',
    ],
    simbolosAndinos: ['Uku Pacha', 'cueva bajo tierra', 'raíces y semillas', 'serpiente guardiana', 'luz en la profundidad'],
    ejes: ['sombra', 'tierra', 'transformacion'],
    polaridad: -1,
    significadoGeneral:
      'Uku Pacha es el mundo de abajo: la cueva donde descansan las semillas, las raíces y lo que todavía no está listo para salir a la luz. Como El Colgado, habla de pausas que no son castigo sino gestación: hay procesos que exigen suspender la acción, mirar el asunto desde un ángulo nuevo y aceptar que por ahora no se puede empujar. Cuando aparece, algo importante está ocurriendo bajo la superficie: emociones que maduran, información que aún no emerge, causas enterradas que explican lo visible. La carta pide paciencia activa: no es tiempo de forzar sino de comprender. También señala lo oculto en sentido literal: asuntos que se mueven fuera de tu vista, secretos propios o ajenos, memorias enterradas que piden ser desenterradas con cuidado, no con pala.',
    significadoAmor:
      'En el amor, Uku Pacha indica que lo esencial del vínculo está pasando por debajo de lo visible: sentimientos que ninguno ha confesado, heridas del pasado que operan en silencio, o una etapa de suspensión donde la relación parece detenida pero en realidad está decidiéndose por dentro. Si preguntas por otra persona, sugiere que hay más de lo que muestra: procesos internos, dudas o afectos que no ha puesto en palabras, y presionar para que los declare antes de tiempo puede sellarlos aún más. También puede señalar un amor que se vive en secreto o que no encuentra cómo salir a la luz. El consejo es doble: respeta los tiempos de lo que germina, pero no confundas gestación con entierro: lo que después de mucho tiempo sigue sin poder mostrarse, quizá no esté creciendo sino escondiéndose.',
    significadoTrabajoDinero:
      'En trabajo y dinero, Uku Pacha aconseja detener la maquinaria y mirar debajo: hay información que no está sobre la mesa —números reales, intenciones de otros, cláusulas pequeñas— y decidir sin ella sería decidir a ciegas. Favorece las auditorías, las revisiones profundas, el trabajo de fondo que nadie ve pero que sostiene todo lo demás. Puede indicar proyectos en pausa que conviene no abandonar todavía: están madurando, no muriendo; la diferencia se nota en si aprendes algo mientras esperas. En lo económico advierte sobre movimientos ocultos: gastos hormiga que erosionan sin ruido, acuerdos donde alguien calla parte del trato. Antes de invertir o firmar, excava: pregunta lo incómodo, pide los papeles, revisa el subsuelo del negocio.',
    significadoEspiritual:
      'En lo espiritual, Uku Pacha es el descenso sagrado: bajar a la propia profundidad —memorias, duelos, miedos enterrados— no como castigo sino como visita a la semilla. Los Andes saben que el mundo de abajo no es infierno: es despensa y origen, el lugar donde lo viejo se descompone para nutrir lo nuevo. Invita al trabajo interior acompañado: terapia, escritura profunda, ritual de soltar. También enseña la entrega: hay etapas donde lo más sabio no es hacer sino dejarse hacer, como la semilla que confía en la oscuridad que la envuelve.',
    significadoSombra:
      'En sombra, Uku Pacha se vuelve entierro de lo que debía vivir: emociones sepultadas que gobiernan desde abajo, secretos que pudren en lugar de madurar, la costumbre de posponer indefinidamente lo que da miedo enfrentar. Puede señalar depresión disfrazada de calma, asuntos familiares tapados por generaciones, o sacrificios inútiles: quedarse colgada de una situación que ya dio todo lo que podía dar, llamando paciencia a lo que es miedo a soltar. Si sale torcida, pregunta qué estás manteniendo enterrado que ya empezó a moverse solo: lo que se entierra vivo, tarde o temprano, escarba.',
    consejoPractico:
      'Suspende por unos días la urgencia de resolver y dedica ese tiempo a excavar: escribe la historia completa del asunto, desde su verdadero comienzo, y busca la causa que está debajo de la causa. Haz una pregunta incómoda que llevas tiempo evitando —a alguien o a ti misma— y escucha la respuesta entera. Si hay un duelo o una emoción enterrada, dale un espacio concreto esta semana: nómbrala, escríbela o llévala a terapia.',
    preguntasDeReflexion: [
      '¿Qué hay debajo de este asunto que todavía no he querido mirar?',
      '¿Esto que espero está germinando o lo estoy usando para no decidir?',
      '¿Qué enterré hace tiempo que sigue moviéndose bajo mis días?',
    ],
    frases: {
      esencia: 'un proceso subterráneo que madura lejos de la vista',
      sentimiento: 'una emoción honda y enterrada que aún no encuentra palabras',
      conducta: 'una actitud suspendida, que no avanza ni suelta',
      oculto: 'una causa enterrada que explica lo que se ve en la superficie',
      obstaculo: 'un asunto sepultado que frena todo desde abajo',
      accion: 'detenerse a excavar la causa antes de empujar más',
      desenlace: 'una verdad que saldrá a la luz cuando termine de germinar',
      sombra: 'un secreto o un duelo enterrado que gobierna en silencio',
    },
  },
  13: {
    correspondenciaArcano: 'La Muerte',
    palabrasClave: [
      'transformación',
      'cierre',
      'renacimiento',
      'ancestros',
      'soltar',
      'semilla',
    ],
    simbolosAndinos: ['mallki', 'ancestro amortajado en fino tejido', 'árbol joven', 'raíces y brotes', 'flores nuevas'],
    ejes: ['transformacion', 'tierra'],
    polaridad: 0,
    significadoGeneral:
      'Mallki es a la vez el ancestro envuelto en su tejido ceremonial y el árbol joven que brota a su lado: en los Andes la misma palabra nombra a la momia sagrada y a la planta que renace, porque la muerte y la semilla son una sola cosa mirada desde lados distintos. Como el arcano de La Muerte, no anuncia tragedia: anuncia final necesario. Algo en tu situación cumplió su ciclo —una etapa, un rol, una manera de vivir o de vincularte— y sostenerlo artificialmente solo pospone el brote. Cuando aparece, la pregunta no es si habrá cambio sino cuánto te costará según lo resistas o lo acompañes. La carta honra también a los ancestros: lo que termina no se tira, se convierte en raíz. Se suelta la forma, se hereda la fuerza.',
    significadoAmor:
      'En el amor, Mallki señala el fin de una forma de vínculo: puede ser una separación que ya está madura, o —igual de frecuente— la muerte necesaria de una etapa dentro de la misma relación: la pareja que eran ya no alcanza, y toca dejarla morir para que nazca la que pueden ser. Si preguntas por una relación terminada, la carta suele confirmar el cierre: el retorno a lo idéntico no es su lenguaje; su lenguaje es lo nuevo que crece del compost de lo vivido. Invita a los duelos bien hechos: llorar lo que corresponde, agradecer lo que hubo, devolver lo que no es tuyo y quedarte con lo aprendido. Advierte contra los vínculos zombi: los que ya murieron pero siguen caminando por miedo a la tierra vacía. El corazón, como la chacra, necesita barbecho entre siembras.',
    significadoTrabajoDinero:
      'En trabajo y dinero, Mallki marca cierres de ciclo profesional: renuncias que ya maduraron, proyectos que deben declararse terminados, modelos de negocio que cumplieron su tiempo, gastos y estructuras que hay que podar sin culpa. Es la carta de la reinvención: lo que sabes hacer no desaparece, se replanta en otra forma. Aconseja hacer los cierres con orden —documentos, entregas, despedidas limpias— porque de esos finales bien hechos dependen las recomendaciones y las puertas futuras. En lo económico favorece cortar pérdidas a tiempo: vender lo que no rinde, cancelar lo que sangra, aunque duela reconocer el error. El dinero enterrado en lo muerto no es lealtad: es miedo. Libera esos recursos y tendrás semilla para lo que sigue.',
    significadoEspiritual:
      'En lo espiritual, Mallki enseña la muerte como maestra de vida: quien acepta que todo termina, empieza a vivir con más verdad y menos postergación. Invita a honrar a los ancestros —nombrarlos, agradecerles, sanar lo que dejaron pendiente— entendiendo que sus raíces sostienen tu brote. También propone pequeños ritos de cierre: quemar lo escrito, despedir con palabras, marcar el fin de las etapas en lugar de dejarlas deshilacharse. Lo que se cierra con conciencia libera su fuerza; lo que se abandona sin rito persigue.',
    significadoSombra:
      'En sombra, Mallki se vuelve resistencia al final o destrucción prematura: aferrarse a lo muerto —vínculos, empleos, identidades— hasta que la vida tenga que arrancarlo con dolor, o el extremo opuesto: cortar todo apenas se complica, confundiendo transformación con huida serial. Puede señalar duelos congelados que impiden avanzar, herencias emocionales pesadas que se repiten sin examinarse, o el miedo a la propia muerte disfrazado de hiperactividad. Si sale torcida, pregunta qué estás manteniendo con respiración artificial, y también qué mataste demasiado pronto por no tolerar la incomodidad de la espera.',
    consejoPractico:
      'Nombra con honestidad qué terminó en tu situación, aunque siga en pie por costumbre, y dale un cierre concreto esta semana: una conversación final, un documento firmado, una caja que por fin se guarda o se entrega. Haz un pequeño rito de despedida —escribe lo vivido y agradécelo— y abre espacio inmediato para un brote: algo nuevo, por pequeño que sea, plantado en el lugar que quedó libre.',
    preguntasDeReflexion: [
      '¿Qué terminó ya en mi vida aunque yo siga sosteniéndolo?',
      '¿Qué duelo tengo congelado y qué necesitaría para hacerlo bien?',
      '¿Qué heredé —fuerza o herida— que está actuando en este asunto?',
    ],
    frases: {
      esencia: 'un final necesario que trae la semilla de lo siguiente',
      sentimiento: 'un afecto que cambió de forma y ya no cabe en la antigua',
      conducta: 'una despedida en marcha, aunque aún no se declare',
      oculto: 'un ciclo ya cerrado por dentro que por fuera sigue en pie',
      obstaculo: 'un apego a lo que ya murió que bloquea todo brote',
      accion: 'cerrar con rito y orden lo que cumplió su tiempo',
      desenlace: 'un renacimiento que llega cuando se suelta la forma vieja',
      sombra: 'un duelo congelado que impide que nada nuevo crezca',
    },
  },
  14: {
    correspondenciaArcano: 'La Templanza',
    palabrasClave: [
      'fluidez',
      'sanación',
      'medida justa',
      'adaptación',
      'serenidad',
      'mezcla armoniosa',
    ],
    simbolosAndinos: ['Mama Qocha', 'lago Titicaca', 'cántaro que vierte agua', 'peces y totorales', 'orilla serena'],
    ejes: ['luz', 'transformacion'],
    polaridad: 1,
    significadoGeneral:
      'Mama Qocha es la madre agua que vierte su cántaro de vuelta al lago: nada retiene, nada fuerza, todo lo hace circular en su medida justa. Como La Templanza, es la carta de la mezcla armoniosa: combinar opuestos sin violencia, encontrar el punto medio entre extremos, dejar que el tiempo y la constancia suave hagan lo que la fuerza no puede. Cuando aparece, la situación pide moderación y paciencia fluida: ni empujar ni abandonar, sino acompañar el proceso con ajustes pequeños y continuos. Es también una gran carta de sanación: heridas —del cuerpo, del ánimo, de los vínculos— que empiezan a cerrar si se les da cauce y calma. El agua enseña el método: no rompe la piedra por golpe, la moldea por presencia constante.',
    significadoAmor:
      'En el amor, Mama Qocha trae serenidad después de la marea: reconciliaciones que fluyen, conversaciones que por fin encuentran tono amable, vínculos que aprenden a mezclar sus diferencias sin anularse. Favorece la paciencia con los procesos del otro y los acercamientos graduales: ni exigir todo ahora, ni fingir que no se necesita nada. Si preguntas por una persona, describe un sentimiento sereno y verdadero, sin fuegos artificiales pero con caudal constante: el tipo de afecto que no deslumbra en la primera cita y sostiene en el año difícil. En crisis de pareja, es de las mejores señales: indica que hay voluntad de encontrar la medida justa entre ambos. Aconseja cuidar el tono más que el argumento: en el agua de esta carta, cómo se dice importa más que quién tiene razón.',
    significadoTrabajoDinero:
      'En trabajo y dinero, Mama Qocha aconseja el término medio y la constancia: ni el riesgo temerario ni la parálisis prudente, sino avances graduales con correcciones sobre la marcha. Favorece los equipos que integran perfiles distintos, las negociaciones donde ambas partes ceden algo, los proyectos que requieren coordinar ritmos diferentes. Es buena carta para oficios de cuidado, salud, mediación y todo trabajo donde la mano suave logra lo que la presión arruina. En lo económico propone equilibrio entre gasto y ahorro, entre disfrutar hoy y asegurar mañana: presupuestos sostenibles antes que austeridades heroicas que se abandonan al mes. Si hay conflicto laboral, señala la vía de la mediación: hay un acuerdo posible si alguien modera el tono, y ese alguien puedes ser tú.',
    significadoEspiritual:
      'En lo espiritual, Mama Qocha enseña a fluir sin perderse: ser agua que se adapta al cauce sin dejar de ser agua. Invita a las prácticas del sosiego —respirar junto al agua, cantar, dejar que las emociones circulen sin represarlas ni desbordarlas— y a la sanación como proceso: no hay herida que cierre por decreto, hay heridas que cierran por cuidado sostenido. También recuerda la inmensidad materna del lago: hay una calma más grande que tu tormenta, y no está lejos: está debajo de ella, como el agua profunda bajo el oleaje.',
    significadoSombra:
      'En sombra, Mama Qocha se vuelve tibieza y desborde: la moderación convertida en no decidir nunca nada, la adaptación convertida en disolverse en lo que otros quieren, o el reverso: emociones represadas tanto tiempo que revientan el dique e inundan todo. Puede señalar sanaciones postergadas por parecer que ya pasó, acuerdos tibios que no conforman a nadie, o la costumbre de mediar en conflictos ajenos mientras el propio se ahoga. Si sale torcida, pregunta dónde tu flexibilidad dejó de ser virtud y empezó a ser forma de desaparecer.',
    consejoPractico:
      'Busca la medida justa en tu asunto: identifica los dos extremos entre los que oscilas y da esta semana un paso intermedio, concreto y sostenible. Cuida el tono en la próxima conversación difícil: di lo mismo, pero como lo diría el agua, sin dejar de decirlo. Y date un contacto real con el agua —lago, río, mar o una ducha consciente— para recordarle al cuerpo cómo se fluye.',
    preguntasDeReflexion: [
      '¿Entre qué dos extremos estoy oscilando y cuál sería mi punto medio?',
      '¿Qué herida estoy dando por cerrada solo porque dejó de doler fuerte?',
      '¿Dónde mi capacidad de adaptarme se está volviendo desaparición?',
    ],
    frases: {
      esencia: 'una corriente serena que busca la medida justa',
      sentimiento: 'un afecto tranquilo y constante, de caudal profundo',
      conducta: 'una actitud conciliadora, que suaviza el tono y tiende puentes',
      oculto: 'una emoción que circula por debajo buscando su cauce',
      obstaculo: 'una tibieza que evita decidir por no incomodar',
      accion: 'moderar, mezclar y avanzar con ajustes pequeños y constantes',
      desenlace: 'una sanación gradual que asienta las aguas',
      sombra: 'una emoción represada que amenaza con desbordar el dique',
    },
  },
  15: {
    correspondenciaArcano: 'El Diablo',
    palabrasClave: [
      'sombra',
      'ataduras',
      'deseo',
      'manipulación',
      'obsesión',
      'espejismo',
    ],
    simbolosAndinos: ['Supay', 'máscara con cuernos', 'sombra en la roca', 'vela en la cueva', 'murciélagos nocturnos'],
    ejes: ['sombra', 'vinculo'],
    polaridad: -2,
    significadoGeneral:
      'Supay es la sombra proyectada en la pared de la cueva: enorme, con cuernos, aterradora... y hecha de la misma luz de tu vela. Como El Diablo del tarot, no habla de demonios externos sino de ataduras internas: dependencias, obsesiones, miedos que gobiernan, deseos negados que mandan más cuanto menos se miran. Cuando aparece, algo en la situación esclaviza en lugar de liberar: un vínculo, un hábito, una idea fija, una versión de los hechos que te tiene atrapada. También advierte sobre manipulación y engaño: promesas que encadenan, favores con precio oculto, versiones interesadas de la verdad. Pero su mensaje profundo es liberador: la cadena que muestra siempre tiene el candado por dentro. Mirar la sombra de frente es el primer paso para recuperar la llave.',
    significadoAmor:
      'En el amor, Supay señala la diferencia entre amar y necesitar: vínculos donde hay más enganche que cariño, atracciones intensas que confunden obsesión con pasión, relaciones donde se permanece por miedo, costumbre o deseo, llamándolo amor. Puede describir dinámicas de manipulación —celos como control, culpa como correa, intermitencia calculada que mantiene en vilo— o simplemente la parte oscura y verdadera del deseo, que no es mala en sí: es mala cuando se niega o cuando se usa para atar. Si preguntas por una persona, la carta pide lucidez incómoda: ¿te busca a ti o busca lo que obtiene de ti? ¿Y tú? La salida nunca es fingir que la sombra no existe: es nombrarla. Los vínculos sobreviven a la verdad del deseo; rara vez sobreviven a su mentira.',
    significadoTrabajoDinero:
      'En trabajo y dinero, Supay advierte sobre cadenas doradas: empleos que pagan bien la infelicidad, deudas que esclavizan el futuro por gustos del presente, socios o jefes que manipulan con promesas siempre pospuestas. Pide revisar la letra pequeña de todo: contratos, acuerdos, favores que se cobran después. También señala las trampas propias: ambición que no tiene fondo, adicción al trabajo como anestesia, atajos turbios que hipotecan la reputación. En lo económico es alerta directa: desconfía de las ofertas irresistibles, los negocios opacos y todo lo que exija decidir ya sin tiempo de pensar: la urgencia es la herramienta favorita del engaño. Antes de firmar o comprometerte, pregunta qué gana exactamente la otra parte y por qué no lo dice tan claro.',
    significadoEspiritual:
      'En lo espiritual, Supay es el guardián del umbral oscuro: la parte de ti que exiliaste —rabia, deseo, envidia, hambre de poder— y que desde el exilio dirige tu vida en secreto. El trabajo que propone es el más honesto de todos: bajar con tu vela, mirar a la sombra sin pestañear y descubrir que custodia energía secuestrada: toda la fuerza que gastas en negarla. Los Andes no ven al Supay como demonio a exterminar sino como fuerza a respetar y reubicar. Lo que integras te sirve; lo que reprimes te gobierna.',
    significadoSombra:
      'Cuando Supay domina la tirada, la advertencia sube de tono: puede haber engaño activo, dependencia que se profundiza o una influencia —persona, hábito, entorno— que drena más de lo que aporta. En el peor caso señala relaciones o tratos abiertamente tóxicos donde la salida requiere ayuda externa: no todas las cadenas se abren solas. Pero cuidado con el otro extremo: ver demonios en todas partes también es obra del Supay: el miedo que agranda sombras hasta tapar el sol. La pregunta discriminante es simple: ¿qué hechos concretos tengo, más allá de lo que temo?',
    consejoPractico:
      'Nombra tu cadena sin suavizarla: escribe qué te tiene atada en este asunto —persona, hábito, deuda, miedo— y qué obtienes de esa atadura, porque algo obtienes. Luego da un paso pequeño y verificable de libertad esta semana: una conversación honesta, un límite dicho, un gasto cortado. Si sospechas manipulación, deja de discutir y empieza a observar: los hechos de la otra persona te dirán lo que sus palabras te niegan.',
    preguntasDeReflexion: [
      '¿Qué me tiene atada aquí y qué gano yo con seguir atada?',
      '¿Esto que siento es amor, deseo, costumbre o miedo a soltar?',
      '¿Qué hechos concretos tengo, separados de lo que temo o imagino?',
    ],
    frases: {
      esencia: 'una atadura que se hace pasar por deseo o destino',
      sentimiento: 'un enganche intenso donde se mezclan deseo, miedo y costumbre',
      conducta: 'un juego de poder que promete, retiene y no suelta',
      oculto: 'una manipulación o un deseo negado que opera en la penumbra',
      obstaculo: 'una dependencia que aprieta más cuanto menos se mira',
      accion: 'nombrar la cadena de frente y dar un paso verificable de libertad',
      desenlace: 'una liberación posible solo si se mira la sombra sin pestañear',
      sombra: 'una obsesión o un engaño que crece alimentado por el silencio',
    },
  },
}
