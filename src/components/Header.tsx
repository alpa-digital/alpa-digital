import { useEffect, useState } from "react";
import alpaLogo from "@/assets/alpa-logo.png";
import alpaLogoWhite from "@/assets/alpa-logo-white.png";

interface HeaderProps {
  onContactClick: () => void;
}

const Header = ({ onContactClick }: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
      <div
        className={`mx-auto flex items-center justify-between transition-all duration-500 ease-out pointer-events-auto ${
          isScrolled
            ? "mt-3 w-[calc(100%-1.5rem)] max-w-[560px] rounded-full border border-white/10 bg-[#0D0E11]/80 text-white shadow-lg shadow-black/30 backdrop-blur-xl px-3 py-1.5 md:px-4"
            : "mt-0 w-full max-w-7xl bg-transparent px-6 py-4 md:px-8 md:py-5"
        }`}
      >
        <a href="/" className="flex items-center hover:opacity-80 transition-opacity" aria-label="Alpa Digital, inicio">
          <img
            src={isScrolled ? alpaLogoWhite : alpaLogo}
            alt="Alpa Digital - Automatización e IA para pymes"
            className={`transition-all duration-500 ${isScrolled ? "h-4 md:h-5 ml-2" : "h-6 md:h-8"}`}
          />
        </a>
        <nav className={`hidden md:flex items-center gap-5 text-sm ${isScrolled ? "text-white/70" : "text-muted-foreground"}`} aria-label="Principal">
          <a href="/servicios" className="hover:text-primary transition-colors">Servicios</a>
          <a href="/#automatizaciones" className="hover:text-primary transition-colors">Automatizaciones</a>
          <a href="/zonas" className="hover:text-primary transition-colors">Zonas</a>
        </nav>
        <button
          onClick={onContactClick}
          className={`bg-primary hover:bg-primary/90 text-white rounded-full font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/25 active:scale-95 ${
            isScrolled ? "px-3.5 py-1.5 text-xs md:text-sm" : "px-4 py-2 md:px-6 md:py-2.5 text-sm md:text-base"
          }`}
        >
          Hablemos
        </button>
      </div>
    </header>
  );
};

export default Header;
