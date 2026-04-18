"use client";

/**
 * ╔═══════════════════════════════════════════════════════════════════╗
 * ║  DISCOVERY — Geological Evidence (Ivory Shock #2)                 ║
 * ╠═══════════════════════════════════════════════════════════════════╣
 * ║  The scene where CLAIMS become EVIDENCE. Ivory background breaks  ║
 * ║  the sovereign dark rhythm and signals "readable, credible,       ║
 * ║  verifiable data." A trust moment for institutional reviewers.    ║
 * ║                                                                   ║
 * ║   Act 1 · CORE SAMPLE EVIDENCE                                    ║
 * ║           Narrative + 5-tray gallery with depth labels +          ║
 * ║           drill stats (NQ, 30m+, 100% recovery, 3 horizons).      ║
 * ║                                                                   ║
 * ║   Act 2 · EXPLORATION OVERVIEW                                    ║
 * ║           Deep Leader sub-atomic field survey on 40 km² —         ║
 * ║           6 key metrics + executive summary + geological setting  ║
 * ║           + priority drill targets ribbon.                        ║
 * ║                                                                   ║
 * ║   Closing: Credibility strip (supporting documents, contract      ║
 * ║           refs, partners).                                        ║
 * ║                                                                   ║
 * ║  Sources (verbatim data):                                         ║
 * ║   - Sovereign_Final/page12b_core_samples_EN.html                  ║
 * ║   - Sovereign_Final/page13_exploration_EN.html                    ║
 * ╚═══════════════════════════════════════════════════════════════════╝
 */

import { motion, useInView, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

// ═══════════════════════════════════════════════════════════════════
// Data
// ═══════════════════════════════════════════════════════════════════

const CORE_SAMPLES = [
  {
    src: "/discovery/core_sample1.jpeg",
    tray: "Tray 1",
    horizon: "Laterite — Ochre horizon",
  },
  {
    src: "/discovery/core_sample2.jpeg",
    tray: "Tray 2",
    horizon: "Mixed saprolite — oxide zone",
  },
  {
    src: "/discovery/core_sample3.jpeg",
    tray: "Tray 3",
    horizon: "Ferruginous laterite",
  },
  {
    src: "/discovery/core_sample4.jpeg",
    tray: "Tray 4",
    horizon: "Transitional saprolite",
  },
  {
    src: "/discovery/core_sample5.jpeg",
    tray: "Tray 5",
    horizon: "Deep laterite — competent core",
  },
];

const DRILL_STATS = [
  { value: "5", label: "Core Trays Logged" },
  { value: "NQ", label: "Diamond Core Size" },
  { value: "30m+", label: "Drill Depth Achieved" },
  { value: "100%", label: "Core Recovery Rate" },
  { value: "3", label: "Mineral Horizons ID'd" },
];

const EXPLORATION_STATS = [
  { value: 94, display: "94", label: "Gold Anomalies" },
  { value: 69.38, display: "69.38", label: "Max CU (G-21)", decimals: 2 },
  {
    value: 60279,
    display: "60,279",
    label: "Largest m² (G-22)",
  },
  { value: 145.6, display: "145.6 m", label: "Max Depth", decimals: 1 },
  { value: 40, display: "40 km²", label: "Concession Area" },
  { value: 5.16, display: "5.16 m", label: "Min Depth", decimals: 2 },
];

const PRIORITY_TARGETS = [
  { id: "G-22", m2: "60,279 m²", depth: "145.6 m" },
  { id: "G-6", m2: "65.69 CU", depth: "110.2 m" },
  { id: "G-10", m2: "41,981 m²", depth: "81.9 m" },
  { id: "G-23", m2: "40,795 m²", depth: "133.4 m" },
  { id: "G-19", m2: "34,590 m²", depth: "111.9 m" },
];

// ═══════════════════════════════════════════════════════════════════
// CountUp (ivory variant — animates on scroll-in)
// ═══════════════════════════════════════════════════════════════════

function CountUpIvory({
  to,
  display,
  decimals = 0,
}: {
  to: number;
  display?: string;
  decimals?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [shown, setShown] = useState(decimals > 0 ? "0" : "0");

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 2,
      ease: [0.22, 1, 0.36, 1],
      onUpdate(v) {
        setShown(
          v.toLocaleString("en-US", {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
          })
        );
      },
    });
    return () => controls.stop();
  }, [inView, to, decimals]);

  // If consumer passes a display string with unit, swap numeric portion.
  if (display && !/^[\d.,]+$/.test(display)) {
    const numericMatch = display.match(/^([\d.,]+)/);
    if (numericMatch) {
      const rest = display.slice(numericMatch[0].length);
      return (
        <span ref={ref} className="tabular-nums">
          {shown}
          {rest}
        </span>
      );
    }
  }

  return (
    <span ref={ref} className="tabular-nums">
      {shown}
    </span>
  );
}

