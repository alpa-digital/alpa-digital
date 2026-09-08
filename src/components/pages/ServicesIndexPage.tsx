import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import PageShell, { Breadcrumbs, CtaBand } from "@/components/pages/PageShell";
import { services } from "@/data/services";
import { servicePath } from "@/lib/seo";

const ServicesIndexPage = () => (
  <PageShell>
    {(openContact) => (
      <>
        <section className="px-4 md:px-8 pb-12">
          <div className="max-w-5xl mx-auto">
            <Breadcrumbs items={[{ name: "Inicio", path: "/" }, { name: "Servicios", path: "/servicios" }]} />
            <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-[1.05] mt-6 mb-6" style={{ textWrap: "balance" }}>Servicios de automatización e IA para pymes</h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl leading-relaxed">Cuatro formas de trabajar con nosotros, todas con precio cerrado y resultados que se miden en horas ahorradas.</p>
          </div>
        </section>
        <section className="px-4 md:px-8 pb-16">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
            {services.map((s) => (
              <Link key={s.slug} to={servicePath(s)} className="group rounded-2xl border border-border p-7 hover:border-primary/40 hover:bg-primary/5 transition-colors">
                <h2 className="text-2xl font-medium text-foreground mb-2 group-hover:text-primary transition-colors">{s.name}</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">{s.intro}</p>
                <span className="inline-flex items-center gap-2 text-primary font-medium">Ver servicio <ArrowRight className="w-4 h-4" /></span>
              </Link>
            ))}
          </div>
        </section>
        <CtaBand title="¿No sabes por dónde empezar?" text="El diagnóstico de 490 € te dice qué automatizar primero, con estimación cerrada. Y se descuenta si seguimos." onContactClick={openContact} buttonLabel="Pedir diagnóstico" />
      </>
    )}
  </PageShell>
);

export default ServicesIndexPage;
