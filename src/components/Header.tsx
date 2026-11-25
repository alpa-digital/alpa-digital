import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import alpaLogo from "@/assets/alpa-logo.png";
import alpaLogoWhite from "@/assets/alpa-logo-white.png";
import LanguageSwitch from "@/components/LanguageSwitch";
import { useCopy, useLang } from "@/i18n";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const c = useCopy();
  const { lang } = useLang();
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  const studioHeader = isHome || ["/contacto", "/servicios", "/casos", "/como-trabajamos"].includes(pathname.replace(/\/+$/, "")) || pathname.startsWith("/casos/") || pathname.startsWith("/servicios/");
  const darkHeader = isScrolled || studioHeader;
  const allLinks = lang === "en"
    ? [{ to: "/servicios/", label: "Services" }, { to: "/sectores/", label: "Sectors" }, { to: "/casos/", label: "Projects" }, { to: "/recursos/", label: "Resources" }, { to: "/como-trabajamos/", label: "Our process" }]
    : [{ to: "/servicios/", label: "Servicios" }, { to: "/sectores/", label: "Sectores" }, { to: "/casos/", label: "Casos" }, { to: "/recursos/", label: "Recursos" }, { to: "/como-trabajamos/", label: "Cómo trabajamos" }];
  // Proyectos oculto por ahora en el menú (la página /casos/ sigue publicada). Para mostrarlo, vaciar esta lista.
  const hiddenLinks = ["/casos/"];
  const links = (studioHeader ? allLinks.filter(link => !["/sectores/", "/recursos/"].includes(link.to)).map(link => link.to === "/casos/" ? { ...link, label: lang === "en" ? "Projects" : "Proyectos" } : link) : allLinks).filter(link => !hiddenLinks.includes(link.to));

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  useEffect(() => setMenuOpen(false), [pathname]);
  useEffect(() => {
    if (!menuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === "Escape") setMenuOpen(false); };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);

  return <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
    <div className={`relative mx-auto grid grid-cols-[auto_1fr] lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-3 transition-all duration-500 ease-out motion-reduce:transition-none pointer-events-auto ${studioHeader ? "mt-4 w-[calc(100%-2rem)] md:w-[calc(100%-3rem)] max-w-[1440px] rounded-full bg-[#080808] text-white px-4 md:px-6 py-2.5 md:py-3" : isScrolled ? "mt-3 w-[calc(100%-1.5rem)] max-w-6xl rounded-full border border-white/10 bg-[#0D0E11]/95 text-white shadow-lg shadow-black/30 px-3 py-1.5 md:px-4" : "mt-0 w-full max-w-7xl bg-background/95 px-6 py-4 md:px-8 md:py-5"}`}>
      <Link to="/" className="flex items-center justify-self-start hover:opacity-80 transition-opacity" aria-label={c.nav.home}>
        <img src={darkHeader ? alpaLogoWhite : alpaLogo} alt="Alpa Digital" className={`transition-all duration-500 motion-reduce:transition-none ${studioHeader ? "h-6 md:h-8" : isScrolled ? "h-4 md:h-5" : "h-6 md:h-8"}`} />
      </Link>
      <nav aria-label={lang === "en" ? "Main navigation" : "Navegación principal"} className="hidden lg:flex items-center gap-3 xl:gap-5">
        {links.map((link) => <Link key={link.to} to={link.to} className={`text-sm font-medium whitespace-nowrap transition-colors ${darkHeader ? "text-white/80 hover:text-white" : "text-foreground/75 hover:text-primary"}`}>{link.label}</Link>)}
      </nav>
      <div className="flex items-center justify-self-end gap-2 md:gap-3">
        <div className="hidden min-[380px]:flex items-center"><LanguageSwitch dark={darkHeader} /></div>
        <Link to="/contacto/" state={{ from: pathname }} onClick={() => setMenuOpen(false)} aria-current={pathname.replace(/\/+$/, "") === "/contacto" ? "page" : undefined} className={`rounded-full font-medium transition-colors motion-reduce:transition-none whitespace-nowrap ${studioHeader ? "bg-white text-black hover:bg-white/90 px-4 py-2 md:px-6 md:py-2.5 text-sm" : `bg-primary hover:bg-primary/90 text-white ${isScrolled ? "px-3.5 py-1.5 text-xs md:text-sm" : "px-4 py-2 md:px-6 md:py-2.5 text-sm md:text-base"}`}`}>{c.nav.talk}</Link>
        <button type="button" aria-expanded={menuOpen} aria-controls="mobile-navigation" aria-label={menuOpen ? (lang === "en" ? "Close menu" : "Cerrar menú") : (lang === "en" ? "Open menu" : "Abrir menú")} onClick={() => setMenuOpen(!menuOpen)} className={`lg:hidden rounded-full p-2 ${darkHeader ? "text-white hover:bg-white/10" : "text-foreground hover:bg-muted"}`}>{menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}</button>
      </div>
      {menuOpen && <nav id="mobile-navigation" aria-label={lang === "en" ? "Mobile navigation" : "Navegación móvil"} className="lg:hidden absolute top-full left-0 right-0 mt-2 rounded-2xl border border-border bg-background text-foreground p-3 shadow-lg">
        {links.map((link) => <Link key={link.to} to={link.to} onClick={() => setMenuOpen(false)} className="block rounded-xl px-4 py-3 text-sm font-medium hover:bg-muted focus-visible:bg-muted">{link.label}</Link>)}
        <div className="min-[380px]:hidden px-4 py-2"><LanguageSwitch /></div>
      </nav>}
    </div>
  </header>;
};

export default Header;
