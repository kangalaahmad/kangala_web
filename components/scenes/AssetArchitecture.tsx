"use client";

/**
 * ╔═══════════════════════════════════════════════════════════════════╗
 * ║  ASSET ARCHITECTURE — THE SOVEREIGN WAR ROOM                      ║
 * ╠═══════════════════════════════════════════════════════════════════╣
 * ║  A Glass-HUD Orbital System visualising Kangala Holding Group's   ║
 * ║  operational backbone (8 subsidiaries orbiting a central Hub).    ║
 * ║                                                                   ║
 * ║  • Desktop (≥1024px) : Radial orbital — Hub as sun, 8 glass       ║
 * ║                        nodes as planets at 45° intervals.          ║
 * ║  • Mobile / Tablet   : Vertical spine — nodes stacked along a     ║
 * ║                        gold artery with inline detail cards.      ║
 * ║                                                                   ║
 * ║  • Interaction       : Hover previews · Click-to-pin · Esc unpins ║
 * ║  • Neural Web        : SVG arteries pulsing with ambient flow;    ║
 * ║                        active line pulses faster and brighter.    ║
 * ║  • Hub Readout       : Center node mirrors active subsidiary      ║
 * ║                        (radar read-out style).                    ║
 * ║  • Detail Panel      : Fixed glass panel below orbit; default     ║
 * ║                        state = Group summary (14 · 8 · 3).        ║
 * ║                                                                   ║
 * ║  Palette : strictly Ivory + Sovereign Gold. No status colors.     ║
 * ║  Perf    : backdrop-filter disabled during scroll (will-change).  ║
 * ║  A11y    : keyboard nav, Esc unpin, focus ring, reduced-motion.   ║
 * ╚═══════════════════════════════════════════════════════════════════╝
 */

import {
  AnimatePresence,
  motion,
} from "framer-motion";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import type { Dict, SceneProps } from "@/lib/i18n";

// ═══════════════════════════════════════════════════════════════════
// Types & Data
// ═══════════════════════════════════════════════════════════════════

type Subsidiary = {
  num: string;
  logo: string;
  category: string;
  name: string;
  desc: string;
  highlight: string;
  highlightMeta: string;
  location: string;
  country: string;
};

type UiLabels = {
  supra: string;
  titleA: string;
  titleB: string;
  subArabic: string;
  subStats: string;
  footerLine: string;
  readoutPanel: string;
  pinnedText: string;
  preview: string;
  standby: string;
  defaultCategory: string;
  defaultTitle: string;
  defaultSubsidiariesLabel: string;
  defaultBackboneLabel: string;
  defaultCountriesLabel: string;
  defaultHint: string;
  nodeWord: string;
};

const UI: Dict<UiLabels> = {
  en: {
    supra: "SOVEREIGN WAR ROOM",
    titleA: "ASSET",
    titleB: "ARCHITECTURE",
    subArabic: "الأذرع التشغيلية وراء الرؤية",
    subStats: "14 Subsidiaries · 8 Operational Backbone · 3 Countries",
    footerLine: "Vertically Integrated · From Pit to Port",
    readoutPanel: "Readout Panel",
    pinnedText: "Pinned · Press Esc",
    preview: "Preview",
    standby: "Standby",
    defaultCategory: "Kangala Holding Group",
    defaultTitle: "The Operational Arms Behind the Vision",
    defaultSubsidiariesLabel: "Subsidiaries",
    defaultBackboneLabel: "Backbone",
    defaultCountriesLabel: "Countries",
    defaultHint: "Hover any node to preview. Click to pin details for extended reading.",
    nodeWord: "NODE",
  },
  fr: {
    supra: "SALLE DE COMMANDEMENT SOUVERAINE",
    titleA: "ARCHITECTURE",
    titleB: "DES ACTIFS",
    subArabic: "الأذرع التشغيلية وراء الرؤية",
    subStats: "14 Filiales · 8 Piliers Opérationnels · 3 Pays",
    footerLine: "Intégration Verticale · De la Mine au Port",
    readoutPanel: "Panneau d'Affichage",
    pinnedText: "Épinglé · Appuyez sur Esc",
    preview: "Aperçu",
    standby: "Veille",
    defaultCategory: "Kangala Holding Group",
    defaultTitle: "Les Bras Opérationnels derrière la Vision",
    defaultSubsidiariesLabel: "Filiales",
    defaultBackboneLabel: "Piliers",
    defaultCountriesLabel: "Pays",
    defaultHint: "Survolez un nœud pour aperçu. Cliquez pour épingler les détails.",
    nodeWord: "NŒUD",
  },
};

const UiCtx = createContext<UiLabels>(UI.en);
const SubsCtx = createContext<Subsidiary[] | null>(null);
function useSubs(): Subsidiary[] {
  const v = useContext(SubsCtx);
  return v ?? subsidiaries;
}

