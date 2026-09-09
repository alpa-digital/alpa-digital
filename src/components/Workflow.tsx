import { useEffect, useRef, useState } from "react";

const Workflow = () => {
  const [visibleSteps, setVisibleSteps] = useState<boolean[]>([]);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  const steps = [
    {
      number: "01",
      title: "Entendemos cómo trabajas hoy",
      description: "Nos sentamos con las personas que hacen el trabajo, no solo con dirección. Vemos qué tareas se repiten, cuánto tiempo cuestan, qué herramientas usáis y dónde se atasca la información. Sin cambiar nada todavía."
    },
    {
      number: "02",
      title: "Elegimos por dónde empezar",
      description: "No todo merece la pena automatizarse. Priorizamos por tiempo ahorrado, coste y riesgo, y te entregamos un plan claro con una primera automatización acotada, con alcance y plazo cerrados."
    },
    {
      number: "03",
      title: "Construimos la automatización",
      description: "La montamos conectada a las herramientas que ya tienes (correo, WhatsApp, CRM, facturación, hojas de cálculo o tu ERP). Trabajamos con plataformas de automatización y modelos de IA de confianza, y la probamos con casos reales tuyos antes de activarla."
    },
    {
      number: "04",
      title: "Formamos a tu equipo",
      description: "Una automatización que nadie entiende termina apagada. Explicamos a tu equipo qué hace, qué revisar y qué hacer cuando la IA no está segura, para que la use con confianza desde el primer día."
    },
    {
      number: "05",
      title: "Medimos y seguimos mejorando",
      description: "Revisamos juntos el tiempo ahorrado y los errores evitados. Con esos datos decidimos la siguiente automatización o ajustamos la que ya funciona. Si quieres, seguimos acompañándote cada mes."
    }
  ];

  useEffect(() => {
    const observers = stepRefs.current.map((ref, index) => {
      if (!ref) return null;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisibleSteps(prev => {
                const newVisible = [...prev];
                newVisible[index] = true;
                return newVisible;
              });
            }
          });
        },
        {
          threshold: 0.3,
          rootMargin: "0px 0px -100px 0px"
        }
      );

      observer.observe(ref);
      return observer;
    });

    return () => {
      observers.forEach(observer => {
        if (observer) observer.disconnect();
      });
    };
  }, []);

  return (
    <section className="py-24 px-8 bg-muted/30 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-light text-foreground mb-6 animate-fade-in">
            Nuestro proceso
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.3s' }}>
            Un camino corto y predecible, pensado para empresas que no tienen
            un departamento técnico ni tiempo que perder.
          </p>
        </div>

        <div className="grid lg:grid-cols-1 gap-12 max-w-4xl mx-auto">
          {steps.map((step, index) => {
            const isVisible = visibleSteps[index];
            const progressPercentage = ((index + 1) / steps.length) * 100;
            
            return (
              <div 
                key={index} 
                ref={el => stepRefs.current[index] = el}
                className={`relative flex items-start gap-6 transition-all duration-1000 ease-out transform ${
                  isVisible 
                    ? 'opacity-100 translate-y-0 translate-x-0' 
                    : 'opacity-0 translate-y-10 translate-x-8'
                }`}
                style={{ 
                  transitionDelay: `${index * 0.2}s`
                }}
              >
                <div className="flex-shrink-0">
                  <div className="relative w-16 h-16 rounded-full bg-background flex items-center justify-center transition-all duration-500 hover:scale-110">
                    {/* Background circle */}
                    <div className="absolute inset-0 rounded-full border-2 border-border"></div>
                    
                    {/* Progress circle with animation */}
                    <svg className="absolute inset-0 w-16 h-16 transform -rotate-90" viewBox="0 0 64 64">
                      <circle
                        cx="32"
                        cy="32"
                        r="30"
                        fill="none"
                        stroke="hsl(var(--primary))"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeDasharray={`${2 * Math.PI * 30}`}
                        strokeDashoffset={`${2 * Math.PI * 30 * (isVisible ? (1 - progressPercentage / 100) : 1)}`}
                        className="transition-all duration-2000 ease-out"
                        style={{ 
                          transitionDelay: `${index * 0.3 + 0.5}s`,
                          opacity: 0.9
                        }}
                      />
                      
                      {/* Glow effect */}
                      {isVisible && (
                        <circle
                          cx="32"
                          cy="32"
                          r="30"
                          fill="none"
                          stroke="hsl(var(--primary))"
                          strokeWidth="1"
                          strokeLinecap="round"
                          strokeDasharray={`${2 * Math.PI * 30}`}
                          strokeDashoffset={`${2 * Math.PI * 30 * (1 - progressPercentage / 100)}`}
                          className="opacity-40 blur-sm transition-all duration-2000 ease-out"
                          style={{ 
                            transitionDelay: `${index * 0.3 + 0.5}s`
                          }}
                        />
                      )}
                    </svg>
                    
                    <span className={`relative z-10 text-xl font-light transition-all duration-700 ${
                      isVisible ? 'text-primary scale-100' : 'text-muted-foreground scale-90'
                    }`} style={{ transitionDelay: `${index * 0.2 + 0.8}s` }}>
                      {step.number}
                    </span>
                  </div>
                </div>
                
                <div className="flex-1">
                  <h3 className={`text-2xl font-medium mb-4 transition-all duration-700 ease-out ${
                    isVisible ? 'text-foreground translate-x-0' : 'text-muted-foreground translate-x-4'
                  }`} style={{ transitionDelay: `${index * 0.2 + 0.4}s` }}>
                    {step.title}
                  </h3>
                  
                  <p className={`leading-relaxed text-lg transition-all duration-700 ease-out ${
                    isVisible ? 'text-muted-foreground translate-x-0 opacity-100' : 'text-muted-foreground/60 translate-x-6 opacity-0'
                  }`} style={{ transitionDelay: `${index * 0.2 + 0.6}s` }}>
                    {step.description}
                  </p>
                </div>

                {/* Connecting line to next step */}
                {index < steps.length - 1 && (
                  <div className={`absolute left-8 top-20 w-0.5 h-12 bg-gradient-to-b transition-all duration-1000 ${
                    isVisible ? 'from-primary/40 to-border opacity-100' : 'from-transparent to-transparent opacity-0'
                  }`} style={{ transitionDelay: `${index * 0.2 + 1}s` }}></div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Workflow;