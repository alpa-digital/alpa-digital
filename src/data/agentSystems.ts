import type { IconName } from "@/data/automationFlows";

export interface SystemModule {
  id: string;
  name: string;
  short: string;
  icon: IconName;
  users: string;
  description: string;
  features: string[];
  metric: { value: string; label: string };
  log: string[];
}

export interface CompanySystem {
  id: string;
  company: string;
  sector: string;
  size: string;
  hub: { label: string; sub: string };
  intro: string;
  modules: SystemModule[];
}

export const agentSystems: CompanySystem[] = [
  {
    id: "electrica",
    company: "Voltia Instalaciones",
    sector: "Instalaciones eléctricas",
    size: "24 personas · 6 furgonetas",
    hub: { label: "Agente de Voltia", sub: "WhatsApp · voz · web" },
    intro:
      "Una empresa de instalaciones eléctricas no necesita seis programas distintos. Necesita un agente al que los técnicos hablen desde la obra y las herramientas justas detrás: certificaciones, control de material, CRM, fichaje, marketing y administración. Todo lo desarrollamos a medida y conectado.",
    modules: [
      {
        id: "certificaciones",
        name: "Certificación de obras",
        short: "Asistente conversacional",
        icon: "file",
        users: "Técnicos en obra y oficina técnica",
        description:
          "El técnico le dice al agente «certifica la obra de Calle Mayor 12». El agente recupera los datos del proyecto, pide las fotos y mediciones que faltan y genera el certificado o boletín listo para firmar.",
        features: ["Boletines y certificados generados desde una conversación", "Fotos y mediciones adjuntadas desde el móvil", "Firma y envío al cliente y a Industria", "Expediente archivado por obra"],
        metric: { value: "4 min", label: "por certificado, desde la obra" },
        log: [
          "Javi (WhatsApp): «Certifica la obra de Calle Mayor 12»",
          "Agente: recupera datos de la obra · pide 2 fotos del cuadro y la lectura de tierra",
          "Agente: certificado generado con los datos · enviado a Javi para firmar",
          "Certificado firmado · enviado al cliente y archivado en el expediente",
        ],
      },
      {
        id: "herramientas",
        name: "Control de herramientas",
        short: "Tracking por QR y furgoneta",
        icon: "package",
        users: "Encargados y técnicos",
        description:
          "Cada herramienta lleva un QR. Al salir y volver de obra se escanea, y el agente sabe en todo momento qué hay en cada furgoneta, quién la tiene y qué toca calibrar o revisar.",
        features: ["Inventario en tiempo real por furgoneta y obra", "Avisos de calibración y revisión", "Consulta por voz: «¿dónde está la taladradora grande?»", "Historial de pérdidas y reposiciones"],
        metric: { value: "0", label: "herramientas perdidas este trimestre" },
        log: [
          "Furgoneta 3 sale a obra · 14 herramientas escaneadas",
          "Agente: la pinza amperimétrica nº 8 necesita calibración en 5 días",
          "Encargado (voz): «¿Dónde está la taladradora grande?» → en la furgoneta 2, obra Polígono Sur",
          "Devolución registrada a las 18:20 · inventario cuadrado",
        ],
      },
      {
        id: "crm",
        name: "CRM de obras y clientes",
        short: "Presupuestos y seguimiento",
        icon: "users",
        users: "Gerencia y comerciales",
        description:
          "Clientes, obras, presupuestos y estado de cada trabajo en un solo sitio, alimentado por el agente: cada llamada, visita o email queda registrado sin que nadie lo teclee.",
        features: ["Ficha de cliente con todas sus obras", "Presupuestos generados desde una visita", "Seguimiento automático de presupuestos sin respuesta", "Estado de obra visible para el cliente"],
        metric: { value: "+31 %", label: "presupuestos aceptados" },
        log: [
          "Visita de Marta a Comunidad Los Olivos · notas dictadas por voz",
          "Agente: presupuesto de sustitución de cuadro general preparado",
          "Presupuesto enviado · seguimiento programado a los 5 días",
          "Cliente acepta · obra creada y asignada al equipo de Javi",
        ],
      },
      {
        id: "fichaje",
        name: "Fichaje y horas",
        short: "RRHH desde el móvil",
        icon: "clock",
        users: "Todo el equipo y administración",
        description:
          "Los técnicos fichan por WhatsApp o desde la app al llegar a la obra, con ubicación. El agente prepara los partes de horas por obra y avisa de horas extra y descansos antes de que sean un problema.",
        features: ["Fichaje con ubicación por obra", "Partes de horas y costes por proyecto", "Avisos de horas extra y ausencias", "Exportación a la gestoría a fin de mes"],
        metric: { value: "1 clic", label: "para cerrar las horas del mes" },
        log: [
          "07:58 · Javi ficha entrada en Calle Mayor 12 (ubicación verificada)",
          "Agente: parte de horas de la obra actualizado · 6,5 h imputadas",
          "Agente: aviso a administración · Luis acumula 9 h extra esta semana",
          "Fin de mes: horas por obra y empleado enviadas a la gestoría",
        ],
      },
      {
        id: "marketing",
        name: "Marketing local",
        short: "Obras terminadas → clientes nuevos",
        icon: "megaphone",
        users: "Gerencia",
        description:
          "Cada obra terminada se convierte en contenido: fotos del antes y después, reseña solicitada al cliente y publicaciones para la zona. El agente lo prepara y alguien lo aprueba.",
        features: ["Petición de reseñas al cerrar la obra", "Publicaciones con fotos reales de cada trabajo", "Campañas por zona y tipo de instalación", "Respuesta a reseñas con vuestro tono"],
        metric: { value: "×3", label: "reseñas en Google en 6 meses" },
        log: [
          "Obra cerrada: instalación fotovoltaica en Chalet Pinar",
          "Agente: reseña solicitada al cliente · publicación preparada con 3 fotos",
          "Cliente deja 5 estrellas · agente responde con vuestro tono",
          "Publicación aprobada por Marta · programada para el jueves",
        ],
      },
      {
        id: "compras",
        name: "Compras y facturas",
        short: "Material y facturas por obra",
        icon: "receipt",
        users: "Administración y encargados",
        description:
          "Pedidos de material a proveedores desde la obra, albaranes y facturas leídos por el agente y asignados a cada proyecto. Sabéis lo que cuesta cada obra de verdad, no al final.",
        features: ["Pedidos a proveedores por voz o WhatsApp", "Albaranes y facturas asignados a cada obra", "Coste real frente a presupuesto en todo momento", "Asientos preparados para contabilidad"],
        metric: { value: "6 h", label: "de administración a la semana ahorradas" },
        log: [
          "Javi (voz): «Pide 40 m de manguera 3×2,5 para Calle Mayor 12»",
          "Agente: pedido enviado a Suministros Eléctricos del Sur · confirmación recibida",
          "Albarán y factura leídos · imputados a la obra · coste al 82 % del presupuesto",
          "Asiento preparado en contabilidad · vencimiento 60 días",
        ],
      },
    ],
  },
  {
    id: "clinica",
    company: "Clínica Dental Arce",
    sector: "Salud · clínica dental",
    size: "3 consultas · 11 personas",
    hub: { label: "Agente de la clínica", sub: "WhatsApp · teléfono · web" },
    intro:
      "En una clínica el teléfono no para y la recepción hace de agenda, caja, archivo y marketing a la vez. Un agente en el centro atiende, agenda y recuerda; las herramientas a medida hacen el resto.",
    modules: [
      {
        id: "agenda",
        name: "Agenda conversacional",
        short: "Citas por WhatsApp y teléfono",
        icon: "calendar",
        users: "Pacientes y recepción",
        description:
          "Los pacientes piden, cambian y confirman citas hablando con el agente. Los huecos se rellenan solos desde la lista de espera y los recordatorios reducen las ausencias.",
        features: ["Reserva y cambio de cita por WhatsApp o llamada", "Recordatorios y confirmaciones automáticas", "Lista de espera que rellena los huecos", "Agenda por profesional y gabinete"],
        metric: { value: "-62 %", label: "citas no presentadas" },
        log: [
          "Paciente (WhatsApp): «¿Puedo cambiar la cita del jueves a la tarde?»",
          "Agente: 3 huecos disponibles con la Dra. Arce · paciente elige 17:30",
          "Hueco del jueves ofrecido a la lista de espera · aceptado en 4 min",
          "Recordatorio enviado 24 h antes · cita confirmada",
        ],
      },
      {
        id: "historial",
        name: "Historial y consentimientos",
        short: "Documentación del paciente",
        icon: "clipboard",
        users: "Odontólogos y auxiliares",
        description:
          "Historia clínica, consentimientos firmados en tableta y evolución de cada tratamiento, dictados por voz durante la consulta y archivados en el expediente del paciente.",
        features: ["Consentimientos firmados en tableta", "Evolución dictada por voz en consulta", "Radiografías y fotos en el expediente", "Alertas de alergias y medicación"],
        metric: { value: "0", label: "papeles en la consulta" },
        log: [
          "Dra. Arce (voz): «Endodoncia pieza 26 completada, control en 15 días»",
          "Agente: evolución registrada · cita de control propuesta",
          "Consentimiento de la siguiente fase firmado en tableta",
          "Expediente actualizado · alerta de alergia a penicilina visible",
        ],
      },
      {
        id: "presupuestos",
        name: "CRM y presupuestos",
        short: "Tratamientos y financiación",
        icon: "users",
        users: "Recepción y dirección",
        description:
          "Cada plan de tratamiento se presupuesta en la propia consulta, se envía al paciente y se hace seguimiento de los que no han empezado, con opciones de financiación.",
        features: ["Presupuesto generado antes de que el paciente salga", "Seguimiento de presupuestos pendientes", "Opciones de pago y financiación", "Historial comercial por paciente"],
        metric: { value: "+27 %", label: "tratamientos aceptados" },
        log: [
          "Plan de tratamiento: ortodoncia invisible · 18 meses",
          "Agente: presupuesto con 3 opciones de pago enviado al paciente",
          "Sin respuesta en 7 días · agente envía recordatorio amable",
          "Paciente acepta financiación en 12 meses · primera cita agendada",
        ],
      },
      {
        id: "turnos",
        name: "Fichaje y turnos",
        short: "RRHH del equipo clínico",
        icon: "clock",
        users: "Todo el equipo",
        description:
          "Turnos por gabinete, fichaje desde el móvil, vacaciones y sustituciones gestionadas por el agente, con las horas listas para la gestoría.",
        features: ["Cuadrante de turnos por gabinete", "Fichaje desde el móvil", "Vacaciones y cambios de turno por WhatsApp", "Exportación mensual a la gestoría"],
        metric: { value: "2 h", label: "al mes en cuadrantes, antes 2 días" },
        log: [
          "Auxiliar (WhatsApp): «¿Puedo cambiar el turno del viernes con Ana?»",
          "Agente: Ana acepta · cuadrante actualizado · dirección avisada",
          "Fichajes del día registrados · 0 incidencias",
          "Horas de agosto exportadas a la gestoría",
        ],
      },
      {
        id: "recall",
        name: "Marketing y revisiones",
        short: "Pacientes que vuelven",
        icon: "megaphone",
        users: "Dirección",
        description:
          "Recordatorios de revisión anual, campañas de higiene y blanqueamiento y reseñas solicitadas tras cada tratamiento, con el tono de la clínica.",
        features: ["Recordatorios de revisión por paciente", "Campañas estacionales segmentadas", "Reseñas solicitadas tras el tratamiento", "Contenido de salud dental aprobado en 2 minutos"],
        metric: { value: "38 %", label: "de pacientes inactivos recuperados" },
        log: [
          "Agente: 64 pacientes sin revisión en 14 meses",
          "Campaña de revisión enviada por WhatsApp con 2 huecos sugeridos",
          "22 citas agendadas en 48 h",
          "Reseña solicitada a los pacientes de la semana · 6 nuevas",
        ],
      },
      {
        id: "facturacion",
        name: "Facturación y mutuas",
        short: "Cobros y aseguradoras",
        icon: "receipt",
        users: "Recepción y administración",
        description:
          "Facturas emitidas al cerrar la cita, cobros conciliados y liquidaciones de mutuas preparadas por el agente, con avisos de lo que queda pendiente.",
        features: ["Factura al cerrar la cita", "Conciliación de cobros con el banco", "Liquidaciones por aseguradora", "Avisos de pagos pendientes"],
        metric: { value: "3 días", label: "para liquidar mutuas, antes 3 semanas" },
        log: [
          "Cita cerrada · factura emitida y enviada al paciente",
          "Agente: cobro con tarjeta conciliado con el banco",
          "Liquidación mensual de la mutua preparada · 41 actos",
          "Aviso: 2 facturas pendientes de más de 30 días",
        ],
      },
    ],
  },
  {
    id: "distribucion",
    company: "Distribuciones Norte",
    sector: "Distribución mayorista",
    size: "2 almacenes · 38 personas",
    hub: { label: "Agente de Norte", sub: "WhatsApp · email · portal" },
    intro:
      "Un distribuidor vive de responder rápido y no fallar en el pedido. Un agente en el centro recibe pedidos por cualquier canal; las herramientas a medida controlan stock, rutas, tarifas y cobros.",
    modules: [
      {
        id: "pedidos",
        name: "Pedidos por WhatsApp",
        short: "Portal B2B por WhatsApp",
        icon: "whatsapp",
        users: "Clientes y comerciales",
        description:
          "Los clientes piden como siempre, por WhatsApp o email, incluso con una foto de la lista. El agente entiende el pedido, lo confirma con precio y plazo y lo crea en el sistema.",
        features: ["Pedidos por WhatsApp, email o foto", "Confirmación con tarifa del cliente y plazo", "Pedido creado sin teclear", "Historial y repetición de pedidos"],
        metric: { value: "2 min", label: "de mensaje a pedido confirmado" },
        log: [
          "Cliente (WhatsApp): foto de una lista escrita a mano con 9 referencias",
          "Agente: 9 líneas reconocidas · 1 referencia descatalogada → sustituta propuesta",
          "Pedido confirmado con su tarifa · entrega el miércoles",
          "Pedido creado en el sistema y en preparación en almacén",
        ],
      },
      {
        id: "stock",
        name: "Stock y almacén",
        short: "Ubicaciones y mínimos",
        icon: "package",
        users: "Almacén y compras",
        description:
          "Inventario por ubicación en cada almacén, mínimos que lanzan propuestas de compra y un agente al que preguntar «¿cuánto queda del 4471?» sin abrir nada.",
        features: ["Inventario por ubicación y almacén", "Propuestas de compra automáticas", "Consulta por voz o chat", "Recuento con el móvil"],
        metric: { value: "-40 %", label: "roturas de stock" },
        log: [
          "Ref. 4471 por debajo del mínimo en almacén Norte",
          "Agente: propuesta de compra de 400 uds. al proveedor habitual",
          "Compras aprueba en 1 clic · pedido enviado",
          "Entrada registrada con el móvil · ubicación B-12 actualizada",
        ],
      },
      {
        id: "crm",
        name: "CRM y tarifas",
        short: "Clientes, precios y visitas",
        icon: "users",
        users: "Comerciales y dirección",
        description:
          "Cada cliente con su tarifa, sus condiciones y su historial. Los comerciales dictan las visitas por voz y el agente prepara ofertas y avisa de clientes que llevan tiempo sin pedir.",
        features: ["Tarifas y condiciones por cliente", "Visitas dictadas por voz", "Avisos de clientes inactivos", "Ofertas personalizadas por historial"],
        metric: { value: "+18 %", label: "ventas a clientes existentes" },
        log: [
          "Agente: 12 clientes sin pedir en 45 días",
          "Comercial (voz): «Visita a Ferretería Salas, interesados en la nueva gama»",
          "Oferta preparada con su tarifa y descuento de lanzamiento",
          "Pedido recibido 2 días después · cliente reactivado",
        ],
      },
      {
        id: "rutas",
        name: "Rutas y reparto",
        short: "Entregas y prueba de entrega",
        icon: "timer",
        users: "Repartidores y logística",
        description:
          "Rutas del día optimizadas, aviso al cliente con la hora estimada y albarán firmado desde el móvil del repartidor. Las incidencias entran al agente al momento.",
        features: ["Rutas optimizadas por zona y prioridad", "Aviso al cliente con hora estimada", "Albarán firmado en el móvil", "Incidencias registradas en la entrega"],
        metric: { value: "97 %", label: "entregas a tiempo" },
        log: [
          "Ruta del día generada · 23 entregas · 2 furgonetas",
          "Cliente avisado: entrega entre 10:00 y 11:00",
          "Albarán firmado en el móvil · foto de la mercancía",
          "Incidencia: 1 caja dañada · abono preparado automáticamente",
        ],
      },
      {
        id: "fichaje",
        name: "Fichaje y partes",
        short: "RRHH de almacén y reparto",
        icon: "clock",
        users: "Todo el equipo",
        description:
          "Fichaje en almacén y en ruta, turnos por temporada y partes de horas por equipo listos para la gestoría, con avisos de horas extra.",
        features: ["Fichaje en almacén y en ruta", "Turnos por temporada", "Avisos de horas extra", "Exportación a la gestoría"],
        metric: { value: "0", label: "incidencias con la inspección de trabajo" },
        log: [
          "06:55 · turno de almacén fichado · 9 personas",
          "Agente: aviso de 8 h extra acumuladas en el equipo de reparto",
          "Cambio de turno solicitado por WhatsApp · aprobado",
          "Horas del mes exportadas a la gestoría",
        ],
      },
      {
        id: "cobros",
        name: "Facturación y cobros",
        short: "Riesgo y vencimientos",
        icon: "receipt",
        users: "Administración",
        description:
          "Facturas emitidas al entregar, vencimientos vigilados y reclamaciones amables hechas por el agente antes de que un impago sea un problema.",
        features: ["Factura al confirmar la entrega", "Control de riesgo por cliente", "Reclamación automática de vencidos", "Conciliación bancaria"],
        metric: { value: "-11 días", label: "de periodo medio de cobro" },
        log: [
          "Entrega confirmada · factura emitida y enviada",
          "Agente: 3 facturas vencen mañana · recordatorio enviado",
          "Cliente con riesgo alto · pedido retenido hasta aprobación",
          "Cobro recibido · conciliado con el banco",
        ],
      },
    ],
  },
];
