import { useMemo } from "react";
import type { AreaFlow, FlowNode } from "@/data/automationFlows";
import { flowIcons, Packet } from "@/components/flows/icons";
import { useCopy } from "@/i18n";

const W = 960;
const H = 380;
const SIZES: Record<FlowNode["kind"], { w: number; h: number }> = {
  trigger: { w: 200, h: 70 },
  agent: { w: 224, h: 84 },
  tool: { w: 220, h: 70 },
  human: { w: 220, h: 70 },
  output: { w: 204, h: 70 },
};

export function nodeSize(node: FlowNode) {
  return SIZES[node.kind];
}

function edgePath(from: FlowNode, to: FlowNode) {
  const a = nodeSize(from);
  const b = nodeSize(to);
  const x1 = from.x + a.w;
  const y1 = from.y + a.h / 2 - (a.h - 60) / 2;
  const x2 = to.x;
  const y2 = to.y + b.h / 2 - (b.h - 60) / 2;
  const dx = Math.max(36, (x2 - x1) / 2);
  return `M ${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`;
}

export const nodeStyle: Record<FlowNode["kind"], { fill: string; stroke: string; text: string; sub: string; icon: string; iconBg: string; dash?: string }> = {
  trigger: { fill: "#141518", stroke: "rgba(255,255,255,0.18)", text: "#FFFFFF", sub: "rgba(255,255,255,0.55)", icon: "#E5E7EB", iconBg: "rgba(255,255,255,0.06)" },
  agent: { fill: "rgba(0,102,255,0.16)", stroke: "#3B82F6", text: "#FFFFFF", sub: "#BFDBFE", icon: "#BFDBFE", iconBg: "rgba(59,130,246,0.35)" },
  tool: { fill: "#141518", stroke: "rgba(255,255,255,0.14)", text: "#FFFFFF", sub: "rgba(255,255,255,0.5)", icon: "#E5E7EB", iconBg: "rgba(255,255,255,0.06)" },
  human: { fill: "#121316", stroke: "rgba(251,191,36,0.6)", text: "#FDE68A", sub: "rgba(253,230,138,0.6)", icon: "#FDE68A", iconBg: "rgba(251,191,36,0.12)", dash: "4 4" },
  output: { fill: "rgba(34,197,94,0.12)", stroke: "rgba(74,222,128,0.7)", text: "#FFFFFF", sub: "rgba(187,247,208,0.8)", icon: "#86EFAC", iconBg: "rgba(74,222,128,0.12)" },
};

/** Etiqueta del tipo de nodo, en el idioma activo. */
export const useKindLabel = (): Record<FlowNode["kind"], string> => {
  const c = useCopy();
  return { trigger: c.flows.trigger, agent: c.flows.agent, tool: c.flows.tool, human: c.flows.person, output: c.flows.result };
};

/** Texto del nodo en HTML dentro del SVG: se ajusta a la caja y nunca se sale. */
const NodeText = ({ node, w, h }: { node: FlowNode; w: number; h: number }) => {
  const style = nodeStyle[node.kind];
  const isAgent = node.kind === "agent";
  return (
    <foreignObject x="54" y="0" width={w - 54 - 8} height={h}>
      <div
        // @ts-expect-error xmlns es necesario para foreignObject en algunos navegadores
        xmlns="http://www.w3.org/1999/xhtml"
        style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", paddingTop: 8, paddingBottom: 2, overflow: "hidden", fontFamily: "inherit" }}
      >
        <div style={{ fontSize: isAgent ? 13 : 12, fontWeight: 600, lineHeight: "14px", color: style.text, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>{node.label}</div>
        {node.sub && (
          <div style={{ fontSize: 10, lineHeight: "12px", color: style.sub, marginTop: 2, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>{node.sub}</div>
        )}
      </div>
    </foreignObject>
  );
};

const FlowCanvas = ({ flow, animate }: { flow: AreaFlow; animate: boolean }) => {
  const kindLabel = useKindLabel();
  const byId = useMemo(() => Object.fromEntries(flow.nodes.map((n) => [n.id, n])), [flow]);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto block" role="img" aria-label={`Flujo de automatización: ${flow.title}`}>
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
      <rect x="0" y="0" width={W} height={H} fill="url(#flow-grid)" />

      <g className={animate ? "flow-layer-in" : undefined} style={{ animationDelay: "0.35s" }}>
        {flow.edges.map((edge, i) => {
          const d = edgePath(byId[edge.from], byId[edge.to]);
          const human = byId[edge.to].kind === "human" || byId[edge.from].kind === "human";
          const stroke = human ? "rgba(251,191,36,0.55)" : "rgba(59,130,246,0.75)";
          return (
            <g key={`${flow.id}-${edge.from}-${edge.to}`}>
              <path d={d} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="6" />
              <path d={d} fill="none" stroke={stroke} strokeWidth="1.5" className={animate ? "flow-edge" : undefined} strokeDasharray={animate ? undefined : "8 6"} />
              {animate && <Packet path={d} color={human ? "#FBBF24" : "#60A5FA"} delay={0.6 + i * 0.45} />}
            </g>
          );
        })}
      </g>

      {flow.nodes.map((node, i) => {
        const { w, h } = nodeSize(node);
        const style = nodeStyle[node.kind];
        const Icon = flowIcons[node.icon];
        const isAgent = node.kind === "agent";
        const y = node.y - (h - 60) / 2;
        return (
          <g key={`${flow.id}-${node.id}`} transform={`translate(${node.x} ${y})`}>
            <g className={animate ? "flow-node-pop" : undefined} style={{ animationDelay: `${i * 0.1}s` }}>
              {isAgent && (
                <>
                  <rect x="0" y="0" width={w} height={h} rx="14" fill="rgba(59,130,246,0.35)" filter="url(#agent-glow)" />
                  {animate && (
                    <rect x="0" y="0" width={w} height={h} rx="14" fill="none" stroke="#60A5FA" strokeWidth="1.5">
                      <animate attributeName="x" values="0;-14" dur="2.6s" repeatCount="indefinite" />
                      <animate attributeName="y" values="0;-14" dur="2.6s" repeatCount="indefinite" />
                      <animate attributeName="width" values={`${w};${w + 28}`} dur="2.6s" repeatCount="indefinite" />
                      <animate attributeName="height" values={`${h};${h + 28}`} dur="2.6s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.7;0" dur="2.6s" repeatCount="indefinite" />
                    </rect>
                  )}
                </>
              )}
              <rect x="0" y="0" width={w} height={h} rx={isAgent ? 14 : 12} fill={style.fill} stroke={style.stroke} strokeWidth={isAgent ? 1.5 : 1} strokeDasharray={style.dash} />
              <rect x="12" y={h / 2 - 16} width="32" height="32" rx="8" fill={style.iconBg} />
              <Icon x="19" y={h / 2 - 9} width="18" height="18" stroke={style.icon} strokeWidth={1.8} />
              <NodeText node={node} w={w} h={h} />
              <text x={w - 9} y="12" fontSize="8" textAnchor="end" letterSpacing="0.6" fill={isAgent ? "#93C5FD" : "rgba(255,255,255,0.35)"}>
                {kindLabel[node.kind].toUpperCase()}
              </text>
              {isAgent && <circle cx={w - 12} cy={h - 12} r="3.5" fill="#60A5FA" style={{ animation: animate ? "flow-pulse 1.6s ease-in-out infinite" : undefined }} />}
            </g>
          </g>
        );
      })}
    </svg>
  );
};

export default FlowCanvas;
