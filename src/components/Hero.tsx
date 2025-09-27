import { useEffect, useState } from "react";
import newPhoneMockup from "@/assets/new-phone-mockup.png";

interface HeroProps {
  onContactClick: () => void;
}

const Hero = ({ onContactClick }: HeroProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="bg-background relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0s', animationDuration: '3s' }}></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-primary/60 rounded-full animate-pulse" style={{ animationDelay: '1s', animationDuration: '4s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-primary/40 rounded-full animate-pulse" style={{ animationDelay: '2s', animationDuration: '5s' }}></div>
      </div>

      {/* Hero section con tipografía gigante */}
      <section className="flex items-center pt-32 pb-20 relative z-10">
        <div className="max-w-7xl mx-auto px-8 w-full">
          <div className={`max-w-6xl transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-foreground leading-[1.1] mb-12 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Convertimos tu idea en app en 4 semanas
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground font-medium max-w-4xl animate-fade-in" style={{ animationDelay: '0.4s', lineHeight: '1.8' }}>
              Explora algunas de nuestras experiencias digitales más valoradas creadas desde 2015. Desde productos de startup hasta plataformas corporativas, todas las experiencias que desarrollamos son el resultado de una fusión única: las ideas e inspiración de nuestros clientes con la experiencia y creatividad de nuestro equipo.
            </p>
          </div>
        </div>
      </section>

      {/* Imagen del teléfono que ocupa todo el ancho con leyenda superpuesta */}
      <section className="relative w-full bg-[#F6F6F6]">
        <div className={`w-full flex justify-center py-16 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '0.8s' }}>
          <img 
            src={newPhoneMockup}
            alt="Desarrollo de aplicación móvil MVP - Ejemplo de app Womanhood creada por Alpa Digital en 4 semanas"
            className="w-full max-w-lg object-contain"
            loading="eager"
            width="512"
            height="600"
          />
        </div>
        {/* Leyenda posicionada sobre la imagen */}
        <div className={`absolute bottom-6 left-8 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-5'}`} style={{ transitionDelay: '1s' }}>
          <p className="text-sm text-foreground font-medium bg-background/80 backdrop-blur-sm px-3 py-1 rounded-full">
            Featured project: Womanhood App
          </p>
        </div>
      </section>

    </div>
  );
};

export default Hero;
