import { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight, Plus } from "lucide-react";
import AutomationScan from "@/components/AutomationScan";
import { useLang } from "@/i18n";

interface HomeToolsProps { onContactClick: () => void }

const HomeTools = ({ onContactClick }: HomeToolsProps) => {
  const { lang } = useLang();
  const english = lang === "en";
  const { hash } = useLocation();
  const detailsRef = useRef<HTMLDetailsElement>(null);
  useEffect(() => {
    if (hash !== "#analiza-tu-empresa" || !detailsRef.current) return;
    detailsRef.current.open = true;
    detailsRef.current.scrollIntoView({ block: "start" });
  }, [hash]);

  return (
    <section className="px-4 md:px-8 pb-12 md:pb-16">
      <div className="max-w-7xl mx-auto">
        <details ref={detailsRef} id="analiza-tu-empresa" className="group border-y border-border py-6 scroll-mt-24">
          <summary className="flex cursor-pointer list-none justify-between items-center gap-5 [&::-webkit-details-marker]:hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-4">
            <span><span className="block font-semibold text-lg">{english ? "What could you automate in your business?" : "¿Qué podrías automatizar en tu empresa?"}</span><span className="block text-sm text-muted-foreground mt-1">{english ? "Try the website analyser for an initial overview." : "Prueba el analizador de webs para tener una primera orientación."}</span></span>
            <Plus className="w-5 h-5 shrink-0 text-primary group-open:rotate-45 transition-transform motion-reduce:transition-none" />
          </summary>
          <div className="pt-6"><p className="text-sm text-muted-foreground leading-relaxed mb-5 max-w-2xl">{english ? "The result is an estimate based on public website information. We would need to review the process with your team before making a proposal." : "El resultado es una estimación a partir de la información pública de tu web. Para preparar una propuesta necesitamos revisar el proceso con tu equipo."}</p><AutomationScan onContactClick={onContactClick} compact /></div>
        </details>
        <div className="mt-5 flex flex-wrap gap-x-7 gap-y-3 text-sm"><Link to="/sectores/" className="inline-flex items-center gap-2 text-primary font-medium hover:underline">{english ? "Explore by industry" : "Ver ejemplos por sector"}<ArrowRight className="w-4 h-4" /></Link><Link to="/recursos/" className="inline-flex items-center gap-2 text-primary font-medium hover:underline">{english ? "Read our guides" : "Guías para empezar"}<ArrowRight className="w-4 h-4" /></Link></div>
      </div>
    </section>
  );
};
export default HomeTools;
