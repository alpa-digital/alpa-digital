export interface ServiceFaq {
  question: string;
  answer: string;
}

export type ServiceFamily = "sistemas" | "consultoria";

export interface ServiceDef {
  slug: string;
  family: ServiceFamily;
  /** true en la página principal de cada línea de servicio. */
  pillar?: boolean;
  name: string;
  short: string;
  title: string;
  description: string;
  h1: string;
  intro: string;
  keywords: string[];
  benefits: { title: string; text: string }[];
  deliverables: string[];
  faqs: ServiceFaq[];
  /** Piezas de la línea (solo en pilares): se muestran como bloques dentro de la página. */
  offerings?: { name: string; text: string; slug?: string }[];
}

export const families: Record<ServiceFamily, { name: string; short: string; tagline: string; description: string }> = {
  sistemas: {
    name: "Sistemas de herramientas y automatizaciones con IA",
    short: "Sistemas de IA",
    tagline: "Lo que construimos",
    description: "Desde una automatización de un proceso hasta un sistema completo de apps corporativas y agentes de IA interconectados. Es el mismo servicio a distintas escalas: se empieza por lo que más duele y se crece sin cambiar de proveedor ni de tecnología.",
  },
  consultoria: {
    name: "Consultoría de IA",
    short: "Consultoría de IA",
    tagline: "Cómo decidimos qué construir",
    description: "Diagnóstico, investigación y pruebas de concepto, diseño de producto y roadmap corporativo de IA. Para decidir con criterio qué automatizar, qué desarrollar, en qué orden y con qué garantías, antes de gastar en construir.",
  },
};

