import { useCallback, useEffect, useRef, useState } from "react";
import { Pause, Play, Workflow, Boxes, ArrowRight } from "lucide-react";
import { automationFlows } from "@/data/automationFlows";
import { agentSystems } from "@/data/agentSystems";
import FlowCanvas from "@/components/flows/FlowCanvas";
import SystemCanvas from "@/components/flows/SystemCanvas";
import { FlowStack, SystemStack } from "@/components/flows/MobileStacks";
import { useMediaQuery } from "@/hooks/useMediaQuery";

type Mode = "automatizaciones" | "sistemas";

const AUTOPLAY_MS = 7600;
const LOG_STEP_MS = 1150;
const LOG_VISIBLE = 3;

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
}

const modes: { id: Mode; label: string; hint: string; Icon: typeof Workflow }[] = [
  { id: "automatizaciones", label: "Una automatización", hint: "Un proceso concreto, de principio a fin.", Icon: Workflow },
  { id: "sistemas", label: "Un sistema completo", hint: "Toda la empresa conectada a un agente central.", Icon: Boxes },
];

const AutomationFlows = () => {
  const reducedMotion = usePrefersReducedMotion();
  const isWide = useMediaQuery("(min-width: 768px)");
  const [mode, setMode] = useState<Mode>("automatizaciones");
  const [flowIndex, setFlowIndex] = useState(0);
  const [systemIndex, setSystemIndex] = useState(0);
  const [moduleIndex, setModuleIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [visibleLines, setVisibleLines] = useState(0);
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const animate = !reducedMotion;
  const autoplay = playing && animate && inView;
  const flow = automationFlows[flowIndex];
  const system = agentSystems[systemIndex];
  const module = system.modules[moduleIndex];
  const isFlows = mode === "automatizaciones";
  const log = isFlows ? flow.log : module.log;
  const logKey = isFlows ? `flow-${flow.id}` : `sys-${system.id}-${module.id}`;
  const activeIndex = isFlows ? flowIndex : moduleIndex;

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => setInView(entry.isIntersecting)), { threshold: 0.2 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!autoplay) return;
    const id = window.setTimeout(() => {
      if (isFlows) setFlowIndex((i) => (i + 1) % automationFlows.length);
      else setModuleIndex((i) => (i + 1) % system.modules.length);
    }, AUTOPLAY_MS);
    return () => window.clearTimeout(id);
  }, [autoplay, isFlows, flowIndex, moduleIndex, system]);

  useEffect(() => {
    setVisibleLines(animate ? 0 : log.length);
    if (!animate) return;
    const timers = log.map((_, i) => window.setTimeout(() => setVisibleLines(i + 1), 500 + i * LOG_STEP_MS));
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [logKey, log, animate]);

  const select = useCallback(
    (i: number) => {
      if (isFlows) setFlowIndex(i);
      else setModuleIndex(i);
      setPlaying(false);
    },
    [isFlows]
  );

  const switchMode = (next: Mode) => {
    if (next === mode) return;
    setMode(next);
    setPlaying(true);
  };

  const changeSystem = (i: number) => {
    setSystemIndex(i);
    setModuleIndex(0);
    setPlaying(true);
  };

  const metric = isFlows ? flow.metric : module.metric;
  const hook = isFlows ? flow.hook : module.description;
  const shownLog = log.slice(Math.max(0, visibleLines - LOG_VISIBLE), visibleLines);
  const shownOffset = Math.max(0, visibleLines - LOG_VISIBLE);
  const rail = isFlows
    ? automationFlows.map((f) => ({ id: f.id, title: f.area, sub: f.title }))
    : system.modules.map((m) => ({ id: m.id, title: m.name, sub: m.short }));

  return (
    <section id="automatizaciones" ref={sectionRef} className="relative overflow-hidden bg-[#08090B] text-white py-16 md:py-20 px-4 md:px-8 scroll-mt-20">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 left-1/3 w-[600px] h-[600px] rounded-full bg-primary/15 blur-[140px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-primary/10 blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="max-w-2xl mb-6">
          <p className="text-xs font-medium text-blue-300 uppercase tracking-wide mb-2">Lo que construimos</p>
          <h2 className="text-3xl md:text-4xl font-light leading-tight mb-3" style={{ textWrap: "balance" }}>
            Míralo funcionar antes de contratarlo
          </h2>
          <p className="text-sm md:text-base text-white/60 leading-relaxed">
            Ejemplos reales de lo que montamos en pymes. Elige qué quieres ver y déjalo correr.
          </p>
        </div>

        {/* Un único conmutador, con explicación de cada opción */}
        <div className="grid sm:grid-cols-2 gap-2 max-w-2xl mb-6" role="tablist" aria-label="Qué mostrar">
          {modes.map(({ id, label, hint, Icon }) => {
            const active = mode === id;
            return (
              <button
                key={id}
                role="tab"
                aria-selected={active}
                onClick={() => switchMode(id)}
                className={`flex items-center gap-3 text-left rounded-xl border px-4 py-3 transition-all duration-300 ${
                  active ? "border-blue-400/60 bg-blue-500/10 shadow-lg shadow-primary/20" : "border-white/10 bg-white/[0.03] hover:border-white/25"
                }`}
              >
                <span className={`flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center ${active ? "bg-primary text-white" : "bg-white/10 text-white/60"}`}>
                  <Icon className="w-4 h-4" />
                </span>
                <span className="min-w-0">
                  <span className={`block text-sm font-medium ${active ? "text-white" : "text-white/70"}`}>{label}</span>
                  <span className={`block text-[11px] leading-snug ${active ? "text-white/60" : "text-white/40"}`}>{hint}</span>
                </span>
              </button>
            );
          })}
        </div>

        {!isFlows && (
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="text-xs text-white/45 mr-1">Ejemplo:</span>
            {agentSystems.map((item, i) => (
              <button
                key={item.id}
                onClick={() => changeSystem(i)}
                aria-pressed={i === systemIndex}
                className={`rounded-full border px-3.5 py-1.5 text-xs md:text-sm transition-all duration-300 ${
                  i === systemIndex ? "border-blue-400/60 bg-blue-500/15 text-white" : "border-white/15 text-white/60 hover:text-white hover:border-white/30"
                }`}
              >
                {item.sector}
              </button>
            ))}
          </div>
        )}

        <div className="grid lg:grid-cols-[220px_1fr] gap-4 lg:gap-6 items-start">
          {/* Selector de ejemplo */}
          <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 -mx-4 px-4 lg:mx-0 lg:px-0">
            {rail.map((item, i) => {
              const active = i === activeIndex;
              return (
                <button
                  key={`${mode}-${item.id}`}
                  onClick={() => select(i)}
                  aria-pressed={active}
                  className={`relative flex-shrink-0 text-left rounded-xl border px-3.5 py-2.5 transition-all duration-300 overflow-hidden ${
                    active ? "border-blue-400/60 bg-blue-500/10 text-white" : "border-white/10 bg-white/[0.03] text-white/60 hover:text-white hover:border-white/25"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className={`w-1.5 h-1.5 rounded-full ${active ? "bg-blue-400" : "bg-white/25"}`} style={active && animate ? { animation: "flow-pulse 1.4s ease-in-out infinite" } : undefined} />
                    <span className="text-sm font-medium whitespace-nowrap">{item.title}</span>
                  </span>
                  <span className="hidden lg:block text-[11px] text-white/45 mt-0.5 pl-3.5 truncate">{item.sub}</span>
                  {active && autoplay && (
                    <span key={`${logKey}-progress`} className="absolute bottom-0 left-0 h-0.5 bg-blue-400/80" style={{ animation: `flow-progress ${AUTOPLAY_MS}ms linear forwards` }} />
                  )}
                </button>
              );
            })}
            {animate && (
              <button
                onClick={() => setPlaying((p) => !p)}
                className="flex-shrink-0 inline-flex items-center gap-2 text-xs text-white/50 hover:text-white px-4 py-2 lg:mt-1 transition-colors"
                aria-label={playing ? "Pausar recorrido automático" : "Reanudar recorrido automático"}
              >
                {playing ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                {playing ? "Pasa solo" : "Reanudar"}
              </button>
            )}
          </div>

          {/* Consola */}
          <div className="rounded-2xl border border-white/10 bg-[#0D0E11] shadow-2xl shadow-black/60 overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3 border-b border-white/10">
              <div className="min-w-0">
                <p className="text-[10px] uppercase tracking-wide text-white/40">{isFlows ? flow.area : `${system.company} · ${system.size}`}</p>
                <h3 className="text-base md:text-lg font-medium truncate">{isFlows ? flow.title : module.name}</h3>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 text-emerald-300 px-2.5 py-1 text-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" style={animate ? { animation: "flow-pulse 1.2s ease-in-out infinite" } : undefined} />
                En marcha
              </span>
            </div>

            <div key={`${isFlows ? flow.id : system.id}-${isWide ? "wide" : "stack"}`} className={isWide ? "px-4 pt-2 max-w-[860px] mx-auto" : ""}>
              {isFlows ? (
                isWide ? <FlowCanvas flow={flow} animate={animate} /> : <FlowStack flow={flow} animate={animate} />
              ) : isWide ? (
                <SystemCanvas system={system} activeIndex={moduleIndex} animate={animate} onSelect={select} />
              ) : (
                <SystemStack system={system} activeIndex={moduleIndex} animate={animate} onSelect={select} />
              )}
            </div>

            <div className="grid md:grid-cols-[1fr_180px] border-t border-white/10">
              <div className="px-5 py-3 font-mono text-[12px] leading-relaxed min-h-[84px]">
                <ul aria-live="polite">
                  {shownLog.map((line, i) => {
                    const idx = shownOffset + i;
                    return (
                      <li key={`${logKey}-${idx}`} className="flex gap-3 text-white/85 flow-node" style={{ animationDuration: "0.4s" }}>
                        <span className="text-blue-400/80 flex-shrink-0">{String(idx + 1).padStart(2, "0")}</span>
                        <span className={idx === log.length - 1 ? "text-emerald-300" : ""}>{line}</span>
                      </li>
                    );
                  })}
                  {visibleLines < log.length && (
                    <li className="text-white/40 flex gap-3">
                      <span className="text-blue-400/50">{String(visibleLines + 1).padStart(2, "0")}</span>
                      <span style={animate ? { animation: "flow-pulse 1s ease-in-out infinite" } : undefined}>▍</span>
                    </li>
                  )}
                </ul>
              </div>
              <div className="border-t md:border-t-0 md:border-l border-white/10 px-5 py-3 flex flex-col justify-center">
                <p key={`${logKey}-metric`} className="text-2xl md:text-3xl font-semibold text-white tracking-tight flow-layer-in" style={{ fontVariantNumeric: "tabular-nums" }}>{metric.value}</p>
                <p className="text-xs text-white/50 mt-1">{metric.label}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <p key={`${logKey}-hook`} className="max-w-3xl text-sm md:text-base text-white/60 leading-relaxed flow-layer-in">{hook}</p>
          <a href="#servicios" className="inline-flex items-center gap-1.5 text-sm text-blue-300 hover:text-white whitespace-nowrap flex-shrink-0">
            Escalas y precios <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default AutomationFlows;
