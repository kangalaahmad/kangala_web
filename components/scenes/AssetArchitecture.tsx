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
  useScroll,
  useMotionValueEvent,
  useInView,
} from "framer-motion";
import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import type { FullDict, SceneProps } from "@/lib/i18n";
import { EASE } from "@/lib/easing";


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

const UI: FullDict<UiLabels> = {
  en: {
    supra: "SOVEREIGN WAR ROOM",
    titleA: "ASSET",
    titleB: "ARCHITECTURE",
    subArabic: "",
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
    subArabic: "",
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
  ar: {
    supra: "غرفة القيادة السيادية",
    titleA: "هيكلة",
    titleB: "الأصول السيادية",
    subArabic: "",
    subStats: "14 شركة تابعة · 8 محاور تشغيلية · 3 دول",
    footerLine: "تكامل رأسي · من المنجم إلى الميناء",
    readoutPanel: "لوحة القراءة",
    pinnedText: "مثبّت · اضغط Esc",
    preview: "معاينة",
    standby: "استعداد",
    defaultCategory: "مجموعة كانغالا القابضة",
    defaultTitle: "الأذرع التشغيلية خلف الرؤية",
    defaultSubsidiariesLabel: "شركات تابعة",
    defaultBackboneLabel: "عمود فقري",
    defaultCountriesLabel: "دول",
    defaultHint: "مرّر المؤشر فوق أي عقدة للمعاينة. انقر لتثبيت التفاصيل للقراءة المطوّلة.",
    nodeWord: "عقدة",
  },
};

const UiCtx = createContext<UiLabels>(UI.en);
const SubsCtx = createContext<Subsidiary[] | null>(null);
function useSubs(): Subsidiary[] {
  const v = useContext(SubsCtx);
  return v ?? subsidiaries;
}

const SUBS_AR: Subsidiary[] = [
  { num: "01", logo: "/logos/nakala_mine.svg", category: "المعادن الثمينة والتعدين", name: "منجم ناكالا للذهب", desc: "استخراج مستدام للذهب مع برامج تنمية مجتمعية ومبادرات للإشراف البيئي.", highlight: "الأصل الجوهري", highlightMeta: "محرّك الإيرادات الرئيسي", location: "Ouagadougou", country: "BF" },
  { num: "02", logo: "/logos/kgl_transports.svg", category: "اللوجستيات والطاقة", name: "كانغالا للنقل", desc: "توزيع الوقود واللوجستيات البترولية عبر غرب أفريقيا مع قدرات إمداد طارئ.", highlight: "+400 صهريج", highlightMeta: "العمود الفقري الإقليمي للطاقة", location: "Ouagadougou · Dubai", country: "BF" },
  { num: "03", logo: "/logos/kgl_or.svg", category: "المعادن الثمينة والتعدين", name: "KGL OR", desc: "تجارة ذهب أخلاقية مع فحص حديث، وتسعير شفّاف، وسلاسل إمداد قابلة للتتبع بالكامل.", highlight: "تتبّع كامل", highlightMeta: "مصادر أخلاقية معتمدة", location: "Ouagadougou", country: "BF" },
  { num: "04", logo: "/logos/naigaiba_auto.svg", category: "السيارات والتصنيع", name: "نايغايبا للصناعات", desc: "تصنيع شاحنات مخصّصة وحلول مركبات صناعية مصمّمة للتعدين والتضاريس الوعرة.", highlight: "هندسة داخلية", highlightMeta: "أقصى وقت تشغيل", location: "Ouagadougou", country: "BF" },
  { num: "05", logo: "/logos/emirates_diamonds.svg", category: "المعادن الثمينة والتجارة", name: "الإمارات للألماس والذهب", desc: "تجارة سبائك الذهب والألماس مع تقييم معتمد، وخزائن آمنة، وخدمات استشارية.", highlight: "3 شحنات/شهر", highlightMeta: "معتمدة بشهادة كيمبرلي", location: "Dubai", country: "AE" },
  { num: "06", logo: "/logos/kangala_air_cargo.svg", category: "اللوجستيات والشحن الجوي", name: "كانغالا إكسبرس للشحن الجوي", desc: "شحن جوي دولي مع رحلات مستأجرة، ومناولة آمنة، ونقل بضائع عالية القيمة.", highlight: "مركز دبي اللوجستي", highlightMeta: "متخصّصون في الشحنات الثمينة", location: "Dubai", country: "AE" },
  { num: "07", logo: "/logos/kgl_carriere.svg", category: "المحاجر والركام", name: "KGL Carrière", desc: "توريد الرمل والحصى والركام للبناء والبنية التحتية للتعدين في غرب أفريقيا.", highlight: "إمداد محلي", highlightMeta: "مواد بناء وتعدين", location: "Bobo-Dioulasso", country: "BF" },
  { num: "08", logo: "/logos/kgl_industries.svg", category: "الصناعات والتعدين", name: "KGL للصناعات ومشاريع التعدين", desc: "الهندسة الصناعية وتنفيذ مشاريع التعدين، من دراسة الجدوى حتى التشغيل الكامل.", highlight: "تسليم دورة كاملة", highlightMeta: "من الهندسة إلى الإنتاج", location: "Bobo-Dioulasso", country: "BF" },
];

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
// Arc Geometry — left-side semicircle, pivot off-screen left
// ═══════════════════════════════════════════════════════════════════

const N = 8;
const CINEMATIC = EASE.DISSOLVE;
const ARC_R = 280;
const ARC_CENTER_X = -90;
const NODE_R = 52;

const ARC_POSITIONS = Array.from({ length: N }, (_, i) => {
  const deg = -65 + i * (130 / (N - 1));
  const rad = (deg * Math.PI) / 180;
  return { x: ARC_CENTER_X + ARC_R * Math.cos(rad), y: ARC_R * Math.sin(rad) };
});

// ═══════════════════════════════════════════════════════════════════
// Main Component
// ═══════════════════════════════════════════════════════════════════

export default function AssetArchitecture({ lang = "en" }: SceneProps = {}) {
  const resolved = lang ?? "en";
  const t = UI[resolved];
  const items = useMemo(
    () =>
      resolved === "ar" ? SUBS_AR : resolved === "fr" ? SUBS_FR : subsidiaries,
    [resolved],
  );
  return (
    <UiCtx.Provider value={t}>
      <SubsCtx.Provider value={items}>
        <div className="hidden lg:block">
          <DesktopDial items={items} t={t} />
        </div>
        <div className="lg:hidden">
          <MobilePipeline items={items} t={t} />
        </div>
      </SubsCtx.Provider>
    </UiCtx.Provider>
  );
}

// ═══════════════════════════════════════════════════════════════════
// Desktop: The Sovereign Rotary Dial
// ═══════════════════════════════════════════════════════════════════

function DesktopDial({ items, t }: { items: Subsidiary[]; t: UiLabels }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [activeIdx, setActiveIdx] = useState(0);
  const [climax, setClimax] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActiveIdx(Math.min(N - 1, Math.floor(v * N)));
    setClimax(v >= 0.9);
  });

  return (
    <div ref={ref} className="relative h-[480vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#061022] flex flex-col">
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(212,175,90,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,90,0.6) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 48% 52%, rgba(212,175,90,0.07) 0%, transparent 65%)",
          }}
        />
        <div className="relative z-10 flex-shrink-0 text-center pt-10 pb-3">
          <div className="font-cinzel text-[#D4AF5A] tracking-[0.55em] text-[10px] opacity-80 mb-3">
            {t.supra}
          </div>
          <h2 className="font-cinzel text-[#DAD3C6] tracking-[0.12em] text-3xl lg:text-4xl xl:text-5xl font-light">
            {t.titleA}{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #F5E0A0 0%, #D4AF5A 50%, #B8954A 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {t.titleB}
            </span>
          </h2>
          <div className="mt-2 font-cinzel text-[#DAD3C6]/40 tracking-[0.3em] text-[11px] uppercase">
            {t.subStats}
          </div>
        </div>
        <div className="absolute bottom-7 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2.5">
          {Array.from({ length: N }, (_, i) => (
            <motion.div
              key={i}
              className="rounded-full"
              animate={{
                width: i === activeIdx ? 22 : 6,
                height: 6,
                backgroundColor: i === activeIdx ? "#D4AF5A" : "rgba(212,175,90,0.22)",
              }}
              transition={{ duration: 0.4, ease: EASE.SNAP }}
            />
          ))}
        </div>
        <div className="relative z-10 flex-1 flex overflow-hidden">
          <AnimatePresence mode="wait">
            {!climax ? (
              <motion.div
                key="arc-phase"
                className="flex w-full h-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7 }}
              >
                <div className="relative w-[42%] h-full">
                  <ArcWheel items={items} activeIdx={activeIdx} />
                </div>
                <div className="w-px self-stretch my-10 bg-gradient-to-b from-transparent via-[#D4AF5A]/20 to-transparent" />
                <div className="flex-1 h-full flex items-center justify-center px-8 xl:px-14">
                  <DossierHUD item={items[activeIdx]} t={t} />
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="climax"
                className="w-full h-full flex flex-col items-center justify-center"
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.1, ease: EASE.VAULT }}
              >
                <ClimaticOrbit items={items} t={t} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function ArcWheel({ items, activeIdx }: { items: Subsidiary[]; activeIdx: number }) {
  return (
    <div className="absolute inset-0 flex items-center overflow-hidden">
      {items.map((s, i) => {
        const pos = ARC_POSITIONS[i];
        const dist = Math.abs(i - activeIdx);
        const isActive = i === activeIdx;
        return (
          <motion.div
            key={s.num}
            className="absolute"
            style={{
              left: pos.x - NODE_R,
              top: "50%",
              marginTop: -NODE_R,
              width: NODE_R * 2,
              height: NODE_R * 2,
            }}
            animate={{
              y: pos.y,
              scale: isActive ? 1.25 : Math.max(0.6, 1 - dist * 0.12),
              opacity: isActive ? 1 : Math.max(0.35, 1 - dist * 0.18),
              x: isActive ? 20 : 0,
            }}
            transition={{ duration: 0.65, ease: EASE.SNAP }}
          >
            <ArcNode s={s} isActive={isActive} />
          </motion.div>
        );
      })}
    </div>
  );
}

function ArcNode({
  s,
  isActive,
  size = NODE_R * 2,
}: {
  s: Subsidiary;
  isActive: boolean;
  size?: number;
}) {
  return (
    <div
      className="relative rounded-full flex items-center justify-center"
      style={{
        width: size,
        height: size,
        background: "rgba(6,16,34,0.45)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        border: isActive
          ? "1.5px solid rgba(212,175,90,0.9)"
          : "1.5px solid rgba(212,175,90,0.25)",
        boxShadow: isActive
          ? "0 0 0 1px rgba(10,25,47,0.6), 0 0 28px rgba(212,175,90,0.5), inset 0 0 18px rgba(212,175,90,0.1)"
          : "0 0 0 1px rgba(10,25,47,0.6)",
      }}
    >
      {isActive && (
        <motion.div
          aria-hidden
          className="absolute rounded-full inset-0"
          animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0.15, 0.6] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          style={{
            background:
              "radial-gradient(circle, rgba(212,175,90,0.35) 0%, transparent 70%)",
          }}
        />
      )}
      <div
        className="absolute rounded-full"
        style={{
          inset: 10,
          background: "radial-gradient(circle at 35% 30%, #FBF8F2 0%, #E9E0CE 100%)",
        }}
      />
      <div className="absolute" style={{ inset: Math.round(size * 0.2) }}>
        <div className="relative w-full h-full">
          <Image
            src={s.logo}
            alt={s.name}
            fill
            sizes={`${size}px`}
            className="object-contain"
          />
        </div>
      </div>
      <div
        className="absolute -bottom-1 -right-1 rounded-full flex items-center justify-center font-cinzel text-[#D4AF5A] text-[9px] bg-[#061022]"
        style={{ width: 24, height: 24, border: "1px solid rgba(212,175,90,0.5)" }}
      >
        {s.num}
      </div>
    </div>
  );
}

