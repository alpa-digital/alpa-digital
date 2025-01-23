import React from 'react';
import ACMarcaLogo from '../../assets/logos/ACMarcaLogo.png';
import CAFLogo from '../../assets/logos/CAFLogo.png';
import CepsaLogo from '../../assets/logos/CepsaLogo.png';
import CirsaLogo from '../../assets/logos/CirsaLogo.png';
import DeoleoLogo from '../../assets/logos/DeoleoLogo.png';
import GoodyearLogo from '../../assets/logos/GoodyearLogo.png';
import LogistaLogo from '../../assets/logos/LogistaLogo.png';
import MatsaLogo from '../../assets/logos/MatsaLogo.png';
import PeraladaLogo from '../../assets/logos/PeraladaLogo.png';
import TelefonicaLogo from '../../assets/logos/TelefonicaLogo.png';
import VectaliaLogo from '../../assets/logos/VectaliaLogo.png';

const AwardedWorks = () => {
  const testimonials = [
    {
      text: "La automatización con IA nos permitió triplicar nuestra productividad",
      company: "TechFin"
    },
    {
      text: "Mejoramos nuestro posicionamiento y visibilidad online significativamente",
      company: "E-commerce"
    }
  ];

  const logos = [
    { name: "CAF", image: CAFLogo },
    { name: "Grup Peralada", image: PeraladaLogo },
    { name: "Cepsa", image: CepsaLogo },
    { name: "Telefónica Tech", image: TelefonicaLogo },
    { name: "Logista", image: LogistaLogo },
    { name: "Vectalia", image: VectaliaLogo },
    { name: "Goodyear", image: GoodyearLogo },
    { name: "AC Marca", image: ACMarcaLogo },
    { name: "Cirsa", image: CirsaLogo },
    { name: "Deoleo", image: DeoleoLogo },
    { name: "Matsa", image: MatsaLogo }
  ];

  return (
    <div
      id="services"
      data-scroll-section
      className="relative"
    >
      <div className="absolute inset-0 bg-[#090909]">
        <div className="absolute top-0 w-full h-px bg-white/5" />
        <div className="absolute bottom-0 w-full h-px bg-white/5" />
      </div>

      <div className="relative py-20 lg:py-24 lg:w-[80%] max-w-[1200px] m-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block text-[#FFBD59] font-semibold mb-4">
            CASOS DE ÉXITO
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Transformación Digital en Acción
          </h2>
          <p className="text-[#929294]">
            Descubre cómo empresas de todos los tamaños están aprovechando el poder de la IA
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-[#1d1d1d] rounded-xl p-6 border border-white/5">
              <blockquote className="text-white/80 text-lg mb-4">
                "{testimonial.text}"
              </blockquote>
              <div className="text-[#FFBD59]">
                Cliente - {testimonial.company}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-[#1d1d1d]/50 rounded-2xl p-8 md:p-12 border border-white/5">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-12 gap-y-10 items-center">
            {logos.map((logo, index) => (
              <div
                key={index}
                className="flex items-center justify-center px-4"
              >
                <div className="relative group w-full">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FFBD59]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <img
                    src={logo.image}
                    alt={logo.name}
                    className="max-h-8 w-auto mx-auto opacity-60 group-hover:opacity-100 transition-all duration-300 filter brightness-200 group-hover:brightness-100"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <a
            href="https://cal.com/alpa-digital-studio"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#FFBD59] text-black font-semibold py-4 px-8 rounded-xl hover:bg-[#ffcb7d] transition-colors"
          >
            <span>Únete a estas Empresas</span>
            <svg 
              className="w-5 h-5" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default AwardedWorks;