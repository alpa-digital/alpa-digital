import { Link } from "react-router-dom";
import PageShell, { Breadcrumbs, CtaBand } from "@/components/pages/PageShell";
import { communities, provincesByCommunity } from "@/data/locations";
import { provincePath } from "@/lib/seo";

const ZonesPage = () => (
  <PageShell>
    {(openContact) => (
      <>
        <section className="px-4 md:px-8 pb-10">
          <div className="max-w-5xl mx-auto">
            <Breadcrumbs items={[{ name: "Inicio", path: "/" }, { name: "Zonas", path: "/zonas" }]} />
            <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-[1.05] mt-6 mb-6" style={{ textWrap: "balance" }}>Automatización con IA para pymes en toda España</h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl leading-relaxed">Trabajamos en remoto con empresas de cualquier provincia y visitamos la empresa cuando el proyecto lo pide. Elige tu zona para ver qué automatizan los negocios de tu sector.</p>
          </div>
        </section>
        <section className="px-4 md:px-8 pb-16">
          <div className="max-w-5xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {communities.map((community) => (
              <div key={community} className="rounded-2xl border border-border p-5">
                <h2 className="font-medium text-foreground mb-3">{community}</h2>
                <ul className="space-y-1.5">
                  {provincesByCommunity(community).map((prov) => (
                    <li key={prov.slug}>
                      <Link to={provincePath(prov)} className="text-muted-foreground hover:text-primary transition-colors">Automatización con IA {prov.in}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
        <CtaBand title="¿Tu empresa está en otra parte?" text="Da igual dónde estés: la primera llamada es por videollamada y la mayor parte del trabajo se hace en remoto." onContactClick={openContact} />
      </>
    )}
  </PageShell>
);

export default ZonesPage;