const SUBS_FR: Subsidiary[] = [
  { num: "01", logo: "/logos/nakala_mine.svg", category: "Métaux Précieux & Mines", name: "Nakala Gold Mine", desc: "Extraction aurifère durable avec programmes de développement communautaire et initiatives de gestion environnementale.", highlight: "Actif central", highlightMeta: "Moteur de revenus principal", location: "Ouagadougou", country: "BF" },
  { num: "02", logo: "/logos/kgl_transports.svg", category: "Logistique & Énergie", name: "Kangala Transport", desc: "Distribution de carburant et logistique pétrolière en Afrique de l'Ouest avec capacités d'approvisionnement d'urgence.", highlight: "400+ citernes", highlightMeta: "Épine dorsale énergétique régionale", location: "Ouagadougou · Dubaï", country: "BF" },
  { num: "03", logo: "/logos/kgl_or.svg", category: "Métaux Précieux & Mines", name: "KGL OR", desc: "Commerce éthique de l'or avec essais modernes, tarification transparente et chaînes d'approvisionnement entièrement traçables.", highlight: "Traçabilité complète", highlightMeta: "Sourcing éthique certifié", location: "Ouagadougou", country: "BF" },
  { num: "04", logo: "/logos/naigaiba_auto.svg", category: "Automobile & Fabrication", name: "Naigaiba Auto Industrie", desc: "Fabrication de camions sur mesure et solutions de véhicules industriels conçus pour l'exploitation minière et les terrains difficiles.", highlight: "Ingénierie interne", highlightMeta: "Disponibilité maximale", location: "Ouagadougou", country: "BF" },
  { num: "05", logo: "/logos/emirates_diamonds.svg", category: "Métaux Précieux & Trading", name: "Emirates Diamonds & Gold", desc: "Commerce de diamants et d'or en lingots avec évaluation certifiée, coffre-fort sécurisé et services de conseil.", highlight: "3 cargaisons/mois", highlightMeta: "Certifié Kimberley", location: "Dubaï", country: "AE" },
  { num: "06", logo: "/logos/kangala_air_cargo.svg", category: "Logistique & Fret Aérien", name: "Kangala Express Air Cargo", desc: "Fret aérien international avec vols charters, manutention sécurisée et transport de cargaisons de haute valeur.", highlight: "Hub logistique Dubaï", highlightMeta: "Spécialiste cargaison précieuse", location: "Dubaï", country: "AE" },
  { num: "07", logo: "/logos/kgl_carriere.svg", category: "Carrière & Granulats", name: "KGL Carrière", desc: "Fourniture de sable, gravier et granulats pour la construction et l'infrastructure minière en Afrique de l'Ouest.", highlight: "Approvisionnement captif", highlightMeta: "Matériaux construction & mines", location: "Bobo-Dioulasso", country: "BF" },
  { num: "08", logo: "/logos/kgl_industries.svg", category: "Industries & Mines", name: "KGL Industries & Mining Projects", desc: "Ingénierie industrielle et exécution de projets miniers, de la faisabilité aux opérations à grande échelle.", highlight: "Livraison cycle complet", highlightMeta: "De l'ingénierie à la production", location: "Bobo-Dioulasso", country: "BF" },
];

// Order is meaningful: Nakala (01) at 12 o'clock = "Crown Jewel".
const subsidiaries: Subsidiary[] = [
  {
    num: "01",
    logo: "/logos/nakala_mine.svg",
    category: "Precious Metals & Mining",
    name: "Nakala Gold Mine",
    desc: "Sustainable gold extraction with community development programs and environmental stewardship initiatives.",
    highlight: "Core asset",
    highlightMeta: "Primary revenue engine",
    location: "Ouagadougou",
    country: "BF",
  },
  {
    num: "02",
    logo: "/logos/kgl_transports.svg",
    category: "Logistics & Energy",
    name: "Kangala Transport",
    desc: "Fuel distribution and petroleum logistics across West Africa with emergency supply capabilities.",
    highlight: "400+ tankers",
    highlightMeta: "Regional energy backbone",
    location: "Ouagadougou · Dubai",
    country: "BF",
  },
  {
    num: "03",
    logo: "/logos/kgl_or.svg",
    category: "Precious Metals & Mining",
    name: "KGL OR",
    desc: "Ethical gold trading with modern assaying, transparent pricing, and fully traceable supply chains.",
    highlight: "Full traceability",
    highlightMeta: "Certified ethical sourcing",
    location: "Ouagadougou",
    country: "BF",
  },
  {
    num: "04",
    logo: "/logos/naigaiba_auto.svg",
    category: "Automotive & Manufacturing",
    name: "Naigaiba Auto Industrie",
    desc: "Custom truck manufacturing and industrial vehicle solutions engineered for mining and harsh terrain.",
    highlight: "In-house engineering",
    highlightMeta: "Maximum uptime",
    location: "Ouagadougou",
    country: "BF",
  },
  {
    num: "05",
    logo: "/logos/emirates_diamonds.svg",
    category: "Precious Metals & Trading",
    name: "Emirates Diamonds & Gold",
    desc: "Diamond and gold bullion trading with certified valuation, secure vaulting, and advisory services.",
    highlight: "3 shipments/month",
    highlightMeta: "Kimberley certified",
    location: "Dubai",
    country: "AE",
  },
  {
    num: "06",
    logo: "/logos/kangala_air_cargo.svg",
    category: "Logistics & Air Freight",
    name: "Kangala Express Air Cargo",
    desc: "International air freight with charter flights, secure handling, and high-value cargo transport.",
    highlight: "Dubai logistics hub",
    highlightMeta: "Precious cargo specialist",
    location: "Dubai",
    country: "AE",
  },
  {
    num: "07",
    logo: "/logos/kgl_carriere.svg",
    category: "Quarry & Aggregates",
    name: "KGL Carrière",
    desc: "Sand, gravel, and aggregate supply for construction and mining infrastructure across West Africa.",
    highlight: "Captive supply",
    highlightMeta: "Construction & mining materials",
    location: "Bobo-Dioulasso",
    country: "BF",
  },
  {
    num: "08",
    logo: "/logos/kgl_industries.svg",
    category: "Industries & Mining",
    name: "KGL Industries & Mining Projects",
    desc: "Industrial engineering and mining project execution, from feasibility to full-scale operations.",
    highlight: "Full-cycle delivery",
    highlightMeta: "Engineering to production",
    location: "Bobo-Dioulasso",
    country: "BF",
  },
];

