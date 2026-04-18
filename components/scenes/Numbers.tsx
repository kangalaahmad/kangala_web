"use client";

import {
  motion,
  useScroll,
  useTransform,
  useInView,
  animate,
} from "framer-motion";
import { useRef, useEffect, useState } from "react";

type Metric = {
  value: number;
  suffix?: string;
  prefix?: string;
  labelAr: string;
  labelEn: string;
  decimals?: number;
};

// Source: Kangala Sovereign Portfolio — Page 11 (Geological Assets)
// + Page 13 (Technical Verification). Verified against text_extracted.txt.
const METRICS: Metric[] = [
  {
    value: 118,
    suffix: " t",
    labelAr: "هدف الذهب · Au",
    labelEn: "Gold Target",
  },
  {
    value: 40,
    suffix: " km²",
    labelAr: "مساحة الامتياز",
    labelEn: "Concession Area",
  },
  {
    value: 94,
    labelAr: "شذوذ ذهبي مُؤكّد",
    labelEn: "Gold Anomalies",
  },
  {
    value: 5,
    suffix: " m",
    labelAr: "أدنى عمق للـ Saprolite",
    labelEn: "Min Depth",
  },
];

function CountUp({ metric }: { metric: Metric }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, metric.value, {
      duration: 2.2,
      ease: [0.22, 1, 0.36, 1],
      onUpdate(v: number) {
        setDisplay(
          v.toLocaleString("en-US", {
            minimumFractionDigits: metric.decimals ?? 0,
            maximumFractionDigits: metric.decimals ?? 0,
          })
        );
      },
    });
    return () => controls.stop();
  }, [inView, metric.value, metric.decimals]);

  return (
    <span ref={ref} className="tabular-nums">
      {metric.prefix}
      {display}
      {metric.suffix}
    </span>
  );
}

export default function Numbers(_props: import("@/lib/i18n").SceneProps = {}) {
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
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-24"
        >
          <div className="font-cinzel text-gold tracking-[0.6em] text-[10px] md:text-xs mb-6 opacity-80">
            THE NUMBERS · SPEAK
          </div>

          <h2 className="font-cairo display-lg font-light text-ivory leading-tight tracking-tight">
            حين تتحدث الأرقام،
            <br />
            <span className="text-gold font-normal">تصمتُ الادعاءات.</span>
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
              key={m.labelEn}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 1.0,
                delay: i * 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group relative bg-mist border border-gold/20 p-6 md:p-10 hover:border-gold/50 transition-colors duration-700"
            >
              {/* Corner frames */}
              <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-gold/60" />
              <div className="absolute bottom-0 left-0 w-6 h-6 border-b border-l border-gold/60" />

              {/* Top label */}
              <div className="font-cinzel text-gold/60 tracking-[0.3em] text-[9px] uppercase mb-6">
                {m.labelEn}
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

              {/* Arabic label */}
              <div className="font-cairo text-ivory/70 text-sm md:text-base">
                {m.labelAr}
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
          <p className="font-cairo text-ivory/50 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            جميع الأرقام تستند إلى دراسات جيولوجية معتمدة
            <br />
            ومصدّقة وفق معايير <span className="text-gold">JORC</span> و{" "}
            <span className="text-gold">NI 43-101</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
