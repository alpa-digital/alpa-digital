import type { Config, Context } from "@netlify/functions";

// Comprobación rápida del despliegue: qué servicios están configurados (sin exponer valores).
export default async (_req: Request, _context: Context) =>
  new Response(
    JSON.stringify({
      ok: true,
      analysis: Boolean(process.env.MISTRAL_API_KEY),
      email: Boolean(process.env.RESEND_API_KEY),
      model: process.env.MISTRAL_MODEL ?? "mistral-small-latest",
    }),
    { headers: { "content-type": "application/json" } }
  );

export const config: Config = { path: "/api/health" };