// ═══════════════════════════════════════════════════════════════════
// Orbital geometry — 8 nodes at 45° intervals, starting at 12 o'clock.
// ═══════════════════════════════════════════════════════════════════

const CONTAINER_SIZE = 720;
const CENTER = CONTAINER_SIZE / 2;
const ORBITAL_RADIUS = 260;
const NODE_SIZE = 120;
const HUB_SIZE = 180;

const nodePositions = subsidiaries.map((_, i) => {
  const angleDeg = -90 + i * (360 / subsidiaries.length); // 01 at top, clockwise
  const angleRad = (angleDeg * Math.PI) / 180;
  return {
    x: Math.cos(angleRad) * ORBITAL_RADIUS,
    y: Math.sin(angleRad) * ORBITAL_RADIUS,
    angleDeg,
  };
});

// ═══════════════════════════════════════════════════════════════════
// Hooks
// ═══════════════════════════════════════════════════════════════════

/**
 * Returns true while the window is actively scrolling, falling back to
 * false ~120ms after motion stops. Used to suspend backdrop-filter to
 * keep frame rates above 60fps during scroll.
 */
function useIsScrolling(idleDelay = 120) {
  const [scrolling, setScrolling] = useState(false);
  useEffect(() => {
    let t: number;
    const onScroll = () => {
      setScrolling(true);
      window.clearTimeout(t);
      t = window.setTimeout(() => setScrolling(false), idleDelay);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.clearTimeout(t);
    };
  }, [idleDelay]);
  return scrolling;
}

// ═══════════════════════════════════════════════════════════════════
// Main Component
// ═══════════════════════════════════════════════════════════════════

