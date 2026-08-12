import type { CardDepth } from '../types'

/** Significados profundos de las cartas 16 a 21. */
export const PROFUNDIDAD_3: Record<number, CardDepth> = {
  16: {
    correspondenciaArcano: 'La Torre',
    palabrasClave: [
      'ruptura',
      'revelación',
      'sacudida',
      'verdad súbita',
      'liberación forzosa',
      'descarga',
    ],
    simbolosAndinos: ['Illapa', 'rayo y honda', 'nubes de tormenta', 'lluvia sobre los cerros', 'trueno'],
    ejes: ['transformacion', 'cielo', 'sombra'],
    polaridad: -1,
    significadoGeneral:
      'Illapa es el señor del rayo: su honda restalla en el cielo y en un instante ilumina todo el valle, aunque el resplandor derribe lo que estaba mal cimentado. Como La Torre del tarot, anuncia una sacudida: una verdad que sale a la luz de golpe, una estructura que se quiebra, un acontecimiento súbito que cambia el mapa. Cuando aparece, algo que parecía firme demuestra no serlo, y aunque el momento sea difícil, la carta insiste en su función: el rayo no destruye lo sano, destruye lo que ya estaba podrido y solo se sostenía por costumbre. Después de la tormenta de Illapa llega la lluvia que fertiliza: las crisis que trae despejan el terreno para construir con cimientos verdaderos. Mejor la verdad que sacude que la mentira que sostiene.',
    significadoAmor:
      'En el amor, Illapa suele señalar revelaciones y quiebres: una verdad que sale a la luz —algo callado, una doble vida, un sentimiento real por fin confesado—, una discusión que rompe el equilibrio aparente, o una ruptura súbita que en el fondo venía gestándose hace tiempo. Es una carta dura pero honesta: lo que derriba no era tan sólido como parecía, y sostenerlo costaba una energía que ahora queda libre. Si el vínculo es sano, la sacudida puede ser otra: una crisis externa que obliga a la pareja a mostrarse de verdad, y de la que puede salir más fuerte. El consejo es no reconstruir de inmediato sobre los escombros calientes: deja que pase la tormenta, mira qué quedó en pie por mérito propio, y construye después solo sobre eso.',
    significadoTrabajoDinero:
      'En trabajo y dinero, Illapa advierte cambios bruscos de escenario: despidos o renuncias súbitas, proyectos que se caen, socios que se van, gastos imprevistos que desarman el presupuesto. La mejor respuesta es doble: amortiguar y aprovechar. Amortiguar: revisa hoy tus respaldos —ahorros, contratos, copias, alternativas— porque el rayo castiga menos a quien tiene pararrayos. Aprovechar: toda demolición deja un terreno despejado; lo que se derrumbó te libera de seguir invirtiendo en algo que no daba más, y las crisis reparten oportunidades para quien mantiene la cabeza fría. Evita eso sí las decisiones irreversibles en pleno temporal: ni renuncies por furia ni firmes por pánico. Primero pasa la tormenta, después se evalúan los daños reales, que casi siempre son menores que los imaginados.',
    significadoEspiritual:
      'En lo espiritual, Illapa es la iluminación violenta: la verdad que no llega por meditación gradual sino por relámpago: en un instante ves lo que años de rutina taparon. Los Andes lo veneran también como dador de lluvia: la misma fuerza que asusta, fertiliza. Invita a preguntarte qué certezas tuyas eran torres de paja: creencias heredadas, seguridades falsas, versiones cómodas de ti misma que la vida acaba de desmentir. No reconstruyas la torre idéntica: escucha qué quiso mostrar el rayo. La fe que sobrevive a la tormenta es la única que era de verdad.',
    significadoSombra:
      'En sombra, Illapa se vuelve destrucción sin propósito o miedo paralizante: vivir esperando el próximo golpe, romper todo antes de que algo se rompa solo, usar la furia como respuesta a cualquier frustración. Puede señalar a alguien que dinamita vínculos o proyectos cada vez que se acercan a la intimidad o al compromiso, o una crisis real que se está negando: la torre ya cruje y se sigue decorando el último piso. Si sale torcida, distingue: ¿el peligro es la tormenta o tu costumbre de construir en terreno que sabes falso?',
    consejoPractico:
      'Refuerza hoy tus pararrayos: respaldo de dinero, copias de lo importante, personas de confianza avisadas. Si la sacudida ya ocurrió, no tomes decisiones irreversibles esta semana: atiende lo urgente, deja que asiente el polvo y evalúa después qué quedó en pie. Y si hay una verdad que sabes y callas, considera decirla tú, con cuidado, antes de que salga sola y con rayos.',
    preguntasDeReflexion: [
      '¿Qué estructura de mi vida sé que cruje aunque siga decorándola?',
      '¿Qué verdad saldría a la luz si alguien la soltara de golpe?',
      '¿Qué me liberaría este derrumbe si dejo de defender las ruinas?',
    ],
    frases: {
      esencia: 'una sacudida que derriba lo mal cimentado y despeja la verdad',
      sentimiento: 'una emoción a punto de estallar tras mucho contenerse',
      conducta: 'una reacción brusca e imprevisible, que rompe el libreto',
      oculto: 'una verdad tapada que busca salir de golpe',
      obstaculo: 'una crisis que exige soltar el control de inmediato',
      accion: 'decir la verdad difícil antes de que estalle sola',
      desenlace: 'un derrumbe que libera terreno para cimientos de verdad',
      sombra: 'una destrucción impulsiva que rompe también lo sano',
    },
  },
  17: {
    correspondenciaArcano: 'La Estrella',
    palabrasClave: [
      'esperanza',
      'guía',
      'renovación',
      'confianza',
      'inspiración',
      'promesa',
    ],
    simbolosAndinos: ['Chaska', 'estrella del alba', 'manantial de altura', 'dos cántaros de agua', 'cielo despejado'],
    ejes: ['luz', 'cielo'],
    polaridad: 2,
    significadoGeneral:
      'Chaska es la estrella del alba: la primera luz después de la noche más larga, la que los viajeros usaban para orientarse cuando aún estaba oscuro. Como La Estrella del tarot, es la carta de la esperanza con fundamento: no promete que todo esté resuelto, promete que la dirección es buena y que lo peor quedó atrás. Cuando aparece, llega un tiempo de renovación: las heridas de la etapa anterior empiezan a sanar, vuelve la confianza, se aclara el rumbo. La joven que vierte agua al manantial y a la tierra recuerda el doble movimiento de esta etapa: nutrirte y nutrir, recibir y devolver. Es también la carta de los deseos profundos: los que se sostienen con actos pacientes. Confía: la estrella no se ve de día, pero no por eso deja de estar.',
    significadoAmor:
      'En el amor, Chaska es un cielo que se despeja: después de una etapa confusa o dolorosa, el vínculo —o el corazón— recupera fe. Anuncia reconciliaciones sinceras, comienzos esperanzadores, o la sanación personal que permite volver a querer sin cargar la desconfianza de la historia previa. Si preguntas por una persona, describe un sentimiento limpio y de buena intención: quizá aún no maduro, pero verdadero y sin dobleces; con Chaska rara vez hay engaño. Para corazones heridos es bálsamo directo: sí se puede volver a empezar, y esta vez con más sabiduría. Su única condición es la autenticidad: la estrella guía a quien se muestra tal cual es. Los vínculos que nacen o renacen bajo esta carta prosperan en la medida en que ambos se quiten la armadura.',
    significadoTrabajoDinero:
      'En trabajo y dinero, Chaska renueva el horizonte: después de un periodo duro, aparecen señales de mejora: una puerta que se entreabre, un proyecto que recupera sentido, el ánimo que vuelve y con él las ideas. Favorece las vocaciones: es la carta del trabajo con propósito, y sugiere acercar el oficio a lo que de verdad te inspira, aunque sea de a poco: una tarea, un proyecto paralelo, una formación. En lo económico indica recuperación gradual: las cuentas mejoran con constancia y optimismo realista, no de golpe. Es buen momento para volver a planear a futuro —eso que en la crisis se había suspendido— y para inversiones pacientes en una misma dirección. La estrella premia a quien sigue caminando mientras confía, no a quien solo mira el cielo.',
    significadoEspiritual:
      'En lo espiritual, Chaska es la gracia sencilla: la señal de que no caminas sola, de que hay una luz mayor orientando incluso los tramos oscuros. Invita a renovar la fe —en la vida, en ti, en lo sagrado que te sostenga— y a las prácticas que abren el pecho: agradecer al amanecer, mirar el cielo nocturno, pedir en voz alta lo que de verdad deseas. Enseña también la esperanza como disciplina: no es un humor que llega solo, es una orientación que se elige cada mañana, como el viajero elige seguir la estrella.',
    significadoSombra:
      'En sombra, Chaska se vuelve ilusión sin pies: esperar que el cielo resuelva lo que exige trabajo, idealizar personas o proyectos hasta no ver sus señales claras, prometerse futuros brillantes para no habitar un presente incómodo. Puede señalar esperanzas puestas en quien ya mostró no merecerlas, o el desencanto opuesto: haber perdido la fe hasta el punto de no reconocer las oportunidades reales que ya están brillando. Si sale torcida, revisa: ¿tu esperanza tiene actos que la acompañen, o es una estrella pintada en el techo?',
    consejoPractico:
      'Nombra tu deseo profundo en este asunto —el de verdad, no el prudente— y da esta semana un paso concreto hacia él, aunque sea pequeño. Retoma algo que la etapa difícil te hizo suspender: un plan, un cuidado personal, una ilusión. Y equilibra tus cántaros: dedica tanto a recuperarte tú como a nutrir aquello que esperas ver florecer.',
    preguntasDeReflexion: [
      '¿Cuál es mi deseo verdadero aquí, el que no me atrevo a decir en voz alta?',
      '¿Qué suspendí durante la etapa oscura que ya puedo retomar?',
      '¿Mi esperanza tiene pasos concretos o solo cielo?',
    ],
    frases: {
      esencia: 'una esperanza con fundamento que vuelve a orientar el camino',
      sentimiento: 'un afecto limpio y sincero, sin dobleces',
      conducta: 'una apertura confiada, que se muestra sin armadura',
      oculto: 'un deseo profundo que todavía no se dice en voz alta',
      obstaculo: 'una ilusión sin actos que la sostengan',
      accion: 'renovar la fe y dar un paso paciente hacia el deseo verdadero',
      desenlace: 'una renovación que sana lo herido y despeja el rumbo',
      sombra: 'una idealización que no quiere ver las señales claras',
    },
  },
  18: {
    correspondenciaArcano: 'La Luna',
    palabrasClave: [
      'transformación profunda',
      'poder invisible',
      'ciclos que retornan',
      'intensidad',
      'misterio',
      'energía kundalini',
    ],
    simbolosAndinos: ['Amaru', 'serpiente sagrada', 'lago nocturno', 'escamas de turquesa', 'luna creciente'],
    ejes: ['transformacion', 'sombra', 'movimiento'],
    polaridad: -1,
    significadoGeneral:
      'Amaru es la serpiente sagrada que emerge del lago y asciende hacia el cielo: la energía que conecta el mundo de abajo con el de arriba, lo inconsciente con lo visible. Como La Luna del tarot, habla de fuerzas poderosas que operan fuera de la vista: emociones profundas, instintos, memorias antiguas, ciclos que retornan. Cuando aparece, la situación tiene más capas de las que se ven: hay corrientes subterráneas moviendo los hechos, y la razón sola no alcanza para leerlas. No es carta de engaño necesariamente: es carta de misterio y transformación honda, de esas que mudan la piel entera. Pide avanzar con los sentidos abiertos y sin certezas rígidas: en la noche de Amaru, las cosas no son lo que parecen: son más de lo que parecen.',
    significadoAmor:
      'En el amor, Amaru describe vínculos de intensidad poco común: atracciones magnéticas difíciles de explicar y de controlar, relaciones que remueven capas profundas —heridas viejas, deseos desconocidos, celos que sorprenden a quien los siente—, historias que retornan cíclicamente como la serpiente que se muerde la cola. Es una energía transformadora: estos vínculos cambian a las personas, para bien cuando la intensidad se conduce con verdad, para mal cuando se vuelve adicción emocional. También señala percepciones confusas: en este asunto hay algo que no se ve completo, y conviene no jurar sobre versiones nocturnas de los hechos. El consejo es doble: honra la profundidad de lo que sientes, no todo amor es tibio; pero exige claridad progresiva: lo que después de mucho tiempo solo puede vivirse en la penumbra, está eligiendo la penumbra.',
    significadoTrabajoDinero:
      'En trabajo y dinero, Amaru pide leer las corrientes invisibles: movimientos que se cocinan sin anunciarse, alianzas tácitas, información incompleta que circula deformada. No es momento de decisiones basadas en rumores ni de confiar en presentaciones demasiado brillantes: bajo el agua puede haber más serpiente de la que se ve. Favorece en cambio los trabajos de profundidad: investigación, psicología, arte, todo oficio que traduce lo invisible. Puede indicar también un ciclo profesional que retorna: una oportunidad o un problema que ya viviste antes con otra forma, y que esta vez puedes resolver mejor si reconoces el patrón. En lo económico, prudencia con lo opaco: si no entiendes exactamente de dónde sale la ganancia, la ganancia probablemente sale de ti.',
    significadoEspiritual:
      'En lo espiritual, Amaru es la energía del despertar profundo: la serpiente que sube desde la raíz mudando todo a su paso. Los Andes la ven como puente entre los tres mundos: baja a lo enterrado, recorre lo presente, asciende a lo sagrado. Invita a trabajar con los sueños, los símbolos y el cuerpo: ahí habla lo que la mente censura. También enseña el arte de mudar la piel: soltar identidades enteras cuando quedan chicas, sin disculparse por crecer. Es intensidad sagrada: da respeto, no miedo: la serpiente solo muerde a quien la pisa por no mirarla.',
    significadoSombra:
      'En sombra, Amaru se vuelve confusión y repetición compulsiva: no distinguir intuición de paranoia, vivir enredada en dramas cíclicos que cambian de rostro pero no de guion, dejarse hipnotizar por intensidades que drenan. Puede señalar autoengaño persistente —ver solo lo que se quiere ver— o influencias difíciles de controlar: dinámicas, personas o hábitos cuya fuerza sobre ti no reconoces del todo. Si sale torcida, busca tierra firme: hechos verificables, personas lúcidas, descanso. A la serpiente no se le gana en su terreno nocturno: se la espera a la luz.',
    consejoPractico:
      'No tomes decisiones definitivas con información incompleta: anota lo que sabes de hecho y lo que solo intuyes o temes, en columnas separadas, y busca esta semana un dato que falte. Registra tus sueños y estados de ánimo unos días: hay un patrón queriendo mostrarse. Y si reconoces un ciclo que se repite en tu vida, escríbelo con nombre propio: el patrón nombrado pierde la mitad de su poder.',
    preguntasDeReflexion: [
      '¿Qué parte de esta situación intuyo pero no puedo probar todavía?',
      '¿Qué ciclo se me repite aquí con distinto rostro y mismo guion?',
      '¿Esta intensidad me transforma o solo me consume?',
    ],
    frases: {
      esencia: 'una fuerza profunda que se mueve bajo la superficie',
      sentimiento: 'una atracción intensa y magnética, difícil de explicar',
      conducta: 'un comportamiento cambiante, con capas que no se muestran enteras',
      oculto: 'una corriente subterránea que mueve los hechos sin anunciarse',
      obstaculo: 'un ciclo que retorna una y otra vez con distinto rostro',
      accion: 'separar los hechos de los temores antes de decidir',
      desenlace: 'una transformación honda que exige mudar la piel',
      sombra: 'una confusión que no distingue intuición de miedo',
    },
  },
  19: {
    correspondenciaArcano: 'El Sol',
    palabrasClave: [
      'claridad',
      'éxito',
      'vitalidad',
      'alegría',
      'verdad visible',
      'plenitud',
    ],
    simbolosAndinos: ['Inti', 'sol radiante de oro', 'fiesta del pueblo', 'maizales dorados', 'mediodía andino'],
    ejes: ['luz', 'cielo'],
    polaridad: 2,
    significadoGeneral:
      'Inti es el sol en su mediodía: la plaza llena, los maizales dorados, la vida celebrándose a cielo abierto. Como El Sol del tarot, es la carta más luminosa del mazo: éxito, claridad, vitalidad, verdad que ya no necesita esconderse. Cuando aparece, el asunto que consultas entra en su mejor hora: lo confuso se aclara, lo trabajado florece, lo escondido sale a la luz para bien. Anuncia logros visibles y merecidos, reconocimiento, salud que mejora, alegría sencilla y sin trampa. Su única exigencia es recibirla: hay quien tiene el sol encima y sigue mirando el suelo por costumbre de invierno. La carta invita a celebrar sin culpa, a mostrarse sin miedo y a compartir el calor: el sol que se comparte no se gasta: se multiplica.',
    significadoAmor:
      'En el amor, Inti es de las mejores cartas posibles: afecto verdadero y correspondido que puede mostrarse a plena luz: sin secretos, sin medias tintas, sin personajes. Anuncia etapas de armonía y disfrute: reconciliaciones que prosperan, relaciones que se formalizan con alegría, encuentros donde ambos pueden ser exactamente quienes son. Si preguntas por los sentimientos de alguien, la respuesta es cálida: hay cariño genuino y buena intención, y lo más probable es que se note o se note pronto: Inti no sabe esconderse. Para vínculos dañados, sugiere que la verdad completa —dicha con calidez— es el camino de la sanación: los amores de esta carta se riegan con transparencia. Disfruten, celebren y no busquen nubes por costumbre: a veces el sol es simplemente el sol.',
    significadoTrabajoDinero:
      'En trabajo y dinero, Inti anuncia la cosecha visible: proyectos que triunfan, reconocimientos que llegan, entrevistas y presentaciones que salen bien, cuentas que por fin dan respiro. Es momento de mostrarse: presentar el trabajo, pedir el aumento, lanzar lo que estaba listo esperando clima: el escenario favorece a quien se pone bajo la luz. Favorece los oficios de cara al público y los liderazgos cálidos que hacen crecer a otros. En lo económico indica bonanza y también su prueba: administrar la abundancia con la misma cabeza que se administró la escasez: disfrutar sí, derrochar no, y guardar grano para el invierno que siempre vuelve. Comparte parte del éxito con quienes ayudaron: esa gratitud es semilla del éxito siguiente.',
    significadoEspiritual:
      'En lo espiritual, Inti enseña la devoción de la alegría: agradecer no solo en la necesidad sino en la plenitud, celebrar como forma de rezo. Los Andes lo honran como padre dador de vida: su fiesta mayor se hace en el solsticio, cuando parece más débil, para llamarlo de vuelta: ahí hay una enseñanza honda: se le canta al sol también en la noche más larga. Invita a vivir a cielo abierto: que tu fe, tu gratitud y tu verdad se vean; la luz que se esconde bajo el poncho no calienta a nadie, ni siquiera a quien la esconde.',
    significadoSombra:
      'En sombra, Inti se vuelve deslumbramiento: éxito que se sube a la cabeza, necesidad de brillar que opaca a los demás, optimismo forzado que niega los problemas reales hasta que crecen en la sombra. Puede señalar vanidad que confunde ser vista con ser querida, o exceso de exposición: contar todo a todos, incluso a quienes no cuidan lo que reciben. También el reverso: quien no tolera su propia luz y la sabotea apenas asoma. Si sale torcida, pregunta: ¿estoy compartiendo mi sol o exigiendo que orbiten alrededor?',
    consejoPractico:
      'Ponte bajo la luz esta semana: muestra tu trabajo, di lo que sientes, celebra lo logrado con las personas que ayudaron a lograrlo. Haz una lista de tres cosas que ya están bien en este asunto y dilas en voz alta antes de volver a los problemas. Y guarda un poco de la cosecha: la mejor manera de honrar la abundancia es que alcance también para mañana.',
    preguntasDeReflexion: [
      '¿Qué logro reciente todavía no me he permitido celebrar?',
      '¿Dónde estoy escondiendo mi luz por miedo a incomodar?',
      '¿Con quién debería compartir esta buena etapa?',
    ],
    frases: {
      esencia: 'una claridad plena donde lo verdadero florece a la vista',
      sentimiento: 'un cariño genuino y alegre que no necesita esconderse',
      conducta: 'una calidez abierta, que se muestra tal cual es',
      oculto: 'una verdad luminosa a punto de salir a la luz para bien',
      obstaculo: 'un exceso de confianza que no quiere ver los problemas',
      accion: 'mostrarse a plena luz y celebrar lo que ya funciona',
      desenlace: 'un éxito visible y merecido que trae alegría sencilla',
      sombra: 'un brillo vanidoso que opaca en lugar de calentar',
    },
  },
  20: {
    correspondenciaArcano: 'El Juicio',
    palabrasClave: [
      'llamado',
      'renacimiento',
      'perspectiva',
      'despertar',
      'balance vital',
      'segunda oportunidad',
    ],
    simbolosAndinos: ['Kuntur', 'cóndor de alas extendidas', 'persona con brazos abiertos', 'cumbres nevadas', 'amanecer de altura'],
    ejes: ['cielo', 'movimiento', 'luz'],
    polaridad: 1,
    significadoGeneral:
      'Kuntur es el cóndor que cruza el cielo mientras abajo alguien abre los brazos para recibir su sombra: el mensajero entre los mundos que llama a mirar la vida desde arriba. Como El Juicio del tarot, anuncia un despertar: un llamado interior que ya no se puede postergar, un balance vital que pide hacerse, una segunda oportunidad que se ofrece a quien esté dispuesta a levantarse renovada. Cuando aparece, la situación exige perspectiva de altura: dejar el detalle diario y preguntarse qué está pidiendo esta etapa de tu vida en su conjunto. Suele marcar cierres de ciclo con examen incluido: qué se hizo, qué se aprendió, qué se perdona —a otros y a una misma— antes de volar más liviana. El llamado del cóndor no se repite eternamente: cuando pase su sombra, responde.',
    significadoAmor:
      'En el amor, Kuntur trae llamados y renaceres: la relación que puede levantarse renovada si ambos hacen balance honesto de lo vivido, el reencuentro con alguien del pasado que regresa con otra madurez, o el despertar personal que cambia lo que estás dispuesta a aceptar en un vínculo. Es carta de perdones grandes: los que no borran lo ocurrido pero le quitan el peso de encima, permitiendo decidir con libertad si se sigue juntos o no. Si preguntas por una persona, sugiere que está en revisión interior: evaluando el vínculo y su propia vida, y que su próxima decisión será más definitiva que las anteriores. El consejo: eleva la mirada; no preguntes solo qué pasó la semana pasada sino qué historia quieren escribir de aquí en adelante, y si ese llamado los convoca a los dos.',
    significadoTrabajoDinero:
      'En trabajo y dinero, Kuntur marca la hora del balance y la vocación: evaluar con honestidad de altura qué te ha dado y qué te ha costado el camino actual, y escuchar el llamado que llevas tiempo postergando: ese cambio de rumbo, ese proyecto propio, esa formación que te renovaría. Favorece las segundas oportunidades profesionales: retomar carreras abandonadas, reactivar contactos antiguos, presentarse de nuevo donde antes no se pudo. En lo económico invita a la revisión general: qué deudas cerrar, qué inversiones ya no responden a quien eres hoy, qué gastos pertenecen a una vida que ya no vives. Las decisiones de esta carta no son ajustes menores: son realineamientos: que el trabajo y el dinero vuelvan a servir a tu vida, y no al revés.',
    significadoEspiritual:
      'En lo espiritual, Kuntur es el mensajero del Hanan Pacha: el mundo de arriba que de tanto en tanto nos llama por el nombre. Habla del despertar que llega como convocatoria: una sensación inconfundible de que la vida pide más verdad, más propósito, más altura. Invita a los balances sagrados: mirar la propia historia como la mira el cóndor: entera, sin negar los valles ni las cumbres, con compasión y sin excusas. Y enseña el desapego de las alturas: desde arriba se ve qué cargas eran necesarias y cuáles solo eran costumbre: suelta las segundas antes de emprender el vuelo que viene.',
    significadoSombra:
      'En sombra, Kuntur se vuelve juicio implacable o llamado desoído: el balance convertido en tribunal contra una misma —o contra otros—, culpas viejas que no se dejan perdonar, o la sordera voluntaria: saber perfectamente qué pide la vida y taparlo con ruido y ocupaciones. Puede señalar segundas oportunidades desperdiciadas por orgullo, o vuelos emprendidos sin balance: cambiar de vida sin aprender nada de la anterior, con lo que la nueva repite a la vieja. Si sale torcida, pregunta qué llamado llevas silenciando y qué perdón —dado o recibido— desbloquearía tu vuelo.',
    consejoPractico:
      'Hazte esta semana un balance por escrito: qué te dio esta etapa, qué te costó, qué aprendiste y qué ya no llevarás contigo. Responde al llamado que llevas postergando con un primer acto concreto: una llamada, una inscripción, una conversación decisiva. Y suelta un juicio viejo: perdona una cuenta pendiente —tuya o ajena— que ya solo pesa.',
    preguntasDeReflexion: [
      '¿Qué llamado llevo tiempo escuchando y tapando con ocupaciones?',
      '¿Qué perdón —hacia mí o hacia alguien— liberaría este asunto?',
      '¿Si mirara mi situación desde la altura del cóndor, qué vería que de cerca no veo?',
    ],
    frases: {
      esencia: 'un llamado a renacer que ya no acepta postergación',
      sentimiento: 'un afecto en revisión honda, que decide su próxima forma',
      conducta: 'una actitud reflexiva que toma distancia para ver mejor',
      oculto: 'un balance interior que aún no se comunica',
      obstaculo: 'un juicio viejo o una culpa que impiden levantar vuelo',
      accion: 'responder al llamado con un balance honesto y un acto concreto',
      desenlace: 'una segunda oportunidad que renueva todo el paisaje',
      sombra: 'una autocrítica implacable que juzga en lugar de liberar',
    },
  },
  21: {
    correspondenciaArcano: 'El Mundo',
    palabrasClave: [
      'plenitud',
      'integración',
      'culminación',
      'armonía',
      'totalidad',
      'ciclo cumplido',
    ],
    simbolosAndinos: ['chakana', 'cruz andina de oro y turquesa', 'cóndor, puma y serpiente reunidos', 'tres mundos en equilibrio', 'estrellas en círculo'],
    ejes: ['luz', 'vinculo', 'cielo', 'tierra'],
    polaridad: 2,
    significadoGeneral:
      'Chakana es la cruz andina en el centro del cielo, con el cóndor, el puma y la serpiente reunidos a su alrededor: los tres mundos en equilibrio, el mapa completo del cosmos en un solo símbolo. Como El Mundo del tarot, es la carta de la culminación: un ciclo se cierra con éxito, las piezas dispersas encajan, el esfuerzo largo encuentra su forma final. Cuando aparece, anuncia logro integral: no un triunfo parcial sino la sensación honda de que las cosas están donde deben estar. También habla de integración: reunir las partes de ti que andaban separadas: la que piensa, la que siente, la que hace: y vivir de una sola pieza. Es cierre y es puente: todo ciclo cumplido es la puerta ceremonial del siguiente. Celebra, agradece, y cruza.',
    significadoAmor:
      'En el amor, Chakana señala vínculos que alcanzan su plenitud: relaciones que culminan etapas importantes —compromisos, reencuentros definitivos, proyectos de vida que por fin se concretan— y parejas que logran la integración difícil: ser dos mundos completos que se eligen, no dos mitades que se necesitan. Si preguntas por sentimientos, indica un amor maduro y entero: la persona sabe lo que siente y lo que quiere, y el vínculo tiene condiciones de armonía duraderas. Para quienes buscan pareja, sugiere que la plenitud personal es el imán verdadero: el amor de esta carta llega cuando la vida propia ya está en orden y el otro es celebración, no rescate. Si el vínculo cierra un ciclo doloroso, la carta bendice el cierre: terminaste completa, no rota: eso también es plenitud.',
    significadoTrabajoDinero:
      'En trabajo y dinero, Chakana es la meta alcanzada: proyectos que se completan con reconocimiento, etapas profesionales que culminan en su punto más alto, negocios que alcanzan su forma madura y estable. Favorece los cierres excelentes: terminar lo que está al noventa por ciento, entregar con calidad total, cobrar lo pendiente, dejar cada asunto redondo: ese acabado impecable es tu mejor carta de presentación para el ciclo siguiente. También sugiere integración profesional: unir talentos que tenías separados en una sola propuesta más completa. En lo económico indica consolidación: patrimonio que se ordena, deudas que se cierran, metas de ahorro que se cumplen. Antes de lanzarte al próximo objetivo, detente a celebrar y documentar lo aprendido: los ciclos honrados heredan su fuerza al siguiente.',
    significadoEspiritual:
      'En lo espiritual, Chakana es el símbolo mayor: el puente entre los tres mundos, el orden del cosmos reflejado en el orden interior. Habla de integración sagrada: honrar por igual la raíz (lo vivido y lo heredado), el presente (el cuerpo, el trabajo, los vínculos) y la altura (el propósito y lo divino), sin amputar ninguno de los tres. Invita a reconocer que tu vida es un tejido completo donde cada hilo tuvo función, incluso los oscuros. Y recuerda la ley de los ciclos: la plenitud no es final: es el centro de la cruz: el punto quieto desde donde comienza, en paz, la siguiente vuelta.',
    significadoSombra:
      'En sombra, Chakana se vuelve cierre postergado o plenitud congelada: el proyecto eternamente al noventa por ciento porque terminar da vértigo, la nostalgia del ciclo cumplido que impide entrar al nuevo, o el perfeccionismo que nunca declara nada completo. Puede señalar también integraciones pendientes: vivir en compartimentos —una persona en el trabajo, otra en casa, otra por dentro— con el cansancio que cuesta sostener esa fragmentación. Si sale torcida, pregunta qué te falta de verdad para cerrar este ciclo: casi siempre es menos de lo que crees, y casi nunca es lo que estás esperando.',
    consejoPractico:
      'Cierra lo que está casi cerrado: elige el asunto que llevas tiempo al noventa por ciento y termínalo esta semana, con acabado impecable. Haz después dos gestos de ciclo: uno de celebración —reconoce lo logrado con alguien querido— y uno de puente —define cuál es la primera piedra de la etapa siguiente—. Y revisa tu chakana personal: qué mundo tienes desatendido: la raíz, el presente o la altura: y dale un cuidado concreto.',
    preguntasDeReflexion: [
      '¿Qué me falta realmente para declarar cumplido este ciclo?',
      '¿Qué parte de mi vida vive separada de las demás y qué costaría integrarla?',
      '¿Cómo quiero celebrar y agradecer lo que ya se completó?',
    ],
    frases: {
      esencia: 'una culminación donde las piezas por fin encajan',
      sentimiento: 'un amor maduro y entero, que sabe lo que quiere',
      conducta: 'una presencia integrada y serena, sin personajes',
      oculto: 'una completud ya alcanzada que aún no se reconoce',
      obstaculo: 'un cierre postergado que retiene todo lo demás',
      accion: 'terminar de forma impecable y celebrar antes de empezar lo nuevo',
      desenlace: 'un ciclo que se cumple con plenitud y abre la puerta al siguiente',
      sombra: 'un perfeccionismo que nunca declara nada completo',
    },
  },
}
