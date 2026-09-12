import { Link } from "react-router-dom";
import { Compass, Blocks, Route, Check, ArrowRight } from "lucide-react";
import { useCopy } from "@/i18n";

interface ServicesProps {
  onContactClick: () => void;
}

const lineMeta = [
  { id: "diagnostico", Icon: Compass, href: "/servicios/consultoria-ia-pymes" },
  { id: "sistemas", Icon: Blocks, href: "/servicios/sistemas-ia" },
  { id: "acompanamiento", Icon: Route, href: "/servicios/consultoria-ia-pymes" },
] as const;

/** Las tres líneas de servicio, en tres tarjetas. Sin importes: eso vive en las páginas de servicio. */
const Services = ({ onContactClick }: ServicesProps) => {
  const c = useCopy();
  const lines = lineMeta.map(({ id, Icon, href }) => ({ id, Icon, href, ...c.services.lines[id] }));
  return (
  <section id="servicios" className="py-20 md:py-24 px-4 md:px-8 bg-background relative scroll-mt-20">
    <div className="absolute top-0 left-0 w-full h-px bg-border" />
    <div className="max-w-6xl mx-auto">
      <div className="max-w-2xl mb-10 md:mb-12">
        <h2 className="text-4xl md:text-5xl font-light text-foreground mb-3">{c.services.title}</h2>
        <p className="text-lg text-muted-foreground font-light">{c.services.subtitle}</p>
      </div>

      <div className="grid md:grid-cols-3 gap-4 md:gap-5">
        {lines.map(({ id, Icon, name, claim, text, items, href, cta, more }) => (
          <div key={id} id={id} className="rounded-3xl border border-border bg-card p-7 md:p-8 flex flex-col scroll-mt-24">
            <div className="w-11 h-11 rounded-2xl bg-primary/10 flex items-center justify-center mb-6"><Icon className="w-5 h-5 text-primary" /></div>
            <p className="text-xs font-medium text-primary uppercase tracking-wide mb-1">{name}</p>
            <h3 className="text-2xl font-medium text-foreground mb-3">{claim}</h3>
            <p className="text-muted-foreground leading-relaxed mb-6">{text}</p>
            <ul className="space-y-3 mb-8">
              {items.map((item) => (
                <li key={item.title} className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                  <span className="text-sm leading-relaxed">
                    <span className="font-medium text-foreground">{item.title}.</span> <span className="text-muted-foreground">{item.text}</span>
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-auto flex flex-col items-start gap-3">
              <button onClick={onContactClick} className="bg-primary text-white px-6 py-3 rounded-full text-sm md:text-base font-medium transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/30 active:scale-95">{cta}</button>
              <Link to={href} className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors">{more} <ArrowRight className="w-4 h-4" /></Link>
            </div>
          </div>
        ))}
      </div>
    </div>
    <div className="absolute bottom-0 left-0 w-full h-px bg-border" />
  </section>
  );
};

export default Services;
