export interface CaseStudy {
  slug: string;
  sector: string;
  title: string;
  summary: string;
  context: string;
  approach: string;
  outcome: string;
  relatedService: string;
  relatedSector?: string;
}

/** Proyectos reales anonimizados. Añadir cifras solo cuando estén verificadas. */
export const caseStudies: CaseStudy[] = [
  {
    slug: "seleccion-candidatos-sector-electrico",
    sector: "Empresa del sector eléctrico",
    title: "Digitalización y apoyo a la selección de candidatos con IA",
    summary: "Digitalización de una empresa del sector eléctrico y automatización inicial del análisis de candidaturas para recursos humanos.",
    context: "Una empresa del sector eléctrico inició la digitalización de sus procesos y buscaba agilizar el trabajo de su departamento de recursos humanos al revisar candidaturas.",
    approach: "El proyecto comenzó con la digitalización de la empresa y la automatización del análisis de candidatos mediante IA, para ayudar a identificar perfiles que encajen con los criterios buscados.",
    outcome: "El equipo de recursos humanos dispone de apoyo para analizar y filtrar candidaturas según los perfiles que busca.",
    relatedService: "automatizacion-ia-pymes",
    relatedSector: "instalaciones-electricas",
  },
  {
    slug: "consulta-manuales-mantenimiento-ferroviario",
    sector: "Mantenimiento ferroviario",
    title: "Consultas de manuales para mantenimiento ferroviario",
    summary: "Un sistema de consulta de documentación ayuda a operarios de una línea ferroviaria de Oslo a encontrar información sobre piezas y componentes.",
    context: "Los operarios de una empresa del sector ferroviario necesitaban consultar manuales de mantenimiento para piezas y componentes de trenes en una línea de Oslo.",
    approach: "Automatizamos la consulta de los manuales para que los operarios puedan plantear preguntas y acceder con rapidez a respuestas sobre el mantenimiento de los componentes.",
    outcome: "Los operarios pueden realizar consultas rápidas y obtener respuestas precisas y completas sobre el mantenimiento de piezas y componentes.",
    relatedService: "agentes-ia-empresas",
    relatedSector: "transporte-logistica",
  },
];

export const casePath = (item: CaseStudy) => `/casos/${item.slug}/`;
export const getCase = (slug: string) => caseStudies.find((item) => item.slug === slug);
