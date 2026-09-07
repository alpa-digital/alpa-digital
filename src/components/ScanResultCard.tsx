import { useState } from "react";
import { Lock, Mail, Calendar, CheckCircle2, Loader2, ArrowRight, Globe, Building2, Clock, Sparkles } from "lucide-react";
import { areaNames, domainFromUrl, type ScanResult } from "@/lib/scanFallback";

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

const positions = [
  { x: 320, y: 52 },
  { x: 540, y: 122 },
  { x: 540, y: 262 },
  { x: 320, y: 332 },
  { x: 100, y: 262 },
  { x: 100, y: 122 },
];

const RING_R = 27;
const RING_C = 2 * Math.PI * RING_R;

export const faviconUrl = (domain: string) => `https://www.google.com/s2/favicons?domain=${encodeURIComponent(domain)}&sz=128`;

const CompanyMark = ({ domain, favicon, name, size }: { domain: string; favicon?: string; name: string; size: number }) => {
  const [failed, setFailed] = useState(false);
  const src = favicon ?? faviconUrl(domain);
  if (failed) {
    return (
      <div className="rounded-xl bg-primary/20 text-white font-semibold flex items-center justify-center" style={{ width: size, height: size, fontSize: size * 0.42 }}>
        {name.charAt(0).toUpperCase()}
      </div>
    );
  }
  return (
    <div className="rounded-xl bg-white/90 flex items-center justify-center overflow-hidden" style={{ width: size, height: size }}>
      <img src={src} alt="" width={size * 0.7} height={size * 0.7} className="object-contain" onError={() => setFailed(true)} />
    </div>
  );
};

