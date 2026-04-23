"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import type { FullDict, SceneProps } from "@/lib/i18n";
import { EASE } from "@/lib/easing";

type HeroLoc = {
  supra: string;
  scroll: string;
  subtitle: string;
  tagline: string;
  taglineGold: string;
  dir: "ltr" | "rtl";
};

const DICT: FullDict<HeroLoc> = {
  en: {
    supra: "SOVEREIGN INVESTMENT",
    scroll: "SCROLL",
    subtitle: "Kangala Holding Group",
    tagline: "Sovereignty is not a claim,",
    taglineGold: "it is a legacy earned, and a duty fulfilled.",
    dir: "ltr",
  },
  fr: {
    supra: "INVESTISSEMENT SOUVERAIN",
    scroll: "DÉFILER",
    subtitle: "Kangala Holding Group",
    tagline: "La souveraineté n'est pas une affirmation,",
    taglineGold: "c'est un héritage acquis et une responsabilité exercée.",
    dir: "ltr",
  },
  ar: {
    supra: "استثمار سيادي",
    scroll: "مرر",
    subtitle: "مجموعة كانغالا القابضة",
    tagline: "السيادة ليست ادعاءً،",
    taglineGold: "بل إرثٌ يُحرز، ومسؤوليةٌ تُمارس.",
    dir: "rtl",
  },
};

export default function Hero({ lang = "en" }: SceneProps = {}) {
  const t = DICT[lang ?? "en"];
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const titleY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  return (
    <section
      ref={ref}
      className="relative h-[100svh] w-full overflow-hidden bg-sovereign flex items-center justify-center"
    >
      {/* Ambient radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 40%, rgba(184,149,74,0.12) 0%, rgba(10,25,47,0) 60%)",
        }}
      />

      {/* Kente top strip */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 2.5, delay: 1.5, ease: EASE.HOVER }}
        className="absolute top-12 left-1/2 -translate-x-1/2 w-2/3 h-[2px] bg-gold-gradient origin-center opacity-80"
      />
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 2.5, delay: 1.7, ease: EASE.HOVER }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 w-2/3 h-[2px] bg-gold-gradient origin-center opacity-80"
      />

      {/* Main content */}
      <motion.div
        style={{ y: titleY, opacity, scale }}
        className="relative z-10 flex flex-col items-center text-center px-6"
      >
        {/* Supra label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.3 }}
          className="font-cinzel text-gold tracking-[0.7em] text-[10px] md:text-xs mb-10 opacity-70"
        >
          {t.supra}
        </motion.div>

        {/* KANGALA main */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2.0, delay: 0.6, ease: EASE.VAULT }}
          className="font-cinzel text-ivory font-light display-xl tracking-[0.12em] no-select"
        >
          KANGALA
        </motion.h1>

        {/* Subtitle — locale-aware */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 1.2 }}
          className={`mt-6 text-ivory/80 text-lg md:text-2xl tracking-wider font-light ${lang === "ar" ? "font-cairo" : "font-cinzel tracking-[0.3em] text-sm md:text-base"}`}
          dir={t.dir}
        >
          {t.subtitle}
        </motion.div>

        {/* Divider diamond */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.8, scale: 1 }}
          transition={{ duration: 1.0, delay: 1.8 }}
          className="mt-10 flex items-center gap-4 text-gold"
        >
          <div className="w-16 h-px bg-gold/60" />
          <span className="text-xs">◆</span>
          <div className="w-16 h-px bg-gold/60" />
        </motion.div>

        {/* Tagline — locale-aware */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 2.1 }}
          className={`mt-10 text-ivory/60 text-sm md:text-base tracking-wide max-w-xl leading-relaxed ${lang === "ar" ? "font-cairo text-right" : "font-cormorant italic text-base md:text-lg"}`}
          dir={t.dir}
        >
          {t.tagline}
          <br className="md:hidden" />
          <span className="text-gold"> {t.taglineGold}</span>
        </motion.p>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 3 }}
        className="absolute bottom-24 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span className="font-cinzel text-gold/60 text-[11px] tracking-[0.5em]">
          {t.scroll}
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-8 bg-gradient-to-b from-gold/60 to-transparent"
        />
      </motion.div>
    </section>
  );
}
