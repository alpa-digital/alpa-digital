import { ArrowRight } from "lucide-react";
import { sectors } from "@/data/sectors";

/** Tira de sectores en la home: enlazado interno hacia las páginas de sector. */
const Sectors = () => (
  <section id="sectores" className="py-14 md:py-16 px-4 md:px-8 bg-background border-t border-border scroll-mt-20">
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
        <div>
          <p className="text-xs font-medium text-primary uppercase tracking-wide mb-2">Por sectores</p>
          <h2 className="text-2xl md:text-3xl font-light text-foreground" style={{ textWrap: "balance" }}>Cada sector repite tareas distintas. Sabemos cuáles.</h2>
        </div>
        <a href="/sectores" className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline">Ver todos los sectores <ArrowRight className="w-4 h-4" /></a>
      </div>
      <ul className="flex flex-wrap gap-2">
        {sectors.map((s) => (
          <li key={s.slug}>
            <a href={`/sectores/${s.slug}`} className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm text-foreground hover:border-primary/40 hover:bg-primary/5 hover:text-primary transition-colors">
              {s.short}
              <span className="text-xs text-muted-foreground">≈ {s.automations.reduce((sum, a) => sum + a.hours, 0)} h/sem</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default Sectors;
