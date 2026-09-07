import type { Config, Context } from "@netlify/functions";
import { z } from "zod";

const MISTRAL_URL = "https://api.mistral.ai/v1/chat/completions";
const MODEL = process.env.MISTRAL_MODEL ?? "mistral-small-latest";

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

async function fetchSite(url: URL): Promise<{ text: string; favicon?: string }> {
  const response = await fetch(url, {
    redirect: "follow",
    signal: AbortSignal.timeout(10000),
    headers: {
      "user-agent": "Mozilla/5.0 (compatible; AlpaDigitalBot/1.0; +https://alpa.digital)",
      accept: "text/html,application/xhtml+xml",
    },
  });
  if (!response.ok) throw new Error(`site responded ${response.status}`);
  const html = (await response.text()).slice(0, 400000);
  const text = htmlToText(html);
  if (text.length < 200) throw new Error("site text too short");
  const finalUrl = response.url ? new URL(response.url) : url;
  return { text: text.slice(0, 14000), favicon: extractFavicon(html, finalUrl) ?? `https://www.google.com/s2/favicons?domain=${finalUrl.hostname}&sz=128` };
}

interface MistralResponse {
  choices?: { message?: { content?: string | { type: string; text?: string }[] } }[];
}

async function askMistral(apiKey: string, hostname: string, siteText: string, structured: boolean): Promise<Response> {
  const userPrompt = `Web: ${hostname}\n\nTexto público de la web:\n"""\n${siteText}\n"""\n\nDevuelve el análisis de automatización para esta empresa.`;
  const responseFormat = structured
    ? { type: "json_schema", json_schema: { name: "automation_analysis", strict: true, schema: outputJsonSchema } }
    : { type: "json_object" };
  const messages = [
    { role: "system", content: structured ? systemPrompt : `${systemPrompt}\n\nEl JSON debe seguir este esquema:\n${JSON.stringify(outputJsonSchema)}` },
    { role: "user", content: userPrompt },
  ];
  return fetch(MISTRAL_URL, {
    method: "POST",
    signal: AbortSignal.timeout(45000),
    headers: { authorization: `Bearer ${apiKey}`, "content-type": "application/json", accept: "application/json" },
    body: JSON.stringify({ model: MODEL, temperature: 0.2, max_tokens: 2000, response_format: responseFormat, messages }),
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
  if (req.method !== "POST") return json({ error: "method not allowed" }, 405);
  const apiKey = process.env.MISTRAL_API_KEY;
  if (!apiKey) return json({ error: "analysis not configured" }, 503);

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
    site = await fetchSite(url);
  } catch (error) {
    return json({ error: "site unreachable", detail: error instanceof Error ? error.message : String(error) }, 422);
  }

  try {
    let response = await askMistral(apiKey, url.hostname, site.text, true);
    // Si el modelo configurado no admite json_schema, se reintenta con json_object.
    if (response.status === 400 || response.status === 422) {
      response = await askMistral(apiKey, url.hostname, site.text, false);
    }
    if (response.status === 429) return json({ error: "rate limited" }, 429);
    if (!response.ok) return json({ error: "analysis failed", status: response.status, detail: (await response.text()).slice(0, 300) }, 502);

    const content = extractContent((await response.json()) as MistralResponse);
    const cleaned = content.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "");
    const parsed = analysisSchema.safeParse(JSON.parse(cleaned));
    if (!parsed.success) return json({ error: "analysis malformed", issues: parsed.error.issues.slice(0, 3) }, 502);
    return json({ ...parsed.data, favicon: site.favicon });
  } catch (error) {
    return json({ error: "analysis failed", detail: error instanceof Error ? error.message : String(error) }, 502);
  }
};

export const config: Config = { path: "/api/analyze" };
