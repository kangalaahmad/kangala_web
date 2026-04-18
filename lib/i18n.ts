/**
 * ╔═══════════════════════════════════════════════════════════════════╗
 * ║  i18n — Lightweight locale system for Kangala Web                  ║
 * ╠═══════════════════════════════════════════════════════════════════╣
 * ║                                                                    ║
 * ║  Supports two locales: English (default) and French.               ║
 * ║  Arabic text remains in-place inside scenes as a ceremonial        ║
 * ║  parallel layer (bilingual storytelling), independent of locale.   ║
 * ║                                                                    ║
 * ║  Pattern used in scenes:                                           ║
 * ║                                                                    ║
 * ║    type Props = { lang?: Lang };                                   ║
 * ║    const DICT: Dict<{ title: string; sub: string }> = {            ║
 * ║      en: { title: "Our Vision", sub: "..." },                      ║
 * ║      fr: { titre: "Notre Vision", sub: "..." },                    ║
 * ║    };                                                              ║
 * ║    export default function Scene({ lang = "en" }: Props) {         ║
 * ║      const t = DICT[lang];                                         ║
 * ║      return <h1>{t.title}</h1>;                                    ║
 * ║    }                                                               ║
 * ║                                                                    ║
 * ╚═══════════════════════════════════════════════════════════════════╝
 */

export const LOCALES = ["en", "fr"] as const;
export type Lang = (typeof LOCALES)[number];

export const DEFAULT_LANG: Lang = "en";

export function isLang(value: string | undefined | null): value is Lang {
  return value === "en" || value === "fr";
}

/**
 * Typed dictionary helper. Use as:
 *   const DICT: Dict<MyShape> = { en: {...}, fr: {...} };
 */
export type Dict<T> = Record<Lang, T>;

/**
 * Human labels for the language switcher.
 */
export const LANG_LABELS: Dict<string> = {
  en: "English",
  fr: "Français",
};

export const LANG_SHORT: Dict<string> = {
  en: "EN",
  fr: "FR",
};

/**
 * Standard prop signature for every scene component.
 * All scenes default to English for backwards compatibility.
 */
export type SceneProps = {
  lang?: Lang;
};
