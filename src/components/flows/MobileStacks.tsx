import { useMemo, useRef } from "react";
import { Bot, Check } from "lucide-react";
import type { AreaFlow, FlowNode } from "@/data/automationFlows";
import type { CompanySystem } from "@/data/agentSystems";
import { flowIcons, Packet } from "@/components/flows/icons";
import { nodeStyle, kindLabel } from "@/components/flows/FlowCanvas";
import { useNodeBoxes, type Box } from "@/components/flows/useConnectors";

const STEP_MS = 0.75;

const statusByKind: Record<FlowNode["kind"], string> = {
  trigger: "Recibido",
  agent: "Procesando",
  tool: "Consultado",
  human: "Aprobado",
  output: "Hecho",
};

const NodeCard = ({ node, animate, order }: { node: FlowNode; animate: boolean; order: number }) => {
  const style = nodeStyle[node.kind];
  const Icon = flowIcons[node.icon];
  const isAgent = node.kind === "agent";
  const delay = `${order * STEP_MS}s`;
  return (
    <div
      data-node-id={node.id}
      className={`relative z-10 flex items-center gap-3 rounded-xl border px-3.5 py-3 ${animate ? "card-activate" : ""} ${isAgent ? "shadow-[0_0_30px_rgba(59,130,246,0.35)]" : ""}`}
      style={{ background: style.fill, borderColor: style.stroke, borderStyle: style.dash ? "dashed" : "solid", animationDelay: delay, backdropFilter: "blur(2px)" }}
    >
      {isAgent && animate && (
        <>
          <span className="absolute inset-0 rounded-xl border border-blue-400/60 hub-ring pointer-events-none" style={{ animationDelay: "0.2s" }} />
          <span className="absolute inset-0 rounded-xl border border-blue-400/40 hub-ring pointer-events-none" style={{ animationDelay: "1.5s" }} />
        </>
      )}
      <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: style.iconBg }}>
        <Icon className="w-5 h-5" style={{ color: style.icon }} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[13px] font-semibold leading-tight" style={{ color: style.text }}>{node.label}</p>
        {node.sub && <p className="text-[11px] leading-snug mt-0.5" style={{ color: style.sub }}>{node.sub}</p>}
      </div>
      <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
        <span className="text-[8px] tracking-wide" style={{ color: isAgent ? "#93C5FD" : "rgba(255,255,255,0.35)" }}>{kindLabel[node.kind].toUpperCase()}</span>
        <span
          className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium ${animate ? "chip-in" : ""} ${
            node.kind === "output" ? "bg-emerald-400/15 text-emerald-300" : node.kind === "human" ? "bg-amber-300/15 text-amber-200" : isAgent ? "bg-blue-500/25 text-blue-100" : "bg-white/[0.08] text-white/70"
          }`}
          style={{ animationDelay: `${order * STEP_MS + 0.45}s` }}
        >
          {isAgent ? (
            <>
              {statusByKind.agent}
              <span className="inline-flex gap-0.5 ml-0.5">
                {[0, 1, 2].map((i) => (
                  <span key={i} className="w-1 h-1 rounded-full bg-current thinking-dot" style={{ animationDelay: `${i * 0.18}s` }} />
                ))}
              </span>
            </>
          ) : (
            <>
              <Check className="w-3 h-3" /> {statusByKind[node.kind]}
            </>
          )}
        </span>
      </div>
    </div>
  );
};

function railPath(src: Box, dst: Box, side: "left" | "right", rail: number) {
  const r = 10;
  if (side === "left") {
    const x0 = src.left;
    const x1 = dst.left;
    const down = dst.cy > src.cy;
    return `M ${x0} ${src.cy} H ${rail + r} Q ${rail} ${src.cy} ${rail} ${src.cy + (down ? r : -r)} V ${dst.cy - (down ? r : -r)} Q ${rail} ${dst.cy} ${rail + r} ${dst.cy} H ${x1}`;
  }
  const x0 = src.right;
  const x1 = dst.right;
  const down = dst.cy > src.cy;
  return `M ${x0} ${src.cy} H ${rail - r} Q ${rail} ${src.cy} ${rail} ${src.cy + (down ? r : -r)} V ${dst.cy - (down ? r : -r)} Q ${rail} ${dst.cy} ${rail - r} ${dst.cy} H ${x1}`;
}

export const FlowStack = ({ flow, animate }: { flow: AreaFlow; animate: boolean }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { boxes, size } = useNodeBoxes(containerRef, [flow.id]);
  const order: FlowNode["kind"][] = ["trigger", "agent", "tool", "human", "output"];
  const nodes = useMemo(() => order.flatMap((kind) => flow.nodes.filter((n) => n.kind === kind)), [flow]); // eslint-disable-line react-hooks/exhaustive-deps
  const byId = useMemo(() => Object.fromEntries(flow.nodes.map((n) => [n.id, n])), [flow]);

  const edges = useMemo(() => {
    let leftIdx = 0;
    let rightIdx = 0;
    return flow.edges.map((edge) => {
      const src = byId[edge.from];
      const dst = byId[edge.to];
      const human = src.kind === "human" || dst.kind === "human";
      if (src.kind === "trigger") return { ...edge, human, side: "center" as const, idx: 0 };
      if (src.kind === "agent") return { ...edge, human, side: "left" as const, idx: leftIdx++ };
      return { ...edge, human, side: "right" as const, idx: rightIdx++ };
    });
  }, [flow, byId]);

  return (
    <div ref={containerRef} className="relative px-6 pt-4 pb-3">
      {size.width > 0 && (
        <svg className="absolute inset-0 w-full h-full pointer-events-none" width={size.width} height={size.height} aria-hidden="true">
          {edges.map((edge, i) => {
            const src = boxes[edge.from];
            const dst = boxes[edge.to];
            if (!src || !dst) return null;
            const d =
              edge.side === "center"
                ? `M ${src.cx} ${src.bottom} L ${dst.cx} ${dst.top}`
                : railPath(src, dst, edge.side, edge.side === "left" ? 10 + edge.idx * 5 : size.width - 10 - edge.idx * 5);
            const color = edge.human ? "#FBBF24" : "#60A5FA";
            return (
              <g key={`${edge.from}-${edge.to}`}>
                <path d={d} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="5" />
                <path d={d} fill="none" stroke={color} strokeOpacity="0.6" strokeWidth="1.5" className={animate ? "flow-edge" : undefined} strokeDasharray={animate ? undefined : "6 6"} />
                {animate && <Packet path={d} color={color} delay={0.5 + i * 0.4} dur={2.2} />}
              </g>
            );
          })}
        </svg>
      )}
      <div className="flex flex-col gap-5">
        {nodes.map((node, i) => (
          <NodeCard key={`${flow.id}-${node.id}`} node={node} animate={animate} order={i} />
        ))}
      </div>
    </div>
  );
};

interface SystemProps {
  system: CompanySystem;
  activeIndex: number;
  animate: boolean;
  onSelect: (index: number) => void;
}

export const SystemStack = ({ system, activeIndex, animate, onSelect }: SystemProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { boxes, size } = useNodeBoxes(containerRef, [system.id]);
  const hub = boxes.hub;

  return (
    <div ref={containerRef} className="relative px-4 pt-4 pb-3">
      {size.width > 0 && hub && (
        <svg className="absolute inset-0 w-full h-full pointer-events-none" width={size.width} height={size.height} aria-hidden="true">
          {system.modules.map((module, i) => {
            const box = boxes[module.id];
            if (!box) return null;
            const active = i === activeIndex;
            const sx = hub.cx + (box.cx - hub.cx) * 0.18;
            const d = `M ${sx} ${hub.bottom - 6} C ${sx} ${hub.bottom + 40}, ${box.cx} ${box.top - 40}, ${box.cx} ${box.top}`;
            return (
              <g key={module.id}>
                <path d={d} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="5" />
                <path d={d} fill="none" stroke={active ? "rgba(96,165,250,0.95)" : "rgba(59,130,246,0.3)"} strokeWidth={active ? 1.8 : 1} className={animate ? "flow-edge" : undefined} strokeDasharray={animate ? undefined : "6 6"} style={{ transition: "stroke 0.5s" }} />
                {animate && active && (
                  <>
                    <Packet path={d} color="#60A5FA" delay={0} dur={1.6} />
                    <Packet path={d} color="#86EFAC" delay={0.8} dur={1.6} reverse />
                  </>
                )}
                {animate && !active && <Packet path={d} color="rgba(96,165,250,0.5)" delay={i * 0.6} dur={4} reverse={i % 2 === 1} />}
              </g>
            );
          })}
        </svg>
      )}

      <div className="relative z-10 mx-auto w-fit mb-12">
        {animate && (
          <>
            <span className="absolute inset-0 rounded-2xl border border-blue-400/60 hub-ring" />
            <span className="absolute inset-0 rounded-2xl border border-blue-400/40 hub-ring" style={{ animationDelay: "1.3s" }} />
          </>
        )}
        <div data-node-id="hub" className="relative rounded-2xl border border-blue-400 bg-[#0D0E11] px-4 py-3 flex items-center gap-3 shadow-[0_0_36px_rgba(59,130,246,0.45)]" style={{ background: "linear-gradient(160deg, rgba(96,165,250,0.35), rgba(0,102,255,0.12) 70%, #0D0E11)" }}>
          <div className="w-10 h-10 rounded-full bg-blue-500/30 flex items-center justify-center flex-shrink-0">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div className="min-w-0 pr-12">
            <p className="text-sm font-semibold text-white leading-tight">{system.hub.label}</p>
            <p className="text-[11px] text-blue-200 leading-tight mt-0.5">{system.hub.sub}</p>
          </div>
          <span className="absolute top-1.5 right-2.5 text-[8px] tracking-wide text-blue-200">AGENTE IA</span>
          <span className="absolute bottom-1.5 right-2.5 w-2 h-2 rounded-full bg-blue-300" style={animate ? { animation: "flow-pulse 1.4s ease-in-out infinite" } : undefined} />
        </div>
      </div>

      <div className="relative z-10 grid grid-cols-2 gap-x-3 gap-y-4">
        {system.modules.map((module, i) => {
          const active = i === activeIndex;
          const Icon = flowIcons[module.icon];
          return (
            <button
              key={module.id}
              data-node-id={module.id}
              onClick={() => onSelect(i)}
              aria-pressed={active}
              className={`text-left rounded-xl border px-3 py-2.5 transition-all duration-300 ${animate ? "flow-node" : ""} ${
                active ? "border-blue-400 bg-blue-500/15 shadow-[0_0_26px_rgba(59,130,246,0.4)] scale-[1.02]" : "border-white/15 bg-[#141518]"
              }`}
              style={{ animationDelay: `${0.15 + i * 0.08}s` }}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <div className={`w-7 h-7 rounded-md flex items-center justify-center ${active ? "bg-blue-500/35" : "bg-white/[0.06]"}`}>
                  <Icon className={`w-4 h-4 ${active ? "text-blue-200" : "text-gray-200"}`} />
                </div>
                <span className={`text-[8px] tracking-wide ml-auto ${active ? "text-blue-300" : "text-white/35"}`}>{active ? "EN USO" : "HERRAMIENTA"}</span>
              </div>
              <p className="text-[12px] font-semibold text-white leading-tight">{module.name}</p>
              <p className={`text-[10px] leading-snug mt-0.5 ${active ? "text-blue-200" : "text-white/50"}`}>{module.short}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
};
