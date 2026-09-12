import { Link, useParams } from "react-router-dom";
import { ArrowRight, Check, MapPin } from "lucide-react";
import PageShell, { Breadcrumbs, CtaBand, FaqList } from "@/components/pages/PageShell";
import NotFound from "@/pages/NotFound";
import { getProvince, getMunicipality, provinces, slugify } from "@/data/locations";
import { services } from "@/data/services";
import { automationFlows } from "@/data/automationFlows";
import { localFaqs, municipalityPath, provincePath, servicePath } from "@/lib/seo";
import { site } from "@/data/site";
import { sectorForLabel } from "@/data/sectors";
import { sectorPath } from "@/lib/seo";

const sectorAutomation: Record<string, string> = {
  turismo: "reservas y consultas respondidas 24 horas, reseñas contestadas y campañas de temporada",
  hosteler: "reservas y consultas respondidas 24 horas, reseñas contestadas y facturas de proveedores al día",
  inmobil: "contactos de portales cualificados y visitas agendadas solas, recibos y contratos generados",
  construc: "presupuestos de obra a partir de fotos, certificaciones desde una conversación y facturas por obra",
  instalac: "presupuestos a partir de fotos, certificados y boletines generados desde el móvil y control de material",
  reforma: "presupuestos a partir de fotos y seguimiento del cliente sin llamadas",
  agro: "pedidos, albaranes y certificaciones sin teclear, y campañas gestionadas sin desbordar a la oficina",
  agricul: "pedidos y albaranes sin teclear, trazabilidad y documentación de exportación automatizada",
  vitivin: "pedidos de distribuidores por WhatsApp, documentación de exportación y reservas de enoturismo",
  comercio: "stock y precios contestados al momento, pedidos convertidos en líneas de pedido y facturas cuadradas",
  distrib: "pedidos por WhatsApp o foto convertidos en pedidos reales, stock por ubicación y rutas de reparto",
  logíst: "pedidos, rutas y albaranes firmados desde el móvil, con incidencias registradas al momento",
  industr: "albaranes y partes sin picar datos, presupuestos técnicos en minutos y seguimiento de pedidos sin llamadas",
  metal: "presupuestos técnicos en minutos, albaranes y partes registrados solos y control de calidad documentado",
  automo: "documentación de calidad y certificaciones al día, pedidos de proveedores y partes de producción",
  salud: "citas y recordatorios sin teléfono ocupado, consentimientos y facturación por aseguradora",
  clínic: "citas y recordatorios por WhatsApp, consentimientos firmados y liquidación de mutuas",
  servicios: "consultas frecuentes respondidas al momento, documentación clasificada sola y propuestas en minutos",
  profesional: "expedientes y documentación clasificados solos, propuestas en minutos e informes semanales",
  educa: "matrículas, consultas de alumnos y recordatorios automatizados",
  pesca: "documentación de trazabilidad y pedidos de lonja y distribución automatizados",
  mueble: "presupuestos a medida a partir de medidas y fotos, y pedidos a proveedores desde el taller",
  calzado: "pedidos de distribuidores, fichas de producto y documentación de exportación automatizados",
  cerámic: "pedidos, albaranes y certificados técnicos gestionados sin teclear",
  energ: "partes de mantenimiento, certificaciones y documentación técnica generados solos",
  textil: "pedidos, fichas de producto y documentación de exportación automatizados",
  transporte: "rutas, albaranes firmados en el móvil e incidencias registradas al instante",
  tecnolog: "atención a clientes por chat, propuestas en minutos y seguimiento comercial sin olvidos",
};

function automationFor(sector: string): string {
  const key = sector.toLowerCase();
  const hit = Object.keys(sectorAutomation).find((k) => key.includes(k));
  return hit ? sectorAutomation[hit] : "consultas respondidas al momento, presupuestos en minutos y facturas registradas sin teclear";
}

