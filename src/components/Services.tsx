import { useEffect, useRef, useState } from "react";
import { Boxes, Compass, Check, ArrowRight } from "lucide-react";
import { families, pillarOf, type ServiceFamily } from "@/data/services";

interface ServicesProps {
  onContactClick: () => void;
}

const lines: { id: ServiceFamily; icon: typeof Boxes; cta: string; price: string; priceNote: string; includes: string[] }[] = [
  {
    id: "sistemas",
    icon: Boxes,
    cta: "Solicitar presupuesto",
    price: "Desde 1.500 €",
    priceNote: "por automatización, IVA no incluido. Apps y sistemas con presupuesto cerrado por fase antes de empezar",
    includes: [
      "Automatizaciones de procesos conectadas a tus herramientas",
      "Agentes de IA por WhatsApp, email, web y voz",
      "Apps corporativas a medida, interconectadas",
      "Sistema completo con agente central y supervisión",
      "Formación de tu equipo y 1 mes de soporte incluido",
    ],
  },
  {
    id: "consultoria",
    icon: Compass,
    cta: "Pedir diagnóstico",
    price: "490 €",
    priceNote: "el diagnóstico, IVA no incluido, se descuenta si seguimos. Acompañamiento 350 €/mes sin permanencia. I+D, diseño de producto y roadmap con precio cerrado",
    includes: [
      "Diagnóstico de automatización con las personas que hacen el trabajo",
      "I+D y pruebas de concepto con tus datos reales",
      "Diseño de producto listo para construir",
      "Roadmap corporativo de IA a 12 meses",
      "Acompañamiento mensual con horas de trabajo incluidas",
    ],
  },
];

const Services = ({ onContactClick }: ServicesProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && setIsVisible(true)), { threshold: 0.15, rootMargin: "0px 0px -80px 0px" });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="servicios" ref={sectionRef} className="py-20 md:py-24 px-4 md:px-8 bg-background relative overflow-hidden scroll-mt-20">
      <div className="absolute top-0 left-0 w-full h-px bg-border"></div>
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="max-w-3xl mb-12">
          <h2 className="text-4xl md:text-5xl font-light text-foreground mb-5" style={{ textWrap: "balance" }}>
            Dos líneas de servicio, precio cerrado en todo
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground font-light leading-relaxed">
            Construimos los sistemas de IA que tu empresa necesita, y te ayudamos a decidir con criterio qué construir y en qué orden. Puedes empezar por cualquiera de las dos.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 md:gap-8 items-stretch">
          {lines.map((line, index) => {
            const family = families[line.id];
            const pillar = pillarOf(line.id);
            const Icon = line.icon;
            const featured = line.id === "sistemas";
            return (
              <div
                key={line.id}
                className={`relative flex flex-col rounded-2xl border p-8 md:p-10 transition-all duration-700 ease-out ${
                  featured ? "border-primary/40 bg-primary/5 shadow-lg shadow-primary/10" : "border-border/60 bg-card/50 hover:border-primary/30"
                } ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ transitionDelay: `${index * 0.15}s` }}
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-5">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <p className="text-sm text-primary font-medium mb-2">{family.tagline}</p>
                <h3 className="text-2xl md:text-3xl font-medium text-foreground mb-3" style={{ textWrap: "balance" }}>{family.name}</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">{family.description}</p>

                <div className="mb-6">
                  <p className="text-3xl font-semibold text-foreground">{line.price}</p>
                  <p className="text-sm text-muted-foreground mt-1">{line.priceNote}</p>
                </div>

                <ul className="space-y-2.5 mb-8 flex-1">
                  {line.includes.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm md:text-base text-foreground/90">
                      <Check className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={onContactClick}
                    className={`flex-1 rounded-full px-6 py-3 text-base font-medium transition-all duration-300 hover:scale-[1.02] active:scale-95 ${
                      featured ? "bg-primary text-white hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25" : "border border-border text-foreground hover:border-primary/40 hover:bg-primary/5"
                    }`}
                  >
                    {line.cta}
                  </button>
                  <a href={`/servicios/${pillar.slug}`} className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-medium text-primary hover:underline">
                    Ver detalle <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
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
