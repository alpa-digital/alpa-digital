import ClientLogo from "@/components/ClientLogo";
import { clients } from "@/data/clients";
import { useLang } from "@/i18n";

const featuredClients = ["caf", "ac-marca", "lopez-alcon", "telefonica", "trackeo"];

const ClientStrip = () => {
  const { lang } = useLang();
  return <section aria-labelledby="home-clients-title" className="px-4 md:px-8 py-8 md:py-10"><div className="max-w-7xl mx-auto border-y border-border py-7 md:py-8 grid lg:grid-cols-[1fr_3fr] items-center gap-7 lg:gap-12"><h2 id="home-clients-title" className="text-sm text-[#59616c] font-medium max-w-[14rem]">{lang === "en" ? "Companies we have worked with" : "Empresas con las que hemos trabajado"}</h2><ul className="flex flex-wrap justify-center lg:justify-between gap-x-6 gap-y-5" aria-label={lang === "en" ? "Selected clients" : "Selección de clientes"}>{featuredClients.map((slug) => { const client = clients.find((item) => item.slug === slug); return client ? <li key={slug} className="h-10 w-24 sm:w-28 flex items-center justify-center"><ClientLogo client={client} imgClass="max-w-[90%] max-h-[85%]" maskClass="w-[90%] h-[85%]" /></li> : null; })}</ul></div></section>;
};
export default ClientStrip;
