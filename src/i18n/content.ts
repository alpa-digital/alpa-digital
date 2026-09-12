import { useMemo } from "react";
import { automationFlows, type AreaFlow } from "@/data/automationFlows";
import { agentSystems, type CompanySystem } from "@/data/agentSystems";
import { sectors, type SectorDef } from "@/data/sectors";
import { useLang, type Lang } from "@/i18n";

/**
 * Traducción del contenido de la demo. Los datos en español viven en `src/data`
 * con su geometría y sus identificadores; aquí solo están las cadenas en inglés,
 * indexadas por el mismo id, y se mezclan al vuelo.
 */

type FlowCopy = {
  area: string;
  title: string;
  hook: string;
  metricLabel: string;
  nodes: Record<string, { label: string; sub?: string }>;
};

const flowsEn: Record<string, FlowCopy> = {
  atencion: {
    area: "Customer service",
    title: "An agent that answers at any hour",
    hook: "Enquiries on WhatsApp, the website or email answered with your prices, your stock and your terms. Anything it does not know goes to a person with the full context.",
    metricLabel: "average response time",
    nodes: {
      in: { label: "Customer message", sub: "WhatsApp · web · email" },
      agent: { label: "Service agent", sub: "understands the request" },
      kb: { label: "Catalogue and stock", sub: "checked in real time" },
      crm: { label: "Customer record", sub: "CRM · price tier applied" },
      human: { label: "Escalated to a person", sub: "only if unsure" },
      out: { label: "Answer sent", sub: "with price and lead time" },
    },
  },
  ventas: {
    area: "Sales",
    title: "Quotes ready in minutes",
    hook: "From an email or a call to a quote on your own template, with the customer in the CRM and the follow-up scheduled. Before your competitor has even read the email.",
    metricLabel: "from request to quote",
    nodes: {
      in: { label: "Quote request", sub: "email · form · phone call" },
      agent: { label: "Sales agent", sub: "pulls out items and quantities" },
      rates: { label: "Prices and discounts", sub: "current terms" },
      tpl: { label: "Quote template", sub: "PDF with your branding" },
      human: { label: "Sales rep review", sub: "approve in one click" },
      out: { label: "Quote sent", sub: "+ follow-up scheduled" },
    },
  },
  admin: {
    area: "Administration",
    title: "Invoices that post themselves",
    hook: "Supplier invoices arriving by email are read, matched against your orders and posted in your accounting software. Without typing a single field.",
    metricLabel: "fields typed by hand",
    nodes: {
      in: { label: "Supplier invoice", sub: "PDF attached to an email" },
      agent: { label: "Admin agent", sub: "reads and extracts the data" },
      po: { label: "Orders and delivery notes", sub: "matches quantities" },
      acc: { label: "Accounting software", sub: "creates the entry" },
      human: { label: "Alert to admin", sub: "only if something is off" },
      out: { label: "Invoice posted", sub: "due date recorded" },
    },
  },
  rrhh: {
    area: "People and HR",
    title: "Hiring with no candidate left unanswered",
    hook: "Every application is matched against the role, gets a reply and, if it fits, comes back with an interview booked. HR only has to decide.",
    metricLabel: "candidates who get a reply",
    nodes: {
      in: { label: "Application received", sub: "job board · email" },
      agent: { label: "Screening agent", sub: "matches against the role" },
      job: { label: "Role requirements", sub: "must-haves and priorities" },
      cal: { label: "Team calendar", sub: "suggests slots" },
      human: { label: "HR decision", sub: "approve or decline" },
      out: { label: "Interview booked", sub: "or reply sent" },
    },
  },
  marketing: {
    area: "Marketing",
    title: "Content in your voice, every week",
    hook: "Newsletters, posts and product copy written from your real catalogue and your tone of voice. A person approves, the AI does the rest.",
    metricLabel: "a week instead of a full day",
    nodes: {
      in: { label: "New in the catalogue", sub: "product · offer · event" },
      agent: { label: "Content agent", sub: "writes in your tone" },
      style: { label: "Style guide", sub: "approved examples" },
      media: { label: "Photos and specs", sub: "from your own catalogue" },
      human: { label: "Marketing approval", sub: "2 minutes" },
      out: { label: "Newsletter and social", sub: "scheduled" },
    },
  },
  direccion: {
    area: "Management",
    title: "The Monday report writes itself",
    hook: "Sales, payments, stock and response times pulled together first thing every Monday, with a plain-language summary of what has changed.",
    metricLabel: "report in your inbox every Monday",
    nodes: {
      in: { label: "Monday · 07:00", sub: "runs on its own" },
      agent: { label: "Analysis agent", sub: "gathers and compares" },
      sales: { label: "Sales and payments", sub: "invoiced · overdue" },
      stock: { label: "Stock and orders", sub: "minimums · pending" },
      sla: { label: "Customer service", sub: "volume · response times" },
      out: { label: "Report in your inbox", sub: "what changed and why" },
    },
  },
  datos: {
    area: "Data and analytics",
    title: "All your data in a dashboard that answers back",
    hook: "Sales, costs, stock and web traffic in one place that updates itself. Plus an agent management can ask in plain language, answering with data instead of opinions.",
    metricLabel: "preparing reports by hand",
    nodes: {
      in: { label: "New data every night", sub: "ERP · sales · web · sheets" },
      agent: { label: "Data agent", sub: "cleans, joins and compares" },
      kb: { label: "Data warehouse", sub: "every source in one place" },
      crm: { label: "Dashboard", sub: "Power BI · Looker · custom" },
      human: { label: "Question from management", sub: "«why did margin drop?»" },
      out: { label: "Answer with a chart", sub: "and alerts when something drifts" },
    },
  },
};

