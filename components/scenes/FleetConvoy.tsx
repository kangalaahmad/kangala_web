"use client";

/**
 * ╔═══════════════════════════════════════════════════════════════════╗
 * ║  FLEET CONVOY — "The Infinite Convoy"  (Phase 2.3)               ║
 * ╠═══════════════════════════════════════════════════════════════════╣
 * ║  Sovereign Deep (#061022) scene. The most cinematic moment in    ║
 * ║  the dossier — 400+ tankers rendered as an infinite background   ║
 * ║  convoy, while HUD glassmorphism cards float in the foreground.  ║
 * ║                                                                   ║
 * ║  Design rules (_SYSTEM_RULES.md):                                 ║
 * ║   · Sovereign Deep (#061022) base — NEVER pure black             ║
 * ║   · Sovereign Gold (#D4AF5A) — colossal "400+" outline number    ║
 * ║   · Ivory Shock (#DAD3C6) — primary typography                   ║
 * ║   · HUD Glassmorphism: backdrop-blur + bg-[#061022]/40 +         ║
 * ║     border-[#D4AF5A]/20                                          ║
 * ║   · Cinematic easing: cubic-bezier(0.25, 0.1, 0.25, 1)          ║
 * ║   · NO rounded corners except orbital nodes (rounded-full)       ║
 * ╚═══════════════════════════════════════════════════════════════════╝
 */

import { useRef, createContext, useContext } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import type { SceneProps } from "@/lib/i18n";
import type { Lang } from "@/lib/i18n";
import { EASE } from "@/lib/easing";

// ═══════════════════════════════════════════════════════════════════
// Bilingual Dictionary
// ═══════════════════════════════════════════════════════════════════

type Card = { name: string; badge: string; desc: string; bullets: string[] };
type Loc = {
  supra: string;
  fleetNum: string;
  fleetSub: string;
  narrative: string;
  hudTitle: string;
  stats: { val: string; lbl: string }[];
  cards: Card[];
  quote: string;
  quoteAttr: string;
};

