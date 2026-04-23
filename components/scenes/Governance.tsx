"use client";

/**
 * ╔═══════════════════════════════════════════════════════════════════╗
 * ║  GOVERNANCE — Institutional Trust Framework (Ivory Shock #3)      ║
 * ╠═══════════════════════════════════════════════════════════════════╣
 * ║  The scene where SOVEREIGN becomes INSTITUTIONAL. An ivory legal  ║
 * ║  document tone — the kind of page a UAE SCA or DFSA compliance    ║
 * ║  officer expects to find. Dense, scannable, data-first.           ║
 * ║                                                                   ║
 * ║   Act 1 · GOVERNANCE MODEL                                        ║
 * ║           5-step decision flow (Proposal → Execution) +           ║
 * ║           4 core principles (Transparency, Accountability,         ║
 * ║           Aligned Incentives, Rapid Execution).                   ║
 * ║                                                                   ║
 * ║   Act 2 · BOARD & OVERSIGHT                                       ║
 * ║           Org strip (Joint Board → JV Management) + 5 committees  ║
 * ║           + Decision Authority Matrix.                            ║
 * ║                                                                   ║
 * ║   Act 3 · ESG FRAMEWORK                                           ║
 * ║           3 pillars (Environment / Social / Governance) with      ║
 * ║           4 items each + 5-stat target strip.                     ║
 * ║                                                                   ║
 * ║   Act 4 · DISPUTE RESOLUTION                                      ║
 * ║           3-tier arbitration ladder (Negotiation → Mediation →    ║
 * ║           Binding) + legal framework table + investor protection. ║
 * ║                                                                   ║
 * ║   Closing: Sovereign doctrine quote on effective governance.      ║
 * ║                                                                   ║
 * ║  Sources (verbatim data):                                         ║
 * ║   - page24_governance_EN.html                                     ║
 * ║   - page25_board_EN.html                                          ║
 * ║   - page27_esg_EN.html                                            ║
 * ║   - page29_arbitration_EN.html                                    ║
 * ╚═══════════════════════════════════════════════════════════════════╝
 */

import { motion } from "framer-motion";
import { createContext, useContext } from "react";
import type { SceneProps, FullDict } from "@/lib/i18n";
import { EASE } from "@/lib/easing";
import SovereignSignature from "@/components/SovereignSignature";

// ═══════════════════════════════════════════════════════════════════
// Data
// ═══════════════════════════════════════════════════════════════════

const DECISION_FLOW = [
  {
    num: "01",
    title: "Proposal",
    desc: "Any party initiates a new workstream, budget request, or technical program through the Joint Technical Office.",
    owner: "Kangala or Partner",
  },
  {
    num: "02",
    title: "Technical Review",
    desc: "Joint Technical Office evaluates feasibility, risk, and strategic alignment. Both parties participate in assessment.",
    owner: "Technical Committee",
  },
  {
    num: "03",
    title: "Financial Approval",
    desc: "Finance Committee reviews budget impact and cash flow. Dual signatory required for expenditures above $100K.",
    owner: "Finance Committee",
  },
  {
    num: "04",
    title: "Board Ratification",
    desc: "Joint Board grants final approval for material decisions. Independent Chair ensures balanced deliberation.",
    owner: "Joint Board",
  },
  {
    num: "05",
    title: "Execution",
    desc: "JV Management implements the approved program with defined KPIs, timelines, and reporting milestones.",
    owner: "JV Management",
  },
];

const CORE_PRINCIPLES = [
  {
    n: "1",
    title: "Transparency",
    desc: "All financial, operational, and technical data shared equally between partners via secure portal with real-time access.",
  },
  {
    n: "2",
    title: "Accountability",
    desc: "Clear ownership at every decision stage. Documented approvals, audit trails, and quarterly performance reviews.",
  },
  {
    n: "3",
    title: "Aligned Incentives",
    desc: "Shared risk-reward structure ensures both parties benefit from project success and bear consequences of under-performance.",
  },
  {
    n: "4",
    title: "Rapid Execution",
    desc: "Delegated authority for operational decisions eliminates bottlenecks. Only material decisions escalate to Board level.",
  },
];

const ORG_CHAIN = [
  { label: "Joint Board", sub: "Strategic Direction", primary: true },
  { label: "Audit & Risk", sub: "Compliance & Controls" },
  { label: "Technical Committee", sub: "Operations & Programs" },
  { label: "ESG Committee", sub: "Sustainability & Impact" },
  { label: "JV Management", sub: "Day-to-Day Execution", primary: true },
];

const COMMITTEES = [
  {
    name: "Joint Board",
    comp: "3 Kangala + 3 Partner + Independent Chair",
    mandate: "Strategy, budget approval, major decisions",
    freq: "Quarterly",
  },
  {
    name: "Audit & Risk",
    comp: "2 Kangala + 2 Partner + External Auditor",
    mandate: "Financial controls, compliance, risk register",
    freq: "Quarterly",
  },
  {
    name: "Technical Committee",
    comp: "2 Kangala + 2 Partner geologists & engineers",
    mandate: "Exploration, drilling, mine planning",
    freq: "Monthly",
  },
  {
    name: "ESG Committee",
    comp: "1 Kangala + 1 Partner + Community rep",
    mandate: "Environmental, social impact, local content",
    freq: "Semi-annual",
  },
  {
    name: "Finance Committee",
    comp: "CFOs from both parties",
    mandate: "Cash flow, CAPEX drawdowns, distributions",
    freq: "Monthly",
  },
];

const AUTHORITY_MATRIX = [
  { key: "Annual budget approval", val: "Joint Board" },
  { key: "CAPEX > $500K", val: "Joint Board" },
  { key: "CAPEX $100K – $500K", val: "Finance Committee" },
  { key: "Exploration program changes", val: "Technical Committee" },
  { key: "Community investment > $50K", val: "ESG Committee" },
  { key: "Quarterly financial statements", val: "Audit & Risk" },
  { key: "Day-to-day operations", val: "JV Management" },
];

