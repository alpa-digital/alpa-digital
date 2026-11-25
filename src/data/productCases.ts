/** Referencias de producto autorizadas para mencionar por Alpa. */
export interface ProductCase {
  slug: string;
  name: string;
  category: string;
  headline: string;
  summary: string;
  purpose: string;
  imageDescription: string;
  imageCaption: string;
  contribution: string;
  logo?: boolean;
  noImage?: boolean;
  noExternalLink?: boolean;
  url: string;
}

export const productCases: ProductCase[] = [
  {
    slug: "makernotch",
    name: "MakerNotch",
    category: "Aplicación para Mac",
    headline: "Los proyectos, a la vista desde el Mac",
    summary: "MakerNotch reúne información sobre el estado y la actividad de proyectos en una aplicación para Mac.",
    purpose: "MakerNotch permite consultar información de proyectos desde el escritorio. La vista mostrada reúne actividad de desarrollo, como solicitudes de cambios, en una interfaz compacta.",
    imageDescription: "Vista de MakerNotch con solicitudes de cambios y actividad de desarrollo.",
    imageCaption: "Captura del producto con datos de ejemplo.",
    contribution: "En Alpa desarrollamos MakerNotch desde cero.",
    url: "https://makernotch.com",
  },
  {
    slug: "boughtcast",
    name: "Boughtcast",
    category: "Plataforma web",
    headline: "Una plataforma para compartir experiencias de compra",
    summary: "Boughtcast es una plataforma para crear campañas que invitan a compradores a compartir su experiencia.",
    purpose: "La plataforma reúne información de campañas y participaciones en un panel. Desde él se pueden consultar, entre otros datos, las publicaciones recibidas y su estado de revisión.",
    imageDescription: "Panel de Boughtcast con información de una campaña y sus participaciones.",
    imageCaption: "Captura del producto con datos de ejemplo.",
    contribution: "En Alpa desarrollamos Boughtcast desde cero.",
    url: "https://boughtcast.com",
  },
  {
    slug: "brandtoads",
    name: "BrandToAds",
    category: "Plataforma web",
    headline: "Creatividades publicitarias a partir de una marca",
    summary: "BrandToAds es una plataforma que utiliza información de una web para ayudar a crear contenido publicitario alineado con una marca.",
    purpose: "A partir de la dirección de una web, BrandToAds presenta herramientas para identificar elementos de una marca y generar textos y recursos visuales para campañas. El equipo puede revisarlos antes de utilizarlos.",
    imageDescription: "Logotipo de BrandToAds.",
    imageCaption: "Logotipo de BrandToAds.",
    contribution: "Alpa ha desarrollado BrandToAds como producto digital.",
    logo: true,
    url: "https://brandtoads.com",
  },
  {
    slug: "climbber",
    name: "Climbber",
    category: "Plataforma web",
    headline: "Estrategia y contenido para proyectos en crecimiento",
    summary: "Climbber es una plataforma de creación de contenido con IA para emprendedores, startups y empresas.",
    purpose: "Climbber presenta herramientas para analizar un proyecto y preparar contenido adaptado a diferentes canales, como LinkedIn, Instagram, X y newsletters. Incluye planificación y seguimiento del contenido.",
    imageDescription: "",
    imageCaption: "",
    contribution: "Alpa ha desarrollado Climbber como producto digital.",
    noImage: true,
    noExternalLink: true,
    url: "https://climbber.com",
  },
];

export const productCasePath = (item: ProductCase) => `/casos/${item.slug}/`;
export const getProductCase = (slug: string) => productCases.find((item) => item.slug === slug);
