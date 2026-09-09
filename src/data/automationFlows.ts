export type NodeKind = "trigger" | "agent" | "tool" | "human" | "output";

export type IconName =
  | "mail" | "whatsapp" | "bot" | "book" | "users" | "user" | "send" | "file"
  | "receipt" | "calculator" | "alert" | "check" | "calendar" | "clipboard"
  | "image" | "megaphone" | "clock" | "chart" | "package" | "timer" | "tag" | "database" | "gauge";

export interface FlowNode {
  id: string;
  kind: NodeKind;
  label: string;
  sub?: string;
  icon: IconName;
  x: number;
  y: number;
}

export interface FlowEdge {
  from: string;
  to: string;
}

export interface AreaFlow {
  id: string;
  area: string;
  title: string;
  hook: string;
  metric: { value: string; label: string };
  nodes: FlowNode[];
  edges: FlowEdge[];
  log: string[];
}

// Canvas: viewBox 0 0 960 380. Columnas: disparador 16, agente 244, herramientas 496, resultado 744.
const T = 16;
const A = 244;
const K = 496;
const O = 744;

export const automationFlows: AreaFlow[] = [
  {
    id: "atencion",
    area: "Atención al cliente",
    title: "Un agente que responde a cualquier hora",
    hook: "Consultas por WhatsApp, web o email contestadas con tus precios, tu stock y tus condiciones. Lo que no sabe, lo pasa a una persona con todo el contexto.",
    metric: { value: "38 s", label: "tiempo medio de respuesta" },
    nodes: [
      { id: "in", kind: "trigger", label: "Mensaje de cliente", sub: "WhatsApp · web · email", icon: "whatsapp", x: T, y: 152 },
      { id: "agent", kind: "agent", label: "Agente de atención", sub: "entiende la consulta", icon: "bot", x: A, y: 144 },
      { id: "kb", kind: "tool", label: "Catálogo y stock", sub: "consulta en tiempo real", icon: "package", x: K, y: 40 },
      { id: "crm", kind: "tool", label: "Ficha del cliente", sub: "CRM · tarifa aplicada", icon: "users", x: K, y: 152 },
      { id: "human", kind: "human", label: "Escalado a persona", sub: "solo si no está seguro", icon: "user", x: K, y: 264 },
      { id: "out", kind: "output", label: "Respuesta enviada", sub: "con precio y plazo", icon: "send", x: O, y: 152 },
    ],
    edges: [
      { from: "in", to: "agent" },
      { from: "agent", to: "kb" },
      { from: "agent", to: "crm" },
      { from: "agent", to: "human" },
      { from: "kb", to: "out" },
      { from: "crm", to: "out" },
      { from: "human", to: "out" },
    ],
    log: [
      "WhatsApp · +34 6•• ••• 412: «¿Tenéis stock de la referencia 8841 en gris?»",
      "Agente → catálogo: 14 unidades en almacén de Valencia",
      "Agente → CRM: cliente identificado · tarifa distribuidor",
      "Respuesta enviada: stock, precio con su tarifa y entrega en 48 h",
      "Conversación cerrada · 38 s · sin intervención humana",
    ],
  },
  {
    id: "ventas",
    area: "Ventas",
    title: "Presupuestos listos en minutos",
    hook: "De un email o una llamada a un presupuesto en tu plantilla, con el cliente en el CRM y el seguimiento programado. Antes de que la competencia haya leído el correo.",
    metric: { value: "6 min", label: "de la solicitud al presupuesto" },
    nodes: [
      { id: "in", kind: "trigger", label: "Solicitud de presupuesto", sub: "email · formulario · llamada", icon: "mail", x: T, y: 152 },
      { id: "agent", kind: "agent", label: "Agente comercial", sub: "extrae líneas y cantidades", icon: "bot", x: A, y: 144 },
      { id: "rates", kind: "tool", label: "Tarifas y descuentos", sub: "condiciones vigentes", icon: "tag", x: K, y: 40 },
      { id: "tpl", kind: "tool", label: "Plantilla de presupuesto", sub: "PDF con tu marca", icon: "file", x: K, y: 152 },
      { id: "human", kind: "human", label: "Revisión del comercial", sub: "aprobar en 1 clic", icon: "user", x: K, y: 264 },
      { id: "out", kind: "output", label: "Presupuesto enviado", sub: "+ seguimiento programado", icon: "send", x: O, y: 152 },
    ],
    edges: [
      { from: "in", to: "agent" },
      { from: "agent", to: "rates" },
      { from: "agent", to: "tpl" },
      { from: "agent", to: "human" },
      { from: "tpl", to: "out" },
      { from: "human", to: "out" },
    ],
    log: [
      "Email de ana@construccionesnorte.es: «necesito 120 m² de tarima para obra en Getafe…»",
      "Agente: 3 líneas de pedido detectadas · plazo deseado 2 semanas",
      "Agente → tarifas: precio 2026 + 6 % de descuento por volumen",
      "Presupuesto nº 2026-0417 generado · revisado por Carlos en 1 clic",
      "Enviado a Ana · recordatorio de seguimiento creado para el jueves",
    ],
  },
  {
    id: "admin",
    area: "Administración",
    title: "Facturas que se contabilizan solas",
    hook: "Las facturas de proveedores que llegan al correo se leen, se cuadran con los pedidos y se dejan asentadas en tu programa de contabilidad. Sin teclear ni un dato.",
    metric: { value: "0", label: "datos tecleados a mano" },
    nodes: [
      { id: "in", kind: "trigger", label: "Factura de proveedor", sub: "PDF adjunto en el correo", icon: "receipt", x: T, y: 152 },
      { id: "agent", kind: "agent", label: "Agente administrativo", sub: "lee y extrae los datos", icon: "bot", x: A, y: 144 },
      { id: "po", kind: "tool", label: "Pedidos y albaranes", sub: "cuadra cantidades", icon: "clipboard", x: K, y: 40 },
      { id: "acc", kind: "tool", label: "Programa de contabilidad", sub: "crea el asiento", icon: "calculator", x: K, y: 152 },
      { id: "human", kind: "human", label: "Aviso a administración", sub: "solo si algo no cuadra", icon: "alert", x: K, y: 264 },
      { id: "out", kind: "output", label: "Factura contabilizada", sub: "vencimiento registrado", icon: "check", x: O, y: 152 },
    ],
    edges: [
      { from: "in", to: "agent" },
      { from: "agent", to: "po" },
      { from: "agent", to: "acc" },
      { from: "agent", to: "human" },
      { from: "acc", to: "out" },
    ],
    log: [
      "Adjunto recibido: FRA-2026-1187.pdf · Suministros Ibéricos S.L.",
      "Agente: base 2.340,00 € · IVA 21 % · vencimiento 30 días · 7 líneas",
      "Agente → pedidos: coincide con PO-2291 · cantidades correctas",
      "Asiento creado en contabilidad · proveedor y vencimiento asignados",
      "Sin incidencias · 0 datos tecleados · 11 s",
    ],
  },
  {
    id: "rrhh",
    area: "Recursos humanos",
    title: "Selección sin candidatos sin respuesta",
    hook: "Cada candidatura se compara con el puesto, recibe una respuesta y, si encaja, sale con entrevista agendada. RRHH solo decide.",
    metric: { value: "100 %", label: "candidatos con respuesta" },
    nodes: [
      { id: "in", kind: "trigger", label: "Candidatura recibida", sub: "portal de empleo · email", icon: "mail", x: T, y: 152 },
      { id: "agent", kind: "agent", label: "Agente de selección", sub: "compara con el puesto", icon: "bot", x: A, y: 144 },
      { id: "job", kind: "tool", label: "Criterios del puesto", sub: "requisitos y prioridades", icon: "clipboard", x: K, y: 40 },
      { id: "cal", kind: "tool", label: "Agenda del equipo", sub: "propone huecos", icon: "calendar", x: K, y: 152 },
      { id: "human", kind: "human", label: "Decisión de RRHH", sub: "aprobar o descartar", icon: "user", x: K, y: 264 },
      { id: "out", kind: "output", label: "Entrevista agendada", sub: "o respuesta enviada", icon: "send", x: O, y: 152 },
    ],
    edges: [
      { from: "in", to: "agent" },
      { from: "agent", to: "job" },
      { from: "agent", to: "cal" },
      { from: "agent", to: "human" },
      { from: "cal", to: "out" },
      { from: "human", to: "out" },
    ],
    log: [
      "Candidatura de Marcos R. · Técnico de mantenimiento · CV adjunto",
      "Agente: cumple 5 de 6 requisitos · carnet B · disponibilidad inmediata",
      "Agente → agenda: 3 huecos propuestos con la responsable de planta",
      "RRHH aprueba en 1 clic desde el móvil",
      "Entrevista el martes a las 10:30 · confirmación enviada a Marcos",
    ],
  },
  {
    id: "marketing",
    area: "Marketing",
    title: "Contenido con tu voz, cada semana",
    hook: "Newsletters, publicaciones y fichas escritas a partir de tu catálogo real y tu tono. Una persona aprueba, la IA hace el resto.",
    metric: { value: "1 h", label: "a la semana en vez de una jornada" },
    nodes: [
      { id: "in", kind: "trigger", label: "Novedad en el catálogo", sub: "producto · oferta · evento", icon: "package", x: T, y: 152 },
      { id: "agent", kind: "agent", label: "Agente de contenidos", sub: "escribe con tu tono", icon: "bot", x: A, y: 144 },
      { id: "style", kind: "tool", label: "Guía de estilo", sub: "ejemplos aprobados", icon: "book", x: K, y: 40 },
      { id: "media", kind: "tool", label: "Fotos y fichas", sub: "del propio catálogo", icon: "image", x: K, y: 152 },
      { id: "human", kind: "human", label: "Aprobación de marketing", sub: "2 minutos", icon: "user", x: K, y: 264 },
      { id: "out", kind: "output", label: "Newsletter y redes", sub: "programadas", icon: "megaphone", x: O, y: 152 },
    ],
    edges: [
      { from: "in", to: "agent" },
      { from: "agent", to: "style" },
      { from: "agent", to: "media" },
      { from: "agent", to: "human" },
      { from: "human", to: "out" },
    ],
    log: [
      "Detectados 4 productos nuevos en el catálogo",
      "Agente: newsletter + 3 publicaciones redactadas con el tono de la marca",
      "Agente → fichas: fotos y enlaces de cada producto incorporados",
      "Aprobado por Marketing · 1 corrección de precio",
      "Programado: newsletter jueves 9:00 · publicaciones lunes a viernes",
    ],
  },
  {
    id: "direccion",
    area: "Dirección",
    title: "El informe de los lunes se prepara solo",
    hook: "Ventas, cobros, stock y tiempos de respuesta reunidos cada lunes a primera hora, con un resumen en lenguaje claro de lo que ha cambiado.",
    metric: { value: "07:04", label: "informe en tu bandeja cada lunes" },
    nodes: [
      { id: "in", kind: "trigger", label: "Lunes · 07:00", sub: "se lanza solo", icon: "clock", x: T, y: 152 },
      { id: "agent", kind: "agent", label: "Agente de análisis", sub: "reúne y compara", icon: "bot", x: A, y: 144 },
      { id: "sales", kind: "tool", label: "Ventas y cobros", sub: "facturación · vencidos", icon: "chart", x: K, y: 40 },
      { id: "stock", kind: "tool", label: "Stock y pedidos", sub: "mínimos · pendientes", icon: "package", x: K, y: 152 },
      { id: "sla", kind: "tool", label: "Atención al cliente", sub: "volumen · tiempos", icon: "timer", x: K, y: 264 },
      { id: "out", kind: "output", label: "Informe en tu email", sub: "qué ha cambiado y por qué", icon: "mail", x: O, y: 152 },
    ],
    edges: [
      { from: "in", to: "agent" },
      { from: "agent", to: "sales" },
      { from: "agent", to: "stock" },
      { from: "agent", to: "sla" },
      { from: "sales", to: "out" },
      { from: "stock", to: "out" },
      { from: "sla", to: "out" },
    ],
    log: [
      "Lunes 07:00 · recopilando datos de la semana 36",
      "Ventas +8 % frente a la semana anterior · 3 cobros vencidos",
      "Stock: 2 referencias por debajo del mínimo · pedido sugerido",
      "Atención al cliente: 41 consultas · respuesta media 52 s",
      "Informe enviado a dirección · 07:04",
    ],
  },,
  {
    id: "datos",
    area: "Datos y analítica",
    title: "Todos tus datos en un cuadro de mando que responde",
    hook: "Ventas, costes, stock y web unidos en un solo sitio que se actualiza solo. Y un agente al que dirección pregunta en lenguaje normal y contesta con datos, no con opiniones.",
    metric: { value: "0 h", label: "preparando informes a mano" },
    nodes: [
      { id: "in", kind: "trigger", label: "Datos nuevos cada noche", sub: "ERP · ventas · web · hojas", icon: "database", x: T, y: 152 },
      { id: "agent", kind: "agent", label: "Agente de datos", sub: "limpia, cruza y compara", icon: "bot", x: A, y: 144 },
      { id: "kb", kind: "tool", label: "Almacén de datos", sub: "todas las fuentes unidas", icon: "database", x: K, y: 40 },
      { id: "crm", kind: "tool", label: "Cuadro de mando", sub: "Power BI · Looker · a medida", icon: "gauge", x: K, y: 152 },
      { id: "human", kind: "human", label: "Pregunta de dirección", sub: "«¿por qué bajó el margen?»", icon: "user", x: K, y: 264 },
      { id: "out", kind: "output", label: "Respuesta con gráfico", sub: "y alertas cuando algo se desvía", icon: "chart", x: O, y: 152 },
    ],
    edges: [
      { from: "in", to: "agent" },
      { from: "agent", to: "kb" },
      { from: "agent", to: "crm" },
      { from: "agent", to: "human" },
      { from: "kb", to: "out" },
      { from: "crm", to: "out" },
      { from: "human", to: "out" },
    ],
    log: [
      "03:00 · 4 fuentes leídas: ERP, TPV, web y hoja de costes",
      "Agente: 212 registros duplicados unidos · clientes normalizados",
      "Cuadro de mando actualizado · margen, ventas y stock por familia",
      "Gerencia (WhatsApp): «¿Por qué bajó el margen en marzo?» → transporte +18 % en la zona norte",
      "Alerta: 3 referencias con rotación por debajo del mínimo",
    ],
  },
];
