import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { clientBySlug } from "@/components/ClientLogo";
import { useCopy, useLang } from "@/i18n";
import AnimatedDetails from "@/components/AnimatedDetails";

const authors = [
  { client: clientBySlug("trackeo"), sourceIndex: 2 },
  { client: clientBySlug("caf"), sourceIndex: 0 },
  { client: clientBySlug("lopez-alcon"), sourceIndex: 1 },
];

const Testimonials = () => {
  const c = useCopy();
  const { lang } = useLang();
  const english = lang === "en";
  const [index, setIndex] = useState(0);
  const author = authors[index];
  const item = c.testimonials.items[author.sourceIndex];
  const controlClass = "w-11 h-11 rounded-full border border-border flex items-center justify-center hover:border-primary hover:text-primary transition-colors motion-reduce:transition-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-4";
  return (
    <section aria-labelledby="home-testimonials-title" className="px-4 md:px-8 py-16 md:py-24">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap justify-between items-center gap-5 mb-8 md:mb-12">
          <h2 id="home-testimonials-title" className="text-lg font-medium">{english ? "In our clients' words." : "En palabras de quienes trabajan con Alpa."}</h2>
          <div className="flex items-center gap-3">
            <button type="button" onClick={() => setIndex((index + authors.length - 1) % authors.length)} aria-label={english ? "Previous testimonial" : "Testimonio anterior"} className={controlClass}><ArrowLeft aria-hidden="true" className="w-4 h-4" /></button>
            <span className="text-sm text-[#59616c] tabular-nums">{index + 1} / {authors.length}</span>
            <button type="button" onClick={() => setIndex((index + 1) % authors.length)} aria-label={english ? "Next testimonial" : "Siguiente testimonio"} className={controlClass}><ArrowRight aria-hidden="true" className="w-4 h-4" /></button>
          </div>
        </div>
        <figure aria-live="polite" aria-atomic="true" className="max-w-6xl min-h-[11rem] md:min-h-[14rem]">
          <blockquote key={`${author.client.slug}-${lang}`} className="home-quote-change text-xl sm:text-2xl md:text-3xl lg:text-[2.1rem] leading-[1.5] sm:leading-[1.5] md:leading-[1.5] lg:leading-[1.45] tracking-[-0.015em]"><p>«{item.highlight}»</p></blockquote>
          <figcaption key={`caption-${author.client.slug}`} className="home-quote-change mt-7 text-base font-semibold">{author.client.name}</figcaption><AnimatedDetails key={author.client.slug} className="mt-4 text-sm max-w-3xl" summaryClassName="cursor-pointer text-primary w-fit focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-4" summary={english ? "Read the full testimonial" : "Leer el testimonio completo"}><p className="text-[#59616c] leading-relaxed mt-4">«{item.text} {item.highlight}{item.closing && <> {item.closing}</>}»</p></AnimatedDetails>
        </figure>
      </div>
    </section>
  );
};
export default Testimonials;
