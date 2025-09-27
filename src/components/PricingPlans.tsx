import { useEffect, useRef, useState } from "react";

interface PricingPlansProps {
  onContactClick: () => void;
}

const PricingPlans = ({ onContactClick }: PricingPlansProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

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

  return (
    <section ref={sectionRef} className="py-24 bg-background overflow-hidden">
      {/* Texto scrolling sin bordes laterales y ocupando todo el ancho */}
      <div className="py-16 overflow-hidden border-t border-b border-border bg-background/50">
        <div className="flex animate-scroll">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="flex items-center whitespace-nowrap">
              <h2 className="section-large text-foreground mx-12 font-light">
                Dos formas de construir tu app. Un solo objetivo: lanzar y escalar
              </h2>
              <div className="w-2 h-2 bg-foreground rounded-full mx-12"></div>
            </div>
          ))}
        </div>
        
        <style>{`
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-scroll {
            animation: scroll 45s linear infinite;
            width: calc(200%);
          }
        `}</style>
      </div>
      
      {/* Más espacio antes de la tabla */}
      <div className="pt-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 lg:gap-0 relative">
            
            {/* Línea divisoria vertical */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border hidden lg:block"></div>
            
            {/* Basic Plan */}
            <div className={`space-y-8 md:space-y-12 lg:pr-16 transition-all duration-1000 ease-out ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            }`} style={{ transitionDelay: '0.2s' }}>
              <div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-foreground mb-4 md:mb-6">Lanza tu MVP</h2>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-6 md:mb-8">
                  Para lanzar tu primera versión funcional, rápido y con lo esencial.
                </p>
              </div>

              <div className="space-y-4 md:space-y-6">
                <div className="text-xl md:text-2xl font-medium text-foreground">
                  Desde 2.800 €
                </div>
                <button 
                  onClick={onContactClick}
                  className="bg-primary text-white px-6 md:px-8 py-3 rounded-full text-sm md:text-base font-medium hover:bg-primary/90 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/25 active:scale-95 w-full md:w-auto"
                >
                  Solicitar presupuesto
                </button>
              </div>

              <div className="space-y-4 md:space-y-6">
                {[
                  { label: "Tiempo de desarrollo", value: "4-6 semanas" },
                  { label: "Incluye", value: "Auth básico, dashboard principal y 2 funcionalidades core" },
                  { label: "Diseño", value: "Visual profesional con tu branding personalizado" },
                  { label: "Entrega", value: "Web App responsiva funcional desplegada" },
                  { label: "Soporte post-lanzamiento", value: "1 mes de soporte técnico incluido" }
                ].map((item, index) => (
                  <div 
                    key={index}
                    className={`flex items-start space-x-3 transition-all duration-700 ease-out ${
                      isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-5'
                    }`}
                    style={{ transitionDelay: `${0.4 + index * 0.1}s` }}
                  >
                    <svg className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">{item.label}</p>
                      <p className="text-sm md:text-base font-medium text-foreground">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Advanced Plan */}
            <div className={`space-y-8 md:space-y-12 lg:pl-16 border-t lg:border-t-0 lg:border-l border-border pt-8 lg:pt-0 transition-all duration-1000 ease-out ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            }`} style={{ transitionDelay: '0.4s' }}>
              <div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-foreground mb-4 md:mb-6">Lanza tu app</h2>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-6 md:mb-8">
                  Desarrollo web o app nativa completamente a medida, ideal para proyectos con visión a largo plazo.
                </p>
              </div>

              <div className="space-y-4 md:space-y-6">
                <div className="text-xl md:text-2xl font-medium text-foreground">
                  Desde 12.500 €
                </div>
                <button 
                  onClick={onContactClick}
                  className="bg-primary text-white px-6 md:px-8 py-3 rounded-full text-sm md:text-base font-medium hover:bg-primary/90 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/25 active:scale-95 w-full md:w-auto"
                >
                  Solicitar presupuesto
                </button>
              </div>

              <div className="space-y-4 md:space-y-6 pb-8">
                {[
                  { label: "Tiempo de desarrollo", value: "3-5 meses" },
                  { label: "Incluye", value: "Sistema completo de gestión de usuarios, funcionalidades avanzadas e integraciones (pagos, notificaciones)" },
                  { label: "Diseño", value: "UX/UI completamente a medida desde cero con prototipo interactivo" },
                  { label: "Entrega", value: "App multiplataforma (iOS + Android) o Webapp" },
                  { label: "Soporte post-lanzamiento", value: "3 meses de mantenimiento" }
                ].map((item, index) => (
                  <div 
                    key={index}
                    className={`flex items-start space-x-3 transition-all duration-700 ease-out ${
                      isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-5'
                    }`}
                    style={{ transitionDelay: `${0.6 + index * 0.1}s` }}
                  >
                    <svg className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">{item.label}</p>
                      <p className="text-sm md:text-base font-medium text-foreground">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

        </div>
        
        {/* Desarrollo bajo demanda - Nueva sección */}
        <div className="border-t border-border">
          <div className="pt-16 px-4 md:px-8 border-b border-border">
            <div className="max-w-7xl mx-auto">
              <div className={`space-y-8 md:space-y-12 transition-all duration-1000 ease-out pb-16 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`} style={{ transitionDelay: '0.8s' }}>
              
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
                  {/* Contenido principal - izquierda */}
                  <div className="space-y-8">
                    <div>
                      <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-foreground mb-4 md:mb-6">Desarrollo bajo demanda</h2>
                      <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-6 md:mb-8">
                        Desarrollo web, e-commerce, automatizaciones con IA y soluciones personalizadas. Todo enfocado en ecosistema startup.
                      </p>
                    </div>

                    <div className="space-y-4 md:space-y-6">
                      <div className="text-xl md:text-2xl font-medium text-foreground">
                        Presupuesto personalizado
                      </div>
                      <button 
                        onClick={onContactClick}
                        className="bg-primary text-white px-6 md:px-8 py-3 rounded-full text-sm md:text-base font-medium hover:bg-primary/90 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/25 active:scale-95 w-full md:w-auto"
                      >
                        Contactar para presupuesto
                      </button>
                    </div>
                  </div>

                  {/* Características - derecha */}
                  <div className="space-y-4 md:space-y-6">
                    {[
                      { label: "Tiempo de desarrollo", value: "Variable según proyecto" },
                      { label: "Incluye", value: "Desarrollo web, e-commerce, automatizaciones IA" },
                      { label: "Diseño", value: "Adaptado a necesidades del proyecto" },
                      { label: "Soporte", value: "Según acuerdo del proyecto" }
                    ].map((item, index) => (
                      <div 
                        key={index}
                        className={`flex items-start space-x-3 transition-all duration-700 ease-out ${
                          isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-5'
                        }`}
                        style={{ transitionDelay: `${1.0 + index * 0.1}s` }}
                      >
                        <svg className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">{item.label}</p>
                          <p className="text-sm md:text-base font-medium text-foreground">{item.value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingPlans;

