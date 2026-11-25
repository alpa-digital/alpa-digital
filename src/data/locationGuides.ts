/** Contenido editorial para rutas locales prioritarias; no implica proyectos en esa ubicación. */
export const locationGuides: Record<string, { title: string; intro: string; examples: { title: string; text: string }[] }> = {
  sevilla: {
    title: "Por dónde empezar a automatizar en Sevilla",
    intro: "Desde nuestra sede en Utrera trabajamos con empresas de la provincia. El primer paso es conocer cómo se hace el trabajo y decidir junto al equipo qué proceso merece una prueba.",
    examples: [
      { title: "Empresas de instalaciones", text: "Reunir solicitudes y preparar borradores de presupuestos o partes, con revisión del equipo antes de utilizarlos." },
      { title: "Servicios profesionales", text: "Organizar documentación que llega por correo y ayudar a localizar la información necesaria para gestionar cada solicitud." },
      { title: "Agroalimentario", text: "Estudiar cómo se reciben pedidos y documentos de proveedores para reducir los datos que se copian entre herramientas." },
    ],
  },
  malaga: {
    title: "Procesos que una pyme en Málaga puede revisar",
    intro: "Un buen punto de partida es elegir una tarea repetitiva, comprobar con qué herramientas trabaja el equipo y definir qué información necesita revisar una persona.",
    examples: [
      { title: "Turismo y hostelería", text: "Clasificar consultas frecuentes y preparar respuestas para que el equipo revise las que necesitan atención personalizada." },
      { title: "Inmobiliarias", text: "Reunir datos de una consulta y ayudar al seguimiento de contactos, sin perder el historial de la conversación." },
      { title: "Construcción y reformas", text: "Organizar fotografías y notas de una visita para preparar el borrador de un presupuesto que después revise un profesional." },
    ],
  },
  "malaga/nerja": {
    title: "Qué proceso revisar primero en Nerja",
    intro: "Trabajamos con pymes de la provincia de Málaga en remoto y, cuando el proyecto lo requiere, de forma presencial. El alcance se decide según las herramientas y el trabajo de cada equipo.",
    examples: [
      { title: "Consultas y reservas", text: "Reunir preguntas frecuentes y preparar respuestas para que una persona revise los casos que necesiten atención específica." },
      { title: "Presupuestos y visitas", text: "Ordenar los datos recibidos de un cliente y preparar un borrador de presupuesto que el equipo pueda revisar." },
      { title: "Documentos y facturas", text: "Estudiar qué datos se copian entre correo y programas de gestión, y probar una forma de reducir esos pasos." },
    ],
  },
  "malaga/estepona": {
    title: "Una primera automatización para tu empresa en Estepona",
    intro: "El primer proceso se elige con el equipo que lo realiza, teniendo en cuenta la frecuencia, las herramientas disponibles y las consecuencias de un error.",
    examples: [
      { title: "Seguimiento comercial", text: "Organizar solicitudes y preparar recordatorios para que ninguna consulta quede sin revisar." },
      { title: "Documentación", text: "Clasificar la información que llega por correo y localizar los documentos necesarios para cada solicitud." },
      { title: "Trabajo de campo", text: "Reunir notas y fotografías de una visita para preparar un parte o un borrador que valide un profesional." },
    ],
  },
  "alicante/alcoy": {
    title: "Automatización para el trabajo diario en Alcoy",
    intro: "Trabajamos en remoto con empresas de Alcoy y del resto de España. Empezamos por un proceso concreto y revisamos cómo se integra con las herramientas que el equipo ya utiliza.",
    examples: [
      { title: "Consultas y solicitudes", text: "Ordenar mensajes de clientes y preparar la información necesaria para que una persona dé respuesta o haga seguimiento." },
      { title: "Documentación y pedidos", text: "Identificar datos en documentos recibidos y reducir la copia manual entre correo, hojas de cálculo y otras herramientas." },
      { title: "Decisiones con criterio", text: "Comparar frecuencia, tiempo y riesgos de varias tareas antes de elegir cuál probar primero." },
    ],
  },
};
