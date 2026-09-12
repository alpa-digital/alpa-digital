import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCopy } from "@/i18n";
import { GA4_ID, GADS_ID, denyConsent, grantConsent, readConsent } from "@/lib/analytics";

/** Aviso de cookies con Consent Mode: solo aparece si hay medición configurada y el visitante no ha decidido. */
const CookieConsent = () => {
  const [visible, setVisible] = useState(false);
  const c = useCopy();
  useEffect(() => {
    if ((GA4_ID || GADS_ID) && readConsent() === null) setVisible(true);
  }, []);
  if (!visible) return null;
  return (
    <div role="dialog" aria-label="Uso de cookies" className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-md z-50 rounded-2xl border border-border bg-background shadow-2xl p-5">
      <p className="text-sm text-foreground font-medium mb-1">{c.cookies.title}</p>
      <p className="text-sm text-muted-foreground leading-relaxed mb-4">
        {c.cookies.textStart}
        <Link to="/politica-cookies" className="text-primary underline">{c.cookies.policy}</Link>{c.cookies.textEnd}
      </p>
      <div className="flex gap-2">
        <button onClick={() => { grantConsent(); setVisible(false); }} className="flex-1 bg-primary text-white rounded-full px-4 py-2 text-sm font-medium hover:bg-primary/90">{c.cookies.accept}</button>
        <button onClick={() => { denyConsent(); setVisible(false); }} className="flex-1 rounded-full border border-border px-4 py-2 text-sm font-medium hover:bg-muted">{c.cookies.reject}</button>
      </div>
    </div>
  );
};

export default CookieConsent;
