import { provinces, getProvince, getMunicipality, slugify, type Province } from "@/data/locations";
import { services, getService, pillarOf, type ServiceDef } from "@/data/services";
import { site } from "@/data/site";

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
  logo: `${site.url}/alpa-logo.png`,
  description: "Consultoría, automatización y desarrollo con inteligencia artificial para pequeñas y medianas empresas en España.",
  areaServed: [
    { "@type": "Country", name: "España" },
    ...site.onSiteProvinces.map((slug) => ({ "@type": "AdministrativeArea", name: provinces.find((prov) => prov.slug === slug)?.name ?? slug })),
  ],
  address: {
    "@type": "PostalAddress",
    ...(site.address.street ? { streetAddress: site.address.street } : {}),
    addressLocality: site.address.locality,
    addressRegion: site.address.region,
    postalCode: site.address.postalCode,
    addressCountry: site.address.country,
  },
  ...(site.phone ? { telephone: site.phone } : {}),
  sameAs: [site.linkedin, site.instagram],
  priceRange: "€€",
};

const breadcrumb = (items: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, i) => ({ "@type": "ListItem", position: i + 1, name: item.name, item: `${site.url}${item.path}` })),
});

const faqJsonLd = (faqs: { question: string; answer: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
});

export const servicePath = (service: ServiceDef) => `/servicios/${service.slug}`;
export const provincePath = (province: Province) => `/automatizacion-ia/${province.slug}`;
export const municipalityPath = (province: Province, municipality: string) => `/automatizacion-ia/${province.slug}/${slugify(municipality)}`;

export function localFaqs(place: string, province: Province) {
  return [
    {
      question: `¿Trabajáis con empresas ${place}?`,
      answer:
        province.tier === 1
          ? `Sí, y de forma presencial: nuestra sede está en Utrera (Sevilla) y visitamos empresas de ${province.name} sin coste para la primera reunión. El seguimiento se hace por videollamada y en persona cuando el proyecto lo pide.`
          : `Sí. Trabajamos con pymes de toda España, ${place} incluido. La mayor parte del trabajo se hace en remoto con reuniones por videollamada y, cuando el proyecto lo pide, viajamos desde nuestra sede en Utrera (Sevilla).`,
    },
    { question: `¿Qué tipo de empresas ${place} automatizan con IA?`, answer: `En ${province.name} vemos sobre todo ${province.sectors.slice(0, 3).map((s) => s.toLowerCase()).join(", ")}: negocios con mucha atención al cliente, presupuestos, pedidos y documentación que se puede automatizar.` },
    { question: "¿Cuánto cuesta y cuánto se tarda?", answer: "El diagnóstico cuesta 490 € y dura una o dos semanas. Cada automatización parte de 1.500 € con alcance, precio y plazo cerrados, normalmente entre dos y seis semanas. El acompañamiento mensual son 350 € sin permanencia." },
    { question: "¿Necesito cambiar mis programas?", answer: "No. Conectamos la automatización a lo que ya usas: correo, WhatsApp, tu CRM, tu programa de facturación o tu ERP." },
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
    title: `Automatización con IA para pymes ${placeIn} | Alpa Digital`,
    description: `Automatización, agentes de IA y software a medida para pymes ${placeIn} (${province.community}). ${province.sectors.slice(0, 3).join(", ")}. Diagnóstico por 490 € y automatizaciones desde 1.500 € con precio cerrado.`,
    canonical: `${site.url}${path}`,
    priority: municipality ? 0.6 : 0.7,
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "Service",
        name: `Automatización con IA para pymes ${placeIn}`,
        serviceType: "Automatización e inteligencia artificial para pymes",
        provider: { "@id": `${site.url}/#organization` },
        areaServed: municipality
          ? { "@type": "City", name: municipality, containedInPlace: { "@type": "AdministrativeArea", name: province.name } }
          : { "@type": "AdministrativeArea", name: province.name },
        url: `${site.url}${path}`,
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
    canonical: `${site.url}${path}`,
    priority: 0.9,
    jsonLd: [
      { "@context": "https://schema.org", "@type": "Service", name: service.name, description: service.description, provider: { "@id": `${site.url}/#organization` }, areaServed: { "@type": "Country", name: "España" }, url: `${site.url}${path}` },
      breadcrumb(
        service.pillar
          ? [{ name: "Inicio", path: "/" }, { name: "Servicios", path: "/servicios" }, { name: service.short, path }]
          : [{ name: "Inicio", path: "/" }, { name: "Servicios", path: "/servicios" }, { name: pillarOf(service.family).short, path: servicePath(pillarOf(service.family)) }, { name: service.short, path }]
      ),
      faqJsonLd(service.faqs),
    ],
  };
}

const staticRoutes: RouteSeo[] = [
  {
    path: "/",
    title: "Alpa Digital - Automatización con IA y consultoría para pymes",
    description: "Automatizamos con inteligencia artificial las tareas repetitivas de tu pyme: atención al cliente, presupuestos, facturación y seguimiento comercial. Diagnóstico, implementación y acompañamiento con presupuesto cerrado.",
    canonical: site.url,
    priority: 1,
    jsonLd: [organizationJsonLd],
  },
  {
    path: "/servicios",
    title: "Servicios: sistemas de IA y consultoría de IA para pymes | Alpa Digital",
    description: "Dos líneas de servicio: construimos sistemas de herramientas y automatizaciones con IA (automatizaciones, agentes, apps corporativas, IA corporativa) y hacemos consultoría de IA (diagnóstico, I+D, diseño de producto, roadmap). Precio cerrado.",
    canonical: `${site.url}/servicios`,
    priority: 0.8,
    jsonLd: [breadcrumb([{ name: "Inicio", path: "/" }, { name: "Servicios", path: "/servicios" }])],
  },
  {
    path: "/zonas",
    title: "Automatización con IA para pymes en toda España, por provincia | Alpa Digital",
    description: "Trabajamos con pymes de todas las provincias de España. Elige tu provincia o municipio y descubre qué automatizan las empresas de tu zona.",
    canonical: `${site.url}/zonas`,
    priority: 0.6,
    jsonLd: [breadcrumb([{ name: "Inicio", path: "/" }, { name: "Zonas", path: "/zonas" }])],
  },
  {
    path: "/politica-cookies",
    title: "Política de cookies | Alpa Digital",
    description: "Información sobre las cookies que utiliza alpa.digital y cómo gestionarlas.",
    canonical: `${site.url}/politica-cookies`,
    priority: 0.1,
    jsonLd: [],
  },
];

/** Todas las rutas indexables, para el prerenderizado y el sitemap. */
export function allRoutes(): RouteSeo[] {
  const routes: RouteSeo[] = [...staticRoutes];
  services.forEach((service) => routes.push(serviceSeo(service)));
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
  const serviceMatch = clean.match(/^\/servicios\/([a-z0-9-]+)$/);
  if (serviceMatch) {
    const service = getService(serviceMatch[1]);
    return service ? serviceSeo(service) : undefined;
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
    ...seo.jsonLd.map((data) => `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, "\\u003c")}</script>`),
  ];
  return tags.join("\n    ");
}
