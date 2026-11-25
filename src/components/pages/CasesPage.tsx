import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link, useLocation, useParams, useSearchParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, ArrowUpRight, Grid2X2, List, Maximize2, X } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";
import ProjectCover from "@/components/ProjectCover";
import RelatedResources from "@/components/RelatedResources";
import { getWorkProjects, workCopy, workPath, type WorkProject } from "@/data/work";
import { contactPath } from "@/hooks/useContactForm";
import { useLang } from "@/i18n";
import NotFound from "@/pages/NotFound";

const WorkShell = ({ children }: { children: ReactNode }) => <div className="work-page min-h-screen bg-background"><Header /><main>{children}<CTA /></main><Footer /></div>;

export const CasesIndexPage = () => {
  const { lang } = useLang();
  const c = workCopy[lang];
  const projects = getWorkProjects(lang);
  const [params, setParams] = useSearchParams();
  // Static HTML contains all projects. Apply URL filters after hydration.
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => { setHydrated(true); }, []);
  const filter = params.get("tipo");
  const kind = hydrated && (filter === "producto" || filter === "automatizacion") ? filter : "todos";
  const view = hydrated && params.get("vista") === "lista" ? "lista" : "cuadricula";
  const visible = projects.filter(project => kind === "todos" || project.kind === kind);
  const returnTo = `/casos/${params.size ? `?${params.toString()}` : ""}`;
  const setOption = (key: string, value: string | null) => {
    setParams(previous => {
      const next = new URLSearchParams(previous);
      if (value) next.set(key, value); else next.delete(key);
      return next;
    });
  };
  return <WorkShell>
    <section className="work-index-hero work-container" aria-labelledby="work-index-title"><p>{c.label}</p><h1 id="work-index-title"><span>{c.title[0]}</span>{" "}<span>{c.title[1]}</span></h1><p>{c.intro}</p></section>
    <section className="work-index-results work-container" aria-label={lang === "en" ? "Selected projects" : "Selección de proyectos"}>
      <div className="work-toolbar"><div className="work-filters" role="group" aria-label={c.filters}>{[{ value: "todos", label: c.all }, { value: "producto", label: c.products }, { value: "automatizacion", label: c.automation }].map(option => <button type="button" key={option.value} aria-pressed={kind === option.value} onClick={() => setOption("tipo", option.value === "todos" ? null : option.value)}>{option.label}</button>)}</div><div className="work-view-switch" role="group" aria-label={c.views}><button type="button" aria-label={c.grid} aria-pressed={view === "cuadricula"} onClick={() => setOption("vista", null)}><Grid2X2 size={19} aria-hidden="true" /></button><button type="button" aria-label={c.list} aria-pressed={view === "lista"} onClick={() => setOption("vista", "lista")}><List size={20} aria-hidden="true" /></button></div></div>
      <p className="work-result-count" role="status" aria-live="polite">{visible.length} {c.results}{view === "lista" && <span className="work-list-disclosure"> · {c.samples}</span>}</p>
      <div className={`work-projects work-projects-${view}`}>{visible.map(project => <article key={project.slug} className="work-project"><Link to={workPath(project)} state={{ portfolioReturnTo: returnTo }} className="work-project-link" aria-label={`${c.project} ${project.name}`}><ProjectCover project={project} /><div className="work-project-caption"><div><h2>{project.name}</h2><p>{project.headline}</p></div><span>{project.kind === "automatizacion" ? c.automation : project.category}</span></div></Link></article>)}</div>
    </section>
  </WorkShell>;
};

const ProjectMedia = ({ project }: { project: WorkProject }) => {
  const { lang } = useLang();
  const c = workCopy[lang];
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const dialog = dialogRef.current;
    const trigger = triggerRef.current;
    const previousOverflow = document.body.style.overflow;
    dialog?.showModal();
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previousOverflow; dialog?.close(); trigger?.focus({ preventScroll: true }); };
  }, [open]);
  if (!project.media) return null;
  const asset = project.media;
  const picture = <img src={asset.src} alt={asset.alt} width={asset.width} height={asset.height} />;
  return <figure className={`project-detail-media ${asset.logo ? "project-detail-logo" : ""}`}>
    {asset.logo ? <div className="project-logo-display">{picture}</div> : <button ref={triggerRef} type="button" className="project-image-trigger" onClick={() => setOpen(true)} aria-label={`${c.enlarge}: ${project.name}`} aria-haspopup="dialog">{picture}<span><Maximize2 size={16} aria-hidden="true" />{c.enlarge}</span></button>}
    <figcaption>{asset.caption}</figcaption>
    {open && <dialog ref={dialogRef} onCancel={() => setOpen(false)} onClose={() => setOpen(false)} aria-label={`${project.name}: ${c.enlarge}`} className="project-image-dialog"><div><button autoFocus type="button" onClick={() => setOpen(false)} aria-label={c.close}><X size={23} aria-hidden="true" /></button></div><img src={asset.src} alt={asset.alt} width={asset.width} height={asset.height} /></dialog>}
  </figure>;
};

