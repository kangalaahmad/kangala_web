"use client";

/**
 * ╔═══════════════════════════════════════════════════════════════════╗
 * ║  LOGISTICS — Logistical Sovereignty · The Machine                 ║
 * ╠═══════════════════════════════════════════════════════════════════╣
 * ║  Three-act cinematic scene on a single sovereign background:      ║
 * ║                                                                   ║
 * ║   Act 1 · FLEET MOBILIZATION                                      ║
 * ║           Hero image of convoy + 4 banner stats (400+, 100%,      ║
 * ║           24/7, 3 countries). Parallax + count-up.                ║
 * ║                                                                   ║
 * ║   Act 2 · THE POWER TO BREAK THE SIEGE                            ║
 * ║           Narrative of logistical independence + 4 capability     ║
 * ║           pillars. Horizontal on desktop, stacked on mobile.      ║
 * ║                                                                   ║
 * ║   Act 3 · STRATEGIC FUEL DEPOT                                    ║
 * ║           Cross-border (BF/Mali) infrastructure. 4-image gallery  ║
 * ║           + 3 feature cards + Energy Sovereignty highlight.       ║
 * ║                                                                   ║
 * ║   Closing: Sovereign quote — "Supply chain resilience is not an   ║
 * ║            advantage; it is the foundation of sovereign            ║
 * ║            execution."                                            ║
 * ║                                                                   ║
 * ║  Sources (verbatim data):                                         ║
 * ║   - Sovereign_Final/page10_logistics_EN.html                      ║
 * ║   - Sovereign_Final/page10b_fuel_depot_EN.html                    ║
 * ║   - Sovereign_Final/page11_fleet_EN.html                          ║
 * ╚═══════════════════════════════════════════════════════════════════╝
 */

import {
  motion,
  useScroll,
  useTransform,
  useInView,
  animate,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

// ═══════════════════════════════════════════════════════════════════
// Data (verbatim from Sovereign_Final deck)
// ═══════════════════════════════════════════════════════════════════

const FLEET_STATS = [
  { value: "400+", label: "Heavy-Duty Tankers", numeric: 400, suffix: "+" },
  { value: "100%", label: "Self-Owned Fleet", numeric: 100, suffix: "%" },
  { value: "24/7", label: "Operational Readiness" },
  { value: "3", label: "Countries Covered", numeric: 3 },
];

const CAPABILITIES = [
  {
    num: "01",
    title: "Tri-National Reach",
    desc: "Fuel, water and heavy-material transport across three sovereign nations.",
  },
  {
    num: "02",
    title: "Zero Third-Party Risk",
    desc: "100% self-owned fleet. No reliance on external logistics providers.",
  },
  {
    num: "03",
    title: "Single-Wave Mobilization",
    desc: "Coordinated deployments eliminate multi-trip delays and exposure.",
  },
  {
    num: "04",
    title: "Dual-Country Maintenance",
    desc: "Dedicated maintenance depots in Burkina Faso and Mali.",
  },
];

const DEPOT_GALLERY = [
  {
    src: "/logistics/tank.jpeg",
    label: "High-capacity fuel tank — on-site inspection",
  },
  { src: "/logistics/tank2.jpeg", label: "Kangala fuel storage depot" },
  {
    src: "/logistics/tank1.jpeg",
    label: "Distribution valves & pipeline network",
  },
  {
    src: "/logistics/tank4.jpeg",
    label: "New tank foundation — expansion in progress",
  },
];

const DEPOT_CARDS = [
  {
    title: "Strategic Border Location",
    body:
      "Positioned at a pivotal border crossing linking Burkina Faso and Mali. Enables rapid fuel distribution to cross-border fleet operations.",
  },
  {
    title: "Active Expansion Programme",
    body:
      "New tank foundations under construction in partnership with KGL Industries. Additional capacity, upgraded safety systems, and improved mechanical connections.",
  },
  {
    title: "Operational Objectives",
    body:
      "Increase storage capacity to meet rising demand. Enhance transit speed, strengthen border-zone energy security, and support Kangala's overland fleet.",
  },
];

const DEPOT_STATS = [
  { value: "2", label: "Countries Served" },
  { value: "24/7", label: "Fuel Availability" },
  { value: "KGL", label: "Industries Partner" },
];

// ═══════════════════════════════════════════════════════════════════
// CountUp — reusable numeric animation (mirrors Numbers.tsx pattern)
// ═══════════════════════════════════════════════════════════════════

function CountUp({
  to,
  suffix = "",
  duration = 2.2,
}: {
  to: number;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate(v) {
        setDisplay(Math.round(v).toLocaleString("en-US"));
      },
    });
    return () => controls.stop();
  }, [inView, to, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {display}
      {suffix}
    </span>
  );
}

