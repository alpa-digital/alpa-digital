import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Compass, LayoutGrid, Plus, Server, Workflow } from "lucide-react";
import { useLang } from "@/i18n";
import type { ContactTopic } from "@/hooks/useContactForm";
import AnimatedDetails from "@/components/AnimatedDetails";

interface ServicesProps { onContactClick: (topic?: ContactTopic) => void }

const Services = ({ onContactClick }: ServicesProps) => {
  const { lang } = useLang();
  const english = lang === "en";
  const [activeService, setActiveService] = useState<number | null>(0);
  const services = english ? [
    { icon: Server, name: "Private AI", label: "Your own instance", text: "A dedicated instance for your company, with your brand and your domain. Open AI models that work with your documents and data without handing them over to train third-party models. We start on dedicated servers in the EU and move to your own hardware when it pays off.", href: "/servicios/sistemas-ia/" },
    { icon: LayoutGrid, name: "Business apps with AI", label: "For your team", text: "Email, CRM, document search, HR or whatever your company needs: apps connected to the tools you already use that read your data and prepare the work. Your team reviews and decides.", href: "/servicios/desarrollo-software-medida-ia/" },
    { icon: Workflow, name: "Automations", label: "No more copying data", text: "Workflows that chain actions across your apps (sort an email, update the CRM, notify a person) and that your team can create and adjust in a controlled way.", href: "/servicios/automatizacion-ia-pymes/" },
    { icon: Compass, name: "Consulting and pilot", label: "Where to start", text: "We review one process with your team, test the AI with your real data and agree on the scope before you invest.", href: "/servicios/consultoria-ia-pymes/" },
  ] : [
    { icon: Server, name: "IA privada", label: "Tu instancia", text: "Una instancia propia para tu empresa, con tu marca y tu dominio. Modelos de IA abiertos que trabajan con tus documentos y datos sin cederlos para entrenar modelos de terceros. Empezamos en servidores dedicados en la UE y pasamos a hardware propio cuando compensa.", href: "/servicios/sistemas-ia/" },
    { icon: LayoutGrid, name: "Apps corporativas con IA", label: "Para tu equipo", text: "Correo, CRM, consulta de documentos, RR. HH. o lo que necesite tu empresa: apps conectadas a las herramientas que ya usas, que leen tus datos y preparan el trabajo. Tu equipo revisa y decide.", href: "/servicios/desarrollo-software-medida-ia/" },
    { icon: Workflow, name: "Automatizaciones", label: "Sin copiar datos", text: "Flujos que encadenan acciones entre tus apps (clasificar un correo, actualizar el CRM, avisar a una persona) y que tu equipo puede crear y ajustar de forma controlada.", href: "/servicios/automatizacion-ia-pymes/" },
    { icon: Compass, name: "Consultoría y piloto", label: "Por dónde empezar", text: "Revisamos un proceso con tu equipo, probamos la IA con tus datos reales y acordamos el alcance antes de que inviertas.", href: "/servicios/consultoria-ia-pymes/" },
  ];
  return <section id="servicios" aria-labelledby="home-services-title" className="studio-services">
    <div className="studio-services-grid">
      <div><h2 id="home-services-title">{english ? <>One platform.<br />Your apps.<br /><span>Your data.</span></> : <>Una plataforma.<br />Tus apps.<br /><span>Tus datos.</span></>}</h2><p>{english ? "We start with a pilot on one specific process and grow app by app, on the same instance." : "Empezamos con un piloto sobre un proceso concreto de tu empresa y crecemos app a app, sobre la misma instancia."}</p><button type="button" onClick={() => onContactClick("diagnostico")} className="studio-service-advice">{english ? "Help me choose where to start" : "Ayudadme a elegir por dónde empezar"}<ArrowRight size={17} aria-hidden="true" /></button></div>
      <div className="studio-service-list">{services.map((service,index) => <AnimatedDetails key={service.href} expanded={activeService === index} onExpandedChange={open => setActiveService(open ? index : null)} className="studio-service" summary={<><span className="studio-service-name"><service.icon size={22} strokeWidth={1.6} aria-hidden="true" />{service.name}</span><Plus size={22} aria-hidden="true" /></>}><p>{service.text}</p><Link to={service.href}>{english ? "Explore this service" : "Conocer este servicio"}<ArrowRight size={16} aria-hidden="true" /></Link><span className="studio-service-label">{service.label}</span></AnimatedDetails>)}</div>
    </div>
  </section>;
};
export default Services;
