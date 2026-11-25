import { productFaqs } from "@/data/product";
import { resources, resourcePath, getResource, type Resource } from "@/data/resources";
import { caseStudies, casePath, getCase, type CaseStudy } from "@/data/cases";
import { productCases, productCasePath, getProductCase, type ProductCase } from "@/data/productCases";
import { provinces, getProvince, getMunicipality, slugify, type Province } from "@/data/locations";
import { services, getService, pillarOf, type ServiceDef } from "@/data/services";
import { site } from "@/data/site";
import { sectors, getSector, type SectorDef } from "@/data/sectors";

export interface RouteSeo {
  path: string;
  title: string;
  description: string;
  canonical: string;
  jsonLd: object[];
  /** Prioridad del sitemap. */
  priority: number;
  noindex?: boolean;
}

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${site.url}/#organization`,
  name: site.name,
  url: site.url,
  email: site.email,
  logo: `${site.url}/icon-512.png`,
  description: "IA privada para pymes: plataforma de IA propia, apps corporativas con IA y automatizaciones sobre los datos de cada empresa.",
  areaServed: [
    { "@type": "Country", name: "España" },
    ...site.onSiteProvinces.map((slug) => ({ "@type": "AdministrativeArea", name: provinces.find((prov) => prov.slug === slug)?.name ?? slug })),
  ],
  address: {
    "@type": "PostalAddress",
    ...(site.address.street ? { streetAddress: site.address.street } : {}),
    addressLocality: site.address.locality,
    addressRegion: site.address.region,
    ...(site.address.postalCode ? { postalCode: site.address.postalCode } : {}),
    addressCountry: site.address.country,
  },
  ...(site.phone ? { telephone: site.phone } : {}),
  sameAs: [site.linkedin, site.instagram],
  priceRange: "€€",
};

const canonicalUrl = (path: string) => `${site.url}${path === "/" ? "/" : `${path.replace(/\/+$/, "")}/`}`;

const breadcrumb = (items: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, i) => ({ "@type": "ListItem", position: i + 1, name: item.name, item: canonicalUrl(item.path) })),
});

const faqJsonLd = (faqs: { question: string; answer: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
});

export const servicePath = (service: ServiceDef) => `/servicios/${service.slug}/`;
export const sectorPath = (sector: SectorDef) => `/sectores/${sector.slug}/`;
export const provincePath = (province: Province) => `/automatizacion-ia/${province.slug}/`;
export const municipalityPath = (province: Province, municipality: string) => `/automatizacion-ia/${province.slug}/${slugify(municipality)}/`;

export function localFaqs(place: string, province: Province) {
  return [
    {
      question: `¿Trabajáis con empresas ${place}?`,
      answer:
        province.tier === 1
          ? `Sí, y de forma presencial: nuestra sede está en Utrera (Sevilla) y visitamos empresas de ${province.name} sin coste para la primera reunión. El seguimiento se hace por videollamada y en persona cuando el proyecto lo pide.`
          : `Sí. Trabajamos con pymes de toda España, ${place} incluido. La mayor parte del trabajo se hace en remoto con reuniones por videollamada y, cuando el proyecto lo pide, viajamos desde nuestra sede en Utrera (Sevilla).`,
    },
    { question: `¿Qué es una IA privada para una pyme ${place}?`, answer: "Una plataforma de IA de uso exclusivo para tu empresa: modelos abiertos en infraestructura dedicada, conectados a tus documentos y herramientas, con las apps corporativas que usa tu equipo. No es un chatbot público al que subes tus datos." },
    { question: `¿Qué tipo de empresas ${place} pueden aprovecharla?`, answer: `En ${province.name} vemos sobre todo ${province.sectors.slice(0, 3).map((s) => s.toLowerCase()).join(", ")}: negocios con mucha atención al cliente, presupuestos, pedidos y documentación, y con datos que no quieren sacar de la empresa.` },
    { question: "¿Dónde quedan los datos de mi empresa?", answer: "En una instancia de uso exclusivo, en servidores dedicados en la Unión Europea, con copias de seguridad cifradas y permisos por persona y por app. No se usan para entrenar modelos de terceros." },
    { question: "¿Cómo se empieza?", answer: "Con un piloto sobre un proceso concreto, probado con tus datos reales. El alcance y el plazo se acuerdan por escrito antes de empezar. No hace falta cambiar tus programas: la plataforma se conecta a tu correo, tu CRM, tu ERP y tus documentos." },
  ];
}

