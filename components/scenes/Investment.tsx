"use client";

/**
 * ╔═══════════════════════════════════════════════════════════════════╗
 * ║  INVESTMENT — The Money Page                                      ║
 * ╠═══════════════════════════════════════════════════════════════════╣
 * ║  Where evidence meets economics. Sovereign-dark dossier with      ║
 * ║  institutional-grade financial modeling and partnership offers.   ║
 * ║                                                                   ║
 * ║   Act 1 · INVESTMENT CASE                                         ║
 * ║           Hero ROI 2.3x + 6 key metrics grid +                    ║
 * ║           3-scenario analysis table (Conservative / Base / Up)    ║
 * ║                                                                   ║
 * ║   Act 2 · P&L WATERFALL                                           ║
 * ║           Horizontal animated bars — Revenue → OPEX → CAPEX →     ║
 * ║           Tax → Net Profit ($470M → $128M @ 200K oz base case)    ║
 * ║                                                                   ║
 * ║   Act 3 · RISK ASSESSMENT                                         ║
 * ║           5 risks with calibrated gold-intensity meters           ║
 * ║           (no off-palette colors — Ivory+Gold only)               ║
 * ║                                                                   ║
 * ║   Act 4 · EXIT STRATEGIES                                         ║
 * ║           3 pathways (Develop · Sell Post-PFS · JV) with ranges   ║
 * ║                                                                   ║
 * ║   Act 5 · PARTNERSHIP FRAMEWORK                                   ║
 * ║           Option A (Joint OpCo) vs Option B (PSA) + 7-row         ║
 * ║           comparison table + 4-step process flow                  ║
 * ║                                                                   ║
 * ║   Closing: Disclaimer strip (JORC Inferred, forward-looking).    ║
 * ║                                                                   ║
 * ║  Sources (verbatim data):                                         ║
 * ║   - page21_investment_EN.html                                     ║
 * ║   - page22_jv_EN.html                                             ║
 * ║   - page23_partnership_EN.html                                    ║
 * ╚═══════════════════════════════════════════════════════════════════╝
 */

import { motion, useInView, animate } from "framer-motion";
import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import type { Dict, SceneProps } from "@/lib/i18n";

// ═══════════════════════════════════════════════════════════════════
// Data
// ═══════════════════════════════════════════════════════════════════

type Loc = {
  hero: { supra: string; titleA: string; titleB: string; subtitle: string; baseReturn: string; onCapex: string; netProfit: string; mineLife: string };
  keyMetrics: { val: string; lbl: string; highlight?: boolean }[];
  scen: { header: string; subtitle: string; colScenario: string; colResource: string; colGross: string; colCapex: string; colOpex: string; colTax: string; colNet: string; colRoi: string };
  scenarios: { name: string; resource: string; gross: string; capex: string; opex: string; tax: string; net: string; roi: string; highlight: boolean }[];
  waterfall: { header: string; subtitle: string; rows: { label: string; value: string; width: number; type: "positive" | "negative" | "result" }[] };
  risk: { header: string; subtitle: string; rows: { name: string; level: string; intensity: number }[] };
  exit: { header: string; subtitle: string; returnLabel: string; items: { letter: string; title: string; desc: string; value: string }[] };
  partner: {
    supra: string;
    titleA: string;
    titleB: string;
    subtitle: string;
    optA: string;
    optB: string;
    termHeader: string;
    optAFull: string;
    optBFull: string;
    pathHeader: string;
    retainedLabel: string;
    retainedBodyPre: string;
    retainedBodyAll: string;
    retainedBodyMid: string;
    retainedBodyAsset: string;
    retainedBodyEnd: string;
    options: { badge: string; title: string; subtitle: string; bullets: string[] }[];
    terms: { k: string; a: string; b: string }[];
    flow: { num: string; text: string }[];
  };
  disclaimer: { title: string; bodyPre: string; bodyInf: string; bodyMid: string; goldPrice: string; bodyMid2: string; aisc: string; bodyEnd: string };
};

