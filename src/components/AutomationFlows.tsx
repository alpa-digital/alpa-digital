import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { useFlows, useSystems } from "@/i18n/content";
import { useCopy } from "@/i18n";
import FlowCanvas from "@/components/flows/FlowCanvas";
import SystemCanvas from "@/components/flows/SystemCanvas";
import { FlowStack, SystemStack } from "@/components/flows/MobileStacks";
import { useMediaQuery } from "@/hooks/useMediaQuery";

type Mode = "automatizaciones" | "sistemas";

const AUTOPLAY_MS = 7600;

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

const AutomationFlows = () => {
  const c = useCopy();
  const automationFlows = useFlows();
  const agentSystems = useSystems();
  const modes: { id: Mode; label: string }[] = [
    { id: "automatizaciones", label: c.flows.modeFlow },
    { id: "sistemas", label: c.flows.modeSystem },
  ];
  const reducedMotion = usePrefersReducedMotion();
  const isWide = useMediaQuery("(min-width: 768px)");
  const [mode, setMode] = useState<Mode>("automatizaciones");
  const [flowIndex, setFlowIndex] = useState(0);
  const [systemIndex, setSystemIndex] = useState(0);
  const [moduleIndex, setModuleIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const animate = !reducedMotion;
  const autoplay = playing && animate && inView;
  const flow = automationFlows[flowIndex];
  const system = agentSystems[systemIndex];
  const module = system.modules[moduleIndex];
  const isFlows = mode === "automatizaciones";
  const itemKey = isFlows ? `flow-${flow.id}` : `sys-${system.id}-${module.id}`;
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
  const chips = isFlows ? automationFlows.map((f) => f.area) : agentSystems.map((system) => system.sector);
  const chipIndex = isFlows ? flowIndex : systemIndex;
  const pick = (i: number) => (isFlows ? select(i) : changeSystem(i));

  return (
    <section id="automatizaciones" ref={sectionRef} className="relative overflow-hidden bg-[#08090B] text-white py-16 md:py-20 px-4 md:px-8 scroll-mt-20">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 left-1/3 w-[600px] h-[600px] rounded-full bg-primary/15 blur-[140px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-primary/10 blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-6">
          <div className="max-w-xl">
            <p className="text-xs font-medium text-blue-300 uppercase tracking-wide mb-2">{c.flows.eyebrow}</p>
            <h2 className="text-3xl md:text-4xl font-light leading-tight" style={{ textWrap: "balance" }}>{c.flows.title}</h2>
          </div>
          <div className="inline-flex self-start rounded-full border border-white/15 bg-white/[0.04] p-1" role="tablist" aria-label={c.flows.switchLabel}>
            {modes.map(({ id, label }) => {
              const active = mode === id;
              return (
                <button
                  key={id}
                  role="tab"
                  aria-selected={active}
                  onClick={() => switchMode(id)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 whitespace-nowrap ${active ? "bg-primary text-white shadow-lg shadow-primary/30" : "text-white/60 hover:text-white"}`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0 md:flex-wrap mb-4" role="tablist" aria-label={isFlows ? c.flows.areaLabel : c.flows.companyLabel}>
          {chips.map((label, i) => {
            const active = i === chipIndex;
            return (
              <button
                key={`${mode}-${label}`}
                role="tab"
                aria-selected={active}
                onClick={() => pick(i)}
                className={`relative flex-shrink-0 overflow-hidden rounded-full border px-3.5 py-1.5 text-sm transition-all duration-300 ${active ? "border-blue-400/60 bg-blue-500/15 text-white" : "border-white/15 text-white/60 hover:text-white hover:border-white/30"}`}
              >
                {label}
                {active && isFlows && autoplay && (
                  <span key={`${itemKey}-progress`} className="absolute bottom-0 left-0 h-0.5 bg-blue-400/80" style={{ animation: `flow-progress ${AUTOPLAY_MS}ms linear forwards` }} />
                )}
              </button>
            );
          })}
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#0D0E11] shadow-2xl shadow-black/60 overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3 border-b border-white/10">
            <div className="min-w-0">
              <p className="text-[10px] uppercase tracking-wide text-white/40">{isFlows ? flow.area : `${system.company} · ${system.size}`}</p>
              <h3 className="text-base md:text-lg font-medium truncate">{isFlows ? flow.title : module.name}</h3>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 text-emerald-300 px-2.5 py-1 text-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" style={animate ? { animation: "flow-pulse 1.2s ease-in-out infinite" } : undefined} />
              {c.flows.running}
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

          <div key={`${itemKey}-foot`} className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 px-5 py-4 border-t border-white/10 flow-layer-in">
            <p className="flex-1 text-sm md:text-base text-white/70 leading-relaxed">{hook}</p>
            <div className="flex items-baseline gap-2 md:flex-col md:items-end md:gap-0 flex-shrink-0">
              <p className="text-2xl md:text-3xl font-semibold text-white tracking-tight" style={{ fontVariantNumeric: "tabular-nums" }}>{metric.value}</p>
              <p className="text-xs text-white/50">{metric.label}</p>
            </div>
          </div>
        </div>

        <a href="#servicios" className="mt-6 inline-flex items-center gap-1.5 text-sm text-blue-300 hover:text-white">
          {c.flows.more} <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </section>
  );
};

export default AutomationFlows;
