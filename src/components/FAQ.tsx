import { useState, useEffect, useRef } from "react";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [visibleItems, setVisibleItems] = useState<boolean[]>([]);
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const headerRef = useRef<HTMLDivElement>(null);

  const faqs = [
    {
      question: "¿Esto es para una empresa de mi tamaño?",
      answer: "Sí. Trabajamos con pymes de entre 5 y 100 personas: despachos, clínicas, distribuidores, talleres, inmobiliarias, comercios y empresas de servicios. No hace falta departamento de informática ni grandes inversiones. Empezamos por un solo proceso y crecemos según los resultados."
    },
    {
      question: "¿Qué tareas se pueden automatizar con IA?",
      answer: "Las que se repiten, siguen reglas parecidas y consumen tiempo: responder consultas frecuentes, preparar presupuestos, leer y registrar facturas, hacer seguimiento a clientes, cribar candidaturas, redactar contenido o preparar informes. En el diagnóstico te decimos cuáles tienen sentido en tu caso y cuáles no."
    },
    {
      question: "¿Tengo que cambiar mis programas actuales?",
      answer: "No. Conectamos la automatización a las herramientas que ya usas: correo, WhatsApp, Google Workspace o Microsoft 365, tu CRM, tu programa de facturación o tu ERP. Solo recomendamos cambiar de herramienta cuando la actual es el problema, y eso te lo diremos con claridad."
    },
    {
      question: "¿Qué pasa con mis datos y los de mis clientes?",
      answer: "Tus datos siguen en tus sistemas. Elegimos proveedores de IA con garantías de privacidad, no usamos tu información para entrenar modelos y dejamos por escrito qué datos se procesan y dónde. Si tu sector tiene requisitos especiales, adaptamos la solución a ellos."
    },
    {
      question: "¿Y si la IA se equivoca?",
      answer: "Se equivoca, como cualquier persona nueva en un puesto. Por eso diseñamos cada automatización con puntos de revisión: la IA prepara, una persona aprueba lo importante. Con el tiempo, cuando la fiabilidad está demostrada, se puede dar más autonomía."
    },
    {
      question: "¿Cuánto cuesta y cuánto se tarda?",
      answer: "El diagnóstico tiene un precio cerrado y dura una o dos semanas. Cada automatización se presupuesta con alcance, precio y plazo fijos antes de empezar, normalmente entre dos y seis semanas. El acompañamiento mensual es una cuota sin permanencia. Nunca cobramos por horas abiertas."
    },
    {
      question: "¿Qué pasa cuando la automatización está en marcha?",
      answer: "Formamos a tu equipo, dejamos documentado cómo funciona y te acompañamos el primer mes. Después puedes gestionarla tú, contar con nosotros mes a mes o llamarnos cuando algo cambie en tu negocio."
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
            Lo que nos preguntan las pymes antes de empezar
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