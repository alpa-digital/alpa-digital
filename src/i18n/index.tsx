import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { es, type Copy } from "./es";
import { en } from "./en";

export type Lang = "es" | "en";

const STORAGE_KEY = "alpa-lang";
const dictionaries: Record<Lang, Copy> = { es, en };

interface LanguageValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  c: Copy;
}

const LanguageContext = createContext<LanguageValue>({ lang: "es", setLang: () => {}, c: es });

/**
 * Idioma de la interfaz. Arranca siempre en español para que coincida con el HTML
 * prerenderizado (si no, la hidratación fallaría) y solo cambia si la persona lo
 * eligió antes: la elección se guarda en el navegador.
 */
export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLangState] = useState<Lang>("es");

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored === "en" || stored === "es") setLangState(stored);
    } catch {
      // Navegador sin almacenamiento: se queda en español.
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Sin almacenamiento la elección dura lo que dure la página.
    }
  }, []);

  const value = useMemo<LanguageValue>(() => ({ lang, setLang, c: dictionaries[lang] }), [lang, setLang]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

/** Textos de la interfaz en el idioma activo. */
export const useCopy = () => useContext(LanguageContext).c;

/** Idioma activo y función para cambiarlo. */
export const useLang = () => {
  const { lang, setLang } = useContext(LanguageContext);
  return { lang, setLang };
};
