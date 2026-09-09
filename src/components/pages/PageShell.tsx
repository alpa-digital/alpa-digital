import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import { useContactForm } from "@/hooks/useContactForm";

export interface Crumb {
  name: string;
  path: string;
}

export const Breadcrumbs = ({ items }: { items: Crumb[] }) => (
  <nav aria-label="Ruta de navegación" className="text-sm text-muted-foreground">
    <ol className="flex flex-wrap items-center gap-1">
      {items.map((item, i) => (
        <li key={item.path} className="flex items-center gap-1">
          {i > 0 && <ChevronRight className="w-3.5 h-3.5 opacity-60" />}
          {i < items.length - 1 ? (
            <Link to={item.path} className="hover:text-foreground transition-colors">{item.name}</Link>
          ) : (
            <span className="text-foreground" aria-current="page">{item.name}</span>
          )}
        </li>
      ))}
    </ol>
  </nav>
);

/** Estructura común de las páginas interiores: cabecera, contenido, pie y formulario de contacto. */
const PageShell = ({ children }: { children: (openContact: () => void) => ReactNode }) => {
  const { isContactFormOpen, openContactForm, closeContactForm } = useContactForm();
  return (
    <div className="min-h-screen bg-background">
      <Header onContactClick={openContactForm} />
      <main className="pt-24 md:pt-28">{children(openContactForm)}</main>
      <Footer />
      <ContactForm isOpen={isContactFormOpen} onClose={closeContactForm} />
    </div>
  );
};

export default PageShell;

export const CtaBand = ({ title, text, onContactClick, buttonLabel = "Reservar una llamada gratuita" }: { title: string; text: string; onContactClick: () => void; buttonLabel?: string }) => (
  <section className="py-16 px-4 md:px-8 bg-gradient-to-br from-primary/5 via-background to-primary/10">
    <div className="max-w-4xl mx-auto text-center">
      <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-4" style={{ textWrap: "balance" }}>{title}</h2>
      <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">{text}</p>
      <button onClick={onContactClick} className="bg-primary text-white px-8 py-4 rounded-full text-base md:text-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary/30 active:scale-95">
        {buttonLabel}
      </button>
    </div>
  </section>
);

export const FaqList = ({ faqs }: { faqs: { question: string; answer: string }[] }) => (
  <dl className="divide-y divide-border rounded-2xl border border-border overflow-hidden">
    {faqs.map((faq) => (
      <div key={faq.question} className="px-6 py-5">
        <dt className="font-medium text-foreground mb-2">{faq.question}</dt>
        <dd className="text-muted-foreground leading-relaxed">{faq.answer}</dd>
      </div>
    ))}
  </dl>
);
