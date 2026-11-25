import { useLocation, useSearchParams } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import { isContactTopic } from "@/hooks/useContactForm";
import { site } from "@/data/site";
import { useLang } from "@/i18n";

const Contacto = () => {
  const { lang } = useLang();
  const english = lang === "en";
  const [params] = useSearchParams();
  const { state } = useLocation();
  const requestedTopic = params.get("tema");
  const topic = isContactTopic(requestedTopic) ? requestedTopic : "general";
  const sourcePage = typeof state?.from === "string" && state.from.startsWith("/") ? state.from.slice(0, 300) : "/contacto/";
  return <div className="min-h-screen bg-background">
    <Header />
    <main>
      <section className="contact-page-hero" aria-labelledby="contact-page-title"><div>
        <p>{english ? "Contact" : "Contacto"}</p>
        <h1 id="contact-page-title">{english ? <>Tell us what<br />you want to solve.</> : <>Cuéntanos qué<br />quieres resolver.</>}</h1>
        <p>{english ? "A process that takes too much time. A product you want to build. Tell us where you are, and we will work out the next step together." : "Un proceso que te quita tiempo. Un producto que quieres construir. Cuéntanos en qué punto estás y vemos juntos el siguiente paso."}</p>
      </div></section>
      <section className="contact-page-content" aria-label={english ? "Enquiry form and contact details" : "Formulario y datos de contacto"}>
        <div className="contact-page-grid">
          <ContactForm topic={topic} sourcePage={sourcePage} />
          <aside className="contact-page-details">
            <div><h2>{english ? "Write to us" : "Escríbenos"}</h2><a className="contact-direct-email" href={`mailto:${site.email}`}>{site.email}<ArrowUpRight size={22} aria-hidden="true" /></a><p>{english ? "If you prefer email, you can also tell us about your project directly." : "Si prefieres el correo, también puedes contarnos tu proyecto directamente."}</p></div>
            <div><h2>{english ? "Where we work" : "Dónde trabajamos"}</h2><p className="contact-location">{site.address.locality}, {site.address.region}.</p><p>{english ? "We work with SMEs, startups and established companies across Spain." : "Trabajamos con pymes, startups y empresas de toda España."}</p></div>
            <div><h2>{english ? "What happens next?" : "¿Y después?"}</h2><p>{english ? "We review your enquiry and get in touch to understand the context, answer questions and discuss how we could help." : "Revisamos tu consulta y te contactamos para entender el contexto, resolver dudas y valorar cómo podemos ayudarte."}</p></div>
            <nav aria-label={english ? "Alpa on social media" : "Redes sociales de Alpa"}><a href={site.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn<ArrowUpRight size={17} aria-hidden="true" /></a><a href={site.instagram} target="_blank" rel="noopener noreferrer">Instagram<ArrowUpRight size={17} aria-hidden="true" /></a></nav>
          </aside>
        </div>
      </section>
    </main>
    <Footer />
  </div>;
};
export default Contacto;
