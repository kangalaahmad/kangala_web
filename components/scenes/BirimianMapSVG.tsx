// components/scenes/BirimianMapSVG.tsx
//
// SOVEREIGN MAP — West African strategic cartography for Kangala Holding.
//
// Layer architecture:
//   1  atmospheric backdrop
//   2  neighbor countries (Mali / Niger / Ghana / Côte d'Ivoire / Togo / Bénin)
//      — diagonal hatching + dashed borders (natural, dim context)
//   3  Burkina Faso activation aura (radial gold glow)
//   4  Burkina Faso body (navy gradient + solid gold border + inner gold hatch)
//   5  Gold vein MAIN TRUNK — three stacked paths:
//        outer bloom (blur filter)  ·  body gradient  ·  bright molten core
//      Organic geometry encoded in the path itself (many short L segments)
//      rather than feDisplacement — avoids per-frame filter cost.
//   6  Six BRANCHING sub-veins fanning toward secondary deposits
//   7  Five gold targets (aura + pulsing ring + crosshair + bright core)
//   8  Country labels (dimmed context)
//   9  Sovereign label "BURKINA FASO" + Ouagadougou (capital) + Bobo-Dioulasso
//  10  Target identifiers (T1–T5) with local deposit names
//  11  Cartographic ornaments — scale bar + compass rose
//
// All visibility and progress is driven by MotionValue props from TheLand.
// No internal state: fully reactive to scrollYProgress.

import { motion, MotionValue } from "framer-motion";

interface MapProps {
  neighborsOpacity: MotionValue<number>;
  burkinaOpacity: MotionValue<number>;
  burkinaGlow: MotionValue<number>;
  veinMainProgress: MotionValue<number>;
  veinBranchProgress: MotionValue<number>;
  targetsOpacity: MotionValue<number>;
  countryLabelsOpacity: MotionValue<number>;
  cityLabelsOpacity: MotionValue<number>;
  targetLabelsOpacity: MotionValue<number>;
}

// Simplified West Africa silhouettes for art-directed cartography.
// Coordinates chosen so Burkina Faso sits visually central at (~525, 355).
const COUNTRIES: Record<string, string> = {
  mali:
    "M 60 170 L 280 120 L 500 130 L 640 90 L 820 120 L 860 180 L 770 235 L 540 250 L 500 320 L 340 315 L 260 260 L 130 275 Z",
  niger:
    "M 760 215 L 900 225 L 970 295 L 940 400 L 780 385 L 730 305 Z",
  coteDivoire:
    "M 290 445 L 490 448 L 485 578 L 445 660 L 315 665 L 255 578 Z",
  ghana:
    "M 498 455 L 590 452 L 615 568 L 595 650 L 515 650 L 485 572 Z",
  togo: "M 615 465 L 642 462 L 655 650 L 625 655 Z",
  benin: "M 658 460 L 710 455 L 725 650 L 680 655 L 665 565 Z",
  burkinaFaso:
    "M 340 292 L 390 265 L 470 260 L 560 258 L 655 275 L 720 310 L 735 365 L 710 415 L 620 438 L 500 445 L 390 430 L 330 385 L 315 335 Z",
};

// Main organic vein — many short L segments with small vertical offsets
// produce natural zigzag geometry without needing feDisplacementMap.
const VEIN_TRUNK =
  "M 365 325 L 378 319 L 392 333 L 408 327 L 425 340 L 448 335 L 470 352 L 488 344 L 508 360 L 528 353 L 548 368 L 568 358 L 588 353 L 608 342 L 628 355 L 648 350 L 668 362 L 688 355 L 700 348";

// Six branches reaching toward secondary gold concentrations around targets.
const VEIN_BRANCHES = [
  "M 392 333 L 395 312 L 400 295",
  "M 470 352 L 475 325 L 478 302",
  "M 528 353 L 524 378 L 528 402",
  "M 528 353 L 512 341 L 495 332",
  "M 608 342 L 618 368 L 630 398",
  "M 668 362 L 678 342 L 685 322",
];

const TARGETS = [
  { id: "T1", cx: 400, cy: 297, r: 7, label: "KOURKOU" },
  { id: "T2", cx: 478, cy: 302, r: 8, label: "NIANGOUÉLA" },
  { id: "T3", cx: 528, cy: 353, r: 10, label: "BOROMO CORE", primary: true },
  { id: "T4", cx: 630, cy: 398, r: 7, label: "PISSY" },
  { id: "T5", cx: 685, cy: 322, r: 7, label: "TENKODOGO" },
];

