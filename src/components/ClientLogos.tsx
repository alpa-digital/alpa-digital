import { clients } from "@/data/clients";
import ClientLogo from "@/components/ClientLogo";
import { useCopy } from "@/i18n";

const ClientLogos = () => {
  const c = useCopy();
  return <section className="py-16 md:py-24 px-4 md:px-8 bg-background border-t border-border">
    <div className="max-w-7xl mx-auto">
      <div className="mb-10 md:mb-12 max-w-3xl"><h2 className="text-4xl md:text-5xl font-light text-foreground mb-4" style={{ textWrap: "balance" }}>{c.clients.title}</h2><p className="text-muted-foreground leading-relaxed">{c.clients.subtitle}</p></div>
      <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4" aria-label={c.clients.title}>{clients.map((client) => <li key={client.slug} className="flex items-center justify-center h-20 md:h-24 lg:h-28 px-4 rounded-2xl bg-secondary/30"><ClientLogo client={client} /></li>)}</ul>
      <p className="mt-7 text-xs md:text-sm text-muted-foreground">{c.clients.footnote}</p>
    </div>
  </section>;
};
export default ClientLogos;