const DICT: Dict<Loc> = {
  en: {
    hero: { supra: "INVESTMENT CASE", titleA: "THE MONEY", titleB: "ARGUMENT", subtitle: "Three scenarios · Base ROI 2.3× · Gold @ $2,350 / oz", baseReturn: "Base Case Return", onCapex: "On", netProfit: "CAPEX · Net profit", mineLife: "over 5–7 year mine life." },
    keyMetrics: [
      { val: "2.3x", lbl: "Base Case ROI", highlight: true },
      { val: "$128M", lbl: "Net Profit (Base)" },
      { val: "$1,200", lbl: "AISC per oz" },
      { val: "5–7 yrs", lbl: "Mine Life" },
      { val: "$2,350", lbl: "Gold Price Basis" },
      { val: "$55M", lbl: "Total CAPEX" },
    ],
    scen: { header: "Investment Scenario Analysis", subtitle: "Three modeled outcomes — all assume gold at $2,350 / oz", colScenario: "Scenario", colResource: "Resource (oz)", colGross: "Gross", colCapex: "CAPEX", colOpex: "OPEX", colTax: "Tax", colNet: "Net Profit", colRoi: "ROI" },
    scenarios: [
      { name: "Conservative", resource: "125,000", gross: "$294M", capex: "$50M", opex: "$150M", tax: "$30M", net: "$64M", roi: "1.3x", highlight: false },
      { name: "Base Case", resource: "200,000", gross: "$470M", capex: "$55M", opex: "$240M", tax: "$47M", net: "$128M", roi: "2.3x", highlight: true },
      { name: "Upside", resource: "300,000", gross: "$705M", capex: "$65M", opex: "$360M", tax: "$71M", net: "$209M", roi: "3.2x", highlight: false },
    ],
    waterfall: { header: "Base Case P&L Waterfall · 200K oz", subtitle: "From gross revenue to net profit — every dollar traced", rows: [
      { label: "Gross Revenue", value: "$470M", width: 100, type: "positive" },
      { label: "OPEX (@ $1,200/oz)", value: "-$240M", width: 51, type: "negative" },
      { label: "CAPEX", value: "-$55M", width: 12, type: "negative" },
      { label: "Tax & Royalties", value: "-$47M", width: 10, type: "negative" },
      { label: "Net Profit", value: "$128M", width: 27, type: "result" },
    ] },
    risk: { header: "Risk Assessment", subtitle: "Calibrated exposure map — gold intensity reflects severity", rows: [
      { name: "Geological (Grade confirmed by RC)", level: "Low", intensity: 25 },
      { name: "Gold Price Volatility", level: "Medium", intensity: 50 },
      { name: "Permitting (Secured through 2030)", level: "Low", intensity: 20 },
      { name: "Political / Regulatory", level: "Medium", intensity: 45 },
      { name: "Resource Upgrade (Inferred → Indicated)", level: "Med-High", intensity: 60 },
    ] },
    exit: { header: "Exit Strategies", subtitle: "Three pathways to value realization", returnLabel: "Expected Return", items: [
      { letter: "A", title: "Develop & Operate", desc: "Build mine, produce 200K+ oz over 5–7 years. Full value capture but highest capital commitment.", value: "$128M+" },
      { letter: "B", title: "Sell Post-PFS", desc: "Complete Phase 2, confirm Indicated resource, sell concession to major producer. Lowest risk, fastest return.", value: "$40–60M" },
      { letter: "C", title: "Joint Venture", desc: "Partner with major for development. Retain 30–40% equity, share CAPEX. Balanced risk-return profile.", value: "$50–80M" },
    ] },
    partner: {
      supra: "JOINT VENTURE FRAMEWORK",
      titleA: "TWO PATHS TO",
      titleB: "SOVEREIGN PARTNERSHIP",
      subtitle: "Karangasso Gold Concession · Indicative CAPEX $50M",
      optA: "Option A · Joint OpCo",
      optB: "Option B · PSA",
      termHeader: "Term",
      optAFull: "Option A · Joint OpCo",
      optBFull: "Option B · PSA",
      pathHeader: "Path to Execution",
      retainedLabel: "Sovereign Retained",
      retainedBodyPre: "Under ",
      retainedBodyAll: "all partnership configurations",
      retainedBodyMid: ", Kangala Holding Group retains ",
      retainedBodyAsset: "100% AssetCo ownership",
      retainedBodyEnd: " of all mineral rights. The sovereign asset is never dilutable.",
      options: [
        { badge: "Option A", title: "Operational Partnership", subtitle: "Joint OpCo · Negotiable Equity", bullets: [
          "Jointly owned OpCo with negotiable equity splits",
          "Kangala retains 100% AssetCo ownership of all mineral rights",
          "Shared operational governance with Joint Board representation",
          "Dividend distribution per partnership agreement",
          "Full JORC-aligned reporting and transparency obligations",
        ] },
        { badge: "Option B", title: "Production Sharing (PSA)", subtitle: "Fast-Track Cost Recovery", bullets: [
          "Accelerated cost recovery for partner CAPEX contribution",
          "Post-recovery production split model (70 / 30 indicative)",
          "Direct operational control with Kangala oversight",
          "Kangala retains 100% AssetCo ownership of all mineral rights",
          "Technical Committee governance with quarterly review",
        ] },
      ],
      terms: [
        { k: "Structure", a: "Jointly owned Operating Company", b: "Production Sharing Agreement" },
        { k: "Equity Split", a: "Negotiable — aligned to contribution", b: "N/A — cost recovery model" },
        { k: "AssetCo Ownership", a: "100% Kangala — sovereign retained", b: "100% Kangala — sovereign retained" },
        { k: "CAPEX Recovery", a: "Shared pro-rata", b: "Fast-track cost recovery from production" },
        { k: "Governance", a: "Joint Board — equal representation", b: "Technical Committee — quarterly review" },
        { k: "Profit Distribution", a: "Dividends per agreement", b: "Post-recovery split (70/30 indicative)" },
        { k: "Reporting", a: "JORC 2012 — UAE SCA recognised", b: "JORC 2012 — UAE SCA recognised" },
      ],
      flow: [
        { num: "01", text: "Joint Technical\nCommittee" },
        { num: "02", text: "Definitive\nFeasibility Study" },
        { num: "03", text: "Board\nApproval" },
        { num: "04", text: "Financial\nCommitment" },
      ],
    },
    disclaimer: { title: "Important Disclaimer", bodyPre: "This investment case is based on ", bodyInf: "Inferred resources", bodyMid: " (JORC 2012). Forward-looking statements involve risk and uncertainty; actual results may differ materially. Gold price assumption: ", goldPrice: "$2,350 / oz", bodyMid2: ". OPEX modelled at ", aisc: "$1,200 / oz AISC", bodyEnd: ". All partnership terms indicative and subject to final agreement. This document does not constitute financial advice. Independent due diligence is recommended." },
  },
  fr: {
    hero: { supra: "CAS D'INVESTISSEMENT", titleA: "L'ARGUMENT", titleB: "FINANCIER", subtitle: "Trois scénarios · ROI de base 2,3× · Or @ 2\u202f350 $ / oz", baseReturn: "Rendement Cas de Base", onCapex: "Sur", netProfit: "CAPEX · Bénéfice net", mineLife: "sur une durée de vie de mine de 5–7 ans." },
    keyMetrics: [
      { val: "2,3x", lbl: "ROI Cas de Base", highlight: true },
      { val: "128 M$", lbl: "Bénéfice Net (Base)" },
      { val: "1\u202f200 $", lbl: "AISC par oz" },
      { val: "5–7 ans", lbl: "Durée de Mine" },
      { val: "2\u202f350 $", lbl: "Prix Or Base" },
      { val: "55 M$", lbl: "CAPEX Total" },
    ],
    scen: { header: "Analyse des Scénarios d'Investissement", subtitle: "Trois résultats modélisés — tous supposent l'or à 2\u202f350 $ / oz", colScenario: "Scénario", colResource: "Ressource (oz)", colGross: "Brut", colCapex: "CAPEX", colOpex: "OPEX", colTax: "Impôt", colNet: "Bénéfice Net", colRoi: "ROI" },
    scenarios: [
      { name: "Conservateur", resource: "125\u202f000", gross: "294 M$", capex: "50 M$", opex: "150 M$", tax: "30 M$", net: "64 M$", roi: "1,3x", highlight: false },
      { name: "Cas de Base", resource: "200\u202f000", gross: "470 M$", capex: "55 M$", opex: "240 M$", tax: "47 M$", net: "128 M$", roi: "2,3x", highlight: true },
      { name: "Hausse", resource: "300\u202f000", gross: "705 M$", capex: "65 M$", opex: "360 M$", tax: "71 M$", net: "209 M$", roi: "3,2x", highlight: false },
    ],
    waterfall: { header: "Cascade P&L Cas de Base · 200\u202fK oz", subtitle: "Du revenu brut au bénéfice net — chaque dollar tracé", rows: [
      { label: "Revenu Brut", value: "470 M$", width: 100, type: "positive" },
      { label: "OPEX (@ 1\u202f200 $/oz)", value: "-240 M$", width: 51, type: "negative" },
      { label: "CAPEX", value: "-55 M$", width: 12, type: "negative" },
      { label: "Impôts & Redevances", value: "-47 M$", width: 10, type: "negative" },
      { label: "Bénéfice Net", value: "128 M$", width: 27, type: "result" },
    ] },
    risk: { header: "Évaluation des Risques", subtitle: "Carte d'exposition calibrée — l'intensité de l'or reflète la sévérité", rows: [
      { name: "Géologique (Teneur confirmée par RC)", level: "Faible", intensity: 25 },
      { name: "Volatilité du Prix de l'Or", level: "Moyen", intensity: 50 },
      { name: "Permis (Sécurisés jusqu'en 2030)", level: "Faible", intensity: 20 },
      { name: "Politique / Réglementaire", level: "Moyen", intensity: 45 },
      { name: "Mise à niveau Ressource (Inférée → Indiquée)", level: "Moy-Élevé", intensity: 60 },
    ] },
    exit: { header: "Stratégies de Sortie", subtitle: "Trois voies vers la réalisation de valeur", returnLabel: "Rendement Attendu", items: [
      { letter: "A", title: "Développer & Exploiter", desc: "Construire la mine, produire 200\u202fK+ oz sur 5–7 ans. Capture de valeur totale mais engagement en capital le plus élevé.", value: "128 M$+" },
      { letter: "B", title: "Vendre Post-PFS", desc: "Compléter la Phase 2, confirmer la ressource Indiquée, vendre la concession à un producteur majeur. Risque le plus faible, retour le plus rapide.", value: "40–60 M$" },
      { letter: "C", title: "Coentreprise", desc: "S'associer avec un majeur pour le développement. Conserver 30–40\u202f% d'équité, partager le CAPEX. Profil risque-rendement équilibré.", value: "50–80 M$" },
    ] },
    partner: {
      supra: "CADRE DE COENTREPRISE",
      titleA: "DEUX VOIES VERS",
      titleB: "UN PARTENARIAT SOUVERAIN",
      subtitle: "Concession Aurifère Karangasso · CAPEX indicatif 50 M$",
      optA: "Option A · OpCo Conjointe",
      optB: "Option B · PSA",
      termHeader: "Terme",
      optAFull: "Option A · OpCo Conjointe",
      optBFull: "Option B · PSA",
      pathHeader: "Voie d'Exécution",
      retainedLabel: "Souveraineté Retenue",
      retainedBodyPre: "Sous ",
      retainedBodyAll: "toutes les configurations de partenariat",
      retainedBodyMid: ", Kangala Holding Group conserve ",
      retainedBodyAsset: "100\u202f% de la propriété AssetCo",
      retainedBodyEnd: " de tous les droits miniers. L'actif souverain n'est jamais dilutable.",
      options: [
        { badge: "Option A", title: "Partenariat Opérationnel", subtitle: "OpCo Conjointe · Équité Négociable", bullets: [
          "OpCo conjointement détenue avec répartition d'équité négociable",
          "Kangala conserve 100\u202f% de la propriété AssetCo de tous les droits miniers",
          "Gouvernance opérationnelle partagée avec représentation au Conseil Conjoint",
          "Distribution de dividendes selon l'accord de partenariat",
          "Obligations complètes de reporting et transparence alignées JORC",
        ] },
        { badge: "Option B", title: "Partage de Production (PSA)", subtitle: "Récupération Rapide des Coûts", bullets: [
          "Récupération accélérée des coûts pour la contribution CAPEX du partenaire",
          "Modèle de partage de production post-récupération (70 / 30 indicatif)",
          "Contrôle opérationnel direct avec supervision Kangala",
          "Kangala conserve 100\u202f% de la propriété AssetCo de tous les droits miniers",
          "Gouvernance par Comité Technique avec revue trimestrielle",
        ] },
      ],
      terms: [
        { k: "Structure", a: "Société d'Exploitation conjointement détenue", b: "Accord de Partage de Production" },
        { k: "Répartition d'Équité", a: "Négociable — alignée à la contribution", b: "S.O. — modèle de récupération des coûts" },
        { k: "Propriété AssetCo", a: "100\u202f% Kangala — souveraineté retenue", b: "100\u202f% Kangala — souveraineté retenue" },
        { k: "Récupération CAPEX", a: "Partagée pro-rata", b: "Récupération rapide des coûts sur production" },
        { k: "Gouvernance", a: "Conseil Conjoint — représentation égale", b: "Comité Technique — revue trimestrielle" },
        { k: "Distribution Profits", a: "Dividendes selon accord", b: "Partage post-récupération (70/30 indicatif)" },
        { k: "Reporting", a: "JORC 2012 — reconnu UAE SCA", b: "JORC 2012 — reconnu UAE SCA" },
      ],
      flow: [
        { num: "01", text: "Comité Technique\nConjoint" },
        { num: "02", text: "Étude de Faisabilité\nDéfinitive" },
        { num: "03", text: "Approbation\ndu Conseil" },
        { num: "04", text: "Engagement\nFinancier" },
      ],
    },
    disclaimer: { title: "Avertissement Important", bodyPre: "Ce cas d'investissement est basé sur des ", bodyInf: "ressources Inférées", bodyMid: " (JORC 2012). Les déclarations prospectives impliquent risque et incertitude\u202f; les résultats réels peuvent différer matériellement. Hypothèse prix de l'or\u202f: ", goldPrice: "2\u202f350 $ / oz", bodyMid2: ". OPEX modélisé à ", aisc: "1\u202f200 $ / oz AISC", bodyEnd: ". Tous les termes de partenariat sont indicatifs et soumis à accord final. Ce document ne constitue pas un conseil financier. Une due diligence indépendante est recommandée." },
  },
};

