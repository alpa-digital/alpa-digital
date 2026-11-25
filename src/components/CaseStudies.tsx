import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { caseStudies, casePath } from "@/data/cases";
import { useLang } from "@/i18n";
import makerImage from "@/assets/projects/makernotch-cicd.webp";
import boughtImage from "@/assets/projects/boughtcast-dashboard.webp";
import brandImage from "@/assets/projects/brandtoads-logo.png";

// One selection per page load, including StrictMode and route remounts.
let pageSelection: number | undefined;
const nextSelection = (count: number) => {
  if (pageSelection !== undefined) return pageSelection;
  try {
    const stored = window.sessionStorage.getItem("alpa-featured-projects");
    const previous = stored === null ? -1 : Number(stored);
    pageSelection = Number.isInteger(previous) && previous >= -1 && previous < count ? (previous + 1) % count : 0;
    window.sessionStorage.setItem("alpa-featured-projects", String(pageSelection));
  } catch {
    pageSelection = Math.floor(Math.random() * count);
  }
  return pageSelection;
};

const CaseStudies = () => {
  const { lang } = useLang();
  const english = lang === "en";
  const [selection, setSelection] = useState(0);
  const products = [
    { name: "MakerNotch", slug: "makernotch", image: makerImage, category: english ? "Mac app" : "Aplicación para Mac", description: english ? "Your projects, a glance away." : "Tus proyectos, a la vista desde el Mac.", width: 1600, height: 644 },
    { name: "Boughtcast", slug: "boughtcast", image: boughtImage, category: english ? "Web platform" : "Plataforma web", description: english ? "A place for buyers to share their experience." : "Una plataforma para compartir experiencias de compra.", width: 2880, height: 1800 },
    { name: "BrandToAds", slug: "brandtoads", image: brandImage, category: english ? "Advertising platform" : "Plataforma publicitaria", description: english ? "Ad creatives built around a brand." : "Creatividades publicitarias a partir de una marca.", width: 1663, height: 426 },
  ];
  const projectCount = products.length;
  useEffect(() => { setSelection(nextSelection(projectCount)); }, [projectCount]);
  const featured = [products[selection], products[(selection + 1) % projectCount]];
  const remaining = products.filter(product => !featured.includes(product));
  return <section id="proyectos" aria-labelledby="home-work-title" className="studio-work">
    <div className="studio-work-header"><h2 id="home-work-title">{english ? <>From idea<br />to solution.</> : <>De la idea<br />a la solución.</>}</h2><div><p>{english ? "Software and automation built around the people who use them." : "Software y automatizaciones construidos para quienes los utilizan."}</p><Link to="/casos/">{english ? "Explore our work" : "Ver nuestro trabajo"}<ArrowRight aria-hidden="true" size={18} /></Link></div></div>
    <div className="studio-work-grid">{featured.map(product => <article key={product.slug} className={`studio-work-project studio-work-${product.slug}`}><Link to={`/casos/${product.slug}/`} aria-label={`${english ? "Explore project" : "Ver proyecto"} ${product.name}`} className="studio-work-cover"><span>{product.category}</span><div className="studio-work-media"><img src={product.image} alt={product.slug === "brandtoads" ? (english ? "BrandToAds logo" : "Logotipo de BrandToAds") : (english ? `${product.name} product screenshot with sample data` : `Captura del producto ${product.name} con datos de ejemplo`)} width={product.width} height={product.height} loading="lazy" /></div><div className="studio-work-cover-title">{product.name}<ArrowUpRight size={30} aria-hidden="true" /></div></Link><div className="studio-work-project-caption"><h3>{product.description}</h3><p>{product.slug === "brandtoads" ? (english ? "Developed by Alpa · Product logo" : "Desarrollado por Alpa · Logotipo del producto") : (english ? "Developed from scratch by Alpa · Screenshot with sample data" : "Desarrollo desde cero por Alpa · Captura con datos de ejemplo")}</p></div></article>)}</div>
    <div className="studio-more-work"><span>{english ? "Also developed by Alpa" : "También desarrollados por Alpa"}</span>{remaining.map(product => <Link key={product.slug} to={`/casos/${product.slug}/`}>{product.name}<ArrowUpRight size={17} aria-hidden="true" /></Link>)}<Link to="/casos/climbber/">Climbber<ArrowUpRight size={17} aria-hidden="true" /></Link></div>
    <div className="studio-automation-work"><h3>{english ? <>Automation,<br />in practice.</> : <>Automatización,<br />en la práctica.</>}</h3><div>{caseStudies.map((item,index) => <Link key={item.slug} to={casePath(item)}><div><span>{english ? (index === 0 ? "Electrical sector" : "Railway maintenance") : item.sector}</span><h4>{english ? (index === 0 ? "AI-assisted candidate analysis" : "Searching maintenance manuals") : item.title}</h4></div><ArrowUpRight aria-hidden="true" size={23} /></Link>)}</div></div>
  </section>;
};
export default CaseStudies;
