/**
 * ╔═══════════════════════════════════════════════════════════════════╗
 * ║  i18n — Trilingual locale system for Kangala Web                   ║
 * ╠═══════════════════════════════════════════════════════════════════╣
 * ║                                                                    ║
 * ║  Supports three fully-switchable locales: EN · FR · AR.            ║
 * ║                                                                    ║
 * ║  Two dict types:                                                   ║
 * ║    Dict<T>     — Record<BaseLang, T>  → requires en + fr           ║
 * ║    FullDict<T> — Record<Lang, T>      → requires en + fr + ar      ║
 * ║                                                                    ║
 * ║  Pattern used in scenes:                                           ║
 * ║                                                                    ║
 * ║    // 2-lang scene (AR falls back to EN via resolveLang):          ║
 * ║    const DICT: Dict<{ title: string }> = { en: {...}, fr: {...} }; ║
 * ║    const t = DICT[resolveLang(lang)];                              ║
 * ║                                                                    ║
 * ║    // 3-lang scene (explicit AR content):                          ║
 * ║    const DICT: FullDict<{ title: string }> = {                     ║
 * ║      en: {...}, fr: {...}, ar: {...} };                            ║
 * ║    const t = DICT[lang ?? "en"];                                   ║
 * ║                                                                    ║
 * ╚═══════════════════════════════════════════════════════════════════╝
 */

export const LOCALES = ["en", "fr", "ar"] as const;
export type Lang = (typeof LOCALES)[number];

/** Base locales — used by Dict (2-lang scenes). */
export type BaseLang = "en" | "fr";

export const DEFAULT_LANG: BaseLang = "en";

export function isLang(value: string | undefined | null): value is Lang {
  return value === "en" || value === "fr" || value === "ar";
}

/**
 * Resolves any Lang to a BaseLang. Arabic falls back to English
 * for scenes that do not provide explicit AR translations.
 */
export function resolveLang(lang?: Lang): BaseLang {
  return lang === "ar" ? "en" : (lang ?? "en");
}

/**
 * 2-lang dict (en + fr required). Use resolveLang() to access.
 *   const DICT: Dict<MyShape> = { en: {...}, fr: {...} };
 *   const t = DICT[resolveLang(lang)];
 */
export type Dict<T> = Record<BaseLang, T>;

/**
 * 3-lang dict (en + fr + ar required). AR-aware scenes use this.
 *   const DICT: FullDict<MyShape> = { en: {...}, fr: {...}, ar: {...} };
 *   const t = DICT[lang ?? "en"];
 */
export type FullDict<T> = Record<Lang, T>;

/**
 * Human labels for the language switcher.
 */
export const LANG_LABELS: Record<Lang, string> = {
  en: "English",
  fr: "Français",
  ar: "العربية",
};

export const LANG_SHORT: Record<Lang, string> = {
  en: "EN",
  fr: "FR",
  ar: "AR",
};

/**
 * Standard prop signature for every scene component.
 * All scenes default to English for backwards compatibility.
 */
export type SceneProps = {
  lang?: Lang;
};