function DossierHUD({ item, t }: { item: Subsidiary; t: UiLabels }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={item.num}
        className="relative w-full max-w-lg"
        initial={{ opacity: 0, x: 36 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -24 }}
        transition={{ duration: 0.55, ease: EASE.SPRING }}
        style={{
          background: "rgba(6,16,34,0.55)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(212,175,90,0.2)",
          boxShadow: "0 0 0 1px rgba(10,25,47,0.5), 0 8px 60px rgba(0,0,0,0.5)",
        }}
      >
        <div className="flex items-center justify-between px-6 py-2.5 border-b border-[#D4AF5A]/15">
          <span className="font-cinzel text-[#D4AF5A]/55 tracking-[0.4em] text-[11px] uppercase">
            {t.readoutPanel}
          </span>
          <span className="flex items-center gap-2 font-cinzel text-[#D4AF5A] text-[11px] tracking-[0.3em]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF5A] flex-shrink-0" />
            {item.num} · {t.preview}
          </span>
        </div>
        <div className="p-6 xl:p-8">
          <div className="inline-block px-2.5 py-1 border border-[#D4AF5A]/30 bg-[#D4AF5A]/[0.06] font-cinzel text-[#D4AF5A]/75 tracking-[0.22em] text-[11px] uppercase mb-5">
            {item.category}
          </div>
          <div className="flex items-center gap-5 mb-5">
            <div
              className="relative w-16 h-16 rounded-full flex-shrink-0"
              style={{
                background: "radial-gradient(circle at 35% 30%, #FBF8F2 0%, #E9E0CE 100%)",
                border: "1.5px solid rgba(212,175,90,0.5)",
                boxShadow: "0 4px 20px rgba(212,175,90,0.15)",
              }}
            >
              <div className="absolute inset-3">
                <div className="relative w-full h-full">
                  <Image
                    src={item.logo}
                    alt={item.name}
                    fill
                    sizes="40px"
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
            <h3 className="font-cinzel text-[#DAD3C6] text-xl xl:text-2xl font-light leading-tight">
              {item.name}
            </h3>
          </div>
          <p className="font-inter text-[#DAD3C6]/60 text-sm leading-relaxed mb-6">
            {item.desc}
          </p>
          <div className="flex items-center justify-between pt-4 border-t border-[#D4AF5A]/10 flex-wrap gap-3">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF5A] flex-shrink-0" />
              <span className="font-cinzel text-[#D4AF5A] tracking-[0.2em] text-[11px]">
                {item.highlight}
              </span>
              <span className="font-cinzel text-[#DAD3C6]/35 tracking-[0.15em] text-[11px]">
                — {item.highlightMeta}
              </span>
            </div>
            <span className="font-cinzel text-[#DAD3C6]/40 tracking-[0.2em] text-[10px]">
              {item.location} · {item.country}
            </span>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

