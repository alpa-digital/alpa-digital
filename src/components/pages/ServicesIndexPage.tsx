import { useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowDown, ArrowRight, ArrowUpRight, FileText, MessageSquare, Plus, Search } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";
import AnimatedDetails from "@/components/AnimatedDetails";
import ProjectCover from "@/components/ProjectCover";
import { contactPath, type ContactTopic } from "@/hooks/useContactForm";
import { useLang } from "@/i18n";
import { servicesPageCopy } from "@/data/servicesPage";
import { processIds } from "@/data/process";
import { getWorkProjects } from "@/data/work";

const destinations = ["automatizacion", "desarrollo", "consultoria"];
const source = { from: "/servicios/" };
const ContactLink = ({ topic, children }: { topic: ContactTopic; children: ReactNode }) => (
  <Link to={contactPath(topic)} state={source} className="services-contact-link">{children}<ArrowUpRight aria-hidden="true" size={19} /></Link>
);

const ServicesIndexPage = () => {
  const { lang } = useLang();
  const english = lang === "en";
  const c = servicesPageCopy[lang];
  const [activeCapability, setActiveCapability] = useState<number | null>(0);
  const maker = getWorkProjects(lang).find(project => project.slug === "makernotch")!;
  const labels = english ? {
    serviceDetail: "Explore this service", railway: "Automation in practice", caseLink: "Explore the project",
    caseContext: "Technical documentation queries for railway maintenance on a line in Oslo. An anonymised real project.",
    flow: "The approach used in the railway project", documents: "Technical manuals", query: "Operator query", response: "Maintenance information",
    otherCase: "Also: AI-assisted candidate analysis", productCase: "Developed from scratch by Alpa", productLink: "Explore MakerNotch",
    otherProducts: "More product work", allWork: "Explore all projects", consultingNote: "You can start here, before deciding what to build.",
    processTitle: "How we move forward.", processIntro: "The scope is agreed for each project. We work in stages, reviewing what is built with you.",
  } : {
    serviceDetail: "Ver el servicio", railway: "Automatización en la práctica", caseLink: "Conocer el proyecto",
    caseContext: "Consultas de documentación técnica para el mantenimiento ferroviario en una línea de Oslo. Proyecto real anonimizado.",
    flow: "Enfoque del proyecto ferroviario", documents: "Manuales técnicos", query: "Consulta del operario", response: "Información de mantenimiento",
    otherCase: "También: análisis de candidaturas con IA", productCase: "Desarrollado desde cero por Alpa", productLink: "Conocer MakerNotch",
    otherProducts: "Más trabajo de producto", allWork: "Ver todos los proyectos", consultingNote: "Puedes empezar aquí, antes de decidir qué desarrollar.",
    processTitle: "Así avanzamos contigo.", processIntro: "El alcance se acuerda para cada proyecto. Trabajamos por fases y revisamos contigo lo que construimos.",
  };

  return <div className="services-page min-h-screen bg-background">
    <Header />
    <main>
      <section className="services-page-hero" aria-labelledby="services-page-title">
        <div className="services-page-container services-hero-layout">
          <div><p className="services-page-label">{c.label}</p><h1 id="services-page-title"><span>{c.title[0]}</span>{" "}<span>{c.title[1]}</span></h1></div>
          <div className="services-hero-guide"><p>{c.intro}</p><nav aria-label={english ? "Find your service" : "Encuentra tu servicio"}>{c.navigation.slice(0,3).map((label,index) => <Link key={destinations[index]} to={`#${destinations[index]}`}>{label}<ArrowDown aria-hidden="true" size={19} /></Link>)}</nav></div>
        </div>
      </section>

      <section id="automatizacion" aria-labelledby="automation-offer-title" className="services-offer-section">
        <div className="services-page-container">
          <div className="services-offer-layout">
            <div className="services-offer-heading"><h2 id="automation-offer-title">{english ? <>Automation<br />and AI.</> : <>Automatización<br />e IA.</>}</h2><p>{c.automation.text}</p><ContactLink topic="diagnostico">{c.automation.contact}</ContactLink></div>
            <div className="services-capability-list">{c.automation.offerings.map((item,index) => <AnimatedDetails key={item.path} className="services-capability" expanded={activeCapability === index} onExpandedChange={open => setActiveCapability(open ? index : null)} summary={<><h3>{item.title}</h3><Plus aria-hidden="true" size={22} /></>}><p>{item.text}</p><Link to={item.path} aria-label={`${labels.serviceDetail}: ${item.title}`}>{labels.serviceDetail}<ArrowRight aria-hidden="true" size={18} /></Link></AnimatedDetails>)}</div>
          </div>
          <aside className="services-automation-example" aria-labelledby="services-railway-title">
            <div><p className="services-example-label">{labels.railway}</p><h3 id="services-railway-title">{c.automation.caseName}</h3><p>{labels.caseContext}</p><Link to="/casos/consulta-manuales-mantenimiento-ferroviario/">{labels.caseLink}<ArrowUpRight aria-hidden="true" size={20} /></Link></div>
            <ol className="services-document-flow" aria-label={labels.flow}>
              <li><FileText aria-hidden="true" size={28} /><span>{labels.documents}</span></li>
              <li><Search aria-hidden="true" size={28} /><span>{labels.query}</span></li>
              <li><MessageSquare aria-hidden="true" size={28} /><span>{labels.response}</span></li>
            </ol>
          </aside>
          <Link to="/casos/seleccion-candidatos-sector-electrico/" className="services-secondary-case">{labels.otherCase}<ArrowUpRight aria-hidden="true" size={18} /></Link>
        </div>
      </section>

      <section id="desarrollo" aria-labelledby="software-offer-title" className="services-offer-section services-software-section">
        <div className="services-page-container services-software-layout">
          <div className="services-offer-heading"><h2 id="software-offer-title">{english ? <>Software<br />development.</> : <>Desarrollo<br />de software.</>}</h2><p>{c.software.text}</p><ul className="services-software-scope">{c.software.items.map(item => <li key={item}>{item}</li>)}</ul><div className="services-detail-links"><Link to="/servicios/desarrollo-producto-digital/">{c.software.detail}<ArrowRight aria-hidden="true" size={18} /></Link><Link to="/servicios/desarrollo-software-medida-ia/">{c.software.custom}<ArrowRight aria-hidden="true" size={18} /></Link></div><ContactLink topic="producto">{c.software.contact}</ContactLink></div>
          <div className="services-product-evidence"><Link to="/casos/makernotch/" className="services-product-link" aria-label={labels.productLink}><ProjectCover project={maker} /><div className="services-product-caption"><h3>MakerNotch</h3><p>{labels.productCase}<ArrowUpRight aria-hidden="true" size={19} /></p></div></Link><div className="services-related-products"><span>{labels.otherProducts}</span><Link to="/casos/boughtcast/">Boughtcast<ArrowUpRight aria-hidden="true" size={16} /></Link><Link to="/casos/">{labels.allWork}<ArrowUpRight aria-hidden="true" size={16} /></Link></div></div>
        </div>
      </section>

      <section id="consultoria" aria-labelledby="consulting-offer-title" className="services-offer-section">
        <div className="services-page-container services-offer-layout">
          <div className="services-offer-heading"><h2 id="consulting-offer-title">{english ? <>AI<br />consulting.</> : <>Consultoría<br />de IA.</>}</h2><p>{c.consulting.text}</p><Link className="services-text-link" to="/servicios/consultoria-ia-pymes/">{c.consulting.detail}<ArrowRight aria-hidden="true" size={18} /></Link><ContactLink topic="acompanamiento">{c.consulting.contact}</ContactLink></div>
          <div><p className="services-consulting-note">{labels.consultingNote}</p><ul className="services-consulting-list">{c.consulting.offerings.map(item => <li key={item.title}><h3>{item.title}</h3><p>{item.text}</p></li>)}</ul></div>
        </div>
      </section>

      <section id="proceso" aria-labelledby="services-process-title" className="services-process-summary">
        <div className="services-page-container"><div className="services-process-heading"><h2 id="services-process-title">{labels.processTitle}</h2><div><p>{labels.processIntro}</p><Link to="/como-trabajamos/">{c.process.detail}<ArrowUpRight aria-hidden="true" size={20} /></Link></div></div><ol>{c.process.stages.map((stage,index) => <li key={stage.title}><Link to={`/como-trabajamos/#${processIds[index]}`}><span>{String(index+1).padStart(2,"0")}</span><h3>{stage.title}</h3><ArrowUpRight aria-hidden="true" size={20} /></Link></li>)}</ol></div>
      </section>
      <CTA />
    </main>
    <Footer />
  </div>;
};
export default ServicesIndexPage;
