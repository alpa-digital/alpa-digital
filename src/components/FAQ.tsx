import { useState, useEffect, useRef } from "react";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [visibleItems, setVisibleItems] = useState<boolean[]>([]);
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const headerRef = useRef<HTMLDivElement>(null);

  const faqs = [
    {
      question: "¿Por qué elegirnos?",
      answer: "Combinamos experiencia técnica con un enfoque centrado en resultados. Nuestro equipo especializado en tecnologías Low-Code y No-Code te permite lanzar tu aplicación rápidamente sin comprometer la calidad. Además, ofrecemos acompañamiento completo desde la idea hasta el lanzamiento y más allá."
    },
    {
      question: "¿Por qué elegir Alpa para tu aplicación?",
      answer: "En Alpa nos enfocamos en entender realmente tu negocio y tus objetivos. No solo desarrollamos aplicaciones, creamos soluciones que impulsan tu crecimiento. Nuestro proceso transparente y comunicación constante garantizan que el resultado final supere tus expectativas."
    },
    {
      question: "¿Desarrollar en Low-Code significa que el resultado será de menor calidad?",
      answer: "Para nada. Las tecnologías Low-Code modernas son utilizadas por empresas Fortune 500 para crear aplicaciones robustas y escalables. La diferencia está en la velocidad de desarrollo, no en la calidad del resultado final. Obtienes la misma funcionalidad y rendimiento, pero en mucho menos tiempo."
    },
    {
      question: "¿La escalabilidad será un problema?",
      answer: "No, las aplicaciones que desarrollamos están diseñadas para crecer contigo. Las plataformas Low-Code que utilizamos pueden manejar desde miles hasta millones de usuarios. Además, siempre planificamos la arquitectura pensando en el crecimiento futuro de tu negocio."
    },
    {
      question: "¿La experiencia de usuario será buena?",
      answer: "Absolutamente. El diseño de experiencia de usuario es una de nuestras principales fortalezas. Creamos interfaces intuitivas y atractivas que tus usuarios amarán. Cada pantalla y interacción está cuidadosamente diseñada para ofrecer la mejor experiencia posible."
    },
    {
      question: "¿Cómo será la comunicación?",
      answer: "Mantenemos comunicación constante y transparente durante todo el proyecto. Recibirás actualizaciones regulares sobre el progreso, tendrás acceso a prototipos funcionales desde las primeras semanas, y siempre estaremos disponibles para resolver tus dudas o incorporar feedback."
    },
    {
      question: "Sin sorpresas, transparencia total",
      answer: "Trabajamos con presupuestos fijos y cronogramas claros desde el inicio. No hay costos ocultos ni sorpresas desagradables. Sabrás exactamente qué esperar, cuándo esperarlo, y cuánto costará. Nuestra reputación se basa en cumplir lo que prometemos."
    }
  ];

  useEffect(() => {
    // Observer para el header
    const headerObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsHeaderVisible(true);
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: "0px 0px -100px 0px"
      }
    );

    if (headerRef.current) {
      headerObserver.observe(headerRef.current);
    }

    // Observer para los items FAQ
    const itemObservers = itemRefs.current.map((ref, index) => {
      if (!ref) return null;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisibleItems(prev => {
                const newVisible = [...prev];
                newVisible[index] = true;
                return newVisible;
              });
            }
          });
        },
        {
          threshold: 0.2,
          rootMargin: "0px 0px -50px 0px"
        }
      );

      observer.observe(ref);
      return observer;
    });

    return () => {
      if (headerRef.current) {
        headerObserver.unobserve(headerRef.current);
      }
      itemObservers.forEach(observer => {
        if (observer) observer.disconnect();
      });
    };
  }, []);

  return (
    <section className="py-24 px-8 bg-muted/30 overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <div 
          ref={headerRef}
          className={`text-center mb-16 transition-all duration-1000 ease-out ${
            isHeaderVisible 
              ? 'opacity-100 translate-y-0 scale-100' 
              : 'opacity-0 translate-y-8 scale-95'
          }`}
        >
          <h2 className="text-5xl font-light text-foreground mb-6">
            Preguntas frecuentes
          </h2>
          <p className="text-xl text-muted-foreground">
            Resolvemos las dudas más comunes sobre nuestro proceso y servicios
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isVisible = visibleItems[index];
            
            return (
              <div
                key={index}
                ref={el => itemRefs.current[index] = el}
                className={`border border-border rounded-lg bg-background/50 backdrop-blur-sm transition-all duration-1000 ease-out hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 group ${
                  isVisible 
                    ? 'opacity-100 translate-y-0 translate-x-0 scale-100' 
                    : 'opacity-0 translate-y-6 -translate-x-4 scale-98'
                }`}
                style={{ 
                  transitionDelay: `${index * 0.15}s`,
                  transformStyle: 'preserve-3d'
                }}
              >
                <button
                  className="w-full px-6 py-6 text-left flex justify-between items-center hover:bg-muted/20 transition-all duration-300 rounded-lg group-hover:bg-primary/5"
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                >
                  <h3 className="text-lg font-medium text-foreground pr-8 group-hover:text-primary transition-colors duration-300">
                    {faq.question}
                  </h3>
                  <div className="flex-shrink-0">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                      openIndex === index 
                        ? 'bg-primary text-white rotate-180 scale-110' 
                        : 'bg-muted/50 text-muted-foreground group-hover:bg-primary/20 group-hover:text-primary'
                    }`}>
                      <svg
                        className="w-4 h-4 transition-transform duration-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </button>
                
                <div className={`overflow-hidden transition-all duration-500 ease-out ${
                  openIndex === index 
                    ? 'max-h-96 opacity-100' 
                    : 'max-h-0 opacity-0'
                }`}>
                  <div className={`px-6 pb-6 transition-all duration-700 ease-out ${
                    openIndex === index 
                      ? 'transform translate-y-0 opacity-100' 
                      : 'transform -translate-y-4 opacity-0'
                  }`}>
                    <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent mb-4 opacity-50"></div>
                    <p className="text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;