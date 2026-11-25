import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Check, Plus } from "lucide-react";
import NotFound from "@/pages/NotFound";
import AnimatedDetails from "@/components/AnimatedDetails";
import RelatedResources from "@/components/RelatedResources";
import ServiceDetailLayout, { ServiceDetailContact, ServiceDetailFaqs, ServiceDetailProjects } from "@/components/pages/ServiceDetailLayout";
import { families, getService, pillarOf, servicesOf } from "@/data/services";
import { servicePresentation } from "@/data/servicePresentation";
import { caseStudies } from "@/data/cases";
import { servicePath } from "@/lib/seo";

const ServicePage = () => {
  const { serviceSlug = "" } = useParams();
  // A new service gets its own disclosure state even when React reuses this route.
  return <ServiceContent key={serviceSlug} slug={serviceSlug} />;
};

const ServiceContent = ({ slug }: { slug: string }) => {
  const [activeOffering, setActiveOffering] = useState<number | null>(0);
  const service = getService(slug);
  if (!service) return <NotFound />;
  const family = families[service.family];
  const pillar = pillarOf(service.family);
  const siblings = servicesOf(service.family).filter(item => item.slug !== service.slug && !item.pillar);
  const otherPillar = pillarOf(service.family === "sistemas" ? "consultoria" : "sistemas");
  const topic = service.family === "consultoria" ? "diagnostico" : "sistemas";
  const presentation = servicePresentation[service.slug];
  const crumbs = [
    { name: "Inicio", path: "/" }, { name: "Servicios", path: "/servicios/" },
    ...(!service.pillar ? [{ name: pillar.short, path: servicePath(pillar) }] : []),
    { name: service.short, path: servicePath(service) },
  ];
  // Todos los servicios enseñan los casos de IA aplicada (López Alcón y CAF); los del propio servicio, primero.
  const projectSlugs = [...caseStudies].sort((a, b) => Number(b.relatedService === service.slug) - Number(a.relatedService === service.slug)).map(item => item.slug);
  const related = [...(!service.pillar ? [pillar] : []), ...siblings, otherPillar];

  return <ServiceDetailLayout title={service.h1} intro={presentation?.intro ?? service.intro} crumbs={crumbs} topic={topic}>
    <section id="alcance" className="services-offer-section" aria-labelledby="service-scope-title"><div className="services-page-container services-offer-layout">
      <div className="services-offer-heading"><h2 id="service-scope-title">{presentation?.scopeTitle ?? "El trabajo, en detalle."}</h2><p>{service.intro}</p><Link className="services-text-link" to="/como-trabajamos/">Así trabajamos contigo<ArrowRight size={18} aria-hidden="true" /></Link></div>
      {service.offerings ? <div>{service.offerings.map((item,index) => <AnimatedDetails key={item.name} expanded={activeOffering === index} onExpandedChange={open => setActiveOffering(open ? index : null)} className="services-capability" summary={<><h3>{item.name}</h3><Plus size={22} aria-hidden="true" /></>}><p>{item.text}</p>{item.slug && <Link to={`/servicios/${item.slug}/`} aria-label={`Ver detalle de ${item.name}`}>Ver el servicio<ArrowRight size={18} aria-hidden="true" /></Link>}</AnimatedDetails>)}</div>
        : <ul className="services-consulting-list service-detail-benefits">{service.benefits.map(item => <li key={item.title}><h3>{item.title}</h3><p>{item.text}</p></li>)}</ul>}
    </div></section>

    <section id="incluye" className="services-offer-section service-detail-includes" aria-labelledby="service-includes-title"><div className="services-page-container services-offer-layout">
      <div className="services-offer-heading"><h2 id="service-includes-title">Qué incluye.</h2><ServiceDetailContact topic={topic}>Hablemos de tu proyecto</ServiceDetailContact></div>
      <ul className="service-detail-deliverables">{service.deliverables.map(item => <li key={item}><Check size={19} aria-hidden="true" /><span>{item}</span></li>)}</ul>
    </div></section>

    {service.offerings && <section className="services-offer-section" aria-labelledby="service-principles-title"><div className="services-page-container services-offer-layout"><div className="services-offer-heading"><h2 id="service-principles-title">Qué cuidamos<br />en el trabajo.</h2></div><ul className="services-consulting-list service-detail-benefits">{service.benefits.map(item => <li key={item.title}><h3>{item.title}</h3><p>{item.text}</p></li>)}</ul></div></section>}

    <ServiceDetailProjects slugs={projectSlugs} title="IA aplicada, en la práctica." intro="Proyectos de IA que ya funcionan en empresas: selección de candidatos en López Alcón Electrificaciones y consulta de manuales de mantenimiento en CAF." />

    {service.slug === "consultoria-ia-pymes" && <section className="services-offer-section service-detail-editorial" aria-labelledby="service-decision-title"><div className="services-page-container services-offer-layout"><div className="services-offer-heading"><h2 id="service-decision-title">De la consulta<br />a una decisión.</h2></div><div><p>El piloto empieza por entender una tarea: quién la realiza, qué datos utiliza y qué ocurre cuando hay una excepción. Con esa información se decide qué app o automatización montar primero en la instancia de IA privada y qué datos necesita.</p><p>Una empresa instaladora, por ejemplo, puede empezar por la atención al cliente o por los partes de obra, probarlo con sus propios datos y, con el resultado medido, añadir presupuestos o la consulta de normativa sobre la misma instancia.</p><Link className="services-text-link" to="/recursos/que-procesos-automatizar-primero-pyme/">Guía para elegir qué automatizar primero<ArrowRight size={18} aria-hidden="true" /></Link></div></div></section>}

    <ServiceDetailFaqs faqs={service.faqs} />
    <section className="services-offer-section" aria-labelledby="service-related-title"><div className="services-page-container services-offer-layout"><div className="services-offer-heading"><h2 id="service-related-title">Otros servicios<br />de Alpa.</h2><p>{service.pillar ? `Explora el detalle de ${family.short.toLowerCase()} y las otras líneas de trabajo.` : "Puedes empezar por una necesidad y ampliar el alcance cuando tenga sentido."}</p><div className="services-detail-links"><Link to="/servicios/">Ver todos los servicios<ArrowRight size={18} aria-hidden="true" /></Link><Link to="/#analiza-tu-empresa">Analizar mi empresa gratis<ArrowRight size={18} aria-hidden="true" /></Link></div></div><ul className="service-detail-related">{related.map(item => <li key={item.slug}><Link to={servicePath(item)}><h3>{item.name}</h3><ArrowUpRight size={21} aria-hidden="true" /></Link></li>)}</ul></div></section>
    <RelatedResources service={service.slug} variant="service" />
  </ServiceDetailLayout>;
};

export default ServicePage;
