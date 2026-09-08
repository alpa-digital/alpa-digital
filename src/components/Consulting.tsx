import { Search, FlaskConical, PenTool, Map, ArrowRight } from "lucide-react";
import { pillarOf } from "@/data/services";

interface ConsultingProps {
  onContactClick: () => void;
}

const icons = [Search, FlaskConical, PenTool, Map];

/** Segunda línea de servicio: consultoría de IA. Explica cuándo entra y cómo enlaza con lo que construimos. */
const Consulting = ({ onContactClick }: ConsultingProps) => {
  const pillar = pillarOf("consultoria");
  const offerings = pillar.offerings ?? [];
  return (
    <section id="consultoria" className="py-16 md:py-20 px-4 md:px-8 bg-muted/30 relative scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] gap-8 lg:gap-14 items-start">
          <div className="lg:sticky lg:top-24">
            <p className="text-xs font-medium text-primary uppercase tracking-wide mb-2">Cómo decidimos qué construir</p>
            <h2 className="text-3xl md:text-4xl font-light text-foreground leading-tight mb-4" style={{ textWrap: "balance" }}>Consultoría de IA</h2>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-4">
              Antes de construir, decidir. Y después, seguir mejorando. La consultoría responde a qué merece la pena automatizar, qué herramienta hace falta, cómo probar una idea antes de gastar en ella y en qué orden avanzar.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              Se contrata suelta o como acompañamiento mensual. Lo que sale de aquí (diagnóstico, prototipo, diseño, roadmap) es tuyo: puedes construirlo con nosotros o con quien elijas.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button onClick={onContactClick} className="bg-primary text-white px-6 py-3 rounded-full text-sm md:text-base font-medium transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/30 active:scale-95">
                Pedir diagnóstico (490 €)
              </button>
              <a href="/servicios/consultoria-ia-pymes" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-border text-sm md:text-base font-medium hover:border-primary/40 hover:bg-primary/5 transition-colors">
                Ver consultoría de IA <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          <ol className="grid sm:grid-cols-2 gap-4">
            {offerings.map((o, i) => {
              const Icon = icons[i] ?? Search;
              return (
                <li key={o.name} className="rounded-2xl border border-border bg-background p-5 md:p-6 flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center"><Icon className="w-5 h-5 text-primary" /></div>
                    <span className="text-[11px] text-muted-foreground uppercase tracking-wide">Pieza {i + 1}</span>
                  </div>
                  <h3 className="text-lg font-medium text-foreground mb-2">{o.name}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed flex-1">{o.text}</p>
                  {o.price && <p className="text-sm font-medium text-foreground mt-4 pt-3 border-t border-border">{o.price}</p>}
                </li>
              );
            })}
          </ol>
        </div>

        <div className="mt-10 rounded-2xl border border-primary/20 bg-primary/5 px-5 py-4 md:px-6 grid md:grid-cols-[auto_1fr] gap-3 md:gap-6 items-center">
          <p className="text-sm font-medium text-foreground">Cómo encajan las dos líneas</p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            La consultoría decide qué construir y en qué orden; los sistemas de IA lo construyen. Se puede empezar por cualquiera de las dos: con un diagnóstico si no está claro por dónde ir, o directamente con una automatización si ya sabes qué tarea sobra.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Consulting;
