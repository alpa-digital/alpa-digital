/**
 * Empresas que han confiado en Alpa Digital.
 *
 * Logos: `src/assets/logos/<slug>.(svg|png|webp|jpg)` o, si no existe, el archivo
 * heredado `src/assets/<mono>.png`. Se muestran sin filtros, con su color real.
 * Si no hay ningún archivo, aparece el nombre en texto.
 */
export interface Client {
  slug: string;
  name: string;
  /** Nombre base del archivo heredado en src/assets (sin extensión). */
  mono?: string;
  /** Ajuste de tamaño para logos con mucho margen interno. */
  scale?: number;
  /** Solo para archivos monocromos blancos: color de marca con el que se tiñen. */
  tint?: string;
}

export const clients: Client[] = [
  { slug: "ac-marca", name: "AC Marca", mono: "ACMarcaLogo", scale: 1.25 },
  { slug: "caf", name: "CAF", mono: "CAFLogo" },
  { slug: "cepsa", name: "Cepsa", mono: "CepsalLogo" },
  { slug: "cirsa", name: "Cirsa", mono: "CirsaLogo" },
  { slug: "deoleo", name: "Deoleo", mono: "DeoleoLogo" },
  { slug: "esteve", name: "Esteve", mono: "EsteveLogo" },
  { slug: "fluidra", name: "Fluidra", mono: "FluidraLogo" },
  { slug: "goodyear", name: "Goodyear", mono: "GoodyearLogo", scale: 1.5 },
  { slug: "logista", name: "Logista", mono: "LogistaLogo" },
  { slug: "peralada", name: "Grup Peralada", mono: "PeraladalLogo" },
  { slug: "telefonica", name: "Telefónica Tech", mono: "TelefonicaLogo", tint: "#0066FF" },
  { slug: "vectalia", name: "Vectalia", mono: "VectaliaLogo" },
];
