import { productCases } from "@/data/productCases";
import { caseStudies } from "@/data/cases";
import makerImage from "@/assets/projects/makernotch-cicd.webp";
import boughtImage from "@/assets/projects/boughtcast-dashboard.webp";
import brandLogo from "@/assets/projects/brandtoads-logo.png";
import type { Lang } from "@/i18n";

export interface WorkProject {
  slug: string;
  name: string;
  headline: string;
  summary: string;
  category: string;
  kind: "producto" | "automatizacion";
  scope: string;
  deliverable: string;
  coverText?: string;
  media?: { src: string; width: number; height: number; alt: string; caption: string; logo?: boolean };
  website?: string;
  sections: { id: string; title: string; text: string }[];
  points: string[];
  service: string;
  sector?: string;
}

const media: Record<string, { src: string; width: number; height: number; logo?: boolean }> = {
  makernotch: { src: makerImage, width: 1600, height: 644 },
  boughtcast: { src: boughtImage, width: 2880, height: 1800 },
  brandtoads: { src: brandLogo, width: 1663, height: 426, logo: true },
};
const productDetails: Record<string, { en: { category: string; headline: string; summary: string; purpose: string; contribution: string; alt: string }; points: Record<Lang, string[]> }> = {
  makernotch: {
    en: { category: "Mac application", headline: "Your projects, a glance away on your Mac.", summary: "MakerNotch brings project status and activity into a Mac application.", purpose: "MakerNotch lets users check project information from their desktop. The view shown brings development activity, including pull requests, into a compact interface.", contribution: "Alpa developed MakerNotch from scratch.", alt: "MakerNotch showing pull requests and development activity" },
    points: { es: ["Información de proyectos desde el escritorio", "Actividad de desarrollo y solicitudes de cambios", "Una vista compacta para Mac"], en: ["Project information on the desktop", "Development activity and pull requests", "A compact view for Mac"] },
  },
  boughtcast: {
    en: { category: "Web platform", headline: "A platform for sharing buying experiences.", summary: "Boughtcast is a platform for creating campaigns that invite buyers to share their experience.", purpose: "The platform brings campaign and participation information into a dashboard. It provides a view of submitted posts and their review status, among other details.", contribution: "Alpa developed Boughtcast from scratch.", alt: "Boughtcast dashboard with campaign information and participation" },
    points: { es: ["Información de campañas en un panel", "Consulta de las participaciones recibidas", "Estado de revisión de las publicaciones"], en: ["Campaign information in one dashboard", "A view of received submissions", "Post review status"] },
  },
  brandtoads: {
    en: { category: "Web platform", headline: "Ad creatives built around a brand.", summary: "BrandToAds uses website information to help create advertising content aligned with a brand.", purpose: "Starting with a website URL, BrandToAds provides tools to identify brand elements and generate copy and visual resources for campaigns. The team can review them before use.", contribution: "Alpa developed BrandToAds as a digital product.", alt: "BrandToAds logo" },
    points: { es: ["Información de marca a partir de una web", "Textos y recursos visuales para campañas", "Revisión del contenido antes de utilizarlo"], en: ["Brand information from a website", "Copy and visual resources for campaigns", "Content review before use"] },
  },
  climbber: {
    en: { category: "Web platform", headline: "Strategy and content for growing projects.", summary: "Climbber is an AI content creation platform for entrepreneurs, startups and businesses.", purpose: "Climbber provides tools to analyse a project and prepare content for channels such as LinkedIn, Instagram, X and newsletters. It includes content planning and tracking.", contribution: "Alpa developed Climbber as a digital product.", alt: "" },
    points: { es: ["Análisis de proyectos", "Preparación de contenido para distintos canales", "Planificación y seguimiento del contenido"], en: ["Project analysis", "Content preparation for different channels", "Content planning and tracking"] },
  },
};

export const workPath = (project: Pick<WorkProject, "slug">) => `/casos/${project.slug}/`;

