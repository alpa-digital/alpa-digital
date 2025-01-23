import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import HomeBanner from "../../assets/images/bg-header2.png";
import Button from "../../components/Button/Button";
import { FiArrowUpRight, FiCheck, FiZap } from "react-icons/fi";

const Home = () => {
  const benefits = [
    {
      title: "Automatización IA",
      description: "Reduce 80% de tareas manuales"
    },
    {
      title: "Marketing Predictivo",
      description: "Aumenta ventas con IA"
    },
    {
      title: "Desarrollo Tech",
      description: "Apps y sistemas escalables"
    }
  ];

  const stats = [
    { number: "70%", text: "Reducción de costos" },
    { number: "300%", text: "Aumento en productividad" },
    { number: "24/7", text: "Operación automatizada" }
  ];

  return (
    <div id="home" data-scroll-section>
      <Navbar />
      <div className="bg-[#f1f1f1] rounded-bl-[2rem] lg:rounded-bl-[4rem] rounded-br-[2rem] lg:rounded-br-[4rem] relative">
        <div className="min-h-screen max-w-[1200px] mx-auto relative">
          <div className="py-12 px-6 lg:px-8">
            {/* Hero Section */}
            <div className="text-center mb-16">
              <div className="mb-8">
                <span className="inline-flex items-center px-4 py-2 bg-[#D0F1D6] bg-opacity-80 text-[#78C585] rounded-full text-sm font-medium">
                  <FiZap className="mr-2" />
                  2025: La Era de la IA
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
                Transforma tu Negocio<br />con el Poder de la IA
              </h1>

              <p className="text-gray-700 text-lg md:text-xl mb-8 max-w-3xl mx-auto">
                Automatización inteligente, marketing predictivo y desarrollo tecnológico
                para hacer crecer tu negocio en la nueva economía digital
              </p>

              <div className="flex justify-center gap-4 mb-16">
                <Button className="bg-[#FFBD59] text-white font-medium px-8 py-4 text-lg">
                  <a href="https://cal.com/alpa-digital-studio" target="_blank" rel="noopener noreferrer" className="flex items-center">
                    Consultoría Gratuita
                    <FiArrowUpRight className="ml-2" />
                  </a>
                </Button>
              </div>
            </div>

            {/* Benefits Grid */}
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="bg-white/90 rounded-xl p-6 shadow-lg hover:scale-105 transition-transform"
                >
                  <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              ))}
            </div>

            {/* Stats Section */}
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="text-center hover:transform hover:scale-105 transition-transform"
                >
                  <div className="text-4xl font-bold text-[#FFBD59] mb-2">{stat.number}</div>
                  <div className="text-gray-700">{stat.text}</div>
                </div>
              ))}
            </div>

            {/* Final CTA */}
            <div className="text-center mt-16">
              <h2 className="text-2xl font-bold mb-4">
                ¿Listo para transformar tu negocio?
              </h2>
              <Button className="bg-[#FFBD59] text-white font-medium px-8 py-4 hover:scale-105 transition-transform">
                <a href="https://cal.com/alpa-digital-studio" target="_blank" rel="noopener noreferrer" className="flex items-center">
                  Comienza Ahora
                  <FiArrowUpRight className="ml-2" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;