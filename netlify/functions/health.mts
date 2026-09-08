import type { Config, Context } from "@netlify/functions";

// Comprobación rápida del despliegue: qué servicios están configurados (sin exponer valores).
export default async (_req: Request, _context: Context) =>
  new Response(
    JSON.stringify({
      ok: true,
      analysis: Boolean(process.env.LLM_API_KEY || process.env.OPENAI_API_KEY || process.env.MISTRAL_API_KEY),
      email: Boolean(process.env.RESEND_API_KEY),
      provider: process.env.LLM_BASE_URL && process.env.LLM_API_KEY ? new URL(process.env.LLM_BASE_URL).hostname : process.env.OPENAI_API_KEY ? "api.openai.com" : "api.mistral.ai",
      model: process.env.LLM_BASE_URL && process.env.LLM_API_KEY ? process.env.LLM_MODEL ?? "gpt-4o-mini" : process.env.OPENAI_API_KEY ? process.env.OPENAI_MODEL ?? "gpt-4o-mini" : process.env.MISTRAL_MODEL ?? "mistral-small-latest",
    }),
    { headers: { "content-type": "application/json" } }
  );

export const config: Config = { path: "/api/health" };
