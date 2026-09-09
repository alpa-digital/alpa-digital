import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import PageShell, { Breadcrumbs, CtaBand } from "@/components/pages/PageShell";
import { families, pillarOf, servicesOf, type ServiceFamily } from "@/data/services";
import { servicePath } from "@/lib/seo";

const order: ServiceFamily[] = ["sistemas", "consultoria"];

const ServicesIndexPage = () => (
  <PageShell>
    {(openContact) => (
      <>
        <section className="px-4 md:px-8 pb-12">
          <div className="max-w-5xl mx-auto">
            <Breadcrumbs items={[{ name: "Inicio", path: "/" }, { name: "Servicios", path: "/servicios" }]} />
            <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-[1.05] mt-6 mb-6" style={{ textWrap: "balance" }}>Dos líneas de servicio, un mismo objetivo</h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl leading-relaxed">Construimos los sistemas de IA que tu empresa necesita, y te ayudamos a decidir con criterio qué construir y en qué orden.</p>
          </div>
        </section>
        <section className="px-4 md:px-8 pb-16">
          <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-6">
            {order.map((familyId) => {
              const family = families[familyId];
              const pillar = pillarOf(familyId);
              const children = servicesOf(familyId).filter((s) => !s.pillar);
              return (
                <div key={familyId} className="rounded-2xl border border-border p-7 flex flex-col">
                  <p className="text-xs text-primary font-medium uppercase tracking-wide mb-2">{family.tagline}</p>
                  <h2 className="text-2xl md:text-3xl font-medium text-foreground mb-3" style={{ textWrap: "balance" }}>{family.name}</h2>
                  <p className="text-muted-foreground leading-relaxed mb-5">{family.description}</p>
                  <ul className="space-y-2 mb-6">
                    {(pillar.offerings ?? []).map((o) => (
                      <li key={o.name} className="flex items-start justify-between gap-3 text-sm">
                        <span className="text-foreground">{o.slug ? <Link to={`/servicios/${o.slug}`} className="hover:text-primary">{o.name}</Link> : o.name}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto flex flex-wrap gap-3">
                    <Link to={servicePath(pillar)} className="inline-flex items-center gap-2 bg-primary text-white rounded-full px-5 py-2.5 text-sm font-medium hover:bg-primary/90">Ver la línea completa <ArrowRight className="w-4 h-4" /></Link>
                    {children.length > 0 && <span className="text-xs text-muted-foreground self-center">{children.length} páginas de detalle</span>}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
        <CtaBand title="¿No sabes por dónde empezar?" text="El diagnóstico te dice qué automatizar primero, con estimación cerrada, en una o dos semanas." onContactClick={openContact} buttonLabel="Pedir diagnóstico" />
      </>
    )}
  </PageShell>
);

export default ServicesIndexPage;