function localSeo(province: Province, municipality?: string): RouteSeo {
  const place = municipality ?? province.name;
  const placeIn = municipality ? `en ${municipality}` : province.in;
  const path = municipality ? municipalityPath(province, municipality) : provincePath(province);
  const crumbs = [
    { name: "Inicio", path: "/" },
    { name: "Zonas", path: "/zonas" },
    { name: province.name, path: provincePath(province) },
    ...(municipality ? [{ name: municipality, path }] : []),
  ];
  return {
    path,
    title: `IA privada y automatización para pymes ${placeIn} | Alpa Digital`,
    description: `IA privada para pymes ${placeIn} (${province.community}): apps corporativas, agentes y automatizaciones con los datos de tu empresa, en infraestructura dedicada en la UE. ${province.sectors.slice(0, 3).join(", ")}. Empezamos con un piloto.`,
    canonical: canonicalUrl(path),
    priority: municipality ? 0.6 : 0.7,
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "Service",
        name: `IA privada y automatización para pymes ${placeIn}`,
        serviceType: "IA privada, apps corporativas y automatización para pymes",
        provider: { "@id": `${site.url}/#organization` },
        areaServed: municipality
          ? { "@type": "City", name: municipality, containedInPlace: { "@type": "AdministrativeArea", name: province.name } }
          : { "@type": "AdministrativeArea", name: province.name },
        url: canonicalUrl(path),
      },
      breadcrumb(crumbs),
      faqJsonLd(localFaqs(placeIn, province)),
    ],
  };
}

function serviceSeo(service: ServiceDef): RouteSeo {
  const path = servicePath(service);
  return {
    path,
    title: service.title,
    description: service.description,
    canonical: canonicalUrl(path),
    priority: 0.9,
    jsonLd: [
      { "@context": "https://schema.org", "@type": "Service", name: service.name, description: service.description, provider: { "@id": `${site.url}/#organization` }, areaServed: { "@type": "Country", name: "España" }, url: canonicalUrl(path) },
      breadcrumb(
        service.pillar
          ? [{ name: "Inicio", path: "/" }, { name: "Servicios", path: "/servicios" }, { name: service.short, path }]
          : [{ name: "Inicio", path: "/" }, { name: "Servicios", path: "/servicios" }, { name: pillarOf(service.family).short, path: servicePath(pillarOf(service.family)) }, { name: service.short, path }]
      ),
      faqJsonLd(service.faqs),
    ],
  };
}

function sectorSeo(sector: SectorDef): RouteSeo {
  const path = sectorPath(sector);
  return {
    path,
    title: sector.title,
    description: sector.description,
    canonical: canonicalUrl(path),
    priority: 0.8,
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "Service",
        name: sector.h1,
        description: sector.description,
        provider: { "@id": `${site.url}/#organization` },
        audience: { "@type": "BusinessAudience", name: sector.name },
        areaServed: { "@type": "Country", name: "España" },
        url: canonicalUrl(path),
      },
      breadcrumb([{ name: "Inicio", path: "/" }, { name: "Sectores", path: "/sectores" }, { name: sector.short, path }]),
      faqJsonLd(sector.faqs),
    ],
  };
}

function resourceSeo(item: Resource): RouteSeo {
  const path = resourcePath(item);
  const canonical = canonicalUrl(path);
  return {
    path, title: `${item.title} | Alpa Digital`, description: item.summary, canonical, priority: 0.7,
    jsonLd: [
      { "@context": "https://schema.org", "@type": "Article", headline: item.title, description: item.summary, mainEntityOfPage: canonical, author: { "@type": "Organization", name: site.name, url: site.url }, publisher: { "@id": `${site.url}/#organization` } },
      breadcrumb([{ name: "Inicio", path: "/" }, { name: "Recursos", path: "/recursos/" }, { name: item.title, path }]),
    ],
  };
}

function caseSeo(item: CaseStudy): RouteSeo {
  const path = casePath(item);
  return {
    path, title: `${item.title} | Caso de Alpa Digital`, description: item.summary,
    canonical: canonicalUrl(path), priority: 0.8,
    jsonLd: [breadcrumb([{ name: "Inicio", path: "/" }, { name: "Casos", path: "/casos/" }, { name: item.title, path }])],
  };
}

function productCaseSeo(item: ProductCase): RouteSeo {
  const path = productCasePath(item);
  return { path, title: `${item.name}: desarrollo de producto digital | Alpa Digital`, description: item.summary, canonical: canonicalUrl(path), priority: 0.8, jsonLd: [breadcrumb([{ name: "Inicio", path: "/" }, { name: "Casos", path: "/casos/" }, { name: item.name, path }])] };
}

