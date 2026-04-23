"use client";

/**
 * ╔═══════════════════════════════════════════════════════════════════╗
 * ║  WAX SEAL — Mechanical press animation (molten gold variant)      ║
 * ║                                                                   ║
 * ║  Final sovereign mark at the close of the dossier (Invitation).   ║
 * ║  NOT burgundy (which reads as greeting-card territory). Molten    ║
 * ║  gold aligns with the brand bullion aesthetic while remaining     ║
 * ║  unambiguously a wax seal — drip shape, inner shadow, monogram.   ║
 * ║                                                                   ║
 * ║  Animation — two-stage stamp:                                     ║
 * ║   stage 1 (0–0.6s): wax drops+presses (scale 0.3→1, slight        ║
 * ║                     rotation, spring bounce)                      ║
 * ║   stage 2 (0.6–1.0s): "K" monogram stamps into the wax            ║
 * ║                       (scale 0.55→1, opacity 0→1)                 ║
 * ║                                                                   ║
 * ║  Variants propagate via framer-motion parent → child.             ║
 * ╚═══════════════════════════════════════════════════════════════════╝
 */

import { motion, type Variants } from "framer-motion";
import { EASE } from "@/lib/easing";

const sealVariants: Variants = {
  hidden: { scale: 0.3, opacity: 0, rotate: -12 },
  visible: {
    scale: 1,
    opacity: 1,
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 180,
      damping: 15,
      mass: 0.9,
    },
  },
};

const monogramVariants: Variants = {
  hidden: { scale: 0.55, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      delay: 0.55,
      duration: 0.4,
      ease: EASE.HOVER,
    },
  },
};

type WaxSealProps = {
  /** Override monogram letter (default "K" for Kangala) */
  monogram?: string;
  /** Size preset — controls width/height */
  size?: "md" | "lg";
};

export default function WaxSeal({
  monogram = "K",
  size = "md",
}: WaxSealProps) {
  const dimensions =
    size === "lg"
      ? "w-36 h-36 md:w-40 md:h-40"
      : "w-28 h-28 md:w-32 md:h-32";
  const monogramSize = size === "lg" ? "text-5xl md:text-6xl" : "text-4xl md:text-5xl";

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.6 }}
      variants={sealVariants}
      className="relative inline-flex items-center justify-center select-none"
    >
      {/* Wax blob — asymmetric clip-path for organic drip shape */}
      <div
        className={`relative ${dimensions} flex items-center justify-center`}
        style={{
          // Molten gold gradient — warm highlight top-left, darkened rim
          background:
            "radial-gradient(circle at 32% 28%, #E3C077 0%, #C59A52 35%, #9C7A36 72%, #6E5320 100%)",
          // Inner shadow simulates wax depth + outer shadow for lift
          boxShadow:
            "inset 0 -8px 14px rgba(0,0,0,0.38), inset 0 5px 10px rgba(255,230,170,0.35), 0 10px 24px rgba(0,0,0,0.5), 0 2px 4px rgba(0,0,0,0.3)",
          // Organic drip polygon — asymmetric to avoid perfect circle
          clipPath:
            "polygon(8% 18%, 24% 4%, 46% 10%, 63% 2%, 80% 8%, 95% 22%, 99% 42%, 96% 60%, 100% 80%, 85% 94%, 64% 98%, 44% 96%, 24% 99%, 6% 86%, 1% 68%, 4% 46%, 2% 24%)",
        }}
      >
        {/* Inner ring — classic pressed-seal border, subtle */}
        <div
          className="absolute rounded-full"
          style={{
            inset: "14%",
            border: "1.5px solid rgba(60,38,12,0.4)",
            boxShadow: "inset 0 0 4px rgba(60,38,12,0.25)",
          }}
        />

        {/* Monogram K — stamped into the wax */}
        <motion.span
          variants={monogramVariants}
          className={`relative font-cinzel ${monogramSize} font-bold leading-none`}
          style={{
            color: "#4A3415",
            textShadow:
              "0 1px 0 rgba(255,230,170,0.45), 0 -1px 0 rgba(40,25,8,0.3)",
            letterSpacing: "0.02em",
          }}
        >
          {monogram}
        </motion.span>
      </div>
    </motion.div>
  );
}
