import { useEffect } from "react";
import { useCopy } from "@/i18n";

/** La identidad y los metadatos de la ruta se gestionan en useRouteSeo. */
const SEOHead = () => {
  const c = useCopy();
  useEffect(() => {
    const id = "faq-structured-data";
    const script = document.createElement("script");
    script.id = id;
    script.type = "application/ld+json";
    script.textContent = JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: c.faq.items.map((item) => ({ "@type": "Question", name: item.q, acceptedAnswer: { "@type": "Answer", text: item.a } })) });
    document.getElementById(id)?.remove();
    document.head.appendChild(script);
    return () => script.remove();
  }, [c.faq.items]);
  return null;
};
export default SEOHead;
