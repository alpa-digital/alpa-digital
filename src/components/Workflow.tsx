import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useCopy, useLang } from "@/i18n";

const Workflow = () => {
  const c = useCopy();
  const { lang } = useLang();
  const english = lang === "en";
  const steps = english ? [
    { title: "Understand the need", text: "We talk with your team about the people, the process and the problem to solve." },
    { title: "Choose where to start", text: "Together we prioritise opportunities and agree on a clear scope for the first phase." },
    { title: "Build and test", text: "We design, develop and test the solution in stages with the people who will use it." },
    { title: "Use and improve", text: "We prepare the team to use the solution and decide the next steps based on what we learn." },
  ] : [
    { title: "Entendemos la necesidad", text: "Hablamos con tu equipo sobre las personas, el proceso y el problema que hay que resolver." },
    { title: "Elegimos por dónde empezar", text: "Priorizamos oportunidades y acordamos un alcance claro para la primera fase." },
    { title: "Construimos y probamos", text: "Diseñamos, desarrollamos y probamos la solución por fases con las personas que la utilizarán." },
    { title: "Ponemos en marcha y mejoramos", text: "Preparamos al equipo para utilizar la solución y decidimos los siguientes pasos con lo aprendido." },
  ];
  return <section className="py-20 md:py-24 px-4 md:px-8 bg-muted/30"><div className="max-w-7xl mx-auto grid lg:grid-cols-[.85fr_1.15fr] gap-10 lg:gap-20"><div><h2 className="text-4xl md:text-5xl font-light leading-tight">{c.workflow.title}</h2><p className="text-lg text-muted-foreground leading-relaxed mt-5 max-w-md">{english ? "A clear process for building automation and digital products alongside your team." : "Un proceso claro para construir automatizaciones y productos digitales junto a tu equipo."}</p><Link to="/como-trabajamos/" className="inline-flex items-center gap-2 text-primary font-medium hover:underline mt-7">{english ? "Explore our process" : "Conoce cómo trabajamos"} <ArrowRight className="w-4 h-4" /></Link></div><ol className="border-t border-border">{steps.map((step, index) => <li key={step.title} className="grid grid-cols-[2.5rem_1fr] sm:grid-cols-[3rem_1fr_1.5fr] gap-3 sm:gap-6 py-6 border-b border-border"><span className="text-sm text-primary font-medium">{String(index + 1).padStart(2, "0")}</span><h3 className="text-lg font-medium">{step.title}</h3><p className="col-start-2 sm:col-start-auto text-sm text-muted-foreground leading-relaxed">{step.text}</p></li>)}</ol></div></section>;
};
export default Workflow;
