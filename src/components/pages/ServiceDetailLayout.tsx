import type { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowDown, ArrowRight, ArrowUpRight, Plus } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";
import AnimatedDetails from "@/components/AnimatedDetails";
import ProjectCover from "@/components/ProjectCover";
import { Breadcrumbs, type Crumb } from "@/components/pages/PageShell";
import { contactPath, type ContactTopic } from "@/hooks/useContactForm";
import { getWorkProjects } from "@/data/work";
import type { ServiceFaq } from "@/data/services";
import { useLang } from "@/i18n";

interface ServiceDetailLayoutProps {
  title: string;
  intro: string;
  crumbs: Crumb[];
  topic: ContactTopic;
  contactLabel?: string;
  children: ReactNode;
}

export const ServiceDetailContact = ({ topic, children }: { topic: ContactTopic; children: ReactNode }) => {
  const { pathname } = useLocation();
  return <Link className="services-contact-link" to={contactPath(topic)} state={{ from: pathname }}>{children}<ArrowUpRight size={19} aria-hidden="true" /></Link>;
};

const ServiceDetailLayout = ({ title, intro, crumbs, topic, contactLabel = "Cuéntanos tu caso", children }: ServiceDetailLayoutProps) => (
  <div className="services-page service-detail-page min-h-screen bg-background">
    <Header />
    <main>
      <section className="service-detail-hero" aria-labelledby="service-detail-title">
        <div className="services-page-container">
          <Breadcrumbs items={crumbs} />
          <h1 id="service-detail-title">{title}</h1>
          <div className="service-detail-hero-bottom"><p>{intro}</p><div><ServiceDetailContact topic={topic}>{contactLabel}</ServiceDetailContact><Link className="service-detail-scope-link" to="#incluye">Ver qué incluye<ArrowDown size={18} aria-hidden="true" /></Link></div></div>
        </div>
      </section>
      {children}
      <CTA />
    </main>
    <Footer />
  </div>
);
export default ServiceDetailLayout;

export const ServiceDetailFaqs = ({ faqs }: { faqs: ServiceFaq[] }) => (
  <section className="services-offer-section service-detail-faqs" aria-labelledby="service-faq-title">
    <div className="services-page-container services-offer-layout">
      <div className="services-offer-heading"><h2 id="service-faq-title">Preguntas<br />frecuentes.</h2><p>Si tu caso necesita otra respuesta, lo vemos contigo en la primera conversación.</p><Link className="services-text-link" to="/como-trabajamos/">Cómo trabajamos<ArrowRight size={18} aria-hidden="true" /></Link></div>
      <div>{faqs.map((faq,index) => <AnimatedDetails key={faq.question} defaultOpen={index === 0} className="services-capability service-detail-faq" summary={<><h3>{faq.question}</h3><Plus size={22} aria-hidden="true" /></>}><p>{faq.answer}</p></AnimatedDetails>)}</div>
    </div>
  </section>
);

export const ServiceDetailProjects = ({ slugs, title = "Trabajo real.", intro }: { slugs: string[]; title?: string; intro?: string }) => {
  const { lang } = useLang();
  const projects = getWorkProjects(lang).filter(project => slugs.includes(project.slug));
  if (!projects.length) return null;
  return <section className="services-offer-section service-detail-projects" aria-labelledby="service-projects-title"><div className="services-page-container">
    <div className="service-detail-section-heading"><h2 id="service-projects-title">{title}</h2><div>{intro && <p>{intro}</p>}<Link to="/casos/">Ver todos los proyectos<ArrowUpRight size={20} aria-hidden="true" /></Link></div></div>
    <div className="service-detail-project-grid" data-count={projects.length}>{projects.map(project => <article key={project.slug}><Link to={`/casos/${project.slug}/`} aria-label={`Ver proyecto ${project.name}`}><ProjectCover project={project} /><div className="service-detail-project-caption"><p>{project.name}</p><h3>{project.headline}</h3>{projects.length === 1 && <p>{project.summary}</p>}<span>Ver proyecto<ArrowUpRight size={18} aria-hidden="true" /></span></div></Link></article>)}</div>
  </div></section>;
};
