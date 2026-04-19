"use client";

/**
 * DISCOVERY — Geological Evidence (Ivory Shock #2)
 * Sources: Sovereign_Final/page12b_core_samples_*.html + page13_exploration_*.html
 */

import { motion, useInView, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { Dict, SceneProps } from "@/lib/i18n";

type Sample = { src: string; tray: string; horizon: string };
type StatSimple = { value: string; label: string };
type StatExpl = { value: number; display: string; label: string; decimals?: number };
type Target = { id: string; m2: string; depth: string };

type T = {
  coreSupra: string;
  coreTitleA: string;
  coreTitleB: string;
  coreSubtitle: string;
  coreNarrPre: string;
  coreNarrStrong: string;
  coreNarrEnd: string;
  coreSamples: Sample[];
  drillStats: StatSimple[];
  explSupra: string;
  explTitleA: string;
  explTitleB: string;
  explSubtitle: string;
  explStats: StatExpl[];
  execSummaryLabel: string;
  geoSettingLabel: string;
  priorityLabel: string;
  priorityTargets: Target[];
  validatedBy: string;
  validationBody: (JSX.Element | string)[];
};

const SAMPLE_SRCS = [
  "/discovery/core_sample1.jpeg",
  "/discovery/core_sample2.jpeg",
  "/discovery/core_sample3.jpeg",
  "/discovery/core_sample4.jpeg",
  "/discovery/core_sample5.jpeg",
];

const DICT: Dict<{
  coreSupra: string;
  coreTitleA: string;
  coreTitleB: string;
  coreSubtitle: string;
  coreNarrPre: string;
  coreNarrStrong: string;
  coreNarrEnd: string;
  coreSamples: Sample[];
  drillStats: StatSimple[];
  explSupra: string;
  explTitleA: string;
  explTitleB: string;
  explSubtitle: string;
  explStats: StatExpl[];
  execSummaryLabel: string;
  geoSettingLabel: string;
  priorityLabel: string;
  priorityTargets: Target[];
  validatedBy: string;
  execSummary1Pre: string;
  execSummary1Company: string;
  execSummary1Mid1: string;
  execSummary1Area: string;
  execSummary1Mid2: string;
  execSummary1Tech: string;
  execSummary1Mid3: string;
  execSummary1Km2: string;
  execSummary1Mid4: string;
  execSummary1Anom: string;
  execSummary1End: string;
  execSummary2Pre: string;
  execSummary2Res: string;
  execSummary2Mid: string;
  execSummary2Coord: string;
  execSummary2End: string;
  geoBody1Pre: string;
  geoBody1Strong: string;
  geoBody1End: string;
  geoBody2Pre: string;
  geoBody2Rate: string;
  geoBody2Mid1: string;
  geoBody2Acc: string;
  geoBody2Mid2: string;
  geoBody2Dep: string;
  geoBody2End: string;
  validationPre: string;
  validationCompany: string;
  validationMid: string;
  validationEnd: string;
}> = {
  en: {
    coreSupra: "EXPLORATION & DRILLING",
    coreTitleA: "CORE SAMPLE",
    coreTitleB: "EVIDENCE",
    coreSubtitle: "Diamond Core Drilling — On-Site Extraction Results",
    coreNarrPre: "Core samples extracted from the Kangala concession reveal ",
    coreNarrStrong: "multi-horizon laterite and saprolite profiles",
    coreNarrEnd: " with visible iron oxide alteration, quartz veining, and gold-bearing sulphide enrichment zones. Each tray represents a continuous drill run logged on-site before dispatch to accredited assay laboratories.",
    coreSamples: [
      { src: SAMPLE_SRCS[0], tray: "Tray 1", horizon: "Laterite — Ochre horizon" },
      { src: SAMPLE_SRCS[1], tray: "Tray 2", horizon: "Mixed saprolite — oxide zone" },
      { src: SAMPLE_SRCS[2], tray: "Tray 3", horizon: "Ferruginous laterite" },
      { src: SAMPLE_SRCS[3], tray: "Tray 4", horizon: "Transitional saprolite" },
      { src: SAMPLE_SRCS[4], tray: "Tray 5", horizon: "Deep laterite — competent core" },
    ],
    drillStats: [
      { value: "5", label: "Core Trays Logged" },
      { value: "NQ", label: "Diamond Core Size" },
      { value: "30m+", label: "Drill Depth Achieved" },
      { value: "100%", label: "Core Recovery Rate" },
      { value: "3", label: "Mineral Horizons ID'd" },
    ],
    explSupra: "Geological Exploration Report",
    explTitleA: "EXPLORATION",
    explTitleB: "OVERVIEW",
    explSubtitle: "Karangasso Concession · 94 Gold Anomalies · Deep-Explor® Technology",
    explStats: [
      { value: 94, display: "94", label: "Gold Anomalies" },
      { value: 69.38, display: "69.38", label: "Max CU (G-21)", decimals: 2 },
      { value: 60279, display: "60,279", label: "Largest m² (G-22)" },
      { value: 145.6, display: "145.6 m", label: "Max Depth", decimals: 1 },
      { value: 40, display: "40 km²", label: "Concession Area" },
      { value: 5.16, display: "5.16 m", label: "Min Depth", decimals: 2 },
    ],
    execSummaryLabel: "Executive Summary",
    geoSettingLabel: "Geological Setting",
    priorityLabel: "Priority Drill Targets",
    priorityTargets: [
      { id: "G-22", m2: "60,279 m²", depth: "145.6 m" },
      { id: "G-6", m2: "65.69 CU", depth: "110.2 m" },
      { id: "G-10", m2: "41,981 m²", depth: "81.9 m" },
      { id: "G-23", m2: "40,795 m²", depth: "133.4 m" },
      { id: "G-19", m2: "34,590 m²", depth: "111.9 m" },
    ],
    validatedBy: "Validated By",
    execSummary1Pre: "",
    execSummary1Company: "Deep Leader Innovation Intelligence Technology Co., Ltd",
    execSummary1Mid1: " carried out a comprehensive gold exploration campaign in the ",
    execSummary1Area: "Karangasso area, Burkina Faso",
    execSummary1Mid2: " using sub-atomic field detection technology ",
    execSummary1Tech: "Deep-Explor®",
    execSummary1Mid3: " via satellite remote sensing, covering ",
    execSummary1Km2: "40 km²",
    execSummary1Mid4: " and identifying ",
    execSummary1Anom: "94 gold anomaly zones",
    execSummary1End: " (G-1 to G-94) at depths ranging from 5 to 145.6 m.",
    execSummary2Pre: "Satellite data was processed at 0.3–0.4 m resolution and calibrated using ",
    execSummary2Res: "GIS",
    execSummary2Mid: " within the ",
    execSummary2Coord: "WGS84 / UTM Zone 30N",
    execSummary2End: " coordinate framework. Measured radiation intensities ranged from 5.01 to 69.38 CU.",
    geoBody1Pre: "Located within the ",
    geoBody1Strong: "Birimian Greenstone Belt",
    geoBody1End: " — one of West Africa's most gold-prospective geological environments. The concession features NE–SW and NW–SE structural controls with proven mineralisation corridors.",
    geoBody2Pre: "Mineralisation rate ",
    geoBody2Rate: "≥ 60%",
    geoBody2Mid1: " in anomaly zones per Deep-Explor® standards. Location accuracy deviation ",
    geoBody2Acc: "≤ 100 m",
    geoBody2Mid2: ", depth error ",
    geoBody2Dep: "±15%",
    geoBody2End: ".",
    validationPre: "Survey data validated by ",
    validationCompany: "Beijing Deep Leader Innovation & Intelligence Technology Co., Ltd.",
    validationMid: " — Contract Ref: ",
    validationEnd: " NMRAI prospection technology on 40 km² concession area.",
  },
  fr: {
    coreSupra: "EXPLORATION & FORAGE",
    coreTitleA: "ÉCHANTILLONS",
    coreTitleB: "DE CAROTTES",
    coreSubtitle: "Forage à carotte diamantée — Résultats d'extraction sur site",
    coreNarrPre: "Les échantillons de carottes extraits de la concession de Kangala révèlent des ",
    coreNarrStrong: "profils multi-horizons de latérite et de saprolite",
    coreNarrEnd: " avec altération visible en oxydes de fer, veinage quartzeux et zones d'enrichissement en sulfures aurifères. Chaque caisse représente un run de forage continu consigné sur site avant envoi aux laboratoires d'essai accrédités.",
    coreSamples: [
      { src: SAMPLE_SRCS[0], tray: "Caisse 1", horizon: "Latérite — Horizon ocre" },
      { src: SAMPLE_SRCS[1], tray: "Caisse 2", horizon: "Saprolite mixte — zone oxydée" },
      { src: SAMPLE_SRCS[2], tray: "Caisse 3", horizon: "Latérite ferrugineuse" },
      { src: SAMPLE_SRCS[3], tray: "Caisse 4", horizon: "Saprolite de transition" },
      { src: SAMPLE_SRCS[4], tray: "Caisse 5", horizon: "Latérite profonde — carotte compétente" },
    ],
    drillStats: [
      { value: "5", label: "Caisses consignées" },
      { value: "NQ", label: "Taille carotte diamant" },
      { value: "30m+", label: "Profondeur atteinte" },
      { value: "100%", label: "Taux de récupération" },
      { value: "3", label: "Horizons minéraux id." },
    ],
    explSupra: "Rapport d'Exploration Géologique",
    explTitleA: "APERÇU",
    explTitleB: "D'EXPLORATION",
    explSubtitle: "Concession Karangasso · 94 anomalies aurifères · Technologie Deep-Explor®",
    explStats: [
      { value: 94, display: "94", label: "Anomalies aurifères" },
      { value: 69.38, display: "69.38", label: "CU max (G-21)", decimals: 2 },
      { value: 60279, display: "60 279", label: "Plus grand m² (G-22)" },
      { value: 145.6, display: "145,6 m", label: "Profondeur max", decimals: 1 },
      { value: 40, display: "40 km²", label: "Superficie concession" },
      { value: 5.16, display: "5,16 m", label: "Profondeur min", decimals: 2 },
    ],
    execSummaryLabel: "Résumé Exécutif",
    geoSettingLabel: "Cadre Géologique",
    priorityLabel: "Cibles de Forage Prioritaires",
    priorityTargets: [
      { id: "G-22", m2: "60 279 m²", depth: "145,6 m" },
      { id: "G-6", m2: "65,69 CU", depth: "110,2 m" },
      { id: "G-10", m2: "41 981 m²", depth: "81,9 m" },
      { id: "G-23", m2: "40 795 m²", depth: "133,4 m" },
      { id: "G-19", m2: "34 590 m²", depth: "111,9 m" },
    ],
    validatedBy: "Validé Par",
    execSummary1Pre: "",
    execSummary1Company: "Deep Leader Innovation Intelligence Technology Co., Ltd",
    execSummary1Mid1: " a mené une campagne d'exploration aurifère complète dans la ",
    execSummary1Area: "zone de Karangasso, Burkina Faso",
    execSummary1Mid2: " en utilisant la technologie de détection de champ sub-atomique ",
    execSummary1Tech: "Deep-Explor®",
    execSummary1Mid3: " par télédétection satellitaire, couvrant ",
    execSummary1Km2: "40 km²",
    execSummary1Mid4: " et identifiant ",
    execSummary1Anom: "94 zones d'anomalies aurifères",
    execSummary1End: " (G-1 à G-94) à des profondeurs allant de 5 à 145,6 m.",
    execSummary2Pre: "Les données satellitaires ont été traitées à une résolution de 0,3–0,4 m et calibrées via ",
    execSummary2Res: "SIG",
    execSummary2Mid: " dans le référentiel de coordonnées ",
    execSummary2Coord: "WGS84 / UTM Zone 30N",
    execSummary2End: ". Les intensités de rayonnement mesurées variaient de 5,01 à 69,38 CU.",
    geoBody1Pre: "Située dans la ",
    geoBody1Strong: "Ceinture de Roches Vertes Birimienne",
    geoBody1End: " — l'un des environnements géologiques les plus prospectifs en or d'Afrique de l'Ouest. La concession présente des contrôles structuraux NE–SO et NO–SE avec des couloirs de minéralisation avérés.",
    geoBody2Pre: "Taux de minéralisation ",
    geoBody2Rate: "≥ 60 %",
    geoBody2Mid1: " dans les zones d'anomalies selon les standards Deep-Explor®. Déviation de précision de localisation ",
    geoBody2Acc: "≤ 100 m",
    geoBody2Mid2: ", erreur de profondeur ",
    geoBody2Dep: "±15 %",
    geoBody2End: ".",
    validationPre: "Données d'étude validées par ",
    validationCompany: "Beijing Deep Leader Innovation & Intelligence Technology Co., Ltd.",
    validationMid: " — Réf. contrat : ",
    validationEnd: " Technologie de prospection NMRAI sur 40 km² de concession.",
  },
};

// ═══════════════════════════════════════════════════════════════════
// CountUp (ivory variant)
// ═══════════════════════════════════════════════════════════════════

function CountUpIvory({
  to,
  display,
  decimals = 0,
}: {
  to: number;
  display?: string;
  decimals?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [shown, setShown] = useState("0");

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 2,
      ease: [0.22, 1, 0.36, 1],
      onUpdate(v) {
        setShown(
          v.toLocaleString("en-US", {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
          })
        );
      },
    });
    return () => controls.stop();
  }, [inView, to, decimals]);

  if (display && !/^[\d.,]+$/.test(display)) {
    const numericMatch = display.match(/^([\d.,\s]+)/);
    if (numericMatch) {
      const rest = display.slice(numericMatch[0].length);
      return (
        <span ref={ref} className="tabular-nums">
          {shown}
          {rest}
        </span>
      );
    }
  }

  return (
    <span ref={ref} className="tabular-nums">
      {shown}
    </span>
  );
}