const LocCtx = createContext<Loc>(DICT.en);
function useLoc(): Loc {
  return useContext(LocCtx);
}

// ═══════════════════════════════════════════════════════════════════
// CountUp Hero ROI
// ═══════════════════════════════════════════════════════════════════

function HeroROICountUp() {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [val, setVal] = useState("0.0");

  useEffect(() => {
    if (!inView) return;
    const c = animate(0, 2.3, {
      duration: 2.4,
      ease: [0.22, 1, 0.36, 1],
      onUpdate(v) {
        setVal(v.toFixed(1));
      },
    });
    return () => c.stop();
  }, [inView]);

  return (
    <span ref={ref} className="tabular-nums">
      {val}x
    </span>
  );
}

// ═══════════════════════════════════════════════════════════════════
// Main
// ═══════════════════════════════════════════════════════════════════

export default function Investment({ lang = "en" }: SceneProps = {}) {
  const t = useMemo(() => DICT[lang], [lang]);
  return (
    <LocCtx.Provider value={t}>
    <section className="relative w-full bg-sovereign text-ivory overflow-hidden">
      {/* Ambient gold wash */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 20%, rgba(184,149,74,0.07) 0%, transparent 60%)",
        }}
      />

      {/* Subtle HUD grid */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(184,149,74,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(184,149,74,0.5) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <InvestmentHeroAct />
      <ScenarioAct />
      <WaterfallAct />
      <RiskAct />
      <ExitAct />
      <PartnershipAct />
      <DisclaimerStrip />
    </section>
    </LocCtx.Provider>
  );
}