// ═══════════════════════════════════════════════════════════════════
// Main
// ═══════════════════════════════════════════════════════════════════

export default function Discovery(_props: import("@/lib/i18n").SceneProps = {}) {
  return (
    <section className="relative w-full bg-ivory text-sovereign overflow-hidden">
      {/* Akan-inspired diagonal watermark — very subtle */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, #0A192F 0, #0A192F 2px, transparent 0, transparent 60px), repeating-linear-gradient(-45deg, #0A192F 0, #0A192F 2px, transparent 0, transparent 60px)",
        }}
      />

      {/* Top gold divider — visual handshake with previous sovereign scene */}
      <div
        className="relative h-px w-full"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, #B8954A 50%, transparent 100%)",
        }}
      />

      <CoreSampleAct />
      <ExplorationAct />
      <CredibilityStrip />

      {/* Bottom gold divider — handshake with next sovereign scene */}
      <div
        className="relative h-px w-full"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, #B8954A 50%, transparent 100%)",
        }}
      />
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════
// Act 1 — Core Sample Evidence
// ═══════════════════════════════════════════════════════════════════

function CoreSampleAct() {
  return (
    <div className="relative py-24 md:py-32">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 md:mb-16"
        >
          <div className="font-cinzel text-gold tracking-[0.5em] text-[10px] md:text-xs mb-3 opacity-90">
            EXPLORATION &amp; DRILLING · الاستكشاف والحفر
          </div>
          <h2 className="font-cinzel text-sovereign tracking-[0.08em] text-3xl md:text-5xl lg:text-6xl font-light leading-[1.05]">
            CORE SAMPLE
            <br />
            <span className="font-normal">EVIDENCE</span>
          </h2>
          <div
            className="mt-5 h-[3px] w-20"
            style={{
              background:
                "linear-gradient(90deg, #B8954A 0%, #1A3A2A 50%, #7A1F1F 100%)",
            }}
          />
          <div className="mt-5 font-cormorant italic text-sovereign/70 text-base md:text-lg">
            Diamond Core Drilling — On-Site Extraction Results
          </div>
        </motion.div>

        {/* Narrative */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="font-cormorant text-sovereign/85 text-base md:text-lg leading-relaxed max-w-4xl mb-10 md:mb-14"
        >
          Core samples extracted from the Kangala concession reveal{" "}
          <strong className="text-sovereign">
            multi-horizon laterite and saprolite profiles
          </strong>{" "}
          with visible iron oxide alteration, quartz veining, and gold-bearing
          sulphide enrichment zones. Each tray represents a continuous drill run
          logged on-site before dispatch to accredited assay laboratories.
        </motion.p>

        {/* 5-tray gallery */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5 mb-10 md:mb-14">
          {CORE_SAMPLES.map((sample, i) => (
            <CoreTray key={sample.tray} s={sample} index={i} />
          ))}
        </div>

        {/* Drill stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-5 gap-px bg-gold/30"
        >
          {DRILL_STATS.map((s) => (
            <div
              key={s.label}
              className="bg-sovereign text-center py-5 md:py-6 px-3 relative"
            >
              <span className="absolute top-0 left-[20%] right-[20%] h-[2px] bg-gold" />
              <div className="font-cinzel text-gold text-2xl md:text-3xl font-light">
                {s.value}
              </div>
              <div className="mt-1.5 font-cinzel text-ivory/60 tracking-[0.2em] text-[9px] uppercase">
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

function CoreTray({
  s,
  index,
}: {
  s: (typeof CORE_SAMPLES)[number];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.8,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative group overflow-hidden"
      style={{ border: "2px solid rgba(184,149,74,0.3)" }}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-sovereign/5">
        <Image
          src={s.src}
          alt={`${s.tray} — ${s.horizon}`}
          fill
          sizes="(max-width: 768px) 50vw, 20vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {/* Dark gradient at bottom for label legibility */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(10,25,47,0.85) 0%, rgba(10,25,47,0.2) 40%, transparent 60%)",
          }}
        />
      </div>

      {/* Gold top accent line on hover */}
      <span className="absolute top-0 left-0 right-0 h-[2px] bg-gold transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

      {/* Caption */}
      <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4">
        <div className="font-cinzel text-ivory tracking-[0.15em] text-xs md:text-sm font-normal">
          {s.tray}
        </div>
        <div className="mt-0.5 font-cinzel text-ivory/70 text-[9px] md:text-[10px] tracking-[0.1em]">
          {s.horizon}
        </div>
      </div>

      {/* Corner accent */}
      <span className="absolute top-2 right-2 w-2.5 h-2.5 border-t border-r border-gold/80" />
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// Act 2 — Exploration Overview (Deep Leader survey)
// ═══════════════════════════════════════════════════════════════════

function ExplorationAct() {
  return (
    <div className="relative py-20 md:py-28 border-t border-gold/25 bg-ivory-dark/25">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1 }}
          className="mb-10 md:mb-14"
        >
          <div className="font-cinzel text-jade tracking-[0.55em] text-[10px] md:text-xs mb-3 uppercase">
            Geological Exploration Report
          </div>
          <h2 className="font-cinzel text-sovereign tracking-[0.06em] text-3xl md:text-5xl font-light leading-tight">
            EXPLORATION
            <span className="font-normal"> OVERVIEW</span>
          </h2>
          <div className="mt-4 font-cormorant italic text-[#7A1F1F] text-base md:text-lg">
            Karangasso Concession · 94 Gold Anomalies · Deep-Explor® Technology
          </div>
          <div
            className="mt-5 h-[3px] w-20"
            style={{
              background:
                "linear-gradient(90deg, #B8954A 0%, #1A3A2A 50%, #7A1F1F 100%)",
            }}
          />
        </motion.div>

        {/* 6-metric grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-gold/25 mb-10 md:mb-12">
          {EXPLORATION_STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.7,
                delay: i * 0.06,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="bg-sovereign text-center py-6 px-3 relative"
            >
              <span className="absolute top-0 left-[25%] right-[25%] h-[3px] bg-gold" />
              <div
                className="font-cinzel text-gold text-xl md:text-2xl lg:text-[26px] font-light leading-none"
                dir="ltr"
              >
                <CountUpIvory
                  to={s.value}
                  display={s.display}
                  decimals={s.decimals ?? 0}
                />
              </div>
              <div className="mt-2 font-cinzel text-ivory/70 tracking-[0.2em] text-[9px] uppercase">
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Two-column: Executive Summary + Geological Setting */}
        <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-5 md:gap-6 mb-8 md:mb-10">
          <BlockCard label="Executive Summary">
            <p>
              <strong>
                Deep Leader Innovation Intelligence Technology Co., Ltd
              </strong>{" "}
              carried out a comprehensive gold exploration campaign in the{" "}
              <strong>Karangasso area, Burkina Faso</strong> using sub-atomic
              field detection technology <strong>Deep-Explor®</strong> via
              satellite remote sensing, covering <strong>40 km²</strong> and
              identifying <strong>94 gold anomaly zones</strong> (G-1 to G-94)
              at depths ranging from <strong>5 to 145.6 m</strong>.
            </p>
            <p className="mt-3">
              Satellite data was processed at 0.3–0.4 m resolution and
              calibrated using <strong>GIS</strong> within the{" "}
              <strong>WGS84 / UTM Zone 30N</strong> coordinate framework.
              Measured radiation intensities ranged from 5.01 to 69.38 CU.
            </p>
          </BlockCard>

          <BlockCard label="Geological Setting">
            <p>
              Located within the{" "}
              <strong>Birimian Greenstone Belt</strong> — one of West Africa's
              most gold-prospective geological environments. The concession
              features NE–SW and NW–SE structural controls with proven
              mineralisation corridors.
            </p>
            <p className="mt-3">
              Mineralisation rate <strong>≥ 60%</strong> in anomaly zones per
              Deep-Explor® standards. Location accuracy deviation{" "}
              <strong>≤ 100 m</strong>, depth error <strong>±15%</strong>.
            </p>
          </BlockCard>
        </div>

        {/* Priority drill targets ribbon */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9 }}
          className="relative bg-sovereign p-5 md:p-6"
          style={{ borderLeft: "4px solid #B8954A" }}
        >
          <div className="font-cinzel text-gold tracking-[0.3em] text-[10px] md:text-xs uppercase mb-3">
            Priority Drill Targets
          </div>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {PRIORITY_TARGETS.map((t, i) => (
              <div key={t.id} className="flex items-center gap-3">
                <div>
                  <span className="font-cinzel text-gold font-semibold tracking-wider text-sm md:text-base">
                    {t.id}
                  </span>
                  <span className="ml-2 font-cinzel text-ivory/80 text-xs md:text-sm tabular-nums">
                    {t.m2} · {t.depth}
                  </span>
                </div>
                {i < PRIORITY_TARGETS.length - 1 && (
                  <span className="w-px h-4 bg-gold/30 hidden md:block" />
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function BlockCard({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8 }}
      className="relative flex flex-col overflow-hidden"
      style={{
        background: "rgba(10,25,47,0.04)",
        border: "1px solid rgba(184,149,74,0.3)",
      }}
    >
      {/* Header band (sovereign dark) */}
      <div
        className="px-4 md:px-5 py-2.5 flex items-center bg-sovereign"
        style={{ borderTop: "3px solid #B8954A" }}
      >
        <span className="font-cinzel text-gold-bright tracking-[0.3em] text-[10px] md:text-xs uppercase font-semibold">
          {label}
        </span>
      </div>

      {/* Body */}
      <div className="font-cormorant text-sovereign/85 text-[14.5px] md:text-[15.5px] leading-[1.75] p-4 md:p-5">
        {children}
      </div>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// Credibility Strip
// ═══════════════════════════════════════════════════════════════════

function CredibilityStrip() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 1.2 }}
      className="relative py-10 md:py-12 bg-ivory-dark/40 border-t border-gold/30"
    >
      <div className="container mx-auto px-6 md:px-12 max-w-6xl">
        <div
          className="relative p-4 md:p-5"
          style={{
            background: "rgba(184,149,74,0.07)",
            borderLeft: "4px solid #B8954A",
          }}
        >
          <div className="font-cinzel text-gold tracking-[0.3em] text-[10px] md:text-xs uppercase mb-1.5">
            Validated By
          </div>
          <p className="font-cormorant italic text-sovereign/75 text-[12.5px] md:text-sm leading-relaxed">
            Survey data validated by{" "}
            <strong className="text-sovereign not-italic">
              Beijing Deep Leader Innovation &amp; Intelligence Technology Co.,
              Ltd.
            </strong>{" "}
            — Contract Ref:{" "}
            <span className="tabular-nums">SLCX2025-05-01</span> · Invoice{" "}
            <span className="tabular-nums">DL25061B</span> (08 June 2025) ·
            NMRAI prospection technology on 40 km² concession area.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
