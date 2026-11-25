import { ArrowDown, BookOpen, KeyRound, Lock, MapPin, Repeat, Wallet } from "lucide-react";
import { useLang } from "@/i18n";

/** Por qué IA privada: esquema del recorrido de los datos y los seis argumentos, sin promesas que no podamos demostrar. */
const WhyPrivate = () => {
  const { lang } = useLang();
  const english = lang === "en";
  const points = english ? [
    { icon: Lock, title: "Your data is not training material", text: "Documents, emails and customer records live on your company's own instance. We do not hand them over to train third-party models." },
    { icon: Wallet, title: "Predictable cost", text: "No bills that grow with every query. The infrastructure is sized for your company and its real usage." },
    { icon: MapPin, title: "Infrastructure in the EU", text: "Dedicated servers in the European Union, encrypted backups and per-user access. Easier to fit with GDPR." },
    { icon: Repeat, title: "No lock-in to one provider", text: "Open models that can be swapped or upgraded without rebuilding your apps. And when it pays off, they can run on your own hardware." },
    { icon: KeyRound, title: "You decide who sees what", text: "Permissions per person and per app: each employee only accesses the data and apps that belong to their role." },
    { icon: BookOpen, title: "Answers from your own knowledge", text: "The AI answers from your manuals, regulations and documents, not from whatever it finds on the internet." },
  ] : [
    { icon: Lock, title: "Tus datos no son material de entrenamiento", text: "Documentos, correos y fichas de clientes viven en la instancia propia de tu empresa. No los cedemos para entrenar modelos de terceros." },
    { icon: Wallet, title: "Coste previsible", text: "Sin facturas que crecen con cada consulta. La infraestructura se dimensiona para tu empresa y su uso real." },
    { icon: MapPin, title: "Infraestructura en la UE", text: "Servidores dedicados en la Unión Europea, copias de seguridad cifradas y acceso por usuario. Más fácil de encajar con el RGPD." },
    { icon: Repeat, title: "Sin atarte a un proveedor", text: "Modelos abiertos que se pueden cambiar o actualizar sin rehacer tus apps. Y, cuando compensa, pueden funcionar en hardware propio." },
    { icon: KeyRound, title: "Tú decides quién ve qué", text: "Permisos por persona y por app: cada empleado accede solo a los datos y apps que corresponden a su puesto." },
    { icon: BookOpen, title: "Respuestas con tu conocimiento", text: "La IA responde a partir de tus manuales, tu normativa y tus documentos, no de lo que encuentra en internet." },
  ];
  const flow = english ? {
    sources: { label: "Your data", items: ["Email", "CRM", "Documents", "ERP"] },
    instance: { label: "Your Alpa instance · EU", items: ["Open model", "Business apps", "Automations"] },
    team: { label: "Your team", text: "Reviews and decides" },
  } : {
    sources: { label: "Tus datos", items: ["Correo", "CRM", "Documentos", "ERP"] },
    instance: { label: "Tu instancia de Alpa · UE", items: ["Modelo abierto", "Apps corporativas", "Automatizaciones"] },
    team: { label: "Tu equipo", text: "Revisa y decide" },
  };
  return <section aria-labelledby="home-private-title" className="px-6 md:px-8 py-16 md:py-24 border-t border-border">
    <div className="max-w-7xl mx-auto grid md:grid-cols-[.8fr_1.2fr] gap-10 md:gap-16">
      <div>
        <h2 id="home-private-title" className="text-[clamp(2.5rem,4.6vw,4.2rem)] font-bold leading-[1.04] tracking-[-0.03em]" style={{ textWrap: "balance" }}>{english ? "Why private AI." : "Por qué IA privada."}</h2>
        <p className="text-[#59616c] leading-relaxed mt-5 max-w-sm">{english ? "Public AI tools are useful, but your company's data ends up on someone else's servers and the bill grows with usage. Private AI changes both." : "Las herramientas de IA públicas son útiles, pero los datos de tu empresa acaban en servidores ajenos y la factura crece con el uso. La IA privada cambia las dos cosas."}</p>
        <figure className="private-flow" aria-label={english ? "How data flows in a private AI instance" : "Cómo circulan los datos en una instancia de IA privada"}>
          <div className="private-flow-box"><span>{flow.sources.label}</span><ul>{flow.sources.items.map(item => <li key={item}>{item}</li>)}</ul></div>
          <ArrowDown size={18} strokeWidth={1.6} aria-hidden="true" />
          <div className="private-flow-box private-flow-instance"><span>{flow.instance.label}</span><ul>{flow.instance.items.map(item => <li key={item}>{item}</li>)}</ul></div>
          <ArrowDown size={18} strokeWidth={1.6} aria-hidden="true" />
          <div className="private-flow-box"><span>{flow.team.label}</span><p>{flow.team.text}</p></div>
        </figure>
      </div>
      <ol className="grid sm:grid-cols-2 border-t border-border self-start">
        {points.map(point => <li key={point.title} className="border-b border-border py-7 sm:pr-8">
          <point.icon size={22} strokeWidth={1.6} className="text-[#6b6f78]" aria-hidden="true" />
          <h3 className="font-semibold text-lg mt-4">{point.title}</h3>
          <p className="text-[#59616c] leading-relaxed mt-2">{point.text}</p>
        </li>)}
      </ol>
    </div>
  </section>;
};
export default WhyPrivate;
