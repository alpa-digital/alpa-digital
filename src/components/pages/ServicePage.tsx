import { Link, useParams } from "react-router-dom";
import { Check, ArrowRight } from "lucide-react";
import PageShell, { Breadcrumbs, CtaBand, FaqList } from "@/components/pages/PageShell";
import NotFound from "@/pages/NotFound";
import { getService, services } from "@/data/services";
import { servicePath } from "@/lib/seo";

const ServicePage = () => {
  const { serviceSlug = "" } = useParams();
  const service = getService(serviceSlug);
  if (!service) return <NotFound />;
  const others = services.filter((s) => s.slug !== service.slug);

  return (
    <PageShell>
      {(openContact) => (
        <>
          <section className="px-4 md:px-8 pb-12">
            <div className="max-w-5xl mx-auto">
              <Breadcrumbs items={[{ name: "Inicio", path: "/" }, { name: "Servicios", path: "/servicios" }, { name: service.short, path: servicePath(service) }]} />
              <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-[1.05] mt-6 mb-6" style={{ textWrap: "balance" }}>{service.h1}</h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl leading-relaxed">{service.intro}</p>
              <div className="flex flex-col sm:flex-row gap-3 mt-8">
                <button onClick={openContact} className="bg-primary text-white px-7 py-3.5 rounded-full font-medium hover:scale-105 transition-transform">Reservar una llamada gratuita</button>
                <Link to="/#analiza-tu-empresa" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full border border-border font-medium hover:border-primary/40 hover:bg-primary/5 transition-colors">
                  Analizar mi empresa gratis <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </section>

          <section className="px-4 md:px-8 py-12 border-t border-border">
            <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
              {service.benefits.map((b) => (
                <div key={b.title} className="rounded-2xl border border-border p-6">
                  <h2 className="text-xl font-medium text-foreground mb-2">{b.title}</h2>
                  <p className="text-muted-foreground leading-relaxed">{b.text}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="px-4 md:px-8 py-12 bg-muted/30">
            <div className="max-w-5xl mx-auto grid md:grid-cols-[1fr_1.2fr] gap-10">
              <div>
                <h2 className="text-2xl md:text-3xl font-light text-foreground mb-4">Qué incluye</h2>
                <ul className="space-y-3">
                  {service.deliverables.map((d) => (
                    <li key={d} className="flex items-start gap-3 text-foreground/90"><Check className="w-4 h-4 text-primary mt-1 flex-shrink-0" /> {d}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-light text-foreground mb-4">Preguntas frecuentes</h2>
                <FaqList faqs={service.faqs} />
              </div>
            </div>
          </section>

          <section className="px-4 md:px-8 py-12">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-2xl font-light text-foreground mb-4">Otros servicios</h2>
              <div className="grid sm:grid-cols-3 gap-4">
                {others.map((o) => (
                  <Link key={o.slug} to={servicePath(o)} className="rounded-xl border border-border p-5 hover:border-primary/40 hover:bg-primary/5 transition-colors">
                    <p className="font-medium text-foreground">{o.name}</p>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{o.intro}</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          <CtaBand title="¿Qué tarea te gustaría dejar de hacer a mano?" text="Cuéntanosla en una llamada de 30 minutos. Te diremos con franqueza si merece la pena automatizarla, cuánto costaría y cuánto tiempo ahorrarías." onContactClick={openContact} />
        </>
      )}
    </PageShell>
  );
};

export default ServicePage;
