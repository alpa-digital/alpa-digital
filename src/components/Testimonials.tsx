import { useEffect, useRef, useState } from "react";

const Testimonials = () => {
  const [visibleCards, setVisibleCards] = useState<boolean[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const testimonials = [
    {
      icon: "W",
      iconBg: "bg-foreground",
      iconColor: "text-background",
      text: "Trabajar con Alpa ha sido una experiencia maravillosa. Desde el primer momento, supieron captar nuestra visión y la hicieron suya, trabajando con una dedicación y compromiso excepcionales. Son empáticos, siempre dispuestos a escuchar y, lo mejor de todo, son personas increíbles con las que trabajar.",
      boldText: "Cumplieron cada plazo y nos hicieron sentir que nuestro proyecto también era el suyo.",
      additionalText: "No consideraríamos hacer ningún desarrollo sin ellos. Sin duda, repetiríamos mil veces",
      name: "Lucía Yturriaga",
      company: "Womanhood"
    },
    {
      icon: "×",
      iconBg: "bg-green-500",
      iconColor: "text-white",
      text: "Encargamos un proyecto de UX complejo que requería un conjunto de habilidades difícil de encontrar. Es fácil encontrar diseñadores creativos, pero Adrián fue un paso más allá, realizando un trabajo de diseño UX realmente inteligente.",
      boldText: "Cumplió con los tiempos y costos establecidos",
      name: "Luca Bernardi",
      company: "Crossover"
    },
    {
      icon: "Z",
      iconBg: "bg-blue-500",
      iconColor: "text-white",
      text: "Trabajar con Alpa Studio ha sido una gran experiencia. Su equipo entrega resultados impecables: rápidos, confiables y con una actitud siempre profesional y cercana.",
      boldText: "Supieron entender nuestras necesidades desde el primer momento y ofrecieron soluciones eficientes y bien diseñadas en tiempo récord",
      name: "Sebastian",
      company: "Zandura"
    }
  ];

  useEffect(() => {
    const observers = cardRefs.current.map((ref, index) => {
      if (!ref) return null;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisibleCards(prev => {
                const newVisible = [...prev];
                newVisible[index] = true;
                return newVisible;
              });
            }
          });
        },
        {
          threshold: 0.3,
          rootMargin: "0px 0px -50px 0px"
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
    <section className="py-24 px-8 bg-background relative overflow-hidden">
      {/* Línea separadora superior */}
      <div className="absolute top-0 left-0 w-full h-px bg-border"></div>
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-light text-foreground mb-16 animate-fade-in">
          Nuestros clientes opinan
        </h2>

        <div className="grid md:grid-cols-3 gap-12">
          {testimonials.map((testimonial, index) => {
            const isVisible = visibleCards[index];
            
            return (
              <div 
                key={index} 
                ref={el => cardRefs.current[index] = el}
                className={`space-y-6 transition-all duration-1000 ease-out ${
                  isVisible 
                    ? 'opacity-100 translate-y-0 scale-100' 
                    : 'opacity-0 translate-y-8 scale-95'
                }`}
                style={{ transitionDelay: `${index * 0.2}s` }}
              >
                {/* Icono */}
                <div className={`w-12 h-12 ${testimonial.iconBg} rounded-lg flex items-center justify-center transition-all duration-500 ${
                  isVisible ? 'rotate-0 scale-100' : 'rotate-12 scale-90'
                }`} style={{ transitionDelay: `${index * 0.2 + 0.3}s` }}>
                  <span className={`text-xl font-bold ${testimonial.iconColor}`}>
                    {testimonial.icon}
                  </span>
                </div>

                {/* Testimonio */}
                <div className="space-y-4">
                  <p className={`text-foreground leading-relaxed transition-all duration-700 ease-out ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`} style={{ transitionDelay: `${index * 0.2 + 0.5}s` }}>
                    {testimonial.text}{" "}
                    <strong className="font-semibold">{testimonial.boldText}</strong>
                    {testimonial.additionalText && (
                      <>
                        {". "}
                        {testimonial.additionalText}
                      </>
                    )}
                  </p>

                  {/* Estrellas */}
                  <div className={`flex space-x-1 transition-all duration-500 ${
                    isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
                  }`} style={{ transitionDelay: `${index * 0.2 + 0.7}s` }}>
                    {[...Array(5)].map((_, i) => (
                      <span 
                        key={i} 
                        className={`text-red-500 text-lg transition-all duration-300 ${
                          isVisible ? 'animate-pulse' : ''
                        }`}
                        style={{ 
                          animationDelay: `${index * 0.2 + 0.9 + i * 0.1}s`,
                          animationDuration: '0.6s',
                          animationIterationCount: '1'
                        }}
                      >
                        ★
                      </span>
                    ))}
                  </div>

                  {/* Autor */}
                  <div className={`transition-all duration-700 ease-out ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`} style={{ transitionDelay: `${index * 0.2 + 0.9}s` }}>
                    <p className="font-medium text-foreground">{testimonial.name}</p>
                    <p className="text-muted-foreground text-sm">{testimonial.company}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Línea separadora inferior */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-border"></div>
    </section>
  );
};

export default Testimonials;