// ═══════════════════════════════════════════════════════════════════
// Main
// ═══════════════════════════════════════════════════════════════════

type Loc = typeof DICT["en"];

export default function Discovery({ lang = "en" }: SceneProps = {}) {
  const t = DICT[lang];
  return (
    <section className="relative w-full bg-ivory text-sovereign overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, #0A192F 0, #0A192F 2px, transparent 0, transparent 60px), repeating-linear-gradient(-45deg, #0A192F 0, #0A192F 2px, transparent 0, transparent 60px)",
        }}
      />

      <div
        className="relative h-px w-full"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, #B8954A 50%, transparent 100%)",
        }}
      />

      <CoreSampleAct t={t} />
      <ExplorationAct t={t} />
      <CredibilityStrip t={t} />

      <div
        className="relative h-px w-full"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, #B8954A 50%, transparent 100%)",
        }}
      />
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════
// Act 1 — Core Sample
// ═══════════════════════════════════════════════════════════════════

function CoreSampleAct({ t }: { t: Loc }) {
  return (
    <div className="relative py-24 md:py-32">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 md:mb-16"
        >
          <div className="font-cinzel text-gold tracking-[0.5em] text-[10px] md:text-xs mb-3 opacity-90">
            {t.coreSupra} · الاستكشاف والحفر
          </div>
          <h2 className="font-cinzel text-sovereign tracking-[0.08em] text-3xl md:text-5xl lg:text-6xl font-light leading-[1.05]">
            {t.coreTitleA}
            <br />
            <span className="font-normal">{t.coreTitleB}</span>
          </h2>
          <div
            className="mt-5 h-[3px] w-20"
            style={{
              background:
                "linear-gradient(90deg, #B8954A 0%, #1A3A2A 50%, #7A1F1F 100%)",
            }}
          />
          <div className="mt-5 font-cormorant italic text-sovereign/70 text-base md:text-lg">
            {t.coreSubtitle}
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="font-cormorant text-sovereign/85 text-base md:text-lg leading-relaxed max-w-4xl mb-10 md:mb-14"
        >
          {t.coreNarrPre}
          <strong className="text-sovereign">{t.coreNarrStrong}</strong>
          {t.coreNarrEnd}
        </motion.p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5 mb-10 md:mb-14">
          {t.coreSamples.map((sample, i) => (
            <CoreTray key={sample.tray} s={sample} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-5 gap-px bg-gold/30"
        >
          {t.drillStats.map((s) => (
            <div
              key={s.label}
              className="bg-sovereign text-center py-5 md:py-6 px-3 relative"
            >
              <span className="absolute top-0 left-[20%] right-[20%] h-[2px] bg-gold" />
              <div className="font-cinzel text-gold text-2xl md:text-3xl font-light">
                {s.value}
              </div>
              <div className="mt-1.5 font-cinzel text-ivory/60 tracking-[0.2em] text-[9px] uppercase">
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

function CoreTray({ s, index }: { s: Sample; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="relative group overflow-hidden"
      style={{ border: "2px solid rgba(184,149,74,0.3)" }}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-sovereign/5">
        <Image
          src={s.src}
          alt={`${s.tray} — ${s.horizon}`}
          fill
          sizes="(max-width: 768px) 50vw, 20vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(10,25,47,0.85) 0%, rgba(10,25,47,0.2) 40%, transparent 60%)",
          }}
        />
      </div>

      <span className="absolute top-0 left-0 right-0 h-[2px] bg-gold transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

      <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4">
        <div className="font-cinzel text-ivory tracking-[0.15em] text-xs md:text-sm font-normal">
          {s.tray}
        </div>
        <div className="mt-0.5 font-cinzel text-ivory/70 text-[9px] md:text-[10px] tracking-[0.1em]">
          {s.horizon}
        </div>
      </div>

      <span className="absolute top-2 right-2 w-2.5 h-2.5 border-t border-r border-gold/80" />
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// Act 2 — Exploration
// ═══════════════════════════════════════════════════════════════════

function ExplorationAct({ t }: { t: Loc }) {
  return (
    <div className="relative py-20 md:py-28 border-t border-gold/25 bg-ivory-dark/25">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1 }}
          className="mb-10 md:mb-14"
        >
          <div className="font-cinzel text-jade tracking-[0.55em] text-[10px] md:text-xs mb-3 uppercase">
            {t.explSupra}
          </div>
          <h2 className="font-cinzel text-sovereign tracking-[0.06em] text-3xl md:text-5xl font-light leading-tight">
            {t.explTitleA}
            <span className="font-normal"> {t.explTitleB}</span>
          </h2>
          <div className="mt-4 font-cormorant italic text-[#7A1F1F] text-base md:text-lg">
            {t.explSubtitle}
          </div>
          <div
            className="mt-5 h-[3px] w-20"
            style={{
              background:
                "linear-gradient(90deg, #B8954A 0%, #1A3A2A 50%, #7A1F1F 100%)",
            }}
          />
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-gold/25 mb-10 md:mb-12">
          {t.explStats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="bg-sovereign text-center py-6 px-3 relative"
            >
              <span className="absolute top-0 left-[25%] right-[25%] h-[3px] bg-gold" />
              <div
                className="font-cinzel text-gold text-xl md:text-2xl lg:text-[26px] font-light leading-none"
                dir="ltr"
              >
                <CountUpIvory to={s.value} display={s.display} decimals={s.decimals ?? 0} />
              </div>
              <div className="mt-2 font-cinzel text-ivory/70 tracking-[0.2em] text-[9px] uppercase">
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-5 md:gap-6 mb-8 md:mb-10">
          <BlockCard label={t.execSummaryLabel}>
            <p>
              <strong>{t.execSummary1Company}</strong>
              {t.execSummary1Mid1}
              <strong>{t.execSummary1Area}</strong>
              {t.execSummary1Mid2}
              <strong>{t.execSummary1Tech}</strong>
              {t.execSummary1Mid3}
              <strong>{t.execSummary1Km2}</strong>
              {t.execSummary1Mid4}
              <strong>{t.execSummary1Anom}</strong>
              {t.execSummary1End}
            </p>
            <p className="mt-3">
              {t.execSummary2Pre}
              <strong>{t.execSummary2Res}</strong>
              {t.execSummary2Mid}
              <strong>{t.execSummary2Coord}</strong>
              {t.execSummary2End}
            </p>
          </BlockCard>

          <BlockCard label={t.geoSettingLabel}>
            <p>
              {t.geoBody1Pre}
              <strong>{t.geoBody1Strong}</strong>
              {t.geoBody1End}
            </p>
            <p className="mt-3">
              {t.geoBody2Pre}
              <strong>{t.geoBody2Rate}</strong>
              {t.geoBody2Mid1}
              <strong>{t.geoBody2Acc}</strong>
              {t.geoBody2Mid2}
              <strong>{t.geoBody2Dep}</strong>
              {t.geoBody2End}
            </p>
          </BlockCard>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9 }}
          className="relative bg-sovereign p-5 md:p-6"
          style={{ borderLeft: "4px solid #B8954A" }}
        >
          <div className="font-cinzel text-gold tracking-[0.3em] text-[10px] md:text-xs uppercase mb-3">
            {t.priorityLabel}
          </div>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {t.priorityTargets.map((tg, i) => (
              <div key={tg.id} className="flex items-center gap-3">
                <div>
                  <span className="font-cinzel text-gold font-semibold tracking-wider text-sm md:text-base">
                    {tg.id}
                  </span>
                  <span className="ml-2 font-cinzel text-ivory/80 text-xs md:text-sm tabular-nums">
                    {tg.m2} · {tg.depth}
                  </span>
                </div>
                {i < t.priorityTargets.length - 1 && (
                  <span className="w-px h-4 bg-gold/30 hidden md:block" />
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function BlockCard({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8 }}
      className="relative flex flex-col overflow-hidden"
      style={{
        background: "rgba(10,25,47,0.04)",
        border: "1px solid rgba(184,149,74,0.3)",
      }}
    >
      <div
        className="px-4 md:px-5 py-2.5 flex items-center bg-sovereign"
        style={{ borderTop: "3px solid #B8954A" }}
      >
        <span className="font-cinzel text-gold-bright tracking-[0.3em] text-[10px] md:text-xs uppercase font-semibold">
          {label}
        </span>
      </div>
      <div className="font-cormorant text-sovereign/85 text-[14.5px] md:text-[15.5px] leading-[1.75] p-4 md:p-5">
        {children}
      </div>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// Credibility Strip
// ═══════════════════════════════════════════════════════════════════

function CredibilityStrip({ t }: { t: Loc }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 1.2 }}
      className="relative py-10 md:py-12 bg-ivory-dark/40 border-t border-gold/30"
    >
      <div className="container mx-auto px-6 md:px-12 max-w-6xl">
        <div
          className="relative p-4 md:p-5"
          style={{
            background: "rgba(184,149,74,0.07)",
            borderLeft: "4px solid #B8954A",
          }}
        >
          <div className="font-cinzel text-gold tracking-[0.3em] text-[10px] md:text-xs uppercase mb-1.5">
            {t.validatedBy}
          </div>
          <p className="font-cormorant italic text-sovereign/75 text-[12.5px] md:text-sm leading-relaxed">
            {t.validationPre}
            <strong className="text-sovereign not-italic">
              {t.validationCompany}
            </strong>
            {t.validationMid}
            <span className="tabular-nums">SLCX2025-05-01</span>
            {" · Invoice "}
            <span className="tabular-nums">DL25061B</span>
            {" (08 June 2025) ·"}
            {t.validationEnd}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