function ClimaticOrbit({ items, t }: { items: Subsidiary[]; t: UiLabels }) {
  const R = 240;
  const C = R + 70;
  return (
    <div className="text-center">
      <motion.div
        className="mb-6 font-cinzel text-[#D4AF5A]/60 tracking-[0.55em] text-[10px] uppercase"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 0.6, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        {t.footerLine}
      </motion.div>
      <div className="relative mx-auto" style={{ width: C * 2, height: C * 2 }}>
        <motion.div
          className="absolute rounded-full"
          style={{ inset: 70, border: "1px dashed rgba(212,175,90,0.2)" }}
          initial={{ opacity: 0, scale: 0.75 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 1 }}
        />
        <motion.div
          className="absolute rounded-full flex items-center justify-center"
          style={{
            width: 110,
            height: 110,
            left: C - 55,
            top: C - 55,
            background: "rgba(6,16,34,0.72)",
            border: "1.5px solid rgba(212,175,90,0.6)",
            boxShadow: "0 0 40px rgba(212,175,90,0.3)",
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8, ease: EASE.VAULT }}
        >
          <div className="relative w-14 h-14">
            <Image
              src="/logos/kangala_holding_gold.svg"
              alt="Kangala"
              fill
              sizes="56px"
              className="object-contain"
            />
          </div>
        </motion.div>
        {items.map((s, i) => {
          const rad = ((i / N) * 360 - 90) * (Math.PI / 180);
          return (
            <motion.div
              key={s.num}
              className="absolute"
              style={{ left: C + R * Math.cos(rad) - 44, top: C + R * Math.sin(rad) - 44 }}
              initial={{ opacity: 0, scale: 0.2 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + i * 0.09, duration: 0.7, ease: EASE.VAULT }}
            >
              <ArcNode s={s} isActive={false} size={88} />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// Mobile: Magnetic Snap Carousel
// Each company is a full-viewport slide — scroll-snap-stop: always
// forces the user to stop at every card (magnetic behaviour).
// ═══════════════════════════════════════════════════════════════════

// Per-logo scale — zooms SVG artwork to fill capsule, clipped by overflow:hidden
const LOGO_SCALE = [1.7, 1.0, 1.0, 1.0, 2.0, 1.0, 1.0, 1.6] as const;

// ── Pill navigation dots ──────────────────────────────────────────
function MobileNavDots({
  total,
  active,
  onDot,
}: {
  total: number;
  active: number;
  onDot: (i: number) => void;
}) {
  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-[6px] z-10">
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          aria-label={`Go to slide ${i + 1}`}
          onClick={() => onDot(i)}
          style={{
            width: i === active ? 20 : 6,
            height: 6,
            borderRadius: 3,
            background: i === active ? "#D4AF5A" : "rgba(212,175,90,0.25)",
            transition: "width 0.35s ease, background 0.35s ease",
            border: "none",
            padding: 0,
            cursor: "pointer",
            flexShrink: 0,
          }}
        />
      ))}
    </div>
  );
}

// ── Hub intro slide ───────────────────────────────────────────────
function MobileHubSlide({
  items,
  t,
  active,
  total,
  onDot,
}: {
  items: Subsidiary[];
  t: UiLabels;
  active: number;
  total: number;
  onDot: (i: number) => void;
}) {
  return (
    <div className="relative h-full flex flex-col items-center justify-center px-6 text-center">
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 40%, rgba(212,175,90,0.1) 0%, transparent 65%)",
        }}
      />
      {/* Hub logo capsule */}
      <motion.div
        className="relative overflow-hidden mb-8"
        style={{
          width: 168,
          height: 100,
          borderRadius: 50,
          background: "radial-gradient(circle at 38% 32%, #FDFAF5 0%, #EDE5D4 100%)",
          border: "2px solid rgba(212,175,90,0.9)",
          boxShadow:
            "0 0 0 5px rgba(212,175,90,0.1), 0 0 44px rgba(212,175,90,0.45), 0 0 88px rgba(212,175,90,0.14)",
        }}
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: CINEMATIC }}
      >
        <div className="absolute inset-4">
          <div className="relative w-full h-full">
            <Image
              src="/logos/kangala_holding_gold.svg"
              alt="Kangala Holding"
              fill
              sizes="168px"
              className="object-contain"
            />
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.7 }}
        className="w-full"
      >
        <div className="font-cinzel text-[#D4AF5A]/60 tracking-[0.45em] text-[10px] mb-3">
          {t.supra}
        </div>
        <h2 className="font-cinzel text-[#DAD3C6] text-2xl font-light tracking-wide">
          {t.titleA}{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #F5E0A0 0%, #D4AF5A 50%, #B8954A 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {t.titleB}
          </span>
        </h2>

        {/* Stats row */}
        <div className="mt-8 flex justify-center gap-10">
          {[
            { n: "14", label: t.defaultSubsidiariesLabel },
            { n: "8",  label: t.defaultBackboneLabel },
            { n: "3",  label: t.defaultCountriesLabel },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-cinzel text-3xl" style={{ color: "#D4AF5A" }}>
                {stat.n}
              </div>
              <div className="font-cinzel text-[#DAD3C6]/40 text-[9px] tracking-[0.25em] uppercase mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Swipe hint */}
      <div className="absolute bottom-20 flex flex-col items-center gap-2 pointer-events-none">
        <span className="font-cinzel text-[#D4AF5A]/30 text-[9px] tracking-[0.5em] uppercase">
          Swipe to Explore
        </span>
        <div className="w-px h-6 bg-gradient-to-b from-[#D4AF5A]/30 to-transparent" />
      </div>

      <MobileNavDots total={total} active={active} onDot={onDot} />
    </div>
  );
}

// ── Single company slide ──────────────────────────────────────────
function MobileCompanySlide({
  s,
  index,
  active,
  total,
  onDot,
}: {
  s: Subsidiary;
  index: number;
  active: number;
  total: number;
  onDot: (i: number) => void;
}) {
  const logoScale = LOGO_SCALE[index] ?? 1;
  return (
    <div className="relative h-full flex flex-col px-5 pt-12 pb-24">
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 30%, rgba(212,175,90,0.07) 0%, transparent 60%)",
        }}
      />

      {/* Counter + country badge */}
      <div className="relative flex items-center justify-between mb-5">
        <span className="font-cinzel text-[#D4AF5A]/35 text-[10px] tracking-[0.4em]">
          {String(index + 1).padStart(2, "0")} / {String(total - 1).padStart(2, "0")}
        </span>
        <span
          className="font-cinzel text-[#D4AF5A]/70 text-[9px] tracking-[0.2em] uppercase px-2.5 py-[3px]"
          style={{
            border: "1px solid rgba(212,175,90,0.28)",
            background: "rgba(212,175,90,0.06)",
          }}
        >
          {s.country}
        </span>
      </div>

      {/* Logo capsule */}
      <div
        className="relative overflow-hidden mb-5"
        style={{
          height: 92,
          borderRadius: 46,
          background: "radial-gradient(circle at 38% 32%, #FDFAF5 0%, #EDE5D4 100%)",
          border: "2px solid rgba(212,175,90,0.85)",
          boxShadow:
            "0 0 0 4px rgba(212,175,90,0.1), 0 0 38px rgba(212,175,90,0.55), 0 0 72px rgba(212,175,90,0.14)",
        }}
      >
        <div
          className="absolute"
          style={{
            inset: 4,
            transform: `scale(${logoScale})`,
            transformOrigin: "center center",
          }}
        >
          <div className="relative w-full h-full">
            <Image
              src={s.logo}
              alt={s.name}
              fill
              sizes="(max-width: 512px) 100vw, 512px"
              className="object-contain"
            />
          </div>
        </div>
      </div>

      {/* Category */}
      <div className="relative font-cinzel text-[#D4AF5A]/55 tracking-[0.28em] text-[10px] uppercase mb-2">
        {s.category}
      </div>

      {/* Name */}
      <h3 className="relative font-cinzel text-[#DAD3C6] text-xl font-light leading-snug mb-3 tracking-wide">
        {s.name}
      </h3>

      {/* Description */}
      <p className="relative font-inter text-[#DAD3C6]/55 text-sm leading-relaxed flex-1">
        {s.desc}
      </p>

      {/* Stats bar */}
      <div
        className="relative flex items-center justify-between pt-4 mt-4"
        style={{ borderTop: "1px solid rgba(212,175,90,0.12)" }}
      >
        <div className="flex items-center gap-2">
          <span className="relative w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#D4AF5A" }}>
            <span className="absolute inset-0 rounded-full animate-ping" style={{ background: "rgba(212,175,90,0.5)" }} />
          </span>
          <span className="font-cinzel text-[#D4AF5A] tracking-[0.18em] text-[11px]">
            {s.highlight}
          </span>
        </div>
        <span className="font-inter text-[#DAD3C6]/40 text-[10px]">{s.location}</span>
      </div>

      <MobileNavDots total={total} active={active} onDot={onDot} />
    </div>
  );
}

