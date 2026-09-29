import type { Config, Context } from "@netlify/functions";
import { z } from "zod";

/**
 * Formulario de contacto de la web: envía el mensaje a la bandeja de Alpa y
 * una confirmación a quien escribe. No hay reserva de llamada: este es el
 * único camino de contacto desde la web.
 */
const contactSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().max(40).optional(),
  company: z.string().trim().max(120).optional(),
  message: z.string().trim().min(1).max(1000),
  /** Página desde la que se envía, para saber qué contenido trae al cliente. */
  page: z.string().trim().max(300).optional(),
  /** Campaña de origen, si la visita venía con UTM. */
  source: z.string().trim().max(200).optional(),
  /** Trampa para bots: si viene rellena, se descarta en silencio. */
  website: z.string().max(200).optional(),
});

type ContactMessage = z.infer<typeof contactSchema>;

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c] as string));

const paragraphs = (value: string) =>
  escapeHtml(value)
    .split(/\n{2,}/)
    .map((block) => `<p style="margin:0 0 12px">${block.replace(/\n/g, "<br>")}</p>`)
    .join("");

function inboxHtml(msg: ContactMessage): string {
  const row = (label: string, value?: string) =>
    value ? `<tr><td style="padding:4px 12px 4px 0;color:#6b7280">${label}</td><td style="padding:4px 0"><strong>${escapeHtml(value)}</strong></td></tr>` : "";
  return `
  <div style="font-family:Arial,Helvetica,sans-serif;max-width:640px;margin:0 auto;color:#111827;line-height:1.6">
    <h1 style="font-size:20px;font-weight:600;margin:0 0 16px">Nuevo mensaje desde alpa.digital</h1>
    <table style="font-size:15px;border-collapse:collapse;margin-bottom:20px">
      ${row("Nombre", msg.name)}
      ${row("Email", msg.email)}
      ${row("Teléfono", msg.phone)}
      ${row("Empresa", msg.company)}
      ${row("Página", msg.page)}
      ${row("Origen", msg.source)}
    </table>
    <div style="font-size:15px;border-top:1px solid #e5e7eb;padding-top:16px">${paragraphs(msg.message)}</div>
  </div>`;
}

function confirmationHtml(msg: ContactMessage): string {
  return `
  <div style="font-family:Arial,Helvetica,sans-serif;max-width:640px;margin:0 auto;color:#111827;line-height:1.6">
    <h1 style="font-size:20px;font-weight:600;margin:0 0 12px">Hemos recibido tu mensaje</h1>
    <p style="color:#4b5563">Hola ${escapeHtml(msg.name)}, gracias por escribirnos. Lo leemos hoy mismo y te respondemos en menos de 24 horas laborables.</p>
    <p style="color:#4b5563">Esto es lo que nos has contado:</p>
    <div style="font-size:15px;border-left:3px solid #0066ff;padding-left:16px;color:#4b5563">${paragraphs(msg.message)}</div>
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

  let msg: ContactMessage;
  try {
    msg = contactSchema.parse(await req.json());
  } catch {
    return json({ error: "invalid request" }, 400);
  }

  // Campo trampa relleno: es un bot. Se responde ok para no darle pistas.
  if (msg.website) return json({ ok: true });

  const from = process.env.LEAD_FROM_EMAIL ?? "Alpa Digital <info@alpa.digital>";
  const inbox = process.env.LEAD_TO_EMAIL ?? "info@alpa.digital";

  try {
    await sendEmail(apiKey, {
      from,
      to: [inbox],
      subject: `Nuevo mensaje de ${msg.name}${msg.company ? ` (${msg.company})` : ""}`,
      html: inboxHtml(msg),
      replyTo: msg.email,
    });
  } catch (error) {
    return json({ error: "send failed", detail: error instanceof Error ? error.message : String(error) }, 502);
  }

  // La confirmación es cortesía: si falla, el mensaje ya está en la bandeja.
  try {
    await sendEmail(apiKey, {
      from,
      to: [msg.email],
      subject: "Hemos recibido tu mensaje · Alpa Digital",
      html: confirmationHtml(msg),
      replyTo: inbox,
    });
  } catch {
    // Sin ruido: el envío principal ha salido bien.
  }

  return json({ ok: true });
};

export const config: Config = { path: "/api/contact" };
