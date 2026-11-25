import { ArrowUpRight } from "lucide-react";
import type { WorkProject } from "@/data/work";
import { workCopy } from "@/data/work";
import { useLang } from "@/i18n";

/** Real screenshots and logos, or explicitly typographic covers when no media exists. */
const ProjectCover = ({ project }: { project: WorkProject }) => {
  const { lang } = useLang();
  const c = workCopy[lang];
  return <div className={`work-cover work-theme-${project.slug}`}>
    <span className="work-cover-label">{project.kind === "automatizacion" ? c.anonymous : project.category}</span>
    {project.media ? <img src={project.media.src} alt={project.media.alt} width={project.media.width} height={project.media.height} loading="lazy" className={project.media.logo ? "work-cover-logo" : "work-cover-screen"} /> : <div className="work-cover-typography" aria-hidden="true">{project.coverText || project.name}</div>}
    {project.media && !project.media.logo && <span className="work-cover-disclosure">{project.media.caption}</span>}
    <ArrowUpRight className="work-cover-arrow" size={28} aria-hidden="true" />
  </div>;
};
export default ProjectCover;
