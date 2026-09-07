import { useEffect, useRef, useState } from "react";
import { Globe, Lock, Mail, Calendar, CheckCircle2, Loader2, ArrowRight, Sparkles } from "lucide-react";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { areaNames, estimateScan, domainFromUrl, guessSectorFromDomain, type ScanResult } from "@/lib/scanFallback";

type Phase = "idle" | "scanning" | "result";

const scanSteps = [
  "Leyendo tu web",
  "Identificando a qué te dedicas y a quién vendes",
  "Buscando tareas repetitivas por área",
  "Diseñando las automatizaciones con más impacto",
  "Preparando tu mapa",
];

const resultSchema = z.object({
  company: z.string(),
  sectorId: z.enum(["servicios", "comercio", "industria", "salud", "inmobiliaria", "hosteleria", "construccion", "otro"]),
  sector: z.string(),
  summary: z.string(),
  areas: z.array(
    z.object({
      id: z.enum(["atencion", "ventas", "admin", "rrhh", "marketing", "direccion"]),
      score: z.number(),
      title: z.string(),
      description: z.string(),
      hoursPerWeek: z.number(),
    })
  ),
});

async function requestAnalysis(url: string): Promise<ScanResult> {
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 40000);
  try {
    const response = await fetch("/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
      signal: controller.signal,
    });
    if (!response.ok) throw new Error(`analyze ${response.status}`);
    const parsed = resultSchema.parse(await response.json());
    parsed.areas.sort((a, b) => b.score - a.score);
    return { ...parsed, source: "analysis" };
  } finally {
    window.clearTimeout(timeout);
  }
}

