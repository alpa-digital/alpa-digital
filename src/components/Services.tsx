import { Check, ArrowRight } from "lucide-react";
import { pillarOf } from "@/data/services";

interface ServicesProps {
  onContactClick: () => void;
}

/** Línea 2: construcción. Continúa la sección de consultoría bajo el mismo título. */
const Services = ({ onContactClick }: ServicesProps) => {
  const pillar = pillarOf("sistemas");
  const offerings = pillar.offerings ?? [];
  return (
    <section id="servicios" className="pt-12 md:pt-14 pb-20 md:pb-24 px-4 md:px-8 bg-background relative scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] gap-8 lg:gap-12 items-start">
          <div>
            <p className="text-xs font-medium text-primary uppercase tracking-wide mb-2">Línea 2 · Sistemas de herramientas y automatizaciones con IA</p>
            <h3 className="text-2xl md:text-3xl font-medium text-foreground mb-3" style={{ textWrap: "balance" }}>Construirlo, por fases y con precio cerrado</h3>
            <p className="text-muted-foreground leading-relaxed mb-5">
              Un mismo servicio a cuatro escalas. Se empieza por la tarea que más duele y se crece hasta un sistema completo de apps y agentes interconectados, sin cambiar de proveedor ni de tecnología. Cada fase se presupuesta cerrada antes de empezar.
            </p>
            <ul className="space-y-2 mb-6">
              {["Con las herramientas que ya usas: correo, WhatsApp, CRM, facturación, ERP", "Una persona aprueba lo importante; la IA prepara", "Formación del equipo y un mes de soporte incluidos"].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-foreground/90"><Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" /> {item}</li>
              ))}
            </ul>
            <div className="flex flex-col sm:flex-row gap-3">
              <button onClick={onContactClick} className="bg-primary text-white px-6 py-3 rounded-full text-sm md:text-base font-medium transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/30 active:scale-95">Solicitar presupuesto</button>
              <a href="/servicios/sistemas-ia" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-border text-sm md:text-base font-medium hover:border-primary/40 hover:bg-primary/5 transition-colors">Ver sistemas de IA <ArrowRight className="w-4 h-4" /></a>
            </div>
          </div>

          <ol className="rounded-2xl border border-border divide-y divide-border overflow-hidden">
            {offerings.map((o, i) => (
              <li key={o.name} className={`grid sm:grid-cols-[auto_1fr_auto] gap-x-5 gap-y-1 items-center px-5 md:px-6 py-4 ${i === 0 ? "bg-primary/5" : ""}`}>
                <span className="text-xs font-medium text-primary sm:w-16">Escala {i + 1}</span>
                <div>
                  <p className="font-medium text-foreground">{o.slug ? <a href={`/servicios/${o.slug}`} className="hover:text-primary transition-colors">{o.name}</a> : o.name}</p>
                  <p className="text-sm text-muted-foreground leading-snug">{o.text}</p>
                </div>
                <span className="text-sm font-medium text-foreground sm:text-right whitespace-nowrap">{o.price}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-px bg-border" />
    </section>
  );
};

export default Services;