type SystemCopy = {
  company: string;
  sector: string;
  size: string;
  hub: { label: string; sub: string };
  modules: Record<string, { name: string; short: string; description: string; metricLabel: string }>;
};

const systemsEn: Record<string, SystemCopy> = {
  electrica: {
    company: "Voltia Electrical",
    sector: "Electrical contracting",
    size: "24 people · 6 vans",
    hub: { label: "Voltia's agent", sub: "WhatsApp · voice · web" },
    modules: {
      certificaciones: {
        name: "Job certification",
        short: "Conversational assistant",
        description: "The technician tells the agent «certify the job at 12 Main Street». The agent pulls up the project data, asks for the missing photos and readings, and produces the certificate ready to sign.",
        metricLabel: "per certificate, from the job site",
      },
      herramientas: {
        name: "Tool tracking",
        short: "QR codes and vans",
        description: "Every tool carries a QR code. It is scanned in and out of each job, so the agent always knows what is in each van, who has it and what is due for calibration.",
        metricLabel: "tools lost this quarter",
      },
      crm: {
        name: "Jobs and customer CRM",
        short: "Quotes and follow-up",
        description: "Customers, jobs, quotes and the status of every project in one place, fed by the agent: every call, visit or email is recorded without anyone typing it.",
        metricLabel: "quotes accepted",
      },
      fichaje: {
        name: "Time and attendance",
        short: "HR from the phone",
        description: "Technicians clock in over WhatsApp or the app when they reach the site, with location. The agent prepares timesheets per job and flags overtime and breaks before they become a problem.",
        metricLabel: "to close the month's hours",
      },
      marketing: {
        name: "Local marketing",
        short: "Finished jobs → new customers",
        description: "Every finished job becomes content: before and after photos, a review requested from the customer and posts for the local area. The agent prepares it and someone approves it.",
        metricLabel: "Google reviews in 6 months",
      },
      compras: {
        name: "Purchasing and invoices",
        short: "Materials and invoices per job",
        description: "Material ordered from suppliers straight from the site, with delivery notes and invoices read by the agent and assigned to each project. You know what every job really costs, not at the end.",
        metricLabel: "of admin saved every week",
      },
      datos: {
        name: "Jobs dashboard",
        short: "Profitability and overruns",
        description: "Real margin per job, hours against quote and materials assigned, in a dashboard that updates itself. The manager asks the agent «which jobs are losing money this month?» and gets an answer backed by data.",
        metricLabel: "of average margin per job",
      },
    },
  },
  clinica: {
    company: "Arce Dental Clinic",
    sector: "Healthcare · dental clinic",
    size: "3 surgeries · 11 people",
    hub: { label: "The clinic's agent", sub: "WhatsApp · phone · web" },
    modules: {
      agenda: {
        name: "Conversational calendar",
        short: "Appointments by WhatsApp and phone",
        description: "Patients book, move and confirm appointments by talking to the agent. Gaps are filled from the waiting list and reminders cut no-shows.",
        metricLabel: "no-show appointments",
      },
      historial: {
        name: "Records and consent forms",
        short: "Patient documentation",
        description: "Clinical history, consent forms signed on a tablet and the progress of each treatment, dictated by voice during the appointment and filed in the patient's record.",
        metricLabel: "sheets of paper in the surgery",
      },
      presupuestos: {
        name: "CRM and treatment plans",
        short: "Treatments and financing",
        description: "Every treatment plan is quoted in the surgery itself, sent to the patient and followed up when it has not started, with financing options.",
        metricLabel: "treatments accepted",
      },
      turnos: {
        name: "Shifts and attendance",
        short: "HR for the clinical team",
        description: "Shifts per surgery, clocking in from the phone, holidays and cover handled by the agent, with hours ready for payroll.",
        metricLabel: "a month on rotas, previously 2 days",
      },
      recall: {
        name: "Marketing and recalls",
        short: "Patients who come back",
        description: "Annual check-up reminders, hygiene and whitening campaigns and reviews requested after each treatment, in the clinic's own tone.",
        metricLabel: "of inactive patients brought back",
      },
      facturacion: {
        name: "Billing and insurers",
        short: "Payments and insurance",
        description: "Invoices issued when the appointment closes, payments reconciled and insurer settlements prepared by the agent, with alerts for what is still outstanding.",
        metricLabel: "to settle with insurers, previously 3 weeks",
      },
      datos: {
        name: "Clinic analytics",
        short: "Occupancy, treatments and revenue",
        description: "Occupancy of each chair, no-shows, revenue per treatment and quotes accepted, in a dashboard filled automatically from the calendar and the billing system.",
        metricLabel: "calendar occupancy, previously 74 %",
      },
    },
  },
  distribucion: {
    company: "Norte Wholesale",
    sector: "Wholesale distribution",
    size: "2 warehouses · 38 people",
    hub: { label: "Norte's agent", sub: "WhatsApp · email · portal" },
    modules: {
      pedidos: {
        name: "Orders over WhatsApp",
        short: "B2B portal on WhatsApp",
        description: "Customers order the way they always have, by WhatsApp or email, even as a photo of a handwritten list. The agent understands the order, confirms price and lead time and creates it in the system.",
        metricLabel: "from message to confirmed order",
      },
      stock: {
        name: "Stock and warehouse",
        short: "Locations and minimums",
        description: "Inventory by location in each warehouse, minimum levels that trigger purchase suggestions and an agent you can ask «how many 4471s are left?» without opening anything.",
        metricLabel: "stock-outs",
      },
      crm: {
        name: "CRM and price tiers",
        short: "Customers, prices and visits",
        description: "Every customer with their price tier, their terms and their history. Reps dictate visits by voice and the agent prepares offers and flags customers who have not ordered in a while.",
        metricLabel: "sales to existing customers",
      },
      rutas: {
        name: "Routes and delivery",
        short: "Deliveries and proof of delivery",
        description: "Daily routes optimised, the customer notified with an estimated time and the delivery note signed on the driver's phone. Issues reach the agent immediately.",
        metricLabel: "deliveries on time",
      },
      fichaje: {
        name: "Attendance and timesheets",
        short: "HR for warehouse and delivery",
        description: "Clocking in at the warehouse and on the road, seasonal shifts and timesheets per team ready for payroll, with overtime alerts.",
        metricLabel: "issues with labour inspections",
      },
      cobros: {
        name: "Invoicing and collections",
        short: "Credit risk and due dates",
        description: "Invoices issued on delivery, due dates watched and polite chasing handled by the agent before an unpaid invoice becomes a problem.",
        metricLabel: "in average collection period",
      },
      datos: {
        name: "Sales and stock analytics",
        short: "Turnover, margins and forecasting",
        description: "Sales by customer and product family, real margin per order, turnover of each item and demand forecasting, in a dashboard fed by orders, the warehouse and payments.",
        metricLabel: "of stock sitting still",
      },
    },
  },
};

