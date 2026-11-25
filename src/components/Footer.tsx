import { Link } from "react-router-dom";
import alpaLogoWhite from "@/assets/alpa-logo-white.png";
import { site } from "@/data/site";
import { useLang } from "@/i18n";

const Footer = () => {
  const { lang } = useLang();
  const english = lang === "en";
  const serviceLinks = [
    { href: "/servicios/automatizacion-ia-pymes/", label: english ? "Process automation" : "Automatización de procesos" },
    { href: "/servicios/agentes-ia-empresas/", label: english ? "AI agents" : "Agentes de IA" },
    { href: "/servicios/desarrollo-producto-digital/", label: english ? "Digital product development" : "Desarrollo de producto digital" },
    { href: "/servicios/consultoria-ia-pymes/", label: english ? "AI consulting" : "Consultoría de IA" },
  ];
  const studioLinks = [
    { href: "/contacto/", label: english ? "Contact" : "Contacto" },
    { href: "/casos/", label: english ? "Projects" : "Proyectos" },
    { href: "/como-trabajamos/", label: english ? "How we work" : "Cómo trabajamos" },
    { href: "/nosotros/", label: english ? "About Alpa" : "Nosotros" },
    { href: "/recursos/", label: english ? "Resources" : "Recursos" },
    { href: "/sectores/", label: english ? "Industries" : "Sectores" },
    { href: "/zonas/", label: english ? "Where we work" : "Dónde trabajamos" },
  ];
  return (
    <footer className="px-4 md:px-8 py-12 md:py-16 bg-[#0D0E11] text-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-[1.1fr_1fr_.8fr_1fr] gap-9 lg:gap-12">
          <div>
            <Link to="/" aria-label={english ? "Alpa Digital home" : "Alpa Digital, inicio"}><img src={alpaLogoWhite} alt="Alpa Digital" className="h-8 w-auto" width="108" height="32" loading="lazy" /></Link>
            <p className="text-white/65 text-sm leading-relaxed mt-5 max-w-[24ch]">{english ? "Automation, AI and digital product development." : "Automatización, IA y desarrollo de producto digital."}</p>
          </div>
          <nav aria-label={english ? "Services" : "Servicios"}>
            <h2 className="font-semibold text-sm mb-4">{english ? "Services" : "Servicios"}</h2>
            <ul className="space-y-2 text-sm text-white/70">{serviceLinks.map((link) => <li key={link.href}><Link to={link.href} className="hover:text-white transition-colors">{link.label}</Link></li>)}</ul>
          </nav>
          <nav aria-label={english ? "Explore Alpa" : "Conoce Alpa"}>
            <h2 className="font-semibold text-sm mb-4">Alpa</h2>
            <ul className="space-y-2 text-sm text-white/70">{studioLinks.map((link) => <li key={link.href}><Link to={link.href} className="hover:text-white transition-colors">{link.label}</Link></li>)}</ul>
          </nav>
          <div>
            <h2 className="font-semibold text-sm mb-4">{english ? "Contact" : "Contacto"}</h2>
            <a href={`mailto:${site.email}`} className="hover:underline text-sm">{site.email}</a>
            <p className="text-sm text-white/70 leading-relaxed mt-3">Utrera, Sevilla.<br />{english ? "Working with companies across Spain." : "Trabajamos con empresas de toda España."}</p>
            <div className="flex gap-4 text-sm text-white/70 mt-4"><a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-white">LinkedIn</a><a href={site.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-white">Instagram</a></div>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-white/15 flex flex-wrap justify-between gap-4 text-xs text-white/60"><p>© {new Date().getFullYear()} Alpa Digital</p><Link to="/politica-cookies/" className="hover:text-white">{english ? "Cookie policy" : "Política de cookies"}</Link></div>
      </div>
    </footer>
  );
};
export default Footer;
