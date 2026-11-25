import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { caseStudies, casePath } from "@/data/cases";
import { useLang } from "@/i18n";
import ClientLogo, { clientBySlug } from "@/components/ClientLogo";

/** Portada de cada caso destacado: el flujo que resuelve, en tres pasos. Sin cifras: solo las que estén verificadas. */
const caseCovers: Record<string, { client: string; es: { name: string; sector: string; detail: string; steps: string[] }; en: { name: string; sector: string; title: string; summary: string; detail: string; steps: string[] } }> = {
  "seleccion-candidatos-sector-electrico": {
    client: "lopez-alcon",
    es: { name: "Selección de candidatos", sector: "Instalaciones eléctricas", detail: "López Alcón Electrificaciones · Digitalización y RR. HH.", steps: ["Llega una candidatura", "La IA la analiza con los criterios del puesto", "RR. HH. revisa los perfiles que encajan"] },
    en: { name: "Candidate screening", detail: "López Alcón Electrificaciones · Digitalisation and HR", sector: "Electrical installations", title: "Digitalisation and AI-assisted candidate screening", summary: "Digitalisation of an electrical sector company and initial automation of candidate analysis for its HR team.", steps: ["An application arrives", "AI analyses it against the role criteria", "HR reviews the profiles that fit"] },
  },
  "consulta-manuales-mantenimiento-ferroviario": {
    client: "caf",
    es: { name: "Manuales ferroviarios", sector: "Mantenimiento ferroviario", detail: "CAF · Mantenimiento de trenes en una línea de Oslo", steps: ["El operario pregunta por una pieza", "La IA busca en los manuales de mantenimiento", "El operario recibe la respuesta"] },
    en: { name: "Railway manuals", detail: "CAF · Train maintenance on an Oslo line", sector: "Railway maintenance", title: "Searching maintenance manuals for railway operators", summary: "A documentation search system helps operators on an Oslo railway line find information about parts and components.", steps: ["An operator asks about a part", "AI searches the maintenance manuals", "The operator gets the answer"] },
  },
};

const otherProducts = [
  { name: "MakerNotch", slug: "makernotch" },
  { name: "Boughtcast", slug: "boughtcast" },
  { name: "BrandToAds", slug: "brandtoads" },
  { name: "Climbber", slug: "climbber" },
];

const CaseStudies = () => {
  const { lang } = useLang();
  const english = lang === "en";
  return <section id="proyectos" aria-labelledby="home-work-title" className="studio-work">
    <div className="studio-work-header"><h2 id="home-work-title">{english ? <>Applied AI,<br />in practice.</> : <>IA aplicada,<br />en la práctica.</>}</h2><div><p>{english ? "AI projects already working in companies, with their real processes and data." : "Proyectos de IA que ya funcionan en empresas, con sus procesos y sus datos reales."}</p></div></div>
    <div className="studio-work-grid">{caseStudies.map(item => {
      const cover = caseCovers[item.slug];
      if (!cover) return null;
      const copy = english ? cover.en : { ...cover.es, title: item.title, summary: item.summary };
      return <article key={item.slug} className={`studio-work-project studio-work-case studio-work-case-${item.slug}`}>
        <Link to={casePath(item)} aria-label={`${english ? "Read case" : "Ver caso"}: ${copy.title}`} className="studio-work-cover">
          <div className="studio-case-client"><span className="studio-case-logo"><ClientLogo client={clientBySlug(cover.client)} imgClass="max-h-[26px] max-w-[110px]" maskClass="w-[110px] h-[26px]" /></span><span>{copy.sector}</span></div>
          <ol className="studio-case-steps" aria-hidden="true">{copy.steps.map((step, index) => <li key={step}><span>{String(index + 1).padStart(2, "0")}</span>{step}</li>)}</ol>
          <div className="studio-work-cover-title">{copy.name}<ArrowUpRight size={30} aria-hidden="true" /></div>
        </Link>
        <div className="studio-work-project-caption"><p className="studio-case-detail">{copy.detail}</p><h3>{copy.title}</h3><p>{copy.summary}</p></div>
      </article>;
    })}</div>
    <div className="studio-more-work studio-product-logos"><span>{english ? "Also developed by Alpa" : "También desarrollados por Alpa"}</span>{otherProducts.map(product => <Link key={product.slug} to={`/casos/${product.slug}/`} aria-label={`${english ? "Explore project" : "Ver proyecto"} ${product.name}`}>{product.name}</Link>)}</div>
  </section>;
};
export default CaseStudies;
