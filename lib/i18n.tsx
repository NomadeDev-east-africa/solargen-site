"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "fr" | "en";

/** Texte disponible dans les deux langues. */
export type Localized = { fr: string; en: string };

/** Résout un champ localisé selon la langue active. */
export const tr = (value: Localized, lang: Lang) => value[lang];

interface LangContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggle: () => void;
}

const LangContext = createContext<LangContextValue | null>(null);

const STORAGE_KEY = "solargen-lang";

export function LanguageProvider({ children }: { children: ReactNode }) {
  // On démarre toujours en "fr" pour que le rendu serveur et le premier
  // rendu client correspondent (pas d'erreur d'hydratation).
  const [lang, setLangState] = useState<Lang>("fr");

  // Après montage, on applique la préférence enregistrée.
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "fr" || stored === "en") setLangState(stored);
  }, []);

  // On reflète la langue sur <html lang="…"> (SEO + accessibilité).
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem(STORAGE_KEY, l);
  };

  const toggle = () => setLang(lang === "fr" ? "en" : "fr");

  return (
    <LangContext.Provider value={{ lang, setLang, toggle }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang doit être utilisé dans <LanguageProvider>");
  return ctx;
}