const staticRoutes: RouteSeo[] = [
  { path: "/contacto", title: "Contacto | IA privada para pymes | Alpa Digital", description: "Cuéntanos qué proceso le quita tiempo a tu equipo y con qué datos trabaja. Te proponemos un piloto de IA privada. Alpa Digital, desde Utrera para empresas de toda España.", canonical: canonicalUrl("/contacto"), priority: 0.7, jsonLd: [{ "@context": "https://schema.org", "@type": "ContactPage", name: "Contacto con Alpa Digital", url: canonicalUrl("/contacto"), about: { "@id": `${site.url}/#organization` } }, breadcrumb([{ name: "Inicio", path: "/" }, { name: "Contacto", path: "/contacto/" }])] },
  { path: "/servicios/desarrollo-producto-digital", title: "Desarrollo de producto digital: SaaS y apps | Alpa Digital", description: "Diseño y desarrollo de productos digitales para startups y empresas: plataformas SaaS, aplicaciones móviles y productos web, con IA cuando aporta valor.", canonical: canonicalUrl("/servicios/desarrollo-producto-digital"), priority: 0.9, jsonLd: [{ "@context": "https://schema.org", "@type": "Service", name: "Desarrollo de producto digital", description: "Diseño y desarrollo de plataformas SaaS, aplicaciones móviles y productos web para startups y empresas.", provider: { "@id": `${site.url}/#organization` }, areaServed: { "@type": "Country", name: "España" }, url: canonicalUrl("/servicios/desarrollo-producto-digital") }, breadcrumb([{ name: "Inicio", path: "/" }, { name: "Servicios", path: "/servicios/" }, { name: "Desarrollo de producto digital", path: "/servicios/desarrollo-producto-digital/" }]), faqJsonLd(productFaqs)] },
  { path: "/recursos", title: "Guías de IA privada y automatización para pymes | Alpa Digital", description: "Guías prácticas sobre IA privada, automatización, agentes de IA y procesos de empresa para decidir por dónde empezar.", canonical: canonicalUrl("/recursos"), priority: 0.8, jsonLd: [breadcrumb([{ name: "Inicio", path: "/" }, { name: "Recursos", path: "/recursos/" }])] },
  { path: "/casos", title: "Casos de IA aplicada y software | Alpa Digital", description: "Proyectos reales de IA aplicada en empresas como CAF y López Alcón Electrificaciones, y productos digitales desarrollados por Alpa.", canonical: canonicalUrl("/casos"), priority: 0.8, jsonLd: [breadcrumb([{ name: "Inicio", path: "/" }, { name: "Casos", path: "/casos/" }])] },
  { path: "/como-trabajamos", title: "Cómo trabajamos: del piloto a tu IA privada | Alpa Digital", description: "Empezamos con un piloto sobre un proceso real, lo probamos con tus datos en una instancia de IA privada y crecemos app a app sobre la misma instancia.", canonical: canonicalUrl("/como-trabajamos"), priority: 0.7, jsonLd: [breadcrumb([{ name: "Inicio", path: "/" }, { name: "Cómo trabajamos", path: "/como-trabajamos/" }])] },
  { path: "/nosotros", title: "El equipo de Alpa Digital | IA privada para pymes", description: "Conoce a Alpa Digital, el equipo que monta plataformas de IA privada para pymes de toda España, desde Utrera (Sevilla).", canonical: canonicalUrl("/nosotros"), priority: 0.7, jsonLd: [breadcrumb([{ name: "Inicio", path: "/" }, { name: "Nosotros", path: "/nosotros/" }])] },
  {
    path: "/",
    title: "Alpa Digital - IA privada para pymes: tus datos, bajo tu control",
    description: "Plataforma de IA privada para pymes: modelos abiertos en infraestructura dedicada en la UE, apps corporativas con IA y automatizaciones sobre tus datos. Empezamos con un piloto.",
    canonical: canonicalUrl("/"),
    priority: 1,
    jsonLd: [organizationJsonLd],
  },
  {
    path: "/servicios",
    title: "Servicios de IA privada para pymes: apps, agentes y automatizaciones | Alpa Digital",
    description: "Plataforma de IA privada para pymes con apps corporativas, agentes y automatizaciones sobre tus datos, consultoría y piloto, y desarrollo a medida.",
    canonical: canonicalUrl("/servicios"),
    priority: 0.8,
    jsonLd: [breadcrumb([{ name: "Inicio", path: "/" }, { name: "Servicios", path: "/servicios" }])],
  },
  {
    path: "/sectores",
    title: "IA privada por sectores: instalaciones, clínicas, asesorías, distribución y más | Alpa Digital",
    description: "Qué apps y automatizaciones de IA privada encajan en cada sector: instalaciones eléctricas, construcción, clínicas, asesorías, distribución, comercio, hostelería, inmobiliarias, industria, transporte y agroalimentario.",
    canonical: canonicalUrl("/sectores"),
    priority: 0.8,
    jsonLd: [breadcrumb([{ name: "Inicio", path: "/" }, { name: "Sectores", path: "/sectores" }])],
  },
  {
    path: "/zonas",
    title: "IA privada para pymes en toda España, por provincia | Alpa Digital",
    description: "Montamos IA privada para pymes de todas las provincias de España. Elige tu provincia o municipio y descubre qué apps y automatizaciones encajan en las empresas de tu zona.",
    canonical: canonicalUrl("/zonas"),
    priority: 0.6,
    jsonLd: [breadcrumb([{ name: "Inicio", path: "/" }, { name: "Zonas", path: "/zonas" }])],
  },
  {
    path: "/politica-cookies",
    title: "Política de cookies | Alpa Digital",
    description: "Información sobre las cookies que utiliza alpa.digital y cómo gestionarlas.",
    canonical: canonicalUrl("/politica-cookies"),
    priority: 0.1,
    jsonLd: [],
  },
];