export default function AssetArchitecture({ lang = "en" }: SceneProps = {}) {
  const t = UI[lang];
  const items = useMemo(() => (lang === "fr" ? SUBS_FR : subsidiaries), [lang]);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [pinnedIndex, setPinnedIndex] = useState<number | null>(null);
  const isScrolling = useIsScrolling();

  // Hover overrides pin for display; when mouse leaves, we fall back to pin.
  const displayIndex = hoverIndex ?? pinnedIndex;

  // Esc to unpin.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPinnedIndex(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const handlePin = useCallback((i: number) => {
    setPinnedIndex((prev) => (prev === i ? null : i));
  }, []);

  return (
    <UiCtx.Provider value={t}>
    <SubsCtx.Provider value={items}>
    <section className="relative min-h-screen w-full bg-sovereign overflow-hidden py-24 md:py-32">
      {/* ─── Ambient gold atmosphere ─── */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 40%, rgba(184,149,74,0.09) 0%, transparent 65%)",
        }}
      />

      {/* ─── HUD grid pattern ─── */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(184,149,74,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(184,149,74,0.6) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 container mx-auto px-4 md:px-8 max-w-7xl">
        <SectionHeader />

        {/* ═══ Desktop orbital system ═══ */}
        <div className="hidden lg:block">
          <OrbitalSystem
            displayIndex={displayIndex}
            pinnedIndex={pinnedIndex}
            onHover={setHoverIndex}
            onPin={handlePin}
            isScrolling={isScrolling}
          />
          <DetailPanel
            index={displayIndex}
            pinned={pinnedIndex !== null}
            isScrolling={isScrolling}
          />
        </div>

        {/* ═══ Mobile / tablet vertical spine ═══ */}
        <div className="lg:hidden">
          <VerticalSpine isScrolling={isScrolling} />
        </div>

        {/* ─── Section footer ─── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mt-16 md:mt-20 text-center"
        >
          <div className="inline-flex items-center gap-3 text-gold/60 font-cinzel tracking-[0.3em] text-[10px] md:text-xs uppercase">
            <span className="w-8 h-px bg-gold/40" />
            {t.footerLine}
            <span className="w-8 h-px bg-gold/40" />
          </div>
        </motion.div>
      </div>
    </section>
    </SubsCtx.Provider>
    </UiCtx.Provider>
  );
}

// ═══════════════════════════════════════════════════════════════════
// Section Header
// ═══════════════════════════════════════════════════════════════════

function SectionHeader() {
  const t = useContext(UiCtx);
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className="text-center mb-14 md:mb-20"
    >
      <div className="font-cinzel text-gold tracking-[0.6em] text-[10px] md:text-xs mb-4 opacity-80">
        {t.supra} · هندسة الأصول
      </div>

      <h2 className="font-cinzel text-ivory tracking-[0.12em] text-2xl md:text-4xl lg:text-5xl font-light leading-tight">
        {t.titleA}
        <br />
        <span className="text-gold-gradient">{t.titleB}</span>
      </h2>

      <div className="mt-4 font-cairo text-gold/75 text-sm md:text-base" dir="rtl">
        {t.subArabic}
      </div>

      <div className="mt-3 font-cinzel text-ivory/45 tracking-[0.3em] text-[10px] md:text-xs uppercase">
        {t.subStats}
      </div>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// Orbital System (desktop)
// ═══════════════════════════════════════════════════════════════════

function OrbitalSystem({
  displayIndex,
  pinnedIndex,
  onHover,
  onPin,
  isScrolling,
}: {
  displayIndex: number | null;
  pinnedIndex: number | null;
  onHover: (i: number | null) => void;
  onPin: (i: number) => void;
  isScrolling: boolean;
}) {
  const items = useSubs();
  return (
    <div
      className="relative mx-auto"
      style={{ width: CONTAINER_SIZE, height: CONTAINER_SIZE }}
      onMouseLeave={() => onHover(null)}
    >
      {/* ── Decorative orbital guide ring ── */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0, scale: 0.92 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.6, ease: "easeOut" }}
        className="absolute rounded-full"
        style={{
          left: CENTER - ORBITAL_RADIUS,
          top: CENTER - ORBITAL_RADIUS,
          width: ORBITAL_RADIUS * 2,
          height: ORBITAL_RADIUS * 2,
          border: "1px dashed rgba(184,149,74,0.12)",
        }}
      />

      {/* ── Inner whisper ring ── */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.6, delay: 0.2 }}
        className="absolute rounded-full"
        style={{
          left: CENTER - 140,
          top: CENTER - 140,
          width: 280,
          height: 280,
          border: "1px solid rgba(184,149,74,0.08)",
        }}
      />

      {/* Neural web SVG (arteries) */}
      <NeuralWeb activeIndex={displayIndex} />

      {/* Hub at center */}
      <Hub activeIndex={displayIndex} pinned={pinnedIndex !== null} />

      {/* 8 orbital nodes */}
      {items.map((s, i) => (
        <OrbitalNode
          key={s.num}
          s={s}
          index={i}
          position={nodePositions[i]}
          isActive={displayIndex === i}
          isPinned={pinnedIndex === i}
          onHover={onHover}
          onPin={onPin}
          isScrolling={isScrolling}
        />
      ))}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// Neural Web — SVG arteries between Hub and Nodes.
// ═══════════════════════════════════════════════════════════════════

function NeuralWeb({ activeIndex }: { activeIndex: number | null }) {
  return (
    <svg
      aria-hidden
      className="absolute inset-0 pointer-events-none"
      width={CONTAINER_SIZE}
      height={CONTAINER_SIZE}
      viewBox={`0 0 ${CONTAINER_SIZE} ${CONTAINER_SIZE}`}
    >
      <defs>
        <linearGradient id="neural-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#B8954A" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#B8954A" stopOpacity="0.18" />
        </linearGradient>
        <linearGradient id="neural-grad-active" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#F5E0A0" stopOpacity="1" />
          <stop offset="100%" stopColor="#D4AF5A" stopOpacity="0.75" />
        </linearGradient>
      </defs>

      {/* Lines from Hub to each node */}
      {nodePositions.map((pos, i) => {
        const x2 = CENTER + pos.x;
        const y2 = CENTER + pos.y;
        const isActive = activeIndex === i;
        return (
          <motion.line
            key={`line-${i}`}
            x1={CENTER}
            y1={CENTER}
            x2={x2}
            y2={y2}
            stroke={isActive ? "url(#neural-grad-active)" : "url(#neural-grad)"}
            strokeWidth={isActive ? 1.8 : 1}
            strokeLinecap="round"
            strokeDasharray="4 6"
            className={isActive ? "neural-line--active" : "neural-line"}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{
              duration: 0.8,
              delay: 0.4 + i * 0.06,
              ease: "easeOut",
            }}
          />
        );
      })}

      {/* Tiny hub-side connector nodes */}
      {nodePositions.map((pos, i) => (
        <motion.circle
          key={`node-dot-${i}`}
          cx={CENTER + pos.x * 0.22}
          cy={CENTER + pos.y * 0.22}
          r={1.5}
          fill="#B8954A"
          fillOpacity={activeIndex === i ? 1 : 0.55}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 + i * 0.06, duration: 0.4 }}
        />
      ))}

      {/* Arrival ring at each node position (gold target reticle) */}
      {nodePositions.map((pos, i) => {
        const isActive = activeIndex === i;
        return (
          <motion.circle
            key={`arrival-${i}`}
            cx={CENTER + pos.x * 0.78}
            cy={CENTER + pos.y * 0.78}
            r={2.5}
            fill="none"
            stroke="#B8954A"
            strokeWidth={1}
            strokeOpacity={isActive ? 1 : 0.45}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 + i * 0.06, duration: 0.5 }}
          />
        );
      })}
    </svg>
  );
}

