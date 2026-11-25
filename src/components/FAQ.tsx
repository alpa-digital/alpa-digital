import { ArrowRight, Plus } from "lucide-react";
import { useCopy, useLang } from "@/i18n";
import AnimatedDetails from "@/components/AnimatedDetails";

const FAQ = ({ onContactClick }: { onContactClick: () => void }) => {
  const c = useCopy();
  const { lang } = useLang();
  return <section className="home-faq px-6 md:px-8 py-16 md:py-24 border-t border-border"><div className="max-w-7xl mx-auto grid md:grid-cols-[.8fr_1.2fr] gap-8 md:gap-16"><div><h2 className="text-[clamp(2.5rem,4.6vw,4.2rem)] font-bold leading-[1.04] tracking-[-0.03em]" style={{textWrap:"balance"}}>{c.faq.title}</h2><p className="text-[#59616c] leading-relaxed mt-5 max-w-sm">{c.faq.subtitle}</p><button type="button" onClick={onContactClick} className="inline-flex items-center gap-3 mt-6 text-primary font-medium hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-4">{lang === "en" ? "Talk to Alpa" : "Hablar con Alpa"}<ArrowRight aria-hidden="true" size={17} /></button></div><div className="border-t border-border">{c.faq.items.map((item, index) => <AnimatedDetails key={item.q} defaultOpen={index === 0} className="border-b border-border py-5 sm:py-6" summaryClassName="flex cursor-pointer list-none items-start justify-between gap-5 font-medium text-base sm:text-lg [&::-webkit-details-marker]:hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-4" summary={<><span>{item.q}</span><Plus aria-hidden="true" className="w-5 h-5 shrink-0 mt-0.5 text-primary" /></>}><p className="text-[#59616c] leading-relaxed mt-4 max-w-2xl pr-6">{item.a}</p></AnimatedDetails>)}</div></div></section>;
};
export default FAQ;
