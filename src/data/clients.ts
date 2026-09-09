/**
 * Empresas que han confiado en Alpa Digital.
 *
 * Logos a color: colocar el archivo en `src/assets/logos/<slug>.(svg|png|webp)`.
 * Si no existe, el componente usa la versión monocroma (`src/assets/<Nombre>Logo.png`)
 * teñida con `tint`, y si tampoco existe, muestra el nombre en texto.
 */
export interface Client {
  slug: string;
  name: string;
  /** Color oficial de marca para la versión monocroma, si se conoce con certeza. */
  tint?: string;
  /** Archivo monocromo blanco heredado, en src/assets. */
  mono?: string;
  /** Ajuste de tamaño para logos con mucho margen interno. */
  scale?: number;
}

export const clients: Client[] = [
  { slug: "ac-marca", name: "AC Marca", mono: "ACMarcaLogo", scale: 1.25 },
  { slug: "caf", name: "CAF", mono: "CAFLogo" },
  { slug: "cepsa", name: "Cepsa", mono: "CepsalLogo" },
  { slug: "cirsa", name: "Cirsa", mono: "CirsaLogo" },
  { slug: "deoleo", name: "Deoleo", mono: "DeoleoLogo" },
  { slug: "esteve", name: "Esteve" },
  { slug: "fluidra", name: "Fluidra" },
  { slug: "goodyear", name: "Goodyear", mono: "GoodyearLogo", scale: 1.5 },
  { slug: "logista", name: "Logista", mono: "LogistaLogo" },
  { slug: "peralada", name: "Grup Peralada", mono: "PeraladalLogo" },
  { slug: "telefonica", name: "Telefónica Tech", mono: "TelefonicaLogo", tint: "#0066FF" },
  { slug: "vectalia", name: "Vectalia", mono: "VectaliaLogo" },
];
