"use client";

/**
 * ╔═══════════════════════════════════════════════════════════════════╗
 * ║  SOVEREIGN HORIZON — Chapter divider between scene transitions    ║
 * ║                                                                   ║
 * ║  A single 1px gold line that draws itself from center outward     ║
 * ║  when it enters the viewport. Acts as a cinematic "chapter break" ║
 * ║  between scenes — most valuable at midnight↔ivory boundaries      ║
 * ║  where the raw color shift would otherwise feel abrupt.           ║
 * ║                                                                   ║
 * ║  Width: min(420px, 60vw)  — stays elegant on desktop + mobile    ║
 * ║  Draw duration: 2s via EASE.DISSOLVE                              ║
 * ║  Origin: center (draws outward in both directions — sovereign     ║
 * ║          symmetry rather than left-to-right corporate sweep)      ║
 * ║  Triggers once (viewport: { once: true })                         ║
 * ╚═══════════════════════════════════════════════════════════════════╝
 */

import { motion } from "framer-motion";
import { EASE } from "@/lib/easing";

type SovereignHorizonProps = {
  /** Tonal variant — default works on any background; "ivory" lightens the line for dark sections */
  tone?: "default" | "ivory" | "midnight";
  /** Vertical padding between bordering scenes (default md:py-10) */
  padding?: string;
};

export default function SovereignHorizon({
  tone = "default",
  padding = "py-8 md:py-12",
}: SovereignHorizonProps) {
  const gradient =
    tone === "midnight"
      ? "linear-gradient(90deg, transparent 0%, rgba(10,25,47,0.35) 50%, transparent 100%)"
      : tone === "ivory"
      ? "linear-gradient(90deg, transparent 0%, rgba(245,240,232,0.45) 50%, transparent 100%)"
      : "linear-gradient(90deg, transparent 0%, rgba(184,149,74,0.65) 50%, transparent 100%)";

  return (
    <div
      aria-hidden
      className={`relative flex justify-center items-center ${padding}`}
    >
      {/* The line itself — draws from center outward via scaleX */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 2, ease: EASE.DISSOLVE }}
        className="h-px"
        style={{
          width: "min(420px, 60vw)",
          background: gradient,
          transformOrigin: "center",
        }}
      />

      {/* Central sovereign mark — subtle diamond, fades in AFTER line completes */}
      <motion.div
        initial={{ opacity: 0, scale: 0.4 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.8, delay: 1.4, ease: EASE.SPRING }}
        className="absolute w-1.5 h-1.5 rotate-45"
        style={{
          background:
            tone === "ivory"
              ? "rgba(245,240,232,0.7)"
              : tone === "midnight"
              ? "rgba(10,25,47,0.55)"
              : "rgba(184,149,74,0.85)",
        }}
      />
    </div>
  );
}
