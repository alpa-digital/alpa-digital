import { useEffect, useState } from "react";
import { X, Send, Mail, User, MessageSquare } from "lucide-react";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { track, utmParams } from "@/lib/analytics";
import { CONTACT_ENDPOINT } from "@/config/endpoints";
import { site } from "@/data/site";
import { useCopy } from "@/i18n";
import type { Copy } from "@/i18n/es";

const buildSchema = (e: Copy["contact"]["errors"]) =>
  z.object({
    name: z.string().trim().min(1, { message: e.nameRequired }).max(100, { message: e.nameLong }),
    email: z.string().trim().email({ message: e.emailInvalid }).max(255, { message: e.emailLong }),
    phone: z.string().trim().optional().transform((val) => (val === "" ? undefined : val)),
    company: z.string().trim().optional().transform((val) => (val === "" ? undefined : val)),
    message: z.string().trim().min(1, { message: e.messageRequired }).max(1000, { message: e.messageLong }),
  });

type ContactFormData = z.infer<ReturnType<typeof buildSchema>>;

interface ContactFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const emptyForm: ContactFormData = { name: "", email: "", phone: "", company: "", message: "" };

/** Texto plano del mensaje, para el respaldo por mailto. */
const plainBody = (c: Copy["contact"], data: ContactFormData, source: string) =>
  `${c.name}: ${data.name}\n${c.email}: ${data.email}\n${c.phone}: ${data.phone || "-"}\n${c.company}: ${data.company || "-"}\n\n${data.message}` +
  (source ? `\n\n${source}` : "");

const ContactForm = ({ isOpen, onClose }: ContactFormProps) => {
  const [formData, setFormData] = useState<ContactFormData>(emptyForm);
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  // Campo trampa: los humanos no lo ven, los bots lo rellenan.
  const [honeypot, setHoneypot] = useState("");
  const { toast } = useToast();
  const c = useCopy();

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [isOpen, onClose]);

  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  /** Devuelve los datos limpios (sin espacios, sin campos vacíos) o null si algo falla. */
  const validateForm = (): ContactFormData | null => {
    try {
      const parsed = buildSchema(c.contact.errors).parse(formData);
      setErrors({});
      return parsed;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Partial<Record<keyof ContactFormData, string>> = {};
        error.issues.forEach((err) => {
          const field = err.path[0] as keyof ContactFormData;
          newErrors[field] = err.message;
        });
        setErrors(newErrors);
      }
      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = validateForm();
    if (!data) return;
    setIsSubmitting(true);

    const utm = utmParams();
    const source = utm.utm_campaign ? `Origen: ${utm.utm_source ?? "-"} / ${utm.utm_campaign}` : "";

    try {
      const response = await fetch(CONTACT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          page: typeof window !== "undefined" ? window.location.pathname : undefined,
          source: source || undefined,
          website: honeypot || undefined,
        }),
      });
      if (!response.ok) throw new Error(`contact ${response.status}`);

      track("contact_submit", { method: "form" });
      toast({ title: c.contact.toastTitle, description: c.contact.toastBody });
      setFormData(emptyForm);
      onClose();
    } catch {
      // Si el envío no sale (función sin configurar, red caída), el mensaje no se
      // pierde: se abre el cliente de correo con todo escrito.
      track("contact_submit", { method: "mailto" });
      const subject = encodeURIComponent(c.contact.mailSubject);
      const body = encodeURIComponent(plainBody(c.contact, data, source));
      window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
      toast({ title: c.contact.toastFallbackTitle, description: c.contact.toastFallbackBody });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] flex items-end sm:items-center justify-center sm:p-4" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-title"
        className="bg-background sm:rounded-2xl rounded-t-2xl shadow-2xl border border-border w-full max-w-xl max-h-[92vh] sm:max-h-[88vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-5 pt-5 pb-4 sm:px-6 border-b border-border">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 id="contact-title" className="text-lg sm:text-xl font-semibold text-foreground leading-tight">{c.contact.title}</h2>
                <p className="text-sm text-muted-foreground">{c.contact.subtitle}</p>
              </div>
            </div>
            <button onClick={onClose} aria-label={c.contact.close} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-muted transition-colors flex-shrink-0">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-3 overflow-y-auto flex-1">
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center space-x-2">
                <User className="w-4 h-4" />
                <span>{c.contact.name} *</span>
              </Label>
              <Input id="name" type="text" value={formData.name} onChange={(e) => handleInputChange("name", e.target.value)} placeholder={c.contact.namePlaceholder} className={errors.name ? "border-red-500" : ""} maxLength={100} />
              {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>{c.contact.email} *</span>
              </Label>
              <Input id="email" type="email" value={formData.email} onChange={(e) => handleInputChange("email", e.target.value)} placeholder={c.contact.emailPlaceholder} className={errors.email ? "border-red-500" : ""} maxLength={255} />
              {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="phone">{c.contact.phone}</Label>
              <Input id="phone" type="tel" value={formData.phone} onChange={(e) => handleInputChange("phone", e.target.value)} placeholder={c.contact.phonePlaceholder} maxLength={20} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company">{c.contact.company}</Label>
              <Input id="company" type="text" value={formData.company} onChange={(e) => handleInputChange("company", e.target.value)} placeholder={c.contact.companyPlaceholder} maxLength={100} />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message" className="flex items-center space-x-2">
              <MessageSquare className="w-4 h-4" />
              <span>{c.contact.message} *</span>
            </Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => handleInputChange("message", e.target.value)}
              placeholder={c.contact.messagePlaceholder}
              rows={4}
              className={errors.message ? "border-red-500" : ""}
              maxLength={1000}
            />
            <div className="flex justify-between items-center">
              {errors.message && <p className="text-sm text-red-500">{errors.message}</p>}
              <p className="text-xs text-muted-foreground ml-auto">{formData.message.length}/1000</p>
            </div>
          </div>

          {/* Trampa para bots: fuera de la vista y del foco, nunca la rellena una persona. */}
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            className="absolute left-[-9999px] w-px h-px opacity-0"
          />

          <div className="flex space-x-3 pt-2">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              {c.contact.cancel}
            </Button>
            <Button type="submit" disabled={isSubmitting} className="flex-1">
              {isSubmitting ? c.contact.sending : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  {c.contact.send}
                </>
              )}
            </Button>
          </div>

          <p className="text-center text-xs text-muted-foreground pt-1">
            {c.contact.directEmail}{" "}
            <a href={`mailto:${site.email}`} className="text-primary hover:underline">{site.email}</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
