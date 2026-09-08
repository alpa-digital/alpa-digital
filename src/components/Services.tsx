import { Link } from "react-router-dom";
import { Compass, Blocks, Check, ArrowRight } from "lucide-react";

interface ServicesProps {
  onContactClick: () => void;
}

const lines = [
  {
    id: "consultoria",
    Icon: Compass,
    name: "Consultoría de IA",
    claim: "Decidir qué construir",
    text: "Miramos cómo trabaja tu equipo y te decimos qué merece la pena automatizar y en qué orden.",
    items: [
      { title: "Diagnóstico", text: "Qué se repite, cuánto cuesta y qué automatizar primero." },
      { title: "Pruebas de concepto", text: "Probamos la IA con tus datos antes de construir nada." },
      { title: "Roadmap de IA", text: "Las fases y el orden para los próximos meses." },
    ],
    href: "/servicios/consultoria-ia-pymes",
    cta: "Pedir diagnóstico",
    more: "Ver consultoría de IA",
  },
  {
    id: "sistemas",
    Icon: Blocks,
    name: "Sistemas y automatizaciones con IA",
    claim: "Construirlo",
    text: "Empezamos por la tarea que más duele y crecemos hasta un sistema completo, con una persona al mando.",
    items: [
      { title: "Automatizaciones", text: "Una tarea repetitiva deja de hacerse a mano." },
      { title: "Agentes de IA", text: "Atienden y actúan por WhatsApp, email o voz." },
      { title: "Apps y sistemas a medida", text: "La herramienta que te falta, conectada a las que ya usas." },
    ],
    href: "/servicios/sistemas-ia",
    cta: "Hablar de tu caso",
    more: "Ver sistemas de IA",
  },
];

/** Las dos líneas de servicio, en dos tarjetas. Sin importes: eso vive en las páginas de servicio. */
const Services = ({ onContactClick }: ServicesProps) => (
  <section id="servicios" className="py-20 md:py-24 px-4 md:px-8 bg-background relative scroll-mt-20">
    <div className="absolute top-0 left-0 w-full h-px bg-border" />
    <div className="max-w-6xl mx-auto">
      <div className="max-w-2xl mb-10 md:mb-12">
        <h2 className="text-4xl md:text-5xl font-light text-foreground mb-3">Dos líneas de servicio</h2>
        <p className="text-lg text-muted-foreground font-light">Primero decidir, después construir. Puedes empezar por cualquiera.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4 md:gap-6">
        {lines.map(({ id, Icon, name, claim, text, items, href, cta, more }) => (
          <div key={id} id={id} className="rounded-3xl border border-border bg-card p-7 md:p-9 flex flex-col scroll-mt-24">
            <div className="w-11 h-11 rounded-2xl bg-primary/10 flex items-center justify-center mb-6"><Icon className="w-5 h-5 text-primary" /></div>
            <p className="text-xs font-medium text-primary uppercase tracking-wide mb-1">{name}</p>
            <h3 className="text-2xl md:text-3xl font-medium text-foreground mb-3">{claim}</h3>
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
            <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-3">
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

export default Services;
