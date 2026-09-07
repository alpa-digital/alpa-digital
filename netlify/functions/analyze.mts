import type { Config, Context } from "@netlify/functions";
import Anthropic from "@anthropic-ai/sdk";
import { zodOutputFormat } from "@anthropic-ai/sdk/helpers/zod";
import { z } from "zod";

const requestSchema = z.object({
  url: z.string().min(3).max(300),
  sector: z.string().max(40).optional(),
});

const analysisSchema = z.object({
  company: z.string().describe("Nombre de la empresa tal y como aparece en su web"),
  sector: z.string().describe("Sector y actividad en una frase corta, en español"),
  summary: z.string().describe("Dos frases en español dirigidas a quien dirige la empresa: qué trabajo repetitivo se ha detectado y cuántas horas semanales podrían ahorrarse"),
  areas: z
    .array(
      z.object({
        id: z.enum(["atencion", "ventas", "admin", "rrhh", "marketing", "direccion"]),
        score: z.number().int().min(0).max(100).describe("Potencial de automatización de 0 a 100"),
        title: z.string().describe("Nombre de la automatización concreta, máximo 8 palabras, en español"),
        description: z.string().describe("Qué haría la automatización en esta empresa, en 1 o 2 frases sencillas, en español"),
        hoursPerWeek: z.number().int().min(0).max(40).describe("Horas semanales de trabajo manual que ahorraría"),
      })
    )
    .length(6)
    .describe("Exactamente una entrada por área: atencion, ventas, admin, rrhh, marketing y direccion"),
});

const systemPrompt = `Eres consultor de automatización con IA para pymes en España. A partir del texto público de la web de una empresa, identificas tareas repetitivas y propones automatizaciones concretas por área.

Reglas:
- Basa cada propuesta en lo que la web muestra (productos, servicios, cómo captan clientes, cómo se contacta con ellos). Si la web no da información sobre un área, propón algo típico del sector pero con una puntuación más baja.
- Escribe para el dueño de una pyme sin conocimientos técnicos: nada de jerga, nada de nombres de herramientas.
- Sé concreto: "Presupuestos de reformas a partir de fotos" es mejor que "Optimizar el proceso comercial".
- Las horas semanales deben ser realistas para una empresa de 5 a 50 personas.`;

function normalizeUrl(raw: string): URL | null {
  try {
    const url = new URL(raw.includes("://") ? raw : `https://${raw}`);
    if (url.protocol !== "https:" && url.protocol !== "http:") return null;
    const host = url.hostname.toLowerCase();
    if (
      host === "localhost" ||
      /^(\d{1,3}\.){3}\d{1,3}$/.test(host) ||
      host.endsWith(".local") ||
      host.endsWith(".internal") ||
      !host.includes(".")
    ) {
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

async function fetchSiteText(url: URL): Promise<string> {
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
  return text.slice(0, 14000);
}

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json" } });

export default async (req: Request, _context: Context) => {
  if (req.method !== "POST") return json({ error: "method not allowed" }, 405);
  if (!process.env.ANTHROPIC_API_KEY) return json({ error: "analysis not configured" }, 503);

  let input: z.infer<typeof requestSchema>;
  try {
    input = requestSchema.parse(await req.json());
  } catch {
    return json({ error: "invalid request" }, 400);
  }

  const url = normalizeUrl(input.url);
  if (!url) return json({ error: "invalid url" }, 400);

  let siteText: string;
  try {
    siteText = await fetchSiteText(url);
  } catch (error) {
    return json({ error: "site unreachable", detail: error instanceof Error ? error.message : String(error) }, 422);
  }

  const client = new Anthropic();
  try {
    const response = await client.messages.parse({
      model: "claude-opus-5",
      max_tokens: 4000,
      output_config: { effort: "medium", format: zodOutputFormat(analysisSchema) },
      system: systemPrompt,
      messages: [
        {
          role: "user",
          content: `Web: ${url.hostname}\nSector indicado por el usuario: ${input.sector ?? "no indicado"}\n\nTexto público de la web:\n"""\n${siteText}\n"""\n\nDevuelve el análisis de automatización para esta empresa.`,
        },
      ],
    });
    if (response.stop_reason === "refusal" || !response.parsed_output) {
      return json({ error: "analysis unavailable" }, 502);
    }
    return json(response.parsed_output);
  } catch (error) {
    if (error instanceof Anthropic.RateLimitError) return json({ error: "rate limited" }, 429);
    if (error instanceof Anthropic.APIError) return json({ error: "analysis failed", status: error.status }, 502);
    return json({ error: "analysis failed" }, 500);
  }
};

export const config: Config = { path: "/api/analyze" };
