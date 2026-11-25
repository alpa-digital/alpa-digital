import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import HomeTools from "@/components/HomeTools";
import CaseStudies from "@/components/CaseStudies";
import Testimonials from "@/components/Testimonials";
import ClientStrip from "@/components/ClientStrip";
import CTA from "@/components/CTA";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { useContactForm } from "@/hooks/useContactForm";
import { useRef } from "react";
import { useHomeMotion } from "@/hooks/useHomeMotion";

const Index = () => {
  const { openContactForm } = useContactForm();
  const mainRef = useRef<HTMLElement>(null);
  useHomeMotion(mainRef);

  return (
    <>
      <SEOHead />
      <div className="min-h-screen bg-background">
        <Header />
        <main ref={mainRef} className="home-motion">
          <Hero />
          <ClientStrip />
          <Services onContactClick={openContactForm} />
          <CaseStudies />
          <Testimonials />
          <FAQ onContactClick={openContactForm} />
          <HomeTools onContactClick={() => openContactForm("diagnostico")} />
          <CTA />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
