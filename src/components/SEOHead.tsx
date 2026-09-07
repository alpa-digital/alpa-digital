import { useEffect } from 'react';

const SEOHead = () => {
  useEffect(() => {
    const faqStructuredData = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "¿La automatización con IA es para una pyme?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Sí. Trabajamos con pymes de entre 5 y 100 personas sin departamento técnico. Empezamos por un solo proceso y crecemos según los resultados."
          }
        },
        {
          "@type": "Question",
          "name": "¿Qué tareas se pueden automatizar con IA en una pyme?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Atención al cliente, presupuestos, lectura y registro de facturas, seguimiento comercial, selección de personal, contenido de marketing e informes de dirección."
          }
        },
        {
          "@type": "Question",
          "name": "¿Hay que cambiar los programas actuales para automatizar con IA?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No. Conectamos la automatización a las herramientas que ya usa la empresa: correo, WhatsApp, CRM, facturación o ERP."
          }
        },
        {
          "@type": "Question",
          "name": "¿Cuánto cuesta automatizar un proceso con IA?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Cada automatización se presupuesta con alcance, precio y plazo cerrados antes de empezar, normalmente entre dos y seis semanas de trabajo."
          }
        }
      ]
    };

    const servicesStructuredData = {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      "name": "Alpa Digital",
      "url": "https://alpa.digital",
      "email": "info@alpa.digital",
      "description": "Consultoría y automatización con inteligencia artificial para pequeñas y medianas empresas en España.",
      "areaServed": { "@type": "Country", "name": "ES" },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Servicios de automatización e IA para pymes",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Diagnóstico de automatización",
              "description": "Análisis de procesos y plan priorizado de automatizaciones con IA para una pyme."
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Automatización con IA",
              "description": "Diseño e implementación de automatizaciones con inteligencia artificial integradas en las herramientas de la empresa."
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Consultoría y acompañamiento en IA",
              "description": "Acompañamiento mensual, formación del equipo y mantenimiento de automatizaciones."
            }
          }
        ]
      }
    };

    const contactStructuredData = {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      "mainEntity": {
        "@type": "Organization",
        "name": "Alpa Digital",
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

    const addStructuredData = (data: object, id: string) => {
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

    const ids = ['faq-structured-data', 'services-structured-data', 'contact-structured-data'];
    addStructuredData(faqStructuredData, ids[0]);
    addStructuredData(servicesStructuredData, ids[1]);
    addStructuredData(contactStructuredData, ids[2]);

    return () => {
      ids.forEach(id => {
        const script = document.getElementById(id);
        if (script) script.remove();
      });
    };
  }, []);

  return null;
};

export default SEOHead;
