import type { Metadata } from "next";
import { Cairo, Cinzel, Cormorant_Garamond, Inter, Noto_Naskh_Arabic } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

/* ─────────────────────── Font loading strategy ───────────────────────
   Goal: eliminate FOUT (Flash of Unstyled Text).

   - `preload: true`         → Next.js injects <link rel="preload"> so the
                                browser starts downloading fonts immediately.
   - `display: "swap"`       → shows fallback if font not ready (prevents
                                invisible text); combined with fallback lists
                                below that mimic the target metrics, the swap
                                is imperceptible.
   - `adjustFontFallback`    → Next auto-computes fallback metric overrides
                                for Latin fonts to prevent CLS on swap.
   - Reduced weight palette  → fewer files to load = faster render.
   ──────────────────────────────────────────────────────────────────── */

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
  display: "swap",
  preload: true,
  weight: ["400", "500", "600", "700"],
  fallback: ["Segoe UI", "Tahoma", "Arial", "sans-serif"],
});

const naskh = Noto_Naskh_Arabic({
  subsets: ["arabic"],
  variable: "--font-naskh",
  display: "swap",
  preload: false, // used sparingly; load lazily
  weight: ["400", "600"],
  fallback: ["Traditional Arabic", "serif"],
});

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  display: "swap",
  preload: true,
  weight: ["400", "500", "700"],
  adjustFontFallback: true,
  fallback: ["Times New Roman", "Georgia", "serif"],
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: "swap",
  preload: true,
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  adjustFontFallback: true,
  fallback: ["Georgia", "Times New Roman", "serif"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
  weight: ["400", "500", "700"],
  adjustFontFallback: true,
  fallback: ["system-ui", "-apple-system", "Segoe UI", "Arial", "sans-serif"],
});

export const metadata: Metadata = {
  title: "Kangala Holding Group — Sovereign Investment",
  description: "Sovereign Investment Dossier — Kangala Holding Group",
  robots: { index: false, follow: false },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${cairo.variable} ${naskh.variable} ${cinzel.variable} ${cormorant.variable} ${inter.variable}`}
    >
      <body className="font-cairo antialiased">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