const ScanResultCard = ({ result, url, sample = false, email = "", emailError, sending, sent, onEmailChange, onSubmitLead }: Props) => {
  const domain = domainFromUrl(url);
  const ordered = [...result.areas].sort((a, b) => b.score - a.score);
  const revealed = ordered.slice(0, 2);
  const locked = ordered.slice(2);
  const totalHours = ordered.reduce((sum, a) => sum + a.hoursPerWeek, 0);
  const rank = (id: string) => ordered.findIndex((a) => a.id === id);

  return (
    <div className="rounded-2xl border border-white/10 bg-[#0D0E11] text-white shadow-2xl shadow-black/40 overflow-hidden relative">
      {sample && (
        <span className="absolute top-4 right-4 z-10 text-[11px] uppercase tracking-wide rounded-full border border-white/15 bg-white/[0.06] text-white/70 px-2.5 py-1">
          Ejemplo
        </span>
      )}

      {/* Identidad */}
      <div className="px-6 md:px-7 pt-6 pb-5 border-b border-white/10">
        <div className="flex items-start gap-4">
          <CompanyMark domain={domain} favicon={result.favicon} name={result.company} size={52} />
          <div className="min-w-0 flex-1">
            <h3 className="text-xl md:text-2xl font-medium truncate">{result.company}</h3>
            <p className="text-sm text-white/50 inline-flex items-center gap-1.5 mt-0.5"><Globe className="w-3.5 h-3.5" /> {domain}</p>
            <div className="flex flex-wrap gap-2 mt-3">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-400/40 bg-blue-500/15 text-blue-200 px-2.5 py-1 text-xs">
                <Building2 className="w-3.5 h-3.5" /> {result.sector}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.04] text-white/60 px-2.5 py-1 text-xs">
                <Sparkles className="w-3.5 h-3.5" /> {result.source === "analysis" ? "Sector y propuestas leídos de tu web" : "Estimación inicial sin leer la web"}
              </span>
            </div>
          </div>
        </div>
        <p className="text-sm md:text-[15px] text-white/65 mt-4 leading-relaxed">{result.summary}</p>
      </div>

      {/* Cifras */}
      <div className="grid grid-cols-3 border-b border-white/10">
        {[
          { value: `${totalHours} h`, label: "a la semana automatizables", Icon: Clock },
          { value: String(revealed.length), label: "automatizaciones prioritarias", Icon: Sparkles },
          { value: String(ordered.length), label: "áreas analizadas", Icon: Building2 },
        ].map(({ value, label, Icon }, i) => (
          <div key={label} className={`px-4 md:px-6 py-4 ${i > 0 ? "border-l border-white/10" : ""}`}>
            <p className="text-2xl md:text-3xl font-semibold tracking-tight" style={{ fontVariantNumeric: "tabular-nums" }}>{value}</p>
            <p className="text-[11px] md:text-xs text-white/45 mt-1 inline-flex items-center gap-1"><Icon className="w-3 h-3" /> {label}</p>
          </div>
        ))}
      </div>

      {/* Mapa */}
      <div className="px-2 md:px-4 pt-3 border-b border-white/10">
        <svg viewBox="0 0 640 384" className="w-full h-auto" role="img" aria-label={`Mapa de automatización de ${result.company}`}>
          <defs>
            <pattern id="scan-grid" width="24" height="24" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" fill="rgba(255,255,255,0.07)" />
            </pattern>
            <filter id="scan-glow" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="10" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <clipPath id="scan-center-clip">
              <circle cx="320" cy="192" r="26" />
            </clipPath>
          </defs>
          <rect width="640" height="384" fill="url(#scan-grid)" />

          {ordered.map((area, i) => {
            const pos = positions[i];
            const top = i < 2;
            return (
              <line
                key={`${area.id}-line`}
                x1="320" y1="192" x2={pos.x} y2={pos.y}
                stroke={top ? "rgba(96,165,250,0.85)" : "rgba(255,255,255,0.14)"}
                strokeWidth={top ? 1.6 : 1}
                className={top ? "flow-edge" : undefined}
                strokeDasharray={top ? undefined : "3 6"}
              />
            );
          })}

          {/* Empresa en el centro */}
          <g transform="translate(320 192)">
            <circle r="36" fill="rgba(59,130,246,0.35)" filter="url(#scan-glow)" />
            <circle r="32" fill="#141518" stroke="#60A5FA" strokeWidth="1.5" />
            <circle r="26" fill="#FFFFFF" fillOpacity="0.92" />
            <text y="7" fontSize="20" fontWeight="700" fill="#0D0E11" textAnchor="middle">{result.company.charAt(0).toUpperCase()}</text>
            <image
              href={result.favicon ?? faviconUrl(domain)}
              x="-18" y="-18" width="36" height="36"
              clipPath="url(#scan-center-clip)"
              preserveAspectRatio="xMidYMid meet"
            />
            <text y="52" fontSize="11" fill="rgba(255,255,255,0.6)" textAnchor="middle">{domain}</text>
          </g>

          {ordered.map((area, i) => {
            const pos = positions[i];
            const top = i < 2;
            const dash = (area.score / 100) * RING_C;
            const labelY = pos.y < 192 ? pos.y - 40 : pos.y + 48;
            return (
              <g key={area.id} transform={`translate(${pos.x} ${pos.y})`}>
              <g className="flow-node-pop" style={{ animationDelay: `${0.15 + i * 0.08}s` }}>
                {top && <circle r={RING_R + 8} fill="rgba(59,130,246,0.3)" filter="url(#scan-glow)" />}
                <circle r={RING_R} fill={top ? "rgba(0,102,255,0.18)" : "#141518"} stroke="rgba(255,255,255,0.1)" strokeWidth="4" />
                <circle
                  r={RING_R}
                  fill="none"
                  stroke={top ? "#60A5FA" : "rgba(255,255,255,0.35)"}
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeDasharray={`${dash} ${RING_C}`}
                  transform="rotate(-90)"
                  style={{ transition: "stroke-dasharray 1s ease-out" }}
                />
                <text y="5" fontSize="14" fontWeight="700" fill={top ? "#FFFFFF" : "rgba(255,255,255,0.75)"} textAnchor="middle" style={{ fontVariantNumeric: "tabular-nums" }}>{area.score}</text>
                {top ? (
                  <g transform="translate(24 22)">
                    <rect x="-16" y="-9" width="32" height="18" rx="9" fill="#2563EB" />
                    <text y="4" fontSize="9.5" fontWeight="700" fill="#FFFFFF" textAnchor="middle">Nº {i + 1}</text>
                  </g>
                ) : (
                  <g transform="translate(22 20)">
                    <circle r="9" fill="#0D0E11" stroke="rgba(255,255,255,0.2)" />
                    <Lock x="-5" y="-5" width="10" height="10" stroke="rgba(255,255,255,0.6)" strokeWidth={2} />
                  </g>
                )}
                <text y={labelY - pos.y} fontSize="11.5" fontWeight="600" fill={top ? "#FFFFFF" : "rgba(255,255,255,0.6)"} textAnchor="middle">{areaNames[area.id]}</text>
                <text y={labelY - pos.y + 14} fontSize="10" fill={top ? "#93C5FD" : "rgba(255,255,255,0.4)"} textAnchor="middle">
                  {top ? `≈ ${area.hoursPerWeek} h/semana` : `${rank(area.id) + 1}ª prioridad`}
                </text>
              </g>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Automatizaciones reveladas */}
      <div className="px-6 md:px-7 py-6 space-y-3 border-b border-white/10">
        <p className="text-[11px] uppercase tracking-wide text-white/40">Por dónde empezaríamos</p>
        {revealed.map((area, i) => (
          <article key={area.id} className="rounded-xl border border-blue-400/30 bg-blue-500/10 p-4 md:p-5">
            <div className="flex items-center justify-between gap-3 mb-1.5">
              <span className="inline-flex items-center gap-2 text-xs font-medium text-blue-200">
                <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center">{i + 1}</span>
                {areaNames[area.id]}
              </span>
              <span className="text-xs text-white/50" style={{ fontVariantNumeric: "tabular-nums" }}>≈ {area.hoursPerWeek} h/semana</span>
            </div>
            <h4 className="text-base md:text-lg font-medium">{area.title}</h4>
            <p className="text-sm text-white/60 leading-relaxed mt-1">{area.description}</p>
          </article>
        ))}
      </div>

      {/* Bloqueadas + captación */}
      <div className="px-6 md:px-7 py-6 grid md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] gap-5 items-start">
        <ul className="space-y-2 min-w-0">
          {locked.map((area) => (
            <li key={area.id} className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-sm overflow-hidden">
              <Lock className="w-3.5 h-3.5 text-white/40 flex-shrink-0" />
              <span className="text-white/70 w-28 md:w-32 flex-shrink-0 truncate">{areaNames[area.id]}</span>
              <span className="text-white/25 blur-[4px] select-none truncate min-w-0" aria-hidden="true">{area.title}</span>
            </li>
          ))}
        </ul>

        <div className="rounded-xl border border-blue-400/30 bg-gradient-to-br from-blue-500/15 to-transparent p-5 min-w-0">
          <p className="font-medium mb-1">{locked.length} automatizaciones más en el informe completo</p>
          <p className="text-sm text-white/55 mb-4">Con la explicación de cada una, el orden recomendado y una estimación de coste.</p>
          {sample ? (
            <p className="text-sm text-white/50">Escribe tu web arriba para ver el tuyo.</p>
          ) : sent ? (
            <p className="inline-flex items-center gap-2 text-sm text-emerald-300"><CheckCircle2 className="w-4 h-4" /> Solicitud enviada</p>
          ) : (
            <form onSubmit={onSubmitLead} className="space-y-2">
              <div className="relative">
                <Mail className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => onEmailChange?.(e.target.value)}
                  placeholder="tu@empresa.es"
                  aria-label="Email para recibir el informe"
                  className={`w-full rounded-full border bg-black/40 text-white placeholder:text-white/35 pl-10 pr-4 py-2.5 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/25 ${emailError ? "border-red-400" : "border-white/15"}`}
                />
              </div>
              {emailError && <p className="text-xs text-red-300">{emailError}</p>}
              <button type="submit" disabled={sending} className="w-full inline-flex items-center justify-center gap-2 bg-primary text-white rounded-full px-4 py-2.5 text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-70">
                {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <ArrowRight className="w-4 h-4" />}
                Recibir el informe completo
              </button>
            </form>
          )}
          {!sample && (
            <a
              href="https://cal.com/alpa-digital-studio/30min?user=alpa-digital-studio&overlayCalendar=true"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-blue-300 mt-4 hover:underline"
            >
              <Calendar className="w-4 h-4" /> O coméntalo con nosotros en 30 minutos
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScanResultCard;
