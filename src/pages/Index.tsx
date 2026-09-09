import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import AutomationFlows from "@/components/AutomationFlows";
import AutomationScan from "@/components/AutomationScan";
import Sectors from "@/components/Sectors";
import Workflow from "@/components/Workflow";
import Testimonials from "@/components/Testimonials";
import ClientLogos from "@/components/ClientLogos";
import CTA from "@/components/CTA";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ContactForm from "@/components/ContactForm";
import { useContactForm } from "@/hooks/useContactForm";

const Index = () => {
  const { isContactFormOpen, openContactForm, closeContactForm } = useContactForm();

  return (
    <>
      <SEOHead />
      <div className="min-h-screen bg-background">
        <Header onContactClick={openContactForm} />
        <main>
          <Hero onContactClick={openContactForm} />
          <section aria-label="Sistemas de herramientas y automatizaciones con IA">
            <AutomationFlows />
          </section>
          <section aria-label="Analiza qué automatizar en tu empresa">
            <AutomationScan />
          </section>
          <section aria-label="Líneas de servicio">
            <Services onContactClick={openContactForm} />
          </section>
          <section aria-label="Sectores">
            <Sectors />
          </section>
          <section aria-label="Proceso de trabajo">
            <Workflow />
          </section>
          <section aria-label="Testimonios de clientes">
            <Testimonials />
          </section>
          <section aria-label="Empresas con las que hemos trabajado">
            <ClientLogos />
          </section>
          <section aria-label="Llamada a la acción">
            <CTA onContactClick={openContactForm} />
          </section>
          <section aria-label="Preguntas frecuentes">
            <FAQ />
          </section>
        </main>
        <Footer />
        <ContactForm isOpen={isContactFormOpen} onClose={closeContactForm} />
      </div>
    </>
  );
};

export default Index;
