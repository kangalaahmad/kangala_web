"use client";

/**
 * LOGISTICS — Logistical Sovereignty · The Machine
 * Source: Sovereign_Final/page10_logistics_*.html + page10b_fuel_depot_*.html + page11_fleet_*.html
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
import type { FullDict, SceneProps } from "@/lib/i18n";
import { EASE } from "@/lib/easing";

type Stat = { value: string; label: string; numeric?: number; suffix?: string };
type Capability = { num: string; title: string; desc: string };
type DepotImg = { src: string; label: string };
type DepotCardT = { title: string; body: string };

type T = {
  topBarLeft: string;
  topBarRight: string;
  fleetSupra: string;
  fleetTitleA: string;
  fleetTitleB: string;
  fleetTagline: string;
  fleetTaglineAr: string;
  fleetStats: Stat[];
  sovSupra: string;
  sovTitleA: string;
  sovTitleB: string;
  sovBodyPre: string;
  sovBodyInd: string;
  sovBodyMid: string;
  sovBodyWave: string;
  sovBodyEnd: string;
  capabilities: Capability[];
  depotSupra: string;
  depotTitleA: string;
  depotTitleB: string;
  depotSubtitle: string;
  depotNarrPre: string;
  depotNarrTanks: string;
  depotNarrMid: string;
  depotNarrCross: string;
  depotNarrEnd: string;
  depotCards: DepotCardT[];
  depotStats: Stat[];
  depotGallery: DepotImg[];
  energySovTitle: string;
  energySovPre: string;
  energySovChoke: string;
  energySovMid: string;
  energySovAnchor: string;
  energySovEnd: string;
  quoteA: string;
  quoteB: string;
  quoteHighlight: string;
  quoteEnd: string;
  quoteAttribution: string;
};

const GALLERY_SRCS = [
  "/logistics/tank.jpeg",
  "/logistics/tank2.jpeg",
  "/logistics/tank1.jpeg",
  "/logistics/tank4.jpeg",
];

const DICT: FullDict<T> = {
  en: {
    topBarLeft: "Kangala Holding Group",
    topBarRight: "Visual Evidence",
    fleetSupra: "KANGALA TRANSPORT & HYDROCARBURE",
    fleetTitleA: "FLEET",
    fleetTitleB: "MOBILIZATION",
    fleetTagline: "Documented readiness for continuous, large-scale deployment.",
    fleetTaglineAr: "",
    fleetStats: [
      { value: "400+", label: "Heavy-Duty Tankers", numeric: 400, suffix: "+" },
      { value: "100%", label: "Self-Owned Fleet", numeric: 100, suffix: "%" },
      { value: "24/7", label: "Operational Readiness" },
      { value: "3", label: "Countries Covered", numeric: 3 },
    ],
    sovSupra: "LOGISTICAL SOVEREIGNTY",
    sovTitleA: "THE POWER TO",
    sovTitleB: "BREAK THE SIEGE",
    sovBodyPre: "While others navigate supply chain vulnerabilities, Kangala operates with ",
    sovBodyInd: "complete logistical independence",
    sovBodyMid: ". Our mobilized fleet executes supply operations in a ",
    sovBodyWave: "single, coordinated wave",
    sovBodyEnd: ".",
    capabilities: [
      { num: "01", title: "Tri-National Reach", desc: "Fuel, water and heavy-material transport across three sovereign nations." },
      { num: "02", title: "Zero Third-Party Risk", desc: "100% self-owned fleet. No reliance on external logistics providers." },
      { num: "03", title: "Single-Wave Mobilization", desc: "Coordinated deployments eliminate multi-trip delays and exposure." },
      { num: "04", title: "Dual-Country Maintenance", desc: "Dedicated maintenance depots in Burkina Faso and Mali." },
    ],
    depotSupra: "Energy Infrastructure \u00b7 Border Operations",
    depotTitleA: "STRATEGIC",
    depotTitleB: "FUEL DEPOT",
    depotSubtitle: "Cross-Border Storage Facility \u00b7 Burkina Faso \u2013 Mali Corridor",
    depotNarrPre: "Kangala Holding owns ",
    depotNarrTanks: "high-capacity fuel storage tanks",
    depotNarrMid: " at a strategic border zone between Burkina Faso and Mali. This pivotal location supports ",
    depotNarrCross: "cross-border logistics",
    depotNarrEnd: ", reduces transit times, and secures the energy supply chain for the entire mining operation.",
    depotCards: [
      { title: "Strategic Border Location", body: "Positioned at a pivotal border crossing linking Burkina Faso and Mali. Enables rapid fuel distribution to cross-border fleet operations." },
      { title: "Active Expansion Programme", body: "New tank foundations under construction in partnership with KGL Industries. Additional capacity, upgraded safety systems, and improved mechanical connections." },
      { title: "Operational Objectives", body: "Increase storage capacity to meet rising demand. Enhance transit speed, strengthen border-zone energy security, and support Kangala's overland fleet." },
    ],
    depotStats: [
      { value: "2", label: "Countries Served" },
      { value: "24/7", label: "Fuel Availability" },
      { value: "KGL", label: "Industries Partner" },
    ],
    depotGallery: [
      { src: GALLERY_SRCS[0], label: "High-capacity fuel tank \u2014 on-site inspection" },
      { src: GALLERY_SRCS[1], label: "Kangala fuel storage depot" },
      { src: GALLERY_SRCS[2], label: "Distribution valves & pipeline network" },
      { src: GALLERY_SRCS[3], label: "New tank foundation \u2014 expansion in progress" },
    ],
    energySovTitle: "Energy Sovereignty",
    energySovPre: "Owning fuel infrastructure at a ",
    energySovChoke: "cross-border chokepoint",
    energySovMid: " eliminates third-party dependency, guarantees uninterrupted fleet operations, and positions Kangala as a ",
    energySovAnchor: "regional energy anchor",
    energySovEnd: " across the Sahel corridor.",
    quoteA: "\u201CSupply chain resilience is not an advantage;",
    quoteB: " it is the foundation of ",
    quoteHighlight: "sovereign execution",
    quoteEnd: ".\u201D",
    quoteAttribution: "\u2014 Kangala Doctrine",
  },
  fr: {
    topBarLeft: "Kangala Holding Group",
    topBarRight: "Preuves Visuelles",
    fleetSupra: "KANGALA TRANSPORT & HYDROCARBURE",
    fleetTitleA: "MOBILISATION",
    fleetTitleB: "DE LA FLOTTE",
    fleetTagline: "Capacit\u00e9 document\u00e9e de d\u00e9ploiement continu \u00e0 grande \u00e9chelle.",
    fleetTaglineAr: "",
    fleetStats: [
      { value: "400+", label: "Camions-citernes lourds", numeric: 400, suffix: "+" },
      { value: "100%", label: "Flotte enti\u00e8rement d\u00e9tenue", numeric: 100, suffix: "%" },
      { value: "24/7", label: "Disponibilit\u00e9 op\u00e9rationnelle" },
      { value: "3", label: "Pays couverts", numeric: 3 },
    ],
    sovSupra: "SOUVERAINET\u00c9 LOGISTIQUE",
    sovTitleA: "LE POUVOIR DE",
    sovTitleB: "BRISER LE SI\u00c8GE",
    sovBodyPre: "Tandis que d'autres subissent les vuln\u00e9rabilit\u00e9s des cha\u00eenes d'approvisionnement, Kangala op\u00e8re avec une ",
    sovBodyInd: "ind\u00e9pendance logistique totale",
    sovBodyMid: ". Notre flotte mobilis\u00e9e ex\u00e9cute les op\u00e9rations d'approvisionnement en une ",
    sovBodyWave: "seule vague coordonn\u00e9e",
    sovBodyEnd: ".",
    capabilities: [
      { num: "01", title: "Port\u00e9e Tri-Nationale", desc: "Transport de carburant, d'eau et de mat\u00e9riaux lourds \u00e0 travers trois nations souveraines." },
      { num: "02", title: "Z\u00e9ro Risque Tiers", desc: "Flotte 100\u00a0% propri\u00e9taire. Aucune d\u00e9pendance envers des prestataires logistiques externes." },
      { num: "03", title: "Mobilisation en Vague Unique", desc: "Des d\u00e9ploiements coordonn\u00e9s \u00e9liminent les retards et l'exposition des multiples trajets." },
      { num: "04", title: "Maintenance Bi-Nationale", desc: "D\u00e9p\u00f4ts de maintenance d\u00e9di\u00e9s au Burkina Faso et au Mali." },
    ],
    depotSupra: "Infrastructure \u00c9nerg\u00e9tique \u00b7 Op\u00e9rations Frontali\u00e8res",
    depotTitleA: "D\u00c9P\u00d4T",
    depotTitleB: "STRAT\u00c9GIQUE DE CARBURANT",
    depotSubtitle: "Installation de Stockage Transfrontali\u00e8re \u00b7 Corridor Burkina Faso \u2013 Mali",
    depotNarrPre: "Kangala Holding poss\u00e8de des ",
    depotNarrTanks: "r\u00e9servoirs de stockage de carburant \u00e0 haute capacit\u00e9",
    depotNarrMid: " dans une zone fronti\u00e8re strat\u00e9gique entre le Burkina Faso et le Mali. Cet emplacement pivot soutient la ",
    depotNarrCross: "logistique transfrontali\u00e8re",
    depotNarrEnd: ", r\u00e9duit les d\u00e9lais de transit et s\u00e9curise la cha\u00eene d'approvisionnement \u00e9nerg\u00e9tique de toute l'op\u00e9ration mini\u00e8re.",
    depotCards: [
      { title: "Emplacement Frontalier Strat\u00e9gique", body: "Positionn\u00e9 \u00e0 un point de passage fronti\u00e8re pivot reliant le Burkina Faso et le Mali. Permet une distribution rapide de carburant aux op\u00e9rations transfrontali\u00e8res." },
      { title: "Programme d'Expansion Actif", body: "Nouvelles fondations de r\u00e9servoirs en construction en partenariat avec KGL Industries. Capacit\u00e9 suppl\u00e9mentaire, syst\u00e8mes de s\u00e9curit\u00e9 am\u00e9lior\u00e9s et connexions m\u00e9caniques renforc\u00e9es." },
      { title: "Objectifs Op\u00e9rationnels", body: "Augmenter la capacit\u00e9 de stockage pour r\u00e9pondre \u00e0 la demande croissante. Acc\u00e9l\u00e9rer le transit, renforcer la s\u00e9curit\u00e9 \u00e9nerg\u00e9tique en zone fronti\u00e8re et soutenir la flotte terrestre de Kangala." },
    ],
    depotStats: [
      { value: "2", label: "Pays desservis" },
      { value: "24/7", label: "Disponibilit\u00e9 carburant" },
      { value: "KGL", label: "Partenaire Industries" },
    ],
    depotGallery: [
      { src: GALLERY_SRCS[0], label: "R\u00e9servoir de carburant haute capacit\u00e9 \u2014 inspection sur site" },
      { src: GALLERY_SRCS[1], label: "D\u00e9p\u00f4t de stockage de carburant Kangala" },
      { src: GALLERY_SRCS[2], label: "Vannes de distribution & r\u00e9seau de pipelines" },
      { src: GALLERY_SRCS[3], label: "Nouvelle fondation de r\u00e9servoir \u2014 expansion en cours" },
    ],
    energySovTitle: "Souverainet\u00e9 \u00c9nerg\u00e9tique",
    energySovPre: "Poss\u00e9der une infrastructure de carburant \u00e0 un ",
    energySovChoke: "point de passage transfrontalier",
    energySovMid: " \u00e9limine la d\u00e9pendance envers les tiers, garantit des op\u00e9rations de flotte ininterrompues et positionne Kangala comme un ",
    energySovAnchor: "ancrage \u00e9nerg\u00e9tique r\u00e9gional",
    energySovEnd: " sur le corridor sah\u00e9lien.",
    quoteA: "\u00ab\u00a0La r\u00e9silience de la cha\u00eene d'approvisionnement n'est pas un avantage\u00a0;",
    quoteB: " c'est le fondement de l'",
    quoteHighlight: "ex\u00e9cution souveraine",
    quoteEnd: ".\u00a0\u00bb",
    quoteAttribution: "\u2014 Doctrine Kangala",
  },
  ar: {
    topBarLeft: "مجموعة كانغالا القابضة",
    topBarRight: "دليل بصري",
    fleetSupra: "كانغالا للنقل والهيدروكربون",
    fleetTitleA: "تحشيد",
    fleetTitleB: "الأسطول",
    fleetTagline: "جاهزية موثّقة للنشر المستمر والواسع النطاق.",
    fleetTaglineAr: "",
    fleetStats: [
      { value: "+400", label: "صهريج ثقيل", numeric: 400, suffix: "+" },
      { value: "100%", label: "أسطول مملوك بالكامل", numeric: 100, suffix: "%" },
      { value: "24/7", label: "جاهزية تشغيلية" },
      { value: "3", label: "دول مغطاة", numeric: 3 },
    ],
    sovSupra: "السيادة اللوجستية",
    sovTitleA: "القدرة على",
    sovTitleB: "كسر الحصار",
    sovBodyPre: "بينما يعاني الآخرون من هشاشة سلاسل الإمداد، تعمل كانغالا بـ",
    sovBodyInd: "استقلالية لوجستية كاملة",
    sovBodyMid: ". ينفّذ أسطولنا المحشود عمليات الإمداد في ",
    sovBodyWave: "موجة واحدة منسّقة",
    sovBodyEnd: ".",
    capabilities: [
      { num: "01", title: "امتداد ثلاثي الدول", desc: "نقل الوقود والمياه والمواد الثقيلة عبر ثلاث دول سيادية." },
      { num: "02", title: "صفر اعتماد على أطراف ثالثة", desc: "أسطول مملوك بنسبة 100%. دون أي اعتماد على مزوّدي لوجستيات خارجيين." },
      { num: "03", title: "تحشيد بموجة واحدة", desc: "عمليات نشر منسّقة تُلغي تأخيرات الرحلات المتعددة وتقلّل المخاطر." },
      { num: "04", title: "صيانة ثنائية الدولة", desc: "مستودعات صيانة مخصّصة في كلٍّ من بوركينا فاسو ومالي." },
    ],
    depotSupra: "البنية التحتية للطاقة · عمليات الحدود",
    depotTitleA: "مستودع",
    depotTitleB: "الوقود الاستراتيجي",
    depotSubtitle: "منشأة تخزين عابرة للحدود · ممر بوركينا فاسو – مالي",
    depotNarrPre: "تمتلك مجموعة كانغالا ",
    depotNarrTanks: "خزانات وقود عالية السعة",
    depotNarrMid: " في منطقة حدودية استراتيجية بين بوركينا فاسو ومالي. يدعم هذا الموقع المحوري ",
    depotNarrCross: "اللوجستيات العابرة للحدود",
    depotNarrEnd: "، ويقلّص أوقات العبور، ويُؤمّن سلسلة إمداد الطاقة لكامل عملية التعدين.",
    depotCards: [
      { title: "موقع حدودي استراتيجي", body: "يقع عند معبر حدودي محوري يربط بوركينا فاسو بمالي، ويتيح التوزيع السريع للوقود لعمليات الأسطول العابرة للحدود." },
      { title: "برنامج توسعة نشط", body: "أُسس خزانات جديدة قيد الإنشاء بالشراكة مع KGL للصناعات: سعة إضافية، وأنظمة سلامة محدّثة، وتوصيلات ميكانيكية محسّنة." },
      { title: "الأهداف التشغيلية", body: "زيادة السعة التخزينية لتلبية الطلب المتزايد، وتعزيز سرعة العبور، وتقوية أمن الطاقة في المنطقة الحدودية، ودعم أسطول كانغالا البرّي." },
    ],
    depotStats: [
      { value: "2", label: "دولتان مخدومتان" },
      { value: "24/7", label: "توافر الوقود" },
      { value: "KGL", label: "شريك صناعي" },
    ],
    depotGallery: [
      { src: GALLERY_SRCS[0], label: "خزان وقود عالي السعة — تفتيش ميداني" },
      { src: GALLERY_SRCS[1], label: "مستودع تخزين وقود كانغالا" },
      { src: GALLERY_SRCS[2], label: "صمامات التوزيع وشبكة الأنابيب" },
      { src: GALLERY_SRCS[3], label: "أساسات خزان جديد — توسعة قيد التنفيذ" },
    ],
    energySovTitle: "السيادة على الطاقة",
    energySovPre: "امتلاك بنية تحتية للوقود عند ",
    energySovChoke: "نقطة اختناق عابرة للحدود",
    energySovMid: " يُزيل الاعتماد على الأطراف الثالثة، ويضمن عمليات أسطول دون انقطاع، ويُرسّخ كانغالا بوصفها ",
    energySovAnchor: "مرتكزاً إقليمياً للطاقة",
    energySovEnd: " عبر ممر الساحل.",
    quoteA: "«مرونة سلسلة الإمداد ليست ميزة؛",
    quoteB: " بل هي أساس ",
    quoteHighlight: "التنفيذ السيادي",
    quoteEnd: ".»",
    quoteAttribution: "— مذهب كانغالا",
  },
};

// ═══════════════════════════════════════════════════════════════════
// CountUp
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
      ease: EASE.HOVER,
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
// Main
// ═══════════════════════════════════════════════════════════════════

export default function Logistics({ lang = "en" }: SceneProps = {}) {
  const t = DICT[lang ?? "en"];
  return (
    <section className="relative w-full bg-sovereign overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 30%, rgba(184,149,74,0.06) 0%, transparent 60%)",
        }}
      />

      <FleetHero t={t} />
      <SovereigntyAct t={t} />
      <FuelDepotAct t={t} />
      <ClosingQuote t={t} />
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════
// Act 1 — Fleet Hero
// ═══════════════════════════════════════════════════════════════════

function FleetHero({ t }: { t: T }) {
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

      <span className="absolute top-6 left-6 w-5 h-5 border-t-2 border-l-2 border-gold/70" />
      <span className="absolute top-6 right-6 w-5 h-5 border-t-2 border-r-2 border-gold/70" />
      <span className="absolute bottom-6 left-6 w-5 h-5 border-b-2 border-l-2 border-gold/70" />
      <span className="absolute bottom-6 right-6 w-5 h-5 border-b-2 border-r-2 border-gold/70" />

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.2 }}
        className="absolute top-0 left-0 right-0 px-6 md:px-12 py-5 flex items-center justify-between"
      >
        <span className="font-cinzel text-gold/80 tracking-[0.3em] text-[10px] md:text-xs uppercase">
          {t.topBarLeft}
        </span>
        <span className="font-cinzel text-ivory/60 tracking-[0.3em] text-[10px] md:text-xs uppercase">
          {t.topBarRight}
        </span>
      </motion.div>

      <div className="relative z-10 text-center px-6 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
          className="font-cinzel text-gold tracking-[0.5em] text-[10px] md:text-xs mb-6"
        >
          {t.fleetSupra}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.6, ease: EASE.VAULT }}
          className="font-cinzel text-ivory tracking-[0.08em] text-4xl md:text-6xl lg:text-7xl font-light leading-tight"
        >
          {t.fleetTitleA}
          <br />
          <span className="text-gold-gradient">{t.fleetTitleB}</span>
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
          {t.fleetTagline}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 1.4 }}
          dir="rtl"
          className="mt-3 font-cairo text-gold/70 text-xs md:text-sm"
        >
          {t.fleetTaglineAr || null}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 1.6 }}
        className="absolute bottom-0 left-0 right-0 px-6 md:px-12 pb-8 md:pb-12"
      >
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-px bg-gold/15 border-y border-gold/25">
          {t.fleetStats.map((s, i) => (
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
              <div className="mt-1.5 font-cinzel text-ivory/55 tracking-[0.22em] text-[10px] md:text-[11px] uppercase">
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
// Act 2 — Sovereignty
// ═══════════════════════════════════════════════════════════════════

function SovereigntyAct({ t }: { t: T }) {
  return (
    <div className="relative py-24 md:py-32">
      <div className="container mx-auto px-6 md:px-12 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, ease: EASE.DISSOLVE }}
          className="text-center mb-16 md:mb-20"
        >
          <div className="font-cinzel text-gold tracking-[0.5em] text-[10px] md:text-xs mb-4 opacity-80">
            {t.sovSupra}
          </div>
          <h2 className="font-cinzel text-ivory tracking-[0.1em] text-3xl md:text-5xl font-light leading-tight">
            {t.sovTitleA}
            <br />
            <span className="text-gold-gradient">{t.sovTitleB}</span>
          </h2>
          <div className="mt-6 flex items-center justify-center gap-3 text-gold/50">
            <span className="w-12 h-px bg-gold/40" />
            <span className="text-xs">◆</span>
            <span className="w-12 h-px bg-gold/40" />
          </div>

          <p className="mt-8 max-w-3xl mx-auto font-cairo text-ivory/70 text-sm md:text-base leading-relaxed">
            {t.sovBodyPre}
            <span className="text-ivory">{t.sovBodyInd}</span>
            {t.sovBodyMid}
            <span className="text-gold">{t.sovBodyWave}</span>
            {t.sovBodyEnd}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {t.capabilities.map((c, i) => (
            <CapabilityPillar key={c.num} c={c} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

function CapabilityPillar({ c, index }: { c: Capability; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: EASE.SPRING }}
      className="relative group"
    >
      <div
        className="relative h-full p-6 md:p-7 transition-colors duration-500"
        style={{
          background: "rgba(6,16,34,0.35)",
          border: "1px solid rgba(212,175,90,0.22)",
        }}
      >
        <span className="absolute top-0 left-0 w-4 h-4 border-t border-l border-gold/55" />
        <span className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-gold/55" />

        <div className="font-cinzel text-gold/70 text-xs tracking-[0.35em] mb-1">
          {c.num}
        </div>
        <div className="mt-0.5 mb-5 w-8 h-px bg-gold/40" />

        <h3 className="font-cinzel text-ivory text-base md:text-lg font-normal tracking-wide leading-snug mb-3">
          {c.title}
        </h3>

        <p className="font-cairo text-ivory/55 text-[12px] md:text-[13px] leading-relaxed">
          {c.desc}
        </p>
      </div>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// Act 3 — Fuel Depot
// ═══════════════════════════════════════════════════════════════════

function FuelDepotAct({ t }: { t: T }) {
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
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1 }}
          className="text-center mb-14 md:mb-20"
        >
          <div className="font-cinzel text-gold/80 tracking-[0.4em] text-[10px] md:text-xs mb-4 uppercase">
            {t.depotSupra}
          </div>

          <h2 className="font-cinzel text-ivory tracking-[0.1em] text-3xl md:text-5xl font-light leading-tight">
            {t.depotTitleA}
            <br />
            <span className="text-gold-gradient">{t.depotTitleB}</span>
          </h2>

          <div className="mt-6 font-cinzel text-ivory/60 tracking-[0.25em] text-[10px] md:text-xs uppercase">
            {t.depotSubtitle}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-8 md:gap-12 items-start">
          <div className="grid grid-cols-2 gap-3 md:gap-4">
            {t.depotGallery.map((img, i) => (
              <DepotPhoto key={img.src} img={img} index={i} />
            ))}
          </div>

          <div className="space-y-6">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.9 }}
              className="font-cairo text-ivory/75 text-sm md:text-base leading-relaxed"
            >
              {t.depotNarrPre}
              <span className="text-gold">{t.depotNarrTanks}</span>
              {t.depotNarrMid}
              <span className="text-ivory">{t.depotNarrCross}</span>
              {t.depotNarrEnd}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.9, delay: 0.1 }}
              className="grid grid-cols-3 gap-px bg-gold/15"
            >
              {t.depotStats.map((s) => (
                <div
                  key={s.label}
                  className="bg-sovereign/60 backdrop-blur-sm p-4 text-center"
                >
                  <div className="font-cinzel text-gold-gradient text-2xl md:text-3xl font-light">
                    {s.value}
                  </div>
                  <div className="mt-1 font-cinzel text-ivory/50 tracking-[0.2em] text-[10px] md:text-[11px] uppercase">
                    {s.label}
                  </div>
                </div>
              ))}
            </motion.div>

            <div className="space-y-3">
              {t.depotCards.map((card, i) => (
                <DepotCard key={card.title} card={card} index={i} />
              ))}
            </div>

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
                {t.energySovTitle}
              </div>
              <div className="font-cairo text-ivory/80 text-[13px] md:text-sm leading-relaxed">
                {t.energySovPre}
                <span className="text-gold">{t.energySovChoke}</span>
                {t.energySovMid}
                <span className="text-ivory">{t.energySovAnchor}</span>
                {t.energySovEnd}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DepotPhoto({ img, index }: { img: DepotImg; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: EASE.SPRING }}
      className="relative group overflow-hidden"
      style={{ border: "1px solid rgba(212,175,90,0.22)" }}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={img.src}
          alt={img.label}
          fill
          sizes="(max-width: 768px) 50vw, 33vw"
          className={`object-cover ${index % 2 === 0 ? "ken-burns--a" : "ken-burns--b"}`}
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

      <span className="absolute top-0 left-0 w-3 h-3 border-t border-l border-gold/70" />
      <span className="absolute top-0 right-0 w-3 h-3 border-t border-r border-gold/70" />

      <div className="absolute bottom-0 left-0 right-0 p-2.5 md:p-3">
        <div className="font-cinzel text-ivory/90 tracking-[0.12em] text-[10px] md:text-[11px] leading-tight">
          {img.label}
        </div>
      </div>
    </motion.div>
  );
}

function DepotCard({ card, index }: { card: DepotCardT; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay: 0.15 + index * 0.1, ease: EASE.SPRING }}
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

function ClosingQuote({ t }: { t: T }) {
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
          {t.quoteA}
          <br className="hidden md:block" />
          {t.quoteB}
          <span className="text-gold-gradient not-italic">{t.quoteHighlight}</span>
          {t.quoteEnd}
        </blockquote>

        <div className="mt-8 font-cinzel text-gold/60 tracking-[0.35em] text-[10px] md:text-xs uppercase">
          {t.quoteAttribution}
        </div>
      </div>
    </motion.div>
  );
}
