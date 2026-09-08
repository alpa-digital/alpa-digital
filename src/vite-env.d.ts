/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ANALYZE_ENDPOINT?: string;
  readonly VITE_LEAD_ENDPOINT?: string;
  readonly VITE_GA4_ID?: string;
  readonly VITE_GADS_ID?: string;
  readonly [key: `VITE_GADS_CONVERSION_${string}`]: string | undefined;
}
