import { useEffect, useState } from "react";
import alpaLogo from "@/assets/alpa-logo.png";

interface HeaderProps {
  onContactClick: () => void;
}

const Header = ({ onContactClick }: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-background/95 backdrop-blur-md shadow-lg shadow-black/5 border-b border-border/50' 
        : 'bg-background/95 backdrop-blur-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-8 py-6 flex items-center justify-between">
        <div className="flex items-center">
          <a href="/" className="hover:opacity-80 transition-all duration-300 hover:scale-105 cursor-pointer">
            <img src={alpaLogo} alt="Alpa Digital Studio - Desarrollo de aplicaciones móviles y web" className="h-6 md:h-8" />
          </a>
        </div>
        
        <div className="flex items-center">
          <button 
            onClick={onContactClick}
            className="bg-primary hover:bg-primary/90 text-white rounded-full px-3 py-1.5 md:px-6 md:py-2 text-sm md:text-base font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/25 active:scale-95"
          >
            Contacta ahora
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
