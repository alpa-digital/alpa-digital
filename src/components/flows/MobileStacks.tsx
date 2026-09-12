import { useMemo, useRef } from "react";
import { Bot, Check } from "lucide-react";
import type { AreaFlow, FlowNode } from "@/data/automationFlows";
import type { CompanySystem } from "@/data/agentSystems";
import { flowIcons, Packet } from "@/components/flows/icons";
import { nodeStyle, useKindLabel } from "@/components/flows/FlowCanvas";
import { useCopy } from "@/i18n";
import { useNodeBoxes } from "@/components/flows/useConnectors";

const STEP_S = 0.7;
const SPINE_X = 18;

/** Estado que se muestra en la tarjeta de cada nodo, en el idioma activo. */
const useStatusLabel = (): Record<FlowNode["kind"], string> => {
  const c = useCopy();
  return { trigger: c.flows.received, agent: c.flows.processing, tool: c.flows.consulted, human: c.flows.approved, output: c.flows.done };
};

const StatusChip = ({ kind, animate, delay }: { kind: FlowNode["kind"]; animate: boolean; delay: number }) => {
  const statusByKind = useStatusLabel();
  const isAgent = kind === "agent";
  const tone =
    kind === "output" ? "bg-emerald-400/15 text-emerald-300" : kind === "human" ? "bg-amber-300/15 text-amber-200" : isAgent ? "bg-blue-500/25 text-blue-100" : "bg-white/[0.08] text-white/70";
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium ${tone} ${animate ? "chip-in" : ""}`} style={{ animationDelay: `${delay}s` }}>
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
          <Check className="w-3 h-3" /> {statusByKind[kind]}
        </>
      )}
    </span>
  );
};

const NodeCard = ({ node, animate, order, indent }: { node: FlowNode; animate: boolean; order: number; indent: boolean }) => {
  const kindLabel = useKindLabel();
  const style = nodeStyle[node.kind];
  const Icon = flowIcons[node.icon];
  const isAgent = node.kind === "agent";
  return (
    <div className={indent ? "pl-12" : "pl-8"}>
      <div
        data-node-id={node.id}
        className={`relative flex items-center gap-3 rounded-xl border px-3 py-2.5 ${animate ? "card-glow" : ""} ${isAgent ? "shadow-[0_0_28px_rgba(59,130,246,0.35)]" : ""}`}
        style={{ background: style.fill, borderColor: style.stroke, borderStyle: style.dash ? "dashed" : "solid", animationDelay: `${order * STEP_S}s` }}
      >
        {isAgent && animate && <span className="absolute inset-0 rounded-xl border border-blue-400/60 card-ring pointer-events-none" />}
        <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: style.iconBg }}>
          <Icon className="w-4 h-4" style={{ color: style.icon }} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[13px] font-semibold leading-tight" style={{ color: style.text }} title={kindLabel[node.kind]}>{node.label}</p>
          {node.sub && <p className="text-[11px] leading-snug mt-0.5" style={{ color: style.sub }}>{node.sub}</p>}
        </div>
        <div className="flex-shrink-0">
          <StatusChip kind={node.kind} animate={animate} delay={order * STEP_S + 0.35} />
        </div>
      </div>
    </div>
  );
};

export const FlowStack = ({ flow, animate }: { flow: AreaFlow; animate: boolean }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { boxes, size } = useNodeBoxes(containerRef, [flow.id]);
  const nodes = useMemo(() => {
    const order: FlowNode["kind"][] = ["trigger", "agent", "tool", "human", "output"];
    return order.flatMap((kind) => flow.nodes.filter((n) => n.kind === kind));
  }, [flow]);
  const first = boxes[nodes[0]?.id];
  const last = boxes[nodes[nodes.length - 1]?.id];
  const spine = first && last ? `M ${SPINE_X} ${first.cy} V ${last.cy}` : null;

  return (
    <div ref={containerRef} className="relative px-4 pt-4 pb-3">
      {size.width > 0 && spine && (
        <svg className="absolute inset-0 w-full h-full pointer-events-none" width={size.width} height={size.height} aria-hidden="true">
          <path d={spine} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="6" />
          <path d={spine} fill="none" stroke="rgba(96,165,250,0.7)" strokeWidth="1.5" className={animate ? "flow-edge" : undefined} strokeDasharray={animate ? undefined : "6 6"} />
          {animate && (
            <>
              <Packet path={spine} color="#60A5FA" delay={0.3} dur={3.2} />
              <Packet path={spine} color="#60A5FA" delay={1.9} dur={3.2} />
            </>
          )}
          {nodes.map((node, i) => {
            const box = boxes[node.id];
            if (!box) return null;
            const human = node.kind === "human";
            const color = human ? "#FBBF24" : node.kind === "output" ? "#4ADE80" : "#60A5FA";
            const stub = `M ${SPINE_X} ${box.cy} H ${box.left}`;
            return (
              <g key={node.id}>
                <path d={stub} fill="none" stroke={color} strokeOpacity="0.55" strokeWidth="1.5" strokeDasharray={human ? "4 4" : undefined} />
                <circle cx={SPINE_X} cy={box.cy} r="4.5" fill="#0D0E11" stroke={color} strokeWidth="1.5" />
                {animate && <circle cx={SPINE_X} cy={box.cy} r="4.5" fill={color} opacity="0" style={{ animation: `flow-fade-in 0.5s ease-out ${i * STEP_S}s forwards` }} />}
                {animate && <Packet path={stub} color={color} delay={i * STEP_S + 0.15} dur={0.9} />}
              </g>
            );
          })}
        </svg>
      )}
      <div className="flex flex-col gap-3">
        {nodes.map((node, i) => (
          <NodeCard key={`${flow.id}-${node.id}`} node={node} animate={animate} order={i} indent={node.kind === "tool" || node.kind === "human"} />
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
  const c = useCopy();
  const containerRef = useRef<HTMLDivElement>(null);
  const { boxes, size } = useNodeBoxes(containerRef, [system.id]);
  const hub = boxes.hub;
  const lastRow = boxes[system.modules[system.modules.length - 1]?.id];
  const trunkX = size.width / 2;
  const lastCentered = !!lastRow && Math.abs(lastRow.cx - trunkX) < 6;
  const trunk = hub && lastRow ? `M ${trunkX} ${hub.bottom} V ${lastCentered ? lastRow.top : lastRow.cy}` : null;

  return (
    <div ref={containerRef} className="relative px-4 pt-4 pb-3">
      {size.width > 0 && trunk && (
        <svg className="absolute inset-0 w-full h-full pointer-events-none" width={size.width} height={size.height} aria-hidden="true">
          <path d={trunk} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="6" />
          <path d={trunk} fill="none" stroke="rgba(96,165,250,0.7)" strokeWidth="1.5" className={animate ? "flow-edge" : undefined} strokeDasharray={animate ? undefined : "6 6"} />
          {animate && <Packet path={trunk} color="#60A5FA" delay={0.2} dur={2.6} />}
          {system.modules.map((module, i) => {
            const box = boxes[module.id];
            if (!box) return null;
            const active = i === activeIndex;
            const centered = Math.abs(box.cx - trunkX) < 6;
            const leftSide = box.cx < trunkX;
            const joinY = centered ? box.top : box.cy;
            const stub = centered ? `M ${trunkX} ${joinY - 14} V ${joinY}` : `M ${trunkX} ${box.cy} H ${leftSide ? box.right : box.left}`;
            return (
              <g key={module.id}>
                <path d={stub} fill="none" stroke={active ? "rgba(96,165,250,0.95)" : "rgba(96,165,250,0.35)"} strokeWidth={active ? 1.8 : 1.2} style={{ transition: "stroke 0.4s" }} />
                <circle cx={trunkX} cy={joinY} r="4.5" fill={active ? "#60A5FA" : "#0D0E11"} stroke="#60A5FA" strokeWidth="1.5" style={{ transition: "fill 0.4s" }} />
                {animate && active && (
                  <>
                    <Packet path={stub} color="#60A5FA" delay={0} dur={1.2} />
                    <Packet path={stub} color="#86EFAC" delay={0.6} dur={1.2} reverse />
                  </>
                )}
              </g>
            );
          })}
        </svg>
      )}

      <div className="relative z-10 mx-auto w-fit mb-8">
        {animate && (
          <>
            <span className="absolute inset-0 rounded-2xl border border-blue-400/60 hub-ring" />
            <span className="absolute inset-0 rounded-2xl border border-blue-400/40 hub-ring" style={{ animationDelay: "1.3s" }} />
          </>
        )}
        <div data-node-id="hub" className="relative rounded-2xl border border-blue-400 px-4 py-3 flex items-center gap-3 shadow-[0_0_36px_rgba(59,130,246,0.45)]" style={{ background: "linear-gradient(160deg, rgba(96,165,250,0.35), rgba(0,102,255,0.12) 70%, #0D0E11)" }}>
          <div className="w-10 h-10 rounded-full bg-blue-500/30 flex items-center justify-center flex-shrink-0">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div className="min-w-0 pr-12">
            <p className="text-sm font-semibold text-white leading-tight">{system.hub.label}</p>
            <p className="text-[11px] text-blue-200 leading-tight mt-0.5">{system.hub.sub}</p>
          </div>
          <span className="absolute top-1.5 right-2.5 text-[8px] tracking-wide text-blue-200">{c.flows.agent.toUpperCase()}</span>
          <span className="absolute bottom-1.5 right-2.5 w-2 h-2 rounded-full bg-blue-300" style={animate ? { animation: "flow-pulse 1.4s ease-in-out infinite" } : undefined} />
        </div>
      </div>

      <div className="relative z-10 grid grid-cols-2 gap-x-8 gap-y-4">
        {system.modules.map((module, i) => {
          const active = i === activeIndex;
          const Icon = flowIcons[module.icon];
          return (
            <button
              key={module.id}
              data-node-id={module.id}
              onClick={() => onSelect(i)}
              aria-pressed={active}
              className={`text-left rounded-xl border px-3 py-2.5 transition-all duration-300 ${
                active ? "border-blue-400 bg-blue-500/15 shadow-[0_0_26px_rgba(59,130,246,0.4)]" : "border-white/15 bg-[#141518]"
              } ${i === system.modules.length - 1 && system.modules.length % 2 === 1 ? "col-span-2 max-w-[calc(50%-1rem)] mx-auto w-full" : ""}`}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <div className={`w-7 h-7 rounded-md flex items-center justify-center ${active ? "bg-blue-500/35" : "bg-white/[0.06]"}`}>
                  <Icon className={`w-4 h-4 ${active ? "text-blue-200" : "text-gray-200"}`} />
                </div>
                <span className={`text-[8px] tracking-wide ml-auto ${active ? "text-blue-300" : "text-white/35"}`}>{(active ? c.flows.inUse : c.flows.tool).toUpperCase()}</span>
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
