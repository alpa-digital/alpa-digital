export interface ScanArea {
  id: "atencion" | "ventas" | "admin" | "rrhh" | "marketing" | "direccion";
  score: number;
  title: string;
  description: string;
  hoursPerWeek: number;
}

export interface ScanResult {
  company: string;
  sectorId: SectorId;
  sector: string;
  summary: string;
  areas: ScanArea[];
  favicon?: string;
  source: "analysis" | "estimate";
  /** Motivo por el que no se pudo analizar la web (solo en estimaciones). */
  note?: string;
}

export const sectors = [
  { id: "servicios", label: "Servicios profesionales (asesoría, despacho, consultoría)" },
  { id: "comercio", label: "Comercio y distribución" },
  { id: "industria", label: "Industria, talleres y fabricación" },
  { id: "salud", label: "Salud, clínicas y bienestar" },
  { id: "inmobiliaria", label: "Inmobiliaria y administración de fincas" },
  { id: "hosteleria", label: "Hostelería y turismo" },
  { id: "construccion", label: "Construcción, reformas e instalaciones" },
  { id: "otro", label: "Otro sector" },
] as const;

export type SectorId = (typeof sectors)[number]["id"];

export const areaNames: Record<ScanArea["id"], string> = {
  atencion: "Atención al cliente",
  ventas: "Ventas",
  admin: "Administración",
  rrhh: "Recursos humanos",
  marketing: "Marketing",
  direccion: "Dirección",
};

type Template = Omit<ScanArea, "score" | "hoursPerWeek"> & { base: number; hours: number };

