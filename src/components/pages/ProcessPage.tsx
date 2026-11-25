import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Plus, X } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";
import ProcessVisual from "@/components/ProcessVisual";
import ProjectCover from "@/components/ProjectCover";
import { getProcessStages, processCopy } from "@/data/process";
import { getWorkProjects, workPath } from "@/data/work";
import { useLang } from "@/i18n";

const ProcessPage = () => {
  const { lang } = useLang();
  const c = processCopy[lang];
  const stages = getProcessStages(lang);
  const [activePhase, setActivePhase] = useState<number | null>(null);
  const [visiblePhase, setVisiblePhase] = useState(0);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const dialogTitleRef = useRef<HTMLHeadingElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const isOpen = activePhase !== null;
  const phase = activePhase !== null ? stages[activePhase] : null;
  const projects = getWorkProjects(lang).filter(item => ["makernotch", "consulta-manuales-mantenimiento-ferroviario"].includes(item.slug));

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>(".method-stage"));
    const observer = new IntersectionObserver(entries => {
      const visible = entries.filter(entry => entry.isIntersecting).sort((a,b) => b.intersectionRatio-a.intersectionRatio)[0];
      if (visible) setVisiblePhase(Number((visible.target as HTMLElement).dataset.phase));
    }, { rootMargin: "-15% 0px -35% 0px", threshold: [0,.25,.5,.75] });
    sections.forEach(section => observer.observe(section));
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (!isOpen) return;
    const dialog = dialogRef.current;
    const trigger = triggerRef.current;
    const previousOverflow = document.body.style.overflow;
    dialog?.showModal();
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previousOverflow; dialog?.close(); if (trigger?.isConnected) trigger.focus({ preventScroll: true }); };
  }, [isOpen]);
  useEffect(() => {
    if (!isOpen) return;
    if (dialogRef.current) dialogRef.current.scrollTop = 0;
    dialogTitleRef.current?.focus({ preventScroll: true });
  }, [activePhase, isOpen]);

  return <div className="method-page min-h-screen bg-background"><Header /><main>
    <section className="method-hero" aria-labelledby="method-title"><div className="method-container"><p>{c.label}</p><h1 id="method-title"><span>{c.title[0]}</span>{" "}<span>{c.title[1]}</span></h1><p>{c.intro}</p><Link to={`#${stages[0].id}`} className="method-scroll"><ArrowDown size={20} aria-hidden="true" />{c.start}</Link></div></section>
    <nav className="method-navigation method-container" aria-label={c.navigation}>{stages.map((stage,index) => <Link to={`#${stage.id}`} key={stage.id} aria-current={visiblePhase === index ? "step" : undefined}><span>{String(index+1).padStart(2,"0")}</span>{stage.title}</Link>)}</nav>
    <div className="method-stages">{stages.map((stage,index) => <section className="method-stage" data-phase={index} id={stage.id} key={stage.id} aria-labelledby={`method-stage-title-${index}`}><div className="method-container method-stage-grid"><div className="method-stage-copy"><p className="method-stage-number">{String(index+1).padStart(2,"0")} <span aria-hidden="true">/</span> 04</p><h2 id={`method-stage-title-${index}`}>{stage.title}</h2><p>{stage.text}</p><button type="button" onClick={event => { triggerRef.current = event.currentTarget; setActivePhase(index); }} aria-haspopup="dialog" aria-label={`${c.explore}: ${stage.title}`} className="method-phase-button">{c.explore}<Plus size={19} aria-hidden="true" /></button></div><ProcessVisual stage={index} /></div></section>)}</div>
    <section className="method-mindset" aria-labelledby="method-mindset-title"><div className="method-container"><div className="method-section-heading"><h2 id="method-mindset-title">{c.mindset}</h2><p>{c.mindsetIntro}</p></div><div className="method-principles">{c.principles.map(item => <article key={item.title}><h3>{item.title}</h3><p>{item.text}</p></article>)}</div></div></section>
    <section className="method-work method-container" aria-labelledby="method-work-title"><div className="method-section-heading"><h2 id="method-work-title">{c.work}</h2><div><p>{c.workIntro}</p><Link to="/casos/">{c.allWork}<ArrowUpRight size={20} aria-hidden="true" /></Link></div></div><div className="method-work-grid">{projects.map(project => <article key={project.slug}><Link to={workPath(project)} aria-label={`${c.project} ${project.name}`}><ProjectCover project={project} /><h3>{project.name}</h3><p>{project.headline}</p></Link></article>)}</div></section>
    <CTA />
  </main><Footer />
  {isOpen && phase && <dialog ref={dialogRef} onCancel={() => setActivePhase(null)} onClose={() => setActivePhase(null)} aria-labelledby="method-dialog-title" className="method-dialog"><header className="method-dialog-header"><div><span>{c.phase} {String((activePhase ?? 0)+1).padStart(2,"0")}</span><h2 id="method-dialog-title" ref={dialogTitleRef} tabIndex={-1}>{phase.title}</h2></div><button type="button" onClick={() => setActivePhase(null)} aria-label={c.close}><X size={25} aria-hidden="true" /></button></header><div className="method-dialog-body method-container"><section className="method-dialog-intro"><h3>{c.do}</h3><p>{phase.text}</p></section><section className="method-dialog-deliverables"><h3>{c.deliver}</h3><ol>{phase.items.map((item,index) => <li key={item}><span aria-hidden="true">{String(index+1).padStart(2,"0")}</span><p>{item}</p></li>)}</ol></section><section className="method-dialog-participation"><h3>{c.participate}</h3><p>{phase.participation}</p><Link to="/contacto/" state={{ from: "/como-trabajamos/" }}>{c.contact}<ArrowUpRight size={18} aria-hidden="true" /></Link></section><nav className="method-dialog-pagination" aria-label={c.navigation}><button type="button" disabled={activePhase === 0} onClick={() => setActivePhase(value => value === null ? null : Math.max(0,value-1))}><ArrowLeft size={18} aria-hidden="true" />{c.previous}</button><span>{(activePhase ?? 0)+1} / 4</span><button type="button" disabled={activePhase === stages.length-1} onClick={() => setActivePhase(value => value === null ? null : Math.min(stages.length-1,value+1))}>{c.next}<ArrowRight size={18} aria-hidden="true" /></button></nav></div></dialog>}
  </div>;
};
export default ProcessPage;
