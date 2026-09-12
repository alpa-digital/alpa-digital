import { useEffect, useState } from "react";
import { Clock, ShieldCheck, ClipboardCheck } from "lucide-react";
import { useCopy } from "@/i18n";

interface HeroProps {
  onContactClick: () => void;
}


const Hero = ({ onContactClick }: HeroProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const c = useCopy();

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

      <section className="flex items-center pt-28 md:pt-32 pb-16 md:pb-20 relative z-10">
        <div className="max-w-7xl mx-auto px-8 w-full">
          <div className={`max-w-6xl transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <p className="text-sm md:text-base font-medium text-primary mb-6 animate-fade-in tracking-wide uppercase">
              {c.hero.eyebrow}
            </p>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-foreground leading-[1.05] mb-10 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              {c.hero.title}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground font-medium max-w-3xl animate-fade-in" style={{ animationDelay: '0.4s', lineHeight: '1.8' }}>
              {c.hero.body}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-10 animate-fade-in" style={{ animationDelay: '0.6s' }}>
              <button
                onClick={onContactClick}
                className="bg-primary text-white px-8 py-4 rounded-full text-base md:text-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary/30 active:scale-95"
              >
                {c.hero.ctaPrimary}
              </button>
              <a
                href="#automatizaciones"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full text-base md:text-lg font-medium border border-border text-foreground hover:border-primary/40 hover:bg-primary/5 transition-all duration-300"
              >
                {c.hero.ctaSecondary}
              </a>
            </div>

            <ul className="flex flex-wrap gap-x-8 gap-y-3 mt-10 text-sm text-muted-foreground animate-fade-in" style={{ animationDelay: '0.8s' }}>
              <li className="flex items-center gap-2"><Clock className="w-4 h-4 text-primary" /> {c.hero.point1}</li>
              <li className="flex items-center gap-2"><ClipboardCheck className="w-4 h-4 text-primary" /> {c.hero.point2}</li>
              <li className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-primary" /> {c.hero.point3}</li>
            </ul>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Hero;
