import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import PageShell, { Breadcrumbs, CtaBand } from "@/components/pages/PageShell";
import { sectors } from "@/data/sectors";
import { sectorPath } from "@/lib/seo";

const SectorsIndexPage = () => (
  <PageShell>
    {(openContact) => (
      <>
        <section className="px-4 md:px-8 pb-12">
          <div className="max-w-5xl mx-auto">
            <Breadcrumbs items={[{ name: "Inicio", path: "/" }, { name: "Sectores", path: "/sectores" }]} />
            <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-[1.05] mt-6 mb-6" style={{ textWrap: "balance" }}>IA y automatización por sectores</h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl leading-relaxed">Cada sector repite tareas distintas. Aquí está lo que automatizamos en cada uno, con horas estimadas, el sistema completo que montaríamos y las preguntas que nos hacen.</p>
          </div>
        </section>
        <section className="px-4 md:px-8 pb-16">
          <div className="max-w-5xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {sectors.map((s) => {
              const hours = s.automations.reduce((sum, a) => sum + a.hours, 0);
              return (
                <Link key={s.slug} to={sectorPath(s)} className="group rounded-2xl border border-border p-6 hover:border-primary/40 hover:bg-primary/5 transition-colors flex flex-col">
                  <h2 className="text-lg font-medium text-foreground mb-2 group-hover:text-primary transition-colors">{s.name}</h2>
                  <p className="text-sm text-muted-foreground leading-relaxed flex-1 line-clamp-3">{s.pains[0]}. {s.pains[1]}.</p>
                  <div className="flex items-center justify-between mt-4 text-sm">
                    <span className="text-muted-foreground">≈ {hours} h/semana automatizables</span>
                    <span className="inline-flex items-center gap-1 text-primary font-medium">Ver <ArrowRight className="w-4 h-4" /></span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
        <CtaBand title="¿Tu sector no está en la lista?" text="Da igual: las tareas repetitivas se parecen mucho entre sectores. Analiza tu web gratis o cuéntanoslo en una llamada." onContactClick={openContact} />
      </>
    )}
  </PageShell>
);

export default SectorsIndexPage;