const DICT: Record<Lang, Loc> = { // FullDict: all 3 langs required
  en: {
    supra: "LOGISTICAL SOVEREIGNTY",
    fleetNum: "400+",
    fleetSub: "Active Fuel Tankers",
    narrative:
      "The largest privately-operated heavy tanker fleet in West Africa. 400+ trucks move fuel, materials, and sovereignty across Burkina Faso, Mali, and Côte d'Ivoire — 24 hours a day, 365 days a year.",
    hudTitle: "FLEET INTELLIGENCE",
    stats: [
      { val: "400+", lbl: "Active Tankers" },
      { val: "3",    lbl: "Nations" },
      { val: "2M+",  lbl: "Litres / Month" },
      { val: "24/7", lbl: "Operational" },
      { val: "100%", lbl: "Captive Fleet" },
    ],
    cards: [
      {
        name: "KANGALA TRANSPORT",
        badge: "Primary Fleet Operator",
        desc: "The operational spine of Kangala's logistical sovereignty. 400+ heavy-duty fuel tankers serving mining operations, energy delivery, and strategic distribution across three nations.",
        bullets: [
          "400+ owned & operated tankers",
          "Cross-border fuel transport — BF · ML · CI",
          "Mine-site dedicated fleet operations",
          "24/7 dispatch & real-time tracking",
        ],
      },
      {
        name: "NAIGAIBA AUTO",
        badge: "Fleet Management & Maintenance",
        desc: "The technical arm ensuring 100% fleet availability. Integrated maintenance programs, driver academies, and logistics optimization keep every tanker mission-ready at all times.",
        bullets: [
          "Full lifecycle fleet maintenance",
          "Certified driver training program",
          "Spare parts inventory management",
          "Predictive maintenance protocols",
        ],
      },
    ],
    quote: "\u201cSovereignty requires fuel. The convoy never stops.\u201d",
    quoteAttr: "Kangala Holding \u2014 Logistical Doctrine",
  },
  fr: {
    supra: "SOUVERAINETÉ LOGISTIQUE",
    fleetNum: "400+",
    fleetSub: "Camions-Citernes Actifs",
    narrative:
      "La plus grande flotte privée de camions-citernes d'Afrique de l'Ouest. 400+ véhicules acheminent carburant, matériaux et souveraineté au Burkina Faso, au Mali et en Côte d'Ivoire — 24 heures sur 24, 365 jours par an.",
    hudTitle: "INTELLIGENCE DE FLOTTE",
    stats: [
      { val: "400+", lbl: "Camions Actifs" },
      { val: "3",    lbl: "Nations" },
      { val: "2M+",  lbl: "Litres / Mois" },
      { val: "24/7", lbl: "Opérationnel" },
      { val: "100%", lbl: "Flotte Propre" },
    ],
    cards: [
      {
        name: "KANGALA TRANSPORT",
        badge: "Opérateur Principal de Flotte",
        desc: "La colonne vertébrale opérationnelle de la souveraineté logistique de Kangala. 400+ camions-citernes lourds au service des opérations minières, de la distribution d'énergie et du ravitaillement stratégique à travers trois nations.",
        bullets: [
          "400+ camions en propriété et en exploitation",
          "Transport transfrontalier — BF · ML · CI",
          "Flotte dédiée aux sites miniers",
          "Dispatching 24/7 et suivi en temps réel",
        ],
      },
      {
        name: "NAIGAIBA AUTO",
        badge: "Gestion & Maintenance de Flotte",
        desc: "Le bras technique garantissant une disponibilité à 100%. Programmes de maintenance intégrés, académies de formation et optimisation logistique maintiennent chaque camion en état opérationnel.",
        bullets: [
          "Maintenance complète sur tout le cycle de vie",
          "Programme de formation certifié des conducteurs",
          "Gestion des stocks de pièces détachées",
          "Protocoles de maintenance prédictive",
        ],
      },
    ],
    quote:
      "\u00ab\u202fLa souveraineté nécessite du carburant. Le convoi ne s'arrête jamais.\u202f\u00bb",
    quoteAttr: "Kangala Holding \u2014 Doctrine Logistique",
  },
  ar: {
    supra: "السيادة اللوجستية",
    fleetNum: "+400",
    fleetSub: "شاحنة وقود نشطة",
    narrative:
      "أكبر أسطول خاص من الشاحنات الثقيلة في غرب أفريقيا. تنقل أكثر من 400 شاحنة الوقود والمواد والسيادة عبر بوركينا فاسو ومالي وكوت ديفوار — 24 ساعة يومياً، 365 يوماً في السنة.",
    hudTitle: "معلومات الأسطول",
    stats: [
      { val: "+400", lbl: "شاحنة نشطة" },
      { val: "3",    lbl: "دول" },
      { val: "+2M",  lbl: "لتر / شهر" },
      { val: "24/7", lbl: "تشغيل مستمر" },
      { val: "100%", lbl: "أسطول مملوك" },
    ],
    cards: [
      {
        name: "KANGALA TRANSPORT",
        badge: "مشغل الأسطول الرئيسي",
        desc: "العمود الفقري لسيادة كانغالا اللوجستية. أكثر من 400 شاحنة وقود ثقيلة تخدم العمليات التعدينية وتوزيع الطاقة عبر ثلاث دول.",
        bullets: [
          "+400 شاحنة مملوكة ومشغلة",
          "نقل وقود عبر الحدود — BF · ML · CI",
          "عمليات أسطول مديرة لمواقع التعدين",
          "إرسال على مدار الساعة 24/7 وتتبع في الوقت الفعلي",
        ],
      },
      {
        name: "NAIGAIBA AUTO",
        badge: "إدارة وصيانة الأسطول",
        desc: "الذراع التقني لضمان توفر الأسطول بنسبة 100%. برامج صيانة متكاملة وأكاديميات سائقين وتحسين لوجستي متواصل.",
        bullets: [
          "صيانة شاملة لدورة حياة الأسطول بالكامل",
          "برنامج تدريب سائقين معتمد",
          "إدارة مخزون قطع الغيار",
          "بروتوكولات الصيانة التنبؤية",
        ],
      },
    ],
    quote: "\u201cالسيادة تحتاج إلى وقود. القافلة لا تتوقف أبداً.\u201d",
    quoteAttr: "مجموعة كانغالا \u2014 عقيدة اللوجستيك",
  },
};

const LocCtx = createContext<Loc>(DICT.en);
function useLoc(): Loc {
  return useContext(LocCtx);
}

// ═══════════════════════════════════════════════════════════════════
// Tanker Silhouette — sharp, architectural, no soft curves
// ═══════════════════════════════════════════════════════════════════

