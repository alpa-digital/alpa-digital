import { Link, useParams } from "react-router-dom";
import { ArrowRight, Bot, Check, Clock } from "lucide-react";
import PageShell, { Breadcrumbs, CtaBand, FaqList } from "@/components/pages/PageShell";
import NotFound from "@/pages/NotFound";
import { getSector, sectors } from "@/data/sectors";
import { pillarOf } from "@/data/services";
import { provinces } from "@/data/locations";
import { provincePath, sectorPath, servicePath } from "@/lib/seo";

const SectorPage = () => {
  const { sectorSlug = "" } = useParams();
  const sector = getSector(sectorSlug);
  if (!sector) return <NotFound />;
  const totalHours = sector.automations.reduce((sum, a) => sum + a.hours, 0);
  const related = sectors.filter((s) => s.slug !== sector.slug).slice(0, 5);
  const provs = sector.provinces.map((slug) => provinces.find((p) => p.slug === slug)).filter((p): p is NonNullable<typeof p> => Boolean(p));
  const sistemas = pillarOf("sistemas");
  const consultoria = pillarOf("consultoria");

  return (
    <PageShell>
      {(openContact) => (
        <>
          <section className="px-4 md:px-8 pb-12">
            <div className="max-w-5xl mx-auto">
              <Breadcrumbs items={[{ name: "Inicio", path: "/" }, { name: "Sectores", path: "/sectores" }, { name: sector.short, path: sectorPath(sector) }]} />
              <p className="text-xs md:text-sm font-medium text-primary uppercase tracking-wide mt-6 mb-2">Sector · {sector.name}</p>
              <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-[1.05] mb-6" style={{ textWrap: "balance" }}>{sector.h1}</h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl leading-relaxed">{sector.intro}</p>
              <div className="flex flex-col sm:flex-row gap-3 mt-8">
                <button onClick={openContact} className="bg-primary text-white px-7 py-3.5 rounded-full font-medium hover:scale-105 transition-transform">Reservar una llamada gratuita</button>
                <Link to="/#analiza-tu-empresa" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full border border-border font-medium hover:border-primary/40 hover:bg-primary/5 transition-colors">
                  Analizar mi empresa gratis <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </section>

          <section className="px-4 md:px-8 py-10 border-t border-border bg-muted/30">
            <div className="max-w-5xl mx-auto grid md:grid-cols-[1fr_auto] gap-8 items-start">
              <div>
                <h2 className="text-2xl md:text-3xl font-light text-foreground mb-4">Lo que se repite {sector.forName.replace(/^para /, "en ")}</h2>
                <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-2.5">
                  {sector.pains.map((pain) => (
                    <li key={pain} className="flex items-start gap-3 text-foreground/85"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" /> {pain}</li>
                  ))}
                </ul>
              </div>
              <div className="grid grid-cols-3 md:grid-cols-1 gap-3">
                {sector.metrics.map((m) => (
                  <div key={m.label} className="rounded-xl border border-border bg-background px-4 py-3 md:min-w-[200px]">
                    <p className="text-2xl font-semibold text-foreground" style={{ fontVariantNumeric: "tabular-nums" }}>{m.value}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{m.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="px-4 md:px-8 py-12">
            <div className="max-w-5xl mx-auto">
              <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
                <div>
                  <h2 className="text-2xl md:text-3xl font-light text-foreground mb-2">Qué automatizamos {sector.forName}</h2>
                  <p className="text-muted-foreground max-w-2xl">Cada automatización se contrata suelta, con alcance y plazo cerrados, y comparte base con las demás para crecer hasta el sistema completo.</p>
                </div>
                <p className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary"><Clock className="w-4 h-4" /> ≈ {totalHours} h/semana en total</p>
              </div>
              <div className="grid md:grid-cols-2 gap-5">
                {sector.automations.map((a, i) => (
                  <article key={a.title} className="rounded-2xl border border-border p-6 flex flex-col">
                    <div className="flex items-center justify-between gap-3 mb-3">
                      <span className="text-xs font-medium text-primary">{a.area}</span>
                      <span className="text-xs text-muted-foreground" style={{ fontVariantNumeric: "tabular-nums" }}>≈ {a.hours} h/semana</span>
                    </div>
                    <h3 className="text-lg font-medium text-foreground mb-2">{i + 1}. {a.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{a.text}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="px-4 md:px-8 py-12 bg-[#08090B] text-white">
            <div className="max-w-5xl mx-auto grid lg:grid-cols-[1fr_1.2fr] gap-10 items-center">
              <div>
                <p className="text-xs font-medium text-blue-300 uppercase tracking-wide mb-2">La escala de empresa</p>
                <h2 className="text-2xl md:text-3xl font-light mb-4" style={{ textWrap: "balance" }}>Así sería el sistema completo {sector.forName.replace(/^para /, "de ")}</h2>
                <p className="text-white/60 leading-relaxed mb-5">Las mismas automatizaciones, conectadas entre sí y con un agente central al que el equipo habla por WhatsApp o por voz. Datos compartidos, permisos y supervisión. Se construye por fases, con alcance y plazo cerrados en cada una.</p>
                <Link to={servicePath(sistemas)} className="inline-flex items-center gap-2 text-blue-300 hover:text-white">Ver sistemas de IA <ArrowRight className="w-4 h-4" /></Link>
              </div>
              <div className="rounded-2xl border border-white/10 bg-[#0D0E11] p-5 md:p-6">
                <div className="mx-auto w-fit rounded-2xl border border-blue-400 bg-blue-500/15 px-4 py-3 flex items-center gap-3 shadow-[0_0_30px_rgba(59,130,246,0.35)] mb-5">
                  <div className="w-9 h-9 rounded-full bg-blue-500/30 flex items-center justify-center"><Bot className="w-5 h-5 text-white" /></div>
                  <p className="text-sm font-semibold">{sector.system.hub}</p>
                </div>
                <div className="grid grid-cols-2 gap-2.5">
                  {sector.system.modules.map((m) => (
                    <div key={m.name} className="rounded-xl border border-white/15 bg-[#141518] px-3 py-2.5">
                      <p className="text-[12px] font-semibold leading-tight">{m.name}</p>
                      <p className="text-[10px] text-white/50 mt-0.5">{m.short}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="px-4 md:px-8 py-12">
            <div className="max-w-5xl mx-auto grid md:grid-cols-[1fr_1.2fr] gap-10">
              <div>
                <h2 className="text-2xl md:text-3xl font-light text-foreground mb-4">Cómo empezar</h2>
                <ul className="space-y-3">
                  {[
                    { t: "Analiza tu web gratis", d: "En 30 segundos, un primer mapa de las áreas con más trabajo repetitivo." },
                    { t: "Diagnóstico", d: "Una o dos semanas con las personas que hacen el trabajo. Plan priorizado con estimación cerrada." },
                    { t: "Primera automatización", d: "La que más horas ahorra, en dos a seis semanas, con alcance y plazo cerrados y un mes de soporte." },
                  ].map((s) => (
                    <li key={s.t} className="flex items-start gap-3"><Check className="w-4 h-4 text-primary mt-1 flex-shrink-0" /><span><span className="font-medium text-foreground">{s.t}</span><span className="text-muted-foreground"> · {s.d}</span></span></li>
                  ))}
                </ul>
                <div className="mt-6 flex flex-wrap gap-2">
                  <Link to={servicePath(sistemas)} className="rounded-full border border-border px-3.5 py-1.5 text-sm hover:border-primary/40 hover:text-primary">{sistemas.short}</Link>
                  <Link to={servicePath(consultoria)} className="rounded-full border border-border px-3.5 py-1.5 text-sm hover:border-primary/40 hover:text-primary">{consultoria.short}</Link>
                </div>
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-light text-foreground mb-4">Preguntas frecuentes</h2>
                <FaqList faqs={sector.faqs} />
              </div>
            </div>
          </section>

          <section className="px-4 md:px-8 py-12 border-t border-border">
            <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10">
              <div>
                <h2 className="text-xl font-medium text-foreground mb-3">Dónde trabajamos con este sector</h2>
                <ul className="flex flex-wrap gap-2">
                  {provs.map((p) => (
                    <li key={p.slug}><Link to={provincePath(p)} className="inline-block rounded-full border border-border px-3 py-1.5 text-sm text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors">{p.name}{p.tier === 1 ? " · presencial" : ""}</Link></li>
                  ))}
                  <li><Link to="/zonas" className="inline-block rounded-full border border-primary/40 bg-primary/5 px-3 py-1.5 text-sm text-primary">Todas las zonas</Link></li>
                </ul>
              </div>
              <div>
                <h2 className="text-xl font-medium text-foreground mb-3">Otros sectores</h2>
                <ul className="flex flex-wrap gap-2">
                  {related.map((s) => (
                    <li key={s.slug}><Link to={sectorPath(s)} className="inline-block rounded-full border border-border px-3 py-1.5 text-sm text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors">{s.short}</Link></li>
                  ))}
                  <li><Link to="/sectores" className="inline-block rounded-full border border-primary/40 bg-primary/5 px-3 py-1.5 text-sm text-primary">Todos los sectores</Link></li>
                </ul>
              </div>
            </div>
          </section>

          <CtaBand title={`¿Qué tarea te gustaría dejar de hacer a mano?`} text={`Cuéntanosla en una llamada de 30 minutos. Conocemos el sector y te diremos con franqueza si merece la pena automatizarla y cuánto tiempo ahorrarías.`} onContactClick={openContact} />
        </>
      )}
    </PageShell>
  );
};

export default SectorPage;