const ESG_PILLARS = [
  {
    letter: "E",
    title: "Environment",
    accent: "#1A3A2A",
    items: [
      { k: "Water Management", v: "Closed-loop recycling to minimize freshwater consumption" },
      { k: "Biodiversity", v: "Pre-mining baseline surveys, progressive rehabilitation" },
      { k: "Emissions", v: "Solar-hybrid generation targeting 40% carbon reduction" },
      { k: "Waste", v: "Tailings management per ICMM Global Industry Standard" },
    ],
  },
  {
    letter: "S",
    title: "Social",
    accent: "#7A1F1F",
    items: [
      { k: "Local Employment", v: "80%+ workforce from Hauts-Bassins and surrounding regions" },
      { k: "Health & Education", v: "Community clinic and vocational centre in Karangasso" },
      { k: "Safety", v: "Zero-harm target with ISO 45001 management" },
      { k: "Fair Labour", v: "Living wage; no child or forced labour policy" },
    ],
  },
  {
    letter: "G",
    title: "Governance",
    accent: "#B8954A",
    items: [
      { k: "Anti-Corruption", v: "Full UAE AML/ABC compliance and international standards" },
      { k: "EITI Transparency", v: "Public disclosure of all payments to government entities" },
      { k: "Board Oversight", v: "Independent ESG committee with quarterly reporting" },
      { k: "Whistleblower", v: "Anonymous channel with independent investigation" },
    ],
  },
];

const ESG_TARGETS = [
  { val: "80%+", lbl: "Local Workforce" },
  { val: "40%", lbl: "Carbon Reduction" },
  { val: "Zero", lbl: "Harm Target" },
  { val: "ISO", lbl: "45001 Certified" },
  { val: "EITI", lbl: "Full Compliance" },
];

const DISPUTE_TIERS = [
  {
    step: "1",
    title: "Direct Negotiation",
    timeline: "0 – 30 days",
    desc: "Direct negotiation between authorized senior representatives of both parties. Good-faith discussions to resolve issues amicably and preserve the commercial relationship.",
    meta: [
      { k: "Level", v: "CEO / Managing Director" },
      { k: "Forum", v: "Dubai or Ouagadougou" },
    ],
  },
  {
    step: "2",
    title: "Mediation",
    timeline: "30 – 90 days",
    desc: "Engagement of a neutral third-party mediator appointed by mutual agreement. Non-binding facilitated process to reach a mutually acceptable resolution.",
    meta: [
      { k: "Institution", v: "LCIA / DIAC Mediation" },
      { k: "Seat", v: "Dubai, UAE" },
    ],
  },
  {
    step: "3",
    title: "Binding Arbitration",
    timeline: "90 – 365 days",
    desc: "Final and binding arbitration under international rules. Award enforceable internationally in 170+ jurisdictions.",
    meta: [
      { k: "Rules", v: "UNCITRAL / LCIA" },
      { k: "Arbitrators", v: "3-member tribunal" },
      { k: "Language", v: "English (primary)" },
    ],
  },
];

const LEGAL_FRAMEWORK = [
  { k: "Governing Law", v: "OHADA Uniform Act & Burkina Faso Mining Code 2015" },
  { k: "Seat of Arbitration", v: "Dubai International Financial Centre (DIFC)" },
  { k: "Arbitral Institution", v: "Dubai International Arbitration Centre (DIAC)" },
  { k: "Language", v: "English and French (dual proceedings)" },
  { k: "Panel", v: "Three arbitrators — one per party, third by DIAC" },
  { k: "Enforcement", v: "International — 170+ signatory states" },
  { k: "Interim Measures", v: "Emergency arbitrator within 15 days" },
  { k: "Confidentiality", v: "All proceedings strictly confidential" },
];

const PROTECTIONS = [
  {
    title: "Investor Protection",
    desc: "UAE–Burkina Faso Bilateral Investment Treaty protections applicable.",
  },
  {
    title: "Sovereign Guarantee",
    desc: "Mining convention guarantees stability of fiscal terms.",
  },
];

// ═══════════════════════════════════════════════════════════════════
// Bilingual overlay (French) + Context
// ═══════════════════════════════════════════════════════════════════

type Loc = {
  act1: { pre: string; title: string; highlight: string; sub: string; flowLbl: string; principlesLbl: string };
  act2: { pre: string; title: string; highlight: string; sub: string; committeesTitle: string; matrixTitle: string; colCommittee: string; colComposition: string; colMandate: string; colFreq: string };
  act3: { pre: string; title: string; highlight: string; sub: string };
  act4: { pre: string; title: string; highlight: string; sub: string; legalTitle: string };
  decisionFlow: typeof DECISION_FLOW;
  principles: typeof CORE_PRINCIPLES;
  orgChain: typeof ORG_CHAIN;
  committees: typeof COMMITTEES;
  authority: typeof AUTHORITY_MATRIX;
  esgPillars: typeof ESG_PILLARS;
  esgTargets: typeof ESG_TARGETS;
  disputeTiers: typeof DISPUTE_TIERS;
  legal: typeof LEGAL_FRAMEWORK;
  protections: typeof PROTECTIONS;
  closing: { quote: string; note: string };
};

