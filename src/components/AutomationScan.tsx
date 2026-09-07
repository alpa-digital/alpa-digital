import { useEffect, useRef, useState } from "react";
import { Globe, CheckCircle2, Loader2, Sparkles } from "lucide-react";
import ScanResultCard from "@/components/ScanResultCard";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { estimateScan, domainFromUrl, guessSectorFromDomain, type ScanResult } from "@/lib/scanFallback";

type Phase = "idle" | "scanning" | "result";

const sampleResult: ScanResult = {
  ...estimateScan("voltia-instalaciones.es", "construccion"),
  company: "Voltia Instalaciones",
  sector: "Instalaciones eléctricas y fotovoltaicas",
  summary: "Ejemplo de resultado. En Voltia, presupuestos, certificaciones y facturas de obra concentran unas 28 horas semanales de trabajo repetitivo que un agente podría asumir.",
  source: "analysis",
};

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
  favicon: z.string().url().optional(),
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
            {phase === "idle" && <ScanResultCard result={sampleResult} url="voltia-instalaciones.es" sample />}

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
              <ScanResultCard
                result={result}
                url={url}
                email={email}
                emailError={emailError}
                sending={sending}
                sent={sent}
                onEmailChange={(value) => setEmail(value)}
                onSubmitLead={handleLead}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AutomationScan;
