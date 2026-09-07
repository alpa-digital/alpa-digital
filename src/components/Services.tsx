import { useEffect, useRef, useState } from "react";
import { Search, Workflow, Compass, Check } from "lucide-react";

interface ServicesProps {
  onContactClick: () => void;
}

const services = [
  {
    icon: Search,
    name: "Diagnóstico de automatización",
    tagline: "Para saber por dónde empezar",
    description:
      "Analizamos cómo trabaja tu equipo, detectamos las tareas repetitivas que más tiempo cuestan y te entregamos un plan priorizado con lo que conviene automatizar primero y lo que no.",
    price: "490 €",
    priceNote: "Precio cerrado, IVA no incluido. Se descuenta si seguimos con la implementación",
    duration: "1 a 2 semanas",
    cta: "Pedir diagnóstico",
    includes: [
      "Sesiones de trabajo con las personas que hacen las tareas",
      "Mapa de procesos y tiempo que consume cada uno",
      "Plan priorizado por impacto, coste y riesgo",
      "Estimación cerrada de cada automatización propuesta",
    ],
  },
  {
    icon: Workflow,
    name: "Automatización con IA",
    tagline: "Para quitarte trabajo de encima",
    description:
      "Diseñamos e implementamos automatizaciones concretas conectadas a las herramientas que ya usas: correo, WhatsApp, CRM, facturación, hojas de cálculo o tu ERP. Cada una con un objetivo medible.",
    price: "Desde 1.500 €",
    priceNote: "Por automatización, IVA no incluido. Alcance, plazo y precio cerrados antes de empezar",
    duration: "2 a 6 semanas por proceso",
    cta: "Solicitar presupuesto",
    featured: true,
    includes: [
      "Asistentes de IA para atención al cliente y ventas",
      "Presupuestos, facturas y documentos generados automáticamente",
      "Integración con tus herramientas actuales, sin cambiar de sistema",
      "Formación de tu equipo y 1 mes de soporte incluido",
    ],
  },
  {
    icon: Compass,
    name: "Consultoría y acompañamiento",
    tagline: "Para tener un responsable de IA sin contratarlo",
    description:
      "Acompañamiento mensual para pymes que quieren adoptar la IA con criterio: qué herramientas usar, cómo usarlas con seguridad, formación del equipo y nuevas automatizaciones a medida que el negocio cambia.",
    price: "350 €/mes",
    priceNote: "IVA no incluido. Sin permanencia, con horas de trabajo incluidas",
    duration: "Mes a mes",
    cta: "Hablar con nosotros",
    includes: [
      "Reunión mensual de seguimiento y prioridades",
      "Formación práctica del equipo en herramientas de IA",
      "Mantenimiento y mejora de las automatizaciones en marcha",
      "Política de uso responsable de datos e IA en tu empresa",
    ],
  },
];

const Services = ({ onContactClick }: ServicesProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setIsVisible(true);
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -80px 0px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="servicios" ref={sectionRef} className="py-24 px-8 bg-background relative overflow-hidden scroll-mt-24">
      <div className="absolute top-0 left-0 w-full h-px bg-border"></div>
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="max-w-3xl mb-16">
          <h2 className="text-4xl md:text-6xl font-light text-foreground mb-6">
            Tres formas de trabajar con nosotros
          </h2>
          <p className="text-xl text-muted-foreground font-light" style={{ lineHeight: '1.8' }}>
            Empieza por entender qué merece la pena automatizar, sigue con una automatización concreta y, si te encaja, cuenta con nosotros cada mes.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 md:gap-8 items-stretch">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={service.name}
                className={`relative flex flex-col rounded-2xl border p-8 md:p-10 transition-all duration-700 ease-out ${
                  service.featured
                    ? 'border-primary/40 bg-primary/5 shadow-lg shadow-primary/10'
                    : 'border-border/60 bg-card/50 hover:border-primary/30'
                } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${index * 0.15}s` }}
              >
                {service.featured && (
                  <span className="absolute -top-3 left-8 text-xs font-medium text-white bg-primary px-3 py-1 rounded-full">
                    Lo más solicitado
                  </span>
                )}
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <p className="text-sm text-primary font-medium mb-2">{service.tagline}</p>
                <h3 className="text-2xl md:text-3xl font-medium text-foreground mb-4">{service.name}</h3>
                <p className="text-muted-foreground leading-relaxed mb-8">{service.description}</p>

                <div className="mb-8">
                  <p className="text-2xl font-semibold text-foreground">{service.price}</p>
                  <p className="text-sm text-muted-foreground mt-1">{service.priceNote}</p>
                  <p className="text-sm text-muted-foreground mt-1">Duración: {service.duration}</p>
                </div>

                <ul className="space-y-3 mb-10 flex-1">
                  {service.includes.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm md:text-base text-foreground/90">
                      <Check className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={onContactClick}
                  className={`w-full rounded-full px-6 py-3 text-base font-medium transition-all duration-300 hover:scale-[1.02] active:scale-95 ${
                    service.featured
                      ? 'bg-primary text-white hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25'
                      : 'border border-border text-foreground hover:border-primary/40 hover:bg-primary/5'
                  }`}
                >
                  {service.cta}
                </button>
              </div>
            );
          })}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-px bg-border"></div>
    </section>
  );
};

export default Services;
