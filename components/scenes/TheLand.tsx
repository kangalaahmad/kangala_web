"use client";

/**
 * TheLand — The Birimian Belt Sovereign Map scene.
 *
 * Thin wrapper around SovereignMap (which handles all the Mapbox complexity).
 * This component owns the scroll tracking + the text/data-card side panel;
 * the map component receives scrollProgress and internally drives camera,
 * layer opacity, and vein reveal.
 *
 * Container is h-[400vh] + sticky stage to provide the scroll distance
 * needed for the full cinematic sequence:
 *   0.00–0.10  text enters
 *   0.05–0.25  map fades in + camera zooms regional → Burkina
 *   0.30–0.55  Burkina highlighted (gold fill + border glow)
 *   0.55–0.80  gold vein draws east → west through real geology
 *   0.80–0.95  5 target markers ignite (with CSS pulse)
 */

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import SovereignMap from "./SovereignMap";
import type { Dict, SceneProps } from "@/lib/i18n";

const DICT: Dict<{
  supra: string;
  concessionLabel: string;
  areaLabel: string;
  scrollReveal: string;
}> = {
  en: {
    supra: "THE LAND · BIRIMIAN BELT",
    concessionLabel: "Concession · 11.4503°N, 3.0112°W",
    areaLabel: "Area:",
    scrollReveal: "SCROLL TO REVEAL",
  },
  fr: {
    supra: "LA TERRE · CEINTURE BIRIMIENNE",
    concessionLabel: "Concession · 11,4503°N, 3,0112°O",
    areaLabel: "Superficie :",
    scrollReveal: "DÉFILER POUR RÉVÉLER",
  },
};

export default function TheLand({ lang = "en" }: SceneProps = {}) {
  const t = DICT[lang];
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Text block entrance
  const textOpacity = useTransform(scrollYProgress, [0.0, 0.1], [0, 1]);
  const textY = useTransform(scrollYProgress, [0.0, 0.1], [40, 0]);

  // Map fade-in (map itself handles camera/layers via scrollProgress)
  const mapOpacity = useTransform(scrollYProgress, [0.03, 0.2], [0, 1]);

  return (
    <section ref={ref} className="relative h-[400vh] w-full bg-sovereign">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center">
        {/* Atmospheric gradient */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 55% 55%, rgba(184,149,74,0.08) 0%, transparent 65%)",
          }}
        />

        {/* Faint cartographic grid */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none opacity-[0.022]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(184,149,74,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(184,149,74,0.6) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        <div className="relative z-10 container mx-auto px-6 md:px-12 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-[40%_60%] gap-8 md:gap-10 lg:gap-14 items-center">
            {/* ═══ TEXT COLUMN ═══
                Source order 1 → right side in RTL desktop, top on mobile. */}
            <motion.div
              style={{ opacity: textOpacity, y: textY }}
              className="relative"
            >
              <div className="font-cinzel text-gold tracking-[0.6em] text-[10px] md:text-xs mb-6 opacity-80">
                {t.supra}
              </div>

              <h2 className="font-cairo display-lg font-light text-ivory leading-[1.15] tracking-tight">
                الحزام
                <span className="text-gold-gradient font-normal"> البريمي</span>
              </h2>

              <div className="mt-8 mb-8 flex items-center gap-4 text-gold/50">
                <div className="w-20 h-px bg-gold/40" />
                <span className="text-xs">◆</span>
                <div className="w-8 h-px bg-gold/20" />
              </div>

              <p className="font-cairo text-ivory/70 text-base md:text-lg leading-relaxed max-w-xl">
                قلبُ الحزام البريمي الأخضر.
                <br />
                <span className="text-ivory/85">أربعةٌ وتسعون شذوذاً ذهبياً مُؤكَّداً</span>{" "}
                عبر مسح Deep-Explor®، بأهداف أولوية عالية
                تبدأ رواسب الـ Saprolite فيها من عمق 5 أمتار فقط.
              </p>

              <div className="mt-12 inline-block relative">
                {/* Corner frames */}
                <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-gold/60" />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-gold/60" />
                <div className="border border-gold/20 bg-sovereign-deep/30 px-7 py-5 backdrop-blur-sm">
                  <div className="font-cinzel text-gold/60 tracking-[0.3em] text-[9px] uppercase mb-2">
                    {t.concessionLabel}
                  </div>
                  <div
                    className="font-cairo text-ivory text-xl md:text-2xl font-light tabular-nums"
                    dir="rtl"
                  >
                    المساحة:{" "}
                    <span className="text-gold font-normal" dir="ltr">
                      40
                    </span>{" "}
                    km²
                  </div>
                </div>
              </div>
            </motion.div>

            {/* ═══ MAP COLUMN ═══
                Real 3D Mapbox cartography with scroll-driven camera */}
            <motion.div
              style={{ opacity: mapOpacity }}
              className="relative w-full aspect-[16/11]"
            >
              {/* Soft atmospheric vignette — map fades into sovereign bg */}
              <div
                aria-hidden="true"
                className="absolute inset-0 pointer-events-none z-10"
                style={{
                  background:
                    "radial-gradient(ellipse at 50% 50%, transparent 45%, rgba(10,25,47,0.7) 90%, rgba(10,25,47,1) 100%)",
                }}
              />
              {/* Corner accent frames — luxury cartographic ornament */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-gold/40 z-20 pointer-events-none" />
              <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-gold/40 z-20 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-gold/40 z-20 pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-gold/40 z-20 pointer-events-none" />

              <SovereignMap scrollProgress={scrollYProgress} />
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 font-cinzel text-gold/30 text-[9px] tracking-[0.5em] pointer-events-none">
          {t.scrollReveal}
        </div>
      </div>
    </section>
  );
}
