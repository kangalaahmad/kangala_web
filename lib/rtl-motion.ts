/**
 * Kangala Sovereign — RTL-aware Motion Helpers
 *
 * In RTL languages (Arabic), "enter from the start" means enter from the RIGHT,
 * not the left. Raw `x: -100` animations feel unnatural because they fight
 * the reader's eye direction.
 *
 * Use these helpers instead of hard-coded `x:` values in any horizontal animation.
 *
 * ────────────────────────────────────────────────────────────────
 * Usage:
 *
 *   import { useDir, rtlX } from "@/lib/rtl-motion";
 *
 *   const dir = useDir();                  // "rtl" | "ltr"
 *   <motion.div
 *     initial={{ x: rtlX(-100, dir) }}     // RTL → +100, LTR → -100
 *     animate={{ x: 0 }}
 *   />
 *
 *   // Or with full variants:
 *   <motion.div variants={slideInFromStart(dir)} />
 * ────────────────────────────────────────────────────────────────
 */

"use client";

import { useEffect, useState } from "react";
import type { Variants } from "framer-motion";

export type Dir = "rtl" | "ltr";

/**
 * Detect document direction. Safe for SSR (defaults to "rtl" since this
 * project is Arabic-first, but re-checks on mount).
 */
export function useDir(): Dir {
  const [dir, setDir] = useState<Dir>("rtl");

  useEffect(() => {
    const htmlDir = document.documentElement.dir;
    setDir(htmlDir === "ltr" ? "ltr" : "rtl");
  }, []);

  return dir;
}

/**
 * Mirror an x-axis value for RTL.
 * In RTL, "enter from start" = enter from the RIGHT = positive x.
 *
 * @param val  the LTR-natural value (e.g. -100 for "from left")
 * @param dir  current document direction
 * @returns    mirrored value for RTL, unchanged for LTR
 */
export function rtlX(val: number, dir: Dir = "rtl"): number {
  return dir === "rtl" ? -val : val;
}

/**
 * Convert a percentage string (e.g. "-30%") for RTL awareness.
 * Useful for `useTransform` range values on horizontal scroll.
 */
export function rtlPct(val: string, dir: Dir = "rtl"): string {
  if (!val.endsWith("%")) return val;
  const num = parseFloat(val);
  if (isNaN(num)) return val;
  return dir === "rtl" ? `${-num}%` : val;
}

// ─────────────────────────── Pre-built Variants ───────────────────────────

/**
 * Slide in from the reading-start edge.
 * LTR: from left  →  center
 * RTL: from right →  center
 */
export function slideInFromStart(dir: Dir = "rtl", distance = 80): Variants {
  return {
    hidden: { opacity: 0, x: rtlX(-distance, dir) },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 1.0, ease: [0.22, 1, 0.36, 1] },
    },
  };
}

/**
 * Slide in from the reading-end edge.
 * LTR: from right →  center
 * RTL: from left  →  center
 */
export function slideInFromEnd(dir: Dir = "rtl", distance = 80): Variants {
  return {
    hidden: { opacity: 0, x: rtlX(distance, dir) },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 1.0, ease: [0.22, 1, 0.36, 1] },
    },
  };
}

/**
 * Stagger children reveal. Combine with slideInFromStart / From End.
 */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

/**
 * For horizontal scroll sections (Phase 2: The Machine, Discovery, Timeline).
 * Returns a scroll direction multiplier.
 *
 *   const dir = useDir();
 *   const x = useTransform(scrollYProgress, [0, 1], ["0%", `${horizontalScrollEndPct(dir, -75)}%`]);
 */
export function horizontalScrollEndPct(dir: Dir, ltrPct: number): number {
  return dir === "rtl" ? -ltrPct : ltrPct;
}