/** Nombre corto de cada sector para la tira de la home. */
const sectorShortEn: Record<string, string> = {
  "instalaciones-electricas": "Installers",
  "construccion-reformas": "Construction and renovation",
  "clinicas-salud": "Clinics and healthcare",
  "asesorias-gestorias-despachos": "Accountants and law firms",
  "distribucion-mayoristas": "Wholesale",
  "comercio-ecommerce": "Retail and e-commerce",
  "hosteleria-restaurantes-hoteles": "Hospitality",
  "inmobiliarias-administracion-fincas": "Property",
  "industria-talleres": "Industry and workshops",
  "transporte-logistica": "Transport and logistics",
  "agroalimentario-cooperativas": "Agrifood",
};

/** Familias y ofertas de servicio, para el pie. */
export const serviceCopyEn: Record<string, string> = {
  "Sistemas de IA": "AI systems",
  "Consultoría de IA": "AI consulting",
  "Automatizaciones de procesos": "Process automation",
  "Agentes de IA": "AI agents",
  "Apps corporativas a medida": "Custom business apps",
  "IA corporativa: el sistema completo": "Enterprise AI: the full system",
  "Diagnóstico de automatización": "Automation assessment",
  "I+D y pruebas de concepto": "R&D and proofs of concept",
  "Diseño de producto": "Product design",
  "Roadmap corporativo de IA": "Corporate AI roadmap",
};

