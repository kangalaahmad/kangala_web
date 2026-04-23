"use client";

/**
 * ╔═══════════════════════════════════════════════════════════════════╗
 * ║  SOVEREIGN SIGNATURE — Live treaty-signing animation              ║
 * ║                                                                   ║
 * ║  A stylized SVG signature path draws itself from left to right    ║
 * ║  via `pathLength` animation. Designed to feel like an authentic   ║
 * ║  hand-signed document mark — NOT a typeset font trick.            ║
 * ║                                                                   ║
 * ║  Visual rhythm:                                                   ║
 * ║   0s  : supra line + "Issued Under Sovereign Authority" rule      ║
 * ║   0.4s: signature begins drawing (2.4s duration)                  ║
 * ║   2.8s: name fades in below                                       ║
 * ║   3.2s: title + location fade in                                  ║
 * ║                                                                   ║
 * ║  Designed for ivory backgrounds (Governance bottom).              ║
 * ╚═══════════════════════════════════════════════════════════════════╝
 */

import { motion } from "framer-motion";
import { EASE } from "@/lib/easing";

type SovereignSignatureProps = {
  /** Override signatory line (default: Chairman attribution in EN) */
  name?: string;
  title?: string;
  location?: string;
  supra?: string;
};

export default function SovereignSignature({
  name = "Ali Konaté",
  title = "Chairman · Kangala Holding Group",
  location = "Dubai · 2026",
  supra = "Issued Under Sovereign Authority",
}: SovereignSignatureProps) {
  // Stylized signature path — 6 connected strokes evoking a flowing hand
  // signature. NOT meant to be legible, just authentic-feeling.
  const signaturePath =
    "M 18 58 " +
    "C 22 38, 32 28, 42 48 " +
    "S 58 72, 72 54 " +
    "C 82 42, 94 36, 108 50 " +
    "S 128 72, 146 54 " +
    "C 156 44, 170 40, 186 52 " +
    "S 208 66, 222 52 " +
    "M 94 68 " +
    "C 110 66, 132 66, 154 68";

  return (
    <div className="relative mx-auto max-w-xl px-6 py-14 md:py-16 text-center">
      {/* Supra rule — "ISSUED UNDER SOVEREIGN AUTHORITY" with flanking lines */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8, ease: EASE.DISSOLVE }}
        className="flex items-center justify-center gap-4 mb-10"
      >
        <span className="h-px w-14 md:w-20 bg-gold/45" />
        <span className="font-cinzel text-gold/85 tracking-[0.4em] text-[10px] md:text-[11px] uppercase">
          {supra}
        </span>
        <span className="h-px w-14 md:w-20 bg-gold/45" />
      </motion.div>

      {/* Signature itself — SVG path that draws from left to right */}
      <div className="flex justify-center mb-5">
        <svg
          width="240"
          height="86"
          viewBox="0 0 240 86"
          className="overflow-visible"
          aria-hidden
        >
          <motion.path
            d={signaturePath}
            fill="none"
            stroke="#B8954A"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{
              pathLength: { duration: 2.4, delay: 0.4, ease: EASE.DISSOLVE },
              opacity: { duration: 0.3, delay: 0.4 },
            }}
          />
        </svg>
      </div>

      {/* Name */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8, delay: 2.8, ease: EASE.DISSOLVE }}
        className="font-cinzel text-sovereign text-lg md:text-xl tracking-[0.1em]"
      >
        {name}
      </motion.div>

      {/* Title */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.7, delay: 3.2, ease: EASE.DISSOLVE }}
        className="mt-1 font-cinzel text-sovereign/60 tracking-[0.32em] text-[10px] md:text-[11px] uppercase"
      >
        {title}
      </motion.div>

      {/* Location + date */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.7, delay: 3.4, ease: EASE.DISSOLVE }}
        className="mt-3 font-cormorant italic text-sovereign/50 text-sm md:text-base"
      >
        {location}
      </motion.div>
    </div>
  );
}