/** Spanish project facts come from the existing case records; translations add no claims. */
export const getWorkProjects = (lang: Lang): WorkProject[] => {
  const en = lang === "en";
  const products: WorkProject[] = productCases.map(item => {
    const detail = productDetails[item.slug];
    const translated = detail.en;
    const asset = media[item.slug];
    return {
      slug: item.slug, name: item.name, kind: "producto",
      headline: en ? translated.headline : item.headline,
      summary: en ? translated.summary : item.summary,
      category: en ? translated.category : item.category,
      scope: ["makernotch", "boughtcast"].includes(item.slug) ? (en ? "Development from scratch" : "Desarrollo desde cero") : (en ? "Digital product development" : "Desarrollo de producto digital"),
      deliverable: en ? translated.category : item.category,
      ...(asset ? { media: { ...asset, alt: en ? translated.alt : item.imageDescription, caption: asset.logo ? (en ? "Product logo" : item.imageCaption) : (en ? "Product screenshot with sample data" : item.imageCaption) } } : {}),
      ...(!item.noExternalLink ? { website: item.url } : {}),
      sections: [
        { id: "producto", title: en ? "The product" : "El producto", text: en ? translated.purpose : item.purpose },
        { id: "aportacion", title: en ? "Alpa's contribution" : "La aportación de Alpa", text: en ? translated.contribution : item.contribution },
      ],
      points: detail.points[lang], service: "desarrollo-producto-digital",
    };
  });
  const automations: WorkProject[] = caseStudies.map((item, index) => {
    const electrical = index === 0;
    return {
      slug: item.slug, kind: "automatizacion",
      name: electrical ? (en ? "Candidate analysis" : "Selección de candidatos") : (en ? "Railway maintenance" : "Mantenimiento ferroviario"),
      headline: en ? (electrical ? "Digitisation and AI-assisted candidate analysis." : "Searching manuals for railway maintenance.") : item.title,
      summary: en ? (electrical ? "Digitisation of an electrical company and initial automation of candidate analysis for its HR department." : "A documentation search system helps operators on a railway line in Oslo find information on train parts and components.") : item.summary,
      category: en ? (electrical ? "Electrical sector" : "Railway maintenance") : item.sector,
      scope: en ? (electrical ? "Digitisation and AI automation" : "Automated documentation search") : (electrical ? "Digitalización y automatización con IA" : "Automatización de consultas documentales"),
      deliverable: en ? (electrical ? "Support for candidate analysis" : "Maintenance manual search") : (electrical ? "Apoyo al análisis de candidaturas" : "Consulta de manuales de mantenimiento"),
      coverText: en ? (electrical ? "Support for\ncandidate analysis." : "Queries about\nmaintenance manuals.") : (electrical ? "Apoyo a la\nselección de candidatos." : "Consultas sobre\nmanuales de mantenimiento."),
      sections: [
        { id: "contexto", title: en ? "The starting point" : "El punto de partida", text: en ? (electrical ? "An electrical company started digitising its processes and wanted to help its HR team review applications more efficiently." : "Operators at a railway company needed to consult maintenance manuals for train parts and components on a line in Oslo.") : item.context },
        { id: "aportacion", title: en ? "What we did" : "Qué hicimos", text: en ? (electrical ? "The project began with digitisation and AI-assisted candidate analysis to help identify profiles matching the required criteria." : "We automated manual search so operators can ask questions and quickly access information about component maintenance.") : item.approach },
        { id: "solucion", title: en ? "The solution in use" : "La solución en uso", text: en ? (electrical ? "The HR team has support for analysing and filtering applications against the profiles it needs." : "Operators can ask quick questions and get precise, complete answers about the maintenance of train parts and components.") : item.outcome },
      ],
      points: en ? (electrical ? ["Company digitisation", "AI-assisted candidate analysis", "Support for filtering profiles"] : ["Maintenance manual queries", "Information about parts and components", "Answers for railway operators"]) : (electrical ? ["Digitalización de la empresa", "Análisis de candidaturas mediante IA", "Apoyo al filtrado de perfiles"] : ["Consultas sobre manuales de mantenimiento", "Información de piezas y componentes", "Respuestas para los operarios"]),
      service: item.relatedService, sector: item.relatedSector,
    };
  });
  return [...products, ...automations];
};

export const workCopy = {
  es: {
    label: "Trabajos de Alpa", title: ["Lo que hemos", "construido."], intro: "Productos digitales y automatizaciones para empresas y startups. Una selección de trabajos que muestra qué hacemos y cómo lo llevamos a la práctica.",
    all: "Todos", products: "Producto digital", automation: "Automatización e IA", filters: "Filtrar proyectos", views: "Vista de proyectos", grid: "Ver en cuadrícula", list: "Ver en lista", results: "proyectos", samples: "Las capturas muestran datos de ejemplo.", project: "Ver proyecto", anonymous: "Proyecto anonimizado", brand: "Logotipo del producto", product: "Producto digital", category: "Tipo de proyecto", scope: "Trabajo de Alpa", deliverable: "Solución", back: "Todos los trabajos", visit: "Visitar la web", overview: "Resumen", contents: "En este proyecto", points: "Qué permite hacer", enlarge: "Ampliar captura", close: "Cerrar imagen", related: "Otros trabajos", previous: "Proyecto anterior", next: "Siguiente proyecto", service: "Conocer el servicio", sector: "Ver el sector", discuss: "Hablemos de un proyecto parecido", noMedia: "Proyecto compartido de forma anonimizada para proteger la identidad del cliente.",
  },
  en: {
    label: "Alpa's work", title: ["What we have", "built."], intro: "Digital products and automation for businesses and startups. A selection of work showing what we do and how we put it into practice.",
    all: "All", products: "Digital products", automation: "Automation and AI", filters: "Filter projects", views: "Project view", grid: "Grid view", list: "List view", results: "projects", samples: "Screenshots show sample data.", project: "Explore project", anonymous: "Anonymised project", brand: "Product logo", product: "Digital product", category: "Project type", scope: "Alpa's work", deliverable: "Solution", back: "All work", visit: "Visit website", overview: "Overview", contents: "In this project", points: "What it enables", enlarge: "Enlarge screenshot", close: "Close image", related: "More work", previous: "Previous project", next: "Next project", service: "Explore the service", sector: "Explore the sector", discuss: "Let's discuss a similar project", noMedia: "This project is shared anonymously to protect the client's identity.",
  },
};
