import { useRef, useState } from "react";
import { ArrowRight, Play } from "lucide-react";
import { useCopy } from "@/i18n";
import { track } from "@/lib/analytics";

// Los dos archivos viven en public/, así que se sirven tal cual desde la raíz.
const VIDEO_SRC = "/alpa-marca.mp4";
const POSTER_SRC = "/alpa-marca-poster.jpg";

/**
 * "Lo que construimos": el vídeo de marca.
 *
 * El vídeo lleva audio y dura casi un minuto, así que no se reproduce solo: hasta
 * que alguien pulsa solo se carga la portada, no los 16 MB del vídeo. Al pulsar arranca
 * con sonido (el gesto del usuario lo permite) y aparecen los controles nativos.
 */
const AutomationFlows = () => {
  const c = useCopy();
  const [started, setStarted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const start = () => {
    setStarted(true);
    track("video_play", { place: "home_marca" });
    const video = videoRef.current;
    if (!video) return;
    video.play().catch(() => {
      // Si el navegador no deja reproducir con sonido, se intenta en silencio.
      video.muted = true;
      void video.play();
    });
  };

  return (
    <section id="automatizaciones" className="relative overflow-hidden bg-[#08090B] text-white py-16 md:py-20 px-4 md:px-8 scroll-mt-20">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 left-1/3 w-[600px] h-[600px] rounded-full bg-primary/15 blur-[140px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-primary/10 blur-[120px]" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="max-w-2xl mb-6 md:mb-8">
          <p className="text-xs font-medium text-blue-300 uppercase tracking-wide mb-2">{c.flows.eyebrow}</p>
          <h2 className="text-3xl md:text-4xl font-light leading-tight mb-3" style={{ textWrap: "balance" }}>
            {c.flows.title}
          </h2>
          <p className="text-sm md:text-base text-white/60 leading-relaxed">{c.flows.videoIntro}</p>
        </div>

        <div className="relative rounded-2xl border border-white/10 bg-black shadow-2xl shadow-black/60 overflow-hidden">
          <video
            ref={videoRef}
            src={VIDEO_SRC}
            poster={POSTER_SRC}
            preload="none"
            playsInline
            controls={started}
            aria-label={c.flows.videoLabel}
            className="w-full h-auto block aspect-video bg-black"
            onEnded={() => setStarted(false)}
          />

          {!started && (
            <button
              type="button"
              onClick={start}
              aria-label={c.flows.videoPlay}
              className="absolute inset-0 flex items-center justify-center bg-black/25 hover:bg-black/15 transition-colors group"
            >
              <span className="flex items-center gap-2 md:gap-3 rounded-full bg-primary/95 text-white pl-3.5 pr-4 py-2 md:pl-6 md:pr-7 md:py-4 shadow-2xl shadow-primary/40 transition-transform duration-300 group-hover:scale-105">
                <Play className="w-4 h-4 md:w-6 md:h-6 fill-current" />
                <span className="text-[13px] md:text-base font-medium">{c.flows.videoPlay}</span>
              </span>
              <span className="absolute bottom-3 right-4 text-[11px] text-white/60 tabular-nums">{c.flows.videoDuration}</span>
            </button>
          )}
        </div>

        <a href="#servicios" className="mt-6 inline-flex items-center gap-1.5 text-sm text-blue-300 hover:text-white">
          {c.flows.more} <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </section>
  );
};

export default AutomationFlows;
