import { Bot } from "lucide-react";
import type { CompanySystem, SystemModule } from "@/data/agentSystems";
import { flowIcons, Packet } from "@/components/flows/icons";

const W = 960;
const H = 440;
const HUB = { x: 480, y: 220, r: 58 };
const NODE_W = 210;
const NODE_H = 68;

// Seis posiciones (centros) alrededor del agente.
const slots = [
  { x: 262, y: 66 },
  { x: 698, y: 66 },
  { x: 118, y: 220 },
  { x: 842, y: 220 },
  { x: 262, y: 374 },
  { x: 698, y: 374 },
];

function spoke(cx: number, cy: number) {
  const dx = cx - HUB.x;
  const dy = cy - HUB.y;
  const len = Math.hypot(dx, dy);
  const sx = HUB.x + (dx / len) * (HUB.r + 6);
  const sy = HUB.y + (dy / len) * (HUB.r + 6);
  return `M ${sx} ${sy} L ${cx} ${cy}`;
}

interface Props {
  system: CompanySystem;
  activeIndex: number;
  animate: boolean;
  onSelect: (index: number) => void;
}

const ModuleText = ({ module, active }: { module: SystemModule; active: boolean }) => (
  <foreignObject x="54" y="0" width={NODE_W - 54 - 8} height={NODE_H}>
    <div
      // @ts-expect-error xmlns es necesario para foreignObject en algunos navegadores
      xmlns="http://www.w3.org/1999/xhtml"
      style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", paddingTop: 8, paddingBottom: 2, overflow: "hidden", fontFamily: "inherit" }}
    >
      <div style={{ fontSize: 12, fontWeight: 600, lineHeight: "14px", color: "#FFFFFF", overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>{module.name}</div>
      <div style={{ fontSize: 10, lineHeight: "12px", color: active ? "#BFDBFE" : "rgba(255,255,255,0.5)", marginTop: 2, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>{module.short}</div>
    </div>
  </foreignObject>
);

const SystemCanvas = ({ system, activeIndex, animate, onSelect }: Props) => {
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto block" role="img" aria-label={`Sistema de agente IA y herramientas para ${system.company}`}>
      <defs>
        <filter id="hub-glow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="16" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <pattern id="system-grid" width="24" height="24" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" fill="rgba(255,255,255,0.07)" />
        </pattern>
        <radialGradient id="hub-fill" cx="50%" cy="40%" r="70%">
          <stop offset="0%" stopColor="rgba(96,165,250,0.55)" />
          <stop offset="100%" stopColor="rgba(0,102,255,0.15)" />
        </radialGradient>
      </defs>
      <rect x="0" y="0" width={W} height={H} fill="url(#system-grid)" />

      <g className={animate ? "flow-layer-in" : undefined} style={{ animationDelay: "0.3s" }}>
        {system.modules.map((module, i) => {
          const slot = slots[i];
          const d = spoke(slot.x, slot.y);
          const active = i === activeIndex;
          return (
            <g key={`${system.id}-${module.id}-spoke`}>
              <path d={d} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="6" />
              <path d={d} fill="none" stroke={active ? "rgba(96,165,250,0.95)" : "rgba(59,130,246,0.28)"} strokeWidth={active ? 1.8 : 1} className={animate ? "flow-edge" : undefined} strokeDasharray={animate ? undefined : "8 6"} style={{ transition: "stroke 0.5s" }} />
              {animate && active && (
                <>
                  <Packet path={d} color="#60A5FA" delay={0} dur={1.8} />
                  <Packet path={d} color="#86EFAC" delay={0.9} dur={1.8} reverse />
                </>
              )}
              {animate && !active && <Packet path={d} color="rgba(96,165,250,0.5)" delay={i * 0.7} dur={4.5} reverse={i % 2 === 1} />}
            </g>
          );
        })}
      </g>

      <g transform={`translate(${HUB.x} ${HUB.y})`}>
        <g className={animate ? "flow-node-pop" : undefined}>
          <circle r={HUB.r + 6} fill="rgba(59,130,246,0.35)" filter="url(#hub-glow)" />
          {animate && (
            <>
              <circle r={HUB.r} fill="none" stroke="#60A5FA" strokeWidth="1.5">
                <animate attributeName="r" values={`${HUB.r};${HUB.r + 46}`} dur="2.8s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.6;0" dur="2.8s" repeatCount="indefinite" />
              </circle>
              <circle r={HUB.r} fill="none" stroke="#60A5FA" strokeWidth="1.5">
                <animate attributeName="r" values={`${HUB.r};${HUB.r + 46}`} dur="2.8s" begin="1.4s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.6;0" dur="2.8s" begin="1.4s" repeatCount="indefinite" />
              </circle>
            </>
          )}
          <circle r={HUB.r + 16} fill="none" stroke="rgba(147,197,253,0.45)" strokeWidth="1" strokeDasharray="3 9" style={animate ? { animation: "hub-spin 28s linear infinite", transformOrigin: "0 0", transformBox: "view-box" } : undefined} />
          <circle r={HUB.r} fill="url(#hub-fill)" stroke="#60A5FA" strokeWidth="1.5" />
          <Bot x={-14} y={-30} width={28} height={28} stroke="#FFFFFF" strokeWidth={1.7} />
          <foreignObject x={-HUB.r} y="0" width={HUB.r * 2} height="50">
            <div
              // @ts-expect-error xmlns es necesario para foreignObject en algunos navegadores
              xmlns="http://www.w3.org/1999/xhtml"
              style={{ textAlign: "center", padding: "0 6px", fontFamily: "inherit" }}
            >
              <div style={{ fontSize: 11, fontWeight: 600, lineHeight: "13px", color: "#FFFFFF", overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>{system.hub.label}</div>
              <div style={{ fontSize: 9, lineHeight: "11px", color: "#BFDBFE", overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>{system.hub.sub}</div>
            </div>
          </foreignObject>
        </g>
      </g>

      {system.modules.map((module, i) => {
        const slot = slots[i];
        const active = i === activeIndex;
        const Icon = flowIcons[module.icon];
        const x = slot.x - NODE_W / 2;
        const y = slot.y - NODE_H / 2;
        return (
          <g key={`${system.id}-${module.id}`} transform={`translate(${x} ${y})`} onClick={() => onSelect(i)} style={{ cursor: "pointer" }} role="button" aria-label={module.name} aria-pressed={active}>
            <g className={animate ? "flow-node-pop" : undefined} style={{ animationDelay: `${0.15 + i * 0.08}s` }}>
              {active && <rect x="-4" y="-4" width={NODE_W + 8} height={NODE_H + 8} rx="16" fill="rgba(59,130,246,0.25)" filter="url(#hub-glow)" />}
              <rect x="0" y="0" width={NODE_W} height={NODE_H} rx="12" fill={active ? "rgba(0,102,255,0.16)" : "#141518"} stroke={active ? "#3B82F6" : "rgba(255,255,255,0.14)"} strokeWidth={active ? 1.5 : 1} style={{ transition: "fill 0.4s, stroke 0.4s" }} />
              <rect x="12" y={NODE_H / 2 - 16} width="32" height="32" rx="8" fill={active ? "rgba(59,130,246,0.35)" : "rgba(255,255,255,0.06)"} />
              <Icon x="19" y={NODE_H / 2 - 9} width="18" height="18" stroke={active ? "#BFDBFE" : "#E5E7EB"} strokeWidth={1.8} />
              <ModuleText module={module} active={active} />
              <text x={NODE_W - 9} y="12" fontSize="8" textAnchor="end" letterSpacing="0.6" fill={active ? "#93C5FD" : "rgba(255,255,255,0.35)"}>
                {active ? "EN USO" : "HERRAMIENTA"}
              </text>
            </g>
          </g>
        );
      })}
    </svg>
  );
};

export default SystemCanvas;