// ═══════════════════════════════════════════════════════════════════
// Hub — central "sun" node with radar readout
// ═══════════════════════════════════════════════════════════════════

function Hub({
  activeIndex,
  pinned,
}: {
  activeIndex: number | null;
  pinned: boolean;
}) {
  const items = useSubs();
  const t = useContext(UiCtx);
  const active = activeIndex !== null ? items[activeIndex] : null;
  const truncatedName =
    active && active.name.length > 20
      ? active.name.slice(0, 18) + "…"
      : active?.name;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      className="absolute"
      style={{
        left: CENTER - HUB_SIZE / 2,
        top: CENTER - HUB_SIZE / 2,
        width: HUB_SIZE,
        height: HUB_SIZE,
      }}
    >
      {/* Breathing halo */}
      <motion.div
        aria-hidden
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(184,149,74,0.22) 0%, transparent 72%)",
        }}
        animate={{ scale: [1, 1.12, 1], opacity: [0.75, 0.45, 0.75] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Hub body — glassmorphic with inner reticle */}
      <div
        className="relative w-full h-full rounded-full flex flex-col items-center justify-center text-center"
        style={{
          background: "rgba(6,16,34,0.55)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          border: "1.5px solid rgba(184,149,74,0.55)",
          boxShadow:
            "0 0 0 1px rgba(10,25,47,0.8), 0 0 40px rgba(184,149,74,0.25), inset 0 0 30px rgba(184,149,74,0.08)",
        }}
      >
        {/* Logo */}
        <div className="relative w-12 h-12 mb-1">
          <Image
            src="/logos/kangala_holding_gold.svg"
            alt="Kangala Holding Group"
            fill
            sizes="48px"
            className="object-contain"
          />
        </div>

        {/* Readout — default vs active */}
        <AnimatePresence mode="wait">
          {active ? (
            <motion.div
              key={active.num}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.25 }}
              className="px-2"
            >
              <div className="font-cinzel text-gold/70 text-[9px] tracking-[0.3em]">
                {t.nodeWord} {active.num}
              </div>
              <div
                className="mt-0.5 font-cinzel text-ivory text-[10px] tracking-[0.08em] leading-tight"
                style={{ maxWidth: 120 }}
              >
                {truncatedName}
              </div>
              {pinned && (
                <div className="mt-1 font-cinzel text-gold text-[7px] tracking-[0.35em] flex items-center justify-center gap-1">
                  <span className="inline-block w-1 h-1 rounded-full bg-gold" />
                  {t.defaultCategory === "Kangala Holding Group" && t.preview === "Aperçu" ? "ÉPINGLÉ" : "PINNED"}
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="default"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.25 }}
              className="px-2"
            >
              <div className="font-cinzel text-gold/85 text-[10px] tracking-[0.28em] uppercase">
                Kangala
              </div>
              <div className="font-cinzel text-ivory/70 text-[8px] tracking-[0.25em] uppercase mt-0.5">
                Holding Group
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Inner reticle corners */}
        <span className="absolute top-2.5 left-2.5 w-2 h-2 border-t border-l border-gold/55" />
        <span className="absolute top-2.5 right-2.5 w-2 h-2 border-t border-r border-gold/55" />
        <span className="absolute bottom-2.5 left-2.5 w-2 h-2 border-b border-l border-gold/55" />
        <span className="absolute bottom-2.5 right-2.5 w-2 h-2 border-b border-r border-gold/55" />
      </div>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// Orbital Node — a single glass planet
// ═══════════════════════════════════════════════════════════════════

