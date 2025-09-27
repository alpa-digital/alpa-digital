import { useState } from "react";

const CTA = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="py-16 md:py-24 px-4 md:px-8 bg-gradient-to-br from-primary/5 via-background to-primary/10 relative overflow-hidden">
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-40 h-40 bg-primary/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }}></div>
        <div className="absolute bottom-0 right-0 w-60 h-60 bg-primary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s', animationDuration: '6s' }}></div>
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="animate-fade-in">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 md:mb-8">
            ¿Listo para lanzar tu próximo proyecto?
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 md:mb-12 leading-relaxed">
            Cuéntanos tu idea y te ayudamos a convertirla en una aplicación exitosa. 
            Sin complicaciones, con resultados reales.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <button 
            className={`bg-primary text-white px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary/30 active:scale-95 relative overflow-hidden group ${
              isHovered ? 'shadow-2xl shadow-primary/30' : ''
            }`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <span className="relative z-10">Empezar ahora</span>
            <div className={`absolute inset-0 bg-gradient-to-r from-primary to-primary/80 transition-transform duration-300 ${
              isHovered ? 'scale-110' : 'scale-100'
            }`}></div>
          </button>
        </div>
      </div>
    </section>
  );
};

export default CTA;