const DICT: FullDict<Loc> = {
  en: {
    act1: { pre: "TRUST FRAMEWORK", title: "GOVERNANCE", highlight: "MODEL", sub: "Checks, balances, and aligned incentives for sustainable value creation", flowLbl: "Decision Flow", principlesLbl: "Core Principles" },
    act2: { pre: "Board & Committees", title: "OVERSIGHT", highlight: "STRUCTURE", sub: "Strategic direction, risk management, and transparent governance", committeesTitle: "Committees & Mandates", matrixTitle: "Decision Authority Matrix", colCommittee: "Committee", colComposition: "Composition", colMandate: "Mandate", colFreq: "Freq." },
    act3: { pre: "Responsible Stewardship", title: "ESG", highlight: "FRAMEWORK", sub: "Sustainable development, community value, and responsible stewardship" },
    act4: { pre: "Dispute Resolution", title: "ARBITRATION", highlight: "LADDER", sub: "Clear, fair, and internationally recognized mechanisms", legalTitle: "Legal Framework" },
    decisionFlow: DECISION_FLOW,
    principles: CORE_PRINCIPLES,
    orgChain: ORG_CHAIN,
    committees: COMMITTEES,
    authority: AUTHORITY_MATRIX,
    esgPillars: ESG_PILLARS,
    esgTargets: ESG_TARGETS,
    disputeTiers: DISPUTE_TIERS,
    legal: LEGAL_FRAMEWORK,
    protections: PROTECTIONS,
    closing: {
      quote: "“Effective governance aligns incentives, accelerates delivery, and ensures transparency at every stage of the partnership.”",
      note: "Governance framework subject to final partnership agreement. All mechanisms protect both parties' interests under internationally recognized standards.",
    },
  },
  fr: {
    act1: { pre: "CADRE DE CONFIANCE", title: "MODÈLE DE", highlight: "GOUVERNANCE", sub: "Contrôles, équilibres et incitations alignées pour une création de valeur durable", flowLbl: "Processus Décisionnel", principlesLbl: "Principes Fondamentaux" },
    act2: { pre: "Conseil & Comités", title: "STRUCTURE DE", highlight: "SUPERVISION", sub: "Direction stratégique, gestion des risques et gouvernance transparente", committeesTitle: "Comités & Mandats", matrixTitle: "Matrice d'Autorité Décisionnelle", colCommittee: "Comité", colComposition: "Composition", colMandate: "Mandat", colFreq: "Fréq." },
    act3: { pre: "Gestion Responsable", title: "CADRE", highlight: "ESG", sub: "Développement durable, valeur communautaire et gestion responsable" },
    act4: { pre: "Résolution des Litiges", title: "ÉCHELLE", highlight: "D'ARBITRAGE", sub: "Mécanismes clairs, équitables et internationalement reconnus", legalTitle: "Droit Applicable" },
    decisionFlow: [
      { num: "01", title: "Proposition", desc: "L'une des parties initie un nouveau chantier, une demande budgétaire ou un programme technique via le Bureau Technique Conjoint.", owner: "Kangala ou Partenaire" },
      { num: "02", title: "Revue Technique", desc: "Le Bureau Technique Conjoint évalue la faisabilité, les risques et l'alignement stratégique. Les deux parties participent à l'évaluation.", owner: "Comité Technique" },
      { num: "03", title: "Approbation Financière", desc: "Le Comité Financier examine l'impact budgétaire et la trésorerie. Double signature requise pour les dépenses supérieures à 100\u202fK$.", owner: "Comité Financier" },
      { num: "04", title: "Ratification du Conseil", desc: "Le Conseil Conjoint accorde l'approbation finale pour les décisions matérielles. Le Président indépendant assure une délibération équilibrée.", owner: "Conseil Conjoint" },
      { num: "05", title: "Exécution", desc: "La Direction de la JV met en œuvre le programme approuvé avec des KPI définis, des calendriers et des jalons de reporting.", owner: "Direction JV" },
    ],
    principles: [
      { n: "1", title: "Transparence", desc: "Toutes les données financières, opérationnelles et techniques partagées équitablement entre les partenaires via un portail sécurisé avec accès en temps réel." },
      { n: "2", title: "Responsabilité", desc: "Responsabilité claire à chaque étape décisionnelle. Approbations documentées, pistes d'audit et revues de performance trimestrielles." },
      { n: "3", title: "Incitations Alignées", desc: "Structure de risque-rendement partagée garantissant que les deux parties bénéficient du succès du projet et assument les conséquences d'une sous-performance." },
      { n: "4", title: "Exécution Rapide", desc: "Autorité déléguée pour les décisions opérationnelles éliminant les goulets d'étranglement. Seules les décisions matérielles sont escaladées au Conseil." },
    ],
    orgChain: [
      { label: "Conseil Conjoint", sub: "Direction Stratégique", primary: true },
      { label: "Audit & Risques", sub: "Conformité & Contrôles" },
      { label: "Comité Technique", sub: "Opérations & Programmes" },
      { label: "Comité ESG", sub: "Durabilité & Impact" },
      { label: "Direction JV", sub: "Exécution Quotidienne", primary: true },
    ],
    committees: [
      { name: "Conseil Conjoint", comp: "3 Kangala + 3 Partenaire + Président indépendant", mandate: "Stratégie, approbation du budget, décisions majeures", freq: "Trimestrielle" },
      { name: "Audit & Risques", comp: "2 Kangala + 2 Partenaire + Auditeur externe", mandate: "Contrôles financiers, conformité, registre des risques", freq: "Trimestrielle" },
      { name: "Comité Technique", comp: "2 Kangala + 2 géologues & ingénieurs Partenaire", mandate: "Programmes d'exploration, forage, planification minière", freq: "Mensuelle" },
      { name: "Comité ESG", comp: "1 Kangala + 1 Partenaire + Repr. communautaire", mandate: "Environnement, impact social, contenu local", freq: "Semestrielle" },
      { name: "Comité Financier", comp: "DAF des deux parties", mandate: "Trésorerie, tirages CAPEX, distributions", freq: "Mensuelle" },
    ],
    authority: [
      { key: "Approbation du budget annuel", val: "Conseil Conjoint" },
      { key: "CAPEX > 500\u202fK$", val: "Conseil Conjoint" },
      { key: "CAPEX 100\u202fK$ – 500\u202fK$", val: "Comité Financier" },
      { key: "Modifications du programme d'exploration", val: "Comité Technique" },
      { key: "Investissement communautaire > 50\u202fK$", val: "Comité ESG" },
      { key: "États financiers trimestriels", val: "Audit & Risques" },
      { key: "Opérations courantes", val: "Direction JV" },
    ],
    esgPillars: [
      { letter: "E", title: "Environnement", accent: "#1A3A2A", items: [
        { k: "Gestion de l'Eau", v: "Systèmes de recyclage en circuit fermé pour minimiser la consommation d'eau douce" },
        { k: "Biodiversité", v: "Études de référence pré-exploitation et réhabilitation progressive des zones exploitées" },
        { k: "Émissions", v: "Production d'énergie solaire hybride pour réduire l'empreinte carbone de 40%" },
        { k: "Déchets", v: "Gestion des résidus selon la Norme Industrielle Mondiale de l'ICMM" },
      ]},
      { letter: "S", title: "Social", accent: "#7A1F1F", items: [
        { k: "Emploi Local", v: "80%+ de la main-d'œuvre issue des Hauts-Bassins et des régions environnantes" },
        { k: "Santé & Éducation", v: "Clinique communautaire et centre de formation professionnelle à Karangasso" },
        { k: "Sécurité", v: "Objectif zéro accident avec gestion de la santé au travail ISO 45001" },
        { k: "Travail Équitable", v: "Salaire décent garanti\u202f; politique d'interdiction du travail des enfants et du travail forcé" },
      ]},
      { letter: "G", title: "Gouvernance", accent: "#B8954A", items: [
        { k: "Anti-Corruption", v: "Conformité totale aux lois anti-corruption et anti-blanchiment des EAU et aux normes internationales" },
        { k: "Transparence ITIE", v: "Divulgation publique de tous les paiements aux entités gouvernementales" },
        { k: "Supervision du Conseil", v: "Comité ESG indépendant avec reporting trimestriel" },
        { k: "Lanceur d'Alerte", v: "Canal de signalement anonyme avec enquête indépendante" },
      ]},
    ],
    esgTargets: [
      { val: "80%+", lbl: "Main-d'Œuvre Locale" },
      { val: "40%", lbl: "Réduction Carbone" },
      { val: "Zéro", lbl: "Objectif Accident" },
      { val: "ISO", lbl: "45001 Certifié" },
      { val: "ITIE", lbl: "Conformité Totale" },
    ],
    disputeTiers: [
      { step: "1", title: "Négociation Directe", timeline: "0 – 30 jours", desc: "Négociation directe entre les représentants seniors autorisés des deux parties. Discussions de bonne foi pour résoudre les problèmes à l'amiable et préserver la relation commerciale.", meta: [ { k: "Niveau", v: "PDG / Directeur Général" }, { k: "Lieu", v: "Dubaï ou Ouagadougou" } ] },
      { step: "2", title: "Médiation", timeline: "30 – 90 jours", desc: "Engagement d'un médiateur tiers neutre désigné d'un commun accord. Processus facilité non contraignant visant à parvenir à une résolution mutuellement acceptable.", meta: [ { k: "Institution", v: "Médiation LCIA / DIAC" }, { k: "Siège", v: "Dubaï, EAU" } ] },
      { step: "3", title: "Arbitrage Contraignant", timeline: "90 – 365 jours", desc: "Arbitrage définitif et contraignant selon les règles internationales. Sentence exécutoire internationalement dans plus de 170 juridictions.", meta: [ { k: "Règles", v: "CNUDCI / LCIA" }, { k: "Arbitres", v: "Tribunal de 3 membres" }, { k: "Langue", v: "Anglais (principal)" } ] },
    ],
    legal: [
      { k: "Droit Applicable", v: "Acte Uniforme OHADA & Code Minier du Burkina Faso 2015" },
      { k: "Siège de l'Arbitrage", v: "Centre Financier International de Dubaï (DIFC)" },
      { k: "Institution Arbitrale", v: "Centre d'Arbitrage International de Dubaï (DIAC)" },
      { k: "Langue", v: "Anglais et Français (procédure bilingue)" },
      { k: "Composition", v: "Trois arbitres — un par partie, le troisième désigné par le DIAC" },
      { k: "Exécution", v: "International — 170+ États signataires" },
      { k: "Mesures Provisoires", v: "Arbitre d'urgence disponible sous 15 jours" },
      { k: "Confidentialité", v: "Toutes les procédures sont strictement confidentielles" },
    ],
    protections: [
      { title: "Protection des Investisseurs", desc: "Protections du TBI EAU–Burkina Faso applicables." },
      { title: "Garantie Souveraine", desc: "La convention minière garantit la stabilité des conditions fiscales." },
    ],
    closing: {
      quote: "«\u202fUne gouvernance efficace aligne les incitations, accélère la livraison et assure la transparence à chaque étape du partenariat.\u202f»",
      note: "Cadre de gouvernance soumis à l'accord de partenariat final. Tous les mécanismes protègent les intérêts des deux parties selon des normes internationalement reconnues.",
    },
  },
  ar: {
    act1: { pre: "إطار الثقة", title: "نموذج", highlight: "الحوكمة", sub: "ضوابط وتوازنات وحوافز متوافقة لخلق قيمة مستدامة", flowLbl: "مسار اتخاذ القرار", principlesLbl: "المبادئ الجوهرية" },
    act2: { pre: "المجلس واللجان", title: "هيكل", highlight: "الإشراف", sub: "توجيه استراتيجي وإدارة مخاطر وحوكمة شفّافة", committeesTitle: "اللجان والتفويضات", matrixTitle: "مصفوفة صلاحيات اتخاذ القرار", colCommittee: "اللجنة", colComposition: "التشكيل", colMandate: "التفويض", colFreq: "التواتر" },
    act3: { pre: "الإدارة المسؤولة", title: "إطار", highlight: "ESG", sub: "تنمية مستدامة، وقيمة مجتمعية، وإدارة مسؤولة" },
    act4: { pre: "تسوية النزاعات", title: "سلّم", highlight: "التحكيم", sub: "آليات واضحة ومنصفة ومعترف بها دولياً", legalTitle: "الإطار القانوني" },
    decisionFlow: [
      { num: "01", title: "المقترح", desc: "يبادر أي طرف بإطلاق مسار عمل جديد أو طلب ميزانية أو برنامج فني عبر المكتب الفني المشترك.", owner: "كانغالا أو الشريك" },
      { num: "02", title: "المراجعة الفنية", desc: "يقيّم المكتب الفني المشترك الجدوى والمخاطر والتوافق الاستراتيجي. يشارك الطرفان في التقييم.", owner: "اللجنة الفنية" },
      { num: "03", title: "الموافقة المالية", desc: "تراجع لجنة المالية أثر الميزانية والتدفقات النقدية. توقيع مزدوج مطلوب للمصروفات التي تتجاوز $100K.", owner: "لجنة المالية" },
      { num: "04", title: "تصديق المجلس", desc: "يمنح المجلس المشترك الموافقة النهائية على القرارات الجوهرية. يضمن الرئيس المستقل مداولات متوازنة.", owner: "المجلس المشترك" },
      { num: "05", title: "التنفيذ", desc: "تنفّذ إدارة المشروع المشترك البرنامج الموافق عليه وفق مؤشرات أداء وجدول زمني ومعالم إفصاح.", owner: "إدارة المشروع" },
    ],
    principles: [
      { n: "1", title: "الشفافية", desc: "تُتاح البيانات المالية والتشغيلية والفنية للشريكين على قدم المساواة عبر بوابة آمنة بالوصول الفوري." },
      { n: "2", title: "المساءلة", desc: "مسؤولية واضحة في كل مرحلة من اتخاذ القرار، مع توثيق الموافقات ومسارات التدقيق ومراجعات الأداء الفصلية." },
      { n: "3", title: "حوافز متوافقة", desc: "بنية مخاطر–عائد مشتركة تضمن استفادة الطرفين من نجاح المشروع وتحمّلهما تبعات تدني الأداء." },
      { n: "4", title: "تنفيذ سريع", desc: "صلاحية مفوّضة للقرارات التشغيلية تُزيل الاختناقات. تُرفع فقط القرارات الجوهرية إلى المجلس." },
    ],
    orgChain: [
      { label: "المجلس المشترك", sub: "التوجيه الاستراتيجي", primary: true },
      { label: "التدقيق والمخاطر", sub: "الامتثال والضوابط" },
      { label: "اللجنة الفنية", sub: "العمليات والبرامج" },
      { label: "لجنة ESG", sub: "الاستدامة والأثر" },
      { label: "إدارة المشروع", sub: "التنفيذ اليومي", primary: true },
    ],
    committees: [
      { name: "المجلس المشترك", comp: "3 كانغالا + 3 شريك + رئيس مستقل", mandate: "الاستراتيجية، وموافقة الميزانية، والقرارات الكبرى", freq: "فصلية" },
      { name: "التدقيق والمخاطر", comp: "2 كانغالا + 2 شريك + مدقّق خارجي", mandate: "الضوابط المالية، والامتثال، وسجل المخاطر", freq: "فصلية" },
      { name: "اللجنة الفنية", comp: "2 كانغالا + 2 جيولوجيون ومهندسون من الشريك", mandate: "الاستكشاف، والحفر، وتخطيط المنجم", freq: "شهرية" },
      { name: "لجنة ESG", comp: "1 كانغالا + 1 شريك + ممثل مجتمعي", mandate: "البيئة، والأثر الاجتماعي، والمحتوى المحلي", freq: "نصف سنوية" },
      { name: "لجنة المالية", comp: "المديران الماليان للطرفين", mandate: "التدفقات النقدية، وسحب CAPEX، والتوزيعات", freq: "شهرية" },
    ],
    authority: [
      { key: "موافقة الميزانية السنوية", val: "المجلس المشترك" },
      { key: "CAPEX > $500K", val: "المجلس المشترك" },
      { key: "CAPEX $100K – $500K", val: "لجنة المالية" },
      { key: "تعديلات برنامج الاستكشاف", val: "اللجنة الفنية" },
      { key: "استثمار مجتمعي > $50K", val: "لجنة ESG" },
      { key: "البيانات المالية الفصلية", val: "التدقيق والمخاطر" },
      { key: "العمليات اليومية", val: "إدارة المشروع" },
    ],
    esgPillars: [
      { letter: "E", title: "البيئة", accent: "#1A3A2A", items: [
        { k: "إدارة المياه", v: "إعادة تدوير بدائرة مغلقة لتقليل استهلاك المياه العذبة" },
        { k: "التنوّع البيولوجي", v: "مسوح مرجعية قبل التعدين، وإعادة تأهيل تدريجية" },
        { k: "الانبعاثات", v: "توليد شمسي هجين بهدف تخفيض 40% من الكربون" },
        { k: "النفايات", v: "إدارة نفايات التعدين وفق معيار ICMM العالمي للصناعة" },
      ]},
      { letter: "S", title: "الاجتماع", accent: "#7A1F1F", items: [
        { k: "التوظيف المحلي", v: "أكثر من  80% من القوى العاملة من الهو باسان والمناطق المحيطة" },
        { k: "الصحة والتعليم", v: "عيادة مجتمعية ومركز تدريب مهني في كارانغاسو" },
        { k: "السلامة", v: "هدف صفر أذى بمنظومة إدارة ISO 45001" },
        { k: "العمل العادل", v: "أجر معيشي؛ وسياسة عدم تشغيل الأطفال والعمل القسري" },
      ]},
      { letter: "G", title: "الحوكمة", accent: "#B8954A", items: [
        { k: "مكافحة الفساد", v: "امتثال كامل لقوانين الإمارات لمكافحة غسيل الأموال والفساد والمعايير الدولية" },
        { k: "شفافية EITI", v: "إفصاح علني عن جميع المدفوعات للجهات الحكومية" },
        { k: "إشراف المجلس", v: "لجنة ESG مستقلة مع تقارير ربع سنوية" },
        { k: "الإبلاغ عن المخالفات", v: "قناة بلاغ مجهولة مع تحقيق مستقل" },
      ]},
    ],
    esgTargets: [
      { val: "+80%", lbl: "العمالة المحلية" },
      { val: "40%", lbl: "تخفيض الكربون" },
      { val: "صفر", lbl: "هدف الأذى" },
      { val: "ISO", lbl: "معتمد 45001" },
      { val: "EITI", lbl: "امتثال كامل" },
    ],
    disputeTiers: [
      { step: "1", title: "تفاوض مباشر", timeline: "0 – 30 يوماً", desc: "تفاوض مباشر بين ممثلين أول من الطرفين مفوضين. محادثات بحسن نية لحل المسائل ودياً والحفاظ على العلاقة التجارية.", meta: [ { k: "المستوى", v: "الرئيس التنفيذي / المدير العام" }, { k: "المنصّة", v: "دبي أو واغادوغو" } ] },
      { step: "2", title: "وساطة", timeline: "30 – 90 يوماً", desc: "الاستعانة بوسيط محايد يُعيّن بالتراضي. عملية تيسير غير ملزمة لالتماس تسوية مقبولة للطرفين.", meta: [ { k: "المؤسسة", v: "وساطة LCIA / DIAC" }, { k: "المقر", v: "دبي، الإمارات" } ] },
      { step: "3", title: "تحكيم ملزم", timeline: "90 – 365 يوماً", desc: "تحكيم نهائي وملزم وفق القواعد الدولية. الحكم قابل للتنفيذ في أكثر من 170 دولة.", meta: [ { k: "القواعد", v: "UNCITRAL / LCIA" }, { k: "المحكمون", v: "هيئة ثلاثية" }, { k: "اللغة", v: "الإنجليزية (رئيسية)" } ] },
    ],
    legal: [
      { k: "القانون الحاكم", v: "القانون الموحّد لـ OHADA وقانون التعدين البوركيني 2015" },
      { k: "مقر التحكيم", v: "مركز دبي المالي العالمي (DIFC)" },
      { k: "المؤسسة التحكيمية", v: "مركز دبي للتحكيم الدولي (DIAC)" },
      { k: "اللغة", v: "الإنجليزية والفرنسية (إجراءات مزدوجة)" },
      { k: "الهيئة", v: "ثلاثة محكّمين — واحد لكل طرف والثالث يعيّنه DIAC" },
      { k: "التنفيذ", v: "دولي — أكثر من 170 دولة موقّعة" },
      { k: "التدابير المؤقتة", v: "محكّم طوارئ خلال 15 يوماً" },
      { k: "السرية", v: "جميع الإجراءات سرية تماماً" },
    ],
    protections: [
      { title: "حماية المستثمرين", desc: "حمايات اتفاقية الاستثمار الثنائية الإماراتية–البوركينية مطبّقة." },
      { title: "الضمان السيادي", desc: "اتفاقية التعدين تضمن استقرار الشروط المالية." },
    ],
    closing: {
      quote: "«الحوكمة الفاعلة توائم الحوافز، وتُسرّع التنفيذ، وتضمن الشفافية في كل مرحلة من الشراكة.»",
      note: "إطار الحوكمة خاضع لاتفاقية الشراكة النهائية. جميع الآليات تحمي مصالح الطرفين وفق معايير دولية معترف بها.",
    },
  },
};

