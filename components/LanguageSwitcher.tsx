"use client";

/**
 * LanguageSwitcher — Fixed floating locale toggle (EN / FR).
 *
 * Positioned top-right, glassmorphic pill matching sovereign palette.
 * Persists current locale and links to the alternate path.
 *
 * Design notes:
 * - Only appears after the user passes the auth gate (rendered inside
 *   the authed branch of AuthShell).
 * - Uses <Link> for prefetch + fast client-side navigation.
 * - Small enough to stay non-intrusive; expands on hover.
 */
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LOCALES, type Lang, LANG_SHORT } from "@/lib/i18n";

type Props = {
  current: Lang;
};

export default function LanguageSwitcher({ current }: Props) {
  const pathname = usePathname() ?? "/";

  /**
   * Resolve the target path for the alternate locale.
   *   /        → /fr        (when switching to fr)
   *   /fr      → /          (when switching to en)
   *   /fr/foo  → /foo
   *   /foo     → /fr/foo
   */
  const pathFor = (target: Lang): string => {
    const stripped = pathname.replace(/^\/(fr|ar)(\/|$)/, "/");
    if (target === "en") return stripped || "/";
    if (stripped === "/") return `/${target}`;
    return `/${target}${stripped}`;
  };

  return (
    <nav
      aria-label="Language selection"
      className="fixed top-5 right-5 z-[60] flex items-center gap-1 px-1.5 py-1 backdrop-blur-md"
      style={{
        background: "rgba(10,25,47,0.55)",
        border: "1px solid rgba(184,149,74,0.4)",
        boxShadow: "0 2px 12px rgba(10,25,47,0.35)",
      }}
    >
      {LOCALES.map((code) => {
        const isActive = code === current;
        return (
          <Link
            key={code}
            href={pathFor(code)}
            aria-current={isActive ? "page" : undefined}
            prefetch={false}
            className={`
              font-cinzel tracking-[0.25em] text-[10px] md:text-[11px] font-semibold
              px-2.5 py-1.5 transition-all duration-300
              ${
                isActive
                  ? "text-sovereign bg-gold"
                  : "text-gold/75 hover:text-gold hover:bg-gold/10"
              }
            `}
          >
            {LANG_SHORT[code]}
          </Link>
        );
      })}
    </nav>
  );
}
