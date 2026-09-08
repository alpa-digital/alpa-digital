import { Search, FlaskConical, ArrowRight, PenTool, Map } from "lucide-react";

interface ConsultingProps {
  onContactClick: () => void;
}

/** Línea 1: consultoría. Comparte título con la sección de construcción que va justo después. */
const Consulting = ({ onContactClick }: ConsultingProps) => (
  <section id="consultoria" className="pt-20 md:pt-24 pb-12 md:pb-14 px-4 md:px-8 bg-background relative scroll-mt-20">
    <div className="absolute top-0 left-0 w-full h-px bg-border" />
    <div className="max-w-6xl mx-auto">
      <div className="max-w-3xl mb-12">
        <h2 className="text-4xl md:text-5xl font-light text-foreground mb-4" style={{ textWrap: "balance" }}>Dos líneas de servicio, precio cerrado en todo</h2>
        <p className="text-lg md:text-xl text-muted-foreground font-light leading-relaxed">Primero decidir qué merece la pena, después construirlo. Se puede empezar por cualquiera de las dos.</p>
      </div>

      <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] gap-8 lg:gap-12 items-start">
        <div>
          <p className="text-xs font-medium text-primary uppercase tracking-wide mb-2">Línea 1 · Consultoría de IA</p>
          <h3 className="text-2xl md:text-3xl font-medium text-foreground mb-3" style={{ textWrap: "balance" }}>Decidir qué construir, con datos</h3>
          <p className="text-muted-foreground leading-relaxed mb-5">
            Un diagnóstico con las personas que hacen el trabajo dice qué se repite, cuánto cuesta y qué automatizar primero. Cuando no está claro si la IA puede con tus datos, lo probamos en pequeño antes de invertir.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed mb-6">
            También diseño de producto y roadmap corporativo de IA, sueltos o como acompañamiento mensual (350 €/mes, sin permanencia).{" "}
            <a href="/servicios/consultoria-ia-pymes" className="text-primary inline-flex items-center gap-1 hover:underline">Ver consultoría <ArrowRight className="w-3.5 h-3.5" /></a>
          </p>
          <button onClick={onContactClick} className="bg-primary text-white px-6 py-3 rounded-full text-sm md:text-base font-medium transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/30 active:scale-95">
            Pedir diagnóstico (490 €)
          </button>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="rounded-2xl border border-primary/40 bg-primary/5 p-6 flex flex-col">
            <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center mb-4"><Search className="w-5 h-5 text-primary" /></div>
            <h4 className="text-lg font-medium text-foreground mb-2">Diagnóstico de automatización</h4>
            <p className="text-sm text-muted-foreground leading-relaxed flex-1">Una o dos semanas con tu equipo. Mapa de procesos, tiempo que consume cada uno y plan priorizado por impacto, coste y riesgo, con estimación cerrada de cada automatización.</p>
            <p className="text-2xl font-semibold text-foreground mt-4">490 €</p>
            <p className="text-xs text-muted-foreground">Se descuenta si seguimos con la implementación</p>
          </div>
          <div className="rounded-2xl border border-border p-6 flex flex-col">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-4"><FlaskConical className="w-5 h-5 text-primary" /></div>
            <h4 className="text-lg font-medium text-foreground mb-2">I+D y pruebas de concepto</h4>
            <p className="text-sm text-muted-foreground leading-relaxed flex-1">Un prototipo con tus datos reales para comprobar si la IA resuelve algo antes de construirlo, y un informe con lo que funciona, lo que no y a qué coste.</p>
            <p className="text-2xl font-semibold text-foreground mt-4">Precio cerrado</p>
            <p className="text-xs text-muted-foreground">Según el caso, normalmente una a tres semanas</p>
          </div>
          <div className="sm:col-span-2 rounded-xl border border-border px-5 py-3.5 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-2"><PenTool className="w-4 h-4 text-primary" /> Diseño de producto</span>
            <span className="inline-flex items-center gap-2"><Map className="w-4 h-4 text-primary" /> Roadmap corporativo de IA</span>
            <span className="text-xs">Piezas 3 y 4 de la consultoría, con precio cerrado.</span>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Consulting;
