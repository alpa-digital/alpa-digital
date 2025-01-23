import React from 'react';
import { FiZap, FiSearch, FiCheck } from "react-icons/fi";

const SelectedWorks = () => {
  const services = [
    {
      icon: <FiZap className="w-6 h-6" />,
      title: "Automatización Empresarial con IA",
      description: "Optimiza costos operativos hasta 70% con automatización inteligente de procesos",
      ariaLabel: "Servicio de automatización empresarial con inteligencia artificial"
    },
    {
      icon: <FiZap className="w-6 h-6" />,
      title: "Marketing Digital con IA",
      description: "Estrategias de contenido SEO optimizadas por IA para mayor conversión",
      ariaLabel: "Servicio de marketing digital con inteligencia artificial"
    },
    {
      icon: <FiSearch className="w-6 h-6" />,
      title: "Posicionamiento SEO",
      description: "Domina los resultados de búsqueda con estrategias SEO avanzadas",
      ariaLabel: "Servicio de posicionamiento SEO"
    }
  ];

  const features = [
    "Automatización inteligente de procesos empresariales",
    "Creación de contenido SEO con tecnología IA",
    "Desarrollo de software empresarial personalizado",
    "Estrategias de marketing basadas en datos",
    "Branding digital optimizado con IA",
    "Páginas de aterrizaje de alta conversión"
  ];

  return (
    <section
      id="servicios-ia"
      aria-label="Servicios de Inteligencia Artificial"
      data-scroll-section
      className="bg-[#090909] relative py-24"
    >
      <div className="max-w-[1200px] lg:w-[80%] mx-auto px-6">
        <header className="mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FFBD59] mb-6">
            <span className="text-black font-medium">Soluciones IA para Empresas</span>
          </div>
          
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Transformación Digital con Inteligencia Artificial
          </h1>
          
          <p className="text-[#929294] text-lg mb-8">
            Impulsa el crecimiento de tu negocio con soluciones tecnológicas avanzadas: automatización, marketing predictivo y desarrollo digital
          </p>

          <div className="text-[#FFBD59] font-semibold flex items-center gap-2 mb-12">
            <FiCheck className="w-5 h-5" />
            <span>ROI mensurable desde la implementación</span>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {services.map((service, index) => (
            <article
              key={index}
              className="bg-[#1d1d1d] border border-white/5 rounded-xl p-6 hover:bg-[#252525] transition-colors"
              aria-label={service.ariaLabel}
            >
              <div className="w-12 h-12 rounded-lg bg-[#FFBD59]/10 flex items-center justify-center text-[#FFBD59] mb-3">
                {service.icon}
              </div>
              <h2 className="text-white font-semibold text-xl mb-2">{service.title}</h2>
              <p className="text-[#929294]">{service.description}</p>
            </article>
          ))}
        </div>

        <div className="bg-[#1d1d1d] border border-[#FFBD59]/20 rounded-xl p-8 mb-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-xl text-white mb-4">
                <strong className="text-[#FFBD59] block text-2xl mb-2">2025:</strong> 
                Integra IA en tu negocio para mantener la ventaja competitiva
              </p>
              <a
                href="https://cal.com/alpa-digital-studio"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#FFBD59] text-black font-semibold py-4 px-8 rounded-xl hover:bg-[#ffcb7d] transition-colors"
              >
                Consultoría Estratégica Gratuita
                <span className="sr-only">Abre en nueva ventana</span>
              </a>
            </div>
            <div className="space-y-4">
              {features.slice(0, 3).map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#FFBD59]/10 flex-shrink-0 flex items-center justify-center mt-0.5">
                    <FiCheck className="w-3 h-3 text-[#FFBD59]" />
                  </div>
                  <span className="text-[#929294]">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SelectedWorks;