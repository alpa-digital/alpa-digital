import type { Config, Context } from "@netlify/functions";
import { z } from "zod";

// Proveedor del modelo, por prioridad:
//   1. LLM_BASE_URL + LLM_API_KEY + LLM_MODEL (cualquier API compatible con OpenAI)
//   2. OPENAI_API_KEY → OpenAI (gpt-4o-mini, alternativo gpt-4.1-mini)
//   3. MISTRAL_API_KEY → Mistral (mistral-small-latest, alternativo open-mistral-nemo)
type Provider = { name: "custom" | "openai" | "mistral"; baseUrl: string; apiKey?: string; model: string; fallbackModel: string };

function resolveProvider(): Provider {
  const env = process.env;
  if (env.LLM_BASE_URL && env.LLM_API_KEY) {
    return {
      name: "custom",
      baseUrl: env.LLM_BASE_URL.replace(/\/+$/, ""),
      apiKey: env.LLM_API_KEY,
      model: env.LLM_MODEL ?? "gpt-4o-mini",
      fallbackModel: env.LLM_FALLBACK_MODEL ?? env.LLM_MODEL ?? "gpt-4o-mini",
    };
  }
  if (env.OPENAI_API_KEY) {
    return {
      name: "openai",
      baseUrl: "https://api.openai.com/v1",
      apiKey: env.OPENAI_API_KEY,
      model: env.OPENAI_MODEL ?? "gpt-4o-mini",
      fallbackModel: env.OPENAI_FALLBACK_MODEL ?? "gpt-4.1-mini",
    };
  }
  return {
    name: "mistral",
    baseUrl: "https://api.mistral.ai/v1",
    apiKey: env.MISTRAL_API_KEY,
    model: env.MISTRAL_MODEL ?? "mistral-small-latest",
    fallbackModel: env.MISTRAL_FALLBACK_MODEL ?? "open-mistral-nemo",
  };
}

const PROVIDER = resolveProvider();
const MISTRAL_URL = `${PROVIDER.baseUrl}/chat/completions`;
const LLM_API_KEY = PROVIDER.apiKey;
const MODEL = PROVIDER.model;
const FALLBACK_MODEL = PROVIDER.fallbackModel;

/** El modo estricto de OpenAI no admite algunas restricciones numéricas; se eliminan del esquema para ese proveedor. */
function schemaForProvider(schema: unknown): unknown {
  if (PROVIDER.name === "mistral") return schema;
  const strip = (node: unknown): unknown => {
    if (Array.isArray(node)) return node.map(strip);
    if (node && typeof node === "object") {
      const out: Record<string, unknown> = {};
      for (const [key, value] of Object.entries(node as Record<string, unknown>)) {
        if (["minimum", "maximum", "minItems", "maxItems"].includes(key)) continue;
        out[key] = strip(value);
      }
      return out;
    }
    return node;
  };
  return strip(schema);
}
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
// Netlify corta las funciones síncronas a los 10 s: toda la función debe responder antes.
const DEADLINE_MS = Number(process.env.ANALYZE_DEADLINE_MS ?? 9200);

const sectorIds = ["servicios", "comercio", "industria", "salud", "inmobiliaria", "hosteleria", "construccion", "otro"] as const;
const areaIds = ["atencion", "ventas", "admin", "rrhh", "marketing", "direccion"] as const;

const requestSchema = z.object({
  url: z.string().min(3).max(300),
});

const analysisSchema = z.object({
  company: z.string().min(1),
  sectorId: z.enum(sectorIds),
  sector: z.string().min(1),
  summary: z.string().min(1),
  areas: z
    .array(
      z.object({
        id: z.enum(areaIds),
        score: z.number().int().min(0).max(100),
        title: z.string().min(1),
        description: z.string().min(1),
        hoursPerWeek: z.number().int().min(0).max(40),
      })
    )
    .length(6),
});