function TankerIcon({
  className,
  opacity = 0.07,
}: {
  className?: string;
  opacity?: number;
}) {
  return (
    <svg
      viewBox="0 0 320 64"
      fill="currentColor"
      className={className}
      style={{ opacity }}
      aria-hidden
    >
      {/* Cab body */}
      <rect x="4" y="28" width="36" height="22" />
      {/* Cab roof */}
      <rect x="8" y="16" width="28" height="15" />
      {/* Exhaust stack */}
      <rect x="9" y="6" width="4" height="12" />
      {/* Chassis rail */}
      <rect x="38" y="36" width="270" height="10" />
      {/* Tank 1 */}
      <rect x="48" y="10" width="76" height="28" />
      {/* Tank 2 */}
      <rect x="132" y="10" width="76" height="28" />
      {/* Tank 3 */}
      <rect x="216" y="10" width="76" height="28" />
      {/* Gold separator lines — barely visible */}
      <rect x="122" y="12" width="2" height="24" fill="#D4AF5A" opacity="0.3" />
      <rect x="206" y="12" width="2" height="24" fill="#D4AF5A" opacity="0.3" />
      {/* Wheels */}
      <circle cx="24" cy="54" r="8" />
      <circle cx="118" cy="54" r="8" />
      <circle cx="148" cy="54" r="8" />
      <circle cx="244" cy="54" r="8" />
      <circle cx="282" cy="54" r="8" />
    </svg>
  );
}

// ═══════════════════════════════════════════════════════════════════
// Infinite Convoy Marquee
// ═══════════════════════════════════════════════════════════════════

const TANKER_COUNT = 10;

function InfiniteConvoy() {
  const tankers = Array.from({ length: TANKER_COUNT * 2 });
  return (
    <>
      <style>{`
        @keyframes sovereign-convoy {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .convoy-track {
          animation: sovereign-convoy 80s linear infinite;
          will-change: transform;
        }
      `}</style>
      <div
        className="absolute bottom-0 left-0 right-0 h-24 overflow-hidden pointer-events-none"
        aria-hidden
        style={{
          maskImage:
            "linear-gradient(90deg, transparent 0%, black 10%, black 90%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(90deg, transparent 0%, black 10%, black 90%, transparent 100%)",
        }}
      >
        <div className="convoy-track flex items-end gap-20 pb-2">
          {tankers.map((_, i) => (
            <TankerIcon
              key={i}
              className="h-16 flex-shrink-0 text-[#DAD3C6]"
              opacity={0.04 + (i % 5) * 0.012}
            />
          ))}
        </div>
      </div>
    </>
  );
}

// ═══════════════════════════════════════════════════════════════════
// HUD Glassmorphism Card
// ═══════════════════════════════════════════════════════════════════