export const services: ServiceDef[] = [
  {
    slug: "sistemas-ia",
    family: "sistemas",
    pillar: true,
    name: "Sistemas de herramientas y automatizaciones con IA",
    short: "Sistemas de IA",
    title: "Sistemas de herramientas y automatizaciones con IA para pymes | Alpa Digital",
    description: "Construimos automatizaciones, agentes de IA, apps corporativas y sistemas completos de herramientas interconectadas gobernadas por inteligencia artificial.",
    h1: "Sistemas de herramientas y automatizaciones con IA",
    intro: "Un mismo servicio a distintas escalas. Puede ser una automatización que quita una tarea concreta, un agente de IA que atiende clientes, una app corporativa hecha a medida o un sistema completo de herramientas interconectadas y gobernadas por IA. Se empieza por lo que más duele y se crece por fases, con alcance y plazo cerrados en cada una.",
    keywords: ["sistemas de IA para empresas", "IA corporativa pymes", "apps corporativas con inteligencia artificial", "automatización con IA para pymes"],
    benefits: [
      { title: "Una sola arquitectura", text: "Automatizaciones, agentes y apps comparten datos, permisos y un agente central. No son piezas sueltas que luego hay que pegar." },
      { title: "Crece por fases", text: "Primero un proceso, luego un agente, después la app que faltaba. Cada fase se paga y se usa antes de empezar la siguiente." },
      { title: "Con tus herramientas", text: "Correo, WhatsApp, CRM, facturación, ERP. Integramos lo que ya funciona y desarrollamos solo lo que no existe." },
      { title: "Gobernado", text: "Registro de cada acción, límites claros para la IA y una persona que aprueba lo importante." },
    ],
    deliverables: ["Automatizaciones de procesos conectadas a tus herramientas", "Agentes de IA por WhatsApp, email, web y voz", "Apps corporativas a medida: CRM, fichaje, certificaciones, portales de pedidos, control de material", "Sistema completo: datos compartidos, agente central, panel de supervisión y permisos"],
    offerings: [
      { name: "Automatizaciones de procesos", text: "Una tarea repetitiva que deja de hacerse a mano: facturas, presupuestos, pedidos, seguimiento.", slug: "automatizacion-ia-pymes" },
      { name: "Agentes de IA", text: "Un agente que atiende, prepara, consulta tus datos y actúa por WhatsApp, email o voz, con una persona detrás cuando toca.", slug: "agentes-ia-empresas" },
      { name: "Apps corporativas a medida", text: "La herramienta que tu empresa necesita y no existe, construida para tu forma de trabajar y conectada al agente.", slug: "desarrollo-software-medida-ia" },
      { name: "IA corporativa: el sistema completo", text: "Varias apps, agentes y automatizaciones interconectados y gobernados por IA, con datos compartidos, permisos y supervisión." },
    ],
    faqs: [
      { question: "¿Es lo mismo una automatización que un sistema de IA corporativo?", answer: "Es la misma línea de servicio a distinta escala. Una automatización resuelve una tarea; un sistema conecta varias apps, agentes y automatizaciones con datos compartidos y un agente central. Se empieza por una automatización y se crece si tiene sentido." },
      { question: "¿Podéis hacer una app corporativa completa?", answer: "Sí. Desarrollamos apps a medida (CRM, fichaje, certificaciones, portales de pedidos, control de material) y las conectamos entre sí y con un agente de IA. Se entregan por fases usables." },
      { question: "¿Cómo se contrata?", answer: "Cada automatización se contrata suelta. Las apps y los sistemas se planifican por fases, cada una con alcance y plazo cerrados antes de empezar. El presupuesto concreto te lo damos tras la primera llamada." },
    ],
  },
  {
    slug: "automatizacion-ia-pymes",
    family: "sistemas",
    name: "Automatización con IA para pymes",
    short: "Automatización con IA",
    title: "Automatización con IA para pymes | Alpa Digital",
    description: "Automatizamos con inteligencia artificial las tareas repetitivas de tu pyme: atención al cliente, presupuestos, facturas y seguimiento comercial.",
    h1: "Automatización con IA para pymes",
    intro: "Quitamos de encima a tu equipo el trabajo repetitivo: responder consultas, preparar presupuestos, registrar facturas, hacer seguimiento. Cada automatización conectada a las herramientas que ya usas, con alcance y plazo cerrados antes de empezar. Es la primera escala de nuestros sistemas de IA.",
    keywords: ["automatización con IA para pymes", "automatizar procesos empresa", "automatización inteligencia artificial pymes"],
    benefits: [
      { title: "Empieza por un proceso", text: "No hace falta cambiar la empresa entera. Elegimos la tarea que más tiempo quita y la automatizamos en dos a seis semanas." },
      { title: "Con tus herramientas", text: "Correo, WhatsApp, Google Workspace o Microsoft 365, tu CRM, tu programa de facturación o tu ERP. Sin migraciones." },
      { title: "Una persona decide", text: "La IA prepara y una persona aprueba lo importante. Nada sale sin control hasta que la fiabilidad está demostrada." },
      { title: "Preparada para crecer", text: "Cada automatización se construye sobre la misma base que los agentes y las apps: si mañana quieres más, no se tira nada." },
    ],
    deliverables: ["Automatización implantada y probada con casos reales tuyos", "Integración con tus herramientas actuales", "Formación del equipo y documentación", "Un mes de soporte incluido"],
    faqs: [
      { question: "¿Qué tareas se pueden automatizar con IA en una pyme?", answer: "Las que se repiten y siguen reglas parecidas: responder consultas frecuentes, preparar presupuestos, leer y registrar facturas, hacer seguimiento a clientes, cribar candidaturas, redactar contenido o preparar informes." },
      { question: "¿Cuánto se tarda en automatizar un proceso?", answer: "Normalmente entre dos y seis semanas, con alcance y plazo cerrados antes de empezar. El diagnóstico previo dura una o dos semanas." },
      { question: "¿Tengo que cambiar mis programas?", answer: "No. Conectamos la automatización a lo que ya usas. Solo recomendamos cambiar de herramienta cuando la actual es el problema." },
    ],
  },
  {
    slug: "agentes-ia-empresas",
    family: "sistemas",
    name: "Agentes de IA para empresas",
    short: "Agentes de IA",
    title: "Agentes de IA para empresas: atención, ventas y operaciones | Alpa Digital",
    description: "Diseñamos agentes de inteligencia artificial que atienden clientes por WhatsApp, preparan presupuestos, gestionan pedidos y coordinan a tu equipo. Conectados a tus datos y con supervisión humana.",
    h1: "Agentes de IA para empresas",
    intro: "Un agente de IA no es un chatbot con respuestas enlatadas. Es un sistema que entiende lo que pide un cliente o un compañero, consulta tus datos reales, usa tus herramientas y devuelve un resultado: una respuesta, un presupuesto, una cita, un pedido creado. Es la pieza central de nuestros sistemas de IA.",
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
    family: "sistemas",
    name: "Apps corporativas y software a medida con IA",
    short: "Apps corporativas",
    title: "Apps corporativas y software a medida con IA para pymes | Alpa Digital",
    description: "Desarrollamos las apps corporativas que tu empresa necesita y no existen: CRM, control de herramientas, fichaje, certificaciones, portales de pedidos. Interconectadas y con un agente de IA en el centro.",
    h1: "Apps corporativas y software a medida con IA",
    intro: "Cuando no existe un programa que encaje con cómo trabajas, lo construimos: CRM de obras, control de herramientas, fichaje desde el móvil, certificaciones de proyectos, portales de pedidos. Cada app se conecta con las demás y con un agente al que tu equipo habla por WhatsApp o por voz. Es la escala de app y de sistema de nuestros sistemas de IA.",
    keywords: ["apps corporativas pymes", "desarrollo software a medida pymes", "desarrollo aplicaciones con inteligencia artificial", "CRM a medida pyme"],
    benefits: [
      { title: "Hecho para tu forma de trabajar", text: "Sin adaptarte a un programa genérico ni pagar por funciones que no usas." },
      { title: "Interconectadas", text: "Las apps comparten datos, usuarios y permisos. Lo que pasa en una lo sabe la otra." },
      { title: "Un agente en el centro", text: "Las herramientas se usan hablando: «certifica la obra de Calle Mayor 12» y el sistema hace el resto." },
      { title: "Tuyo", text: "Código y datos son de tu empresa. Sin dependencias ni licencias por usuario." },
    ],
    deliverables: ["Diseño de la app con las personas que la usarán", "Desarrollo por fases, con entregas usables desde la primera", "Integración con tus sistemas y con el agente de IA", "Formación, documentación y mantenimiento opcional"],
    faqs: [
      { question: "¿Cuánto tarda un desarrollo a medida?", answer: "Una primera versión usable en cuatro a ocho semanas, según el alcance. Se entrega por fases para que el equipo empiece a usarla cuanto antes." },
      { question: "¿Es mejor que comprar un programa?", answer: "Depende. Si hay un programa que encaja bien, lo conectamos. Si tu forma de trabajar es particular o pagas por mucho que no usas, a medida sale mejor." },
      { question: "¿Qué pasa si necesito cambios después?", answer: "Se hacen. El acompañamiento mensual incluye horas de mejora, o se presupuestan cambios concretos." },
    ],
  },
  {
    slug: "consultoria-ia-pymes",
    family: "consultoria",
    pillar: true,
    name: "Consultoría de IA para pymes",
    short: "Consultoría de IA",
    title: "Consultoría de IA para pymes: diagnóstico, I+D, diseño de producto y roadmap | Alpa Digital",
    description: "Diagnóstico de automatización, I+D y pruebas de concepto, diseño de producto y roadmap corporativo de IA, con acompañamiento mensual si lo quieres. Decide con criterio qué automatizar y qué construir.",
    h1: "Consultoría de IA para pymes",
    intro: "Antes de construir, decidir. Y después de construir, seguir mejorando. La consultoría es la parte de nuestro trabajo que responde a qué merece la pena automatizar, qué herramienta hace falta, cómo probar una idea antes de gastar en ella y en qué orden avanzar. Cuatro piezas que se contratan sueltas o como acompañamiento.",
    keywords: ["consultoría inteligencia artificial pymes", "consultor IA empresas", "diagnóstico automatización empresa", "roadmap IA empresa", "estrategia inteligencia artificial pymes"],
    offerings: [
      { name: "Diagnóstico de automatización", text: "Una o dos semanas con las personas que hacen el trabajo. Mapa de procesos, tiempo que consume cada uno y plan priorizado por impacto, coste y riesgo, con estimación cerrada de cada automatización." },
      { name: "I+D y pruebas de concepto", text: "Cuando no está claro si la IA puede hacer algo con tus datos, lo probamos en pequeño antes de invertir: un prototipo con casos reales y un informe con lo que funciona, lo que no y a qué coste." },
      { name: "Diseño de producto", text: "Definimos la herramienta o el agente con quien lo va a usar: flujos, pantallas, reglas, límites de la IA y criterios de éxito. Sale un diseño listo para construir, por nosotros o por quien elijas." },
      { name: "Roadmap corporativo de IA", text: "Plan a 12 meses: qué automatizar, qué desarrollar, en qué orden, con qué herramientas y con qué política de datos y uso responsable. Con seguimiento mensual si lo quieres." },
    ],
    benefits: [
      { title: "Con las personas que hacen el trabajo", text: "No solo con dirección. Vemos qué se repite, cuánto cuesta y dónde se atasca." },
      { title: "Decisiones con datos", text: "Cada propuesta lleva impacto en horas, coste estimado y riesgo. Y a veces la recomendación es no automatizar." },
      { title: "Independiente de lo que construyas", text: "El diseño y el roadmap son tuyos. Puedes construir con nosotros o con otro proveedor." },
      { title: "Sin permanencia", text: "El acompañamiento es mes a mes, con horas de trabajo incluidas, reunión mensual y formación práctica." },
    ],
    deliverables: ["Mapa de procesos y tiempos", "Plan de automatización priorizado con estimaciones cerradas", "Prototipos e informes de I+D", "Diseño de producto listo para construir", "Roadmap de IA a 12 meses y política de uso responsable"],
    faqs: [
      { question: "¿Qué incluye el diagnóstico?", answer: "Sesiones con el equipo, mapa de procesos, plan priorizado y estimación cerrada de cada automatización. Dura una o dos semanas." },
      { question: "¿Qué es una prueba de concepto y cuándo hace falta?", answer: "Un prototipo pequeño con tus datos reales para comprobar si la IA resuelve algo antes de invertir en construirlo. Hace falta cuando el caso no es habitual o los datos son complicados." },
      { question: "¿Puedo contratar solo el diseño o el roadmap y construir con otro?", answer: "Sí. El diseño de producto y el roadmap se entregan documentados y son tuyos." },
      { question: "¿Necesito conocimientos técnicos?", answer: "No. Hablamos en el lenguaje de tu negocio y nos ocupamos de la parte técnica." },
    ],
  },
];

export function getService(slug: string): ServiceDef | undefined {
  return services.find((s) => s.slug === slug);
}

export function servicesOf(family: ServiceFamily): ServiceDef[] {
  return services.filter((s) => s.family === family);
}

export function pillarOf(family: ServiceFamily): ServiceDef {
  return services.find((s) => s.family === family && s.pillar) as ServiceDef;
}
