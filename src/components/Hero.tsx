import { useEffect, useState } from "react";
import { Mail, Sparkles, CheckCircle2, ArrowDown, Clock, ShieldCheck, Euro } from "lucide-react";

interface HeroProps {
  onContactClick: () => void;
}

const flowSteps = [
  {
    icon: Mail,
    label: "Entra una solicitud",
    detail: "Un cliente escribe por email, WhatsApp o el formulario de tu web.",
  },
  {
    icon: Sparkles,
    label: "La IA la entiende",
    detail: "Clasifica la petición, extrae los datos y redacta una respuesta.",
  },
  {
    icon: CheckCircle2,
    label: "Tu equipo solo revisa",
    detail: "El presupuesto, la cita o la tarea ya están creados en tus herramientas.",
  },
];

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

      <section className="flex items-center pt-28 md:pt-32 pb-20 relative z-10">
        <div className="max-w-7xl mx-auto px-8 w-full">
          <div className={`max-w-6xl transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <p className="text-sm md:text-base font-medium text-primary mb-6 animate-fade-in tracking-wide uppercase">
              Automatización e IA para pymes
            </p>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-foreground leading-[1.05] mb-10 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Tu pyme trabajando mientras tú te ocupas del negocio
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground font-medium max-w-3xl animate-fade-in" style={{ animationDelay: '0.4s', lineHeight: '1.8' }}>
              Automatizamos con inteligencia artificial las tareas que hoy te roban horas: atención al cliente, presupuestos, facturación, seguimiento comercial y administración. Sin proyectos eternos ni tecnología que nadie entiende. Empezamos por un proceso, medimos el resultado y seguimos.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-10 animate-fade-in" style={{ animationDelay: '0.6s' }}>
              <button
                onClick={onContactClick}
                className="bg-primary text-white px-8 py-4 rounded-full text-base md:text-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary/30 active:scale-95"
              >
                Reservar una llamada gratuita
              </button>
              <a
                href="#automatizaciones"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full text-base md:text-lg font-medium border border-border text-foreground hover:border-primary/40 hover:bg-primary/5 transition-all duration-300"
              >
                Ver qué automatizamos
              </a>
            </div>

            <ul className="flex flex-wrap gap-x-8 gap-y-3 mt-10 text-sm text-muted-foreground animate-fade-in" style={{ animationDelay: '0.8s' }}>
              <li className="flex items-center gap-2"><Clock className="w-4 h-4 text-primary" /> Primera automatización en semanas, no meses</li>
              <li className="flex items-center gap-2"><Euro className="w-4 h-4 text-primary" /> Presupuesto cerrado antes de empezar</li>
              <li className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-primary" /> Tus datos se quedan en tus herramientas</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Ejemplo visual de una automatización */}
      <section className="relative w-full bg-[#F6F6F6] dark:bg-muted">
        <div className={`max-w-7xl mx-auto px-8 py-16 md:py-20 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`} style={{ transitionDelay: '0.8s' }}>
          <p className="text-xs md:text-sm font-medium text-muted-foreground uppercase tracking-wide mb-8">
            Así funciona una automatización real que montamos en una pyme
          </p>
          <div className="grid md:grid-cols-3 gap-4 md:gap-6">
            {flowSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={step.label} className="relative">
                  <div className="h-full bg-background rounded-2xl border border-border/60 p-6 md:p-8 shadow-sm hover:shadow-lg hover:border-primary/30 transition-all duration-500">
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <span className="text-xs font-medium text-muted-foreground">Paso {index + 1}</span>
                    </div>
                    <h3 className="text-lg md:text-xl font-semibold text-foreground mb-2">{step.label}</h3>
                    <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{step.detail}</p>
                  </div>
                  {index < flowSteps.length - 1 && (
                    <div className="md:hidden flex justify-center py-2 text-primary/60">
                      <ArrowDown className="w-5 h-5" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <p className="text-sm text-muted-foreground mt-8">
            Resultado típico: horas de trabajo manual a la semana que desaparecen y respuestas al cliente en minutos en lugar de días.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Hero;