function OrbitalNode({
  s,
  index,
  position,
  isActive,
  isPinned,
  onHover,
  onPin,
  isScrolling,
}: {
  s: Subsidiary;
  index: number;
  position: { x: number; y: number };
  isActive: boolean;
  isPinned: boolean;
  onHover: (i: number | null) => void;
  onPin: (i: number) => void;
  isScrolling: boolean;
}) {
  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, scale: 0.4 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.7,
        delay: 0.9 + index * 0.07,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="absolute cursor-pointer focus:outline-none"
      style={{
        left: CENTER + position.x - NODE_SIZE / 2,
        top: CENTER + position.y - NODE_SIZE / 2,
        width: NODE_SIZE,
        height: NODE_SIZE,
      }}
      onMouseEnter={() => onHover(index)}
      onFocus={() => onHover(index)}
      onClick={() => onPin(index)}
      aria-label={`${s.name} — node ${s.num}. Click to pin details. Press Escape to unpin.`}
      aria-pressed={isPinned}
    >
      {/* Active halo */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            aria-hidden
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1.35 }}
            exit={{ opacity: 0, scale: 1.55 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="absolute inset-0 rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(212,181,114,0.38) 0%, transparent 70%)",
            }}
          />
        )}
      </AnimatePresence>

      {/* Pinned outer ring */}
      {isPinned && (
        <motion.div
          aria-hidden
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1.14, opacity: 1 }}
          className="absolute inset-0 rounded-full"
          style={{ border: "1px dashed rgba(212,181,114,0.7)" }}
          transition={{ duration: 0.3 }}
        />
      )}

      {/* Glass body */}
      <motion.div
        className="relative rounded-full w-full h-full flex items-center justify-center"
        animate={{ scale: isActive ? 1.08 : 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        style={{
          background: "rgba(6,16,34,0.4)",
          backdropFilter: isScrolling ? "none" : "blur(12px)",
          WebkitBackdropFilter: isScrolling ? "none" : "blur(12px)",
          border: isActive
            ? "1.5px solid rgba(212,181,114,0.95)"
            : "1.5px solid rgba(212,175,90,0.28)",
          boxShadow: isActive
            ? "0 0 0 1px rgba(10,25,47,0.6), 0 0 30px rgba(184,149,74,0.5), inset 0 0 20px rgba(184,149,74,0.12)"
            : "0 0 0 1px rgba(10,25,47,0.6), 0 4px 20px rgba(0,0,0,0.3)",
          willChange: isScrolling ? "auto" : "backdrop-filter",
          transition: "border-color 0.3s ease, box-shadow 0.3s ease",
        }}
      >
        {/* Ivory disc for logo legibility */}
        <div
          aria-hidden
          className="absolute rounded-full"
          style={{
            inset: 10,
            background:
              "radial-gradient(circle at 35% 30%, #FBF8F2 0%, #F5F0E8 55%, #E9E0CE 100%)",
          }}
        />

        {/* Logo */}
        <div className="absolute" style={{ inset: 22 }}>
          <div className="relative w-full h-full">
            <Image
              src={s.logo}
              alt={s.name}
              fill
              sizes="80px"
              className="object-contain"
            />
          </div>
        </div>

        {/* Number badge — bottom-right */}
        <div
          className="absolute rounded-full flex items-center justify-center font-cinzel text-gold text-[10px] tracking-wider bg-sovereign-deep"
          style={{
            width: 24,
            height: 24,
            right: -4,
            bottom: -4,
            border: "1px solid rgba(184,149,74,0.6)",
          }}
        >
          {s.num}
        </div>
      </motion.div>
    </motion.button>
  );
}

// ═══════════════════════════════════════════════════════════════════
// Fixed Detail Panel — glass readout below the orbit (desktop only)
// ═══════════════════════════════════════════════════════════════════

