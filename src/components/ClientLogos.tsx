import { useEffect, useRef, useState } from "react";
import { clients, type Client } from "@/data/clients";

// Logos: primero src/assets/logos/<slug>.*, si no, el archivo heredado src/assets/<Nombre>Logo.png.
// Se muestran tal cual, sin filtros ni tintes, para que se vea el color real.
const slugLogos = import.meta.glob<string>("../assets/logos/*.{svg,png,webp,jpg}", { eager: true, import: "default" });
const legacyLogos = import.meta.glob<string>("../assets/*Logo.{svg,png,webp,jpg}", { eager: true, import: "default" });

function findAsset(map: Record<string, string>, base: string): string | undefined {
  const key = Object.keys(map).find((k) => k.replace(/^.*\//, "").replace(/\.[a-z]+$/i, "").toLowerCase() === base.toLowerCase());
  return key ? map[key] : undefined;
}

const Logo = ({ client }: { client: Client }) => {
  const src = findAsset(slugLogos, client.slug) ?? (client.mono ? findAsset(legacyLogos, client.mono) : undefined);
  if (!src) return <span className="text-lg md:text-xl font-semibold tracking-tight text-foreground/75">{client.name}</span>;
  if (client.tint) {
    // Archivo blanco sobre transparente: se usa como máscara y se pinta con el color de marca.
    const mask = `url(${src}) center / contain no-repeat`;
    return <span role="img" aria-label={`Logo de ${client.name}`} className="block w-[78%] h-[62%]" style={{ WebkitMask: mask, mask, backgroundColor: client.tint }} />;
  }
  return (
    <img
      src={src}
      alt={`Logo de ${client.name}`}
      className="max-w-[78%] max-h-[62%] object-contain"
      style={client.scale ? { transform: `scale(${client.scale})` } : undefined}
      loading="lazy"
      width="160"
      height="60"
    />
  );
};

const ClientLogos = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    const observer = new IntersectionObserver((entries) => entries.forEach((e) => e.isIntersecting && setIsVisible(true)), { threshold: 0.15 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const stats = [
    { number: "20", symbol: "+", label: "Proyectos", sublabel: "Exitosos" },
    { number: "4", symbol: "+", label: "Años de", sublabel: "Experiencia" },
    { number: "10", symbol: "+", label: "Clientes", sublabel: "Satisfechos" },
  ];

  return (
    <section ref={sectionRef} className="py-16 md:py-24 px-4 md:px-8 bg-background border-t border-border overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className={`text-center mb-10 md:mb-14 transition-all duration-1000 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h3 className="text-4xl md:text-5xl font-light text-foreground mb-4" style={{ textWrap: "balance" }}>Empresas que han confiado en nosotros</h3>
          <p className="text-sm md:text-base text-muted-foreground/80">Grandes empresas y pymes con las que hemos trabajado en proyectos digitales</p>
        </div>

        <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4" aria-label="Clientes">
          {clients.map((client, index) => (
            <li
              key={client.slug}
              className={`flex items-center justify-center h-20 md:h-24 lg:h-28 px-4 rounded-2xl bg-card hover:bg-secondary/40 transition-all ${
                isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-6 scale-95"
              }`}
              style={{ transitionDelay: `${index * 0.06}s`, transitionDuration: "600ms" }}
            >
              <Logo client={client} />
            </li>
          ))}
        </ul>

        <p className={`text-center mt-8 md:mt-10 text-xs md:text-sm text-muted-foreground/70 transition-all duration-1000 ease-out ${isVisible ? "opacity-100" : "opacity-0"}`} style={{ transitionDelay: "0.9s" }}>
          Experiencia con grandes empresas, ahora al servicio de las pymes
        </p>

        <div className="mt-16 md:mt-20 bg-secondary/20 rounded-2xl p-8 md:p-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="grid grid-cols-3 gap-8 lg:gap-12">
              {stats.map((stat, index) => (
                <div key={stat.label} className={`text-center transition-all duration-1000 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ transitionDelay: `${1.1 + index * 0.2}s` }}>
                  <div className="mb-4">
                    <span className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">{stat.number}</span>
                    <span className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary">{stat.symbol}</span>
                  </div>
                  <p className="text-sm md:text-base text-muted-foreground font-medium">{stat.label}</p>
                  <p className="text-sm md:text-base text-muted-foreground font-medium">{stat.sublabel}</p>
                </div>
              ))}
            </div>
            <div className={`transition-all duration-1000 ease-out ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`} style={{ transitionDelay: "1.7s" }}>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                Hemos trabajado en proyectos digitales para grandes compañías. Esa misma forma de trabajar, con plazos y presupuestos cerrados, es la que llevamos ahora a la automatización con IA en pymes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientLogos;
