import { useEffect, useRef, useState } from "react";
import ACMarcaLogo from "@/assets/ACMarcaLogo.png";
import CAFLogo from "@/assets/CAFLogo.png";
import CepsalLogo from "@/assets/CepsalLogo.png";
import CirsaLogo from "@/assets/CirsaLogo.png";
import DeoleoLogo from "@/assets/DeoleoLogo.png";
import GoodyearLogo from "@/assets/GoodyearLogo.png";
import LogistaLogo from "@/assets/LogistaLogo.png";
import MatsaLogo from "@/assets/MatsaLogo.png";
import PeraladalLogo from "@/assets/PeraladalLogo.png";
import TelefonicaLogo from "@/assets/TelefonicaLogo.png";
import VectaliaLogo from "@/assets/VectaliaLogo.png";

const ClientLogos = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const clients = [
    { name: "AC Marca", logo: ACMarcaLogo },
    { name: "CAF", logo: CAFLogo },
    { name: "Cepsal", logo: CepsalLogo },
    { name: "Cirsa", logo: CirsaLogo },
    { name: "Deoleo", logo: DeoleoLogo },
    { name: "Goodyear", logo: GoodyearLogo },
    { name: "Logista", logo: LogistaLogo },
    { name: "Matsa", logo: MatsaLogo },
    { name: "Peralada", logo: PeraladalLogo },
    { name: "Telefonica", logo: TelefonicaLogo },
    { name: "Vectalia", logo: VectaliaLogo }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -100px 0px"
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const stats = [
    {
      number: "20",
      symbol: "+",
      label: "Proyectos",
      sublabel: "Exitosos"
    },
    {
      number: "4",
      symbol: "+",
      label: "Años de",
      sublabel: "Experiencia"
    },
    {
      number: "10",
      symbol: "+",
      label: "Clientes",
      sublabel: "Satisfechos"
    }
  ];

  return (
    <section ref={sectionRef} className="py-16 md:py-24 px-4 md:px-8 bg-background border-t border-border overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className={`text-center mb-12 md:mb-16 transition-all duration-1000 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <h3 className="text-5xl font-light text-foreground mb-6">
            Clientes que han confiado en nosotros
          </h3>
          <p className="text-sm md:text-base text-muted-foreground/70">
            Empresas líderes que han elegido nuestras soluciones
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-12">
          {clients.map((client, index) => (
            <div
              key={index}
              className={`flex items-center justify-center h-16 md:h-20 lg:h-24 px-4 py-2 bg-black rounded-lg border border-border/50 hover:border-border transition-all duration-500 hover:bg-black/80 group ${
                isVisible 
                  ? 'opacity-100 translate-y-0 scale-100' 
                  : 'opacity-0 translate-y-6 scale-95'
              }`}
              style={{ 
                transitionDelay: `${index * 0.1}s`,
                transitionDuration: '700ms'
              }}
            >
              <div className="flex items-center justify-center h-full w-full">
                <img 
                  src={client.logo}
                  alt={`Logo de ${client.name} - Cliente de desarrollo de aplicaciones móviles y web de Alpa Digital`}
                  className="max-w-[80%] max-h-[80%] object-contain opacity-70 group-hover:opacity-100 transition-opacity duration-300 filter grayscale group-hover:grayscale-0"
                  loading="lazy"
                  width="120"
                  height="60"
                />
              </div>
            </div>
          ))}
        </div>
        
        <div className={`text-center mt-12 md:mt-16 transition-all duration-1000 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`} style={{ transitionDelay: '1.2s' }}>
          <p className="text-xs md:text-sm text-muted-foreground/60">
            + de 50 empresas confían en nosotros para su transformación digital
          </p>
        </div>

        {/* Stats Section */}
        <div className="mt-20 bg-secondary/20 rounded-2xl p-8 md:p-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-8 lg:gap-12">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className={`text-center transition-all duration-1000 ease-out ${
                    isVisible
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: `${1.5 + index * 0.2}s` }}
                >
                  <div className="mb-4">
                    <span className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
                      {stat.number}
                    </span>
                    <span className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary">
                      {stat.symbol}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm md:text-base text-muted-foreground font-medium">
                      {stat.label}
                    </p>
                    <p className="text-sm md:text-base text-muted-foreground font-medium">
                      {stat.sublabel}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Description Text */}
            <div
              className={`transition-all duration-1000 ease-out ${
                isVisible
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 translate-x-8'
              }`}
              style={{ transitionDelay: '2.1s' }}
            >
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                Conecta con nosotros y obtén una estrategia de transformación digital 
                personalizada. Hacemos que la innovación tecnológica sea accesible para 
                tu PYME.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientLogos;