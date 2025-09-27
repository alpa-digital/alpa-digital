import Header from "@/components/Header";
import Hero from "@/components/Hero";
import PricingPlans from "@/components/PricingPlans";
import Testimonials from "@/components/Testimonials";
import Projects from "@/components/Projects";
import CTA from "@/components/CTA";
import Workflow from "@/components/Workflow";
import ClientLogos from "@/components/ClientLogos";
import SEOHead from "@/components/SEOHead";

import ContactForm from "@/components/ContactForm";
import { useContactForm } from "@/hooks/useContactForm";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

const Index = () => {
  const { isContactFormOpen, openContactForm, closeContactForm } = useContactForm();

  return (
    <>
      <SEOHead />
      <div className="min-h-screen bg-background">
        <Header onContactClick={openContactForm} />
        <main>
          <Hero onContactClick={openContactForm} />
          <section aria-label="Planes de precios">
            <PricingPlans onContactClick={openContactForm} />
          </section>
          <section aria-label="Testimonios de clientes">
            <Testimonials />
          </section>
          <section aria-label="Proyectos realizados">
            <Projects />
          </section>
          <section aria-label="Llamada a la acción">
            <CTA />
          </section>
          <section aria-label="Proceso de trabajo">
            <Workflow />
          </section>
          <section aria-label="Clientes y estadísticas">
            <ClientLogos />
          </section>
          <section aria-label="CTA antes de FAQ" className="py-16 px-8 bg-background">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-light text-foreground mb-4">
                ¿Tienes una idea en mente?
              </h2>
              <p className="text-lg text-muted-foreground mb-8" style={{ lineHeight: '1.8' }}>
                Cuéntanos tu proyecto y te ayudamos a convertirlo en realidad
              </p>
              <button 
                onClick={openContactForm}
                className="bg-primary text-white px-8 py-3 rounded-full text-base font-medium hover:bg-primary/90 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/25 active:scale-95"
              >
                Empezar proyecto
              </button>
            </div>
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
