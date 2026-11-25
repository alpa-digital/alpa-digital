import { useEffect, useRef, useState } from "react";
import { Play, X } from "lucide-react";
import { useLang } from "@/i18n";
import { track } from "@/lib/analytics";

const Hero = () => {
  const { lang } = useLang();
  const english = lang === "en";
  const [filmOpen, setFilmOpen] = useState(false);
  const [filmClosing, setFilmClosing] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const filmTriggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!filmOpen) return;
    const dialog = dialogRef.current;
    const trigger = filmTriggerRef.current;
    const previousOverflow = document.body.style.overflow;
    dialog?.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
      dialog?.close();
      trigger?.focus({ preventScroll: true });
    };
  }, [filmOpen]);
  useEffect(() => {
    if (!filmClosing) return;
    // Also close if a motion preference changes or an animation is cancelled mid-exit.
    const timer = window.setTimeout(() => setFilmOpen(false), 220);
    return () => window.clearTimeout(timer);
  }, [filmClosing]);

  const openFilm = () => {
    setFilmClosing(false);
    setFilmOpen(true);
    track("video_play", { place: "home_hero" });
  };
  const closeFilm = () => {
    dialogRef.current?.querySelector("video")?.pause();
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) setFilmOpen(false);
    else setFilmClosing(true);
  };

  return <>
    <section className="studio-hero" aria-labelledby="home-title">
      <div className="studio-hero-content">
        <h1 id="home-title">
          <span className="studio-hero-line"><span>{english ? "Private AI for your company." : "IA privada para tu empresa."}</span></span>{" "}
          <span className="studio-hero-line"><span>{english ? "Your data, under your control." : "Tus datos, bajo tu control."}</span></span>
        </h1>
        <div className="studio-hero-bottom">
          <p>{english
            ? <>Alpa sets up your company's <strong>own AI platform</strong>, running <strong>open models</strong> on <strong>dedicated infrastructure</strong>, with the apps your team uses every day on top: <strong>email</strong>, <strong>CRM</strong>, <strong>documents</strong> and <strong>automations</strong>. No paying an outside provider <strong>for every query</strong>.</>
            : <>Alpa monta en tu empresa una <strong>plataforma de IA propia</strong>, con <strong>modelos abiertos</strong> en <strong>infraestructura dedicada</strong>, y sobre ella las apps que tu equipo usa cada día: <strong>correo</strong>, <strong>CRM</strong>, <strong>documentos</strong> y <strong>automatizaciones</strong>. Sin pagar a un proveedor externo <strong>por cada consulta</strong>.</>}</p>
          <button ref={filmTriggerRef} type="button" className="studio-hero-video" onClick={openFilm} aria-haspopup="dialog">
            <span className="studio-hero-play"><Play size={23} fill="currentColor" aria-hidden="true" /></span>
            <span className="studio-hero-video-label">
              <span>{english ? "Meet Alpa" : "Conoce Alpa"}</span>
              <span>{english ? "Watch video · 56 sec" : "Ver vídeo · 56 s"}</span>
            </span>
          </button>
        </div>
      </div>
    </section>
    {filmOpen && <dialog
      ref={dialogRef}
      onCancel={event => { event.preventDefault(); closeFilm(); }}
      onClose={() => setFilmOpen(false)}
      data-closing={filmClosing}
      onAnimationEnd={event => { if (event.target === event.currentTarget && filmClosing) setFilmOpen(false); }}
      aria-label={english ? "Alpa presentation" : "Presentación de Alpa"}
      className="studio-film w-[calc(100%-2rem)] max-w-5xl rounded-xl bg-[#0D0E11] p-3 md:p-5 text-white backdrop:bg-black/80"
    >
      <div className="flex justify-end mb-3">
        <button type="button" autoFocus onClick={closeFilm} aria-label={english ? "Close video" : "Cerrar vídeo"} className="p-2 rounded-full hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
          <X className="w-5 h-5" aria-hidden="true" />
        </button>
      </div>
      <video src="/alpa-marca.mp4" controls autoPlay playsInline className="w-full rounded-lg" />
    </dialog>}
  </>;
};
export default Hero;