const LocCtx = createContext<Loc>(DICT.en);
function useLoc(): Loc {
  return useContext(LocCtx);
}

// ═══════════════════════════════════════════════════════════════════
// Shared primitives
// ═══════════════════════════════════════════════════════════════════

function KenteDivider({ width = 80 }: { width?: number }) {
  return (
    <div
      className="h-[3px] rounded-sm"
      style={{
        width,
        background:
          "repeating-linear-gradient(90deg, #B8954A 0 8px, #1A3A2A 8px 16px, #7A1F1F 16px 24px)",
      }}
    />
  );
}

function ActHeader({
  pre,
  title,
  highlight,
  sub,
}: {
  pre: string;
  title: string;
  highlight?: string;
  sub?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 1, ease: EASE.DISSOLVE }}
      className="mb-10 md:mb-14"
    >
      <div className="font-cinzel text-gold tracking-[0.5em] text-[10px] md:text-xs mb-3 uppercase opacity-90">
        {pre}
      </div>
      <h2 className="font-cinzel text-sovereign tracking-[0.08em] text-2xl md:text-4xl lg:text-5xl font-light leading-[1.1]">
        {title}
        {highlight && (
          <>
            {" "}
            <span className="font-normal">{highlight}</span>
          </>
        )}
      </h2>
      {sub && (
        <div className="mt-3 font-cormorant italic text-[#7A1F1F] text-base md:text-lg">
          {sub}
        </div>
      )}
      <div className="mt-4">
        <KenteDivider />
      </div>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// Main
