import { useState } from "react";
import { Lock, Mail, Calendar, CheckCircle2, Loader2, ArrowRight, Globe, Building2, Clock, Sparkles, AlertCircle } from "lucide-react";
import { domainFromUrl, type ScanArea, type ScanResult } from "@/lib/scanFallback";
import { useCopy } from "@/i18n";
import { useMediaQuery } from "@/hooks/useMediaQuery";

interface Props {
  result: ScanResult;
  url: string;
  sample?: boolean;
  email?: string;
  emailError?: string | null;
  sending?: boolean;
  sent?: boolean;
  onEmailChange?: (value: string) => void;
  onSubmitLead?: (e: React.FormEvent) => void;
}

const CX = 300;
const CY = 178;
const positions = [
  { x: 300, y: 64 },
  { x: 500, y: 120 },
  { x: 500, y: 236 },
  { x: 300, y: 296 },
  { x: 100, y: 236 },
  { x: 100, y: 120 },
];
const RING_R = 25;
const RING_C = 2 * Math.PI * RING_R;

export const faviconUrl = (domain: string) => `https://www.google.com/s2/favicons?domain=${encodeURIComponent(domain)}&sz=128`;

const CompanyMark = ({ domain, favicon, name, size }: { domain: string; favicon?: string; name: string; size: number }) => {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <div className="rounded-xl bg-primary/20 text-white font-semibold flex items-center justify-center flex-shrink-0" style={{ width: size, height: size, fontSize: size * 0.42 }}>
        {name.charAt(0).toUpperCase()}
      </div>
    );
  }
  return (
    <div className="rounded-xl bg-white/90 flex items-center justify-center overflow-hidden flex-shrink-0" style={{ width: size, height: size }}>
      <img src={favicon ?? faviconUrl(domain)} alt="" width={size * 0.68} height={size * 0.68} className="object-contain" onError={() => setFailed(true)} />
    </div>
  );
};

/** Versión móvil del mapa: rejilla de áreas con su anillo de puntuación. */
const AreaGrid = ({ ordered }: { ordered: ScanArea[] }) => {
  const c = useCopy();
  return (
  <div className="grid grid-cols-3 gap-2 px-4 pb-4">
    {ordered.map((area, i) => {
      const top = i < 2;
      const r = 18;
      const circumference = 2 * Math.PI * r;
      return (
        <div
          key={area.id}
          className={`relative rounded-xl border px-2 py-2.5 text-center flow-node-pop ${top ? "border-blue-400/50 bg-blue-500/10 shadow-[0_0_22px_rgba(59,130,246,0.25)]" : "border-white/10 bg-white/[0.03]"}`}
          style={{ animationDelay: `${i * 0.1}s` }}
        >
          <div className="relative w-12 h-12 mx-auto">
            {top && <span className="absolute inset-0 rounded-full border border-blue-400/50 hub-ring" style={{ animationDelay: `${i * 0.8}s` }} />}
            <svg viewBox="0 0 48 48" className="w-12 h-12">
              <circle cx="24" cy="24" r={r} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="4" />
              <circle
                cx="24" cy="24" r={r} fill="none" stroke={top ? "#60A5FA" : "rgba(255,255,255,0.35)"} strokeWidth="4" strokeLinecap="round"
                strokeDasharray={circumference} strokeDashoffset={circumference - (area.score / 100) * circumference} transform="rotate(-90 24 24)"
                className="ring-fill" style={{ ["--ring-c" as string]: circumference, ["--ring-off" as string]: circumference - (area.score / 100) * circumference, animationDelay: `${0.2 + i * 0.12}s` }}
              />
              <text x="24" y="28" fontSize="12" fontWeight="700" fill={top ? "#FFFFFF" : "rgba(255,255,255,0.75)"} textAnchor="middle">{area.score}</text>
            </svg>
            {top ? (
              <span className="absolute -top-1 -right-1 rounded-full bg-blue-600 text-white text-[8px] font-bold px-1.5 py-0.5">Nº {i + 1}</span>
            ) : (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#0D0E11] border border-white/20 flex items-center justify-center"><Lock className="w-2.5 h-2.5 text-white/60" /></span>
            )}
          </div>
          <p className={`text-[11px] font-semibold leading-tight mt-1.5 ${top ? "text-white" : "text-white/60"}`}>{c.result.areas[area.id]}</p>
          <p className={`text-[10px] mt-0.5 ${top ? "text-blue-300" : "text-white/40"}`}>{top ? `≈ ${area.hoursPerWeek} ${c.result.perWeekShort}` : `${i + 1}${c.result.priority}`}</p>
        </div>
      );
    })}
  </div>
  );
};