const LocationPage = () => {
  const { provinceSlug = "", municipalitySlug } = useParams();
  const province = getProvince(provinceSlug);
  const municipality = municipalitySlug ? getMunicipality(provinceSlug, municipalitySlug)?.name : undefined;
  if (!province || (municipalitySlug && !municipality)) return <NotFound />;

  const place = municipality ?? province.name;
  const placeIn = municipality ? `en ${municipality}` : province.in;
  const path = municipality ? municipalityPath(province, municipality) : provincePath(province);
  const faqs = localFaqs(placeIn, province);
  const towns = [province.capital, ...province.municipalities].filter((m) => m !== municipality);
  const neighbours = provinces.filter((p) => p.community === province.community && p.slug !== province.slug);
  const exampleFlows = automationFlows.slice(0, 3);
  // En páginas de municipio, los sectores ligados a otro municipio concreto ("Mueble en Yecla") no aplican.
  const sectors = municipality
    ? province.sectors.filter((s) => !/ en [A-ZÁÉÍÓÚ]/.test(s) || s.includes(municipality))
    : province.sectors;
  const shownSectors = sectors.length >= 2 ? sectors : province.sectors;

  return (
    <PageShell>
      {(openContact) => (
        <>
          <section className="px-4 md:px-8 pb-12">
            <div className="max-w-5xl mx-auto">
              <Breadcrumbs items={[{ name: "Inicio", path: "/" }, { name: "Zonas", path: "/zonas" }, { name: province.name, path: provincePath(province) }, ...(municipality ? [{ name: municipality, path }] : [])]} />
              <p className="inline-flex items-center gap-2 text-sm text-primary font-medium mt-6 mb-3"><MapPin className="w-4 h-4" /> {place} · {province.community}</p>
              <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-[1.05] mb-6" style={{ textWrap: "balance" }}>Automatización con IA para pymes {placeIn}</h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl leading-relaxed">
                Ayudamos a las pequeñas y medianas empresas {placeIn} a quitarse de encima el trabajo repetitivo con inteligencia artificial: atención al cliente, presupuestos, facturas, pedidos y seguimiento comercial. {province.note}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mt-8">
                <button onClick={openContact} className="bg-primary text-white px-7 py-3.5 rounded-full font-medium hover:scale-105 transition-transform">Reservar una llamada gratuita</button>
                <Link to="/#analiza-tu-empresa" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full border border-border font-medium hover:border-primary/40 hover:bg-primary/5 transition-colors">
                  Analizar mi empresa gratis <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </section>

          {province.tier === 1 && (
            <section className="px-4 md:px-8 py-8 bg-primary/5 border-t border-border">
              <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
                <div className="w-12 h-12 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0"><MapPin className="w-6 h-6 text-primary" /></div>
                <div>
                  <p className="font-medium text-foreground">
                    {municipality === site.homeMunicipality ? "Aquí está nuestra sede." : `A un paso de nuestra sede en ${site.homeMunicipality} (${site.address.region}).`}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Primera reunión presencial sin coste en toda la provincia de {province.name}. Diagnóstico con tu equipo en tus instalaciones y seguimiento en persona cuando el proyecto lo pide.
                  </p>
                </div>
              </div>
            </section>
          )}

          <section className="px-4 md:px-8 py-12 border-t border-border">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-light text-foreground mb-2">Qué automatizan las empresas {placeIn}</h2>
              <p className="text-muted-foreground mb-8 max-w-3xl">Los sectores con más pymes en {province.name} y lo que suele dar mejor resultado en cada uno.</p>
              <div className="grid md:grid-cols-2 gap-5">
                {shownSectors.map((sector) => {
                  const page = sectorForLabel(sector);
                  return (
                    <div key={sector} className="rounded-2xl border border-border p-6">
                      <h3 className="text-lg font-medium text-foreground mb-2">{sector}</h3>
                      <p className="text-muted-foreground leading-relaxed">Automatizamos {automationFor(sector)}.</p>
                      {page && (
                        <Link to={sectorPath(page)} className="inline-flex items-center gap-1 text-sm text-primary mt-3 hover:underline">
                          IA {page.forName} <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          <section className="px-4 md:px-8 py-12 bg-muted/30">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-light text-foreground mb-6">Cómo trabajamos con empresas {placeIn}</h2>
              <div className="grid md:grid-cols-3 gap-5">
                {[
                  { t: "Primera llamada por videollamada", d: "30 minutos para entender qué tarea te quita más tiempo. Sin compromiso." },
                  { t: "Diagnóstico con tu equipo", d: province.tier === 1 ? "Sesiones en tus instalaciones con las personas que hacen el trabajo, para ver el proceso en sitio." : "Sesiones en remoto con las personas que hacen el trabajo. Viajamos desde Utrera (Sevilla) cuando hace falta ver el proceso en sitio." },
                  { t: "Implantación y formación", d: "Automatización conectada a tus herramientas, probada con casos reales tuyos, y formación del equipo. Un mes de soporte incluido." },
                ].map((step, i) => (
                  <div key={step.t} className="rounded-2xl border border-border bg-background p-6">
                    <p className="text-xs text-primary font-medium mb-2">Paso {i + 1}</p>
                    <h3 className="font-medium text-foreground mb-2">{step.t}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{step.d}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="px-4 md:px-8 py-12">
            <div className="max-w-5xl mx-auto grid md:grid-cols-[1.1fr_1fr] gap-10">
              <div>
                <h2 className="text-2xl md:text-3xl font-light text-foreground mb-4">Servicios disponibles {placeIn}</h2>
                <ul className="space-y-3">
                  {services.map((s) => (
                    <li key={s.slug}>
                      <Link to={servicePath(s)} className="flex items-start gap-3 group">
                        <Check className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                        <span><span className="font-medium text-foreground group-hover:text-primary transition-colors">{s.name}</span><span className="text-muted-foreground"> · {s.description.split(".")[0]}.</span></span>
                      </Link>
                    </li>
                  ))}
                </ul>
                <h2 className="text-2xl md:text-3xl font-light text-foreground mt-10 mb-4">Ejemplos de automatizaciones</h2>
                <ul className="space-y-2">
                  {exampleFlows.map((f) => (
                    <li key={f.id} className="text-muted-foreground"><span className="text-foreground font-medium">{f.area}:</span> {f.title.toLowerCase()} ({f.metric.value} {f.metric.label}).</li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-light text-foreground mb-4">Preguntas frecuentes</h2>
                <FaqList faqs={faqs} />
              </div>
            </div>
          </section>

          <section className="px-4 md:px-8 py-12 border-t border-border">
            <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10">
              <div>
                <h2 className="text-xl font-medium text-foreground mb-3">{municipality ? `Otros municipios de ${province.name}` : `Municipios de ${province.name}`}</h2>
                <ul className="flex flex-wrap gap-2">
                  {towns.map((town) => (
                    <li key={town}>
                      <Link to={municipalityPath(province, town)} className="inline-block rounded-full border border-border px-3 py-1.5 text-sm text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors">{town}</Link>
                    </li>
                  ))}
                  {municipality && (
                    <li><Link to={provincePath(province)} className="inline-block rounded-full border border-primary/40 bg-primary/5 px-3 py-1.5 text-sm text-primary">Toda la provincia de {province.name}</Link></li>
                  )}
                </ul>
              </div>
              {neighbours.length > 0 && (
                <div>
                  <h2 className="text-xl font-medium text-foreground mb-3">Otras provincias de {province.community}</h2>
                  <ul className="flex flex-wrap gap-2">
                    {neighbours.map((n) => (
                      <li key={n.slug}>
                        <Link to={provincePath(n)} className="inline-block rounded-full border border-border px-3 py-1.5 text-sm text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors">{n.name}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </section>

          <CtaBand title={`¿Qué tarea te gustaría dejar de hacer a mano ${placeIn}?`} text="Cuéntanosla en una llamada de 30 minutos. Te diremos con franqueza si merece la pena automatizarla y cuánto tiempo ahorrarías." onContactClick={openContact} />
        </>
      )}
    </PageShell>
  );
};

export default LocationPage;
export { slugify };
