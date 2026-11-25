import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { resourcePath, resources } from "@/data/resources";

interface RelatedResourcesProps { service?: string; sector?: string; caseSlug?: string; variant?: "service" }

/** Guías ligadas a una página por su contenido, no por una lista fija de enlaces. */
const RelatedResources = ({ service, sector, caseSlug, variant }: RelatedResourcesProps) => {
  const matches = resources.filter((item) =>
    (service && item.relatedServices.includes(service)) ||
    (sector && item.relatedSectors?.includes(sector)) ||
    (caseSlug && item.relatedCases?.includes(caseSlug))
  ).slice(0, 3);
  if (!matches.length) return null;
  return <section className={variant === "service" ? "services-offer-section service-detail-resources" : "px-4 md:px-8 py-12 border-t border-border"}><div className={variant === "service" ? "services-page-container services-offer-layout" : "max-w-5xl mx-auto grid md:grid-cols-[1fr_2fr] gap-5 md:gap-10"}>
    <div className={variant === "service" ? "services-offer-heading" : undefined}><h2 className={variant === "service" ? undefined : "text-2xl font-light"}>Guías relacionadas</h2></div>
    <div className="divide-y divide-border border-t border-border">{matches.map((item) => <Link key={item.slug} to={resourcePath(item)} className="group flex items-start justify-between gap-4 py-4"><span><span className="font-medium group-hover:text-primary transition-colors">{item.title}</span><span className="block text-sm text-muted-foreground mt-1">{item.summary}</span></span><ArrowRight className="w-4 h-4 text-primary shrink-0 mt-1" /></Link>)}</div>
  </div></section>;
};
export default RelatedResources;
