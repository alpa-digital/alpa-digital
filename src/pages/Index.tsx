import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import UseCases from "@/components/UseCases";
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
          <section aria-label="Servicios de automatización e IA">
            <Services onContactClick={openContactForm} />
          </section>
          <section aria-label="Casos de uso de automatización en pymes">
            <UseCases />
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
