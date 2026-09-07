import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  Mail, MessageCircle, Bot, BookOpen, Users, User, Send, FileText, Receipt, Calculator,
  AlertTriangle, CheckCircle2, Calendar, ClipboardList, Image, Megaphone, Clock, BarChart3,
  Package, Timer, Tag, Pause, Play,
} from "lucide-react";
import { automationFlows, type AreaFlow, type FlowNode, type IconName } from "@/data/automationFlows";

const icons: Record<IconName, LucideIcon> = {
  mail: Mail, whatsapp: MessageCircle, bot: Bot, book: BookOpen, users: Users, user: User, send: Send,
  file: FileText, receipt: Receipt, calculator: Calculator, alert: AlertTriangle, check: CheckCircle2,
  calendar: Calendar, clipboard: ClipboardList, image: Image, megaphone: Megaphone, clock: Clock,
  chart: BarChart3, package: Package, timer: Timer, tag: Tag,
};

const NODE_W = 172;
const NODE_H = 60;
const AGENT_W = 200;
const AGENT_H = 76;
const AUTOPLAY_MS = 7600;
const LOG_STEP_MS = 1150;

function nodeSize(node: FlowNode) {
  return node.kind === "agent" ? { w: AGENT_W, h: AGENT_H } : { w: NODE_W, h: NODE_H };
}

function edgePath(from: FlowNode, to: FlowNode) {
  const a = nodeSize(from);
  const b = nodeSize(to);
  const x1 = from.x + a.w;
  const y1 = from.y + a.h / 2;
  const x2 = to.x;
  const y2 = to.y + b.h / 2;
  const dx = Math.max(40, (x2 - x1) / 2);
  return `M ${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`;
}

const nodeStyle: Record<FlowNode["kind"], { fill: string; stroke: string; text: string; sub: string; dash?: string }> = {
  trigger: { fill: "#141518", stroke: "rgba(255,255,255,0.18)", text: "#FFFFFF", sub: "rgba(255,255,255,0.55)" },
  agent: { fill: "rgba(0,102,255,0.16)", stroke: "#3B82F6", text: "#FFFFFF", sub: "#BFDBFE" },
  tool: { fill: "#141518", stroke: "rgba(255,255,255,0.14)", text: "#FFFFFF", sub: "rgba(255,255,255,0.5)" },
  human: { fill: "#121316", stroke: "rgba(251,191,36,0.6)", text: "#FDE68A", sub: "rgba(253,230,138,0.6)", dash: "4 4" },
  output: { fill: "rgba(34,197,94,0.12)", stroke: "rgba(74,222,128,0.7)", text: "#FFFFFF", sub: "rgba(187,247,208,0.8)" },
};

const kindLabel: Record<FlowNode["kind"], string> = {
  trigger: "Disparador",
  agent: "Agente IA",
  tool: "Herramienta",
  human: "Persona",
  output: "Resultado",
};

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

