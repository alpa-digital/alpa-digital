import { clients, type Client } from "@/data/clients";

// Logos: primero src/assets/logos/<slug>.*, si no, el archivo heredado src/assets/<Nombre>Logo.png.
// Se muestran tal cual, sin filtros ni tintes, para que se vea el color real.
const slugLogos = import.meta.glob<string>("../assets/logos/*.{svg,png,webp,jpg}", { eager: true, import: "default" });
const legacyLogos = import.meta.glob<string>("../assets/*Logo.{svg,png,webp,jpg}", { eager: true, import: "default" });

function findAsset(map: Record<string, string>, base: string): string | undefined {
  const key = Object.keys(map).find((k) => k.replace(/^.*\//, "").replace(/\.[a-z]+$/i, "").toLowerCase() === base.toLowerCase());
  return key ? map[key] : undefined;
}

/** Cliente por slug; si no está en la lista, se devuelve uno mínimo con el slug como nombre. */
export function clientBySlug(slug: string): Client {
  return clients.find((client) => client.slug === slug) ?? { slug, name: slug };
}

interface ClientLogoProps {
  client: Client;
  /** Tamaño del logo cuando es una imagen normal. */
  imgClass?: string;
  /** Tamaño del logo cuando es un archivo monocromo que se tiñe con una máscara. */
  maskClass?: string;
  /** Estilo del nombre en texto cuando todavía no hay archivo de logo. */
  textClass?: string;
}

/**
 * Logo de un cliente, con el nombre en texto como respaldo.
 * Lo usan la rejilla de clientes y las reseñas, así que los tamaños son configurables.
 */
const ClientLogo = ({
  client,
  imgClass = "max-w-[78%] max-h-[62%]",
  maskClass = "w-[78%] h-[62%]",
  textClass = "text-lg md:text-xl font-semibold tracking-tight text-foreground/75",
}: ClientLogoProps) => {
  const src = findAsset(slugLogos, client.slug) ?? (client.mono ? findAsset(legacyLogos, client.mono) : undefined);
  if (!src) return <span className={textClass}>{client.name}</span>;
  if (client.tint) {
    // Archivo blanco sobre transparente: se usa como máscara y se pinta con el color de marca.
    const mask = `url(${src}) center / contain no-repeat`;
    return (
      <span
        role="img"
        aria-label={`Logo de ${client.name}`}
        className={`block ${maskClass}`}
        style={{ WebkitMask: mask, mask, backgroundColor: client.tint }}
      />
    );
  }
  return (
    <img
      src={src}
      alt={`Logo de ${client.name}`}
      className={`${imgClass} object-contain`}
      style={client.scale ? { transform: `scale(${client.scale})` } : undefined}
      loading="lazy"
      width="160"
      height="60"
    />
  );
};

export default ClientLogo;