// ═══════════════════════════════════════════════════════════════════

export default function Governance({ lang = "en" }: SceneProps = {}) {
  return (
    <LocCtx.Provider value={DICT[lang ?? "en"]}>
    <section className="relative w-full bg-ivory text-sovereign overflow-hidden">
      {/* Akan diagonal watermark */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, #0A192F 0, #0A192F 2px, transparent 0, transparent 60px), repeating-linear-gradient(-45deg, #0A192F 0, #0A192F 2px, transparent 0, transparent 60px)",
        }}
      />

      {/* Top handshake gold line */}
      <div
        className="h-px w-full"
        style={{
          background:
            "linear-gradient(90deg, transparent, #B8954A 50%, transparent)",
        }}
      />

      <GovernanceAct />
      <BoardAct />
      <EsgAct />
      <DisputeAct />
      <ClosingDoctrine />

      {/* ═══ Sovereign Signature — live treaty-signing mark ═══ */}
      <SovereignSignature />

      {/* Bottom handshake */}
      <div
        className="h-px w-full"
        style={{
          background:
            "linear-gradient(90deg, transparent, #B8954A 50%, transparent)",
        }}
      />
    </section>
    </LocCtx.Provider>
  );
}

// ═══════════════════════════════════════════════════════════════════
// Act 1 — Governance Model
// ═══════════════════════════════════════════════════════════════════

