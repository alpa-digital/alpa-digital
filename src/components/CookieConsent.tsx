import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GA4_ID, GADS_ID, denyConsent, grantConsent, readConsent } from "@/lib/analytics";

/** Aviso de cookies con Consent Mode: solo aparece si hay medición configurada y el visitante no ha decidido. */
const CookieConsent = () => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if ((GA4_ID || GADS_ID) && readConsent() === null) setVisible(true);
  }, []);
  if (!visible) return null;
  return (
    <div role="dialog" aria-label="Uso de cookies" className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-md z-50 rounded-2xl border border-border bg-background shadow-2xl p-5">
      <p className="text-sm text-foreground font-medium mb-1">Cookies de medición</p>
      <p className="text-sm text-muted-foreground leading-relaxed mb-4">
        Usamos cookies para saber qué páginas funcionan y medir nuestras campañas. Puedes aceptarlas o rechazarlas; la web funciona igual. Más información en la{" "}
        <Link to="/politica-cookies" className="text-primary underline">política de cookies</Link>.
      </p>
      <div className="flex gap-2">
        <button onClick={() => { grantConsent(); setVisible(false); }} className="flex-1 bg-primary text-white rounded-full px-4 py-2 text-sm font-medium hover:bg-primary/90">Aceptar</button>
        <button onClick={() => { denyConsent(); setVisible(false); }} className="flex-1 rounded-full border border-border px-4 py-2 text-sm font-medium hover:bg-muted">Rechazar</button>
      </div>
    </div>
  );
};

export default CookieConsent;
