import { useCallback, useEffect, useRef, useState } from "react";
import { Pause, Play, Workflow, Boxes, Check } from "lucide-react";
import { automationFlows } from "@/data/automationFlows";
import { agentSystems } from "@/data/agentSystems";
import FlowCanvas, { FlowStack } from "@/components/flows/FlowCanvas";
import SystemCanvas, { SystemStack } from "@/components/flows/SystemCanvas";
import { useMediaQuery } from "@/hooks/useMediaQuery";

type Mode = "automatizaciones" | "sistemas";

const AUTOPLAY_MS = 7600;
const LOG_STEP_MS = 1150;

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

const modeCopy: Record<Mode, { eyebrow: string; title: string; intro: string }> = {
  automatizaciones: {
    eyebrow: "Agentes de IA trabajando en cada área",
    title: "Así se ve una pyme cuando la IA hace el trabajo repetitivo",
    intro:
      "No son ideas. Son flujos reales que montamos en empresas como la tuya: un disparador, un agente que entiende, tus herramientas de siempre y una persona solo donde hace falta.",
  },
  sistemas: {
    eyebrow: "Sistemas de agentes IA y herramientas a medida",
    title: "Un agente en el centro y las herramientas que tu empresa necesita, hechas a medida",
    intro:
      "Cuando no existe un programa que encaje con cómo trabajas, lo desarrollamos: certificaciones, control de herramientas, CRM, fichaje, marketing o facturación. Todo conectado a un agente al que tu equipo habla por WhatsApp o por voz.",
  },
};

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
  const itemCount = isFlows ? automationFlows.length : system.modules.length;
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

  const copy = modeCopy[mode];
  const metric = isFlows ? flow.metric : module.metric;

  return (
    <section id="automatizaciones" ref={sectionRef} className="relative overflow-hidden bg-[#08090B] text-white py-16 md:py-20 px-4 md:px-8 scroll-mt-20">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 left-1/3 w-[600px] h-[600px] rounded-full bg-primary/15 blur-[140px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-primary/10 blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Cabecera compacta con conmutador */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-8">
          <div key={mode} className="max-w-2xl flow-layer-in">
            <p className="text-xs font-medium text-blue-300 uppercase tracking-wide mb-2">{copy.eyebrow}</p>
            <h2 className="text-3xl md:text-4xl font-light leading-tight mb-3" style={{ textWrap: "balance" }}>{copy.title}</h2>
            <p className="text-sm md:text-base text-white/60 leading-relaxed">{copy.intro}</p>
          </div>
          <div className="inline-flex self-start lg:self-auto rounded-full border border-white/15 bg-white/[0.04] p-1 flex-shrink-0" role="tablist" aria-label="Qué mostrar">
            {(
              [
                { id: "automatizaciones", label: "Automatizaciones", Icon: Workflow },
                { id: "sistemas", label: "Sistemas y herramientas", Icon: Boxes },
              ] as { id: Mode; label: string; Icon: typeof Workflow }[]
            ).map(({ id, label, Icon }) => {
              const active = mode === id;
              return (
                <button
                  key={id}
                  role="tab"
                  aria-selected={active}
                  onClick={() => switchMode(id)}
                  className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                    active ? "bg-primary text-white shadow-lg shadow-primary/30" : "text-white/60 hover:text-white"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {!isFlows && (
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="text-xs text-white/45 mr-2">Ejemplo de empresa:</span>
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

        <div className="grid lg:grid-cols-[240px_1fr] gap-4 lg:gap-6 items-start">
          {/* Selector */}
          <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 -mx-4 px-4 lg:mx-0 lg:px-0">
            {(isFlows ? automationFlows.map((f) => ({ id: f.id, title: f.area, sub: f.title })) : system.modules.map((m) => ({ id: m.id, title: m.name, sub: m.short }))).map((item, i) => {
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
                className="flex-shrink-0 inline-flex items-center gap-2 text-xs text-white/50 hover:text-white px-4 py-2 lg:mt-2 transition-colors"
                aria-label={playing ? "Pausar recorrido automático" : "Reanudar recorrido automático"}
              >
                {playing ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                {playing ? "Recorrido automático" : "Reanudar recorrido"}
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

            <div className="grid md:grid-cols-[1fr_200px] border-t border-white/10">
              <div className="px-5 py-3.5 font-mono text-[12px] leading-relaxed min-h-[132px]">
                <p className="text-white/35 mb-1.5 text-[10px] uppercase tracking-wide font-sans">Registro en directo</p>
                <ul aria-live="polite">
                  {log.slice(0, visibleLines).map((line, i) => (
                    <li key={`${logKey}-${i}`} className="flex gap-3 text-white/85 flow-node" style={{ animationDuration: "0.4s" }}>
                      <span className="text-blue-400/80 flex-shrink-0">{String(i + 1).padStart(2, "0")}</span>
                      <span className={i === log.length - 1 ? "text-emerald-300" : ""}>{line}</span>
                    </li>
                  ))}
                  {visibleLines < log.length && (
                    <li className="text-white/40 flex gap-3">
                      <span className="text-blue-400/50">{String(visibleLines + 1).padStart(2, "0")}</span>
                      <span style={animate ? { animation: "flow-pulse 1s ease-in-out infinite" } : undefined}>▍</span>
                    </li>
                  )}
                </ul>
              </div>
              <div className="border-t md:border-t-0 md:border-l border-white/10 px-5 py-3.5 flex flex-col justify-center">
                <p key={`${logKey}-metric`} className="text-3xl md:text-4xl font-semibold text-white tracking-tight flow-layer-in" style={{ fontVariantNumeric: "tabular-nums" }}>{metric.value}</p>
                <p className="text-xs text-white/50 mt-1.5">{metric.label}</p>
              </div>
            </div>
          </div>
        </div>

        {isFlows ? (
          <p className="mt-5 max-w-3xl text-sm md:text-base text-white/60 leading-relaxed">{flow.hook}</p>
        ) : (
          <div key={`${system.id}-${module.id}-detail`} className="mt-5 grid md:grid-cols-[1.2fr_1fr] gap-6 flow-layer-in">
            <div>
              <p className="text-[11px] uppercase tracking-wide text-white/40 mb-1.5">Lo usan: {module.users}</p>
              <p className="text-sm md:text-base text-white/70 leading-relaxed">{module.description}</p>
            </div>
            <ul className="space-y-1.5">
              {module.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2.5 text-sm text-white/75">
                  <Check className="w-4 h-4 text-blue-300 mt-0.5 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-[11px] text-white/45">
          <span className="inline-flex items-center gap-2"><span className="w-3 h-3 rounded border border-blue-400 bg-blue-500/20" /> Agente de IA</span>
          <span className="inline-flex items-center gap-2"><span className="w-3 h-3 rounded border border-white/25 bg-[#141518]" /> {isFlows ? "Tus herramientas de siempre" : "Herramienta desarrollada a medida"}</span>
          {isFlows && <span className="inline-flex items-center gap-2"><span className="w-3 h-3 rounded border border-dashed border-amber-300/70" /> Una persona decide</span>}
          {isFlows && <span className="inline-flex items-center gap-2"><span className="w-3 h-3 rounded border border-emerald-400/70 bg-emerald-500/10" /> Resultado en tu sistema</span>}
          {!isFlows && <span className="inline-flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-blue-400/80" /> Datos que entran y salen del agente</span>}
          {!isFlows && <span className="text-white/30">Empresas de ejemplo. Los nombres son ficticios.</span>}
        </div>
      </div>
    </section>
  );
};

export default AutomationFlows;