// ═══════════════════════════════════════════════════════════════════
// Act 1 — Hero ROI + Key Metrics
// ═══════════════════════════════════════════════════════════════════

function InvestmentHeroAct() {
  const t = useLoc();
  return (
    <div className="relative py-24 md:py-32">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-14 md:mb-16"
        >
          <div className="font-cinzel text-gold tracking-[0.55em] text-[10px] md:text-xs mb-3 opacity-90">
            {t.hero.supra} · حالة الاستثمار
          </div>
          <h2 className="font-cinzel text-ivory tracking-[0.1em] text-3xl md:text-5xl lg:text-6xl font-light leading-tight">
            {t.hero.titleA}
            <br />
            <span className="text-gold-gradient">{t.hero.titleB}</span>
          </h2>
          <div className="mt-5 font-cormorant italic text-gold/80 text-base md:text-lg">
            {t.hero.subtitle}
          </div>
        </motion.div>

        {/* Hero ROI block */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative mb-10 md:mb-14"
        >
          <div
            className="relative py-8 md:py-10 px-6 md:px-10 text-center"
            style={{
              background:
                "linear-gradient(135deg, rgba(184,149,74,0.12) 0%, rgba(184,149,74,0.03) 100%)",
              border: "1px solid rgba(184,149,74,0.45)",
            }}
          >
            <span className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-gold" />
            <span className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-gold" />
            <span className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-gold" />
            <span className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-gold" />

            <div className="font-cinzel text-gold/70 tracking-[0.4em] text-[10px] md:text-xs uppercase mb-2">
              {t.hero.baseReturn}
            </div>
            <div
              className="font-cinzel text-gold-gradient text-7xl md:text-9xl font-light leading-none tracking-tight"
              dir="ltr"
            >
              <HeroROICountUp />
            </div>
            <div className="mt-3 font-cormorant italic text-ivory/70 text-sm md:text-base max-w-2xl mx-auto">
              {t.hero.onCapex} <strong className="text-ivory not-italic">{t.keyMetrics[5].val}</strong> {t.hero.netProfit}{" "}
              <strong className="text-gold not-italic">{t.keyMetrics[1].val}</strong> {t.hero.mineLife}
            </div>
          </div>
        </motion.div>

        {/* 6-metric grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-gold/20">
          {t.keyMetrics.map((m, i) => (
            <motion.div
              key={m.lbl}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: i * 0.06 }}
              className="bg-sovereign text-center py-6 px-3 relative"
            >
              <span
                className={`absolute top-0 left-[25%] right-[25%] h-[3px] ${
                  m.highlight ? "bg-gold" : "bg-gold/50"
                }`}
              />
              <div
                className={`font-cinzel ${
                  m.highlight ? "text-gold-gradient" : "text-gold"
                } text-xl md:text-2xl lg:text-[26px] font-light`}
                dir="ltr"
              >
                {m.val}
              </div>
              <div className="mt-1.5 font-cinzel text-ivory/55 tracking-[0.2em] text-[9px] uppercase">
                {m.lbl}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// Act 2 — Scenario Table
// ═══════════════════════════════════════════════════════════════════

function ScenarioAct() {
  const t = useLoc();
  return (
    <div className="relative py-16 md:py-20 border-t border-gold/15">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9 }}
          className="mb-6"
        >
          <div className="font-cinzel text-gold tracking-[0.35em] text-[10px] uppercase mb-1.5">
            {t.scen.header}
          </div>
          <div className="font-cormorant italic text-ivory/60 text-sm md:text-base">
            {t.scen.subtitle}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="overflow-x-auto relative"
          style={{ border: "1px solid rgba(184,149,74,0.35)" }}
        >
          <span className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-gold pointer-events-none" />
          <span className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-gold pointer-events-none" />
          <span className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-gold pointer-events-none" />
          <span className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-gold pointer-events-none" />

          <table className="w-full min-w-[720px]">
            <thead>
              <tr
                className="font-cinzel text-gold-bright tracking-[0.2em] text-[9px] md:text-[10px] uppercase"
                style={{
                  background: "rgba(184,149,74,0.08)",
                  borderBottom: "2px solid #B8954A",
                }}
              >
                <th className="text-left px-4 py-3 font-semibold">{t.scen.colScenario}</th>
                <th className="text-center px-3 py-3 font-semibold">{t.scen.colResource}</th>
                <th className="text-center px-3 py-3 font-semibold">{t.scen.colGross}</th>
                <th className="text-center px-3 py-3 font-semibold">{t.scen.colCapex}</th>
                <th className="text-center px-3 py-3 font-semibold">{t.scen.colOpex}</th>
                <th className="text-center px-3 py-3 font-semibold">{t.scen.colTax}</th>
                <th className="text-center px-3 py-3 font-semibold">{t.scen.colNet}</th>
                <th className="text-center px-3 py-3 font-semibold">{t.scen.colRoi}</th>
              </tr>
            </thead>
            <tbody className="font-cinzel text-ivory tabular-nums">
              {t.scenarios.map((s) => (
                <tr
                  key={s.name}
                  style={{
                    background: s.highlight ? "rgba(184,149,74,0.1)" : undefined,
                    borderBottom: "1px solid rgba(184,149,74,0.12)",
                  }}
                >
                  <td
                    className={`text-left px-4 py-3 tracking-[0.15em] text-[11px] uppercase font-semibold ${
                      s.highlight ? "text-gold" : "text-gold-bright"
                    }`}
                  >
                    {s.highlight && (
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-gold mr-2 align-middle" />
                    )}
                    {s.name}
                  </td>
                  <td className="text-center px-3 py-3 text-sm">{s.resource}</td>
                  <td className="text-center px-3 py-3 text-sm">{s.gross}</td>
                  <td className="text-center px-3 py-3 text-sm">{s.capex}</td>
                  <td className="text-center px-3 py-3 text-sm">{s.opex}</td>
                  <td className="text-center px-3 py-3 text-sm">{s.tax}</td>
                  <td className="text-center px-3 py-3 text-sm font-semibold">{s.net}</td>
                  <td
                    className={`text-center px-3 py-3 font-semibold ${
                      s.highlight ? "text-gold-gradient text-lg" : "text-gold text-base"
                    }`}
                  >
                    {s.roi}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// Act 3 — P&L Waterfall
// ═══════════════════════════════════════════════════════════════════

function WaterfallAct() {
  const t = useLoc();
  return (
    <div className="relative py-16 md:py-20 border-t border-gold/15">
      <div className="container mx-auto px-6 md:px-12 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9 }}
          className="mb-6"
        >
          <div className="font-cinzel text-gold tracking-[0.35em] text-[10px] uppercase mb-1.5">
            {t.waterfall.header}
          </div>
          <div className="font-cormorant italic text-ivory/60 text-sm md:text-base">
            {t.waterfall.subtitle}
          </div>
        </motion.div>

        <div
          className="relative p-6 md:p-8"
          style={{
            background: "rgba(6,16,34,0.5)",
            border: "1px solid rgba(184,149,74,0.3)",
          }}
        >
          <div className="space-y-3.5">
            {t.waterfall.rows.map((row, i) => (
              <WaterfallRow key={row.label} row={row} index={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function WaterfallRow({
  row,
  index,
}: {
  row: Loc["waterfall"]["rows"][number];
  index: number;
}) {
  const isResult = row.type === "result";
  // Bar fill pattern — gold intensity varies by role.
  const barBackground =
    row.type === "positive"
      ? "linear-gradient(90deg, #B8954A 0%, #D4AF5A 100%)"
      : row.type === "result"
      ? "linear-gradient(90deg, #D4AF5A 0%, #F5E0A0 100%)"
      : "rgba(184,149,74,0.35)"; // negative = muted

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: index * 0.12 }}
      className={`flex items-center gap-3 md:gap-4 ${
        isResult ? "pt-3 border-t border-gold/25" : ""
      }`}
    >
      {/* Label */}
      <div
        className={`w-[120px] md:w-[180px] font-cinzel tracking-[0.15em] text-[10px] md:text-[11px] uppercase flex-shrink-0 ${
          isResult ? "text-gold font-semibold" : "text-ivory/75"
        }`}
      >
        {row.label}
      </div>

      {/* Bar */}
      <div className="flex-1 h-5 md:h-6 bg-sovereign-deep/40 overflow-hidden relative">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${row.width}%` }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 1.2,
            delay: 0.2 + index * 0.12,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="h-full"
          style={{
            background: barBackground,
            border: row.type === "negative" ? "1px solid rgba(184,149,74,0.5)" : undefined,
          }}
        />
      </div>

      {/* Value */}
      <div
        className={`w-[70px] md:w-[90px] text-right font-cinzel tabular-nums text-[13px] md:text-base font-semibold flex-shrink-0 ${
          isResult ? "text-gold-gradient" : "text-ivory"
        }`}
      >
        {row.value}
      </div>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// Act 4 — Risk Assessment (gold-intensity meters)
// ═══════════════════════════════════════════════════════════════════

function RiskAct() {
  const t = useLoc();
  return (
    <div className="relative py-16 md:py-20 border-t border-gold/15">
      <div className="container mx-auto px-6 md:px-12 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9 }}
          className="mb-6"
        >
          <div className="font-cinzel text-gold tracking-[0.35em] text-[10px] uppercase mb-1.5">
            {t.risk.header}
          </div>
          <div className="font-cormorant italic text-ivory/60 text-sm md:text-base">
            {t.risk.subtitle}
          </div>
        </motion.div>

        <div
          className="p-5 md:p-6"
          style={{
            background: "rgba(6,16,34,0.5)",
            border: "1px solid rgba(184,149,74,0.3)",
          }}
        >
          <div className="space-y-3">
            {t.risk.rows.map((r, i) => (
              <RiskRow key={r.name} r={r} index={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function RiskRow({
  r,
  index,
}: {
  r: Loc["risk"]["rows"][number];
  index: number;
}) {
  // Map intensity to a gold opacity for the "level pill" — higher = more opaque gold.
  const pillOpacity = 0.35 + (r.intensity / 100) * 0.6;

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      className="grid grid-cols-[1fr_auto_120px] md:grid-cols-[1fr_100px_180px] items-center gap-3 md:gap-4"
    >
      {/* Risk name */}
      <div className="font-cormorant text-ivory/85 text-sm md:text-base">
        {r.name}
      </div>

      {/* Level pill */}
      <div
        className="text-center px-3 py-1 font-cinzel tracking-[0.18em] text-[9px] md:text-[10px] uppercase font-semibold text-sovereign"
        style={{
          background: `rgba(184,149,74,${pillOpacity})`,
          border: "1px solid rgba(184,149,74,0.5)",
        }}
      >
        {r.level}
      </div>

      {/* Intensity meter */}
      <div className="h-2 bg-sovereign-deep/60 relative overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${r.intensity}%` }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 1.1,
            delay: 0.2 + index * 0.08,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="h-full"
          style={{
            background: `linear-gradient(90deg, rgba(184,149,74,${pillOpacity}) 0%, #D4AF5A 100%)`,
          }}
        />
      </div>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// Act 5 — Exit Strategies
// ═══════════════════════════════════════════════════════════════════

function ExitAct() {
  const t = useLoc();
  return (
    <div className="relative py-16 md:py-20 border-t border-gold/15">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9 }}
          className="mb-8 md:mb-10"
        >
          <div className="font-cinzel text-gold tracking-[0.35em] text-[10px] uppercase mb-1.5">
            {t.exit.header}
          </div>
          <div className="font-cormorant italic text-ivory/60 text-sm md:text-base">
            {t.exit.subtitle}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {t.exit.items.map((e, i) => (
            <motion.div
              key={e.letter}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.8,
                delay: i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative p-5 md:p-6 flex flex-col"
              style={{
                background: "rgba(6,16,34,0.55)",
                border: "1px solid rgba(184,149,74,0.3)",
                borderLeft: "3px solid #B8954A",
              }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-10 h-10 flex items-center justify-center bg-gold font-cinzel text-ivory text-base font-bold"
                >
                  {e.letter}
                </div>
                <div className="font-cinzel text-gold-bright tracking-[0.2em] text-sm font-semibold uppercase">
                  {e.title}
                </div>
              </div>
              <p className="font-cormorant text-ivory/75 text-sm leading-relaxed mb-4 flex-1">
                {e.desc}
              </p>
              <div className="pt-3 border-t border-gold/15 flex items-baseline justify-between">
                <span className="font-cinzel text-ivory/45 tracking-[0.25em] text-[9px] uppercase">
                  {t.exit.returnLabel}
                </span>
                <span className="font-cinzel text-gold-gradient text-lg md:text-xl font-light tabular-nums">
                  {e.value}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// Act 6 — Partnership Framework (JV)
// ═══════════════════════════════════════════════════════════════════

function PartnershipAct() {
  const t = useLoc();
  return (
    <div className="relative py-20 md:py-28 border-t border-gold/20 bg-sovereign-deep/30">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1 }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="font-cinzel text-gold tracking-[0.5em] text-[10px] md:text-xs mb-3 opacity-90">
            {t.partner.supra} · إطار الشراكة
          </div>
          <h2 className="font-cinzel text-ivory tracking-[0.08em] text-3xl md:text-4xl lg:text-5xl font-light leading-tight">
            {t.partner.titleA}
            <br />
            <span className="text-gold-gradient">{t.partner.titleB}</span>
          </h2>
          <div className="mt-4 font-cormorant italic text-gold/75 text-base md:text-lg">
            {t.partner.subtitle}
          </div>
        </motion.div>

        {/* 2 options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 mb-12">
          {t.partner.options.map((opt, i) => (
            <JvOptionCard key={opt.badge} opt={opt} index={i} />
          ))}
        </div>

        {/* Comparison table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9 }}
          className="relative overflow-x-auto mb-10"
          style={{
            background: "rgba(6,16,34,0.4)",
            border: "1px solid rgba(184,149,74,0.3)",
          }}
        >
          <table className="w-full min-w-[720px]">
            <thead>
              <tr
                className="font-cinzel tracking-[0.22em] text-[10px] uppercase"
                style={{ borderBottom: "2px solid #B8954A" }}
              >
                <th className="text-left px-4 py-3 text-gold-bright font-semibold">{t.partner.termHeader}</th>
                <th className="text-left px-4 py-3 text-gold font-semibold">
                  {t.partner.optAFull}
                </th>
                <th className="text-left px-4 py-3 text-gold font-semibold">
                  {t.partner.optBFull}
                </th>
              </tr>
            </thead>
            <tbody className="font-cormorant text-ivory/85 text-[13px] md:text-sm">
              {t.partner.terms.map((row, i) => (
                <tr
                  key={row.k}
                  className={i % 2 === 1 ? "bg-gold/[0.04]" : ""}
                  style={{ borderBottom: "1px solid rgba(184,149,74,0.12)" }}
                >
                  <td className="px-4 py-2.5 font-cinzel tracking-[0.15em] text-[10px] uppercase text-gold-bright font-semibold">
                    {row.k}
                  </td>
                  <td className="px-4 py-2.5">{row.a}</td>
                  <td className="px-4 py-2.5">{row.b}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        {/* Process flow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9 }}
          className="mb-8"
        >
          <div className="font-cinzel text-gold tracking-[0.35em] text-[10px] uppercase mb-4 text-center">
            {t.partner.pathHeader}
          </div>
          <div className="flex flex-col md:flex-row items-stretch gap-3 md:gap-0">
            {t.partner.flow.map((step, i) => (
              <div
                key={step.num}
                className="flex items-center flex-1"
              >
                <div
                  className="flex-1 text-center p-4 md:p-5"
                  style={{
                    background: "rgba(6,16,34,0.55)",
                    border: "1px solid rgba(184,149,74,0.35)",
                    borderTop: "3px solid #B8954A",
                  }}
                >
                  <div className="font-cinzel text-gold text-2xl md:text-3xl font-light leading-none">
                    {step.num}
                  </div>
                  <div className="mt-2 font-cinzel text-ivory tracking-[0.15em] text-[10px] md:text-xs uppercase whitespace-pre-line">
                    {step.text}
                  </div>
                </div>
                {i < t.partner.flow.length - 1 && (
                  <div className="hidden md:flex items-center justify-center w-6 text-gold flex-shrink-0 text-lg">
                    ▶
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Sovereign retained highlight */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative p-5 md:p-6 text-center"
          style={{
            background:
              "linear-gradient(135deg, rgba(184,149,74,0.12) 0%, rgba(184,149,74,0.03) 100%)",
            border: "1px solid rgba(184,149,74,0.5)",
          }}
        >
          <span className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-gold" />
          <span className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-gold" />
          <div className="font-cinzel text-gold tracking-[0.4em] text-[10px] md:text-xs uppercase mb-2">
            {t.partner.retainedLabel}
          </div>
          <p className="font-cormorant text-ivory/90 text-sm md:text-base leading-relaxed max-w-3xl mx-auto">
            {t.partner.retainedBodyPre}
            <strong className="text-gold not-italic">{t.partner.retainedBodyAll}</strong>
            {t.partner.retainedBodyMid}
            <strong className="text-ivory">{t.partner.retainedBodyAsset}</strong>
            {t.partner.retainedBodyEnd}
          </p>
        </motion.div>
      </div>
    </div>
  );
}

function JvOptionCard({
  opt,
  index,
}: {
  opt: Loc["partner"]["options"][number];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.8,
        delay: index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative p-6 md:p-7"
      style={{
        background: "rgba(6,16,34,0.5)",
        border: "1px solid rgba(184,149,74,0.35)",
        borderTop: "4px solid #B8954A",
      }}
    >
      <span className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-gold" />
      <span className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-gold" />

      {/* Badge */}
      <div className="inline-block px-2.5 py-1 bg-gold font-cinzel text-ivory tracking-[0.3em] text-[10px] font-bold uppercase mb-4">
        {opt.badge}
      </div>

      <h3 className="font-cinzel text-ivory text-lg md:text-xl font-normal tracking-wider mb-1">
        {opt.title}
      </h3>
      <div className="font-cormorant italic text-gold/80 text-sm md:text-base mb-5">
        {opt.subtitle}
      </div>

      <ul className="space-y-2.5">
        {opt.bullets.map((b, i) => (
          <li key={i} className="flex gap-2.5">
            <span className="flex-shrink-0 w-1 h-1 rounded-full bg-gold mt-2" />
            <span className="font-cormorant text-ivory/80 text-[13px] md:text-sm leading-relaxed">
              {b}
            </span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// Disclaimer Strip
// ═══════════════════════════════════════════════════════════════════

function DisclaimerStrip() {
  const t = useLoc();
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 1 }}
      className="relative py-10 md:py-12 border-t-[3px] bg-sovereign-deep/60"
      style={{ borderTopColor: "#B8954A" }}
    >
      <div className="container mx-auto px-6 md:px-12 max-w-5xl">
        <div
          className="p-4 md:p-5"
          style={{
            background: "rgba(184,149,74,0.05)",
            borderLeft: "3px solid #B8954A",
          }}
        >
          <div className="font-cinzel text-gold tracking-[0.3em] text-[10px] md:text-xs uppercase mb-2">
            {t.disclaimer.title}
          </div>
          <p className="font-cormorant italic text-ivory/70 text-[13px] md:text-sm leading-relaxed">
            {t.disclaimer.bodyPre}
            <strong className="text-ivory not-italic">{t.disclaimer.bodyInf}</strong>
            {t.disclaimer.bodyMid}
            <strong className="text-gold not-italic">{t.disclaimer.goldPrice}</strong>
            {t.disclaimer.bodyMid2}
            <strong className="text-gold not-italic">{t.disclaimer.aisc}</strong>
            {t.disclaimer.bodyEnd}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