function GovernanceAct() {
  const t = useLoc();
  return (
    <div className="relative py-20 md:py-28">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        <ActHeader
          pre={t.act1.pre}
          title={t.act1.title}
          highlight={t.act1.highlight}
          sub={t.act1.sub}
        />

        {/* 5-step decision flow */}
        <div className="mb-10 md:mb-14">
          <div className="font-cinzel text-gold tracking-[0.35em] text-[10px] uppercase mb-3">
            {t.act1.flowLbl}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3 md:gap-4">
            {t.decisionFlow.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.7,
                  delay: i * 0.08,
                  ease: EASE.SPRING,
                }}
                className="relative p-4 md:p-5 flex flex-col"
                style={{
                  background: "rgba(10,25,47,0.06)",
                  border: "1px solid rgba(184,149,74,0.3)",
                  borderTop: `4px solid ${
                    ["#B8954A", "#1A3A2A", "#7A1F1F", "#0A192F", "#B8954A"][i]
                  }`,
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-cinzel text-gold/60 text-2xl font-semibold leading-none">
                    {step.num}
                  </span>
                  <span className="font-cinzel text-sovereign tracking-[0.18em] text-[11px] font-semibold uppercase">
                    {step.title}
                  </span>
                </div>
                <div className="font-cormorant text-sovereign/80 text-[13px] md:text-sm leading-relaxed flex-1 mb-3">
                  {step.desc}
                </div>
                <div className="font-cinzel text-ivory text-[11px] tracking-[0.15em] uppercase px-2 py-1 bg-gold self-start">
                  {step.owner}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Core principles */}
        <div>
          <div className="font-cinzel text-gold tracking-[0.35em] text-[10px] uppercase mb-3">
            {t.act1.principlesLbl}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3">
            {t.principles.map((p, i) => (
              <motion.div
                key={p.n}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="flex items-start gap-3 p-4 md:p-5 bg-sovereign"
                style={{ borderLeft: "4px solid #B8954A" }}
              >
                <div className="flex-shrink-0 w-8 h-8 bg-gold flex items-center justify-center font-cinzel text-ivory text-sm font-bold">
                  {p.n}
                </div>
                <div className="flex-1">
                  <div className="font-cinzel text-gold tracking-[0.2em] text-[11px] uppercase font-semibold mb-1">
                    {p.title}
                  </div>
                  <div className="font-cormorant text-ivory/85 text-[13px] md:text-sm leading-relaxed">
                    {p.desc}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// Act 2 — Board & Oversight
// ═══════════════════════════════════════════════════════════════════

function BoardAct() {
  const t = useLoc();
  return (
    <div className="relative py-20 md:py-28 border-t border-gold/25 bg-ivory-dark/25">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        <ActHeader
          pre={t.act2.pre}
          title={t.act2.title}
          highlight={t.act2.highlight}
          sub={t.act2.sub}
        />

        {/* Org chain strip */}
        <div className="mb-10">
          <div className="flex flex-col md:flex-row items-stretch gap-2 md:gap-0">
            {t.orgChain.map((node, i) => (
              <div key={node.label} className="flex items-center flex-1">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="flex-1 text-center p-3 md:p-4"
                  style={{
                    background: node.primary ? "#0A192F" : "rgba(10,25,47,0.08)",
                    border: node.primary
                      ? "2px solid #B8954A"
                      : "1px solid rgba(184,149,74,0.35)",
                    color: node.primary ? "#F5F0E8" : "#0A192F",
                  }}
                >
                  <div className="font-cinzel tracking-[0.2em] text-[11px] md:text-xs font-semibold uppercase">
                    {node.label}
                  </div>
                  <div
                    className={`mt-1 font-cinzel text-[10px] md:text-[11px] tracking-[0.15em] uppercase ${
                      node.primary ? "text-gold" : "text-sovereign/60"
                    }`}
                  >
                    {node.sub}
                  </div>
                </motion.div>
                {i < t.orgChain.length - 1 && (
                  <div className="hidden md:flex items-center justify-center w-6 text-gold flex-shrink-0">
                    ▶
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Two-column: Committees table + Authority Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-5 md:gap-6">
          <TableCard title={t.act2.committeesTitle}>
            <table className="w-full text-left">
              <thead>
                <tr
                  className="font-cinzel text-ivory tracking-[0.2em] text-[10px] md:text-[11px] uppercase"
                  style={{ background: "#0A192F", borderBottom: "3px solid #B8954A" }}
                >
                  <th className="px-3 md:px-4 py-2.5">{t.act2.colCommittee}</th>
                  <th className="px-3 md:px-4 py-2.5">{t.act2.colComposition}</th>
                  <th className="px-3 md:px-4 py-2.5">{t.act2.colMandate}</th>
                  <th className="px-3 md:px-4 py-2.5">{t.act2.colFreq}</th>
                </tr>
              </thead>
              <tbody className="font-cormorant text-sovereign/90 text-[12.5px] md:text-[13px]">
                {t.committees.map((c, i) => (
                  <tr
                    key={c.name}
                    className={i % 2 === 1 ? "bg-gold/5" : ""}
                    style={{ borderBottom: "1px solid rgba(184,149,74,0.18)" }}
                  >
                    <td className="px-3 md:px-4 py-2.5 font-cinzel tracking-wider text-[11px] font-semibold uppercase">
                      {c.name}
                    </td>
                    <td className="px-3 md:px-4 py-2.5 leading-snug">{c.comp}</td>
                    <td className="px-3 md:px-4 py-2.5 leading-snug">{c.mandate}</td>
                    <td className="px-3 md:px-4 py-2.5 font-cinzel text-[10px] tracking-wider uppercase text-gold">
                      {c.freq}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </TableCard>

          <TableCard title={t.act2.matrixTitle}>
            <div className="divide-y divide-gold/15">
              {t.authority.map((row) => (
                <div
                  key={row.key}
                  className="flex items-center justify-between gap-3 px-3 md:px-4 py-2.5"
                >
                  <span className="font-cormorant text-sovereign/85 text-[13px] md:text-sm">
                    {row.key}
                  </span>
                  <span className="font-cinzel text-gold tracking-[0.15em] text-[10px] md:text-[11px] uppercase font-semibold text-right flex-shrink-0">
                    {row.val}
                  </span>
                </div>
              ))}
            </div>
          </TableCard>
        </div>
      </div>
    </div>
  );
}

function TableCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8 }}
      className="flex flex-col overflow-hidden"
      style={{
        background: "rgba(10,25,47,0.04)",
        border: "1px solid rgba(184,149,74,0.3)",
      }}
    >
      <div
        className="px-4 md:px-5 py-2.5 bg-sovereign"
        style={{ borderTop: "3px solid #B8954A" }}
      >
        <span className="font-cinzel text-gold-bright tracking-[0.3em] text-[10px] md:text-xs uppercase font-semibold">
          {title}
        </span>
      </div>
      <div className="flex-1">{children}</div>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// Act 3 — ESG Framework
// ═══════════════════════════════════════════════════════════════════

function EsgAct() {
  const t = useLoc();
  return (
    <div className="relative py-20 md:py-28 border-t border-gold/25">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        <ActHeader
          pre={t.act3.pre}
          title={t.act3.title}
          highlight={t.act3.highlight}
          sub={t.act3.sub}
        />

        {/* 3 pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 mb-10">
          {t.esgPillars.map((p, i) => (
            <motion.div
              key={p.letter}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.8,
                delay: i * 0.12,
                ease: EASE.SPRING,
              }}
              className="flex flex-col overflow-hidden"
              style={{
                background: "rgba(10,25,47,0.04)",
                border: "1px solid rgba(184,149,74,0.3)",
              }}
            >
              {/* Pillar header */}
              <div
                className="flex items-center gap-3 px-4 py-3"
                style={{
                  background: "#0A192F",
                  borderTop: `4px solid ${p.accent}`,
                }}
              >
                <div
                  className="w-10 h-10 flex items-center justify-center font-cinzel text-ivory text-xl font-bold"
                  style={{ background: p.accent }}
                >
                  {p.letter}
                </div>
                <div className="font-cinzel text-gold-bright tracking-[0.3em] text-sm uppercase font-semibold">
                  {p.title}
                </div>
              </div>

              {/* Items */}
              <div className="p-4 md:p-5 space-y-3 flex-1">
                {p.items.map((item) => (
                  <div key={item.k} className="flex gap-2.5">
                    <span
                      className="flex-shrink-0 w-1.5 h-1.5 rounded-full mt-2"
                      style={{ background: p.accent }}
                    />
                    <div className="font-cormorant text-sovereign/85 text-[13px] md:text-[14px] leading-relaxed">
                      <strong className="text-sovereign font-semibold">
                        {item.k}
                      </strong>
                      {" — "}
                      {item.v}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Target strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9 }}
          className="grid grid-cols-2 md:grid-cols-5 gap-px bg-gold/30"
        >
          {t.esgTargets.map((item) => (
            <div
              key={item.lbl}
              className="bg-sovereign text-center py-5 px-3 relative"
            >
              <span className="absolute top-0 left-[25%] right-[25%] h-[3px] bg-gold" />
              <div className="font-cinzel text-gold text-2xl md:text-3xl font-light">
                {item.val}
              </div>
              <div className="mt-1.5 font-cinzel text-ivory/60 tracking-[0.2em] text-[11px] uppercase">
                {item.lbl}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// Act 4 — Dispute Resolution
// ═══════════════════════════════════════════════════════════════════

function DisputeAct() {
  const t = useLoc();
  return (
    <div className="relative py-20 md:py-28 border-t border-gold/25 bg-ivory-dark/25">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        <ActHeader
          pre={t.act4.pre}
          title={t.act4.title}
          highlight={t.act4.highlight}
          sub={t.act4.sub}
        />

        {/* 3-tier ladder */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 mb-10">
          {t.disputeTiers.map((tier, i) => (
            <motion.div
              key={tier.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className="relative p-5 md:p-6"
              style={{
                background: "rgba(10,25,47,0.04)",
                border: "1px solid rgba(184,149,74,0.3)",
                borderTop: `4px solid ${
                  ["#B8954A", "#1A3A2A", "#7A1F1F"][i]
                }`,
              }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-8 h-8 flex items-center justify-center font-cinzel text-ivory text-sm font-bold bg-sovereign"
                  style={{ border: "1.5px solid #B8954A" }}
                >
                  {tier.step}
                </div>
                <div>
                  <div className="font-cinzel text-sovereign tracking-[0.2em] text-[12px] md:text-sm font-semibold uppercase leading-tight">
                    {tier.title}
                  </div>
                  <div className="font-cinzel text-gold/80 tracking-[0.2em] text-[11px] uppercase mt-0.5">
                    {tier.timeline}
                  </div>
                </div>
              </div>
              <p className="font-cormorant text-sovereign/80 text-[13px] md:text-sm leading-relaxed mb-3">
                {tier.desc}
              </p>
              <div className="pt-3 border-t border-gold/15 space-y-1">
                {tier.meta.map((m) => (
                  <div key={m.k} className="flex text-[12px]">
                    <span className="font-cinzel text-gold/90 tracking-wider text-[10px] uppercase font-semibold min-w-[80px]">
                      {m.k}:
                    </span>
                    <span className="font-cormorant text-sovereign/80 ml-2">
                      {m.v}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Legal Framework + Protections */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-5 md:gap-6">
          <TableCard title={t.act4.legalTitle}>
            <div className="divide-y divide-gold/15">
              {t.legal.map((r) => (
                <div
                  key={r.k}
                  className="grid grid-cols-[140px_1fr] md:grid-cols-[180px_1fr] gap-3 px-3 md:px-4 py-2.5"
                >
                  <span className="font-cinzel text-gold tracking-[0.18em] text-[10px] md:text-[11px] uppercase font-semibold">
                    {r.k}
                  </span>
                  <span className="font-cormorant text-sovereign/85 text-[13px] md:text-sm leading-snug">
                    {r.v}
                  </span>
                </div>
              ))}
            </div>
          </TableCard>

          <div className="space-y-3 md:space-y-4">
            {t.protections.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                className="p-4 md:p-5"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(184,149,74,0.12) 0%, rgba(184,149,74,0.04) 100%)",
                  border: "1px solid rgba(184,149,74,0.45)",
                  borderLeft: "4px solid #B8954A",
                }}
              >
                <div className="font-cinzel text-gold tracking-[0.25em] text-[11px] uppercase font-semibold mb-1.5">
                  {p.title}
                </div>
                <div className="font-cormorant text-sovereign/80 text-[13px] md:text-sm leading-relaxed">
                  {p.desc}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// Closing doctrine
// ═══════════════════════════════════════════════════════════════════

function ClosingDoctrine() {
  const t = useLoc();
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 1.2 }}
      className="relative py-12 md:py-16 border-t-[3px] bg-sovereign"
      style={{ borderTopColor: "#B8954A" }}
    >
      <div className="container mx-auto px-6 md:px-12 max-w-5xl">
        <div className="flex flex-col md:flex-row items-center gap-5 md:gap-8">
          <blockquote className="flex-1 font-cormorant italic text-gold text-lg md:text-2xl leading-relaxed">
            {t.closing.quote}
          </blockquote>
          <div className="hidden md:block w-px h-16 bg-gold/40" />
          <p className="flex-[0.55] font-cormorant text-ivory/75 text-[13px] md:text-sm leading-relaxed">
            {t.closing.note}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