const FlowCanvas = ({ flow, animate }: { flow: AreaFlow; animate: boolean }) => {
  const byId = useMemo(() => Object.fromEntries(flow.nodes.map((n) => [n.id, n])), [flow]);

  return (
    <svg
      viewBox="0 0 920 380"
      className="w-full h-auto min-w-[760px] md:min-w-0"
      role="img"
      aria-label={`Flujo de automatización: ${flow.title}`}
    >
      <defs>
        <filter id="agent-glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="10" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <pattern id="flow-grid" width="24" height="24" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" fill="rgba(255,255,255,0.07)" />
        </pattern>
      </defs>
      <rect x="0" y="0" width="920" height="380" fill="url(#flow-grid)" />

      {flow.edges.map((edge, i) => {
        const d = edgePath(byId[edge.from], byId[edge.to]);
        const toHuman = byId[edge.to].kind === "human" || byId[edge.from].kind === "human";
        const stroke = toHuman ? "rgba(251,191,36,0.55)" : "rgba(59,130,246,0.75)";
        return (
          <g key={`${flow.id}-${edge.from}-${edge.to}`}>
            <path d={d} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="6" />
            <path d={d} fill="none" stroke={stroke} strokeWidth="1.5" className={animate ? "flow-edge" : ""} strokeDasharray={animate ? undefined : "8 6"} />
            {animate && (
              <circle cx="-40" cy="-40" r="4" fill={toHuman ? "#FBBF24" : "#60A5FA"}>
                <animateMotion dur="2.4s" begin={`${(i * 0.45).toFixed(2)}s`} repeatCount="indefinite" path={d} />
              </circle>
            )}
          </g>
        );
      })}

      {flow.nodes.map((node, i) => {
        const { w, h } = nodeSize(node);
        const style = nodeStyle[node.kind];
        const Icon = icons[node.icon];
        const isAgent = node.kind === "agent";
        return (
          <g key={`${flow.id}-${node.id}`} transform={`translate(${node.x} ${node.y})`}>
          <g className="flow-node" style={{ animationDelay: `${i * 0.12}s` }}>
            {isAgent && <rect x="0" y="0" width={w} height={h} rx="14" fill="rgba(59,130,246,0.35)" filter="url(#agent-glow)" />}
            <rect x="0" y="0" width={w} height={h} rx={isAgent ? 14 : 12} fill={style.fill} stroke={style.stroke} strokeWidth={isAgent ? 1.5 : 1} strokeDasharray={style.dash} />
            <rect x="14" y={h / 2 - 16} width="32" height="32" rx="8" fill={isAgent ? "rgba(59,130,246,0.35)" : "rgba(255,255,255,0.06)"} />
            <Icon x="21" y={h / 2 - 9} width="18" height="18" stroke={isAgent ? "#BFDBFE" : node.kind === "human" ? "#FDE68A" : node.kind === "output" ? "#86EFAC" : "#E5E7EB"} strokeWidth={1.8} />
            <text x="56" y={h / 2 - 6} fontSize="12.5" fontWeight="600" fill={style.text}>{node.label}</text>
            {node.sub && <text x="56" y={h / 2 + 11} fontSize="10.5" fill={style.sub}>{node.sub}</text>}
            <text x={w - 10} y="14" fontSize="8.5" textAnchor="end" letterSpacing="0.6" fill={isAgent ? "#93C5FD" : "rgba(255,255,255,0.35)"}>
              {kindLabel[node.kind].toUpperCase()}
            </text>
            {isAgent && (
              <circle cx={w - 12} cy={h - 12} r="3.5" fill="#60A5FA" style={{ animation: animate ? "flow-pulse 1.6s ease-in-out infinite" : undefined }} />
            )}
          </g>
          </g>
        );
      })}
    </svg>
  );
};

