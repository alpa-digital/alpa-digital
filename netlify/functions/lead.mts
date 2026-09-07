import type { Config, Context } from "@netlify/functions";
import { z } from "zod";

const areaNames: Record<string, string> = {
  atencion: "Atención al cliente",
  ventas: "Ventas",
  admin: "Administración",
  rrhh: "Recursos humanos",
  marketing: "Marketing",
  direccion: "Dirección",
};

const leadSchema = z.object({
  email: z.string().trim().email().max(255),
  url: z.string().trim().max(300),
  sector: z.string().max(40).optional(),
  analysis: z
    .object({
      company: z.string(),
      sector: z.string(),
      summary: z.string(),
      source: z.string().optional(),
      areas: z.array(
        z.object({
          id: z.string(),
          score: z.number(),
          title: z.string(),
          description: z.string(),
          hoursPerWeek: z.number(),
        })
      ),
    })
    .nullable()
    .optional(),
});

type Lead = z.infer<typeof leadSchema>;

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c] as string));

function reportHtml(lead: Lead): string {
  const analysis = lead.analysis;
  const rows = (analysis?.areas ?? [])
    .map(
      (a) => `
      <tr>
        <td style="padding:12px 0;border-top:1px solid #e5e7eb;vertical-align:top;width:140px;color:#0066ff;font-weight:600">${escapeHtml(areaNames[a.id] ?? a.id)}</td>
        <td style="padding:12px 0;border-top:1px solid #e5e7eb;vertical-align:top">
          <strong>${escapeHtml(a.title)}</strong><br>
          <span style="color:#4b5563">${escapeHtml(a.description)}</span><br>
          <span style="color:#6b7280;font-size:13px">Potencial ${a.score}/100 · ≈ ${a.hoursPerWeek} h/semana</span>
        </td>
      </tr>`
    )
    .join("");
  const total = (analysis?.areas ?? []).reduce((sum, a) => sum + a.hoursPerWeek, 0);
  return `
  <div style="font-family:Arial,Helvetica,sans-serif;max-width:640px;margin:0 auto;color:#111827;line-height:1.6">
    <h1 style="font-size:22px;font-weight:600">Tu mapa de automatización${analysis ? ` · ${escapeHtml(analysis.company)}` : ""}</h1>
    ${analysis ? `<p style="color:#4b5563">${escapeHtml(analysis.summary)}</p>` : ""}
    ${analysis ? `<p><strong>${total} horas a la semana</strong> de trabajo repetitivo que podrían automatizarse.</p>` : ""}
    <table style="width:100%;border-collapse:collapse;font-size:15px">${rows}</table>
    <p style="margin-top:24px">Si quieres que revisemos juntos por dónde empezar, reserva 30 minutos aquí:
      <a href="https://cal.com/alpa-digital-studio/30min" style="color:#0066ff">cal.com/alpa-digital-studio/30min</a></p>
    <p style="color:#6b7280;font-size:13px;margin-top:32px">Alpa Digital · Automatización e IA para pymes · info@alpa.digital</p>
  </div>`;
}

async function sendEmail(apiKey: string, message: { from: string; to: string[]; subject: string; html: string; replyTo?: string }) {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { authorization: `Bearer ${apiKey}`, "content-type": "application/json" },
    body: JSON.stringify({ from: message.from, to: message.to, subject: message.subject, html: message.html, reply_to: message.replyTo }),
  });
  if (!response.ok) throw new Error(`resend ${response.status}: ${await response.text()}`);
}

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json" } });

export default async (req: Request, _context: Context) => {
  if (req.method !== "POST") return json({ error: "method not allowed" }, 405);
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return json({ error: "email not configured" }, 503);

  let lead: Lead;
  try {
    lead = leadSchema.parse(await req.json());
  } catch {
    return json({ error: "invalid request" }, 400);
  }

  const from = process.env.LEAD_FROM_EMAIL ?? "Alpa Digital <info@alpa.digital>";
  const inbox = process.env.LEAD_TO_EMAIL ?? "info@alpa.digital";
  const domain = lead.url.replace(/^https?:\/\//i, "").replace(/^www\./i, "").split("/")[0];

  try {
    await sendEmail(apiKey, {
      from,
      to: [lead.email],
      subject: `Tu mapa de automatización para ${domain}`,
      html: reportHtml(lead),
      replyTo: inbox,
    });
    await sendEmail(apiKey, {
      from,
      to: [inbox],
      subject: `Nuevo lead del analizador: ${domain}`,
      replyTo: lead.email,
      html: `
        <p><strong>Email:</strong> ${escapeHtml(lead.email)}<br>
        <strong>Web:</strong> ${escapeHtml(lead.url)}<br>
        <strong>Sector:</strong> ${escapeHtml(lead.sector ?? "no indicado")}<br>
        <strong>Origen del análisis:</strong> ${escapeHtml(lead.analysis?.source ?? "sin análisis")}</p>
        ${lead.analysis ? reportHtml(lead) : ""}`,
    });
  } catch (error) {
    return json({ error: "send failed", detail: error instanceof Error ? error.message : String(error) }, 502);
  }

  return json({ ok: true });
};

export const config: Config = { path: "/api/lead" };
