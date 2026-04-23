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
import type { FullDict, SceneProps } from "@/lib/i18n";

const DICT: FullDict<{
  supra: string;
  headlineA: string;
  headlineB: string;
  body: string;
  concessionLabel: string;
  areaLabel: string;
  scrollReveal: string;
}> = {
  en: {
    supra: "THE LAND \u00b7 BIRIMIAN BELT",
    headlineA: "THE BIRIMIAN",
    headlineB: "BELT",
    body: "Heart of the Green Birimian Belt. Ninety-four confirmed gold anomalies via Deep-Explor\u00ae survey, with high-priority targets where Saprolite deposits begin at just 5 metres depth.",
    concessionLabel: "Concession \u00b7 11.4503\u00b0N, 3.0112\u00b0W",
    areaLabel: "Area:",
    scrollReveal: "SCROLL TO REVEAL",
  },
  fr: {
    supra: "LA TERRE \u00b7 CEINTURE BIRIMIENNE",
    headlineA: "LA CEINTURE",
    headlineB: "BIRIMIENNE",
    body: "C\u0153ur de la Ceinture Birimienne Verte. Quatre-vingt-quatorze anomalies auriF\u00e8res confirm\u00e9es via sondage Deep-Explor\u00ae, avec des cibles prioritaires o\u00f9 les d\u00e9p\u00f4ts de Saprolite d\u00e9butent \u00e0 seulement 5 m\u00e8tres de profondeur.",
    concessionLabel: "Concession \u00b7 11,4503\u00b0N, 3,0112\u00b0O",
    areaLabel: "Superficie :",
    scrollReveal: "D\u00c9FILER POUR R\u00c9V\u00c9LER",
  },
  ar: {
    supra: "الأرض · الحزام البيريمي",
    headlineA: "الحزام",
    headlineB: "البيريمي",
    body: "قلب الحزام البيريمي الأخضر. أربع وتسعون شاذّة ذهبية مؤكّدة عبر مسح Deep-Explor®، مع أهداف ذات أولوية عالية حيث تبدأ رواسب السابروليت عند عمق لا يتجاوز 5 أمتار فقط.",
    concessionLabel: "الامتياز · 11.4503°ش ، 3.0112°غ",
    areaLabel: "المساحة:",
    scrollReveal: "مرّر للكشف",
  },
};

export default function TheLand({ lang = "en" }: SceneProps = {}) {
  const t = DICT[lang ?? "en"];
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
      <div className="sticky top-0 h-screen w-full overflow-hidden">

        {/* ── MAP — full-screen background on ALL breakpoints ── */}
        <motion.div style={{ opacity: mapOpacity }} className="absolute inset-0">
          {/* Mobile vignette: darken top + bottom so text is readable */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none z-10 md:hidden"
            style={{
              background:
                "linear-gradient(180deg, rgba(10,25,47,0.78) 0%, rgba(10,25,47,0.15) 45%, rgba(10,25,47,0.65) 100%)",
            }}
          />
          {/* Desktop vignette: dark band on the left (behind text), clear on right */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none z-10 hidden md:block"
            style={{
              background:
                "linear-gradient(to right, rgba(10,25,47,0.92) 0%, rgba(10,25,47,0.60) 36%, rgba(10,25,47,0.08) 54%, rgba(10,25,47,0.50) 82%, rgba(10,25,47,0.80) 100%)",
            }}
          />
          {/* Corner accent frames */}
          <div className="hidden md:block absolute top-[6%] right-[4%] w-8 h-8 border-t border-r border-gold/40 z-20 pointer-events-none" />
          <div className="hidden md:block absolute bottom-[6%] right-[4%] w-8 h-8 border-b border-r border-gold/40 z-20 pointer-events-none" />
          <div className="hidden md:block absolute top-[6%] left-[42%] w-8 h-8 border-t border-l border-gold/40 z-20 pointer-events-none" />
          <div className="hidden md:block absolute bottom-[6%] left-[42%] w-8 h-8 border-b border-l border-gold/40 z-20 pointer-events-none" />

          <SovereignMap scrollProgress={scrollYProgress} />
        </motion.div>

        {/* Faint cartographic grid */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none opacity-[0.018] z-[11]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(184,149,74,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(184,149,74,0.6) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        {/* ── TEXT PANEL — overlay on mobile, left-column on desktop ── */}
        <div className="relative z-20 h-full flex flex-col justify-center">
          <div className="container mx-auto px-6 md:px-12 max-w-7xl">
            <motion.div
              style={{ opacity: textOpacity, y: textY }}
              className={[
                "relative w-full md:w-[44%]",
                /* mobile: frosted card so text is legible over map */
                "bg-sovereign/75 md:bg-transparent",
                "backdrop-blur-sm md:backdrop-blur-none",
                "border border-gold/15 md:border-0",
                "rounded-sm md:rounded-none",
                "px-5 py-6 md:p-0",
              ].join(" ")}
            >
              <div className="font-cinzel text-gold tracking-[0.6em] text-[10px] md:text-xs mb-4 md:mb-6 opacity-80">
                {t.supra}
              </div>

              <h2 className="font-cinzel text-3xl md:text-5xl lg:text-6xl font-light text-ivory leading-[1.15] tracking-tight">
                {t.headlineA}
                <br />
                <span className="text-gold-gradient font-normal">{t.headlineB}</span>
              </h2>

              <div className="mt-5 mb-5 md:mt-8 md:mb-8 flex items-center gap-4 text-gold/50">
                <div className="w-16 md:w-20 h-px bg-gold/40" />
                <span className="text-xs">◆</span>
                <div className="w-6 md:w-8 h-px bg-gold/20" />
              </div>

              <p className="font-inter text-ivory/75 text-sm md:text-base lg:text-lg leading-relaxed max-w-xl">
                {t.body}
              </p>

              <div className="mt-6 md:mt-12 inline-block relative">
                <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-gold/60" />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-gold/60" />
                <div className="border border-gold/20 bg-sovereign-deep/40 px-5 py-4 md:px-7 md:py-5">
                  <div className="font-cinzel text-gold/60 tracking-[0.3em] text-[10px] md:text-[11px] uppercase mb-2">
                    {t.concessionLabel}
                  </div>
                  <div className="font-cinzel text-ivory text-lg md:text-2xl font-light tabular-nums">
                    <span className="text-gold/70 text-[10px] md:text-[11px] tracking-[0.3em] uppercase block mb-1">
                      {t.areaLabel}
                    </span>
                    40 km²
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 font-cinzel text-gold/30 text-[11px] tracking-[0.5em] pointer-events-none">
          {t.scrollReveal}
        </div>
      </div>
    </section>
  );
}