// Esquema JSON que se envía a Mistral (salida estructurada).
const outputJsonSchema = {
  type: "object",
  additionalProperties: false,
  required: ["company", "sectorId", "sector", "summary", "areas"],
  properties: {
    company: { type: "string", description: "Nombre de la empresa tal y como aparece en su web" },
    sectorId: { type: "string", enum: [...sectorIds], description: "Categoría de sector más cercana" },
    sector: { type: "string", description: "Sector y actividad concreta en una frase corta, en español" },
    summary: {
      type: "string",
      description: "Dos frases en español dirigidas a quien dirige la empresa: qué trabajo repetitivo se ha detectado y cuántas horas semanales podrían ahorrarse",
    },
    areas: {
      type: "array",
      minItems: 6,
      maxItems: 6,
      description: "Exactamente una entrada por área, en este orden: atencion, ventas, admin, rrhh, marketing, direccion",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["id", "score", "title", "description", "hoursPerWeek"],
        properties: {
          id: { type: "string", enum: [...areaIds] },
          score: { type: "integer", minimum: 0, maximum: 100, description: "Potencial de automatización de 0 a 100" },
          title: { type: "string", description: "Nombre de la automatización concreta, máximo 8 palabras, en español" },
          description: { type: "string", description: "Qué haría la automatización en esta empresa, en 1 o 2 frases sencillas, en español" },
          hoursPerWeek: { type: "integer", minimum: 0, maximum: 40, description: "Horas semanales de trabajo manual que ahorraría" },
        },
      },
    },
  },
};

const systemPrompt = `Eres consultor de automatización con IA para pymes en España. A partir del texto público de la web de una empresa, identificas a qué se dedica, clasificas su sector y propones automatizaciones concretas por área.

Reglas:
- Deduce el sector solo de la web. sectorId debe ser la categoría más cercana: servicios (asesorías, despachos, consultoras, agencias), comercio (tiendas, distribuidores, mayoristas), industria (fabricación, talleres, mantenimiento), salud (clínicas, centros médicos, bienestar), inmobiliaria (agencias, administración de fincas), hosteleria (restaurantes, hoteles, turismo), construccion (obras, reformas, instaladores eléctricos, fontanería, climatización) u otro.
- Basa cada propuesta en lo que la web muestra (productos, servicios, cómo captan clientes, cómo se contacta con ellos). Si la web no da información sobre un área, propón algo típico del sector con una puntuación más baja.
- Escribe para el dueño de una pyme sin conocimientos técnicos: nada de jerga ni nombres de herramientas.
- Sé concreto: "Presupuestos de reformas a partir de fotos" es mejor que "Optimizar el proceso comercial".
- Las horas semanales deben ser realistas para una empresa de 5 a 50 personas.
- Responde únicamente con el JSON pedido.`;

function normalizeUrl(raw: string): URL | null {
  try {
    const url = new URL(raw.includes("://") ? raw : `https://${raw}`);
    if (url.protocol !== "https:" && url.protocol !== "http:") return null;
    const host = url.hostname.toLowerCase();
    if (host === "localhost" || /^(\d{1,3}\.){3}\d{1,3}$/.test(host) || host.endsWith(".local") || host.endsWith(".internal") || !host.includes(".")) {
      return null;
    }
    return url;
  } catch {
    return null;
  }
}

function htmlToText(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, " ")
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/<\/(p|div|li|h[1-6]|tr|section|article|br)>/gi, "\n")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&[a-z]+;/gi, " ")
    .replace(/[ \t]+/g, " ")
    .replace(/\n\s*\n+/g, "\n")
    .trim();
}

