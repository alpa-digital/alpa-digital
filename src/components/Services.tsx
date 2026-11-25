import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Plus } from "lucide-react";
import { useLang } from "@/i18n";
import type { ContactTopic } from "@/hooks/useContactForm";
import AnimatedDetails from "@/components/AnimatedDetails";

interface ServicesProps { onContactClick: (topic?: ContactTopic) => void }

const Services = ({ onContactClick }: ServicesProps) => {
  const { lang } = useLang();
  const english = lang === "en";
  const [activeService, setActiveService] = useState<number | null>(0);
  const services = english ? [
    { name: "Automation and AI", label: "For your team", text: "Connect your tools, prepare information and reduce repetitive data entry. We define which checks stay with your team.", href: "/servicios/automatizacion-ia-pymes/" },
    { name: "Software development", label: "SaaS and apps", text: "Build a product from scratch or develop the next version. SaaS platforms, mobile apps and internal tools for startups and established companies.", href: "/servicios/desarrollo-producto-digital/" },
    { name: "AI consulting", label: "Where to start", text: "Review the process with your team, assess what is viable and agree on the first project before investing in development.", href: "/servicios/consultoria-ia-pymes/" },
  ] : [
    { name: "Automatización e IA", label: "Para tu equipo", text: "Conectar herramientas, preparar información y reducir la copia de datos. Definimos qué comprobaciones quedan en manos de tu equipo.", href: "/servicios/automatizacion-ia-pymes/" },
    { name: "Desarrollo de software", label: "SaaS y apps", text: "Construir un producto desde cero o desarrollar su siguiente versión. Plataformas SaaS, apps móviles y herramientas internas para startups y empresas.", href: "/servicios/desarrollo-producto-digital/" },
    { name: "Consultoría de IA", label: "Por dónde empezar", text: "Revisar el proceso con tu equipo, valorar qué es viable y acordar un primer proyecto antes de invertir en desarrollo.", href: "/servicios/consultoria-ia-pymes/" },
  ];
  return <section id="servicios" aria-labelledby="home-services-title" className="studio-services">
    <div className="studio-services-grid">
      <div><h2 id="home-services-title">{english ? <>Automation<br />and software.<br /><span>One team.</span></> : <>Automatización<br />y software.<br /><span>Un mismo equipo.</span></>}</h2><p>{english ? "We can start with one process or the first version of your product. Then we move forward in stages." : "Podemos empezar por un proceso concreto o por la primera versión de tu producto. Y avanzar por fases."}</p><button type="button" onClick={() => onContactClick("diagnostico")} className="studio-service-advice">{english ? "Help me choose where to start" : "Ayudadme a elegir por dónde empezar"}<ArrowRight size={17} aria-hidden="true" /></button></div>
      <div className="studio-service-list">{services.map((service,index) => <AnimatedDetails key={service.href} expanded={activeService === index} onExpandedChange={open => setActiveService(open ? index : null)} className="studio-service" summary={<><span>{service.name}</span><Plus size={22} aria-hidden="true" /></>}><p>{service.text}</p><Link to={service.href}>{english ? "Explore this service" : "Conocer este servicio"}<ArrowRight size={16} aria-hidden="true" /></Link><span className="studio-service-label">{service.label}</span></AnimatedDetails>)}</div>
    </div>
  </section>;
};
export default Services;
