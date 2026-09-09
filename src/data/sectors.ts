// Páginas de sector: dónde más pymes y más trabajo repetitivo hay. Cada sector tiene contenido propio.

export interface SectorAutomation {
  area: "Atención al cliente" | "Ventas" | "Administración" | "Recursos humanos" | "Marketing" | "Dirección" | "Operaciones";
  title: string;
  text: string;
  hours: number;
}

export interface SectorDef {
  slug: string;
  name: string;
  /** Con preposición, para frases: "para clínicas dentales". */
  forName: string;
  short: string;
  title: string;
  description: string;
  h1: string;
  intro: string;
  pains: string[];
  automations: SectorAutomation[];
  system: { hub: string; modules: { name: string; short: string }[] };
  metrics: { value: string; label: string }[];
  faqs: { question: string; answer: string }[];
  /** Provincias con más peso del sector (enlazado interno). */
  provinces: string[];
  /** Palabras del sector en los datos de provincias, para enlazar desde las páginas locales. */
  match: string[];
}

export const sectors: SectorDef[] = [
  {
    slug: "instalaciones-electricas",
    name: "Instalaciones eléctricas, climatización y fotovoltaica",
    forName: "para empresas de instalaciones eléctricas",
    short: "Instalaciones",
    title: "IA y automatización para empresas de instalaciones eléctricas | Alpa Digital",
    description: "Presupuestos a partir de fotos, certificados y boletines desde el móvil, control de herramientas por QR y fichaje en obra. Automatización y apps a medida para instaladores eléctricos, de climatización y fotovoltaica.",
    h1: "IA y automatización para empresas de instalaciones",
    intro: "Electricistas, instaladores de climatización y empresas de fotovoltaica viven entre la obra y la oficina: presupuestos que se hacen de noche, certificados que se retrasan, herramientas que desaparecen y horas que nadie apunta. Todo eso se puede quitar de encima con un agente al que los técnicos hablan desde la furgoneta.",
    pains: ["Presupuestos que se preparan a mano después de la visita, a menudo días después", "Boletines y certificados (CIE, legalizaciones) que se acumulan y retrasan cobros", "Herramientas y material que no se sabe en qué furgoneta están", "Partes de horas y fichajes en papel o en WhatsApp sin orden", "Clientes que llaman para saber cuándo vais y qué falta"],
    automations: [
      { area: "Ventas", title: "Presupuestos a partir de fotos y medidas", text: "El técnico manda fotos, medidas y notas por WhatsApp desde la visita y el presupuesto sale en vuestra plantilla, con vuestras partidas y precios, listo para revisar y enviar.", hours: 7 },
      { area: "Administración", title: "Certificados y boletines desde una conversación", text: "«Certifica la obra de Calle Mayor 12»: el agente recupera los datos de la obra, pide lo que falta y genera el certificado para firmar y enviar a cliente e Industria.", hours: 5 },
      { area: "Operaciones", title: "Control de herramientas y material por QR", text: "Cada herramienta lleva un QR: se escanea al salir y volver de obra, y el agente sabe qué hay en cada furgoneta, quién lo tiene y qué toca calibrar.", hours: 3 },
      { area: "Recursos humanos", title: "Fichaje en obra y partes de horas", text: "Los técnicos fichan por WhatsApp al llegar a la obra, con ubicación. Los partes por obra y las horas del mes salen solos para la gestoría.", hours: 4 },
      { area: "Atención al cliente", title: "Avance de obra sin llamadas", text: "El cliente pregunta y recibe el estado real: cuándo vais, qué material falta, cuánto queda. Y las urgencias crean un aviso al técnico de guardia.", hours: 3 },
    ],
    system: { hub: "Agente de la empresa por WhatsApp y voz", modules: [{ name: "Certificación de obras", short: "Asistente conversacional" }, { name: "Control de herramientas", short: "QR y furgoneta" }, { name: "CRM de obras y clientes", short: "Presupuestos y seguimiento" }, { name: "Fichaje y horas", short: "Desde el móvil" }, { name: "Compras y facturas", short: "Material por obra" }, { name: "Marketing local", short: "Obras terminadas → reseñas" }] },
    metrics: [{ value: "4 min", label: "por certificado, desde la obra" }, { value: "+31 %", label: "presupuestos aceptados al responder el mismo día" }, { value: "0", label: "herramientas perdidas en un trimestre" }],
    faqs: [
      { question: "¿Funciona si mis técnicos no quieren usar apps?", answer: "Por eso el agente vive en WhatsApp y por voz. No hay que aprender ninguna app: se manda una foto o un audio y el sistema hace el resto." },
      { question: "¿Los certificados salen con el formato oficial?", answer: "Se generan sobre vuestras plantillas y las de Industria de vuestra comunidad, con los datos de la obra y las mediciones. Una persona los revisa y firma." },
      { question: "¿Por dónde se empieza?", answer: "Por un diagnóstico de una o dos semanas con tu equipo. Después, la primera automatización, normalmente presupuestos o certificados, con alcance y plazo cerrados." },
    ],
    provinces: ["sevilla", "cadiz", "malaga", "madrid", "murcia", "valencia"],
    match: ["instalac", "electric", "construc"],
  },
  {
    slug: "construccion-reformas",
    name: "Construcción y reformas",
    forName: "para empresas de construcción y reformas",
    short: "Construcción y reformas",
    title: "IA y automatización para construcción y reformas | Alpa Digital",
    description: "Presupuestos de reforma a partir de fotos, facturas y albaranes por obra, partes de cuadrilla y clientes informados sin llamadas. Automatización con IA para constructoras y empresas de reformas.",
    h1: "IA y automatización para construcción y reformas",
    intro: "En una reforma el dinero se pierde en lo que no se apunta: horas, material, cambios que pidió el cliente y nadie presupuestó. Un agente que recoge todo desde la obra y una administración que se lleva sola cambian el margen de cada trabajo.",
    pains: ["Presupuestos de reforma que tardan días y se pierden por lentitud", "Albaranes y facturas de proveedores sin asignar a cada obra", "Cambios en obra que no se documentan ni se cobran", "Partes de cuadrilla en papel y subcontratas sin documentación al día", "Clientes que llaman a diario para saber cómo va"],
    automations: [
      { area: "Ventas", title: "Presupuestos de reforma a partir de fotos", text: "Fotos de la visita, medidas y notas de voz se convierten en un presupuesto por partidas con vuestros precios, listo para revisar.", hours: 8 },
      { area: "Administración", title: "Facturas y albaranes por obra", text: "Cada documento que llega al correo se lee, se asigna a su obra y se registra en contabilidad. El coste real de cada obra está siempre al día.", hours: 8 },
      { area: "Operaciones", title: "Cambios en obra documentados y presupuestados", text: "El jefe de obra dicta el cambio, el agente lo registra con foto y prepara el presupuesto adicional para que el cliente lo apruebe en un clic.", hours: 3 },
      { area: "Atención al cliente", title: "Avance de obra sin llamadas", text: "El cliente recibe cada semana el estado, las fotos y los próximos pasos, y sus preguntas se responden con la información real de la obra.", hours: 4 },
      { area: "Recursos humanos", title: "Partes de cuadrilla y documentación de subcontratas", text: "Fichaje por obra, partes de horas y control de la documentación de PRL de cada subcontrata, con avisos antes de que caduque.", hours: 3 },
    ],
    system: { hub: "Agente de obra por WhatsApp", modules: [{ name: "Presupuestos y partidas", short: "A partir de fotos" }, { name: "Control de costes por obra", short: "Albaranes y facturas" }, { name: "Diario de obra", short: "Cambios, fotos y avances" }, { name: "Portal del cliente", short: "Estado y aprobaciones" }, { name: "Cuadrillas y PRL", short: "Fichaje y documentación" }] },
    metrics: [{ value: "24 h", label: "de la visita al presupuesto" }, { value: "82 %", label: "coste real visible antes de cerrar la obra" }, { value: "-70 %", label: "llamadas de clientes preguntando por la obra" }],
    faqs: [
      { question: "¿Sirve para reformas pequeñas?", answer: "Sí. Cuanto más pequeña la obra, más pesa el tiempo de presupuestar y administrar. La primera automatización suele ser el presupuesto." },
      { question: "¿Se conecta con mi programa de presupuestos (Presto, Arquímedes, Excel)?", answer: "Trabajamos con vuestras partidas y precios, exportados de lo que uséis, y devolvemos el presupuesto en vuestra plantilla o en el programa." },
      { question: "¿Y la documentación de las subcontratas?", answer: "El sistema pide y guarda la documentación de cada subcontrata y avisa antes de que caduque, para que nadie entre en obra sin ella." },
    ],
    provinces: ["sevilla", "malaga", "cadiz", "madrid", "barcelona", "baleares"],
    match: ["construc", "reforma"],
  },
  {
    slug: "clinicas-salud",
    name: "Clínicas dentales, centros médicos y salud",
    forName: "para clínicas y centros de salud",
    short: "Clínicas y salud",
    title: "IA y automatización para clínicas dentales y centros de salud | Alpa Digital",
    description: "Citas y recordatorios por WhatsApp, consentimientos en tableta, presupuestos de tratamiento en consulta y liquidación de mutuas. Automatización con IA para clínicas dentales, fisioterapia, estética y centros médicos.",
    h1: "IA y automatización para clínicas y centros de salud",
    intro: "El teléfono de una clínica no para y la recepción hace de agenda, caja, archivo y marketing a la vez. Un agente que atiende, agenda y recuerda, y unas herramientas que preparan presupuestos, consentimientos y liquidaciones, devuelven la recepción a lo que importa: el paciente que tiene delante.",
    pains: ["Teléfono ocupado y citas que se pierden fuera de horario", "Pacientes que no se presentan y huecos sin rellenar", "Consentimientos y documentación en papel", "Presupuestos de tratamiento que se envían tarde y no se siguen", "Liquidaciones de mutuas que llevan semanas"],
    automations: [
      { area: "Atención al cliente", title: "Citas, cambios y recordatorios por WhatsApp", text: "El paciente pide, cambia y confirma citas hablando con el agente. Los huecos se rellenan desde la lista de espera y los recordatorios reducen las ausencias.", hours: 10 },
      { area: "Ventas", title: "Presupuestos de tratamiento en consulta", text: "El plan de tratamiento se presupuesta antes de que el paciente salga, con opciones de pago, y el seguimiento de los que no empiezan se hace solo.", hours: 4 },
      { area: "Administración", title: "Consentimientos y expediente sin papel", text: "Consentimientos firmados en tableta, evolución dictada por voz en consulta y todo archivado en el expediente del paciente.", hours: 5 },
      { area: "Administración", title: "Facturación y liquidación de mutuas", text: "Factura al cerrar la cita, cobros conciliados y liquidaciones por aseguradora preparadas por el agente.", hours: 4 },
      { area: "Marketing", title: "Revisiones y reseñas", text: "Recordatorios de revisión anual, campañas de higiene y reseñas solicitadas tras cada tratamiento, con el tono de la clínica.", hours: 2 },
    ],
    system: { hub: "Agente de la clínica por WhatsApp y teléfono", modules: [{ name: "Agenda conversacional", short: "Citas y recordatorios" }, { name: "Historial y consentimientos", short: "Documentación del paciente" }, { name: "CRM y presupuestos", short: "Tratamientos y financiación" }, { name: "Facturación y mutuas", short: "Cobros y aseguradoras" }, { name: "Fichaje y turnos", short: "Equipo clínico" }, { name: "Marketing y revisiones", short: "Pacientes que vuelven" }] },
    metrics: [{ value: "-62 %", label: "citas no presentadas" }, { value: "+27 %", label: "tratamientos aceptados" }, { value: "3 días", label: "para liquidar mutuas, antes 3 semanas" }],
    faqs: [
      { question: "¿Cumple con la protección de datos de salud?", answer: "Los datos de pacientes se quedan en vuestros sistemas. Los proveedores de IA se eligen con garantías de privacidad, no se usan los datos para entrenar modelos y se documenta qué se procesa y dónde, con vuestro delegado de protección de datos si lo tenéis." },
      { question: "¿Se integra con mi programa de gestión clínica?", answer: "Con la mayoría sí, por integración o por exportación. Si el programa no lo permite, el agente trabaja con la agenda y los datos que sí están disponibles." },
      { question: "¿Puede el agente dar información médica?", answer: "No. Responde sobre horarios, citas, precios y trámites, y deriva cualquier consulta clínica al profesional." },
    ],
    provinces: ["sevilla", "malaga", "madrid", "barcelona", "valencia", "granada"],
    match: ["salud", "clínic", "clinic", "sanitar"],
  },
  {
    slug: "asesorias-gestorias-despachos",
    name: "Asesorías, gestorías y despachos",
    forName: "para asesorías, gestorías y despachos",
    short: "Asesorías y despachos",
    title: "IA y automatización para asesorías, gestorías y despachos | Alpa Digital",
    description: "Documentación clasificada sola, facturas de clientes leídas y contabilizadas, consultas frecuentes respondidas y propuestas en minutos. Automatización con IA para asesorías fiscales, laborales, gestorías y despachos de abogados.",
    h1: "IA y automatización para asesorías, gestorías y despachos",
    intro: "Una asesoría vive de documentos: los que llegan de los clientes, los que hay que presentar y los que hay que explicar. Cada uno pasa por manos que podrían dedicarse a asesorar. La IA clasifica, extrae, registra y responde lo repetitivo, y deja a las personas el criterio.",
    pains: ["Documentación de clientes que llega por email, WhatsApp y papel sin orden", "Facturas de clientes que hay que picar una a una para contabilizar", "Las mismas preguntas de siempre en cada cierre trimestral", "Plazos y requerimientos que se controlan a mano", "Propuestas y presupuestos que se redactan desde cero"],
    automations: [
      { area: "Administración", title: "Documentación clasificada y archivada sola", text: "Cada documento que llega se identifica (factura, nómina, contrato, requerimiento), se asigna al cliente y al expediente y se archiva con su nombre correcto.", hours: 9 },
      { area: "Administración", title: "Facturas de clientes leídas y contabilizadas", text: "Las facturas se leen, se validan y se dejan preparadas en el programa contable, con aviso de las que no cuadran.", hours: 8 },
      { area: "Atención al cliente", title: "Consultas frecuentes respondidas al momento", text: "Un asistente responde por email y WhatsApp las dudas habituales (plazos, qué documentación enviar, estado de un trámite) con la información de cada cliente, y pasa el resto al asesor.", hours: 6 },
      { area: "Dirección", title: "Control de plazos y requerimientos", text: "Calendario fiscal y laboral por cliente, con avisos de lo que vence y de lo que falta por recibir.", hours: 2 },
      { area: "Ventas", title: "Propuestas en minutos", text: "A partir de una reunión o un email se redacta la propuesta con vuestras tarifas y se programa el seguimiento.", hours: 3 },
    ],
    system: { hub: "Agente del despacho por email y WhatsApp", modules: [{ name: "Bandeja inteligente", short: "Clasificación de documentos" }, { name: "Portal del cliente", short: "Documentos y estado de trámites" }, { name: "Calendario de plazos", short: "Fiscal y laboral por cliente" }, { name: "Facturación del despacho", short: "Cuotas y horas" }, { name: "CRM y propuestas", short: "Captación y seguimiento" }] },
    metrics: [{ value: "0", label: "facturas tecleadas a mano" }, { value: "-55 %", label: "emails de consulta que llegan al asesor" }, { value: "2 h", label: "al mes en control de plazos, antes 2 días" }],
    faqs: [
      { question: "¿Se integra con A3, Sage, Contasol o mi programa contable?", answer: "Trabajamos con los formatos de importación de los programas habituales y, cuando existe, con su API. Las facturas quedan preparadas para contabilizar." },
      { question: "¿El asistente puede responder cuestiones fiscales?", answer: "Responde lo operativo: plazos, documentación, estado de un trámite. Cualquier consulta de criterio la pasa al asesor con el contexto reunido." },
      { question: "¿Qué pasa con la confidencialidad?", answer: "Los datos se quedan en vuestros sistemas y se documenta qué se procesa y dónde. Trabajamos con proveedores con garantías de privacidad y sin uso de datos para entrenar." },
    ],
    provinces: ["sevilla", "madrid", "barcelona", "valencia", "malaga", "zaragoza"],
    match: ["servicios profesional", "asesor", "gestor", "despach"],
  },
  {
    slug: "distribucion-mayoristas",
    name: "Distribución y mayoristas",
    forName: "para distribuidores y mayoristas",
    short: "Distribución",
    title: "IA y automatización para distribuidores y mayoristas | Alpa Digital",
    description: "Pedidos por WhatsApp o foto convertidos en pedidos reales, stock por ubicación, tarifas por cliente, rutas de reparto y cobros vigilados. Automatización con IA para distribución y comercio mayorista.",
    h1: "IA y automatización para distribución y mayoristas",
    intro: "Un distribuidor vive de responder rápido y no fallar el pedido. Los pedidos llegan por WhatsApp, por email, por una foto de una lista escrita a mano, y alguien los teclea. Un agente que los entiende y los crea, con el stock y las tarifas a mano, cambia la velocidad de toda la empresa.",
    pains: ["Pedidos que llegan por cualquier canal y hay que teclear", "Consultas de stock y precio que interrumpen todo el día", "Roturas de stock y compras a destiempo", "Rutas de reparto hechas a mano y albaranes en papel", "Cobros vencidos que se reclaman tarde"],
    automations: [
      { area: "Ventas", title: "Pedidos por WhatsApp, email o foto", text: "El agente entiende el pedido (aunque sea una foto de una lista), lo confirma con la tarifa del cliente y el plazo, y lo crea en el sistema.", hours: 10 },
      { area: "Atención al cliente", title: "Stock y precios contestados al momento", text: "«¿Tenéis la referencia 4471?» se responde con stock real, precio con su tarifa y plazo, sin interrumpir a nadie.", hours: 6 },
      { area: "Operaciones", title: "Mínimos y propuestas de compra", text: "Cuando una referencia baja del mínimo, sale la propuesta de compra al proveedor habitual para aprobar en un clic.", hours: 3 },
      { area: "Operaciones", title: "Rutas y albaranes firmados en el móvil", text: "Rutas del día optimizadas, aviso al cliente con hora estimada y albarán firmado desde el móvil del repartidor.", hours: 4 },
      { area: "Administración", title: "Facturación y reclamación de cobros", text: "Factura al confirmar la entrega, vencimientos vigilados y recordatorios amables antes de que un impago sea un problema.", hours: 4 },
    ],
    system: { hub: "Agente de pedidos por WhatsApp y email", modules: [{ name: "Pedidos por WhatsApp", short: "Portal B2B conversacional" }, { name: "Stock y almacén", short: "Ubicaciones y mínimos" }, { name: "CRM y tarifas", short: "Clientes y precios" }, { name: "Rutas y reparto", short: "Prueba de entrega" }, { name: "Facturación y cobros", short: "Riesgo y vencimientos" }, { name: "Fichaje y partes", short: "Almacén y ruta" }] },
    metrics: [{ value: "2 min", label: "de mensaje a pedido confirmado" }, { value: "-40 %", label: "roturas de stock" }, { value: "-11 días", label: "de periodo medio de cobro" }],
    faqs: [
      { question: "¿Se integra con mi ERP?", answer: "Con los ERP habituales de distribución sí, por API o por importación. Los pedidos se crean en vuestro sistema, no en otro." },
      { question: "¿Y si el cliente pide una referencia descatalogada?", answer: "El agente lo detecta y propone la sustituta, con el precio del cliente, antes de confirmar." },
      { question: "¿Podemos empezar solo con los pedidos?", answer: "Sí, es lo habitual. Después suelen venir stock y cobros." },
    ],
    provinces: ["sevilla", "madrid", "barcelona", "valencia", "zaragoza", "murcia"],
    match: ["distrib", "comercio", "mayorista", "logíst"],
  },
  {
    slug: "comercio-ecommerce",
    name: "Comercio y tiendas online",
    forName: "para comercios y tiendas online",
    short: "Comercio y e-commerce",
    title: "IA y automatización para comercios y tiendas online | Alpa Digital",
    description: "Consultas de producto, pedidos y devoluciones atendidos 24 horas, fichas de producto generadas, stock sincronizado y campañas con tu voz. Automatización con IA para tiendas físicas y e-commerce.",
    h1: "IA y automatización para comercio y tiendas online",
    intro: "Una tienda pequeña compite con gigantes que responden al instante. Un agente que atiende consultas y pedidos por WhatsApp y web con vuestro catálogo real, fichas de producto que se escriben solas y campañas que salen cada semana ponen a un comercio de barrio al nivel de servicio de los grandes.",
    pains: ["Preguntas de disponibilidad, tallas y envíos a todas horas", "Fichas de producto que nunca están completas", "Stock distinto en tienda y en la web", "Devoluciones y cambios gestionados a mano", "Campañas y newsletters que no salen por falta de tiempo"],
    automations: [
      { area: "Atención al cliente", title: "Consultas y pedidos atendidos 24 horas", text: "Disponibilidad, tallas, envíos y estado del pedido respondidos con datos reales por WhatsApp, web e Instagram.", hours: 8 },
      { area: "Marketing", title: "Fichas de producto generadas", text: "A partir de fotos y datos del proveedor, fichas completas con vuestro tono, listas para revisar y publicar.", hours: 5 },
      { area: "Operaciones", title: "Stock sincronizado y reposición", text: "Tienda física y web con el mismo stock, y propuestas de reposición cuando algo se agota.", hours: 3 },
      { area: "Administración", title: "Devoluciones y cambios sin fricción", text: "El cliente inicia la devolución hablando con el agente; la etiqueta, el abono y el aviso al almacén salen solos.", hours: 3 },
      { area: "Marketing", title: "Campañas semanales con tu voz", text: "Newsletter y publicaciones a partir de novedades y temporada, aprobadas en dos minutos.", hours: 3 },
    ],
    system: { hub: "Agente de la tienda por WhatsApp, web e Instagram", modules: [{ name: "Atención y pedidos", short: "Multicanal" }, { name: "Catálogo y fichas", short: "Generación y publicación" }, { name: "Stock unificado", short: "Tienda y web" }, { name: "Devoluciones", short: "Autoservicio" }, { name: "Campañas", short: "Newsletter y redes" }] },
    metrics: [{ value: "24 h", label: "de atención sin ampliar plantilla" }, { value: "×4", label: "fichas de producto publicadas por semana" }, { value: "-50 %", label: "tiempo en devoluciones" }],
    faqs: [
      { question: "¿Funciona con Shopify, WooCommerce o PrestaShop?", answer: "Sí, con las tres y con la mayoría de plataformas, por API. El agente lee catálogo, stock y pedidos de la tienda." },
      { question: "¿El agente puede vender?", answer: "Puede recomendar, resolver dudas y preparar el pedido. El cobro se hace en vuestra pasarela, como siempre." },
      { question: "¿Y si prefiero atender yo a los clientes?", answer: "El agente atiende lo repetitivo y te pasa lo demás con el contexto. Tú decides qué responde solo y qué no." },
    ],
    provinces: ["sevilla", "madrid", "barcelona", "valencia", "malaga", "alicante"],
    match: ["comercio", "tienda", "moda", "textil", "calzado", "mueble"],
  },
  {
    slug: "hosteleria-restaurantes-hoteles",
    name: "Hostelería, restaurantes y hoteles",
    forName: "para hostelería, restaurantes y hoteles",
    short: "Hostelería",
    title: "IA y automatización para hostelería, restaurantes y hoteles | Alpa Digital",
    description: "Reservas y dudas respondidas 24 horas, reseñas contestadas, facturas de proveedores y escandallos al día, turnos y extras. Automatización con IA para restaurantes, hoteles y apartamentos turísticos.",
    h1: "IA y automatización para hostelería, restaurantes y hoteles",
    intro: "En hostelería todo el mundo llama a la vez y en temporada no hay manos. Un agente que gestiona reservas, cambios y preguntas frecuentes en varios idiomas, y una administración que lee facturas de proveedores y actualiza escandallos sola, dejan al equipo con el cliente que está en la mesa.",
    pains: ["Reservas y preguntas por teléfono, WhatsApp, Instagram y portales, a la vez", "Reseñas sin responder y clientes de temporada que no vuelven", "Facturas de proveedores y precios que cambian cada semana", "Turnos, extras y selección en temporada alta", "Presupuestos de grupos y eventos que se pierden"],
    automations: [
      { area: "Atención al cliente", title: "Reservas y dudas 24 horas en varios idiomas", text: "El agente gestiona reservas, cambios, alergias y preguntas frecuentes por WhatsApp, web y redes, y lo vuelca en vuestro sistema de reservas.", hours: 9 },
      { area: "Marketing", title: "Reseñas respondidas y campañas de temporada", text: "Cada reseña se responde con vuestro tono y las campañas de temporada salen programadas.", hours: 4 },
      { area: "Administración", title: "Facturas de proveedores y escandallos al día", text: "Facturas leídas, precios actualizados y coste por plato o servicio recalculado sin teclear.", hours: 6 },
      { area: "Recursos humanos", title: "Turnos, extras y selección en temporada", text: "Cuadrantes, cambios de turno por WhatsApp y cribado de candidaturas para la temporada.", hours: 3 },
      { area: "Ventas", title: "Presupuestos de grupos y eventos", text: "A partir de la solicitud, propuesta con menús, precios y condiciones, con seguimiento programado.", hours: 2 },
    ],
    system: { hub: "Agente del local por WhatsApp, web y redes", modules: [{ name: "Reservas conversacionales", short: "Multicanal y multiidioma" }, { name: "Reseñas y campañas", short: "Reputación" }, { name: "Compras y escandallos", short: "Proveedores y costes" }, { name: "Turnos y personal", short: "Temporada" }, { name: "Grupos y eventos", short: "Presupuestos" }] },
    metrics: [{ value: "100 %", label: "reseñas respondidas en 24 h" }, { value: "-35 %", label: "llamadas en horas de servicio" }, { value: "1 h", label: "a la semana en facturas de proveedores" }],
    faqs: [
      { question: "¿Se integra con mi sistema de reservas (CoverManager, TheFork, el PMS del hotel)?", answer: "Con los habituales sí. El agente crea y modifica reservas en vuestro sistema, no en otro." },
      { question: "¿Responde en inglés, francés o alemán?", answer: "Sí. Detecta el idioma del cliente y responde en él con la información real del local." },
      { question: "¿Y para un alquiler vacacional?", answer: "Igual: check-in, dudas de la casa, recomendaciones y incidencias, 24 horas." },
    ],
    provinces: ["malaga", "cadiz", "sevilla", "baleares", "las-palmas", "alicante"],
    match: ["hosteler", "turismo", "restaur", "hotel"],
  },
  {
    slug: "inmobiliarias-administracion-fincas",
    name: "Inmobiliarias y administración de fincas",
    forName: "para inmobiliarias y administradores de fincas",
    short: "Inmobiliarias y fincas",
    title: "IA y automatización para inmobiliarias y administración de fincas | Alpa Digital",
    description: "Contactos de portales cualificados y visitas agendadas, inquilinos y propietarios atendidos al momento, contratos y recibos generados, fichas de inmuebles en minutos. Automatización con IA para inmobiliarias y administradores de fincas.",
    h1: "IA y automatización para inmobiliarias y administración de fincas",
    intro: "Cada contacto de portal que no se responde en minutos se pierde. Y cada comunidad de propietarios genera incidencias, recibos y dudas que llegan a todas horas. Un agente que cualifica, agenda, atiende y documenta convierte la velocidad en operaciones cerradas y comunidades tranquilas.",
    pains: ["Contactos de portales que se responden tarde", "Visitas que se agendan por teléfono y se olvidan", "Incidencias de comunidades por WhatsApp a cualquier hora", "Contratos, recibos y liquidaciones hechos a mano", "Fichas de inmuebles que tardan en publicarse"],
    automations: [
      { area: "Ventas", title: "Contactos cualificados y visitas agendadas", text: "Cada contacto de portal o web recibe respuesta al momento, se cualifica y sale con visita agendada en la agenda del comercial.", hours: 9 },
      { area: "Atención al cliente", title: "Inquilinos y propietarios atendidos al momento", text: "Incidencias, recibos y dudas resueltas por WhatsApp, con parte creado para el técnico cuando toca y aviso al propietario.", hours: 7 },
      { area: "Administración", title: "Contratos, recibos y liquidaciones", text: "Documentación generada a partir de los datos de cada inmueble y cliente, y liquidaciones a propietarios preparadas.", hours: 6 },
      { area: "Marketing", title: "Fichas y publicaciones en minutos", text: "Descripción, publicación en portales y redes a partir de fotos y datos del inmueble.", hours: 4 },
      { area: "Dirección", title: "Cartera, visitas y cierres cada semana", text: "Informe semanal de captación, visitas, ofertas y operaciones cerradas por comercial.", hours: 2 },
    ],
    system: { hub: "Agente de la agencia por WhatsApp, portales y web", modules: [{ name: "Captación y visitas", short: "Cualificación y agenda" }, { name: "Atención a comunidades", short: "Incidencias y recibos" }, { name: "Documentación", short: "Contratos y liquidaciones" }, { name: "Fichas y portales", short: "Publicación" }, { name: "CRM inmobiliario", short: "Cartera y seguimiento" }] },
    metrics: [{ value: "1 min", label: "tiempo de respuesta a un contacto de portal" }, { value: "+40 %", label: "visitas agendadas por contacto" }, { value: "-60 %", label: "llamadas de comunidades a la oficina" }],
    faqs: [
      { question: "¿Se conecta con Idealista, Fotocasa y mi CRM?", answer: "Los contactos de los portales entran por email o API y se cualifican y registran en vuestro CRM. Las fichas se publican en los portales que uséis." },
      { question: "¿El agente puede negociar precios?", answer: "No. Informa, cualifica y agenda. Cualquier negociación la pasa al comercial con el contexto." },
      { question: "¿Sirve para administración de fincas sin inmobiliaria?", answer: "Sí. La atención a comunidades, incidencias, recibos y documentación funciona de forma independiente." },
    ],
    provinces: ["malaga", "sevilla", "madrid", "alicante", "baleares", "cadiz"],
    match: ["inmobil", "finca"],
  },
  {
    slug: "industria-talleres",
    name: "Industria, talleres y fabricación",
    forName: "para industria, talleres y fabricación",
    short: "Industria y talleres",
    title: "IA y automatización para industria, talleres y fabricación | Alpa Digital",
    description: "Presupuestos técnicos en minutos, albaranes y partes sin picar datos, seguimiento de pedidos sin llamadas, documentación de calidad al día. Automatización con IA para talleres, industria auxiliar y fabricantes.",
    h1: "IA y automatización para industria, talleres y fabricación",
    intro: "En un taller o una fábrica pequeña la oficina técnica presupuesta, la administración pica albaranes y alguien atiende las llamadas de «¿cómo va mi pedido?». Un agente que prepara presupuestos técnicos, registra documentos y responde con el estado real de producción devuelve horas a la gente que sabe.",
    pains: ["Presupuestos técnicos que tardan días y quitan tiempo a producción", "Albaranes, facturas y partes de trabajo picados a mano", "Llamadas de clientes preguntando por el estado de su pedido", "Documentación de calidad y certificaciones dispersas", "Mantenimiento y calibraciones controlados en hojas de cálculo"],
    automations: [
      { area: "Ventas", title: "Presupuestos técnicos en minutos", text: "A partir de un plano, un email o una llamada transcrita, el presupuesto se prepara con vuestros materiales, tiempos y márgenes, listo para revisar.", hours: 6 },
      { area: "Administración", title: "Albaranes, facturas y partes sin picar datos", text: "Documentos de proveedores y partes de trabajo leídos y registrados en vuestro ERP, cuadrados con pedidos.", hours: 9 },
      { area: "Atención al cliente", title: "Estado de pedidos sin llamadas", text: "El cliente pregunta y recibe el estado real de producción y entrega, con aviso automático en cada hito.", hours: 5 },
      { area: "Operaciones", title: "Calidad, certificaciones y mantenimiento", text: "Documentación de calidad al día, certificados generados y avisos de calibración y mantenimiento preventivo.", hours: 3 },
      { area: "Dirección", title: "Producción, incidencias y cobros cada semana", text: "Informe semanal de carga, incidencias, pedidos pendientes y cobros vencidos.", hours: 2 },
    ],
    system: { hub: "Agente de planta por WhatsApp, voz y email", modules: [{ name: "Presupuestos técnicos", short: "Planos y materiales" }, { name: "Documentación y ERP", short: "Albaranes y partes" }, { name: "Seguimiento de pedidos", short: "Portal del cliente" }, { name: "Calidad y mantenimiento", short: "Certificados y avisos" }, { name: "Cuadro de mando", short: "Producción y cobros" }] },
    metrics: [{ value: "1 día", label: "para un presupuesto técnico, antes una semana" }, { value: "0", label: "albaranes tecleados a mano" }, { value: "-70 %", label: "llamadas de seguimiento de pedidos" }],
    faqs: [
      { question: "¿Se integra con mi ERP industrial?", answer: "Con los habituales sí, por API o importación. Los documentos y pedidos se registran en vuestro sistema." },
      { question: "¿Puede leer planos?", answer: "Extrae cotas, materiales y cantidades de planos y fichas técnicas para preparar el presupuesto. La revisión final la hace vuestra oficina técnica." },
      { question: "¿Y la documentación de calidad ISO?", answer: "Se genera y archiva con la trazabilidad que exige la norma, y se prepara la documentación para auditorías." },
    ],
    provinces: ["sevilla", "barcelona", "bizkaia", "valencia", "zaragoza", "gipuzkoa"],
    match: ["industr", "metal", "taller", "automo", "fabric", "cerámic", "química"],
  },
  {
    slug: "transporte-logistica",
    name: "Transporte y logística",
    forName: "para empresas de transporte y logística",
    short: "Transporte y logística",
    title: "IA y automatización para transporte y logística | Alpa Digital",
    description: "Rutas, albaranes firmados en el móvil, incidencias registradas al momento, presupuestos de portes y documentación de conductores. Automatización con IA para transportistas, agencias de transporte y operadores logísticos.",
    h1: "IA y automatización para transporte y logística",
    intro: "En transporte el margen se pierde en las horas muertas: rutas hechas a mano, albaranes en papel, incidencias que se enteran tarde y presupuestos de portes que se calculan a ojo. Un agente que organiza, documenta y responde convierte cada furgoneta y cada camión en una operación que se ve.",
    pains: ["Presupuestos de portes calculados a mano y con retraso", "Rutas hechas cada mañana sin optimizar", "Albaranes en papel que se pierden y retrasan facturas", "Incidencias de entrega de las que se entera la oficina al día siguiente", "Documentación de conductores y vehículos con caducidades sin controlar"],
    automations: [
      { area: "Ventas", title: "Presupuestos de portes al momento", text: "A partir de origen, destino, mercancía y plazo, el presupuesto sale con vuestras tarifas y condiciones, listo para enviar.", hours: 5 },
      { area: "Operaciones", title: "Rutas del día y aviso al cliente", text: "Rutas optimizadas por zona y prioridad, con aviso al cliente de la hora estimada.", hours: 6 },
      { area: "Operaciones", title: "Albarán firmado en el móvil e incidencias", text: "Prueba de entrega con firma y foto, e incidencias registradas al momento con abono o reclamación preparados.", hours: 6 },
      { area: "Administración", title: "Facturación al entregar y cobros", text: "Factura al confirmar la entrega, vencimientos vigilados y reclamación automática.", hours: 4 },
      { area: "Recursos humanos", title: "Documentación de conductores y vehículos", text: "Caducidades de carnets, tacógrafos, ITV y seguros controladas con avisos.", hours: 2 },
    ],
    system: { hub: "Agente de tráfico por WhatsApp y voz", modules: [{ name: "Presupuestos de portes", short: "Tarifas y condiciones" }, { name: "Planificación de rutas", short: "Zonas y prioridades" }, { name: "Prueba de entrega", short: "Firma, foto e incidencias" }, { name: "Facturación y cobros", short: "Al entregar" }, { name: "Flota y conductores", short: "Documentación" }] },
    metrics: [{ value: "97 %", label: "entregas a tiempo" }, { value: "-11 días", label: "de periodo medio de cobro" }, { value: "0", label: "albaranes perdidos" }],
    faqs: [
      { question: "¿Se integra con mi programa de gestión de transporte?", answer: "Con los habituales sí. Los albaranes, incidencias y facturas se registran en vuestro sistema." },
      { question: "¿Necesitan los conductores una app?", answer: "No. Firma, foto e incidencias van por WhatsApp o por una página web sencilla en el móvil." },
      { question: "¿Sirve para un transportista con dos camiones?", answer: "Sí. Cuanto más pequeña la empresa, más pesa el tiempo de oficina. Se empieza por presupuestos o albaranes." },
    ],
    provinces: ["sevilla", "madrid", "guadalajara", "zaragoza", "barcelona", "valencia"],
    match: ["transporte", "logíst", "reparto"],
  },
  {
    slug: "agroalimentario-cooperativas",
    name: "Agroalimentario y cooperativas",
    forName: "para empresas agroalimentarias y cooperativas",
    short: "Agroalimentario",
    title: "IA y automatización para empresas agroalimentarias y cooperativas | Alpa Digital",
    description: "Pedidos y albaranes sin teclear, trazabilidad y documentación de exportación, comunicación con socios y campañas gestionadas sin desbordar la oficina. Automatización con IA para cooperativas, almazaras, bodegas y comercializadoras.",
    h1: "IA y automatización para agroalimentario y cooperativas",
    intro: "En campaña, la oficina de una cooperativa o una comercializadora recibe en dos meses el trabajo de un año: pedidos, albaranes, entradas de socios, certificados y documentación de exportación. Un agente que lee, registra y responde, y unas herramientas que llevan la trazabilidad solas, hacen que la campaña no desborde a nadie.",
    pains: ["Pedidos de clientes y distribuidores que llegan por email y WhatsApp y se teclean", "Albaranes de entrada y salida en papel", "Documentación de exportación y certificados preparados a mano", "Socios que llaman para saber liquidaciones y entregas", "Campañas que desbordan a la oficina"],
    automations: [
      { area: "Ventas", title: "Pedidos de distribuidores sin teclear", text: "Pedidos por email o WhatsApp convertidos en pedidos reales con tarifa del cliente, confirmados y en preparación.", hours: 8 },
      { area: "Administración", title: "Albaranes y trazabilidad", text: "Entradas y salidas registradas desde el móvil, con lotes y trazabilidad completa sin picar datos.", hours: 8 },
      { area: "Administración", title: "Documentación de exportación y certificados", text: "Certificados, packing lists y documentación de cada envío generados a partir del pedido.", hours: 5 },
      { area: "Atención al cliente", title: "Socios atendidos al momento", text: "Liquidaciones, entregas y avisos de campaña respondidos por WhatsApp con los datos de cada socio.", hours: 5 },
      { area: "Marketing", title: "Ventas directas y enoturismo", text: "Reservas de visitas, pedidos de tienda online y campañas de temporada gestionados por el agente.", hours: 2 },
    ],
    system: { hub: "Agente de la cooperativa por WhatsApp y email", modules: [{ name: "Pedidos B2B", short: "Distribuidores y tarifas" }, { name: "Trazabilidad", short: "Lotes y albaranes" }, { name: "Exportación", short: "Certificados y documentación" }, { name: "Portal del socio", short: "Entregas y liquidaciones" }, { name: "Venta directa", short: "Tienda y visitas" }] },
    metrics: [{ value: "0", label: "pedidos tecleados en campaña" }, { value: "2 min", label: "para la documentación de un envío" }, { value: "-60 %", label: "llamadas de socios a la oficina" }],
    faqs: [
      { question: "¿Se integra con mi programa de gestión de cooperativa?", answer: "Con los habituales sí, por API o importación. Los pedidos, albaranes y liquidaciones viven en vuestro sistema." },
      { question: "¿Cumple con los requisitos de trazabilidad?", answer: "Sí. Cada lote queda registrado con su origen, entradas y salidas, y la documentación se genera con esa trazabilidad." },
      { question: "¿Podemos activarlo solo en campaña?", answer: "Se puede dimensionar por campaña. El acompañamiento mensual no tiene permanencia." },
    ],
    provinces: ["sevilla", "jaen", "cordoba", "huelva", "almeria", "murcia"],
    match: ["agro", "agricul", "vitivin", "aceite", "cooperativa", "frutos", "cítric", "porcino", "lácteo"],
  },
];

export function getSector(slug: string): SectorDef | undefined {
  return sectors.find((s) => s.slug === slug);
}

/** Sector relacionado con una etiqueta de sector de provincia ("Mueble en Lucena", "Turismo y hostelería"...). */
export function sectorForLabel(label: string): SectorDef | undefined {
  const key = label.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  return sectors.find((s) => s.match.some((m) => key.includes(m.normalize("NFD").replace(/[\u0300-\u036f]/g, ""))));
}