// ── Main carousel shell ───────────────────────────────────────────
function MobilePipeline({ items, t }: { items: Subsidiary[]; t: UiLabels }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<Array<HTMLDivElement | null>>(
    Array(items.length + 1).fill(null)
  );
  const [activeSlide, setActiveSlide] = useState(0);
  const TOTAL = items.length + 1;

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    const observers: IntersectionObserver[] = [];
    slideRefs.current.forEach((el, i) => {
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSlide(i); },
        { root: container, threshold: 0.6 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [items.length]);

  const goToSlide = (i: number) => {
    const el = slideRefs.current[i];
    if (el && scrollRef.current) {
      scrollRef.current.scrollTo({ top: el.offsetTop, behavior: "smooth" });
    }
  };

  return (
    <section className="relative bg-[#061022]" style={{ height: "100svh" }}>
      {/* Cartographic grid */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.025] z-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(212,175,90,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,90,0.6) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Snap scroll container */}
      <div
        ref={scrollRef}
        className="relative z-10"
        style={{
          height: "100svh",
          overflowY: "scroll",
          scrollSnapType: "y mandatory",
          overscrollBehavior: "contain",
        }}
      >
        {/* Slide 0 — Hub intro */}
        <div
          ref={(el) => { slideRefs.current[0] = el; }}
          style={{ height: "100svh", scrollSnapAlign: "start", scrollSnapStop: "always" }}
          className="relative"
        >
          <MobileHubSlide
            items={items}
            t={t}
            active={activeSlide}
            total={TOTAL}
            onDot={goToSlide}
          />
        </div>

        {/* Slides 1‥N — one per subsidiary */}
        {items.map((s, i) => (
          <div
            key={s.num}
            ref={(el) => { slideRefs.current[i + 1] = el; }}
            style={{ height: "100svh", scrollSnapAlign: "start", scrollSnapStop: "always" }}
            className="relative"
          >
            <MobileCompanySlide
              s={s}
              index={i}
              active={activeSlide}
              total={TOTAL}
              onDot={goToSlide}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════
// Mobile: Galaxy Finale — Sovereign Constellation
// ═══════════════════════════════════════════════════════════════════

function MobileGalaxy({ items, t }: { items: Subsidiary[]; t: UiLabels }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const R = 115;

  const positions = useMemo(
    () =>
      items.map((_, i) => {
        const angle = -Math.PI / 2 + (2 * Math.PI * i) / items.length;
        return {
          x: Math.round(R * Math.cos(angle)),
          y: Math.round(R * Math.sin(angle)),
        };
      }),
    [items]
  );

  return (
    <motion.div
      ref={ref}
      className="relative mt-12"
      style={{ height: 400, width: "100%" }}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.9 }}
    >
      <div className="absolute top-0 inset-x-0 text-center pointer-events-none">
        <div className="font-cinzel text-[#D4AF5A]/40 tracking-[0.38em] text-[10px] uppercase">
          SOVEREIGN CONSTELLATION
        </div>
      </div>
      {/* SVG — ring + spokes */}
      <svg
        aria-hidden
        className="absolute"
        style={{ left: "50%", top: "calc(50% + 8px)", overflow: "visible", width: 0, height: 0 }}
      >
        <motion.circle
          cx={0}
          cy={0}
          r={R}
          fill="none"
          stroke="rgba(212,175,90,0.12)"
          strokeWidth="1"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
          transition={{ duration: 1.5, delay: 0.05, ease: CINEMATIC }}
        />
        {positions.map((pos, i) => (
          <motion.path
            key={items[i].num + "-spoke"}
            d={`M 0 0 L ${pos.x} ${pos.y}`}
            stroke="rgba(212,175,90,0.2)"
            strokeWidth="1"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
            transition={{ duration: 0.55, delay: 0.18 + i * 0.07, ease: CINEMATIC }}
          />
        ))}
      </svg>
      {/* Hub */}
      <motion.div
        className="absolute overflow-hidden"
        style={{
          left: "50%",
          top: "calc(50% + 8px)",
          transform: "translate(-50%, -50%)",
          width: 74,
          height: 74,
          borderRadius: "50%",
          background: "radial-gradient(circle at 38% 32%, #FDFAF5 0%, #EDE5D4 100%)",
          border: "2px solid rgba(212,175,90,0.9)",
          boxShadow: "0 0 0 5px rgba(212,175,90,0.12), 0 0 38px rgba(212,175,90,0.6)",
          zIndex: 3,
        }}
        initial={{ opacity: 0, scale: 0 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.7, ease: CINEMATIC }}
      >
        <div className="absolute" style={{ inset: 5 }}>
          <div className="relative w-full h-full">
            <Image
              src="/logos/kangala_holding_gold.svg"
              alt="Kangala"
              fill
              sizes="74px"
              className="object-contain"
            />
          </div>
        </div>
      </motion.div>
      {/* Subsidiary nodes */}
      {items.map((s, i) => (
        <motion.div
          key={s.num + "-galaxy"}
          className="absolute"
          style={{
            left: `calc(50% + ${positions[i].x}px)`,
            top: `calc(50% + ${positions[i].y + 8}px)`,
            transform: "translate(-50%, -50%)",
            zIndex: 2,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.38 + i * 0.08, ease: CINEMATIC }}
        >
          <div
            className="relative overflow-hidden"
            style={{
              width: 62,
              height: 62,
              borderRadius: "50%",
              background: "radial-gradient(circle at 38% 32%, #FDFAF5 0%, #EDE5D4 100%)",
              border: "1.5px solid rgba(212,175,90,0.55)",
              boxShadow: "0 0 12px rgba(212,175,90,0.25)",
            }}
          >
            <div
              className="absolute"
              style={{
                inset: 2,
                transform: `scale(${LOGO_SCALE[i] ?? 1})`,
                transformOrigin: "center center",
              }}
            >
              <div className="relative w-full h-full">
                <Image src={s.logo} alt={s.name} fill sizes="62px" className="object-contain" />
              </div>
            </div>
          </div>
          <p
            className="absolute font-cinzel text-[#DAD3C6]/40 text-[6px] tracking-wide text-center whitespace-nowrap"
            style={{
              top: "100%",
              left: "50%",
              transform: "translateX(-50%)",
              marginTop: 3,
              maxWidth: 80,
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {s.name.split(" ")[0]}
          </p>
        </motion.div>
      ))}
    </motion.div>
  );
}