function HudCard({ card, index }: { card: Card; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 48 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 1.4,
        delay: index * 0.18,
        ease: EASE.SPRING,
      }}
      className="flex-1 min-w-[280px] flex flex-col"
      style={{
        background: "rgba(6,16,34,0.50)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        border: "1px solid rgba(212,175,90,0.18)",
        borderTop: "2px solid rgba(212,175,90,0.65)",
      }}
    >
      {/* Card top bar */}
      <div
        className="flex items-center justify-between px-5 py-3"
        style={{ borderBottom: "1px solid rgba(212,175,90,0.10)" }}
      >
        <span className="font-cinzel text-[#D4AF5A]/80 tracking-[0.45em] text-[11px] uppercase">
          {card.badge}
        </span>
        <span
          className="w-1.5 h-1.5 rounded-full bg-[#D4AF5A]"
          style={{
            boxShadow: "0 0 6px rgba(212,175,90,0.8)",
            animation: "pulse 2s ease-in-out infinite",
          }}
        />
      </div>

      {/* Card content */}
      <div className="p-5 md:p-6 flex-1 flex flex-col">
        <div className="font-cinzel text-[#DAD3C6] tracking-[0.25em] text-sm md:text-base font-semibold mb-4">
          {card.name}
        </div>
        <p className="font-cormorant text-[#DAD3C6]/65 text-[14px] md:text-[15px] leading-relaxed mb-6 flex-1">
          {card.desc}
        </p>
        <div className="space-y-2.5">
          {card.bullets.map((bullet, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -12 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{
                duration: 0.7,
                delay: index * 0.18 + i * 0.08 + 0.4,
                ease: EASE.SPRING,
              }}
              className="flex items-start gap-3"
            >
              <span className="flex-shrink-0 w-px h-[18px] bg-[#D4AF5A]/40 mt-0.5" />
              <span className="font-cinzel text-[#DAD3C6]/70 text-[10px] md:text-[11px] tracking-[0.15em] leading-relaxed uppercase">
                {bullet}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// Main Inner (consumes context)
// ═══════════════════════════════════════════════════════════════════

function FleetConvoyInner() {
  const t = useLoc();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -70]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{ background: "#061022", minHeight: "100vh" }}
    >
      {/* Ambient radial gold glow — bottom */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 90% 55% at 50% 110%, rgba(212,175,90,0.08) 0%, transparent 65%)",
        }}
      />

      {/* Top sovereign line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(212,175,90,0.7) 50%, transparent)",
        }}
      />

      {/* ── Infinite tanker convoy — background layer ── */}
      <InfiniteConvoy />

      {/* ── Main content ── */}
      <div className="relative z-10 flex flex-col">

        {/* HERO — supra + colossal number */}
        <div className="pt-28 md:pt-36 pb-10 flex flex-col items-center text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: EASE.DISSOLVE }}
            className="font-cinzel text-[#D4AF5A] tracking-[0.7em] text-[10px] md:text-xs mb-10 opacity-75"
          >
            {t.supra}
          </motion.div>

          {/* Colossal outlined "400+" */}
          <motion.div style={{ y: heroY }} className="relative select-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.88 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2.0, ease: EASE.VAULT }}
              className="font-cinzel font-light leading-none"
              style={{
                fontSize: "clamp(100px, 20vw, 260px)",
                color: "transparent",
                WebkitTextStroke: "1.5px rgba(212,175,90,0.75)",
                letterSpacing: "0.06em",
              }}
            >
              {t.fleetNum}
            </motion.div>

            {/* Halo glow behind number */}
            <div
              aria-hidden
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle at 50% 50%, rgba(212,175,90,0.10) 0%, transparent 60%)",
                filter: "blur(24px)",
              }}
            />
          </motion.div>

          {/* Fleet sub-label + divider */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.3, ease: EASE.DISSOLVE }}
            className="mt-2 flex flex-col items-center gap-4"
          >
            <span className="font-cinzel text-[#DAD3C6]/80 tracking-[0.4em] text-sm md:text-lg">
              {t.fleetSub}
            </span>
            <div className="flex items-center gap-4 text-[#D4AF5A]/40">
              <div className="w-16 h-px bg-[#D4AF5A]/25" />
              <span className="text-[10px]">◆</span>
              <div className="w-16 h-px bg-[#D4AF5A]/25" />
            </div>
          </motion.div>

          {/* Narrative */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.55, ease: EASE.DISSOLVE }}
            className="mt-7 font-cormorant text-[#DAD3C6]/55 text-base md:text-lg leading-relaxed max-w-2xl"
          >
            {t.narrative}
          </motion.p>
        </div>

        {/* ── HUD Stats Strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.2, ease: EASE.SNAP }}
          className="mx-6 md:mx-12 max-w-5xl lg:mx-auto mb-14"
        >
          <div
            className="grid grid-cols-5 gap-px"
            style={{ background: "rgba(212,175,90,0.12)" }}
          >
            {t.stats.map((s, i) => (
              <motion.div
                key={s.lbl}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.9,
                  delay: i * 0.09,
                  ease: EASE.SNAP,
                }}
                className="relative flex flex-col items-center justify-center text-center py-6 px-3"
                style={{
                  background: "rgba(6,16,34,0.88)",
                  backdropFilter: "blur(8px)",
                }}
              >
                <span className="absolute top-0 left-[20%] right-[20%] h-[2px] bg-[#D4AF5A]/55" />
                <div className="font-cinzel text-[#D4AF5A] text-xl md:text-2xl lg:text-3xl font-light">
                  {s.val}
                </div>
                <div className="mt-1.5 font-cinzel text-[#DAD3C6]/35 tracking-[0.22em] text-[10px] md:text-[11px] uppercase">
                  {s.lbl}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── HUD Glassmorphism Cards ── */}
        <div className="px-6 md:px-12 max-w-7xl mx-auto mb-20 md:mb-28 w-full">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: EASE.DISSOLVE }}
            className="font-cinzel text-[#D4AF5A]/60 tracking-[0.55em] text-[11px] uppercase mb-6"
          >
            {t.hudTitle}
          </motion.div>
          <div className="flex flex-col md:flex-row gap-4 md:gap-5">
            {t.cards.map((card, i) => (
              <HudCard key={card.name} card={card} index={i} />
            ))}
          </div>
        </div>

        {/* ── Closing Doctrine ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1.8, ease: EASE.DISSOLVE }}
          className="pb-20 md:pb-28 px-6 text-center"
        >
          <blockquote className="font-cormorant italic text-[#D4AF5A]/75 text-lg md:text-2xl mb-3 leading-relaxed">
            {t.quote}
          </blockquote>
          <cite className="font-cinzel text-[#DAD3C6]/25 tracking-[0.4em] text-[11px] uppercase not-italic">
            {t.quoteAttr}
          </cite>
        </motion.div>
      </div>

      {/* Bottom sovereign line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(212,175,90,0.5) 50%, transparent)",
        }}
      />
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════
// Export — wraps context provider
// ═══════════════════════════════════════════════════════════════════

export default function FleetConvoy({ lang = "en" }: SceneProps = {}) {
  return (
    <LocCtx.Provider value={DICT[lang ?? "en"]}>
      <FleetConvoyInner />
    </LocCtx.Provider>
  );
}