function localizeFlow(flow: AreaFlow, lang: Lang): AreaFlow {
  const copy = lang === "en" ? flowsEn[flow.id] : undefined;
  if (!copy) return flow;
  return {
    ...flow,
    area: copy.area,
    title: copy.title,
    hook: copy.hook,
    metric: { ...flow.metric, label: copy.metricLabel },
    nodes: flow.nodes.map((node) => {
      const n = copy.nodes[node.id];
      return n ? { ...node, label: n.label, sub: n.sub ?? node.sub } : node;
    }),
  };
}

function localizeSystem(system: CompanySystem, lang: Lang): CompanySystem {
  const copy = lang === "en" ? systemsEn[system.id] : undefined;
  if (!copy) return system;
  return {
    ...system,
    company: copy.company,
    sector: copy.sector,
    size: copy.size,
    hub: copy.hub,
    modules: system.modules.map((module) => {
      const m = copy.modules[module.id];
      return m
        ? { ...module, name: m.name, short: m.short, description: m.description, metric: { ...module.metric, label: m.metricLabel } }
        : module;
    }),
  };
}

/** Flujos por área en el idioma activo. */
export const useFlows = (): AreaFlow[] => {
  const { lang } = useLang();
  return useMemo(() => automationFlows.map((flow) => localizeFlow(flow, lang)), [lang]);
};

/** Sistemas de ejemplo en el idioma activo. */
export const useSystems = (): CompanySystem[] => {
  const { lang } = useLang();
  return useMemo(() => agentSystems.map((system) => localizeSystem(system, lang)), [lang]);
};

/** Sectores con el nombre corto traducido. */
export const useSectors = (): SectorDef[] => {
  const { lang } = useLang();
  return useMemo(
    () => (lang === "en" ? sectors.map((s) => ({ ...s, short: sectorShortEn[s.slug] ?? s.short })) : sectors),
    [lang]
  );
};

/** Traduce un nombre de servicio si hay versión inglesa; si no, lo deja igual. */
export const translateService = (name: string, lang: Lang) => (lang === "en" ? serviceCopyEn[name] ?? name : name);
