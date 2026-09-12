import { useEffect, useRef, useState } from "react";
import { Globe, CheckCircle2, Loader2, Sparkles } from "lucide-react";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import ScanResultCard from "@/components/ScanResultCard";
import { estimateScan, domainFromUrl, guessSectorFromDomain, type ScanResult } from "@/lib/scanFallback";
import { ANALYZE_ENDPOINT, LEAD_ENDPOINT } from "@/config/endpoints";
import { useCopy, useLang, type Lang } from "@/i18n";
import type { Copy } from "@/i18n/es";
import { track, utmParams } from "@/lib/analytics";

type Phase = "idle" | "scanning" | "result";



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

class AnalysisError extends Error {
  constructor(public reason: string) {
    super(reason);
  }
}

type ScanErrors = Copy["scan"]["errors"];

const reasonByStatus = (e: ScanErrors): Record<number, string> => ({
  404: e.notDeployed,
  422: e.unreadable,
  429: e.rateLimit,
  502: e.invalidAnswer,
  503: e.notConfigured,
  504: e.timeoutServer,
});

async function requestAnalysis(url: string, lang: Lang, e: ScanErrors): Promise<ScanResult> {
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 45000);
  try {
    const response = await fetch(ANALYZE_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url, lang }),
      signal: controller.signal,
    });
    if (!response.ok) {
      let detail = "";
      try {
        detail = (await response.json())?.detail ?? "";
      } catch {
        /* sin detalle */
      }
      throw new AnalysisError(`${reasonByStatus(e)[response.status] ?? `error ${response.status}`}${detail ? ` · ${detail.slice(0, 120)}` : ""}`);
    }
    const contentType = response.headers.get("content-type") ?? "";
    if (!contentType.includes("json")) {
      throw new AnalysisError(e.htmlResponse);
    }
    const parsed = resultSchema.parse(await response.json());
    parsed.areas.sort((a, b) => b.score - a.score);
    return { ...parsed, source: "analysis" };
  } catch (error) {
    if (error instanceof AnalysisError) throw error;
    if (error instanceof DOMException && error.name === "AbortError") throw new AnalysisError(e.timeout);
    if (error instanceof z.ZodError) throw new AnalysisError(e.badFormat);
    throw new AnalysisError(e.offline);
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
  const c = useCopy();
  const { lang } = useLang();
  const scanSteps = c.scan.steps;

  useEffect(() => {
    if (phase !== "scanning") return;
    setStep(0);
    const timers = scanSteps.map((_, i) => window.setTimeout(() => setStep(i + 1), 900 * (i + 1)));
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [phase]);

  useEffect(() => {
    if (phase === "result") resultRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [phase]);

  const handleScan = async (e: React.FormEvent) => {
    e.preventDefault();
    const clean = url.trim();
    if (!/^([a-z0-9-]+\.)+[a-z]{2,}(\/.*)?$/i.test(clean.replace(/^https?:\/\//i, "").replace(/^www\./i, ""))) {
      setUrlError(c.scan.invalidUrl);
      return;
    }
    setUrlError(null);
    setSent(false);
    setEmail("");
    setPhase("scanning");
    track("analyze_start", { domain: domainFromUrl(clean) });
    const started = Date.now();
    let analysis: ScanResult;
    try {
      analysis = await requestAnalysis(clean, lang, c.scan.errors);
    } catch (error) {
      const reason = error instanceof AnalysisError ? error.reason : c.scan.errors.generic;
      console.warn(c.scan.fallbackPrefix, reason);
      analysis = { ...estimateScan(clean, guessSectorFromDomain(clean)), note: c.scan.noteTemplate.replace("{reason}", reason) };
    }
    const minimum = 900 * scanSteps.length + 400;
    const elapsed = Date.now() - started;
    if (elapsed < minimum) await new Promise((r) => window.setTimeout(r, minimum - elapsed));
    setResult(analysis);
    setPhase("result");
    track("analyze_result", { domain: domainFromUrl(clean), source: analysis.source, sector: analysis.sectorId });
  };

  const handleLead = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = z.string().trim().email().safeParse(email);
    if (!parsed.success) {
      setEmailError(c.result.emailError);
      return;
    }
    setEmailError(null);
    setSending(true);
    const payload = { email: parsed.data, url: url.trim(), sector: result?.sector, analysis: result, utm: utmParams() };
    track("lead_submit", { domain: domainFromUrl(url), source: result?.source });
    try {
      const response = await fetch(LEAD_ENDPOINT, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      if (!response.ok) throw new Error(`lead ${response.status}`);
      setSent(true);
      toast({ title: c.scan.leadSentTitle, description: c.scan.leadSentBody });
    } catch {
      const subject = encodeURIComponent(`${c.scan.leadMailSubject} ${domainFromUrl(url)}`);
      const body = encodeURIComponent(`${c.scan.leadMailIntro}\n\n${c.scan.leadMailWeb}: ${url.trim()}\n${c.scan.leadMailSector}: ${result?.sector ?? c.scan.leadMailUnknown}\n${c.scan.leadMailEmail}: ${parsed.data}\n`);
      window.location.href = `mailto:info@alpa.digital?subject=${subject}&body=${body}`;
      setSent(true);
      toast({ title: c.scan.leadMailTitle, description: c.scan.leadMailBody });
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="analiza-tu-empresa" className="py-16 md:py-20 px-4 md:px-8 bg-background relative overflow-hidden scroll-mt-20">
      <div className="absolute top-0 left-0 w-full h-px bg-border" />
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] gap-6 lg:gap-10 items-end">
          <div>
            <p className="text-xs font-medium text-primary uppercase tracking-wide mb-2">{c.scan.eyebrow}</p>
            <h2 className="text-3xl md:text-4xl font-light text-foreground leading-tight mb-3" style={{ textWrap: "balance" }}>
              {c.scan.title}
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed">
              {c.scan.body}
            </p>
          </div>
          <form onSubmit={handleScan} className="w-full">
            <label htmlFor="scan-url" className="block text-sm font-medium text-foreground mb-2">{c.scan.label}</label>
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <Globe className="w-4 h-4 text-muted-foreground absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  id="scan-url"
                  type="text"
                  inputMode="url"
                  autoComplete="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder={c.scan.placeholder}
                  disabled={phase === "scanning"}
                  className={`w-full rounded-full border bg-background pl-11 pr-4 py-3 text-base outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20 ${urlError ? "border-red-500" : "border-border"}`}
                />
              </div>
              <button
                type="submit"
                disabled={phase === "scanning"}
                className="inline-flex items-center justify-center gap-2 bg-primary text-white px-6 py-3 rounded-full text-base font-medium transition-all duration-300 hover:scale-[1.03] hover:shadow-xl hover:shadow-primary/30 active:scale-95 disabled:opacity-70 disabled:hover:scale-100 flex-shrink-0"
              >
                {phase === "scanning" ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
                {phase === "scanning" ? c.scan.analyzing : c.scan.analyze}
              </button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">{urlError ?? c.scan.note}</p>
          </form>
        </div>

        <div ref={resultRef} className="scroll-mt-24">
          {phase === "scanning" && (
            <div className="rounded-2xl border border-white/10 bg-[#0D0E11] text-white p-6 md:p-8 min-h-[280px] grid md:grid-cols-2 gap-8 items-center">
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 rounded-full border border-blue-400/30 flex items-center justify-center flex-shrink-0">
                  <div className="absolute inset-0 rounded-full" style={{ background: "conic-gradient(from 0deg, rgba(59,130,246,0.6), transparent 60%)", animation: "scan-sweep 1.4s linear infinite" }} />
                  <div className="absolute inset-[3px] rounded-full bg-[#0D0E11]" />
                  <Globe className="w-6 h-6 text-blue-300 relative" />
                </div>
                <div>
                  <p className="text-sm text-white/50">{c.scan.scanningLabel}</p>
                  <p className="text-lg font-medium">{domainFromUrl(url)}</p>
                </div>
              </div>
              <ul className="space-y-2.5 font-mono text-[13px]">
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
            <ScanResultCard result={result} url={url} email={email} emailError={emailError} sending={sending} sent={sent} onEmailChange={setEmail} onSubmitLead={handleLead} />
          )}
        </div>
      </div>
    </section>
  );
};

export default AutomationScan;