const templates: Record<SectorId, Template[]> = {
  servicios: [
    { id: "atencion", base: 78, hours: 6, title: "Respuestas a consultas frecuentes de clientes", description: "Un asistente responde dudas sobre plazos, documentación y estado de expedientes por email y WhatsApp, y pasa el resto a la persona adecuada." },
    { id: "admin", base: 88, hours: 9, title: "Documentación y facturas clasificadas solas", description: "Cada documento que llega al correo se identifica, se archiva en el expediente correcto y se registra en contabilidad." },
    { id: "ventas", base: 64, hours: 4, title: "Propuestas de servicios en minutos", description: "A partir de una reunión o un email se redacta la propuesta con tus tarifas y se programa el seguimiento." },
    { id: "direccion", base: 70, hours: 3, title: "Informe semanal de horas, facturación y cobros", description: "Cada lunes, un resumen claro de qué se ha facturado, qué está pendiente y qué clientes necesitan atención." },
    { id: "marketing", base: 52, hours: 3, title: "Contenido especializado con tu voz", description: "Artículos y newsletters redactados a partir de novedades de tu sector, para aprobar en dos minutos." },
    { id: "rrhh", base: 40, hours: 2, title: "Selección de personal más ágil", description: "Cribado inicial de candidaturas y respuestas automáticas a candidatos." },
  ],
  comercio: [
    { id: "atencion", base: 90, hours: 10, title: "Stock, precios y pedidos contestados al momento", description: "Un agente consulta tu catálogo y responde por WhatsApp o email con disponibilidad, precio con la tarifa del cliente y plazo de entrega." },
    { id: "ventas", base: 82, hours: 7, title: "Presupuestos y pedidos sin retrabajo", description: "Los pedidos que llegan por email se convierten en líneas de pedido en tu sistema, con confirmación al cliente." },
    { id: "admin", base: 84, hours: 8, title: "Facturas de proveedores cuadradas con los pedidos", description: "Lectura de facturas, cruce con albaranes y asiento preparado en contabilidad." },
    { id: "direccion", base: 72, hours: 3, title: "Alertas de stock y ventas por referencia", description: "Cada lunes, qué se vende más, qué está bajo mínimos y qué cobros vencen." },
    { id: "marketing", base: 66, hours: 4, title: "Fichas y campañas a partir del catálogo", description: "Novedades y ofertas convertidas en newsletter y publicaciones con tu tono." },
    { id: "rrhh", base: 35, hours: 2, title: "Incorporaciones con checklist automático", description: "Documentación y alta de cada nueva persona sin perseguir a nadie." },
  ],
  industria: [
    { id: "admin", base: 86, hours: 9, title: "Albaranes, facturas y partes sin picar datos", description: "Documentos de proveedores y partes de trabajo leídos y registrados automáticamente en tu ERP." },
    { id: "ventas", base: 80, hours: 6, title: "Presupuestos técnicos en minutos", description: "A partir de un plano o un email, el presupuesto se prepara con tus tarifas y materiales, listo para revisar." },
    { id: "atencion", base: 70, hours: 5, title: "Seguimiento de pedidos sin llamadas", description: "El cliente pregunta por su pedido y recibe el estado real de producción y entrega." },
    { id: "direccion", base: 76, hours: 3, title: "Cuadro de mando de producción y cobros", description: "Producción, incidencias, pedidos pendientes y cobros vencidos en un informe semanal." },
    { id: "rrhh", base: 48, hours: 2, title: "Turnos, partes y selección más ágiles", description: "Candidaturas cribadas y documentación de incorporación generada sola." },
    { id: "marketing", base: 42, hours: 2, title: "Casos de éxito y fichas técnicas con tu voz", description: "Contenido técnico redactado a partir de proyectos reales." },
  ],
  salud: [
    { id: "atencion", base: 92, hours: 10, title: "Citas y recordatorios sin teléfono ocupado", description: "Un asistente agenda, confirma y recuerda citas por WhatsApp, y responde dudas frecuentes sobre tratamientos y horarios." },
    { id: "admin", base: 78, hours: 6, title: "Consentimientos, facturas y mutuas al día", description: "Documentación de cada paciente clasificada y facturación preparada por aseguradora." },
    { id: "direccion", base: 68, hours: 3, title: "Ocupación, cancelaciones e ingresos por profesional", description: "Informe semanal de agenda, huecos y facturación por servicio." },
    { id: "marketing", base: 60, hours: 3, title: "Seguimiento de pacientes y campañas de revisión", description: "Recordatorios de revisión y contenido de salud con tu tono." },
    { id: "ventas", base: 50, hours: 3, title: "Presupuestos de tratamientos en la propia consulta", description: "Presupuesto generado y enviado al paciente antes de que salga por la puerta." },
    { id: "rrhh", base: 38, hours: 2, title: "Turnos y selección de personal sanitario", description: "Cribado de candidaturas y gestión de documentación." },
  ],
  inmobiliaria: [
    { id: "ventas", base: 90, hours: 9, title: "Cualificación de contactos y visitas agendadas", description: "Cada contacto de portal o web recibe respuesta, se cualifica y sale con visita agendada en la agenda del comercial." },
    { id: "atencion", base: 84, hours: 7, title: "Inquilinos y propietarios atendidos al momento", description: "Incidencias, recibos y dudas resueltas por WhatsApp, con parte creado para el técnico cuando toca." },
    { id: "admin", base: 76, hours: 6, title: "Contratos, recibos y facturas generados solos", description: "Documentación preparada a partir de los datos de cada inmueble y cliente." },
    { id: "marketing", base: 72, hours: 4, title: "Fichas de inmuebles y publicaciones en minutos", description: "Descripciones y publicaciones generadas a partir de fotos y datos del inmueble." },
    { id: "direccion", base: 64, hours: 3, title: "Cartera, visitas y cierres cada lunes", description: "Informe semanal de captación, visitas y operaciones." },
    { id: "rrhh", base: 30, hours: 1, title: "Incorporación de comerciales", description: "Onboarding y formación inicial automatizados." },
  ],
  hosteleria: [
    { id: "atencion", base: 90, hours: 9, title: "Reservas y dudas respondidas 24 horas", description: "Un asistente gestiona reservas, cambios y preguntas frecuentes por WhatsApp, web y redes." },
    { id: "marketing", base: 78, hours: 5, title: "Reseñas respondidas y campañas semanales", description: "Respuesta a reseñas con tu tono y contenido de temporada programado." },
    { id: "admin", base: 74, hours: 6, title: "Facturas de proveedores y escandallos al día", description: "Facturas leídas, precios actualizados y costes por plato o servicio." },
    { id: "direccion", base: 66, hours: 3, title: "Ocupación, ticket medio y compras cada semana", description: "Informe semanal comparado con el mismo periodo del año anterior." },
    { id: "rrhh", base: 56, hours: 3, title: "Turnos, extras y selección en temporada", description: "Candidaturas cribadas y documentación de contratación preparada." },
    { id: "ventas", base: 48, hours: 2, title: "Presupuestos de eventos y grupos", description: "Propuestas para grupos y eventos generadas a partir de la solicitud." },
  ],
  construccion: [
    { id: "ventas", base: 88, hours: 8, title: "Presupuestos de obra y reformas en minutos", description: "A partir de una visita o unas fotos, el presupuesto se prepara con tus partidas y precios, listo para revisar." },
    { id: "admin", base: 84, hours: 8, title: "Facturas, albaranes y partes por obra", description: "Cada documento se asigna a su obra y se registra en contabilidad sin teclear." },
    { id: "atencion", base: 70, hours: 5, title: "Clientes informados del avance sin llamadas", description: "Estado de la obra, próximos pasos y dudas respondidas automáticamente." },
    { id: "direccion", base: 72, hours: 3, title: "Desviaciones de coste por obra cada semana", description: "Comparativa presupuesto frente a coste real y cobros pendientes." },
    { id: "rrhh", base: 50, hours: 2, title: "Cuadrillas, PRL y documentación al día", description: "Documentación de personal y subcontratas controlada automáticamente." },
    { id: "marketing", base: 44, hours: 2, title: "Obras terminadas convertidas en contenido", description: "Fotos de obra convertidas en publicaciones y casos de éxito." },
  ],
  otro: [
    { id: "atencion", base: 80, hours: 7, title: "Consultas frecuentes respondidas al momento", description: "Un asistente responde dudas habituales con tu información real y escala el resto a una persona." },
    { id: "admin", base: 82, hours: 7, title: "Facturas y documentos registrados solos", description: "Lectura de documentos y registro en tus sistemas sin teclear datos." },
    { id: "ventas", base: 72, hours: 5, title: "Presupuestos y seguimiento sin olvidos", description: "Presupuestos generados a partir de la solicitud y seguimiento programado." },
    { id: "direccion", base: 68, hours: 3, title: "Informe semanal del negocio", description: "Ventas, cobros y operaciones resumidos cada lunes." },
    { id: "marketing", base: 58, hours: 3, title: "Contenido con tu voz cada semana", description: "Newsletter y publicaciones preparadas para aprobar." },
    { id: "rrhh", base: 40, hours: 2, title: "Selección e incorporaciones más ágiles", description: "Cribado de candidaturas y onboarding automatizado." },
  ],
};

