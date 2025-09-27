import { useState } from "react";
import { X, Send, Mail, User, MessageSquare, Calendar, ExternalLink } from "lucide-react";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

// Validation schema
const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "El nombre es obligatorio" })
    .max(100, { message: "El nombre debe tener menos de 100 caracteres" }),
  email: z
    .string()
    .trim()
    .email({ message: "Email inválido" })
    .max(255, { message: "El email debe tener menos de 255 caracteres" }),
  phone: z
    .string()
    .trim()
    .optional()
    .transform(val => val === "" ? undefined : val),
  company: z
    .string()
    .trim()
    .optional()
    .transform(val => val === "" ? undefined : val),
  message: z
    .string()
    .trim()
    .min(1, { message: "El mensaje es obligatorio" })
    .max(1000, { message: "El mensaje debe tener menos de 1000 caracteres" })
});

type ContactFormData = z.infer<typeof contactSchema>;

interface ContactFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactForm = ({ isOpen, onClose }: ContactFormProps) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: ""
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = () => {
    try {
      contactSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Partial<Record<keyof ContactFormData, string>> = {};
        error.issues.forEach(err => {
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
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Create mailto link with form data
      const subject = encodeURIComponent("Nueva consulta desde el sitio web");
      const body = encodeURIComponent(
        `Nombre: ${formData.name}\n` +
        `Email: ${formData.email}\n` +
        `Teléfono: ${formData.phone || "No proporcionado"}\n` +
        `Empresa: ${formData.company || "No proporcionada"}\n\n` +
        `Mensaje:\n${formData.message}`
      );
      
      const mailtoLink = `mailto:info@alpa.digital?subject=${subject}&body=${body}`;
      
      // Open default email client
      window.location.href = mailtoLink;

      toast({
        title: "¡Gracias por contactarnos!",
        description: "Se abrirá tu cliente de email para enviar el mensaje.",
      });

      // Reset form and close
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        message: ""
      });
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "Hubo un problema al procesar tu solicitud. Por favor, intenta de nuevo.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-background rounded-2xl shadow-2xl border border-border max-w-lg w-full max-h-[85vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <Mail className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">Contacta con nosotros</h2>
              <p className="text-sm text-muted-foreground">Te respondemos en menos de 24h</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-muted transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-3 overflow-y-auto flex-1">
          <div className="grid grid-cols-2 gap-3">
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center space-x-2">
                <User className="w-4 h-4" />
                <span>Nombre *</span>
              </Label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Tu nombre completo"
                className={errors.name ? "border-red-500" : ""}
                maxLength={100}
              />
              {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>Email *</span>
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="tu@email.com"
                className={errors.email ? "border-red-500" : ""}
                maxLength={255}
              />
              {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {/* Phone */}
            <div className="space-y-2">
              <Label htmlFor="phone">Teléfono</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                placeholder="+34 600 000 000"
                maxLength={20}
              />
            </div>

            {/* Company */}
            <div className="space-y-2">
              <Label htmlFor="company">Empresa</Label>
              <Input
                id="company"
                type="text"
                value={formData.company}
                onChange={(e) => handleInputChange("company", e.target.value)}
                placeholder="Nombre de tu empresa"
                maxLength={100}
              />
            </div>
          </div>

          {/* Message */}
          <div className="space-y-2">
            <Label htmlFor="message" className="flex items-center space-x-2">
              <MessageSquare className="w-4 h-4" />
              <span>Mensaje *</span>
            </Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => handleInputChange("message", e.target.value)}
              placeholder="Cuéntanos sobre tu proyecto..."
              rows={3}
              className={errors.message ? "border-red-500" : ""}
              maxLength={1000}
            />
            <div className="flex justify-between items-center">
              {errors.message && <p className="text-sm text-red-500">{errors.message}</p>}
              <p className="text-xs text-muted-foreground ml-auto">
                {formData.message.length}/1000
              </p>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex space-x-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1"
            >
              {isSubmitting ? (
                "Enviando..."
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Enviar mensaje
                </>
              )}
            </Button>
          </div>

          {/* Divider */}
          <div className="flex items-center my-4">
            <div className="flex-1 h-px bg-border"></div>
            <span className="px-3 text-sm text-muted-foreground">o</span>
            <div className="flex-1 h-px bg-border"></div>
          </div>

          {/* Cal.com scheduling option */}
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-3">
              ¿Prefieres hablar directamente?
            </p>
            <a
              href="https://cal.com/alpa-digital-studio/30min?user=alpa-digital-studio&overlayCalendar=true"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-primary bg-primary/10 border border-primary/20 rounded-full hover:bg-primary/20 transition-all duration-300 hover:scale-105"
            >
              <Calendar className="w-4 h-4 mr-2" />
              Agenda una llamada directamente
              <ExternalLink className="w-3 h-3 ml-2" />
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;