const AutomationScan = () => {
  const { toast } = useToast();
  const [phase, setPhase] = useState<Phase>("idle");
  const [url, setUrl] = useState("");
  const [urlError, setUrlError] = useState<string | null>(null);
  const [step, setStep] = useState(0);
  const [result, setResult] = useState<ScanResult | null>(null);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (phase !== "scanning") return;
    setStep(0);
    const timers = scanSteps.map((_, i) => window.setTimeout(() => setStep(i + 1), 900 * (i + 1)));
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [phase]);

  useEffect(() => {
    if (phase === "result") resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [phase]);

  const handleScan = async (e: React.FormEvent) => {
    e.preventDefault();
    const clean = url.trim();
    if (!/^([a-z0-9-]+\.)+[a-z]{2,}(\/.*)?$/i.test(clean.replace(/^https?:\/\//i, "").replace(/^www\./i, ""))) {
      setUrlError("Escribe la dirección de tu web, por ejemplo miempresa.es");
      return;
    }
    setUrlError(null);
    setSent(false);
    setEmail("");
    setPhase("scanning");
    const started = Date.now();
    let analysis: ScanResult;
    try {
      analysis = await requestAnalysis(clean);
    } catch {
      analysis = estimateScan(clean, guessSectorFromDomain(clean));
    }
    const minimum = 900 * scanSteps.length + 400;
    const elapsed = Date.now() - started;
    if (elapsed < minimum) await new Promise((r) => window.setTimeout(r, minimum - elapsed));
    setResult(analysis);
    setPhase("result");
  };

  const handleLead = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = z.string().trim().email().safeParse(email);
    if (!parsed.success) {
      setEmailError("Escribe un email válido para enviarte el informe");
      return;
    }
    setEmailError(null);
    setSending(true);
    const payload = { email: parsed.data, url: url.trim(), sector: result?.sector, analysis: result };
    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error(`lead ${response.status}`);
      setSent(true);
      toast({ title: "Informe en camino", description: "Te llega al email en unos minutos. Revisa la carpeta de spam si no lo ves." });
    } catch {
      const subject = encodeURIComponent(`Informe de automatización para ${domainFromUrl(url)}`);
      const body = encodeURIComponent(
        `Hola, quiero recibir el informe completo de automatización.\n\nWeb: ${url.trim()}\nSector: ${result?.sector ?? "sin determinar"}\nEmail: ${parsed.data}\n`
      );
      window.location.href = `mailto:info@alpa.digital?subject=${subject}&body=${body}`;
      setSent(true);
      toast({ title: "Se abre tu correo", description: "Envíanos el mensaje y te mandamos el informe completo." });
    } finally {
      setSending(false);
    }
  };

  const revealed = result?.areas.slice(0, 2) ?? [];
  const locked = result?.areas.slice(2) ?? [];
  const totalHours = result?.areas.reduce((sum, a) => sum + a.hoursPerWeek, 0) ?? 0;

  return (
    <section id="analiza-tu-empresa" className="py-24 px-4 md:px-8 bg-background relative overflow-hidden scroll-mt-24">
      <div className="absolute top-0 left-0 w-full h-px bg-border" />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] gap-10 lg:gap-16 items-start">
          <div>
            <p className="text-xs md:text-sm font-medium text-primary uppercase tracking-wide mb-4">Pruébalo con tu empresa</p>
            <h2 className="text-4xl md:text-6xl font-light text-foreground leading-tight mb-6" style={{ textWrap: "balance" }}>
              ¿Qué se automatizaría en la tuya?
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground mb-8" style={{ lineHeight: "1.8" }}>
              Escribe la dirección de tu web. Leemos a qué te dedicas, deducimos tu sector y en medio minuto te mostramos un primer mapa de las áreas con más trabajo repetitivo y las dos automatizaciones con más impacto.
            </p>

            <form onSubmit={handleScan} className="space-y-4 max-w-lg">
              <div>
                <label htmlFor="scan-url" className="block text-sm font-medium text-foreground mb-2">Tu web</label>
                <div className="relative">
                  <Globe className="w-4 h-4 text-muted-foreground absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    id="scan-url"
                    type="text"
                    inputMode="url"
                    autoComplete="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="miempresa.es"
                    disabled={phase === "scanning"}
                    className={`w-full rounded-full border bg-background pl-11 pr-4 py-3.5 text-base outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20 ${urlError ? "border-red-500" : "border-border"}`}
                  />
                </div>
                {urlError && <p className="text-sm text-red-500 mt-2">{urlError}</p>}
              </div>
              <button
                type="submit"
                disabled={phase === "scanning"}
                className="inline-flex items-center justify-center gap-2 w-full sm:w-auto bg-primary text-white px-8 py-4 rounded-full text-base md:text-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary/30 active:scale-95 disabled:opacity-70 disabled:hover:scale-100"
              >
                {phase === "scanning" ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
                {phase === "scanning" ? "Analizando…" : "Analizar mi empresa"}
              </button>
              <p className="text-xs text-muted-foreground">Sin registro ni formularios. Solo leemos lo que tu web ya muestra públicamente.</p>
            </form>
          </div>

          <div ref={resultRef} className="scroll-mt-28">
            {phase === "idle" && (
              <div className="rounded-2xl border border-dashed border-border bg-muted/30 p-8 md:p-10 min-h-[360px] flex flex-col justify-center">
                <p className="text-sm font-medium text-foreground mb-4">Qué obtendrás</p>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" /> Un mapa de las seis áreas de tu empresa con su potencial de automatización</li>
                  <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" /> Las dos automatizaciones con más impacto, explicadas en lenguaje claro</li>
                  <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" /> Una estimación de horas semanales que se ahorrarían</li>
                  <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" /> El informe completo por email, si lo quieres</li>
                </ul>
              </div>
            )}

            {phase === "scanning" && (
              <div className="rounded-2xl border border-border bg-[#0D0E11] text-white p-8 md:p-10 min-h-[360px]">
                <div className="flex items-center gap-4 mb-8">
                  <div className="relative w-14 h-14 rounded-full border border-blue-400/30 flex items-center justify-center">
                    <div className="absolute inset-0 rounded-full" style={{ background: "conic-gradient(from 0deg, rgba(59,130,246,0.6), transparent 60%)", animation: "scan-sweep 1.4s linear infinite" }} />
                    <div className="absolute inset-[3px] rounded-full bg-[#0D0E11]" />
                    <Globe className="w-5 h-5 text-blue-300 relative" />
                  </div>
                  <div>
                    <p className="text-sm text-white/50">Analizando</p>
                    <p className="font-medium">{domainFromUrl(url)}</p>
                  </div>
                </div>
                <ul className="space-y-3 font-mono text-[13px]">
                  {scanSteps.map((label, i) => {
                    const done = step > i;
                    const active = step === i;
                    return (
                      <li key={label} className={`flex items-center gap-3 transition-colors ${done ? "text-emerald-300" : active ? "text-white" : "text-white/30"}`}>
                        {done ? <CheckCircle2 className="w-4 h-4" /> : active ? <Loader2 className="w-4 h-4 animate-spin text-blue-300" /> : <span className="w-4 h-4 rounded-full border border-white/20" />}
                        {label}
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}

            {phase === "result" && result && (
              <div className="rounded-2xl border border-border bg-card shadow-xl shadow-black/5 overflow-hidden">
                <div className="px-6 md:px-8 py-6 border-b border-border">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">
                        {result.source === "analysis" ? "Mapa de automatización" : "Estimación inicial"} · {domainFromUrl(url)}
                      </p>
                      <h3 className="text-2xl md:text-3xl font-medium text-foreground">{result.company}</h3>
                      <p className="text-sm text-muted-foreground mt-1">Sector detectado: {result.sector}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-3xl md:text-4xl font-semibold text-foreground" style={{ fontVariantNumeric: "tabular-nums" }}>{totalHours} h</p>
                      <p className="text-xs text-muted-foreground">a la semana automatizables</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground mt-4 leading-relaxed">{result.summary}</p>
                </div>

                <div className="px-6 md:px-8 py-6 border-b border-border">
                  <p className="text-xs uppercase tracking-wide text-muted-foreground mb-4">Potencial por área</p>
                  <ul className="space-y-3">
                    {result.areas.map((area, i) => (
                      <li key={area.id} className="grid grid-cols-[130px_1fr_44px] items-center gap-3 text-sm">
                        <span className={i < 2 ? "text-foreground font-medium" : "text-muted-foreground"}>{areaNames[area.id]}</span>
                        <div className="h-2 rounded-full bg-muted overflow-hidden">
                          <div
                            className={`h-full rounded-full ${i < 2 ? "bg-primary" : "bg-primary/40"}`}
                            style={{ width: `${area.score}%`, transition: "width 1.2s ease-out" }}
                          />
                        </div>
                        <span className="text-right text-muted-foreground" style={{ fontVariantNumeric: "tabular-nums" }}>{area.score}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="px-6 md:px-8 py-6 space-y-4">
                  {revealed.map((area) => (
                    <article key={area.id} className="rounded-xl border border-primary/30 bg-primary/5 p-5">
                      <div className="flex items-center justify-between gap-3 mb-2">
                        <span className="text-xs font-medium text-primary">{areaNames[area.id]}</span>
                        <span className="text-xs text-muted-foreground">≈ {area.hoursPerWeek} h/semana</span>
                      </div>
                      <h4 className="text-lg font-medium text-foreground mb-1">{area.title}</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">{area.description}</p>
                    </article>
                  ))}
                  <div className="relative">
                    <div className="space-y-3 select-none" aria-hidden="true">
                      {locked.map((area) => (
                        <div key={area.id} className="rounded-xl border border-border p-5 blur-[5px] opacity-60">
                          <span className="text-xs font-medium text-primary">{areaNames[area.id]}</span>
                          <p className="text-lg font-medium text-foreground mt-2">{area.title}</p>
                          <p className="text-sm text-muted-foreground mt-1">{area.description.slice(0, 90)}…</p>
                        </div>
                      ))}
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-background/95 backdrop-blur rounded-2xl border border-border shadow-xl p-6 max-w-sm w-full text-center">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                          <Lock className="w-5 h-5 text-primary" />
                        </div>
                        <p className="font-medium text-foreground mb-1">{locked.length} automatizaciones más en el informe completo</p>
                        <p className="text-sm text-muted-foreground mb-4">Con la explicación de cada una, el orden recomendado y una estimación de coste.</p>
                        {sent ? (
                          <p className="inline-flex items-center gap-2 text-sm text-emerald-600"><CheckCircle2 className="w-4 h-4" /> Solicitud enviada</p>
                        ) : (
                          <form onSubmit={handleLead} className="space-y-2">
                            <div className="relative">
                              <Mail className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
                              <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="tu@empresa.es"
                                aria-label="Email para recibir el informe"
                                className={`w-full rounded-full border bg-background pl-10 pr-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 ${emailError ? "border-red-500" : "border-border"}`}
                              />
                            </div>
                            {emailError && <p className="text-xs text-red-500 text-left">{emailError}</p>}
                            <button type="submit" disabled={sending} className="w-full inline-flex items-center justify-center gap-2 bg-primary text-white rounded-full px-4 py-2.5 text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-70">
                              {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <ArrowRight className="w-4 h-4" />}
                              Recibir el informe completo
                            </button>
                          </form>
                        )}
                        <a
                          href="https://cal.com/alpa-digital-studio/30min?user=alpa-digital-studio&overlayCalendar=true"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-sm text-primary mt-4 hover:underline"
                        >
                          <Calendar className="w-4 h-4" /> O coméntalo con nosotros en 30 minutos
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AutomationScan;
