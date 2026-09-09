import { lazy, Suspense, useEffect, useState } from "react";
import { X, Send, Mail, User, MessageSquare, Calendar, ExternalLink, Loader2 } from "lucide-react";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { track, utmParams } from "@/lib/analytics";
import { site } from "@/data/site";

// El embed de Cal.com solo existe en el navegador: se carga bajo demanda y nunca en el prerender.
const CalEmbed = lazy(() => import("@calcom/embed-react"));

/** Enlace de Cal.com sin dominio ni parámetros, p. ej. "alpa-digital-studio/30min". */
const CAL_LINK = site.calUrl.replace(/^https?:\/\/cal\.com\//, "").replace(/\?.*$/, "");

const contactSchema = z.object({
  name: z.string().trim().min(1, { message: "El nombre es obligatorio" }).max(100, { message: "El nombre debe tener menos de 100 caracteres" }),
  email: z.string().trim().email({ message: "Email inválido" }).max(255, { message: "El email debe tener menos de 255 caracteres" }),
  phone: z.string().trim().optional().transform((val) => (val === "" ? undefined : val)),
  company: z.string().trim().optional().transform((val) => (val === "" ? undefined : val)),
  message: z.string().trim().min(1, { message: "El mensaje es obligatorio" }).max(1000, { message: "El mensaje debe tener menos de 1000 caracteres" }),
});

type ContactFormData = z.infer<typeof contactSchema>;
export type ContactTab = "llamada" | "mensaje";

interface ContactFormProps {
  isOpen: boolean;
  onClose: () => void;
  /** Pestaña con la que se abre el modal. Por defecto, la reserva de llamada. */
  initialTab?: ContactTab;
}

const tabs: { id: ContactTab; label: string; Icon: typeof Calendar }[] = [
  { id: "llamada", label: "Reservar llamada", Icon: Calendar },
  { id: "mensaje", label: "Dejar un mensaje", Icon: MessageSquare },
];

const emptyForm: ContactFormData = { name: "", email: "", phone: "", company: "", message: "" };

const ContactForm = ({ isOpen, onClose, initialTab = "llamada" }: ContactFormProps) => {
  const [tab, setTab] = useState<ContactTab>(initialTab);
  const [formData, setFormData] = useState<ContactFormData>(emptyForm);
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen) setTab(initialTab);
  }, [isOpen, initialTab]);

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

  useEffect(() => {
    if (isOpen && tab === "llamada") track("cal_click", { place: "contact_modal_embed" });
  }, [isOpen, tab]);

  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validateForm = () => {
    try {
      contactSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Partial<Record<keyof ContactFormData, string>> = {};
        error.issues.forEach((err) => {
          const field = err.path[0] as keyof ContactFormData;
          newErrors[field] = err.message;
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    try {
      const subject = encodeURIComponent("Consulta de automatización con IA desde alpa.digital");
      const body = encodeURIComponent(
        `Nombre: ${formData.name}\n` +
          `Email: ${formData.email}\n` +
          `Teléfono: ${formData.phone || "No proporcionado"}\n` +
          `Empresa: ${formData.company || "No proporcionada"}\n\n` +
          `Mensaje:\n${formData.message}`
      );
      const utm = utmParams();
      const campaign = utm.utm_campaign ? encodeURIComponent(`\n\nOrigen: ${utm.utm_source ?? ""} / ${utm.utm_campaign}`) : "";
      track("contact_submit", { method: "mailto" });
      window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}${campaign}`;
      toast({ title: "¡Gracias por contactarnos!", description: "Se abrirá tu cliente de email para enviar el mensaje." });
      setFormData(emptyForm);
      onClose();
    } catch {
      toast({ title: "Error", description: "Hubo un problema al procesar tu solicitud. Por favor, intenta de nuevo.", variant: "destructive" });
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
        className="bg-background sm:rounded-2xl rounded-t-2xl shadow-2xl border border-border w-full max-w-3xl max-h-[92vh] sm:max-h-[88vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cabecera con pestañas */}
        <div className="px-5 pt-5 pb-3 sm:px-6 border-b border-border">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 id="contact-title" className="text-lg sm:text-xl font-semibold text-foreground leading-tight">Hablemos de tu empresa</h2>
                <p className="text-sm text-muted-foreground">Llamada de 30 minutos, o un mensaje y te respondemos en menos de 24 h</p>
              </div>
            </div>
            <button onClick={onClose} aria-label="Cerrar" className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-muted transition-colors flex-shrink-0">
              <X className="w-4 h-4" />
            </button>
          </div>
          <div role="tablist" aria-label="Cómo contactar" className="inline-flex w-full sm:w-auto rounded-full border border-border bg-muted/40 p-1">
            {tabs.map(({ id, label, Icon }) => {
              const active = tab === id;
              return (
                <button
                  key={id}
                  role="tab"
                  aria-selected={active}
                  onClick={() => setTab(id)}
                  className={`flex-1 sm:flex-none inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all ${
                    active ? "bg-primary text-white shadow-md shadow-primary/25" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {tab === "llamada" ? (
          <div className="flex-1 overflow-y-auto">
            <div className="relative min-h-[520px]">
              {/* Queda detrás del iframe de Cal.com; solo se ve mientras carga o si el script no llega. */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-sm text-muted-foreground" aria-hidden="true">
                <Loader2 className="w-6 h-6 animate-spin text-primary" />
                Cargando el calendario…
              </div>
              <Suspense fallback={null}>
                <CalEmbed calLink={CAL_LINK} config={{ layout: "month_view", theme: "light" }} className="relative z-10" style={{ width: "100%", height: "100%", minHeight: 520, overflow: "auto" }} />
              </Suspense>
            </div>
            <p className="px-5 sm:px-6 py-3 border-t border-border text-xs text-muted-foreground flex flex-wrap items-center justify-between gap-2">
              <span>Si el calendario no carga, puedes abrirlo en una pestaña nueva.</span>
              <a
                href={site.calUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track("cal_click", { place: "contact_modal_link" })}
                className="inline-flex items-center gap-1 text-primary hover:underline"
              >
                Abrir en Cal.com <ExternalLink className="w-3 h-3" />
              </a>
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-3 overflow-y-auto flex-1">
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center space-x-2">
                  <User className="w-4 h-4" />
                  <span>Nombre *</span>
                </Label>
                <Input id="name" type="text" value={formData.name} onChange={(e) => handleInputChange("name", e.target.value)} placeholder="Tu nombre completo" className={errors.name ? "border-red-500" : ""} maxLength={100} />
                {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>Email *</span>
                </Label>
                <Input id="email" type="email" value={formData.email} onChange={(e) => handleInputChange("email", e.target.value)} placeholder="tu@email.com" className={errors.email ? "border-red-500" : ""} maxLength={255} />
                {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="phone">Teléfono</Label>
                <Input id="phone" type="tel" value={formData.phone} onChange={(e) => handleInputChange("phone", e.target.value)} placeholder="+34 600 000 000" maxLength={20} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Empresa</Label>
                <Input id="company" type="text" value={formData.company} onChange={(e) => handleInputChange("company", e.target.value)} placeholder="Nombre de tu empresa" maxLength={100} />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message" className="flex items-center space-x-2">
                <MessageSquare className="w-4 h-4" />
                <span>¿Qué tarea te quita más tiempo? *</span>
              </Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => handleInputChange("message", e.target.value)}
                placeholder="Ej.: cada semana dedico horas a pasar facturas a mano, contestar las mismas preguntas por WhatsApp..."
                rows={4}
                className={errors.message ? "border-red-500" : ""}
                maxLength={1000}
              />
              <div className="flex justify-between items-center">
                {errors.message && <p className="text-sm text-red-500">{errors.message}</p>}
                <p className="text-xs text-muted-foreground ml-auto">{formData.message.length}/1000</p>
              </div>
            </div>

            <div className="flex space-x-3 pt-2">
              <Button type="button" variant="outline" onClick={onClose} className="flex-1">
                Cancelar
              </Button>
              <Button type="submit" disabled={isSubmitting} className="flex-1">
                {isSubmitting ? "Enviando..." : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Enviar mensaje
                  </>
                )}
              </Button>
            </div>

            <p className="text-center text-xs text-muted-foreground pt-1">
              ¿Prefieres contarlo de viva voz?{" "}
              <button type="button" onClick={() => setTab("llamada")} className="text-primary hover:underline">Reserva una llamada de 30 minutos</button>
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default ContactForm;
