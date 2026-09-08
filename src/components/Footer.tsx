import alpaLogoWhite from "@/assets/alpa-logo-white.png";
import { families, pillarOf, servicesOf } from "@/data/services";
import { site } from "@/data/site";
import { communities, provincesByCommunity } from "@/data/locations";
import { sectors } from "@/data/sectors";

const Footer = () => {
  return (
    <footer className="py-16 px-8 bg-black text-white relative">
      <div className="max-w-7xl mx-auto">
        {/* Main content area */}
        <div className="flex flex-col md:flex-row items-start justify-between min-h-[120px] gap-8">
          {/* Left side - Logo and Main text */}
          <div className="flex-1 max-w-lg">
            <div className="mb-6">
              <img src={alpaLogoWhite} alt="Alpa Digital - Automatización e inteligencia artificial para pymes" className="h-7 md:h-9" />
            </div>
            <h2 className="text-2xl md:text-3xl font-light leading-tight">
              Automatización e IA{" "}
              <span className="font-bold">con criterio</span>, para que tu pyme haga más con el mismo equipo
            </h2>
          </div>

          {/* Right side - Contact email */}
          <div className="flex-1 flex justify-end">
            <div className="text-right">
              <a 
                href="mailto:info@alpa.digital" 
                className="text-xl hover:opacity-80 transition-opacity"
              >
                info@alpa.digital
              </a>
            </div>
          </div>
        </div>

        {/* Servicios y zonas */}
        <div className="grid md:grid-cols-[1fr_2fr] gap-10 pt-10 mt-10 border-t border-white/10">
          <div className="space-y-6">
            {(["sistemas", "consultoria"] as const).map((familyId) => {
              const pillar = pillarOf(familyId);
              return (
                <div key={familyId}>
                  <a href={`/servicios/${pillar.slug}`} className="text-xs uppercase tracking-wide text-white/70 hover:text-white mb-2 inline-block">{families[familyId].short}</a>
                  <ul className="space-y-1.5">
                    {(pillar.offerings ?? []).map((o) => (
                      <li key={o.name}>
                        {o.slug ? <a href={`/servicios/${o.slug}`} className="text-sm text-white/80 hover:text-white transition-colors">{o.name}</a> : <span className="text-sm text-white/60">{o.name}</span>}
                      </li>
                    ))}
                    {servicesOf(familyId).length === 1 && null}
                  </ul>
                </div>
              );
            })}
          </div>
          <div>
            <a href="/sectores" className="text-xs uppercase tracking-wide text-white/70 hover:text-white mb-3 inline-block">Sectores</a>
            <ul className="flex flex-wrap gap-x-4 gap-y-1.5 mb-8">
              {sectors.map((s) => (
                <li key={s.slug}><a href={`/sectores/${s.slug}`} className="text-xs text-white/60 hover:text-white transition-colors">{s.short}</a></li>
              ))}
            </ul>
            <p className="text-xs uppercase tracking-wide text-white/50 mb-3">Automatización con IA para pymes en toda España</p>
            <ul className="flex flex-wrap gap-x-4 gap-y-1.5">
              {communities.map((c) =>
                provincesByCommunity(c).map((prov) => (
                  <li key={prov.slug}><a href={`/automatizacion-ia/${prov.slug}`} className="text-xs text-white/60 hover:text-white transition-colors">{prov.name}</a></li>
                ))
              )}
            </ul>
            <a href="/zonas" className="inline-block mt-3 text-xs text-white/70 underline hover:text-white">Ver todas las zonas y municipios</a>
          </div>
        </div>

        {/* Bottom section */}
        <div className="flex items-center justify-between pt-8 mt-8">
          {/* Cookie policy */}
          <div>
            <a href="/politica-cookies" className="text-sm hover:opacity-80 transition-opacity">
              Política de Cookies
            </a>
          </div>

          {/* Social icons */}
          <div className="flex items-center space-x-4">
            <a href="https://www.instagram.com/alpadigitalstudio/" target="_blank" rel="noopener noreferrer" aria-label="Instagram de Alpa Digital" className="w-8 h-8 border border-white/30 rounded flex items-center justify-center hover:border-white/60 transition-colors">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a href="https://www.linkedin.com/company/alpa-digital" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn de Alpa Digital" className="w-8 h-8 border border-white/30 rounded flex items-center justify-center hover:border-white/60 transition-colors">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
