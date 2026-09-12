import { useCopy, useLang, type Lang } from "@/i18n";

interface LanguageSwitchProps {
  /** En la barra flotante oscura los colores se invierten. */
  dark?: boolean;
}

const options: { id: Lang; label: string; full: string }[] = [
  { id: "es", label: "ES", full: "Español" },
  { id: "en", label: "EN", full: "English" },
];

/** Conmutador de idioma de la cabecera. */
const LanguageSwitch = ({ dark = false }: LanguageSwitchProps) => {
  const { lang, setLang } = useLang();
  const c = useCopy();

  return (
    <div
      role="group"
      aria-label={c.nav.language}
      className={`inline-flex items-center rounded-full border p-0.5 transition-colors duration-500 ${
        dark ? "border-white/15 bg-white/[0.06]" : "border-border bg-muted/50"
      }`}
    >
      {options.map(({ id, label, full }) => {
        const active = lang === id;
        return (
          <button
            key={id}
            type="button"
            lang={id}
            onClick={() => setLang(id)}
            aria-pressed={active}
            title={full}
            className={`rounded-full px-2.5 py-1 text-xs font-semibold tracking-wide transition-all duration-300 ${
              active
                ? dark
                  ? "bg-white text-[#0D0E11]"
                  : "bg-foreground text-background"
                : dark
                  ? "text-white/55 hover:text-white"
                  : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
};

export default LanguageSwitch;