// ═══════════════════════════════════════════════════════════════════
// Main Component
// ═══════════════════════════════════════════════════════════════════

export default function Logistics(_props: import("@/lib/i18n").SceneProps = {}) {
  return (
    <section className="relative w-full bg-sovereign overflow-hidden">
      {/* Ambient gold wash */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 30%, rgba(184,149,74,0.06) 0%, transparent 60%)",
        }}
      />

      <FleetHero />
      <SovereigntyAct />
      <FuelDepotAct />
      <ClosingQuote />
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════
// Act 1 — Fleet Hero
// ═══════════════════════════════════════════════════════════════════

function FleetHero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.55, 0.85]);

  return (
    <div
      ref={ref}
      className="relative w-full h-[100vh] overflow-hidden flex items-center justify-center"
    >
      {/* Parallax convoy image */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 -top-[10%] -bottom-[10%]"
      >
        <Image
          src="/logistics/truck1.jpg"
          alt="Kangala Transport convoy"
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{ filter: "grayscale(0.15) contrast(1.05)" }}
        />
      </motion.div>

      {/* Gold-tinted dark overlay */}
      <motion.div
        aria-hidden
        style={{ opacity: overlayOpacity }}
        className="absolute inset-0"
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(10,25,47,0.55) 0%, rgba(10,25,47,0.4) 50%, rgba(10,25,47,0.95) 100%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 40%, rgba(184,149,74,0.12) 0%, transparent 70%)",
          }}
        />
      </motion.div>

      {/* HUD corner brackets */}
      <span className="absolute top-6 left-6 w-5 h-5 border-t-2 border-l-2 border-gold/70" />
      <span className="absolute top-6 right-6 w-5 h-5 border-t-2 border-r-2 border-gold/70" />
      <span className="absolute bottom-6 left-6 w-5 h-5 border-b-2 border-l-2 border-gold/70" />
      <span className="absolute bottom-6 right-6 w-5 h-5 border-b-2 border-r-2 border-gold/70" />

      {/* Top bar */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.2 }}
        className="absolute top-0 left-0 right-0 px-6 md:px-12 py-5 flex items-center justify-between"
      >
        <span className="font-cinzel text-gold/80 tracking-[0.3em] text-[10px] md:text-xs uppercase">
          Kangala Holding Group
        </span>
        <span className="font-cinzel text-ivory/60 tracking-[0.3em] text-[10px] md:text-xs uppercase">
          Visual Evidence
        </span>
      </motion.div>

      {/* Center block */}
      <div className="relative z-10 text-center px-6 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
          className="font-cinzel text-gold tracking-[0.5em] text-[10px] md:text-xs mb-6"
        >
          KANGALA TRANSPORT &amp; HYDROCARBURE
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="font-cinzel text-ivory tracking-[0.08em] text-4xl md:text-6xl lg:text-7xl font-light leading-tight"
        >
          FLEET
          <br />
          <span className="text-gold-gradient">MOBILIZATION</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 1 }}
          className="mx-auto mt-8 w-24 h-px bg-gold"
        />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-6 font-cairo text-ivory/75 text-sm md:text-base italic max-w-2xl mx-auto"
        >
          Documented readiness for continuous, large-scale deployment.
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 1.4 }}
          dir="rtl"
          className="mt-3 font-cairo text-gold/70 text-xs md:text-sm"
        >
          جاهزية موثّقة لنشر واسع النطاق دون انقطاع
        </motion.div>
      </div>

      {/* Bottom stats bar */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 1.6 }}
        className="absolute bottom-0 left-0 right-0 px-6 md:px-12 pb-8 md:pb-12"
      >
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-px bg-gold/15 border-y border-gold/25">
          {FLEET_STATS.map((s, i) => (
            <div
              key={s.label}
              className="bg-sovereign/75 backdrop-blur-sm p-4 md:p-6 text-center"
            >
              <div
                className="font-cinzel text-gold-gradient text-2xl md:text-4xl font-light"
                dir="ltr"
              >
                {s.numeric !== undefined && i === 0 ? (
                  <>
                    <CountUp to={s.numeric} />
                    {s.suffix}
                  </>
                ) : (
                  s.value
                )}
              </div>
              <div className="mt-1.5 font-cinzel text-ivory/55 tracking-[0.22em] text-[8px] md:text-[10px] uppercase">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// Act 2 — Logistical Sovereignty narrative
// ═══════════════════════════════════════════════════════════════════

function SovereigntyAct() {
  return (
    <div className="relative py-24 md:py-32">
      <div className="container mx-auto px-6 md:px-12 max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16 md:mb-20"
        >
          <div className="font-cinzel text-gold tracking-[0.5em] text-[10px] md:text-xs mb-4 opacity-80">
            LOGISTICAL SOVEREIGNTY · السيادة اللوجستية
          </div>
          <h2 className="font-cinzel text-ivory tracking-[0.1em] text-3xl md:text-5xl font-light leading-tight">
            THE POWER TO
            <br />
            <span className="text-gold-gradient">BREAK THE SIEGE</span>
          </h2>
          <div className="mt-6 flex items-center justify-center gap-3 text-gold/50">
            <span className="w-12 h-px bg-gold/40" />
            <span className="text-xs">◆</span>
            <span className="w-12 h-px bg-gold/40" />
          </div>

          <p className="mt-8 max-w-3xl mx-auto font-cairo text-ivory/70 text-sm md:text-base leading-relaxed">
            While others navigate supply chain vulnerabilities, Kangala operates
            with <span className="text-ivory">complete logistical independence</span>.
            Our mobilized fleet executes supply operations in a{" "}
            <span className="text-gold">single, coordinated wave</span>.
          </p>
        </motion.div>

        {/* 4 capability pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {CAPABILITIES.map((c, i) => (
            <CapabilityPillar key={c.num} c={c} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

function CapabilityPillar({
  c,
  index,
}: {
  c: (typeof CAPABILITIES)[number];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.8,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative group"
    >
      <div
        className="relative h-full p-6 md:p-7 transition-colors duration-500"
        style={{
          background: "rgba(6,16,34,0.35)",
          border: "1px solid rgba(212,175,90,0.22)",
        }}
      >
        {/* Corner brackets */}
        <span className="absolute top-0 left-0 w-4 h-4 border-t border-l border-gold/55" />
        <span className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-gold/55" />

        {/* Number */}
        <div className="font-cinzel text-gold/70 text-xs tracking-[0.35em] mb-1">
          {c.num}
        </div>
        <div className="mt-0.5 mb-5 w-8 h-px bg-gold/40" />

        {/* Title */}
        <h3 className="font-cinzel text-ivory text-base md:text-lg font-normal tracking-wide leading-snug mb-3">
          {c.title}
        </h3>

        {/* Description */}
        <p className="font-cairo text-ivory/55 text-[12px] md:text-[13px] leading-relaxed">
          {c.desc}
        </p>
      </div>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// Act 3 — Strategic Fuel Depot
// ═══════════════════════════════════════════════════════════════════

function FuelDepotAct() {
  return (
    <div className="relative py-24 md:py-32 border-t border-gold/10">
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 20%, rgba(184,149,74,0.05) 0%, transparent 55%)",
        }}
      />

      <div className="relative container mx-auto px-6 md:px-12 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1 }}
          className="text-center mb-14 md:mb-20"
        >
          <div className="font-cinzel text-gold/80 tracking-[0.4em] text-[10px] md:text-xs mb-4 uppercase">
            Energy Infrastructure · Border Operations
          </div>

          <h2 className="font-cinzel text-ivory tracking-[0.1em] text-3xl md:text-5xl font-light leading-tight">
            STRATEGIC
            <br />
            <span className="text-gold-gradient">FUEL DEPOT</span>
          </h2>

          <div className="mt-6 font-cinzel text-ivory/60 tracking-[0.25em] text-[10px] md:text-xs uppercase">
            Cross-Border Storage Facility · Burkina Faso – Mali Corridor
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-8 md:gap-12 items-start">
          {/* Gallery */}
          <div className="grid grid-cols-2 gap-3 md:gap-4">
            {DEPOT_GALLERY.map((img, i) => (
              <DepotPhoto key={img.src} img={img} index={i} />
            ))}
          </div>

          {/* Narrative + cards + stats */}
          <div className="space-y-6">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.9 }}
              className="font-cairo text-ivory/75 text-sm md:text-base leading-relaxed"
            >
              Kangala Holding owns{" "}
              <span className="text-gold">high-capacity fuel storage tanks</span>{" "}
              at a strategic border zone between Burkina Faso and Mali. This
              pivotal location supports{" "}
              <span className="text-ivory">cross-border logistics</span>, reduces
              transit times, and secures the energy supply chain for the entire
              mining operation.
            </motion.p>

            {/* 3 stat mini-pills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.9, delay: 0.1 }}
              className="grid grid-cols-3 gap-px bg-gold/15"
            >
              {DEPOT_STATS.map((s) => (
                <div
                  key={s.label}
                  className="bg-sovereign/60 backdrop-blur-sm p-4 text-center"
                >
                  <div className="font-cinzel text-gold-gradient text-2xl md:text-3xl font-light">
                    {s.value}
                  </div>
                  <div className="mt-1 font-cinzel text-ivory/50 tracking-[0.2em] text-[8px] md:text-[9px] uppercase">
                    {s.label}
                  </div>
                </div>
              ))}
            </motion.div>

            {/* 3 feature cards */}
            <div className="space-y-3">
              {DEPOT_CARDS.map((card, i) => (
                <DepotCard key={card.title} card={card} index={i} />
              ))}
            </div>

            {/* Energy Sovereignty highlight */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.9, delay: 0.5 }}
              className="relative p-5 md:p-6"
              style={{
                background:
                  "linear-gradient(135deg, rgba(184,149,74,0.12) 0%, rgba(184,149,74,0.04) 100%)",
                border: "1px solid rgba(212,175,90,0.4)",
              }}
            >
              <span className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-gold" />
              <span className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-gold" />

              <div className="font-cinzel text-gold tracking-[0.3em] text-[10px] uppercase mb-2">
                Energy Sovereignty
              </div>
              <div className="font-cairo text-ivory/80 text-[13px] md:text-sm leading-relaxed">
                Owning fuel infrastructure at a{" "}
                <span className="text-gold">cross-border chokepoint</span>{" "}
                eliminates third-party dependency, guarantees uninterrupted
                fleet operations, and positions Kangala as a{" "}
                <span className="text-ivory">regional energy anchor</span>{" "}
                across the Sahel corridor.
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DepotPhoto({
  img,
  index,
}: {
  img: (typeof DEPOT_GALLERY)[number];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.8,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative group overflow-hidden"
      style={{ border: "1px solid rgba(212,175,90,0.22)" }}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={img.src}
          alt={img.label}
          fill
          sizes="(max-width: 768px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          style={{ filter: "saturate(0.92) contrast(1.04)" }}
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, transparent 50%, rgba(10,25,47,0.85) 100%)",
          }}
        />
      </div>

      {/* Corner brackets */}
      <span className="absolute top-0 left-0 w-3 h-3 border-t border-l border-gold/70" />
      <span className="absolute top-0 right-0 w-3 h-3 border-t border-r border-gold/70" />

      {/* Caption */}
      <div className="absolute bottom-0 left-0 right-0 p-2.5 md:p-3">
        <div className="font-cinzel text-ivory/90 tracking-[0.12em] text-[9px] md:text-[10px] leading-tight">
          {img.label}
        </div>
      </div>
    </motion.div>
  );
}

