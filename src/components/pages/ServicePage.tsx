import { Link, useParams } from "react-router-dom";
import { Check, ArrowRight } from "lucide-react";
import PageShell, { Breadcrumbs, CtaBand, FaqList } from "@/components/pages/PageShell";
import NotFound from "@/pages/NotFound";
import { families, getService, pillarOf, servicesOf } from "@/data/services";
import { servicePath } from "@/lib/seo";

const ServicePage = () => {
  const { serviceSlug = "" } = useParams();
  const service = getService(serviceSlug);
  if (!service) return <NotFound />;
  const family = families[service.family];
  const pillar = pillarOf(service.family);
  const siblings = servicesOf(service.family).filter((s) => s.slug !== service.slug && !s.pillar);
  const otherFamily = service.family === "sistemas" ? "consultoria" : "sistemas";
  const otherPillar = pillarOf(otherFamily);
  const crumbs = service.pillar
    ? [{ name: "Inicio", path: "/" }, { name: "Servicios", path: "/servicios" }, { name: service.short, path: servicePath(service) }]
    : [{ name: "Inicio", path: "/" }, { name: "Servicios", path: "/servicios" }, { name: pillar.short, path: servicePath(pillar) }, { name: service.short, path: servicePath(service) }];

  return (
    <PageShell>
      {(openContact) => (
        <>
          <section className="px-4 md:px-8 pb-12">
            <div className="max-w-5xl mx-auto">
              <Breadcrumbs items={crumbs} />
              <p className="text-xs md:text-sm font-medium text-primary uppercase tracking-wide mt-6 mb-2">{family.tagline} · {family.short}</p>
              <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-[1.05] mb-6" style={{ textWrap: "balance" }}>{service.h1}</h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl leading-relaxed">{service.intro}</p>
              {service.price && <p className="mt-4 inline-block rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">{service.price}</p>}
              <div className="flex flex-col sm:flex-row gap-3 mt-8">
                <button onClick={openContact} className="bg-primary text-white px-7 py-3.5 rounded-full font-medium hover:scale-105 transition-transform">Reservar una llamada gratuita</button>
                <Link to="/#analiza-tu-empresa" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full border border-border font-medium hover:border-primary/40 hover:bg-primary/5 transition-colors">
                  Analizar mi empresa gratis <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </section>

          {service.offerings && (
            <section className="px-4 md:px-8 py-12 border-t border-border bg-muted/30">
              <div className="max-w-5xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-light text-foreground mb-8">{service.family === "sistemas" ? "Cuatro escalas, un solo servicio" : "Cuatro piezas, sueltas o como acompañamiento"}</h2>
                <ol className="grid md:grid-cols-2 gap-5">
                  {service.offerings.map((o, i) => (
                    <li key={o.name} className="rounded-2xl border border-border bg-background p-6 flex flex-col">
                      <p className="text-xs text-primary font-medium mb-2">{service.family === "sistemas" ? `Escala ${i + 1}` : `Pieza ${i + 1}`}</p>
                      <h3 className="text-lg font-medium text-foreground mb-2">{o.name}</h3>
                      <p className="text-muted-foreground leading-relaxed flex-1">{o.text}</p>
                      <div className="flex items-center justify-between gap-3 mt-4">
                        {o.price && <span className="text-sm font-medium text-foreground">{o.price}</span>}
                        {o.slug && <Link to={`/servicios/${o.slug}`} className="text-sm text-primary inline-flex items-center gap-1 hover:underline">Ver detalle <ArrowRight className="w-3.5 h-3.5" /></Link>}
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </section>
          )}

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
            <div className="max-w-5xl mx-auto grid md:grid-cols-[1.4fr_1fr] gap-8">
              <div>
                <h2 className="text-2xl font-light text-foreground mb-4">{service.pillar ? `Dentro de ${family.short.toLowerCase()}` : `Más de ${family.short.toLowerCase()}`}</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {!service.pillar && (
                    <Link to={servicePath(pillar)} className="rounded-xl border border-primary/30 bg-primary/5 p-5 hover:border-primary/60 transition-colors">
                      <p className="font-medium text-foreground">{pillar.name}</p>
                      <p className="text-sm text-muted-foreground mt-1">Visión completa de la línea de servicio.</p>
                    </Link>
                  )}
                  {siblings.map((o) => (
                    <Link key={o.slug} to={servicePath(o)} className="rounded-xl border border-border p-5 hover:border-primary/40 hover:bg-primary/5 transition-colors">
                      <p className="font-medium text-foreground">{o.name}</p>
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{o.intro}</p>
                    </Link>
                  ))}
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-light text-foreground mb-4">La otra línea</h2>
                <Link to={servicePath(otherPillar)} className="block rounded-xl border border-border p-5 hover:border-primary/40 hover:bg-primary/5 transition-colors">
                  <p className="text-xs text-primary font-medium mb-1">{families[otherFamily].tagline}</p>
                  <p className="font-medium text-foreground">{otherPillar.name}</p>
                  <p className="text-sm text-muted-foreground mt-1">{families[otherFamily].description.split(".")[0]}.</p>
                </Link>
              </div>
            </div>
          </section>

          <CtaBand
            title={service.family === "consultoria" ? "Empieza por el diagnóstico" : "¿Qué tarea te gustaría dejar de hacer a mano?"}
            text={service.family === "consultoria" ? "490 €, una o dos semanas, y sabrás qué automatizar primero con estimación cerrada. Se descuenta si seguimos." : "Cuéntanosla en una llamada de 30 minutos. Te diremos con franqueza si merece la pena automatizarla, cuánto costaría y cuánto tiempo ahorrarías."}
            onContactClick={openContact}
            buttonLabel={service.family === "consultoria" ? "Pedir diagnóstico" : "Reservar una llamada gratuita"}
          />
        </>
      )}
    </PageShell>
  );
};

export default ServicePage;
