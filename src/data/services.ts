export interface ServiceFaq {
  question: string;
  answer: string;
}

export interface ServiceDef {
  slug: string;
  name: string;
  /** Nombre corto para menús y enlaces. */
  short: string;
  title: string;
  description: string;
  h1: string;
  intro: string;
  keywords: string[];
  benefits: { title: string; text: string }[];
  deliverables: string[];
  faqs: ServiceFaq[];
}

export const services: ServiceDef[] = [
  {
    slug: "automatizacion-ia-pymes",
    name: "Automatización con IA para pymes",
    short: "Automatización con IA",
    title: "Automatización con IA para pymes | Alpa Digital",
    description: "Automatizamos con inteligencia artificial las tareas repetitivas de tu pyme: atención al cliente, presupuestos, facturas y seguimiento comercial. Presupuesto cerrado desde 1.500 €.",
    h1: "Automatización con IA para pymes",
    intro: "Quitamos de encima a tu equipo el trabajo repetitivo: responder consultas, preparar presupuestos, registrar facturas, hacer seguimiento. Cada automatización conectada a las herramientas que ya usas, con alcance, precio y plazo cerrados antes de empezar.",
    keywords: ["automatización con IA para pymes", "automatizar procesos empresa", "automatización inteligencia artificial pymes"],
    benefits: [
      { title: "Empieza por un proceso", text: "No hace falta cambiar la empresa entera. Elegimos la tarea que más tiempo quita y la automatizamos en dos a seis semanas." },
      { title: "Con tus herramientas", text: "Correo, WhatsApp, Google Workspace o Microsoft 365, tu CRM, tu programa de facturación o tu ERP. Sin migraciones." },
      { title: "Una persona decide", text: "La IA prepara y una persona aprueba lo importante. Nada sale sin control hasta que la fiabilidad está demostrada." },
      { title: "Medido", text: "Horas ahorradas, errores evitados y tiempo de respuesta, revisados juntos cada mes." },
    ],
    deliverables: ["Diagnóstico de procesos y plan priorizado (490 €)", "Automatización implantada y probada con casos reales tuyos", "Formación del equipo y documentación", "Un mes de soporte incluido"],
    faqs: [
      { question: "¿Qué tareas se pueden automatizar con IA en una pyme?", answer: "Las que se repiten y siguen reglas parecidas: responder consultas frecuentes, preparar presupuestos, leer y registrar facturas, hacer seguimiento a clientes, cribar candidaturas, redactar contenido o preparar informes." },
      { question: "¿Cuánto cuesta automatizar un proceso?", answer: "Cada automatización parte de 1.500 € y se presupuesta con alcance, precio y plazo cerrados. El diagnóstico previo cuesta 490 € y se descuenta si seguimos." },
      { question: "¿Tengo que cambiar mis programas?", answer: "No. Conectamos la automatización a lo que ya usas. Solo recomendamos cambiar de herramienta cuando la actual es el problema." },
    ],
  },
  {
    slug: "agentes-ia-empresas",
    name: "Agentes de IA para empresas",
    short: "Agentes de IA",
    title: "Agentes de IA para empresas: atención, ventas y operaciones | Alpa Digital",
    description: "Diseñamos agentes de inteligencia artificial que atienden clientes por WhatsApp, preparan presupuestos, gestionan pedidos y coordinan a tu equipo. Conectados a tus datos y con supervisión humana.",
    h1: "Agentes de IA para empresas",
    intro: "Un agente de IA no es un chatbot con respuestas enlatadas. Es un sistema que entiende lo que pide un cliente o un compañero, consulta tus datos reales, usa tus herramientas y devuelve un resultado: una respuesta, un presupuesto, una cita, un pedido creado.",
    keywords: ["agentes de IA para empresas", "agente inteligencia artificial atención al cliente", "asistente IA WhatsApp empresa"],
    benefits: [
      { title: "Habla con tus datos", text: "Catálogo, tarifas, stock, expedientes, agenda. El agente responde con información real y actualizada, no inventada." },
      { title: "Por los canales de tu cliente", text: "WhatsApp, email, web, teléfono o voz para el equipo en obra o en ruta." },
      { title: "Escala cuando debe", text: "Lo que no sabe o no puede decidir lo pasa a una persona con todo el contexto reunido." },
      { title: "Registro de todo", text: "Cada conversación y cada acción quedan registradas y se pueden auditar." },
    ],
    deliverables: ["Diseño de la conversación y de las herramientas del agente", "Conexión con tus sistemas y base de conocimiento", "Pruebas con casos reales y límites de seguridad", "Panel de supervisión y formación del equipo"],
    faqs: [
      { question: "¿Y si el agente se equivoca?", answer: "Se diseña con puntos de revisión: la IA prepara y una persona aprueba lo importante. Con el tiempo se le da más autonomía donde la fiabilidad está demostrada." },
      { question: "¿Qué pasa con los datos de mis clientes?", answer: "Se quedan en tus sistemas. Elegimos proveedores con garantías de privacidad, no se usan para entrenar modelos y dejamos por escrito qué se procesa y dónde." },
      { question: "¿Funciona por WhatsApp?", answer: "Sí. WhatsApp es el canal más habitual en pymes, junto con el email y el formulario de la web." },
    ],
  },
  {
    slug: "desarrollo-software-medida-ia",
    name: "Desarrollo de software a medida con IA",
    short: "Software a medida",
    title: "Desarrollo de software a medida con IA para pymes | Alpa Digital",
    description: "Desarrollamos las herramientas que tu empresa necesita y no existen: CRM, control de herramientas, fichaje, certificaciones, portales de pedidos. Con un agente de IA en el centro.",
    h1: "Desarrollo de software a medida con IA",
    intro: "Cuando no existe un programa que encaje con cómo trabajas, lo construimos: CRM de obras, control de herramientas, fichaje desde el móvil, certificaciones de proyectos, portales de pedidos. Todo conectado a un agente al que tu equipo habla por WhatsApp o por voz.",
    keywords: ["desarrollo software a medida pymes", "desarrollo aplicaciones con inteligencia artificial", "CRM a medida pyme"],
    benefits: [
      { title: "Hecho para tu forma de trabajar", text: "Sin adaptarte a un programa genérico ni pagar por funciones que no usas." },
      { title: "Un agente en el centro", text: "Las herramientas se usan hablando: «certifica la obra de Calle Mayor 12» y el sistema hace el resto." },
      { title: "Rápido de construir", text: "Plataformas modernas y desarrollo asistido por IA: semanas, no meses." },
      { title: "Tuyo", text: "Código y datos son de tu empresa. Sin dependencias ni licencias por usuario." },
    ],
    deliverables: ["Diseño de la herramienta con las personas que la usarán", "Desarrollo por fases, con entregas usables desde la primera", "Integración con tus sistemas y con el agente de IA", "Formación, documentación y mantenimiento opcional"],
    faqs: [
      { question: "¿Cuánto tarda un desarrollo a medida?", answer: "Una primera versión usable en cuatro a ocho semanas, según el alcance. Se entrega por fases para que el equipo empiece a usarla cuanto antes." },
      { question: "¿Es mejor que comprar un programa?", answer: "Depende. Si hay un programa que encaja bien, lo conectamos. Si tu forma de trabajar es particular o pagas por mucho que no usas, a medida sale mejor." },
      { question: "¿Qué pasa si necesito cambios después?", answer: "Se hacen. El acompañamiento mensual incluye horas de mejora, o se presupuestan cambios concretos." },
    ],
  },
  {
    slug: "consultoria-ia-pymes",
    name: "Consultoría de IA para pymes",
    short: "Consultoría de IA",
    title: "Consultoría de inteligencia artificial para pymes | Alpa Digital",
    description: "Diagnóstico de automatización por 490 € y acompañamiento mensual desde 350 €. Un responsable de IA para tu pyme sin contratarlo: qué automatizar, con qué herramientas y cómo usarlas con seguridad.",
    h1: "Consultoría de IA para pymes",
    intro: "Adoptar la IA con criterio: qué merece la pena automatizar y qué no, qué herramientas usar, cómo proteger los datos y cómo formar al equipo. Empezamos con un diagnóstico de una a dos semanas y seguimos, si quieres, mes a mes.",
    keywords: ["consultoría inteligencia artificial pymes", "consultor IA empresas", "diagnóstico automatización empresa"],
    benefits: [
      { title: "Diagnóstico con las personas que hacen el trabajo", text: "No solo con dirección. Vemos qué se repite, cuánto cuesta y dónde se atasca." },
      { title: "Plan priorizado", text: "Por impacto, coste y riesgo, con estimación cerrada de cada automatización." },
      { title: "Acompañamiento sin permanencia", text: "350 € al mes con horas de trabajo incluidas, reunión mensual y formación práctica." },
      { title: "Uso responsable", text: "Política de datos e IA para tu empresa, por escrito y adaptada a tu sector." },
    ],
    deliverables: ["Mapa de procesos y tiempo que consume cada uno", "Plan de automatización priorizado", "Formación del equipo en herramientas de IA", "Seguimiento mensual y mejora continua"],
    faqs: [
      { question: "¿Qué incluye el diagnóstico de 490 €?", answer: "Sesiones con el equipo, mapa de procesos, plan priorizado y estimación cerrada de cada automatización. Se descuenta si seguimos con la implementación." },
      { question: "¿Necesito conocimientos técnicos?", answer: "No. Hablamos en el lenguaje de tu negocio y nos ocupamos de la parte técnica." },
      { question: "¿Hay permanencia en el acompañamiento?", answer: "No. Es mes a mes y se puede parar cuando quieras." },
    ],
  },
];

export function getService(slug: string): ServiceDef | undefined {
  return services.find((s) => s.slug === slug);
}