function hashString(input: string): number {
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export function domainFromUrl(raw: string): string {
  try {
    const url = new URL(raw.includes("://") ? raw : `https://${raw}`);
    return url.hostname.replace(/^www\./, "");
  } catch {
    return raw.trim();
  }
}

export function companyNameFromDomain(domain: string): string {
  const base = domain.split(".")[0] ?? domain;
  return base
    .split(/[-_]/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

const sectorHints: [SectorId, RegExp][] = [
  ["salud", /clinic|dental|dentist|medic|salud|fisio|farmac|optic|veterin|psico|nutri|estetic|wellness/],
  ["hosteleria", /hotel|hostal|restaur|bar|cafe|catering|turism|tour|viaje|apartament|camping|bodega|gastro/],
  ["construccion", /construc|reforma|obra|electric|fontan|climat|instalac|pintur|carpint|alumin|solar|fotovolt|arquitect/],
  ["inmobiliaria", /inmobil|finca|piso|vivienda|realestate|propiedad|alquiler|home/],
  ["industria", /industr|taller|fabric|mecaniz|metal|maquin|mantenim|logist|transporte|plastic|textil|tecnolog/],
  ["comercio", /tienda|shop|store|distrib|mayorista|comercial|suministr|almacen|ferreter|market|moda|muebles/],
  ["servicios", /asesor|gestor|abogad|legal|consult|agencia|contab|seguro|formacion|academ|estudio|marketing|diseno|software/],
];

/** Adivina el sector a partir del dominio cuando no hay análisis de la web. */
export function guessSectorFromDomain(rawUrl: string): SectorId {
  const domain = domainFromUrl(rawUrl).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  for (const [sector, pattern] of sectorHints) {
    if (pattern.test(domain)) return sector;
  }
  return "otro";
}

/** Estimación determinista por sector y dominio, usada cuando el análisis con IA no está disponible. */
export function estimateScan(rawUrl: string, sector: SectorId): ScanResult {
  const domain = domainFromUrl(rawUrl);
  const seed = hashString(domain + sector);
  const sectorLabel = sectors.find((s) => s.id === sector)?.label ?? "Otro sector";

  const areas: ScanArea[] = templates[sector].map((tpl, index) => {
    const jitter = ((seed >> (index * 4)) & 15) - 7; // -7..8
    const score = Math.max(20, Math.min(97, tpl.base + jitter));
    return { id: tpl.id, score, title: tpl.title, description: tpl.description, hoursPerWeek: tpl.hours };
  });
  areas.sort((a, b) => b.score - a.score);

  const totalHours = areas.reduce((sum, a) => sum + a.hoursPerWeek, 0);
  return {
    company: companyNameFromDomain(domain),
    sectorId: sector,
    sector: sectorLabel,
    summary: `Estimación inicial para ${domain}: unas ${totalHours} horas semanales de trabajo repetitivo automatizables, concentradas en ${areaNames[areas[0].id].toLowerCase()} y ${areaNames[areas[1].id].toLowerCase()}.`,
    areas,
    source: "estimate",
  };
}