/** Todas las rutas indexables, para el prerenderizado y el sitemap. */
export function allRoutes(): RouteSeo[] {
  const routes: RouteSeo[] = [...staticRoutes];
  resources.forEach((item) => routes.push(resourceSeo(item)));
  caseStudies.forEach((item) => routes.push(caseSeo(item)));
  productCases.forEach((item) => routes.push(productCaseSeo(item)));
  services.forEach((service) => routes.push(serviceSeo(service)));
  sectors.forEach((sector) => routes.push(sectorSeo(sector)));
  provinces.forEach((province) => {
    routes.push(localSeo(province));
    [province.capital, ...province.municipalities].forEach((m) => routes.push(localSeo(province, m)));
  });
  return routes;
}

/** SEO de una ruta concreta; undefined si no existe. */
export function getRouteSeo(path: string): RouteSeo | undefined {
  const clean = path.replace(/\/+$/, "") || "/";
  const fixed = staticRoutes.find((r) => r.path === clean);
  if (fixed) return fixed;
  const resourceMatch = clean.match(/^\/recursos\/([a-z0-9-]+)$/);
  if (resourceMatch) {
    const item = getResource(resourceMatch[1]);
    return item ? resourceSeo(item) : undefined;
  }
  const caseMatch = clean.match(/^\/casos\/([a-z0-9-]+)$/);
  if (caseMatch) {
    const product = getProductCase(caseMatch[1]);
    if (product) return productCaseSeo(product);
    const item = getCase(caseMatch[1]);
    return item ? caseSeo(item) : undefined;
  }
  const serviceMatch = clean.match(/^\/servicios\/([a-z0-9-]+)$/);
  if (serviceMatch) {
    const service = getService(serviceMatch[1]);
    return service ? serviceSeo(service) : undefined;
  }
  const sectorMatch = clean.match(/^\/sectores\/([a-z0-9-]+)$/);
  if (sectorMatch) {
    const sector = getSector(sectorMatch[1]);
    return sector ? sectorSeo(sector) : undefined;
  }
  const localMatch = clean.match(/^\/automatizacion-ia\/([a-z0-9-]+)(?:\/([a-z0-9-]+))?$/);
  if (localMatch) {
    if (localMatch[2]) {
      const m = getMunicipality(localMatch[1], localMatch[2]);
      return m ? localSeo(m.province, m.name) : undefined;
    }
    const province = getProvince(localMatch[1]);
    return province ? localSeo(province) : undefined;
  }
  return undefined;
}

/** Etiquetas <head> de una ruta, para el prerenderizado. */
export function renderHeadTags(seo: RouteSeo): string {
  const esc = (v: string) => v.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
  const tags = [
    `<title>${esc(seo.title)}</title>`,
    `<meta name="description" content="${esc(seo.description)}" />`,
    `<link rel="canonical" href="${seo.canonical}" />`,
    seo.noindex ? `<meta name="robots" content="noindex, follow" />` : `<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:url" content="${seo.canonical}" />`,
    `<meta property="og:title" content="${esc(seo.title)}" />`,
    `<meta property="og:description" content="${esc(seo.description)}" />`,
    `<meta property="og:image" content="${site.url}/og-image.jpg" />`,
    `<meta property="og:site_name" content="${site.name}" />`,
    `<meta property="og:locale" content="es_ES" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(seo.title)}" />`,
    `<meta name="twitter:description" content="${esc(seo.description)}" />`,
    `<meta name="twitter:image" content="${site.url}/og-image.jpg" />`,
    ...seo.jsonLd.map((data) => `<script type="application/ld+json" data-route-jsonld="1">${JSON.stringify(data).replace(/</g, "\\u003c")}</script>`),
  ];
  return tags.join("\n    ");
}
