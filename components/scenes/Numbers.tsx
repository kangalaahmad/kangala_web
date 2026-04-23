"use client";

import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import type { FullDict, SceneProps } from "@/lib/i18n";
import { EASE } from "@/lib/easing";
import Odometer from "@/components/Odometer";

type Metric = {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  decimals?: number;
};

const DICT: FullDict<{
  supra: string;
  headlineA: string;
  headlineB: string;
  footerA: string;
  footerB: string;
  metrics: Metric[];
}> = {
  en: {
    supra: "THE NUMBERS · SPEAK",
    headlineA: "When the numbers speak,",
    headlineB: "claims fall silent.",
    footerA: "All figures rest on certified geological studies",
    footerB: "validated under JORC and NI 43-101 standards",
    metrics: [
      { value: 118, suffix: " t", label: "Gold Target" },
      { value: 40, suffix: " km²", label: "Concession Area" },
      { value: 94, label: "Gold Anomalies" },
      { value: 5, suffix: " m", label: "Min Depth" },
    ],
  },
  fr: {
    supra: "LES CHIFFRES · PARLENT",
    headlineA: "Quand les chiffres parlent,",
    headlineB: "les allégations se taisent.",
    footerA: "Tous les chiffres reposent sur des études géologiques certifiées",
    footerB: "validées selon les normes JORC et NI 43-101",
    metrics: [
      { value: 118, suffix: " t", label: "Objectif Or" },
      { value: 40, suffix: " km²", label: "Superficie Concession" },
      { value: 94, label: "Anomalies Aurifères" },
      { value: 5, suffix: " m", label: "Profondeur Min." },
    ],
  },
  ar: {
    supra: "الأرقام · تتحدّث",
    headlineA: "حين تتحدّث الأرقام،",
    headlineB: "تصمت الادّعاءات.",
    footerA: "تستند جميع الأرقام إلى دراسات جيولوجية معتمدة",
    footerB: "وفق معايير JORC و NI 43-101",
    metrics: [
      { value: 118, suffix: " طن", label: "هدف الذهب · Au" },
      { value: 40, suffix: " كم٢", label: "مساحة الامتياز" },
      { value: 94, label: "شذوذ ذهبي مؤكّد" },
      { value: 5, suffix: " م", label: "أدنى عمق للسابروليت" },
    ],
  },
};

/* ─── CountUp (delegates to Odometer) ───
   Legacy wrapper kept for invocation compatibility. Under the hood it
   now renders the Swiss-vault style rolling reel instead of the old
   fade-counting animation. */
function CountUp({ metric }: { metric: Metric }) {
  return (
    <Odometer
      value={metric.value}
      decimals={metric.decimals ?? 0}
      prefix={metric.prefix}
      suffix={metric.suffix}
    />
  );
}

export default function Numbers({ lang = "en" }: SceneProps = {}) {
  const t = DICT[lang ?? "en"];
  const METRICS = t.metrics;
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section
      ref={ref}
      className="relative min-h-[100vh] w-full bg-sovereign overflow-hidden py-32"
    >
      {/* Parallax gold grid background */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
      >
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              "linear-gradient(rgba(184,149,74,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(184,149,74,0.5) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </motion.div>

      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(184,149,74,0.08) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 container mx-auto px-6 md:px-12 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: EASE.DISSOLVE }}
          className="text-center mb-24"
        >
          <div className="font-cinzel text-gold tracking-[0.6em] text-[10px] md:text-xs mb-6 opacity-80">
            {t.supra}
          </div>

          <h2 className="font-cairo display-lg font-light text-ivory leading-tight tracking-tight">
            {t.headlineA}
            <br />
            <span className="text-gold font-normal">{t.headlineB}</span>
          </h2>

          <div className="mt-10 flex items-center justify-center gap-4 text-gold/50">
            <div className="w-20 h-px bg-gold/40" />
            <span className="text-xs">◆</span>
            <div className="w-20 h-px bg-gold/40" />
          </div>
        </motion.div>

        {/* Metrics grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {METRICS.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 1.0,
                delay: i * 0.15,
                ease: EASE.SPRING,
              }}
              className="group relative bg-mist border border-gold/20 p-6 md:p-10 hover:border-gold/50 transition-colors duration-700"
            >
              {/* Corner frames */}
              <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-gold/60" />
              <div className="absolute bottom-0 left-0 w-6 h-6 border-b border-l border-gold/60" />

              {/* Top label */}
              <div className="font-cinzel text-gold/60 tracking-[0.3em] text-[11px] uppercase mb-6">
                {m.label}
              </div>

              {/* The number */}
              <div
                className="font-cinzel text-ivory text-4xl md:text-6xl font-light mb-4 leading-none"
                dir="ltr"
              >
                <CountUp metric={m} />
              </div>

              {/* Divider */}
              <div className="w-10 h-px bg-gold/60 mb-4" />

              {/* Locale label */}
              <div className="font-cinzel text-ivory/70 text-[10px] tracking-[0.2em] uppercase">
                {m.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 0.8 }}
          className="mt-20 text-center"
        >
          <p className="font-cairo text-ivory/50 text-sm md:text-base max-w-2xl mx-auto leading-relaxed" dir="ltr">
            {t.footerA}
            <br />
            {t.footerB}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
