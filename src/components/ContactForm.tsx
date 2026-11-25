import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Check } from "lucide-react";
import { z } from "zod";
import { track, utmParams } from "@/lib/analytics";
import { contactTopics, type ContactTopic } from "@/hooks/useContactForm";
import { CONTACT_ENDPOINT } from "@/config/endpoints";
import { site } from "@/data/site";
import { useCopy, useLang } from "@/i18n";
import type { Copy } from "@/i18n/es";

const buildSchema = (e: Copy["contact"]["errors"]) => z.object({
  name: z.string().trim().min(1, e.nameRequired).max(100, e.nameLong),
  email: z.string().trim().email(e.emailInvalid).max(255, e.emailLong),
  phone: z.string().trim().max(40).optional().transform(value => value || undefined),
  company: z.string().trim().max(120).optional().transform(value => value || undefined),
  message: z.string().trim().min(1, e.messageRequired).max(1000, e.messageLong),
});
type ContactFormData = z.infer<ReturnType<typeof buildSchema>>;
const emptyForm: ContactFormData = { name: "", email: "", phone: "", company: "", message: "" };

const ContactForm = ({ topic = "general", sourcePage = "/contacto/" }: { topic?: ContactTopic; sourcePage?: string }) => {
  const c = useCopy();
  const { lang } = useLang();
  const english = lang === "en";
  const [formData, setFormData] = useState<ContactFormData>(emptyForm);
  const [need, setNeed] = useState(topic);
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [honeypot, setHoneypot] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<AbortController | null>(null);

  useEffect(() => { setNeed(topic); }, [topic]);
  useEffect(() => { if (status === "success") successRef.current?.focus(); }, [status]);
  useEffect(() => () => requestRef.current?.abort(), []);

  const change = (field: keyof ContactFormData, value: string) => {
    setFormData(previous => ({ ...previous, [field]: value }));
    setErrors(previous => ({ ...previous, [field]: undefined }));
    if (status === "error") setStatus("idle");
  };
  const mailBody = `${c.contact.need}: ${c.contact.needOptions[need]}\n${c.contact.name}: ${formData.name}\n${c.contact.email}: ${formData.email}\n${c.contact.phone}: ${formData.phone || "-"}\n${c.contact.company}: ${formData.company || "-"}\n\n${formData.message}`;
  const mailHref = `mailto:${site.email}?subject=${encodeURIComponent(c.contact.mailSubject)}&body=${encodeURIComponent(mailBody)}`;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (status === "sending") return;
    const result = buildSchema(c.contact.errors).safeParse(formData);
    if (!result.success) {
      const nextErrors: typeof errors = {};
      result.error.issues.forEach(issue => { nextErrors[issue.path[0] as keyof ContactFormData] = issue.message; });
      setErrors(nextErrors);
      formRef.current?.querySelector<HTMLElement>(`#contact-${Object.keys(nextErrors)[0]}`)?.focus();
      return;
    }
    setErrors({});
    setStatus("sending");
    const controller = new AbortController();
    requestRef.current = controller;
    const timeout = window.setTimeout(() => controller.abort(), 20000);
    const utm = utmParams();
    const source = utm.utm_campaign ? `Origen: ${utm.utm_source ?? "-"} / ${utm.utm_campaign}` : undefined;
    try {
      const response = await fetch(CONTACT_ENDPOINT, {
        method: "POST", headers: { "Content-Type": "application/json" }, signal: controller.signal,
        body: JSON.stringify({ ...result.data, topic: need, topicLabel: c.contact.needOptions[need], page: sourcePage, source, website: honeypot || undefined }),
      });
      if (!response.ok) throw new Error("Contact request failed");
      // A hosting fallback can return index.html with 200; that is not a sent message.
      const contentType = response.headers.get("content-type") || "";
      if (contentType.includes("text/html")) throw new Error("Contact endpoint unavailable");
      if (contentType.includes("application/json")) {
        const payload = await response.json();
        if (payload.ok === false || payload.error) throw new Error("Contact endpoint rejected request");
      }
      track("contact_submit", { method: "form", topic: need });
      setStatus("success");
      setFormData(emptyForm);
    } catch {
      if (requestRef.current === controller) setStatus("error");
    } finally {
      window.clearTimeout(timeout);
      if (requestRef.current === controller) requestRef.current = null;
    }
  };

  if (status === "success") return <div ref={successRef} tabIndex={-1} className="contact-form-success" role="status">
    <Check aria-hidden="true" size={40} />
    <h2>{c.contact.toastTitle}</h2>
    <p>{c.contact.toastBody}</p>
    <button type="button" onClick={() => { setStatus("idle"); setErrors({}); }} className="contact-submit">{english ? "Send another enquiry" : "Enviar otra consulta"}<ArrowUpRight aria-hidden="true" size={20} /></button>
  </div>;

  const field = (id: "name" | "email" | "phone" | "company", type: string, required: boolean, maxLength: number, autoComplete: string) => <div className="contact-field">
    <label htmlFor={`contact-${id}`}>{c.contact[id]} {required ? <span aria-hidden="true">*</span> : <span className="contact-optional">({english ? "optional" : "opcional"})</span>}</label>
    <input id={`contact-${id}`} name={id} type={type} autoComplete={autoComplete} required={required} maxLength={maxLength} value={formData[id] || ""} placeholder={c.contact[`${id}Placeholder`]} onChange={event => change(id, event.target.value)} aria-invalid={!!errors[id]} aria-describedby={errors[id] ? `contact-${id}-error` : undefined} />
    {errors[id] && <p id={`contact-${id}-error`} className="contact-field-error" role="alert">{errors[id]}</p>}
  </div>;

  return <form ref={formRef} onSubmit={handleSubmit} noValidate className="contact-project-form" aria-labelledby="contact-form-title" aria-busy={status === "sending"}>
    <h2 id="contact-form-title">{english ? "Tell us about your project." : "Hablemos de tu proyecto."}</h2>
    <p className="contact-required-note">{english ? "Fields marked * are required." : "Los campos con * son obligatorios."}</p>
    <fieldset disabled={status === "sending"} className="contact-form-fields">
      <legend className="sr-only">{english ? "Project details" : "Datos de tu consulta"}</legend>
      <fieldset className="contact-needs"><legend>{c.contact.need}</legend><div>{contactTopics.map(id => <label key={id} className="contact-need"><input type="radio" name="topic" value={id} checked={need === id} onChange={() => setNeed(id)} /><span>{c.contact.needOptions[id]}</span></label>)}</div></fieldset>
      <div className="contact-fields-row">{field("name", "text", true, 100, "name")}{field("email", "email", true, 255, "email")}</div>
      <div className="contact-fields-row">{field("company", "text", false, 120, "organization")}{field("phone", "tel", false, 40, "tel")}</div>
      <div className="contact-field"><label htmlFor="contact-message">{c.contact.message} <span aria-hidden="true">*</span></label><textarea id="contact-message" name="message" required rows={5} maxLength={1000} value={formData.message} onChange={event => change("message", event.target.value)} placeholder={c.contact.messagePlaceholder} aria-invalid={!!errors.message} aria-describedby={`contact-message-count${errors.message ? " contact-message-error" : ""}`} />{errors.message && <p id="contact-message-error" className="contact-field-error" role="alert">{errors.message}</p>}<p id="contact-message-count" className="contact-message-count">{formData.message.length}/1000</p></div>
      <div className="contact-honeypot" aria-hidden="true"><label htmlFor="contact-website">Website</label><input id="contact-website" type="text" name="website" tabIndex={-1} autoComplete="off" value={honeypot} onChange={event => setHoneypot(event.target.value)} /></div>
      <p className="contact-data-note">{english ? "We will use these details to reply to your enquiry. For questions about your data, write to " : "Usaremos estos datos para responder a tu consulta. Para cualquier cuestión sobre tus datos, escribe a "}<a href={`mailto:${site.email}`}>{site.email}</a>.</p>
      {status === "error" && <div className="contact-send-error" role="alert"><p>{c.contact.toastFallbackBody}</p><a href={mailHref} onClick={() => track("contact_mailto_open", { topic: need })}>{english ? "Send from my email" : "Enviar desde mi correo"}<ArrowUpRight aria-hidden="true" size={18} /></a></div>}
      <button type="submit" disabled={status === "sending"} className="contact-submit">{status === "sending" ? c.contact.sending : c.contact.send}<ArrowUpRight aria-hidden="true" size={20} /></button>
    </fieldset>
  </form>;
};
export default ContactForm;