function DetailPanel({
  index,
  pinned,
  isScrolling,
}: {
  index: number | null;
  pinned: boolean;
  isScrolling: boolean;
}) {
  const items = useSubs();
  const t = useContext(UiCtx);
  const active = index !== null ? items[index] : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.9, delay: 1.2 }}
      className="relative mx-auto mt-14 max-w-4xl"
    >
      <div
        className="relative overflow-hidden"
        style={{
          background: "rgba(6,16,34,0.45)",
          backdropFilter: isScrolling ? "none" : "blur(16px)",
          WebkitBackdropFilter: isScrolling ? "none" : "blur(16px)",
          border: "1px solid rgba(212,175,90,0.25)",
          boxShadow:
            "0 0 0 1px rgba(10,25,47,0.5), 0 8px 40px rgba(0,0,0,0.4)",
          willChange: isScrolling ? "auto" : "backdrop-filter",
        }}
      >
        {/* HUD corner brackets */}
        <span className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-gold/70 pointer-events-none" />
        <span className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-gold/70 pointer-events-none" />
        <span className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-gold/70 pointer-events-none" />
        <span className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-gold/70 pointer-events-none" />

        {/* Top readout bar */}
        <div className="flex items-center justify-between px-6 py-2 border-b border-gold/15 bg-sovereign-deep/30">
          <div className="font-cinzel text-gold/60 tracking-[0.35em] text-[9px] uppercase">
            {t.readoutPanel}
          </div>
          <div className="flex items-center gap-2 font-cinzel text-gold/80 tracking-[0.3em] text-[9px] uppercase">
            {pinned ? (
              <>
                <span className="relative flex w-1.5 h-1.5 rounded-full bg-gold">
                  <span className="absolute inset-0 rounded-full bg-gold/50 animate-ping" />
                </span>
                {t.pinnedText}
              </>
            ) : active ? (
              <>
                <span className="w-1.5 h-1.5 rounded-full bg-gold/60" />
                {t.preview}
              </>
            ) : (
              <>
                <span className="w-1.5 h-1.5 rounded-full bg-ivory/30" />
                {t.standby}
              </>
            )}
          </div>
        </div>

        {/* Content — swap between default + active with AnimatePresence */}
        <div className="p-6 md:p-8 min-h-[220px]">
          <AnimatePresence mode="wait">
            {active ? (
              <SubsidiaryDetail key={active.num} s={active} />
            ) : (
              <DefaultDetail key="default" />
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Default panel content (Group summary) ───
function DefaultDetail() {
  const t = useContext(UiCtx);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="grid grid-cols-[auto_1fr] gap-6 md:gap-8 items-center"
    >
      <div
        className="relative w-24 h-24 md:w-28 md:h-28 rounded-full flex items-center justify-center"
        style={{
          background:
            "radial-gradient(circle at 35% 30%, #FBF8F2 0%, #F5F0E8 55%, #E9E0CE 100%)",
          border: "1.5px solid rgba(184,149,74,0.5)",
        }}
      >
        <div className="relative w-16 h-16 md:w-20 md:h-20">
          <Image
            src="/logos/kangala_holding_gold.svg"
            alt="Kangala Holding Group"
            fill
            sizes="80px"
            className="object-contain"
          />
        </div>
      </div>

      <div>
        <div className="font-cinzel text-gold tracking-[0.3em] text-[11px] uppercase mb-1">
          {t.defaultCategory}
        </div>
        <h3 className="font-cinzel text-ivory text-xl md:text-2xl font-light mb-3">
          {t.defaultTitle}
        </h3>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <StatPill value="14" label={t.defaultSubsidiariesLabel} />
          <span className="w-px h-6 bg-gold/20" />
          <StatPill value="8" label={t.defaultBackboneLabel} highlight />
          <span className="w-px h-6 bg-gold/20" />
          <StatPill value="3" label={t.defaultCountriesLabel} />
        </div>

        <p className="mt-4 font-cairo text-ivory/45 text-xs md:text-sm leading-relaxed">
          {t.defaultHint}
        </p>
      </div>
    </motion.div>
  );
}

function StatPill({
  value,
  label,
  highlight = false,
}: {
  value: string;
  label: string;
  highlight?: boolean;
}) {
  return (
    <div className="inline-flex items-baseline gap-2">
      <span
        className={`font-cinzel text-2xl md:text-3xl font-light ${
          highlight ? "text-gold-gradient" : "text-ivory"
        }`}
      >
        {value}
      </span>
      <span className="font-cinzel text-ivory/40 tracking-[0.2em] text-[9px] uppercase">
        {label}
      </span>
    </div>
  );
}

// ─── Active subsidiary panel content ───
function SubsidiaryDetail({ s }: { s: Subsidiary }) {
  const t = useContext(UiCtx);
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.3 }}
      className="grid grid-cols-[auto_1fr] gap-6 md:gap-8 items-start"
    >
      {/* Ivory logo disc */}
      <div
        className="relative w-24 h-24 md:w-28 md:h-28 rounded-full flex items-center justify-center flex-shrink-0"
        style={{
          background:
            "radial-gradient(circle at 35% 30%, #FBF8F2 0%, #F5F0E8 55%, #E9E0CE 100%)",
          border: "1.5px solid rgba(184,149,74,0.55)",
          boxShadow: "0 4px 20px rgba(184,149,74,0.15)",
        }}
      >
        <div className="relative w-16 h-16 md:w-20 md:h-20">
          <Image
            src={s.logo}
            alt={s.name}
            fill
            sizes="80px"
            className="object-contain"
          />
        </div>
      </div>

      {/* Data */}
      <div className="min-w-0">
        <div className="flex items-center justify-between gap-3 mb-2 flex-wrap">
          <span className="inline-block px-2 py-0.5 border border-gold/35 bg-gold/[0.05] font-cinzel text-gold/80 tracking-[0.22em] text-[9px] uppercase">
            {s.category}
          </span>
          <span className="flex items-center gap-3 font-cinzel text-[10px] tracking-[0.25em] text-ivory/50">
            <span>{t.nodeWord} {s.num}</span>
            <span className="w-px h-3 bg-gold/30" />
            <span>{s.country}</span>
          </span>
        </div>

        <h3 className="font-cinzel text-ivory text-xl md:text-2xl font-light mb-3 leading-tight">
          {s.name}
        </h3>

        <p className="font-cairo text-ivory/65 text-sm leading-relaxed mb-4">
          {s.desc}
        </p>

        <div className="flex items-center justify-between pt-3 border-t border-gold/10 flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <span className="relative flex w-1.5 h-1.5 rounded-full bg-gold">
              <span className="absolute inset-0 rounded-full bg-gold/50 animate-ping" />
            </span>
            <span className="font-cinzel text-gold tracking-[0.2em] text-[11px]">
              {s.highlight}
            </span>
            <span className="font-cinzel text-ivory/35 tracking-[0.15em] text-[9px] ml-1">
              — {s.highlightMeta}
            </span>
          </div>
          <div className="flex items-center gap-1.5 font-cairo text-ivory/45 text-[10px]">
            <svg
              width="10"
              height="10"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-gold/60 flex-shrink-0"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            {s.location}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// Mobile / Tablet Vertical Spine
// ═══════════════════════════════════════════════════════════════════