const AutomationFlows = () => {
  const reducedMotion = usePrefersReducedMotion();
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [visibleLines, setVisibleLines] = useState(0);
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const flow = automationFlows[index];
  const animate = !reducedMotion;
  const autoplay = playing && animate && inView;

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => setInView(entry.isIntersecting)),
      { threshold: 0.25 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!autoplay) return;
    const id = window.setTimeout(() => setIndex((i) => (i + 1) % automationFlows.length), AUTOPLAY_MS);
    return () => window.clearTimeout(id);
  }, [autoplay, index]);

  useEffect(() => {
    setVisibleLines(animate ? 0 : flow.log.length);
    if (!animate) return;
    const timers = flow.log.map((_, i) => window.setTimeout(() => setVisibleLines(i + 1), 500 + i * LOG_STEP_MS));
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [flow, animate]);

  const select = useCallback((i: number) => {
    setIndex(i);
    setPlaying(false);
  }, []);

  return (
    <section
      id="automatizaciones"
      ref={sectionRef}
      className="relative overflow-hidden bg-[#08090B] text-white py-24 px-4 md:px-8 scroll-mt-24"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 left-1/3 w-[600px] h-[600px] rounded-full bg-primary/15 blur-[140px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-primary/10 blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="max-w-3xl mb-12 md:mb-16">
          <p className="text-xs md:text-sm font-medium text-blue-300 uppercase tracking-wide mb-4">
            Agentes de IA trabajando en cada área
          </p>
          <h2 className="text-4xl md:text-6xl font-light leading-tight mb-6" style={{ textWrap: "balance" }}>
            Así se ve una pyme cuando la IA hace el trabajo repetitivo
          </h2>
          <p className="text-lg md:text-xl text-white/60" style={{ lineHeight: "1.8" }}>
            No son ideas. Son flujos reales que montamos en empresas como la tuya: un disparador, un agente que entiende, tus herramientas de siempre y una persona solo donde hace falta.
          </p>
        </div>

        <div className="grid lg:grid-cols-[280px_1fr] gap-6 lg:gap-8 items-start">
          {/* Selector de áreas */}
          <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 -mx-4 px-4 lg:mx-0 lg:px-0">
            {automationFlows.map((item, i) => {
              const active = i === index;
              return (
                <button
                  key={item.id}
                  onClick={() => select(i)}
                  aria-pressed={active}
                  className={`relative flex-shrink-0 text-left rounded-xl border px-4 py-3 lg:py-4 transition-all duration-300 overflow-hidden ${
                    active
                      ? "border-blue-400/60 bg-blue-500/10 text-white"
                      : "border-white/10 bg-white/[0.03] text-white/60 hover:text-white hover:border-white/25"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className={`w-1.5 h-1.5 rounded-full ${active ? "bg-blue-400" : "bg-white/25"}`} style={active && animate ? { animation: "flow-pulse 1.4s ease-in-out infinite" } : undefined} />
                    <span className="text-sm font-medium whitespace-nowrap">{item.area}</span>
                  </span>
                  <span className="hidden lg:block text-xs text-white/45 mt-1 pl-3.5">{item.title}</span>
                  {active && autoplay && (
                    <span
                      key={`${item.id}-${index}`}
                      className="absolute bottom-0 left-0 h-0.5 bg-blue-400/80"
                      style={{ animation: `flow-progress ${AUTOPLAY_MS}ms linear forwards` }}
                    />
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
            <div className="flex flex-wrap items-center justify-between gap-3 px-5 md:px-6 py-4 border-b border-white/10">
              <div>
                <p className="text-[11px] uppercase tracking-wide text-white/40 mb-1">{flow.area}</p>
                <h3 className="text-lg md:text-xl font-medium">{flow.title}</h3>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 text-emerald-300 px-2.5 py-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" style={animate ? { animation: "flow-pulse 1.2s ease-in-out infinite" } : undefined} />
                  En marcha
                </span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <div key={flow.id} className="px-2 md:px-4 pt-4">
                <FlowCanvas flow={flow} animate={animate} />
              </div>
            </div>
            <p className="md:hidden px-5 pb-3 text-[11px] text-white/40">Desliza hacia la derecha para recorrer el flujo completo →</p>

            <div className="grid md:grid-cols-[1fr_200px] gap-0 border-t border-white/10">
              <div className="px-5 md:px-6 py-5 font-mono text-[12.5px] leading-relaxed min-h-[168px]">
                <p className="text-white/35 mb-2 text-[11px] uppercase tracking-wide font-sans">Registro en directo</p>
                <ul aria-live="polite">
                  {flow.log.slice(0, visibleLines).map((line, i) => (
                    <li key={`${flow.id}-${i}`} className="flex gap-3 text-white/85 flow-node" style={{ animationDuration: "0.4s" }}>
                      <span className="text-blue-400/80 flex-shrink-0">{String(i + 1).padStart(2, "0")}</span>
                      <span className={i === flow.log.length - 1 ? "text-emerald-300" : ""}>{line}</span>
                    </li>
                  ))}
                  {visibleLines < flow.log.length && (
                    <li className="text-white/40 flex gap-3">
                      <span className="text-blue-400/50">{String(visibleLines + 1).padStart(2, "0")}</span>
                      <span style={animate ? { animation: "flow-pulse 1s ease-in-out infinite" } : undefined}>▍</span>
                    </li>
                  )}
                </ul>
              </div>
              <div className="border-t md:border-t-0 md:border-l border-white/10 px-5 md:px-6 py-5 flex flex-col justify-center">
                <p className="text-4xl md:text-5xl font-semibold text-white tracking-tight" style={{ fontVariantNumeric: "tabular-nums" }}>{flow.metric.value}</p>
                <p className="text-sm text-white/50 mt-2">{flow.metric.label}</p>
              </div>
            </div>
          </div>
        </div>

        <p className="mt-8 max-w-3xl text-base md:text-lg text-white/60" style={{ lineHeight: "1.8" }}>{flow.hook}</p>

        <div className="mt-10 flex flex-wrap gap-x-8 gap-y-2 text-xs text-white/45">
          <span className="inline-flex items-center gap-2"><span className="w-3 h-3 rounded border border-blue-400 bg-blue-500/20" /> Agente de IA</span>
          <span className="inline-flex items-center gap-2"><span className="w-3 h-3 rounded border border-white/25 bg-[#141518]" /> Tus herramientas de siempre</span>
          <span className="inline-flex items-center gap-2"><span className="w-3 h-3 rounded border border-dashed border-amber-300/70" /> Una persona decide</span>
          <span className="inline-flex items-center gap-2"><span className="w-3 h-3 rounded border border-emerald-400/70 bg-emerald-500/10" /> Resultado en tu sistema</span>
        </div>
      </div>
    </section>
  );
};

export default AutomationFlows;
