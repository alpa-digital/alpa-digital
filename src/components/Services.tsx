import { Compass, Blocks, ArrowRight } from "lucide-react";

interface ServicesProps {
  onContactClick: () => void;
}

const lines = [
  {
    id: "consultoria",
    Icon: Compass,
    name: "Consultoría de IA",
    claim: "Decidir qué construir",
    text: "Miramos cómo trabaja tu equipo y te decimos qué merece la pena automatizar y en qué orden. Si hay dudas, lo probamos en pequeño antes.",
    items: ["Diagnóstico", "Pruebas de concepto", "Roadmap de IA"],
    href: "/servicios/consultoria-ia-pymes",
    cta: "Pedir diagnóstico",
  },
  {
    id: "sistemas",
    Icon: Blocks,
    name: "Sistemas y automatizaciones con IA",
    claim: "Construirlo",
    text: "Empezamos por la tarea que más duele y crecemos hasta un sistema completo, con las herramientas que ya usas y una persona al mando.",
    items: ["Automatizaciones", "Agentes de IA", "Apps a medida"],
    href: "/servicios/sistemas-ia",
    cta: "Hablar de tu caso",
  },
];

/** Las dos líneas de servicio, en dos tarjetas. Sin importes: eso vive en las páginas de servicio. */
const Services = ({ onContactClick }: ServicesProps) => (
  <section id="servicios" className="py-20 md:py-24 px-4 md:px-8 bg-background relative scroll-mt-20">
    <div className="absolute top-0 left-0 w-full h-px bg-border" />
    <div className="max-w-6xl mx-auto">
      <div className="max-w-2xl mb-10 md:mb-12">
        <h2 className="text-4xl md:text-5xl font-light text-foreground mb-3" style={{ textWrap: "balance" }}>Dos líneas de servicio, precio cerrado en todo</h2>
        <p className="text-lg text-muted-foreground font-light">Primero decidir, después construir. Puedes empezar por cualquiera.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4 md:gap-6">
        {lines.map(({ id, Icon, name, claim, text, items, href, cta }) => (
          <div key={id} id={id} className="rounded-3xl border border-border bg-card p-7 md:p-9 flex flex-col scroll-mt-24">
            <div className="w-11 h-11 rounded-2xl bg-primary/10 flex items-center justify-center mb-6"><Icon className="w-5 h-5 text-primary" /></div>
            <p className="text-xs font-medium text-primary uppercase tracking-wide mb-1">{name}</p>
            <h3 className="text-2xl md:text-3xl font-medium text-foreground mb-3">{claim}</h3>
            <p className="text-muted-foreground leading-relaxed mb-6">{text}</p>
            <ul className="flex flex-wrap gap-2 mb-8">
              {items.map((item) => (
                <li key={item} className="rounded-full border border-border px-3 py-1 text-sm text-foreground/80">{item}</li>
              ))}
            </ul>
            <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-3">
              <button onClick={onContactClick} className="bg-primary text-white px-6 py-3 rounded-full text-sm md:text-base font-medium transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/30 active:scale-95">{cta}</button>
              <a href={href} className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors">Saber más <ArrowRight className="w-4 h-4" /></a>
            </div>
          </div>
        ))}
      </div>
    </div>
    <div className="absolute bottom-0 left-0 w-full h-px bg-border" />
  </section>
);

export default Services;