function VerticalSpine({ isScrolling }: { isScrolling: boolean }) {
  const items = useSubs();
  const t = useContext(UiCtx);
  return (
    <div className="relative max-w-xl mx-auto">
      {/* Hub at top */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7 }}
        className="flex justify-center relative"
      >
        <div
          className="relative w-28 h-28 rounded-full flex items-center justify-center"
          style={{
            background: "rgba(6,16,34,0.55)",
            backdropFilter: isScrolling ? "none" : "blur(14px)",
            WebkitBackdropFilter: isScrolling ? "none" : "blur(14px)",
            border: "1.5px solid rgba(184,149,74,0.6)",
            boxShadow: "0 0 30px rgba(184,149,74,0.2)",
          }}
        >
          <div className="relative w-14 h-14">
            <Image
              src="/logos/kangala_holding_gold.svg"
              alt="Kangala Holding Group"
              fill
              sizes="56px"
              className="object-contain"
            />
          </div>
          <span className="absolute top-2 left-2 w-1.5 h-1.5 border-t border-l border-gold/60" />
          <span className="absolute top-2 right-2 w-1.5 h-1.5 border-t border-r border-gold/60" />
          <span className="absolute bottom-2 left-2 w-1.5 h-1.5 border-b border-l border-gold/60" />
          <span className="absolute bottom-2 right-2 w-1.5 h-1.5 border-b border-r border-gold/60" />
        </div>
      </motion.div>

      <div className="text-center mt-3 mb-8 font-cinzel text-gold/80 tracking-[0.3em] text-[10px] uppercase">
        {t.defaultCategory}
      </div>

      {/* Connecting vertical line + nodes */}
      <div className="relative pl-14 md:pl-16">
        {/* Spine */}
        <div
          className="absolute top-0 bottom-0 w-px"
          style={{
            left: 26,
            background:
              "linear-gradient(to bottom, rgba(184,149,74,0.5) 0%, rgba(184,149,74,0.3) 60%, rgba(184,149,74,0.08) 100%)",
          }}
        />

        <div className="space-y-5">
          {items.map((s, i) => (
            <SpineNode key={s.num} s={s} index={i} isScrolling={isScrolling} />
          ))}
        </div>
      </div>
    </div>
  );
}

function SpineNode({
  s,
  index,
  isScrolling,
}: {
  s: Subsidiary;
  index: number;
  isScrolling: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: index * 0.06 }}
      className="relative"
    >
      {/* Horizontal branch from spine to node */}
      <div
        className="absolute h-px"
        style={{
          left: -30,
          top: 24,
          width: 22,
          background:
            "linear-gradient(to right, rgba(184,149,74,0.5), rgba(184,149,74,0.2))",
        }}
      />

      {/* Node circle — glass */}
      <div
        className="absolute rounded-full flex items-center justify-center"
        style={{
          left: -53,
          top: 0,
          width: 48,
          height: 48,
          background: "rgba(6,16,34,0.4)",
          backdropFilter: isScrolling ? "none" : "blur(10px)",
          WebkitBackdropFilter: isScrolling ? "none" : "blur(10px)",
          border: "1.5px solid rgba(212,175,90,0.4)",
          boxShadow: "0 0 0 1px rgba(10,25,47,0.6)",
        }}
      >
        <div
          className="absolute rounded-full"
          style={{
            inset: 4,
            background:
              "radial-gradient(circle at 35% 30%, #FBF8F2 0%, #E9E0CE 100%)",
          }}
        />
        <div className="absolute" style={{ inset: 8 }}>
          <div className="relative w-full h-full">
            <Image
              src={s.logo}
              alt={s.name}
              fill
              sizes="32px"
              className="object-contain"
            />
          </div>
        </div>
        {/* Number micro-badge */}
        <span
          className="absolute -bottom-1 -right-1 font-cinzel text-gold text-[7px] tracking-[0.15em] px-1 py-[1px] bg-sovereign-deep"
          style={{ border: "1px solid rgba(184,149,74,0.5)" }}
        >
          {s.num}
        </span>
      </div>

      {/* Inline detail card — glass */}
      <div
        className="relative p-4"
        style={{
          background: "rgba(6,16,34,0.42)",
          backdropFilter: isScrolling ? "none" : "blur(10px)",
          WebkitBackdropFilter: isScrolling ? "none" : "blur(10px)",
          border: "1px solid rgba(212,175,90,0.22)",
          boxShadow: "0 0 0 1px rgba(10,25,47,0.5)",
        }}
      >
        {/* Corner brackets */}
        <span className="absolute top-0 left-0 w-2.5 h-2.5 border-t border-l border-gold/50" />
        <span className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-gold/50" />
        <span className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b border-l border-gold/50" />
        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b border-r border-gold/50" />

        <div className="flex items-center justify-between mb-1.5">
          <span className="font-cinzel text-gold/75 tracking-[0.25em] text-[9px] uppercase">
            {s.category}
          </span>
          <span className="font-cinzel text-gold/80 tracking-[0.2em] text-[9px] px-1.5 py-0.5 border border-gold/35 bg-gold/[0.04]">
            {s.country}
          </span>
        </div>

        <h3 className="font-cinzel text-ivory text-[15px] font-normal leading-snug mb-2 tracking-wide">
          {s.name}
        </h3>

        <p className="font-cairo text-ivory/60 text-[11px] leading-relaxed mb-3">
          {s.desc}
        </p>

        <div className="flex items-center justify-between pt-2 border-t border-gold/10 flex-wrap gap-2">
          <div className="flex items-center gap-1.5">
            <span className="relative flex w-1 h-1 rounded-full bg-gold">
              <span className="absolute inset-0 rounded-full bg-gold/50 animate-ping" />
            </span>
            <span className="font-cinzel text-gold tracking-[0.18em] text-[10px]">
              {s.highlight}
            </span>
          </div>
          <div className="flex items-center gap-1 font-cairo text-ivory/40 text-[9px]">
            <svg
              width="8"
              height="8"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-gold/55 flex-shrink-0"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            {s.location}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