export const CaseDetailPage = () => {
  const { caseSlug = "" } = useParams();
  const { lang } = useLang();
  const { state, pathname } = useLocation();
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => { setHydrated(true); }, []);
  const c = workCopy[lang];
  const projects = getWorkProjects(lang);
  const project = projects.find(item => item.slug === caseSlug);
  if (!project) return <NotFound />;
  const returnTo = hydrated && typeof state?.portfolioReturnTo === "string" && /^\/casos\/(\?[^#]*)?$/.test(state.portfolioReturnTo) ? state.portfolioReturnTo : "/casos/";
  const projectState = { portfolioReturnTo: returnTo };
  const position = projects.findIndex(item => item.slug === project.slug);
  const previous = projects[(position + projects.length - 1) % projects.length];
  const next = projects[(position + 1) % projects.length];
  const related = [
    ...projects.filter(item => item.kind === project.kind && item.slug !== project.slug),
    ...projects.filter(item => item.kind !== project.kind),
  ].slice(0, 2);
  return <WorkShell>
    <section className={`project-detail-hero work-theme-${project.slug}`} aria-labelledby="project-detail-title"><div className="work-container">
      <Link to={returnTo} className="project-back"><ArrowLeft size={17} aria-hidden="true" />{c.back}</Link>
      <h1 id="project-detail-title">{project.name}</h1><p className="project-detail-headline">{project.headline}</p>
      <dl className="project-metadata"><div><dt>{c.category}</dt><dd>{project.kind === "producto" ? c.products : project.category}{project.kind === "automatizacion" && <span>{c.anonymous}</span>}</dd></div><div><dt>{c.scope}</dt><dd>{project.scope}</dd></div><div><dt>{c.deliverable}</dt><dd>{project.deliverable}</dd></div></dl>
      <ProjectMedia key={project.slug} project={project} />
      <div className="project-overview"><h2>{c.overview}</h2><div><p>{project.summary}</p>{project.website && <a href={project.website} target="_blank" rel="noopener noreferrer">{c.visit}<ArrowUpRight size={18} aria-hidden="true" /></a>}{project.kind === "automatizacion" && <span className="project-anonymous-note">{c.noMedia}</span>}</div></div>
    </div></section>
    <div className="project-story work-container"><nav className="project-contents" aria-label={c.contents}><span>{c.contents}</span>{project.sections.map(section => <Link key={section.id} to={`#${section.id}`}>{section.title}<ArrowRight size={15} aria-hidden="true" /></Link>)}</nav><div className="project-story-sections">{project.sections.map(section => <section id={section.id} key={section.id} aria-labelledby={`project-heading-${section.id}`}><h2 id={`project-heading-${section.id}`}>{section.title}</h2><p>{section.text}</p>{section.id === "aportacion" && <Link to={contactPath(project.kind === "producto" ? "producto" : "diagnostico")} state={{ from: pathname }} className="project-discuss">{c.discuss}<ArrowUpRight size={18} aria-hidden="true" /></Link>}</section>)}<section aria-labelledby="project-points-title"><h2 id="project-points-title">{c.points}</h2><ul>{project.points.map(point => <li key={point}>{point}</li>)}</ul><div className="project-service-links"><Link to={`/servicios/${project.service}/`}>{c.service}<ArrowUpRight size={17} aria-hidden="true" /></Link>{project.sector && <Link to={`/sectores/${project.sector}/`}>{c.sector}<ArrowUpRight size={17} aria-hidden="true" /></Link>}</div></section></div></div>
    {project.kind === "automatizacion" && <RelatedResources caseSlug={project.slug} />}
    <section className="project-related work-container" aria-labelledby="project-related-title"><div className="project-related-header"><h2 id="project-related-title">{c.related}</h2><Link to={returnTo}>{c.back}<ArrowRight size={18} aria-hidden="true" /></Link></div><div className="project-related-grid">{related.map(item => <article key={item.slug}><Link to={workPath(item)} state={projectState} aria-label={`${c.project} ${item.name}`}><ProjectCover project={item} /><h3>{item.name}</h3><p>{item.headline}</p></Link></article>)}</div></section>
    <nav className="project-pagination work-container" aria-label={lang === "en" ? "Between projects" : "Navegación entre proyectos"}><Link to={workPath(previous)} state={projectState}><span><ArrowLeft size={18} aria-hidden="true" />{c.previous}</span><strong>{previous.name}</strong></Link><Link to={workPath(next)} state={projectState}><span>{c.next}<ArrowRight size={18} aria-hidden="true" /></span><strong>{next.name}</strong></Link></nav>
  </WorkShell>;
};