export const BirimianMapSVG = ({
  neighborsOpacity,
  burkinaOpacity,
  burkinaGlow,
  veinMainProgress,
  veinBranchProgress,
  targetsOpacity,
  countryLabelsOpacity,
  cityLabelsOpacity,
  targetLabelsOpacity,
}: MapProps) => {
  return (
    <svg
      viewBox="0 0 1000 700"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        {/* Burkina body — subtle luminous gradient (not flat color) */}
        <linearGradient id="bf-fill" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0A192F" />
          <stop offset="50%" stopColor="#1a2a48" />
          <stop offset="100%" stopColor="#0A192F" />
        </linearGradient>

        {/* Activation aura — radial gold halo behind Burkina */}
        <radialGradient id="bf-aura" cx="50%" cy="50%" r="55%">
          <stop offset="0%" stopColor="#D4AF5A" stopOpacity="0.38" />
          <stop offset="45%" stopColor="#B8954A" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#B8954A" stopOpacity="0" />
        </radialGradient>

        {/* Molten hotspot gradient along the vein */}
        <linearGradient id="vein-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#B8954A" />
          <stop offset="45%" stopColor="#D4AF5A" />
          <stop offset="55%" stopColor="#F0D078" />
          <stop offset="100%" stopColor="#B8954A" />
        </linearGradient>

        {/* Topographic hatch — subtle terrain texture for neighbor countries */}
        <pattern
          id="terrain-hatch"
          patternUnits="userSpaceOnUse"
          width="6"
          height="6"
        >
          <path
            d="M 0 6 L 6 0"
            stroke="#DAD3C6"
            strokeWidth="0.3"
            opacity="0.28"
          />
        </pattern>

        {/* Subtle gold hatch inside Burkina Faso */}
        <pattern
          id="bf-hatch"
          patternUnits="userSpaceOnUse"
          width="8"
          height="8"
        >
          <path
            d="M 0 8 L 8 0"
            stroke="#D4AF5A"
            strokeWidth="0.35"
            opacity="0.18"
          />
        </pattern>

        {/* Soft molten glow filter for gold targets */}
        <filter id="target-glow" x="-150%" y="-150%" width="400%" height="400%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="4" result="blur" />
          <feFlood floodColor="#F0D078" floodOpacity="0.9" />
          <feComposite in2="blur" operator="in" result="glow" />
          <feMerge>
            <feMergeNode in="glow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* ═══ 1 · atmospheric backdrop ═══ */}
      <rect width="1000" height="700" fill="url(#bf-fill)" opacity="0.25" />

      {/* ═══ 2 · Neighbor countries (dimmed, natural state) ═══ */}
      <motion.g style={{ opacity: neighborsOpacity }}>
        {Object.entries(COUNTRIES)
          .filter(([key]) => key !== "burkinaFaso")
          .map(([key, d]) => (
            <g key={key}>
              <path d={d} fill="rgba(218, 211, 198, 0.035)" />
              <path d={d} fill="url(#terrain-hatch)" />
              <path
                d={d}
                fill="none"
                stroke="rgba(218, 211, 198, 0.32)"
                strokeWidth="0.7"
                strokeDasharray="3 3"
              />
            </g>
          ))}
      </motion.g>

      {/* ═══ 3 · Burkina activation aura ═══ */}
      <motion.ellipse
        cx="525"
        cy="355"
        rx="265"
        ry="145"
        fill="url(#bf-aura)"
        style={{ opacity: burkinaGlow }}
      />

      {/* ═══ 4 · Burkina Faso — the sovereign territory ═══ */}
      <motion.g style={{ opacity: burkinaOpacity }}>
        <path d={COUNTRIES.burkinaFaso} fill="url(#bf-fill)" />
        <path d={COUNTRIES.burkinaFaso} fill="url(#bf-hatch)" opacity="0.55" />
        {/* Solid gold border — confident, sovereign */}
        <path
          d={COUNTRIES.burkinaFaso}
          fill="none"
          stroke="#B8954A"
          strokeWidth="1.8"
        />
        {/* Bright inner stroke — subtle inner glow */}
        <path
          d={COUNTRIES.burkinaFaso}
          fill="none"
          stroke="#D4AF5A"
          strokeWidth="0.5"
          opacity="0.7"
        />
      </motion.g>

      {/* ═══ 5 · Gold vein — main trunk (three stacked paths) ═══ */}
      {/* Outer bloom — wide + blurred = glow */}
      <motion.path
        d={VEIN_TRUNK}
        stroke="#D4AF5A"
        strokeWidth="14"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.18"
        fill="none"
        filter="blur(4px)"
        style={{ pathLength: veinMainProgress }}
      />
      {/* Body — mid-weight gold gradient */}
      <motion.path
        d={VEIN_TRUNK}
        stroke="url(#vein-gradient)"
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        style={{ pathLength: veinMainProgress }}
      />
      {/* Molten core — thin bright highlight */}
      <motion.path
        d={VEIN_TRUNK}
        stroke="#F5E0A0"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.95"
        fill="none"
        style={{ pathLength: veinMainProgress }}
      />

      {/* ═══ 6 · Branching sub-veins ═══ */}
      {VEIN_BRANCHES.map((d, i) => (
        <g key={i}>
          <motion.path
            d={d}
            stroke="#D4AF5A"
            strokeWidth="6"
            strokeLinecap="round"
            opacity="0.14"
            fill="none"
            filter="blur(3px)"
            style={{ pathLength: veinBranchProgress }}
          />
          <motion.path
            d={d}
            stroke="url(#vein-gradient)"
            strokeWidth="2.2"
            strokeLinecap="round"
            fill="none"
            style={{ pathLength: veinBranchProgress }}
          />
          <motion.path
            d={d}
            stroke="#F5E0A0"
            strokeWidth="0.7"
            strokeLinecap="round"
            opacity="0.85"
            fill="none"
            style={{ pathLength: veinBranchProgress }}
          />
        </g>
      ))}

      {/* ═══ 7 · Gold targets ═══ */}
      <motion.g style={{ opacity: targetsOpacity }} filter="url(#target-glow)">
        {TARGETS.map((t, i) => (
          <g key={t.id}>
            {/* Outer halo */}
            <circle
              cx={t.cx}
              cy={t.cy}
              r={t.r * 2.4}
              fill="#D4AF5A"
              opacity="0.16"
            />
            {/* Pulsing ring */}
            <motion.circle
              cx={t.cx}
              cy={t.cy}
              r={t.r}
              fill="#D4AF5A"
              animate={{
                scale: [1, t.primary ? 1.45 : 1.3, 1],
                opacity: t.primary ? [0.75, 1, 0.75] : [0.6, 1, 0.6],
              }}
              transition={{
                repeat: Infinity,
                duration: 1.8 + i * 0.3,
                delay: i * 0.15,
                ease: "easeInOut",
              }}
              style={{
                transformOrigin: `${t.cx}px ${t.cy}px`,
                transformBox: "fill-box",
              }}
            />
            {/* Crosshair */}
            <line
              x1={t.cx - t.r * 2.6}
              y1={t.cy}
              x2={t.cx - t.r * 1.4}
              y2={t.cy}
              stroke="#D4AF5A"
              strokeWidth="0.8"
              opacity="0.65"
            />
            <line
              x1={t.cx + t.r * 1.4}
              y1={t.cy}
              x2={t.cx + t.r * 2.6}
              y2={t.cy}
              stroke="#D4AF5A"
              strokeWidth="0.8"
              opacity="0.65"
            />
            {/* Bright ivory core */}
            <circle cx={t.cx} cy={t.cy} r={t.r * 0.45} fill="#F5F0E8" />
          </g>
        ))}
      </motion.g>

      {/* ═══ 8 · Neighbor country labels ═══ */}
      <motion.g
        style={{ opacity: countryLabelsOpacity }}
        fontFamily="var(--font-cinzel), serif"
        fill="#DAD3C6"
      >
        <text x="400" y="200" fontSize="14" letterSpacing="6" opacity="0.5">
          MALI
        </text>
        <text x="835" y="310" fontSize="12" letterSpacing="5" opacity="0.5">
          NIGER
        </text>
        <text x="370" y="555" fontSize="10" letterSpacing="4" opacity="0.5">
          CÔTE D&apos;IVOIRE
        </text>
        <text x="535" y="570" fontSize="10" letterSpacing="4" opacity="0.5">
          GHANA
        </text>
        <text x="625" y="555" fontSize="6.5" letterSpacing="2" opacity="0.45">
          TOGO
        </text>
        <text x="668" y="555" fontSize="6.5" letterSpacing="2" opacity="0.45">
          BÉNIN
        </text>
      </motion.g>

      {/* ═══ 9 · Burkina sovereign label + cities ═══ */}
      <motion.g style={{ opacity: cityLabelsOpacity }}>
        {/* Country name — prominent gold */}
        <text
          x="525"
          y="228"
          fontFamily="var(--font-cinzel), serif"
          fontSize="17"
          letterSpacing="8"
          fill="#D4AF5A"
          textAnchor="middle"
          fontWeight="400"
        >
          BURKINA FASO
        </text>
        <line
          x1="455"
          y1="236"
          x2="595"
          y2="236"
          stroke="#B8954A"
          strokeWidth="0.6"
          opacity="0.75"
        />

        {/* Ouagadougou — capital */}
        <g>
          <circle cx="555" cy="360" r="3" fill="#F5F0E8" />
          <circle
            cx="555"
            cy="360"
            r="6.5"
            fill="none"
            stroke="#F5F0E8"
            strokeWidth="0.6"
            opacity="0.55"
          />
          <text
            x="566"
            y="354"
            fontFamily="var(--font-cinzel), serif"
            fontSize="9"
            letterSpacing="2"
            fill="#F5F0E8"
            opacity="0.88"
          >
            OUAGADOUGOU
          </text>
          <text
            x="566"
            y="366"
            fontFamily="var(--font-cinzel), serif"
            fontSize="6.5"
            letterSpacing="1.5"
            fill="#B8954A"
            opacity="0.75"
          >
            CAPITAL
          </text>
        </g>

        {/* Bobo-Dioulasso */}
        <g>
          <circle cx="420" cy="390" r="2" fill="#DAD3C6" />
          <text
            x="388"
            y="406"
            fontFamily="var(--font-cinzel), serif"
            fontSize="7.5"
            letterSpacing="1.5"
            fill="#DAD3C6"
            opacity="0.7"
          >
            BOBO-DIOULASSO
          </text>
        </g>
      </motion.g>

      {/* ═══ 10 · Target labels (T1–T5 + local deposit names) ═══ */}
      <motion.g style={{ opacity: targetLabelsOpacity }}>
        {TARGETS.map((t, i) => {
          // Alternate above/below to avoid vein overlap
          const isUp = i % 2 === 0;
          const labelY = isUp ? t.cy - t.r * 2.8 - 8 : t.cy + t.r * 2.8 + 12;
          return (
            <g key={t.id}>
              {/* Connector tick */}
              <line
                x1={t.cx}
                y1={isUp ? t.cy - t.r * 2.5 : t.cy + t.r * 2.5}
                x2={t.cx}
                y2={isUp ? labelY + 2 : labelY - 10}
                stroke="#D4AF5A"
                strokeWidth="0.6"
                opacity="0.7"
              />
              {/* Target ID */}
              <text
                x={t.cx}
                y={labelY}
                textAnchor="middle"
                fontFamily="var(--font-cinzel), serif"
                fontSize="9"
                letterSpacing="3"
                fill="#D4AF5A"
                fontWeight={t.primary ? "700" : "400"}
              >
                {t.id}
              </text>
              {/* Local name */}
              <text
                x={t.cx}
                y={labelY + (isUp ? -10 : 11)}
                textAnchor="middle"
                fontFamily="var(--font-cinzel), serif"
                fontSize="6.5"
                letterSpacing="2"
                fill="#F5F0E8"
                opacity="0.82"
              >
                {t.label}
              </text>
            </g>
          );
        })}
      </motion.g>

      {/* ═══ 11 · Cartographic ornaments — scale bar + compass ═══ */}
      <g transform="translate(70, 625)" opacity="0.65">
        <line x1="0" y1="0" x2="80" y2="0" stroke="#B8954A" strokeWidth="0.7" />
        <line x1="0" y1="-4" x2="0" y2="4" stroke="#B8954A" strokeWidth="0.7" />
        <line
          x1="40"
          y1="-3"
          x2="40"
          y2="3"
          stroke="#B8954A"
          strokeWidth="0.7"
        />
        <line x1="80" y1="-4" x2="80" y2="4" stroke="#B8954A" strokeWidth="0.7" />
        <text
          x="0"
          y="16"
          fontFamily="var(--font-cinzel), serif"
          fontSize="6.5"
          fill="#B8954A"
          letterSpacing="1"
        >
          0
        </text>
        <text
          x="40"
          y="16"
          fontFamily="var(--font-cinzel), serif"
          fontSize="6.5"
          fill="#B8954A"
          letterSpacing="1"
          textAnchor="middle"
        >
          100
        </text>
        <text
          x="80"
          y="16"
          fontFamily="var(--font-cinzel), serif"
          fontSize="6.5"
          fill="#B8954A"
          letterSpacing="1"
          textAnchor="middle"
        >
          200 KM
        </text>
      </g>

      <g transform="translate(920, 625)" opacity="0.7">
        <circle cx="0" cy="0" r="13" fill="none" stroke="#B8954A" strokeWidth="0.5" />
        <path d="M 0 -11 L -3 4 L 0 2 L 3 4 Z" fill="#D4AF5A" />
        <text
          x="0"
          y="-17"
          fontFamily="var(--font-cinzel), serif"
          fontSize="8"
          fill="#B8954A"
          textAnchor="middle"
          letterSpacing="1"
        >
          N
        </text>
      </g>
    </svg>
  );
};

export default BirimianMapSVG;
