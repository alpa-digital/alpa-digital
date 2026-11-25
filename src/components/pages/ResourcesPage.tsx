import { Link, useParams } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import PageShell, { Breadcrumbs, CtaBand } from "@/components/pages/PageShell";
import { getResource, resourcePath, resources } from "@/data/resources";
import { getService } from "@/data/services";
import { getSector } from "@/data/sectors";
import { casePath, getCase } from "@/data/cases";
import NotFound from "@/pages/NotFound";

export const ResourcesIndexPage = () => (
  <PageShell>{(openContact) => <>
    <section className="px-4 md:px-8 pb-16 md:pb-20"><div className="max-w-5xl mx-auto">
      <Breadcrumbs items={[{ name: "Inicio", path: "/" }, { name: "Recursos", path: "/recursos/" }]} />
      <div className="max-w-3xl mt-8 md:mt-12"><p className="text-sm font-medium text-primary mb-4">Ideas para tu empresa</p><h1 className="text-4xl md:text-6xl font-bold leading-[1.05] mb-6" style={{ textWrap: "balance" }}>Guías para empezar con la automatización y la IA</h1><p className="text-lg md:text-xl text-muted-foreground leading-relaxed">Explicaciones y pasos prácticos para identificar oportunidades, entender las opciones y tomar decisiones con tu equipo.</p></div>
      <div className="mt-14 border-t border-border">{resources.map((item) => <Link key={item.slug} to={resourcePath(item)} className="group grid md:grid-cols-[1fr_2fr_auto] gap-3 md:gap-8 py-8 border-b border-border items-start">
        <span className="text-sm text-primary font-medium">{item.category}</span><div><h2 className="text-2xl font-medium group-hover:text-primary transition-colors">{item.title}</h2><p className="text-muted-foreground mt-3 leading-relaxed max-w-2xl">{item.summary}</p></div><span className="inline-flex items-center gap-2 text-sm font-medium text-primary">Leer guía <ArrowRight className="w-4 h-4" /></span>
      </Link>)}</div>
    </div></section>
    <CtaBand title="¿Quieres revisar un proceso de tu empresa?" text="Cuéntanos qué tarea te gustaría mejorar y veremos contigo por dónde empezar." onContactClick={openContact} />
  </>}</PageShell>
);

export const ResourceDetailPage = () => {
  const { resourceSlug = "" } = useParams();
  const item = getResource(resourceSlug);
  if (!item) return <NotFound />;
  const serviceLinks = item.relatedServices.map(getService).filter((value) => value !== undefined);
  const sectorLinks = (item.relatedSectors ?? []).map(getSector).filter((value) => value !== undefined);
  const caseLinks = (item.relatedCases ?? []).map(getCase).filter((value) => value !== undefined);
  return <PageShell>{(openContact) => <>
    <article className="px-4 md:px-8 pb-16 md:pb-20"><div className="max-w-5xl mx-auto">
      <Breadcrumbs items={[{ name: "Inicio", path: "/" }, { name: "Recursos", path: "/recursos/" }, { name: item.title, path: resourcePath(item) }]} />
      <header className="max-w-4xl mt-8 md:mt-12"><p className="text-sm font-medium text-primary mb-4">{item.category} · Equipo Alpa Digital</p><h1 className="text-4xl md:text-6xl font-bold leading-[1.05] mb-6" style={{ textWrap: "balance" }}>{item.title}</h1><p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl">{item.introduction}</p></header>
      <div className="mt-14 border-t border-border">{item.sections.map((section) => <section key={section.heading} className="grid md:grid-cols-[1fr_2fr] gap-4 md:gap-10 py-8 md:py-10 border-b border-border"><h2 className="text-2xl font-medium">{section.heading}</h2><div className="max-w-2xl text-muted-foreground leading-relaxed space-y-4">{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}{section.items && <ul className="list-disc pl-5 space-y-2">{section.items.map((point) => <li key={point}>{point}</li>)}</ul>}</div></section>)}</div>
      <aside className="mt-12"><h2 className="text-2xl font-light mb-5">Para seguir explorando</h2><div className="flex flex-col items-start gap-3">{serviceLinks.map((service) => <Link key={service.slug} to={`/servicios/${service.slug}/`} className="text-primary font-medium hover:underline inline-flex items-center gap-2">{service.short} <ArrowRight className="w-4 h-4" /></Link>)}{sectorLinks.map((sector) => <Link key={sector.slug} to={`/sectores/${sector.slug}/`} className="text-primary font-medium hover:underline inline-flex items-center gap-2">{sector.name} <ArrowRight className="w-4 h-4" /></Link>)}{caseLinks.map((project) => <Link key={project.slug} to={casePath(project)} className="text-primary font-medium hover:underline inline-flex items-center gap-2">{project.title} <ArrowRight className="w-4 h-4" /></Link>)}<Link to="/recursos/" className="text-sm text-muted-foreground hover:text-primary mt-2">Ver todas las guías</Link></div></aside>
    </div></article>
    <CtaBand title="¿Quieres aplicar estas ideas a tu empresa?" text="Cuéntanos cómo trabaja tu equipo y estudiaremos juntos el siguiente paso." onContactClick={openContact} />
  </>}</PageShell>;
};
