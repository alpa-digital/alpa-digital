import { useEffect } from 'react';

const SEOHead = () => {
  useEffect(() => {
    // Add structured data for FAQ
    const faqStructuredData = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "¿Por qué elegirnos para desarrollar tu aplicación?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Combinamos experiencia técnica con un enfoque centrado en resultados. Nuestro equipo especializado en tecnologías Low-Code y No-Code te permite lanzar tu aplicación rápidamente sin comprometer la calidad."
          }
        },
        {
          "@type": "Question", 
          "name": "¿Desarrollar en Low-Code significa menor calidad?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Para nada. Las tecnologías Low-Code modernas son utilizadas por empresas Fortune 500 para crear aplicaciones robustas y escalables. La diferencia está en la velocidad de desarrollo, no en la calidad del resultado final."
          }
        },
        {
          "@type": "Question",
          "name": "¿La escalabilidad será un problema?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No, las aplicaciones que desarrollamos están diseñadas para crecer contigo. Las plataformas Low-Code que utilizamos pueden manejar desde miles hasta millones de usuarios."
          }
        }
      ]
    };

    // Add pricing structured data
    const pricingStructuredData = {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Desarrollo de Aplicación MVP",
      "description": "Desarrollo de aplicación MVP para lanzar tu primera versión funcional",
      "offers": [
        {
          "@type": "Offer",
          "name": "Basic MVP",
          "description": "Para lanzar tu primera versión funcional, rápido y con lo esencial",
          "price": "700",
          "priceCurrency": "EUR",
          "availability": "https://schema.org/InStock",
          "seller": {
            "@type": "Organization",
            "name": "Alpa Digital Studio"
          }
        },
        {
          "@type": "Offer", 
          "name": "Avanzado",
          "description": "Desarrollo web o app nativa completamente a medida",
          "price": "3500",
          "priceCurrency": "EUR",
          "availability": "https://schema.org/InStock",
          "seller": {
            "@type": "Organization",
            "name": "Alpa Digital Studio"
          }
        }
      ]
    };

    // Add contact structured data
    const contactStructuredData = {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      "mainEntity": {
        "@type": "Organization",
        "name": "Alpa Digital Studio",
        "email": "info@alpa.digital",
        "url": "https://alpa.digital",
        "contactPoint": {
          "@type": "ContactPoint",
          "contactType": "customer service",
          "email": "info@alpa.digital",
          "availableLanguage": ["Spanish", "English"]
        }
      }
    };

    // Create and add structured data scripts
    const addStructuredData = (data: any, id: string) => {
      const existingScript = document.getElementById(id);
      if (existingScript) {
        existingScript.remove();
      }
      
      const script = document.createElement('script');
      script.id = id;
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(data);
      document.head.appendChild(script);
    };

    addStructuredData(faqStructuredData, 'faq-structured-data');
    addStructuredData(pricingStructuredData, 'pricing-structured-data');
    addStructuredData(contactStructuredData, 'contact-structured-data');

    // Cleanup function
    return () => {
      ['faq-structured-data', 'pricing-structured-data', 'contact-structured-data'].forEach(id => {
        const script = document.getElementById(id);
        if (script) script.remove();
      });
    };
  }, []);

  return null;
};

export default SEOHead;