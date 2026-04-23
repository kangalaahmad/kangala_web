"use client";

/**
 * ╔═══════════════════════════════════════════════════════════════════╗
 * ║  ODOMETER — Swiss Vault rolling digits                            ║
 * ║                                                                   ║
 * ║  Replaces the legacy fade-based CountUp with a mechanical         ║
 * ║  digit-reel display. Each digit slot renders a vertical column    ║
 * ║  of 0-9 clipped to a 1em window; a translateY rolls the target    ║
 * ║  digit into place.                                                ║
 * ║                                                                   ║
 * ║  Stagger: leftmost digit starts first, rightmost last             ║
 * ║           (mimics a bank vault's tumbler cascade).                ║
 * ║                                                                   ║
 * ║  Static glyphs (commas, periods) render in-line unchanged so      ║
 * ║  formatted output like "10,500,000" keeps its visual rhythm.      ║
 * ║                                                                   ║
 * ║  Respects `prefers-reduced-motion` via a CSS escape hatch.        ║
 * ╚═══════════════════════════════════════════════════════════════════╝
 */

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { EASE } from "@/lib/easing";

type OdometerProps = {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  /** Override total roll duration per digit (seconds). Default 1.4s. */
  rollDuration?: number;
  /** Override stagger between digit positions. Default 0.08s. */
  staggerPerDigit?: number;
};

export default function Odometer({
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
  rollDuration = 1.4,
  staggerPerDigit = 0.08,
}: OdometerProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  const formatted = value.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  // Map each character to a digit-position index (static chars get -1)
  const chars = formatted.split("");
  const digitIndices: number[] = [];
  chars.forEach((c, i) => {
    if (/\d/.test(c)) digitIndices.push(i);
  });
  const totalDigits = digitIndices.length;

  return (
    <span
      ref={ref}
      className="inline-flex items-baseline tabular-nums"
      style={{ lineHeight: 1 }}
      aria-label={`${prefix}${formatted}${suffix}`}
    >
      {prefix && <span>{prefix}</span>}
      {chars.map((c, i) => {
        const digitPos = digitIndices.indexOf(i);
        // Non-digit glyph (comma, period, minus, space, etc.) — render static
        if (digitPos === -1) {
          return (
            <span key={i} aria-hidden>
              {c}
            </span>
          );
        }
        // Digit — render a rolling reel
        return (
          <OdometerDigit
            key={i}
            digit={parseInt(c, 10)}
            animate={inView}
            delay={digitPos * staggerPerDigit}
            duration={rollDuration}
          />
        );
      })}
      {suffix && <span>{suffix}</span>}
    </span>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   Single-digit reel: a 1em window with a 10em vertical strip behind it.
   Resting state shows "0". Animating to digit N translates the strip
   -Nem so digit N is revealed through the window.
   ───────────────────────────────────────────────────────────────────── */
function OdometerDigit({
  digit,
  animate,
  delay,
  duration,
}: {
  digit: number;
  animate: boolean;
  delay: number;
  duration: number;
}) {
  return (
    <span
      aria-hidden
      className="inline-block overflow-hidden align-baseline"
      style={{ height: "1em", lineHeight: 1 }}
    >
      <motion.span
        className="flex flex-col"
        initial={{ y: "0em" }}
        animate={animate ? { y: `-${digit}em` } : { y: "0em" }}
        transition={{
          duration,
          delay,
          ease: EASE.SPRING,
        }}
        style={{ lineHeight: 1 }}
      >
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
          <span
            key={n}
            style={{ height: "1em", lineHeight: 1, display: "block" }}
          >
            {n}
          </span>
        ))}
      </motion.span>
    </span>
  );
}
