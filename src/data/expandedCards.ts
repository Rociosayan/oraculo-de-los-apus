import type { AndeanCard, SymbolAxis } from '../types'

type Seed = [string, string, string, string, string, string]

/** Cincuenta cartas originales del oráculo, en cinco caminos de diez cartas.
 * Son interpretaciones editoriales del proyecto, no atribuciones a una tradición única.
 */
const CAMINOS: { name: string; axis: SymbolAxis; motif: AndeanCard['motif']; cards: Seed[] }[] = [
  { name: 'Tierra', axis: 'tierra', motif: 'pachamama', cards: [
    ['La Semilla', 'Semilla', 'una posibilidad pequeña que necesita cuidado', 'Comienza algo fértil, aunque todavía no se vea el resultado. Protege el inicio y dale tiempo antes de juzgarlo.', 'La impaciencia puede arrancar lo que apenas está echando raíz.', 'Cuida una acción pequeña durante siete días antes de cambiar de rumbo.'],
    ['El Surco', 'Campo preparado', 'preparación antes de actuar', 'El terreno se abre cuando ordenas lo necesario. Preparar bien hoy evitará trabajo inútil mañana.', 'Planificar sin sembrar también puede ser una forma de postergar.', 'Define los recursos y da una fecha concreta al primer paso.'],
    ['La Papa', 'Alimento de altura', 'sustento sencillo y suficiente', 'Lo valioso puede ser cotidiano. Atiende comida, descanso y recursos antes de perseguir algo vistoso.', 'Despreciar lo sencillo te aleja de lo que realmente te sostiene.', 'Revisa qué necesidad básica has dejado sin atender.'],
    ['La Terraza', 'Andén', 'progreso construido por etapas', 'Un objetivo grande se vuelve posible si lo divides en escalones. Cada tramo sostiene al siguiente.', 'Querer saltar niveles amenaza una base todavía frágil.', 'Divide tu objetivo en tres etapas comprobables.'],
    ['El Barro', 'Arcilla', 'una forma que aún puede cambiar', 'Todavía puedes modelar la situación. Escucha la resistencia del material antes de fijar una decisión.', 'Cambiar de forma sin fin impide terminar una obra.', 'Haz un borrador y decide qué parte debe quedar firme.'],
    ['La Piedra', 'Roca', 'un límite que protege y exige respeto', 'Hay algo sólido con lo que contar. También conviene reconocer lo que no se moverá por insistencia.', 'La firmeza se convierte en obstinación si deja de escuchar.', 'Distingue un límite real de una costumbre que sí puedes revisar.'],
    ['El Maíz', 'Choclo', 'fruto compartido de un trabajo paciente', 'Una cosecha llega por constancia y colaboración. Mira quién ayudó a hacerla posible.', 'Apropiarte de todo el mérito debilita la siguiente siembra.', 'Agradece una ayuda concreta y comparte un resultado.'],
    ['El Telar', 'Trama', 'patrones creados por decisiones repetidas', 'Lo que haces cada día está tejiendo un resultado. Observa el patrón, no solo el hilo de hoy.', 'Repetir un gesto dañino también construye una trama.', 'Cambia una rutina pequeña que se repite sin servirte.'],
    ['La Casa', 'Hogar', 'refugio y pertenencia', 'Necesitas un espacio donde bajar la guardia. Fortalecer la base permite salir con más confianza.', 'El refugio puede volverse encierro si temes toda salida.', 'Haz una mejora concreta en tu espacio o en tu red de apoyo.'],
    ['La Cosecha', 'Recolección', 'resultado maduro y cierre de esfuerzo', 'Es momento de recibir lo trabajado y separar lo útil de lo que ya terminó.', 'Seguir sembrando sin recoger agota tus recursos.', 'Reconoce un resultado y decide qué guardar para el próximo ciclo.'],
  ] },
  { name: 'Agua', axis: 'vinculo', motif: 'qocha', cards: [
    ['El Manantial', 'Nacimiento de agua', 'emoción nueva y genuina', 'Algo empieza a sentirse con claridad. Dale un cauce sin exigir que sea profundo desde el primer día.', 'Idealizar una emoción inicial puede crear promesas prematuras.', 'Nombra lo que sientes sin convertirlo todavía en una certeza.'],
    ['El Arroyo', 'Corriente pequeña', 'comunicación que empieza a fluir', 'Una conversación sencilla puede destrabar más que una gran declaración. Deja espacio para responder.', 'Hablar sin escuchar hace ruido, pero no abre camino.', 'Haz una pregunta honesta y escucha la respuesta completa.'],
    ['El Río', 'Corriente', 'cambio que ya está en marcha', 'La situación se mueve aunque intentes retenerla. Adaptarte al cauce ayuda a elegir mejor.', 'Dejarte llevar sin decidir también tiene consecuencias.', 'Identifica qué puedes orientar y qué necesitas aceptar.'],
    ['La Laguna', 'Qocha', 'pausa emocional y mirada interior', 'En la quietud aparecen detalles que el apuro ocultaba. Tómate tiempo para reconocer tu emoción real.', 'Quedarte inmóvil por miedo puede parecer serenidad.', 'Escribe lo que sientes antes de pedir una respuesta externa.'],
    ['La Lluvia', 'Agua del cielo', 'alivio después de una sequía', 'Llega una oportunidad de renovar lo que estaba seco. Recíbela con gratitud y medida.', 'Esperar que una sola lluvia resuelva todo puede decepcionarte.', 'Aprovecha el alivio para reparar una necesidad concreta.'],
    ['La Niebla', 'Velo', 'información emocional incompleta', 'No ves todavía el paisaje entero. Avanza despacio y comprueba lo que crees saber.', 'La sospecha puede llenar con miedo los espacios vacíos.', 'Pide un dato verificable antes de sacar conclusiones.'],
    ['El Puente', 'Paso sobre el agua', 'acercamiento entre dos orillas', 'Existe una posibilidad de encuentro si ambas partes caminan. El vínculo necesita reciprocidad.', 'Construir tú sola el puente puede agotarte.', 'Propón un acercamiento concreto y observa si hay respuesta.'],
    ['La Orilla', 'Borde del agua', 'distancia saludable y perspectiva', 'Un paso atrás puede ayudarte a mirar la relación completa sin perderte dentro de ella.', 'Alejarte para castigar bloquea una conversación necesaria.', 'Aclara cuánto espacio necesitas y por cuánto tiempo.'],
    ['El Remolino', 'Giro del agua', 'emoción intensa que altera el juicio', 'Hay una reacción fuerte en juego. Atiéndela antes de tomar una decisión irreversible.', 'Confundir intensidad con profundidad mantiene el mismo círculo.', 'Espera a que baje la emoción y revisa los hechos.'],
    ['El Deshielo', 'Agua liberada', 'apertura después de una etapa cerrada', 'Algo rígido comienza a ablandarse. Hay margen para hablar o volver a sentir de otra manera.', 'Abrirse demasiado rápido puede pasar por alto un límite importante.', 'Da una señal amable sin renunciar a lo que necesitas.'],
  ] },
  { name: 'Fuego', axis: 'transformacion', motif: 'inti', cards: [
    ['La Chispa', 'Inicio del fuego', 'deseo que pide una primera acción', 'Una idea enciende tu energía. Dale una prueba pequeña antes de apostar todos tus recursos.', 'La emoción de empezar puede apagarse si no encuentra forma.', 'Prueba la idea hoy con un paso de bajo costo.'],
    ['El Fogón', 'Fuego del hogar', 'energía sostenida y compartida', 'Lo que importa necesita combustible regular. La constancia vale más que un impulso espectacular.', 'Cargar tú sola con todo el fuego termina en agotamiento.', 'Distribuye una tarea y reserva tiempo para recuperarte.'],
    ['La Antorcha', 'Luz portátil', 'guía durante una transición', 'Puedes iluminar el siguiente tramo aunque no veas todo el camino. Comparte lo que sabes.', 'Querer guiar a quien no lo pide puede convertirse en control.', 'Ofrece ayuda concreta y deja que la otra persona decida.'],
    ['El Horno', 'Calor de transformación', 'proceso que necesita tiempo y presión', 'Lo que se está formando requiere paciencia. Sacarlo antes de tiempo puede deshacerlo.', 'Soportar calor innecesario no demuestra fortaleza.', 'Evalúa si la presión actual mejora la obra o solo te desgasta.'],
    ['La Brasa', 'Calor que permanece', 'sentimiento o proyecto todavía vivo', 'Aunque parezca apagado, queda energía aprovechable. Acércate con cuidado y comprueba si responde.', 'Avivar una brasa por nostalgia puede reabrir un daño.', 'Pregunta qué ha cambiado antes de volver a invertir energía.'],
    ['El Rayo', 'Illapa', 'revelación súbita que exige respuesta', 'Una noticia puede ordenar de golpe lo que estaba confuso. Respira antes de actuar sobre ella.', 'La urgencia puede hacerte tomar una señal por sentencia.', 'Verifica la noticia y elige una sola acción inmediata.'],
    ['La Hoguera', 'Fuego colectivo', 'celebración y fuerza de grupo', 'La energía compartida amplifica lo que cada persona aporta. Es buen momento para reunirse.', 'La presión del grupo puede tapar tu propia voz.', 'Participa sin dejar de nombrar tu límite.'],
    ['La Ceniza', 'Resto del fuego', 'aprendizaje después de una pérdida', 'Algo terminó y dejó una enseñanza. Puedes usarla sin tener que revivir el incendio.', 'Quedarte mirando lo perdido impide preparar tierra nueva.', 'Escribe qué aprendiste y qué no quieres repetir.'],
    ['El Alba', 'Primera luz', 'claridad después de la noche', 'Una etapa difícil empieza a mostrar salida. Avanza con gratitud, sin exigir certeza total.', 'Declarar victoria demasiado pronto puede ocultar trabajo pendiente.', 'Reconoce una mejora comprobable y mantén el siguiente paso.'],
    ['El Sol Alto', 'Inti en lo alto', 'visibilidad y responsabilidad', 'Tu trabajo puede hacerse visible. Recibe el reconocimiento y asume lo que esa luz revela.', 'Buscar aprobación constante quema la alegría del logro.', 'Muestra un resultado concreto y deja que hable por sí mismo.'],
  ] },
  { name: 'Aire', axis: 'cielo', motif: 'kuntur', cards: [
    ['El Aliento', 'Respiración', 'pausa para recuperar perspectiva', 'Una respiración antes de responder puede cambiar el rumbo de la conversación.', 'Confundir calma con evasión prolonga el problema.', 'Haz una pausa breve y vuelve con una respuesta concreta.'],
    ['La Voz', 'Palabra', 'verdad que necesita decirse', 'Una frase clara puede abrir el camino. Habla desde lo que sabes y sientes.', 'La franqueza sin cuidado puede herir sin aclarar.', 'Di lo esencial sin adornos ni acusaciones.'],
    ['El Eco', 'Respuesta de la montaña', 'consecuencias de palabras pasadas', 'Lo que dijiste vuelve con otro sentido. Escucha la respuesta antes de repetir tu versión.', 'Tomar todo eco como ataque impide entender el mensaje.', 'Pregunta cómo recibió la otra persona tus palabras.'],
    ['El Viento', 'Wayra', 'cambio de dirección', 'Una circunstancia nueva modifica el plan. La flexibilidad te permite aprovecharla.', 'Cambiar por cada corriente impide sostener una decisión.', 'Ajusta el plan sin soltar su propósito principal.'],
    ['La Pluma', 'Señal ligera', 'detalle sutil que merece atención', 'Una señal pequeña puede orientar, pero necesita contraste con hechos.', 'Buscar señales en todo puede sustituir una decisión propia.', 'Anota la intuición y verifica una evidencia externa.'],
    ['El Horizonte', 'Vista lejana', 'visión de largo plazo', 'Levanta la mirada de la urgencia. Una decisión mejora cuando incluye el futuro.', 'Soñar a lo lejos puede distraerte del paso de hoy.', 'Relaciona tu meta de un año con una acción de esta semana.'],
    ['La Cumbre', 'Punto alto', 'perspectiva ganada con esfuerzo', 'Has llegado a un lugar desde donde ves mejor. Usa esa vista para decidir con humildad.', 'Creerte por encima de otros te deja sin compañía.', 'Comparte lo aprendido sin imponerlo.'],
    ['El Vuelo', 'Cóndor en movimiento', 'libertad con dirección', 'Hay espacio para explorar otra opción. La libertad sirve cuando sabes hacia dónde vuelas.', 'Escapar de un compromiso no es siempre elegir libertad.', 'Nombra qué buscas y qué responsabilidad llevarás contigo.'],
    ['La Estrella', 'Chaska', 'orientación en la incertidumbre', 'Una referencia estable ayuda a cruzar una etapa oscura. Sostén lo que te guía.', 'Idealizar una meta lejana puede hacerte ignorar el terreno.', 'Elige un principio que pueda orientar una decisión actual.'],
    ['El Silencio', 'Escucha', 'información que aparece al callar', 'No necesitas llenar todos los espacios con respuestas. Escuchar también es una acción.', 'Callar por temor puede ocultar una necesidad legítima.', 'Escucha primero y después expresa una necesidad clara.'],
  ] },
  { name: 'Comunidad', axis: 'vinculo', motif: 'ayni', cards: [
    ['El Encuentro', 'Reunión', 'posibilidad de reconocer al otro', 'Una conversación puede cambiar una idea previa. Ve con curiosidad y límites claros.', 'Buscar aprobación puede hacerte ocultar quién eres.', 'Pregunta algo real y comparte también tu punto de vista.'],
    ['La Mano', 'Ayuda', 'apoyo concreto ofrecido o recibido', 'No tienes que resolver todo sin compañía. Una ayuda precisa puede aliviar mucho.', 'Ofrecer ayuda que nadie pidió puede invadir.', 'Pide u ofrece una tarea específica, con consentimiento.'],
    ['El Ayni', 'Reciprocidad', 'intercambio justo en el tiempo', 'Revisa qué das y qué recibes. Una relación sana permite turnarse.', 'Llevar una cuenta rígida de cada gesto rompe la confianza.', 'Habla de un desequilibrio sin convertirlo en deuda moral.'],
    ['La Minga', 'Trabajo conjunto', 'objetivo común que pide coordinación', 'Varias manos pueden lograr lo que una sola no alcanza. Acordad responsabilidades.', 'Un grupo sin acuerdos deja la carga en pocas personas.', 'Define quién hará qué y cuándo se revisará.'],
    ['El Consejo', 'Escucha de experiencia', 'sabiduría que llega de otras voces', 'Una persona con experiencia puede mostrar un ángulo que falta. Escucha y decide por ti.', 'Entregar tu criterio a otra persona te quita responsabilidad.', 'Consulta a alguien fiable y contrasta su consejo con tus datos.'],
    ['La Promesa', 'Palabra empeñada', 'compromiso que se demuestra con actos', 'Las palabras importan cuando tienen fecha y seguimiento. Revisa lo que has ofrecido.', 'Prometer para evitar conflicto crea uno mayor después.', 'Cumple un compromiso pendiente o renegócialo con claridad.'],
    ['La Fiesta', 'Celebración', 'alegría compartida y reconocimiento', 'Hay un logro que merece compañía. Celebrarlo también fortalece el vínculo.', 'Usar la fiesta para tapar un problema lo deja intacto.', 'Celebra algo real e incluye a quienes contribuyeron.'],
    ['La Despedida', 'Cierre de una relación o etapa', 'final que necesita respeto', 'Soltar puede ser un acto cuidadoso. Agradece lo vivido sin negar el motivo del cierre.', 'Alargar la despedida por culpa impide sanar.', 'Di lo necesario con honestidad y deja un límite claro.'],
    ['La Herencia', 'Memoria recibida', 'recurso o patrón transmitido', 'Has recibido saberes y costumbres. Puedes conservar lo útil y revisar lo que pesa.', 'Repetir una costumbre solo por lealtad puede dañarte.', 'Nombra una enseñanza que guardarás y otra que cambiarás.'],
    ['La Ronda', 'Círculo', 'pertenencia con voz propia', 'Tu lugar en el grupo importa. Participa sin desaparecer dentro de las expectativas ajenas.', 'Quedarte fuera por anticipar rechazo puede aislarte.', 'Da un paso de participación y observa la respuesta real.'],
  ] },
]

