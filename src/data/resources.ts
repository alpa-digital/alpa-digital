export interface ResourceSection {
  heading: string;
  paragraphs: string[];
  items?: string[];
}

export interface Resource {
  slug: string;
  title: string;
  summary: string;
  category: string;
  introduction: string;
  sections: ResourceSection[];
  relatedServices: string[];
  relatedSectors?: string[];
  relatedCases?: string[];
}

/** Contenido editorial. Añade una entrada aquí para incluirla en la web y el sitemap. */
export const resources: Resource[] = [
  {
    slug: "que-procesos-automatizar-primero-pyme",
    title: "Qué procesos automatizar primero en una pyme",
    summary: "Una forma práctica de elegir la primera automatización según frecuencia, tiempo, riesgos y herramientas disponibles.",
    category: "Empezar con IA",
    introduction: "La mejor primera automatización suele ser una tarea repetitiva que el equipo conoce bien y cuyo resultado se puede comprobar. Antes de elegir una herramienta, conviene entender qué ocurre hoy y qué debería cambiar.",
    sections: [
      { heading: "Empieza por el trabajo que se repite", paragraphs: ["Habla con las personas que realizan la tarea y observa un caso de principio a fin. Anota qué la inicia, qué información se recibe, qué pasos se repiten y dónde aparecen esperas o errores.", "Por ejemplo, una empresa puede recibir solicitudes de presupuesto por correo, recopilar datos y trasladarlos a una hoja antes de preparar una respuesta. Cada traspaso es una oportunidad para estudiar si conviene automatizar una parte."], items: ["¿Con qué frecuencia ocurre y cuánto tiempo ocupa?", "¿Qué excepciones necesita resolver una persona?", "¿Qué datos y programas intervienen?", "¿Cómo sabremos si el resultado es correcto?"] },
      { heading: "Compara impacto y dificultad", paragraphs: ["Una tarea frecuente puede ahorrar tiempo, pero también hay que considerar la calidad de los datos, las integraciones y las consecuencias de un error. Una tarea menos frecuente puede merecer prioridad si evita una espera importante o un fallo costoso.", "Como estimación inicial, multiplica el tiempo medio por el número de veces que se realiza. Ese cálculo orienta la conversación; el ahorro real dependerá de qué parte se automatice y de cuánto haya que revisar." ] },
      { heading: "Define una primera prueba acotada", paragraphs: ["Elige una parte del proceso, reúne ejemplos representativos y acuerda qué significa que la prueba funcione. Incluye casos incompletos y excepciones, no solo los fáciles.", "Mantén una revisión humana para decisiones importantes y registra los errores. Si la prueba es útil y el equipo puede utilizarla, decide el siguiente paso con datos propios." ] },
    ],
    relatedServices: ["consultoria-ia-pymes", "automatizacion-ia-pymes"],
    relatedCases: ["seleccion-candidatos-sector-electrico"],
  },
  {
    slug: "cuanto-cuesta-automatizar-proceso-con-ia",
    title: "Cuánto cuesta automatizar un proceso con IA",
    summary: "Los factores que influyen en el presupuesto de una automatización y las preguntas que conviene hacer antes de contratarla.",
    category: "Planificación",
    introduction: "El coste depende del proceso y de lo que se necesita para ponerlo en marcha. Una respuesta automática sencilla y un sistema conectado a varios programas no requieren el mismo trabajo. Por eso conviene comparar alcance, puesta en marcha y costes posteriores antes de comparar precios.",
    sections: [
      { heading: "Qué influye en el presupuesto inicial", paragraphs: ["El trabajo comienza por definir el problema y revisar cómo llega y sale la información. Si los datos están dispersos o existen muchas excepciones, puede hacer falta preparar el proceso antes de automatizarlo."], items: ["Número de pasos, reglas y situaciones excepcionales.", "Herramientas que deben conectarse y acceso disponible a ellas.", "Calidad de los datos y documentos de partida.", "Pruebas, supervisión, permisos y formación necesarios."] },
      { heading: "Separa implantación y costes de funcionamiento", paragraphs: ["Pregunta qué incluye el trabajo inicial: análisis, construcción, conexiones, pruebas, documentación y formación. Pide también que se indiquen el alcance, los plazos y qué ocurre si cambian los requisitos.", "Después puede haber costes de plataformas, modelos de IA, infraestructura o mantenimiento. Algunos dependen del uso, por lo que conviene estimarlos con el volumen esperado y revisarlos cuando exista una medición real." ] },
      { heading: "Cómo valorar si compensa", paragraphs: ["Compara el coste total con el tiempo que podría liberarse, la reducción de esperas y la importancia de los errores evitados. El tiempo estimado no se convierte automáticamente en ahorro económico: depende de si el equipo puede dedicarlo a otras tareas útiles.", "Una prueba limitada permite conocer mejor la viabilidad y los costes antes de ampliar el proyecto. Alpa define el presupuesto concreto tras conocer el proceso y acordar su alcance." ] },
    ],
    relatedServices: ["consultoria-ia-pymes", "automatizacion-ia-pymes"],
  },
  {
    slug: "automatizar-presupuestos-partes-empresas-instaladoras",
    title: "Cómo automatizar presupuestos y partes en empresas instaladoras",
    summary: "Ejemplos y pasos para ordenar solicitudes, preparar presupuestos y registrar partes de trabajo en empresas de instalaciones.",
    category: "Instalaciones",
    introduction: "En una empresa instaladora, la información puede llegar por llamadas, correo, fotografías o mensajes. Cuando después hay que volver a escribirla en un presupuesto o un parte, el equipo dedica tiempo a trasladar datos y comprobar que no falta nada.",
    sections: [
      { heading: "Ordenar la solicitud antes del presupuesto", paragraphs: ["Un primer paso es reunir los datos necesarios: cliente, ubicación, descripción del trabajo, fotografías y cualquier requisito técnico relevante. Si falta algo, el sistema puede señalarlo para que el equipo lo solicite.", "Una automatización puede preparar un borrador con la información recibida. Las mediciones, los materiales, las tarifas y la viabilidad deben comprobarse antes de enviar el presupuesto." ] },
      { heading: "Pasar del trabajo realizado al parte", paragraphs: ["Al terminar una intervención, el equipo puede registrar qué hizo, qué material utilizó y qué queda pendiente. Esa información puede ayudar a preparar el parte y evitar que se copie varias veces.", "Es importante acordar qué campos son obligatorios, cómo se corrigen los errores y quién valida la información antes de usarla para facturación o seguimiento." ] },
      { heading: "Una forma de empezar", paragraphs: ["Selecciona un tipo de trabajo habitual y reúne ejemplos reales de solicitudes, presupuestos y partes. Comprueba qué información ya existe en tus herramientas y cuál necesita aportar una persona.", "Prueba primero con documentos de ejemplo y compara el borrador con el resultado que prepararía el equipo. La solución puede ampliarse cuando el proceso y sus límites estén claros." ] },
    ],
    relatedServices: ["automatizacion-ia-pymes"], relatedSectors: ["instalaciones-electricas"],
  },
  {
    slug: "automatizacion-agente-ia-software-medida-diferencias",
    title: "Automatización, agente de IA y software a medida: diferencias",
    summary: "Qué hace cada solución, cuándo puede resultar útil y por qué a menudo se combinan en un mismo proceso.",
    category: "Conceptos de IA",
    introduction: "Automatización, agentes de IA y software a medida describen piezas diferentes de un sistema. Elegir entre ellas empieza por entender la tarea, la información disponible y las decisiones que deben quedar en manos de una persona.",
    sections: [
      { heading: "Automatización: ejecutar pasos repetidos", paragraphs: ["Una automatización sigue un flujo definido cuando ocurre algo: por ejemplo, recibir un formulario, guardar sus datos y avisar al equipo. Puede funcionar con reglas sin utilizar IA, o incorporar un modelo para tratar texto o documentos.", "Es útil cuando las entradas, los pasos y las excepciones se pueden describir con suficiente claridad." ] },
      { heading: "Agente de IA: interpretar y utilizar información", paragraphs: ["Un agente puede recibir una petición, interpretar su contenido y consultar fuentes o herramientas disponibles para preparar una respuesta o una acción. Sus capacidades dependen del diseño y de los permisos que se le den.", "Puede ser útil para buscar información en documentación o ayudar a gestionar solicitudes variadas. Necesita límites, pruebas y una vía de revisión cuando la respuesta sea incierta o la decisión tenga consecuencias." ] },
      { heading: "Software a medida: una herramienta para trabajar", paragraphs: ["Una aplicación a medida reúne las pantallas, los datos y los flujos que necesita un equipo para realizar su trabajo. Puede incluir automatizaciones y agentes, pero también puede existir sin ellos.", "Tiene sentido estudiar esta opción cuando las herramientas disponibles no cubren una necesidad importante o cuando el equipo necesita una forma propia de organizar el proceso." ] },
      { heading: "Se pueden combinar", paragraphs: ["En un mismo proyecto, una aplicación puede recoger una solicitud, una automatización trasladar los datos y un agente ayudar a consultar documentos. No hace falta implantar todas esas piezas desde el primer día: se pueden introducir por fases según el problema que se quiera resolver." ] },
    ],
    relatedServices: ["automatizacion-ia-pymes", "agentes-ia-empresas", "desarrollo-software-medida-ia"],
    relatedCases: ["consulta-manuales-mantenimiento-ferroviario"],
  },
];

export const resourcePath = (item: Resource) => `/recursos/${item.slug}/`;
export const getResource = (slug: string) => resources.find((item) => item.slug === slug);
