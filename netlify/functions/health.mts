import type { Config, Context } from "@netlify/functions";

// Comprobación rápida del despliegue: qué servicios están configurados (sin exponer valores).
export default async (_req: Request, _context: Context) =>
  new Response(
    JSON.stringify({
      ok: true,
      analysis: Boolean(process.env.LLM_API_KEY ?? process.env.MISTRAL_API_KEY),
      email: Boolean(process.env.RESEND_API_KEY),
      provider: new URL(process.env.LLM_BASE_URL ?? "https://api.mistral.ai/v1").hostname,
      model: process.env.LLM_MODEL ?? process.env.MISTRAL_MODEL ?? "mistral-small-latest",
      fallbackModel: process.env.LLM_FALLBACK_MODEL ?? process.env.MISTRAL_FALLBACK_MODEL ?? "open-mistral-nemo",
    }),
    { headers: { "content-type": "application/json" } }
  );

export const config: Config = { path: "/api/health" };