const ScanResultCard = ({ result, url, sample = false, email = "", emailError, sending, sent, onEmailChange, onSubmitLead }: Props) => {
  const c = useCopy();
  const isWide = useMediaQuery("(min-width: 640px)");
  const domain = domainFromUrl(url);
  const ordered = [...result.areas].sort((a, b) => b.score - a.score);
  const revealed = ordered.slice(0, 2);
  const locked = ordered.slice(2);
  const totalHours = ordered.reduce((sum, a) => sum + a.hoursPerWeek, 0);
  const isEstimate = result.source !== "analysis";

  return (
    <div className="rounded-2xl border border-white/10 bg-[#0D0E11] text-white shadow-2xl shadow-black/40 overflow-hidden relative">
      {sample && (
        <span className="absolute top-3 right-3 z-10 text-[10px] uppercase tracking-wide rounded-full border border-white/15 bg-white/[0.06] text-white/70 px-2 py-0.5">
          Ejemplo
        </span>
      )}
      <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        {/* Izquierda: identidad + mapa */}
        <div className="border-b lg:border-b-0 lg:border-r border-white/10 flex flex-col">
          <div className="px-5 pt-5 pb-3">
            <div className="flex items-center gap-3">
              <CompanyMark domain={domain} favicon={result.favicon} name={result.company} size={44} />
              <div className="min-w-0">
                <h3 className="text-lg font-medium leading-tight truncate">{result.company}</h3>
                <p className="text-xs text-white/50 inline-flex items-center gap-1 mt-0.5"><Globe className="w-3 h-3" /> {domain}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-1.5 mt-3">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-400/40 bg-blue-500/15 text-blue-200 px-2.5 py-0.5 text-[11px]">
                <Building2 className="w-3 h-3" /> {result.sector}
              </span>
              <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] ${isEstimate ? "border-amber-300/40 bg-amber-400/10 text-amber-200" : "border-emerald-400/30 bg-emerald-400/10 text-emerald-200"}`}>
                {isEstimate ? <AlertCircle className="w-3 h-3" /> : <Sparkles className="w-3 h-3" />}
                {isEstimate ? c.result.fromSector : c.result.fromWeb}
              </span>
            </div>
            {isEstimate && result.note && <p className="text-[11px] text-amber-200/80 mt-2 leading-snug">{result.note}</p>}
          </div>

          {!isWide && <AreaGrid ordered={ordered} />}
          {isWide && (
          <div className="flex-1 flex items-center pb-2">
          <svg viewBox="0 0 600 366" className="w-full h-auto block" role="img" aria-label={`Mapa de automatización de ${result.company}`}>
            <defs>
              <pattern id="scan-grid" width="24" height="24" patternUnits="userSpaceOnUse">
                <circle cx="1" cy="1" r="1" fill="rgba(255,255,255,0.07)" />
              </pattern>
              <filter id="scan-glow" x="-60%" y="-60%" width="220%" height="220%">
                <feGaussianBlur stdDeviation="9" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <clipPath id="scan-center-clip">
                <circle cx={CX} cy={CY} r="23" />
              </clipPath>
            </defs>
            <rect width="600" height="366" fill="url(#scan-grid)" />

            {ordered.map((area, i) => {
              const pos = positions[i];
              const top = i < 2;
              return (
                <line key={`${area.id}-line`} x1={CX} y1={CY} x2={pos.x} y2={pos.y}
                  stroke={top ? "rgba(96,165,250,0.85)" : "rgba(255,255,255,0.14)"} strokeWidth={top ? 1.6 : 1}
                  className={top ? "flow-edge" : undefined} strokeDasharray={top ? undefined : "3 6"} />
              );
            })}

            <g transform={`translate(${CX} ${CY})`}>
              <circle r="32" fill="rgba(59,130,246,0.35)" filter="url(#scan-glow)" />
              <circle r="29" fill="#141518" stroke="#60A5FA" strokeWidth="1.5" />
              <circle r="23" fill="#FFFFFF" fillOpacity="0.92" />
              <text y="6" fontSize="18" fontWeight="700" fill="#0D0E11" textAnchor="middle">{result.company.charAt(0).toUpperCase()}</text>
              <image href={result.favicon ?? faviconUrl(domain)} x="-16" y="-16" width="32" height="32" clipPath="url(#scan-center-clip)" preserveAspectRatio="xMidYMid meet" />
            </g>

            {ordered.map((area, i) => {
              const pos = positions[i];
              const top = i < 2;
              const dash = (area.score / 100) * RING_C;
              const above = pos.y < CY;
              const labelY = above ? -RING_R - 21 : RING_R + 20;
              return (
                <g key={area.id} transform={`translate(${pos.x} ${pos.y})`}>
                  <g className="flow-node-pop" style={{ animationDelay: `${0.15 + i * 0.08}s` }}>
                    {top && <circle r={RING_R + 7} fill="rgba(59,130,246,0.3)" filter="url(#scan-glow)" />}
                    <circle r={RING_R} fill={top ? "rgba(0,102,255,0.18)" : "#141518"} stroke="rgba(255,255,255,0.1)" strokeWidth="4" />
                    <circle r={RING_R} fill="none" stroke={top ? "#60A5FA" : "rgba(255,255,255,0.35)"} strokeWidth="4" strokeLinecap="round"
                      strokeDasharray={`${dash} ${RING_C}`} transform="rotate(-90)" />
                    <text y="5" fontSize="13" fontWeight="700" fill={top ? "#FFFFFF" : "rgba(255,255,255,0.75)"} textAnchor="middle" style={{ fontVariantNumeric: "tabular-nums" }}>{area.score}</text>
                    {top ? (
                      <g transform="translate(22 20)">
                        <rect x="-15" y="-8" width="30" height="16" rx="8" fill="#2563EB" />
                        <text y="3.5" fontSize="9" fontWeight="700" fill="#FFFFFF" textAnchor="middle">Nº {i + 1}</text>
                      </g>
                    ) : (
                      <g transform="translate(20 18)">
                        <circle r="8" fill="#0D0E11" stroke="rgba(255,255,255,0.2)" />
                        <Lock x="-4.5" y="-4.5" width="9" height="9" stroke="rgba(255,255,255,0.6)" strokeWidth={2} />
                      </g>
                    )}
                    <text y={labelY} fontSize="11" fontWeight="600" fill={top ? "#FFFFFF" : "rgba(255,255,255,0.6)"} textAnchor="middle">{c.result.areas[area.id]}</text>
                    <text y={labelY + 13} fontSize="9.5" fill={top ? "#93C5FD" : "rgba(255,255,255,0.4)"} textAnchor="middle">
                      {top ? `≈ ${area.hoursPerWeek} ${c.result.perWeekLong}` : `${i + 1}${c.result.priority}`}
                    </text>
                  </g>
                </g>
              );
            })}
          </svg>
          </div>
          )}
        </div>

        {/* Derecha: cifras, propuestas y captación */}
        <div className="flex flex-col">
          <div className="grid grid-cols-3 border-b border-white/10">
            {[
              { value: `${totalHours} h`, label: c.result.statHours, Icon: Clock },
              { value: String(revealed.length), label: c.result.statTop, Icon: Sparkles },
              { value: String(ordered.length), label: c.result.statAreas, Icon: Building2 },
            ].map(({ value, label, Icon }, i) => (
              <div key={label} className={`px-4 py-3 ${i > 0 ? "border-l border-white/10" : ""}`}>
                <p className="text-xl md:text-2xl font-semibold tracking-tight leading-none" style={{ fontVariantNumeric: "tabular-nums" }}>{value}</p>
                <p className="text-[10px] text-white/45 mt-1.5 inline-flex items-center gap-1"><Icon className="w-3 h-3" /> {label}</p>
              </div>
            ))}
          </div>

          <div className="px-5 py-4 border-b border-white/10">
            <p className="text-[13px] text-white/65 leading-snug mb-3">{result.summary}</p>
            <p className="text-[10px] uppercase tracking-wide text-white/40 mb-2">{c.result.whereToStart}</p>
            <div className="space-y-2">
              {revealed.map((area, i) => (
                <article key={area.id} className="rounded-lg border border-blue-400/30 bg-blue-500/10 px-3.5 py-2.5">
                  <div className="flex items-center justify-between gap-3">
                    <span className="inline-flex items-center gap-2 text-[11px] font-medium text-blue-200 min-w-0">
                      <span className="w-4 h-4 rounded-full bg-blue-600 text-white text-[9px] font-bold flex items-center justify-center flex-shrink-0">{i + 1}</span>
                      <span className="truncate">{c.result.areas[area.id]}</span>
                    </span>
                    <span className="text-[11px] text-white/50 flex-shrink-0" style={{ fontVariantNumeric: "tabular-nums" }}>≈ {area.hoursPerWeek} {c.result.perWeekShort}</span>
                  </div>
                  <h4 className="text-sm font-medium mt-1 leading-snug">{area.title}</h4>
                  <p className="text-xs text-white/55 leading-snug mt-0.5 line-clamp-2">{area.description}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="px-5 py-4 flex-1 flex flex-col justify-end">
            <div className="flex flex-wrap gap-1.5 mb-3">
              {locked.map((area) => (
                <span key={area.id} className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] text-white/55 px-2 py-0.5 text-[11px]">
                  <Lock className="w-3 h-3" /> {c.result.areas[area.id]}
                </span>
              ))}
            </div>
            <p className="text-sm font-medium leading-snug">{locked.length} {locked.length === 1 ? c.result.lockedOne : c.result.lockedMany}</p>
            {sample ? (
              <p className="text-xs text-white/50 mt-2">{c.result.sampleHint}</p>
            ) : sent ? (
              <p className="inline-flex items-center gap-2 text-sm text-emerald-300 mt-3"><CheckCircle2 className="w-4 h-4" /> {c.result.sent}</p>
            ) : (
              <form onSubmit={onSubmitLead} className="mt-3">
                <div className="flex gap-2">
                  <div className="relative flex-1 min-w-0">
                    <Mail className="w-4 h-4 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input type="email" value={email} onChange={(e) => onEmailChange?.(e.target.value)} placeholder={c.result.emailPlaceholder} aria-label={c.result.emailLabel}
                      className={`w-full rounded-full border bg-black/40 text-white placeholder:text-white/35 pl-9 pr-3 py-2 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/25 ${emailError ? "border-red-400" : "border-white/15"}`} />
                  </div>
                  <button type="submit" disabled={sending} className="inline-flex items-center gap-1.5 bg-primary text-white rounded-full px-4 py-2 text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-70 flex-shrink-0">
                    {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <ArrowRight className="w-4 h-4" />}
                    {c.result.emailButton}
                  </button>
                </div>
                {emailError && <p className="text-xs text-red-300 mt-1.5">{emailError}</p>}
              </form>
            )}
            {!sample && (
              <a href="https://cal.com/alpa-digital-studio/30min?user=alpa-digital-studio&overlayCalendar=true" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs text-blue-300 mt-3 hover:underline">
                <Calendar className="w-3.5 h-3.5" /> {c.result.callLink}
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScanResultCard;
