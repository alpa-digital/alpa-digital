import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Medición para SEO/SEM: GA4 y Google Ads con Consent Mode v2.
// Los identificadores se definen en el build: VITE_GA4_ID (G-XXXX) y VITE_GADS_ID (AW-XXXX).
export const GA4_ID: string = import.meta.env.VITE_GA4_ID || "";
export const GADS_ID: string = import.meta.env.VITE_GADS_ID || "";
export const CONSENT_KEY = "alpa-consent";

type Gtag = (...args: unknown[]) => void;
declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: Gtag;
  }
}

function gtag(...args: unknown[]) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push(args);
}

let loaded = false;

/** Carga gtag.js una sola vez, con consentimiento denegado por defecto (Consent Mode v2). */
export function loadAnalytics() {
  if (loaded || typeof window === "undefined" || (!GA4_ID && !GADS_ID)) return;
  loaded = true;
  window.gtag = window.gtag ?? gtag;
  gtag("consent", "default", { ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied", analytics_storage: "denied", wait_for_update: 500 });
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_ID || GADS_ID}`;
  document.head.appendChild(script);
  gtag("js", new Date());
  if (GA4_ID) gtag("config", GA4_ID, { send_page_view: false });
  if (GADS_ID) gtag("config", GADS_ID);
  const stored = readConsent();
  if (stored === "granted") grantConsent();
}

export function readConsent(): "granted" | "denied" | null {
  try {
    const v = localStorage.getItem(CONSENT_KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
}

export function grantConsent() {
  try {
    localStorage.setItem(CONSENT_KEY, "granted");
  } catch {
    /* sin almacenamiento */
  }
  gtag("consent", "update", { ad_storage: "granted", ad_user_data: "granted", ad_personalization: "granted", analytics_storage: "granted" });
}

export function denyConsent() {
  try {
    localStorage.setItem(CONSENT_KEY, "denied");
  } catch {
    /* sin almacenamiento */
  }
  gtag("consent", "update", { ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied", analytics_storage: "denied" });
}

/** Evento de negocio (GA4) y, si aplica, conversión de Google Ads. */
export function track(event: string, params: Record<string, unknown> = {}) {
  gtag("event", event, { ...params, ...utmParams() });
  const label = import.meta.env[`VITE_GADS_CONVERSION_${event.toUpperCase()}`] as string | undefined;
  if (GADS_ID && label) gtag("event", "conversion", { send_to: `${GADS_ID}/${label}` });
}

const UTM_KEY = "alpa-utm";

/** Guarda los parámetros de campaña de la primera visita para adjuntarlos a los leads. */
export function captureUtm() {
  if (typeof window === "undefined") return;
  const params = new URLSearchParams(window.location.search);
  const utm: Record<string, string> = {};
  ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid"].forEach((k) => {
    const v = params.get(k);
    if (v) utm[k] = v;
  });
  if (Object.keys(utm).length === 0) return;
  try {
    sessionStorage.setItem(UTM_KEY, JSON.stringify({ ...utm, landing: window.location.pathname, referrer: document.referrer }));
  } catch {
    /* sin almacenamiento */
  }
}

export function utmParams(): Record<string, string> {
  try {
    const raw = sessionStorage.getItem(UTM_KEY);
    return raw ? (JSON.parse(raw) as Record<string, string>) : {};
  } catch {
    return {};
  }
}

/** Inicializa la medición y envía una página vista por cada cambio de ruta. */
export function useAnalytics() {
  const { pathname } = useLocation();
  useEffect(() => {
    captureUtm();
    loadAnalytics();
  }, []);
  useEffect(() => {
    if (GA4_ID) gtag("event", "page_view", { page_path: pathname, page_location: window.location.href, page_title: document.title });
  }, [pathname]);
}
