import { BookOpen, ChevronRight, CircleHelp, FolderClosed, Gauge, Handshake, HardHat, Inbox, LogOut, Plus, ReceiptText, Search, SlidersHorizontal, User, Users, Workflow, type LucideIcon } from "lucide-react";
import { useLang } from "@/i18n";

/**
 * Vista del producto bajo el hero: el Inicio de una instancia de Alpa (empresa de instalaciones de ejemplo).
 * Reproduce la UI real de la plataforma: un solo color de marca, rojo solo para lo urgente o negativo,
 * iconos de línea, bordes de 1 px y densidad de herramienta. Datos de ejemplo.
 */
type Row = { icon: LucideIcon; name: string; value: string; text: string; alert?: boolean };

const Spark = () => <svg viewBox="0 0 170 44" className="pp-spark" aria-hidden="true"><line x1="0" y1="40" x2="170" y2="40" /><polyline points="0,18 28,4 56,40" /><circle cx="56" cy="40" r="3" /></svg>;

const PlatformPreview = () => {
  const { lang } = useLang();
  const en = lang === "en";
  const kpis = en ? [
    { label: "Hours logged", value: "47", unit: "h", delta: "−6.9 %", note: "vs last week", spark: true },
    { label: "Work reports", value: "8", delta: "−33 %", note: "vs last week", spark: true },
    { label: "Jobs in progress", value: "13", note: "3 technicians with hours" },
    { label: "New requests", value: "6", alertNote: "2 urgent", alert: true },
  ] : [
    { label: "Horas registradas", value: "47", unit: "h", delta: "−6,9 %", note: "frente a la semana pasada", spark: true },
    { label: "Partes registrados", value: "8", delta: "−33 %", note: "frente a la semana pasada", spark: true },
    { label: "Obras en curso", value: "13", note: "3 técnicos con horas" },
    { label: "Solicitudes nuevas", value: "6", alertNote: "2 urgentes", alert: true },
  ];
  const groups: { title: string; rows: Row[] }[] = en ? [
    { title: "Customers and sales", rows: [
      { icon: Inbox, name: "Customer service", value: "2", text: "urgent, unanswered", alert: true },
      { icon: Handshake, name: "Sales CRM", value: "17", text: "open opportunities, €284,850" },
      { icon: ReceiptText, name: "Quotes", value: "2", text: "awaiting reply, 2 in draft" },
    ] },
    { title: "Operations", rows: [
      { icon: HardHat, name: "Jobs and reports", value: "13", text: "jobs in progress, 5 reports to approve", alert: true },
      { icon: FolderClosed, name: "Projects and tasks", value: "5", text: "open tasks of yours, 4 active projects, 3 overdue", alert: true },
      { icon: Workflow, name: "Automations", value: "4", text: "active, 0 run in 7 days" },
    ] },
    { title: "People", rows: [{ icon: Users, name: "People", value: "8", text: "of 9 people working now" }] },
    { title: "Knowledge and data", rows: [
      { icon: BookOpen, name: "Technical regulations", value: "87", text: "queries in 30 days" },
      { icon: Gauge, name: "Dashboard", value: "47 h", text: "logged this week" },
    ] },
  ] : [
    { title: "Clientes y ventas", rows: [
      { icon: Inbox, name: "Atención al cliente", value: "2", text: "urgentes sin atender", alert: true },
      { icon: Handshake, name: "CRM comercial", value: "17", text: "oportunidades abiertas, 284.850 €" },
      { icon: ReceiptText, name: "Presupuestos", value: "2", text: "pendientes de respuesta, 2 en borrador" },
    ] },
    { title: "Operaciones", rows: [
      { icon: HardHat, name: "Obras y partes", value: "13", text: "obras en curso, 5 partes por validar", alert: true },
      { icon: FolderClosed, name: "Proyectos y tareas", value: "5", text: "tareas tuyas abiertas, 4 proyectos activos, 3 vencidas", alert: true },
      { icon: Workflow, name: "Automatizaciones", value: "4", text: "activas, 0 hechas en 7 días" },
    ] },
    { title: "Personas", rows: [{ icon: Users, name: "Personas", value: "8", text: "de 9 personas trabajando ahora" }] },
    { title: "Conocimiento y datos", rows: [
      { icon: BookOpen, name: "Normativa técnica", value: "87", text: "consultas en 30 días" },
      { icon: Gauge, name: "Cuadro de mando", value: "47 h", text: "registradas esta semana" },
    ] },
  ];
  return <section aria-label={en ? "Preview of an Alpa instance" : "Vista de una instancia de Alpa"} className="platform-preview">
    <figure>
      <div className="platform-frame" aria-hidden="true">
        <div className="platform-bar"><span /><span /><span /><div>tuempresa.alpa.digital</div></div>
        <div className="pp">
          <header className="pp-top">
            <div className="pp-brand"><span>T</span>{en ? "yourcompany" : "tuempresa"}</div>
            <div className="pp-search"><Search size={15} strokeWidth={1.6} />{en ? "Search or ask" : "Buscar o preguntar"}<kbd>⌘K</kbd></div>
            <div className="pp-actions"><span className="pp-plus"><Plus size={15} strokeWidth={1.6} /></span><CircleHelp size={16} strokeWidth={1.6} /><span className="pp-avatar">LM</span><LogOut size={15} strokeWidth={1.6} /></div>
          </header>
          <div className="pp-body">
            <div className="pp-head"><h3>{en ? "Home" : "Inicio"}</h3><div><span className="pp-btn"><User size={14} strokeWidth={1.6} />{en ? "My area" : "Mi zona"}</span><span className="pp-ghost"><SlidersHorizontal size={14} strokeWidth={1.6} />{en ? "Sort" : "Ordenar"}</span></div></div>
            <div className="pp-card">
              <div className="pp-card-head"><strong>{en ? "This week" : "Esta semana"}</strong><span>{en ? "Dashboard" : "Cuadro de mando"}<ChevronRight size={14} strokeWidth={1.8} /></span></div>
              <div className="pp-kpis">{kpis.map(kpi => <div key={kpi.label}>
                <p>{kpi.label}</p>
                <div className="pp-kpi-row"><strong className={kpi.alert ? "pp-red" : undefined}>{kpi.value}{kpi.unit && <small>{kpi.unit}</small>}</strong>{kpi.spark && <Spark />}</div>
                <p className="pp-note">{kpi.delta && <span className="pp-red">{kpi.delta} </span>}{kpi.alertNote ? <span className="pp-red">{kpi.alertNote}</span> : kpi.note}</p>
              </div>)}</div>
            </div>
            <div className="pp-card pp-list">{groups.map(group => <div key={group.title}>
              <p className="pp-group">{group.title}</p>
              {group.rows.map(row => <div key={row.name} className="pp-row">
                <row.icon size={17} strokeWidth={1.6} />
                <strong>{row.name}</strong>
                <span><b className={row.alert ? "pp-red" : undefined}>{row.value}</b> {row.text}</span>
                <ChevronRight size={15} strokeWidth={1.6} className="pp-chev" />
              </div>)}
            </div>)}</div>
          </div>
        </div>
      </div>
      <figcaption>{en ? "This is what an Alpa instance looks like: your brand, your subdomain and your business apps. Sample data." : "Así se ve una instancia de Alpa en tu empresa: tu marca, tu subdominio y tus apps corporativas. Datos de ejemplo."}</figcaption>
    </figure>
  </section>;
};
export default PlatformPreview;