function extractFavicon(html: string, base: URL): string | undefined {
  const links = html.match(/<link[^>]+rel=["'][^"']*icon[^"']*["'][^>]*>/gi) ?? [];
  const candidates = links
    .map((tag) => ({
      href: tag.match(/href=["']([^"']+)["']/i)?.[1],
      sizes: parseInt(tag.match(/sizes=["'](\d+)/i)?.[1] ?? "0", 10),
      apple: /apple-touch-icon/i.test(tag),
    }))
    .filter((c): c is { href: string; sizes: number; apple: boolean } => Boolean(c.href) && !/^data:/i.test(c.href!));
  candidates.sort((a, b) => (b.apple ? 1 : 0) - (a.apple ? 1 : 0) || b.sizes - a.sizes);
  for (const candidate of candidates) {
    try {
      const resolved = new URL(candidate.href, base);
      if (resolved.protocol === "https:" || resolved.protocol === "http:") return resolved.toString();
    } catch {
      /* siguiente candidato */
    }
  }
  return undefined;
}

const browserUA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36";

function extractMeta(html: string): string {
  const title = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]?.trim() ?? "";
  const description = html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i)?.[1] ?? html.match(/<meta[^>]+content=["']([^"']*)["'][^>]+name=["']description["']/i)?.[1] ?? "";
  const ogTitle = html.match(/<meta[^>]+property=["']og:title["'][^>]+content=["']([^"']*)["']/i)?.[1] ?? "";
  return [title && `Título: ${title}`, ogTitle && ogTitle !== title && `Nombre: ${ogTitle}`, description && `Descripción: ${description}`].filter(Boolean).join("\n");
}

async function fetchOnce(url: URL, userAgent: string, timeoutMs: number): Promise<{ html: string; finalUrl: URL }> {
  const response = await fetch(url, {
    redirect: "follow",
    signal: AbortSignal.timeout(timeoutMs),
    headers: {
      "user-agent": userAgent,
      accept: "text/html,application/xhtml+xml;q=0.9,*/*;q=0.8",
      "accept-language": "es-ES,es;q=0.9,en;q=0.7",
    },
  });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const html = (await response.text()).slice(0, 500000);
  return { html, finalUrl: response.url ? new URL(response.url) : url };
}

async function fetchSite(url: URL, budgetLeft: () => number): Promise<{ text: string; favicon?: string }> {
  const variants: URL[] = [url];
  const alt = new URL(url.toString());
  alt.hostname = url.hostname.startsWith("www.") ? url.hostname.slice(4) : `www.${url.hostname}`;
  variants.push(alt);
  if (url.protocol === "https:") {
    const insecure = new URL(url.toString());
    insecure.protocol = "http:";
    variants.push(insecure);
  }

  const errors: string[] = [];
  for (const candidate of variants) {
    for (const userAgent of ["Mozilla/5.0 (compatible; AlpaDigitalBot/1.0; +https://alpa.digital)", browserUA]) {
      // Reservar al menos 4 s para la llamada al modelo.
      const timeoutMs = Math.min(5000, budgetLeft() - 4000);
      if (timeoutMs < 1000) {
        errors.push("sin tiempo para más intentos");
        break;
      }
      try {
        const { html, finalUrl } = await fetchOnce(candidate, userAgent, timeoutMs);
        const meta = extractMeta(html);
        const body = htmlToText(html);
        const text = `${meta}\n\n${body}`.trim();
        if (body.length < 80 && meta.length < 40) throw new Error("contenido insuficiente (¿web generada solo con JavaScript?)");
        return { text: text.slice(0, 9000), favicon: extractFavicon(html, finalUrl) ?? `https://www.google.com/s2/favicons?domain=${finalUrl.hostname}&sz=128` };
      } catch (error) {
        errors.push(`${candidate.hostname}: ${error instanceof Error ? error.message : String(error)}`);
      }
    }
  }
  throw new Error(errors.join(" | "));
}

interface MistralResponse {
  choices?: { message?: { content?: string | { type: string; text?: string }[] } }[];
}

async function askMistral(apiKey: string, hostname: string, siteText: string, structured: boolean, model: string, timeoutMs: number): Promise<Response> {
  const userPrompt = `Web: ${hostname}\n\nTexto público de la web:\n"""\n${siteText}\n"""\n\nDevuelve el análisis de automatización para esta empresa.`;
  const responseFormat = structured
    ? { type: "json_schema", json_schema: { name: "automation_analysis", strict: true, schema: schemaForProvider(outputJsonSchema) } }
    : { type: "json_object" };
  const messages = [
    { role: "system", content: structured ? systemPrompt : `${systemPrompt}\n\nEl JSON debe seguir este esquema:\n${JSON.stringify(outputJsonSchema)}` },
    { role: "user", content: userPrompt },
  ];
  return fetch(MISTRAL_URL, {
    method: "POST",
    signal: AbortSignal.timeout(timeoutMs),
    headers: { authorization: `Bearer ${apiKey}`, "content-type": "application/json", accept: "application/json" },
    body: JSON.stringify({
      model,
      temperature: 0.2,
      ...(PROVIDER.name === "mistral" ? { max_tokens: 1400 } : { max_completion_tokens: 1400 }),
      response_format: responseFormat,
      messages,
    }),
  });
}

function extractContent(payload: MistralResponse): string {
  const content = payload.choices?.[0]?.message?.content;
  if (typeof content === "string") return content;
  if (Array.isArray(content)) return content.map((part) => part.text ?? "").join("");
  throw new Error("empty completion");
}

const json = (body: unknown, status = 200) => new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json" } });

export default async (req: Request, _context: Context) => {
  const started = Date.now();
  const budgetLeft = () => DEADLINE_MS - (Date.now() - started);
  if (req.method !== "POST") return json({ error: "method not allowed" }, 405);
  const apiKey = LLM_API_KEY;
  if (!apiKey) {
    console.error("analyze: falta la clave del proveedor (OPENAI_API_KEY, MISTRAL_API_KEY o LLM_API_KEY)");
    return json({ error: "analysis not configured" }, 503);
  }

  let input: z.infer<typeof requestSchema>;
  try {
    input = requestSchema.parse(await req.json());
  } catch {
    return json({ error: "invalid request" }, 400);
  }

  const url = normalizeUrl(input.url);
  if (!url) return json({ error: "invalid url" }, 400);

  let site: { text: string; favicon?: string };
  try {
    site = await fetchSite(url, budgetLeft);
  } catch (error) {
    const detail = error instanceof Error ? error.message : String(error);
    console.error("analyze: no se pudo leer la web", url.hostname, detail);
    return json({ error: "site unreachable", detail }, 422);
  }

  try {
    // Plan de llamadas: esquema estricto → JSON libre si el modelo no lo admite → modelo alternativo.
    // Ante un 429 (límite de peticiones o capacidad del plan) se espera y se reintenta.
    const plan: { structured: boolean; model: string }[] = [
      { structured: true, model: MODEL },
      { structured: false, model: MODEL },
      { structured: false, model: FALLBACK_MODEL },
    ];
    let response: Response | undefined;
    let lastRateLimit = "";
    let timedOut = false;
    const call = async (step: { structured: boolean; model: string }) => {
      const timeoutMs = budgetLeft() - 250;
      if (timeoutMs < 1500) {
        timedOut = true;
        return undefined;
      }
      try {
        return await askMistral(apiKey, url.hostname, site.text, step.structured, step.model, timeoutMs);
      } catch (error) {
        if (error instanceof Error && error.name === "TimeoutError") {
          timedOut = true;
          return undefined;
        }
        throw error;
      }
    };
    for (const step of plan) {
      response = await call(step);
      if (!response) break;
      if (response.status === 429) {
        lastRateLimit = (await response.text()).slice(0, 300);
        console.warn("analyze: Mistral 429", step.model, step.structured ? "json_schema" : "json_object", lastRateLimit);
        // Un reintento tras una pausa corta (límite de 1 petición/segundo del plan gratuito) y, si no, siguiente paso.
        if (budgetLeft() > 4000) {
          await sleep(1300);
          response = await call(step);
          if (!response) break;
          if (response.ok) break;
          if (response.status === 429) lastRateLimit = (await response.text()).slice(0, 300);
        }
        continue;
      }
      if (response.ok) break;
      const detail = (await response.clone().text()).slice(0, 300);
      console.warn("analyze: Mistral respondió", response.status, "con", step.model, step.structured ? "json_schema" : "json_object", detail);
      if (response.status !== 400 && response.status !== 422) break;
      await sleep(1100);
    }
    if (timedOut || !response) {
      console.error("analyze: sin tiempo antes del corte de Netlify", Date.now() - started, "ms", lastRateLimit);
      return json({ error: "timeout", detail: lastRateLimit || "el modelo no respondió a tiempo" }, 504);
    }
    if (response.status === 429) return json({ error: "rate limited", detail: lastRateLimit }, 429);
    if (!response.ok) {
      const detail = (await response.text()).slice(0, 300);
      console.error("analyze: Mistral respondió", response.status, detail);
      return json({ error: "analysis failed", status: response.status, detail }, 502);
    }

    const content = extractContent((await response.json()) as MistralResponse);
    const cleaned = content.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "");
    const parsed = analysisSchema.safeParse(JSON.parse(cleaned));
    if (!parsed.success) {
      console.error("analyze: JSON no válido", parsed.error.issues.slice(0, 3));
      return json({ error: "analysis malformed", issues: parsed.error.issues.slice(0, 3) }, 502);
    }
    return json({ ...parsed.data, favicon: site.favicon });
  } catch (error) {
    const detail = error instanceof Error ? error.message : String(error);
    console.error("analyze: fallo", detail);
    return json({ error: "analysis failed", detail }, 502);
  }
};

export const config: Config = { path: "/api/analyze" };
