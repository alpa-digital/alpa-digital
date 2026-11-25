import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import PageShell, { Breadcrumbs, CtaBand } from "@/components/pages/PageShell";

export const AboutPage = () => <PageShell>{(openContact) => <>
  <section className="px-4 md:px-8 pb-16 md:pb-20"><div className="max-w-5xl mx-auto">
    <Breadcrumbs items={[{ name: "Inicio", path: "/" }, { name: "Nosotros", path: "/nosotros/" }]} />
    <div className="max-w-3xl mt-8 md:mt-12"><p className="text-sm font-medium text-primary mb-4">Alpa Digital</p><h1 className="text-4xl md:text-6xl font-bold leading-[1.05] mb-6" style={{ textWrap: "balance" }}>IA privada para las personas que hacen el trabajo</h1><p className="text-lg md:text-xl text-muted-foreground leading-relaxed">Somos el equipo de Alpa Digital. Montamos en cada pyme su propia plataforma de IA, con las apps, los agentes y las automatizaciones que usa su equipo, sobre sus datos y bajo su control.</p></div>
    <div className="grid md:grid-cols-2 gap-10 mt-16 border-t border-border pt-10"><div><h2 className="text-2xl font-medium mb-4">Del piloto a la plataforma</h2><p className="text-muted-foreground leading-relaxed">Combinamos consultoría, ingeniería de datos y desarrollo. Empezamos con un piloto sobre un proceso real y crecemos app a app sobre la misma instancia, con el alcance acordado por escrito.</p></div><div><h2 className="text-2xl font-medium mb-4">En Utrera y en toda España</h2><p className="text-muted-foreground leading-relaxed">Nuestra sede está en Utrera, Sevilla. Trabajamos presencialmente en las provincias cercanas y en remoto con empresas de toda España.</p></div></div>
    <Link to="/casos/" className="inline-flex items-center gap-2 text-primary font-medium mt-10 hover:underline">Ver proyectos del equipo <ArrowRight className="w-4 h-4" /></Link>
  </div></section><CtaBand title="Cuéntanos qué necesitas" text="Estudiaremos contigo qué puede aportar una IA privada a tu empresa y por qué proceso empezar." onContactClick={openContact} />
</>}</PageShell>;