export const EXPANDED_CARDS: AndeanCard[] = CAMINOS.flatMap((camino, group) =>
  camino.cards.map(([name, symbol, essence, meaning, reversedMeaning, advice], index) => {
    const id = 22 + group * 10 + index
    const keywords = [camino.name.toLowerCase(), ...essence.split(' ').filter((word) => word.length > 5).slice(0, 4)]
    const andeanMessage = `${symbol} representa aquí ${essence}. Esta es una lectura simbólica propia del Oráculo de los Apus.`
    return {
      id, name, symbol, arcanaRef: `Camino de ${camino.name}`, motif: camino.motif,
      keywords, essence, essenceReversed: reversedMeaning, meaning, reversedMeaning, andeanMessage, advice,
      correspondenciaArcano: `Camino de ${camino.name}`, palabrasClave: keywords,
      simbolosAndinos: [symbol, camino.name, 'paisaje andino'], ejes: [camino.axis], polaridad: 0,
      significadoGeneral: `${name}: ${meaning} ${andeanMessage}`,
      significadoAmor: `En los vínculos, ${essence}. ${meaning} Pregunta cómo se expresa esto entre ambas personas antes de atribuir intenciones.`,
      significadoTrabajoDinero: `En trabajo y recursos, ${essence}. ${meaning} Contrasta la lectura con acuerdos, plazos y datos concretos.`,
      significadoEspiritual: `Como símbolo de reflexión, ${name.toLowerCase()} invita a observar ${essence}. ${andeanMessage}`,
      significadoSombra: `${reversedMeaning} Esta posibilidad describe un riesgo para revisar, no un destino fijo.`,
      consejoPractico: advice,
      preguntasDeReflexion: [`¿Dónde aparece ${essence} en mi situación?`, '¿Qué hecho confirma o contradice esta lectura?', '¿Cuál es el siguiente paso que depende de mí?'],
      frases: {
        esencia: essence,
        sentimiento: `una emoción vinculada con ${essence}`,
        conducta: `una conducta que muestra ${essence}`,
        oculto: `un aspecto no dicho de ${essence}`,
        obstaculo: `una dificultad cuando ${reversedMeaning.toLowerCase()}`,
        accion: advice.toLowerCase(),
        desenlace: `una tendencia hacia ${essence}`,
        sombra: reversedMeaning.toLowerCase(),
      },
    }
  }),
)