function DepotCard({
  card,
  index,
}: {
  card: (typeof DEPOT_CARDS)[number];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.7,
        delay: 0.15 + index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative p-4 md:p-5 group"
      style={{
        background: "rgba(6,16,34,0.35)",
        border: "1px solid rgba(212,175,90,0.2)",
        borderLeft: "2px solid rgba(184,149,74,0.7)",
      }}
    >
      <div className="font-cinzel text-gold text-[11px] md:text-[12px] tracking-[0.22em] uppercase mb-1.5">
        {card.title}
      </div>
      <div className="font-cairo text-ivory/60 text-[12px] md:text-[13px] leading-relaxed">
        {card.body}
      </div>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// Closing Quote
// ═══════════════════════════════════════════════════════════════════

function ClosingQuote() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 1.2 }}
      className="relative py-20 md:py-28 border-t border-gold/15"
    >
      <div className="container mx-auto px-6 md:px-12 max-w-4xl text-center">
        <div className="flex items-center justify-center gap-3 text-gold/50 mb-6">
          <span className="w-12 h-px bg-gold/40" />
          <span className="text-xs">◆</span>
          <span className="w-12 h-px bg-gold/40" />
        </div>

        <blockquote className="font-cinzel text-ivory text-xl md:text-3xl lg:text-4xl font-light leading-relaxed tracking-wide italic">
          “Supply chain resilience is not an advantage;
          <br className="hidden md:block" /> it is the foundation of{" "}
          <span className="text-gold-gradient not-italic">
            sovereign execution
          </span>
          .”
        </blockquote>

        <div className="mt-8 font-cinzel text-gold/60 tracking-[0.35em] text-[10px] md:text-xs uppercase">
          — Kangala Doctrine
        </div>
      </div>
    </motion.div>
  );
}
