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
    name: "IA privada para empresas",
    short: "IA privada",
    tagline: "Lo que montamos",
    description: "Una plataforma de IA propia para cada empresa, con modelos abiertos en infraestructura dedicada, y sobre ella las apps corporativas, los agentes y las automatizaciones que usa el equipo. Se empieza por un piloto y se crece app a app sobre la misma instancia.",
  },
  consultoria: {
    name: "Consultoría y piloto de IA privada",
    short: "Consultoría y piloto",
    tagline: "Cómo decidimos por dónde empezar",
    description: "Revisamos un proceso con tu equipo, probamos la IA con tus datos reales y acordamos el alcance antes de invertir. Para decidir con criterio qué apps montar, en qué orden y con qué política de datos.",
  },
};

export const services: ServiceDef[] = [
  {
    slug: "sistemas-ia",
    family: "sistemas",
    pillar: true,
    name: "IA privada para empresas",
    short: "IA privada",
    title: "IA privada para empresas y pymes: tus datos, bajo tu control | Alpa Digital",
    description: "Plataforma de IA privada para pymes: una instancia propia con modelos abiertos en infraestructura dedicada en la UE, apps corporativas con IA, agentes y automatizaciones sobre los datos de tu empresa.",
    h1: "IA privada para empresas",
    intro: "Una instancia de IA de uso exclusivo para tu empresa, con tu marca y tu subdominio. Funciona con modelos abiertos en infraestructura dedicada, se conecta a tu correo, tu CRM, tu ERP y tus documentos, y sobre ella viven las apps corporativas que usa tu equipo. Tus datos no se ceden para entrenar modelos de terceros y no pagas a un proveedor externo por cada consulta.",
    keywords: ["IA privada para empresas", "IA privada pymes", "inteligencia artificial privada", "IA local para empresas", "plataforma de IA corporativa", "IA con datos de la empresa"],
    benefits: [
      { title: "Tus datos no entrenan modelos ajenos", text: "Documentos, correos y fichas de clientes viven en la instancia de tu empresa. No se ceden para entrenar modelos de terceros." },
      { title: "Coste previsible", text: "Sin facturas que crecen con cada consulta. La infraestructura se dimensiona para tu empresa y su uso real." },
      { title: "Infraestructura en la UE", text: "Servidores dedicados en la Unión Europea, copias de seguridad cifradas y acceso por usuario. Y hardware propio cuando el uso lo justifica." },
      { title: "Tú decides quién ve qué", text: "Permisos por persona y por app. Cada empleado accede solo a los datos y apps que corresponden a su puesto." },
    ],
    deliverables: ["Instancia propia con tu marca y subdominio (tuempresa.alpa.digital)", "Modelos de IA abiertos en infraestructura dedicada en la UE", "Conectores con tu correo, CRM, ERP y documentos", "Apps corporativas, agentes y automatizaciones según lo que necesite tu equipo", "Usuarios, permisos por persona y por app, y copias de seguridad cifradas"],
    offerings: [
      { name: "Apps corporativas con IA", text: "Atención al cliente, CRM, presupuestos, obras y partes, RR. HH., consulta de documentos, cuadro de mando. Apps que leen tus datos y preparan el trabajo; tu equipo revisa y decide.", slug: "desarrollo-software-medida-ia" },
      { name: "Agentes de IA privados", text: "Agentes que atienden y actúan por correo, WhatsApp o la web consultando los datos de tu instancia, con una persona detrás cuando toca.", slug: "agentes-ia-empresas" },
      { name: "Automatizaciones", text: "Flujos que encadenan acciones entre tus apps (clasificar un correo, actualizar el CRM, avisar a una persona) y que tu equipo puede crear y ajustar de forma controlada.", slug: "automatizacion-ia-pymes" },
      { name: "Consultoría y piloto", text: "Revisamos un proceso con tu equipo, probamos la IA con tus datos reales y acordamos el alcance antes de que inviertas.", slug: "consultoria-ia-pymes" },
    ],
    faqs: [
      { question: "¿Qué es una IA privada?", answer: "Una plataforma de IA de uso exclusivo para tu empresa: modelos de lenguaje abiertos en infraestructura dedicada, conectados a tus documentos y herramientas, y las apps corporativas que tu equipo usa a diario. No es un chatbot público al que subes tus datos." },
      { question: "¿Dónde están mis datos?", answer: "En servidores dedicados en la Unión Europea, con copias de seguridad cifradas y acceso por usuario. Cuando el uso lo justifica, la plataforma puede pasar a hardware propio. Tus datos no se usan para entrenar modelos de terceros." },
      { question: "¿Necesito comprar servidores o tarjetas gráficas?", answer: "No para empezar. El piloto arranca en infraestructura en la nube que gestionamos nosotros. El hardware propio solo se valora cuando el uso real de tu empresa lo justifica." },
      { question: "¿Cómo se contrata?", answer: "Se empieza con un piloto sobre un proceso concreto. Después se añaden apps a la misma instancia. Los desarrollos a medida se presupuestan según el trabajo previsto, y todo se acuerda por escrito antes de empezar." },
    ],
  },
  {
    slug: "automatizacion-ia-pymes",
    family: "sistemas",
    name: "Automatizaciones con IA privada",
    short: "Automatizaciones",
    title: "Automatización con IA privada para pymes | Alpa Digital",
    description: "Automatizaciones con IA sobre los datos de tu empresa: flujos entre correo, CRM, presupuestos y documentos que funcionan en tu propia instancia de IA privada y que tu equipo puede crear y ajustar.",
    h1: "Automatizaciones con IA privada",
    intro: "Flujos que encadenan acciones entre tus apps y herramientas: un correo llega, se clasifica, se crea la ficha en el CRM y se avisa a la persona que toca. Funcionan dentro de tu instancia de IA privada, con tus datos, y tu equipo puede crearlos y ajustarlos de forma controlada sin depender de nosotros para cada cambio.",
    keywords: ["automatización con IA para pymes", "automatizar procesos empresa", "automatización IA privada", "automatizaciones sin enviar datos a terceros"],
    benefits: [
      { title: "Empieza por un proceso", text: "No hace falta cambiar la empresa entera. Elegimos con tu equipo la tarea que más horas consume y la probamos en un piloto." },
      { title: "Con tus herramientas", text: "Correo, WhatsApp, Google Workspace o Microsoft 365, tu CRM, tu programa de facturación o tu ERP. Sin migraciones." },
      { title: "Tu equipo las controla", text: "Las automatizaciones se ven, se activan y se ajustan desde la plataforma. La IA prepara y una persona aprueba lo importante." },
      { title: "Sobre la misma instancia", text: "Cada automatización usa los mismos datos, permisos y modelos que el resto de tus apps. Si mañana quieres más, no se tira nada." },
    ],
    deliverables: ["Automatización funcionando en tu instancia de IA privada", "Conexión con tus herramientas actuales", "Editor de automatizaciones para tu equipo, con permisos", "Formación del equipo y documentación"],
    faqs: [
      { question: "¿Qué tareas se pueden automatizar con IA en una pyme?", answer: "Las que se repiten y siguen reglas parecidas: clasificar y responder correos, preparar presupuestos, leer y registrar facturas, hacer seguimiento a clientes, cribar candidaturas o preparar informes." },
      { question: "¿Mis datos salen de la empresa al automatizar?", answer: "Las automatizaciones funcionan dentro de tu instancia de IA privada, con modelos abiertos en infraestructura dedicada en la UE. Tus datos no se ceden para entrenar modelos de terceros." },
      { question: "¿Tengo que cambiar mis programas?", answer: "No. Conectamos la automatización a lo que ya usas. Solo recomendamos cambiar de herramienta cuando la actual es el problema." },
      { question: "¿Puede mi equipo crear sus propias automatizaciones?", answer: "Sí, de forma controlada: desde la plataforma se crean y ajustan flujos sobre las apps de la empresa, con permisos para decidir quién puede hacerlo." },
    ],
  },
  {
    slug: "agentes-ia-empresas",
    family: "sistemas",
    name: "Agentes de IA privados para empresas",
    short: "Agentes de IA",
    title: "Agentes de IA privados para empresas: atención, ventas y operaciones | Alpa Digital",
    description: "Agentes de IA que atienden a clientes y ayudan a tu equipo consultando los datos de tu empresa, dentro de tu propia instancia de IA privada. Por correo, WhatsApp o la web, con supervisión humana.",
    h1: "Agentes de IA privados para empresas",
    intro: "Un agente de IA no es un chatbot con respuestas enlatadas. Entiende lo que pide un cliente o un compañero, consulta los datos reales de tu empresa, usa tus herramientas y devuelve un resultado: una respuesta, un presupuesto, una cita, un pedido. En Alpa funciona dentro de tu instancia de IA privada, así que trabaja con tus datos sin cederlos a terceros.",
    keywords: ["agentes de IA para empresas", "agente IA privado", "asistente IA con datos de la empresa", "asistente IA WhatsApp empresa"],
    benefits: [
      { title: "Habla con tus datos", text: "Catálogo, tarifas, stock, expedientes, manuales. El agente responde con información real de tu instancia, no inventada." },
      { title: "Por los canales de tu cliente", text: "Correo, WhatsApp o la web, y el buscador «Buscar o preguntar» dentro de la plataforma para tu equipo." },
      { title: "Escala cuando debe", text: "Lo que no sabe o no puede decidir lo pasa a una persona con todo el contexto reunido." },
      { title: "Privado y con permisos", text: "El agente solo ve lo que permite el rol de quien pregunta, y cada conversación queda registrada en tu instancia." },
    ],
    deliverables: ["Diseño de la conversación y de las acciones del agente", "Conexión con tus datos y documentos en tu instancia", "Pruebas con casos reales y límites de seguridad", "Formación del equipo"],
    faqs: [
      { question: "¿Y si el agente se equivoca?", answer: "Se diseña con puntos de revisión: la IA prepara y una persona aprueba lo importante. Con el tiempo se le da más autonomía donde la fiabilidad está demostrada." },
      { question: "¿Qué pasa con los datos de mis clientes?", answer: "Se quedan en tu instancia de IA privada, en infraestructura dedicada en la UE. No se usan para entrenar modelos de terceros y dejamos por escrito qué se procesa y dónde." },
      { question: "¿Puede responder con nuestros manuales y documentos?", answer: "Sí. Es uno de los usos más habituales: el agente busca en tus manuales, normativa o contratos y responde a partir de ellos, no de lo que encuentra en internet." },
    ],
  },
  {
    slug: "desarrollo-software-medida-ia",
    family: "sistemas",
    name: "Apps corporativas con IA",
    short: "Apps corporativas",
    title: "Apps corporativas con IA privada para pymes | Alpa Digital",
    description: "Apps corporativas con IA sobre los datos de tu empresa: atención al cliente, CRM, presupuestos, obras y partes, RR. HH., consulta de documentos y cuadro de mando, en tu propia instancia de IA privada.",
    h1: "Apps corporativas con IA",
    intro: "Las apps que tu equipo usa cada día, en una sola instancia con tu marca: atención al cliente, CRM comercial, presupuestos, obras y partes, proyectos y tareas, personas, consulta de normativa y documentos, cuadro de mando. Comparten datos, usuarios y permisos, y la IA trabaja dentro de cada una con la información de tu empresa. Lo que no exista para tu forma de trabajar, lo desarrollamos a medida.",
    keywords: ["apps corporativas pymes", "apps corporativas con IA", "software a medida con IA", "CRM con IA privada", "desarrollo aplicaciones con inteligencia artificial"],
    benefits: [
      { title: "Todo en un mismo Inicio", text: "Cada persona entra y ve sus apps y lo que necesita atención: urgencias, partes por validar, tareas vencidas." },
      { title: "Interconectadas", text: "Las apps comparten datos, usuarios y permisos. Lo que pasa en una lo sabe la otra." },
      { title: "La IA dentro de cada app", text: "Prepara respuestas, presupuestos y resúmenes con tus datos. Tu equipo revisa y decide." },
      { title: "A medida cuando hace falta", text: "Si tu forma de trabajar es particular, desarrollamos la app que falta. Se presupuesta según el trabajo." },
    ],
    deliverables: ["Apps corporativas en tu instancia, con tu marca", "Conexión con tus herramientas y datos actuales", "Desarrollo a medida de las piezas que falten, por fases", "Formación, documentación y mantenimiento"],
    faqs: [
      { question: "¿Qué apps incluye la plataforma?", answer: "Depende de tu empresa. Las más habituales son atención al cliente, CRM comercial, presupuestos, obras y partes, proyectos y tareas, personas, consulta de documentos y cuadro de mando. Se empieza por una y se añaden después." },
      { question: "¿Es mejor que comprar un programa?", answer: "Depende. Si un programa encaja bien, lo conectamos. Si tu forma de trabajar es particular, si pagas por mucho que no usas o si no quieres enviar tus datos a un proveedor externo, una app en tu instancia sale mejor." },
      { question: "¿Qué pasa si necesito cambios después?", answer: "Se hacen. Los cambios y las apps nuevas se presupuestan según el trabajo previsto." },
    ],
  },
  {
    slug: "consultoria-ia-pymes",
    family: "consultoria",
    pillar: true,
    name: "Consultoría y piloto de IA privada",
    short: "Consultoría y piloto",
    title: "Consultoría de IA y piloto de IA privada para pymes | Alpa Digital",
    description: "Consultoría de IA para pymes: revisamos un proceso con tu equipo, probamos la IA privada con tus datos reales en un piloto y acordamos el alcance antes de invertir.",
    h1: "Consultoría y piloto de IA privada",
    intro: "Antes de montar nada, decidir. Revisamos con tu equipo cómo se hace hoy el trabajo, elegimos el proceso que más horas consume y lo probamos con tus datos reales en un piloto de IA privada. Con el resultado medido, acordamos qué apps añadir, en qué orden y con qué política de datos.",
    keywords: ["consultoría inteligencia artificial pymes", "consultor IA empresas", "piloto IA privada", "roadmap IA empresa", "estrategia inteligencia artificial pymes"],
    offerings: [
      { name: "Revisión del proceso", text: "Sesiones con las personas que hacen el trabajo: qué se repite, cuánto tiempo consume, con qué datos y herramientas, y dónde se atasca." },
      { name: "Piloto con tus datos", text: "Montamos el proceso elegido en una instancia de IA privada y lo probamos con casos reales de tu empresa. Sale un resultado medido: lo que funciona, lo que no y a qué coste." },
      { name: "Política de datos y permisos", text: "Qué datos entran en la plataforma, quién puede ver qué y dónde se procesan. Queda por escrito antes de ampliar." },
      { name: "Hoja de ruta", text: "Qué apps y automatizaciones añadir después, en qué orden y con qué infraestructura, incluido cuándo compensa pasar a hardware propio." },
    ],
    benefits: [
      { title: "Con las personas que hacen el trabajo", text: "No solo con dirección. Vemos qué se repite, cuánto cuesta y dónde se atasca." },
      { title: "Decisiones con datos", text: "El piloto se mide con casos reales. Y a veces la recomendación es no automatizar." },
      { title: "Privacidad desde el principio", text: "La política de datos y los permisos se deciden antes de ampliar, no después." },
      { title: "Sin compromiso de seguir", text: "Si el piloto no convence, se para ahí. Si convence, se crece sobre la misma instancia." },
    ],
    deliverables: ["Mapa del proceso, tiempos y datos implicados", "Piloto funcionando en una instancia de IA privada", "Resultado medido con casos reales", "Política de datos y permisos", "Hoja de ruta de apps e infraestructura"],
    faqs: [
      { question: "¿Qué es el piloto?", answer: "Un primer proceso montado en una instancia de IA privada y probado con datos reales de tu empresa, para comprobar el resultado antes de ampliar." },
      { question: "¿Cuánto dura?", answer: "Depende del proceso y de las integraciones necesarias. El alcance y el plazo se acuerdan por escrito antes de empezar." },
      { question: "¿Necesito conocimientos técnicos?", answer: "No. Hablamos en el lenguaje de tu negocio y nos ocupamos de la parte técnica." },
      { question: "¿Qué pasa con mis datos durante el piloto?", answer: "Se procesan en una instancia dedicada a tu empresa, en infraestructura en la UE. No se usan para entrenar modelos de terceros." },
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
