"use client";

/**
 * INVITATION — Contact, Next Steps & Colophon (Final Scene)
 * FR source (verbatim): page32_contact_FR.html + page33_colophon_FR.html + page34_back_cover_FR.html
 */

import { motion } from "framer-motion";
import type { FullDict, SceneProps } from "@/lib/i18n";
import { EASE } from "@/lib/easing";
import WaxSeal from "@/components/WaxSeal";

type Step = { num: string; title: string; desc: string };
type Row = { k: string; v: string };

type T = {
  invitationLabel: string;
  heroA: string;
  heroB: string;
  tagline: string;
  directInquiry: string;
  subjectTag: string;
  subjectPrefix: string;
  subjectQuoted: string;
  subjectSuffix: string;
  ourOffices: string;
  headOfficeBadge: string;
  dubaiCity: string;
  dubaiAddr2: string;
  dubaiRole: string;
  ouagaRole: string;
  engagementLadder: string;
  fromIntro: string;
  toExecution: string;
  steps: Step[];
  doctrineA: string;
  doctrineB: string;
  doctrineSub: string;
  colophonTitle: string;
  timelineTitle: string;
  standardsTitle: string;
  docRef: string;
  dossierName: string;
  strictlyConfidential: string;
  legalBold: string;
  legalBody: string;
  copyright: string;
  cities: string;
  allRights: string;
  timeline: Row[];
  standards: Row[];
};

const DICT: FullDict<T> = {
  en: {
    invitationLabel: "INVITATION",
    heroA: "CONTACT &",
    heroB: "NEXT STEPS",
    tagline: "Let's build a legacy of value together.",
    directInquiry: "Direct Inquiry",
    subjectTag: "Karangasso Gold — Confidential",
    subjectPrefix: "For investment inquiries, please reference ",
    subjectQuoted: "\u201CKarangasso Gold — Confidential\u201D",
    subjectSuffix: " in subject line.",
    ourOffices: "Our Offices",
    headOfficeBadge: "Head Office",
    dubaiCity: "Dubai, UAE",
    dubaiAddr2: "Port Saeed, Dubai, UAE",
    dubaiRole: "Head Office",
    ouagaRole: "Operations & Project Office",
    engagementLadder: "ENGAGEMENT LADDER",
    fromIntro: "FROM INTRODUCTION",
    toExecution: "TO EXECUTION",
    steps: [
      { num: "01", title: "Initial Meeting", desc: "Arrange a confidential meeting to discuss partnership framework and project overview." },
      { num: "02", title: "Due Diligence", desc: "Joint technical and legal due diligence. Access to data room with geological reports and financials." },
      { num: "03", title: "Term Sheet", desc: "Negotiate and finalize partnership terms. Structure selection (OpCo or PSA) with agreed governance." },
      { num: "04", title: "Launch", desc: "Establish Joint Technical Office and commence project execution per approved work program." },
    ],
    doctrineA: "\u201CSovereign Value. Shared Vision.",
    doctrineB: " Enduring Legacy.\u201D",
    doctrineSub: "We look forward to a successful partnership and sustainable value creation for all stakeholders across the Karangasso gold concession.",
    colophonTitle: "Colophon & Compliance",
    timelineTitle: "Project Timeline",
    standardsTitle: "Standards & Compliance",
    docRef: "Document Reference",
    dossierName: "Sovereign Investment Dossier",
    strictlyConfidential: "Strictly Confidential · Proprietary",
    legalBold: "Confidential & Proprietary",
    legalBody: " — This document is the exclusive property of Kangala Holding Group and is intended solely for the named recipient. No part may be reproduced, distributed, or disclosed without prior written consent. All rights reserved.",
    copyright: "© 2026 Kangala Holding Group",
    cities: "Dubai · Ouagadougou",
    allRights: "All Rights Reserved",
    timeline: [
      { k: "Exploration Start", v: "Q1 2024" },
      { k: "Phase 1 Complete", v: "Q2 2026" },
      { k: "Phase 2 Target", v: "Q4 2026" },
      { k: "Development", v: "2028 – 2030" },
      { k: "Mine Life", v: "5 – 7 years" },
    ],
    standards: [
      { k: "Resources", v: "JORC 2012" },
      { k: "Reporting", v: "UAE SCA Compliant" },
      { k: "Financial", v: "IFRS" },
      { k: "ESG", v: "GRI Standards" },
      { k: "Mining Law", v: "BF Mining Code 2015 · OHADA" },
    ],
  },
  fr: {
    invitationLabel: "INVITATION",
    heroA: "CONTACT &",
    heroB: "PROCHAINES ÉTAPES",
    tagline: "Construisons ensemble un héritage de valeur.",
    directInquiry: "Contact Direct",
    subjectTag: "Karangasso Gold — Confidentiel",
    subjectPrefix: "Pour les demandes d'investissement, veuillez indiquer ",
    subjectQuoted: "« Karangasso Gold — Confidentiel »",
    subjectSuffix: " en objet.",
    ourOffices: "Nos Bureaux",
    headOfficeBadge: "Siège Social",
    dubaiCity: "Dubaï, EAU",
    dubaiAddr2: "Port Saeed, Dubaï, EAU",
    dubaiRole: "Siège Social",
    ouagaRole: "Bureau des Opérations & Projets",
    engagementLadder: "PARCOURS DE PARTENARIAT",
    fromIntro: "DE LA PRÉSENTATION",
    toExecution: "À L'EXÉCUTION",
    steps: [
      { num: "01", title: "Réunion Initiale", desc: "Organiser une réunion confidentielle pour discuter du cadre de partenariat et de la présentation du projet." },
      { num: "02", title: "Due Diligence", desc: "Due diligence technique et juridique conjointe. Accès à la data room avec rapports géologiques et financiers." },
      { num: "03", title: "Term Sheet", desc: "Négocier et finaliser les termes du partenariat. Choix de la structure (OpCo ou PSA) avec gouvernance convenue." },
      { num: "04", title: "Lancement", desc: "Établir le Bureau Technique Conjoint et démarrer l'exécution du projet selon le programme de travail approuvé." },
    ],
    doctrineA: "« Valeur Souveraine. Vision Partagée.",
    doctrineB: " Héritage Durable. »",
    doctrineSub: "Nous nous réjouissons d'un partenariat fructueux et d'une création de valeur durable pour toutes les parties prenantes sur la concession aurifère de Karangasso.",
    colophonTitle: "Colophon & Conformité",
    timelineTitle: "Calendrier du Projet",
    standardsTitle: "Normes & Conformité",
    docRef: "Référence du Document",
    dossierName: "Dossier d'Investissement Souverain",
    strictlyConfidential: "Strictement Confidentiel · Propriétaire",
    legalBold: "Confidentiel & Propriétaire",
    legalBody: " — Ce document est la propriété exclusive de Kangala Holding Group et est destiné uniquement au destinataire nommé. Aucune partie ne peut être reproduite, distribuée ou divulguée sans consentement écrit préalable. Tous droits réservés.",
    copyright: "© 2026 Kangala Holding Group",
    cities: "Dubaï · Ouagadougou",
    allRights: "Tous Droits Réservés",
    timeline: [
      { k: "Début Exploration", v: "T1 2024" },
      { k: "Phase 1 Complétée", v: "T2 2026" },
      { k: "Phase 2 Cible", v: "T4 2026" },
      { k: "Développement", v: "2028 – 2030" },
      { k: "Durée de Vie", v: "5 – 7 ans" },
    ],
    standards: [
      { k: "Ressources", v: "JORC 2012" },
      { k: "Reporting", v: "UAE SCA Conforme" },
      { k: "Financier", v: "IFRS" },
      { k: "ESG", v: "Normes GRI" },
      { k: "Droit Minier", v: "Code Minier BF 2015 · OHADA" },
    ],
  },
  ar: {
    invitationLabel: "دعوة",
    heroA: "تواصل و",
    heroB: "الخطوات التالية",
    tagline: "لنبنِ إرثاً من القيمة معاً.",
    directInquiry: "تواصل مباشر",
    subjectTag: "كارانغاسو للذهب — سري",
    subjectPrefix: "للاستفسارات الاستثمارية، يُرجى الإشارة إلى ",
    subjectQuoted: "«كارانغاسو للذهب — سري»",
    subjectSuffix: " في خانة الموضوع.",
    ourOffices: "مكاتبنا",
    headOfficeBadge: "المقر الرئيسي",
    dubaiCity: "دبي، الإمارات",
    dubaiAddr2: "بورت سعيد، دبي، الإمارات",
    dubaiRole: "المقر الرئيسي",
    ouagaRole: "مكتب العمليات والمشاريع",
    engagementLadder: "مسار الارتباط",
    fromIntro: "من التعريف",
    toExecution: "إلى التنفيذ",
    steps: [
      { num: "01", title: "الاجتماع الأولي", desc: "ترتيب اجتماع سري لمناقشة إطار الشراكة وعرض المشروع." },
      { num: "02", title: "الفحص النافي للجهالة", desc: "فحص فني وقانوني مشترك. الوصول إلى غرفة البيانات مع التقارير الجيولوجية والمالية." },
      { num: "03", title: "ورقة الشروط", desc: "التفاوض على شروط الشراكة وإنجازها. اختيار الهيكل (شركة تشغيل أو PSA) مع حوكمة متّفق عليها." },
      { num: "04", title: "الإطلاق", desc: "إنشاء المكتب الفني المشترك وبدء تنفيذ المشروع وفق برنامج العمل المعتمد." },
    ],
    doctrineA: "«قيمة سيادية. رؤية مشتركة.",
    doctrineB: " إرث مستدام.»",
    doctrineSub: "نتطلّع إلى شراكة ناجحة وخلق قيمة مستدامة لجميع الأطراف المعنية في امتياز كارانغاسو للذهب.",
    colophonTitle: "الختام والامتثال",
    timelineTitle: "جدول المشروع الزمني",
    standardsTitle: "المعايير والامتثال",
    docRef: "مرجع الوثيقة",
    dossierName: "ملف استثمار سيادي",
    strictlyConfidential: "سري للغاية · ملكية حصرية",
    legalBold: "سري وملكي حصري",
    legalBody: " — هذه الوثيقة ملكية حصرية لمجموعة كانغالا القابضة وموجهة حصراً للمتلقّي المسمّى. لا يجوز إعادة إنتاج أي جزء منها أو توزيعه أو الإفصاح عنه دون موافقة خطية مسبقة. جميع الحقوق محفوظة.",
    copyright: "© 2026 مجموعة كانغالا القابضة",
    cities: "دبي · واغادوغو",
    allRights: "جميع الحقوق محفوظة",
    timeline: [
      { k: "بدء الاستكشاف", v: "الربع 1 2024" },
      { k: "إنجاز المرحلة 1", v: "الربع 2 2026" },
      { k: "هدف المرحلة 2", v: "الربع 4 2026" },
      { k: "التطوير", v: "2028 – 2030" },
      { k: "عمر المنجم", v: "5 – 7 سنوات" },
    ],
    standards: [
      { k: "الموارد", v: "JORC 2012" },
      { k: "الإفصاح", v: "معتمد لدى هيئة الأوراق المالية الإماراتية" },
      { k: "المالي", v: "IFRS" },
      { k: "ESG", v: "معايير GRI" },
      { k: "قانون التعدين", v: "قانون التعدين البوركيني 2015 · OHADA" },
    ],
  },
};

const OFFICIAL_EMAIL = "info@kangalaholding.com";

// ═══════════════════════════════════════════════════════════════════
// Main
// ═══════════════════════════════════════════════════════════════════

export default function Invitation({ lang = "en" }: SceneProps = {}) {
  const t = DICT[lang ?? "en"];
  return (
    <section className="relative w-full bg-sovereign text-ivory overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 30%, rgba(184,149,74,0.1) 0%, transparent 65%)" }}
      />
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(184,149,74,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(184,149,74,0.5) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <InvitationHero t={t} />
      <OfficesAct t={t} />
      <NextStepsAct t={t} />
      <ClosingDoctrine t={t} />

      {/* ═══ Wax Seal — final sovereign press, closes the dossier ═══ */}
      <div className="relative flex justify-center py-12 md:py-16">
        <WaxSeal size="lg" />
      </div>

      <ColophonStrip t={t} />
      <LegalImprint t={t} />
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════
// Act 1 — Hero
// ═══════════════════════════════════════════════════════════════════

function InvitationHero({ t }: { t: T }) {
  return (
    <div className="relative py-24 md:py-32 lg:py-40">
      <div className="container mx-auto px-6 md:px-12 max-w-5xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.4, ease: EASE.DISSOLVE }}
        >
          <div className="font-cinzel text-gold tracking-[0.7em] text-[10px] md:text-xs mb-6 md:mb-8 opacity-85">
            {t.invitationLabel}
          </div>

          <h2 className="font-cinzel text-ivory tracking-[0.1em] text-3xl md:text-5xl lg:text-6xl font-light leading-[1.1]">
            {t.heroA}
            <br />
            <span className="text-gold-gradient font-normal">{t.heroB}</span>
          </h2>

          <div className="mt-10 flex items-center justify-center gap-4 text-gold/50">
            <div className="w-20 md:w-28 h-px bg-gold/40" />
            <span className="text-sm">◆</span>
            <div className="w-20 md:w-28 h-px bg-gold/40" />
          </div>

          <div className="mt-6 font-cormorant italic text-gold/80 text-base md:text-lg">
            {t.tagline}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4 }}
            className="mt-12 inline-block"
          >
            <a
              href={`mailto:${OFFICIAL_EMAIL}?subject=${encodeURIComponent(t.subjectTag)}`}
              className="group relative inline-block px-8 md:px-10 py-3.5 md:py-4 overflow-hidden"
              style={{
                background: "linear-gradient(135deg, rgba(184,149,74,0.18) 0%, rgba(184,149,74,0.04) 100%)",
                border: "1px solid rgba(184,149,74,0.5)",
              }}
            >
              <span className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-gold" />
              <span className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-gold" />
              <span className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-gold" />
              <span className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-gold" />

              <div className="font-cinzel text-gold/65 tracking-[0.35em] text-[11px] uppercase mb-1">
                {t.directInquiry}
              </div>
              <div
                dir="ltr"
                className="font-cinzel text-gold-gradient text-base md:text-xl tracking-[0.12em] group-hover:tracking-[0.18em] transition-all duration-500"
              >
                {OFFICIAL_EMAIL}
              </div>
            </a>
            <p className="mt-3 font-cormorant italic text-ivory/55 text-[12px] md:text-sm max-w-md mx-auto">
              {t.subjectPrefix}
              <span className="text-gold/85 not-italic">{t.subjectQuoted}</span>
              {t.subjectSuffix}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// Act 2 — Offices
// ═══════════════════════════════════════════════════════════════════

function OfficesAct({ t }: { t: T }) {
  const offices = [
    {
      city: t.dubaiCity,
      role: t.dubaiRole,
      lines: ["Office 107, Al Aman House", t.dubaiAddr2],
      phone: "+971 4 325 2577",
      primary: true,
    },
    {
      city: "Ouagadougou",
      role: t.ouagaRole,
      lines: ["Secteur 52, OUAGA 2000", "Ouagadougou, Burkina Faso"],
      phone: "+226 76 76 96 96",
      primary: false,
    },
  ];

  return (
    <div className="relative py-16 md:py-20 border-t border-gold/15">
      <div className="container mx-auto px-6 md:px-12 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9 }}
          className="text-center mb-10 md:mb-12"
        >
          <div className="font-cinzel text-gold tracking-[0.4em] text-[10px] md:text-xs uppercase opacity-85">
            {t.ourOffices}
          </div>
          <div className="mt-2 flex items-center justify-center gap-3 text-gold/40">
            <span className="w-10 h-px bg-gold/40" />
            <span className="text-xs">◆</span>
            <span className="w-10 h-px bg-gold/40" />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {offices.map((o, i) => (
            <motion.div
              key={o.city}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, delay: i * 0.12, ease: EASE.SPRING }}
              className="relative p-6 md:p-8"
              style={{ background: "rgba(6,16,34,0.5)", border: "1px solid rgba(184,149,74,0.3)", borderTop: "4px solid #B8954A" }}
            >
              <span className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-gold" />
              <span className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-gold" />

              {o.primary && (
                <div className="inline-block px-2 py-0.5 mb-3 bg-gold font-cinzel text-ivory tracking-[0.3em] text-[10px] font-bold uppercase">
                  {t.headOfficeBadge}
                </div>
              )}

              <h3 className="font-cinzel text-ivory text-xl md:text-2xl font-normal tracking-wider mb-1">
                {o.city}
              </h3>
              <div className="font-cormorant italic text-gold/75 text-sm md:text-base mb-4">
                {o.role}
              </div>

              <div className="pt-3 border-t border-gold/15 font-cormorant text-ivory/80 text-sm md:text-base leading-relaxed">
                {o.lines.map((l) => (
                  <div key={l}>{l}</div>
                ))}
              </div>

              <div
                dir="ltr"
                className="mt-3 font-cinzel text-gold-bright tracking-[0.2em] text-sm md:text-base font-light tabular-nums"
              >
                {o.phone}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// Act 3 — Next Steps
// ═══════════════════════════════════════════════════════════════════

function NextStepsAct({ t }: { t: T }) {
  return (
    <div className="relative py-20 md:py-28 border-t border-gold/15 bg-sovereign-deep/25">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1 }}
          className="text-center mb-10 md:mb-14"
        >
          <div className="font-cinzel text-gold tracking-[0.5em] text-[10px] md:text-xs mb-3 opacity-90">
            {t.engagementLadder}
          </div>
          <h2 className="font-cinzel text-ivory tracking-[0.08em] text-2xl md:text-4xl font-light leading-tight">
            {t.fromIntro}
            <br />
            <span className="text-gold-gradient">{t.toExecution}</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {t.steps.map((s, i) => (
            <motion.div
              key={s.num}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: EASE.SPRING }}
              className="relative p-5 md:p-6 flex flex-col"
              style={{ background: "rgba(6,16,34,0.5)", border: "1px solid rgba(184,149,74,0.3)", borderTop: "3px solid #B8954A" }}
            >
              <span className="absolute top-2 right-2 w-3 h-3 border-t border-r border-gold/60" />
              <span className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-gold/60" />

              <div className="font-cinzel text-gold/60 text-3xl md:text-4xl font-light leading-none mb-3">
                {s.num}
              </div>
              <div className="w-8 h-px bg-gold/40 mb-3" />

              <h3 className="font-cinzel text-ivory tracking-[0.12em] text-sm md:text-base font-normal uppercase mb-3">
                {s.title}
              </h3>

              <p className="font-cormorant text-ivory/65 text-[13px] md:text-sm leading-relaxed flex-1">
                {s.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// Act 4 — Closing doctrine
// ═══════════════════════════════════════════════════════════════════

function ClosingDoctrine({ t }: { t: T }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 1.5 }}
      className="relative py-16 md:py-20 text-center border-t border-gold/15"
    >
      <div className="container mx-auto px-6 md:px-12 max-w-4xl">
        <div className="flex items-center justify-center gap-4 text-gold/50 mb-6">
          <span className="w-16 h-px bg-gold/40" />
          <span className="text-xs">◆</span>
          <span className="w-16 h-px bg-gold/40" />
        </div>

        <blockquote className="font-cinzel text-gold-gradient text-xl md:text-3xl lg:text-4xl font-light italic leading-relaxed tracking-wider">
          {t.doctrineA}
          <br className="hidden md:block" />
          {t.doctrineB}
        </blockquote>

        <div className="mt-6 font-cormorant italic text-ivory/55 text-sm md:text-base max-w-2xl mx-auto">
          {t.doctrineSub}
        </div>
      </div>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// Act 5 — Colophon
// ═══════════════════════════════════════════════════════════════════

function ColophonStrip({ t }: { t: T }) {
  return (
    <div className="relative py-14 md:py-16 border-t border-gold/15 bg-sovereign-deep/40">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1 }}
          className="mb-8 text-center"
        >
          <div className="font-cinzel text-gold/80 tracking-[0.4em] text-[10px] md:text-xs uppercase">
            {t.colophonTitle}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          <ColophonCard title={t.timelineTitle} rows={t.timeline} />
          <ColophonCard title={t.standardsTitle} rows={t.standards} />
          <ColophonReference t={t} />
        </div>
      </div>
    </div>
  );
}

function ColophonCard({ title, rows }: { title: string; rows: Row[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8 }}
      className="relative p-5 md:p-6"
      style={{ background: "rgba(6,16,34,0.4)", border: "1px solid rgba(184,149,74,0.25)" }}
    >
      <div className="font-cinzel text-gold tracking-[0.3em] text-[11px] uppercase font-semibold mb-4 pb-2 border-b border-gold/20">
        {title}
      </div>
      <div className="space-y-2">
        {rows.map((r) => (
          <div key={r.k} className="grid grid-cols-[110px_1fr] gap-3 text-[12.5px] md:text-[13px]">
            <span className="font-cinzel text-gold/70 tracking-[0.15em] text-[10px] md:text-[11px] uppercase">
              {r.k}
            </span>
            <span className="font-cormorant text-ivory/80 leading-snug">{r.v}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function ColophonReference({ t }: { t: T }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8 }}
      className="relative p-5 md:p-6 flex flex-col"
      style={{
        background: "linear-gradient(135deg, rgba(184,149,74,0.1) 0%, rgba(184,149,74,0.02) 100%)",
        border: "1px solid rgba(184,149,74,0.4)",
      }}
    >
      <div className="font-cinzel text-gold tracking-[0.3em] text-[11px] uppercase font-semibold mb-4 pb-2 border-b border-gold/20">
        {t.docRef}
      </div>
      <div className="flex-1">
        <div
          dir="ltr"
          className="font-cinzel text-gold-gradient text-xl md:text-2xl tracking-[0.2em] font-light mb-2"
        >
          KHG-SID-2026
        </div>
        <div className="font-cormorant italic text-ivory/75 text-sm leading-relaxed mb-3">
          {t.dossierName}
        </div>
        <div className="pt-3 border-t border-gold/15 font-cinzel text-ivory/55 tracking-[0.2em] text-[10px] md:text-[11px] uppercase leading-relaxed">
          {t.strictlyConfidential}
        </div>
      </div>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// Act 6 — Legal imprint
// ═══════════════════════════════════════════════════════════════════

function LegalImprint({ t }: { t: T }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 1.5 }}
      className="relative py-10 md:py-14 bg-sovereign-deep border-t-[3px]"
      style={{ borderTopColor: "#B8954A" }}
    >
      <div className="container mx-auto px-6 md:px-12 max-w-5xl">
        <p className="font-cormorant italic text-ivory/60 text-[12px] md:text-[13px] leading-relaxed text-center">
          <strong className="text-ivory/85 not-italic">{t.legalBold}</strong>
          {t.legalBody}
        </p>

        <div className="mt-6 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 text-center">
          <span className="font-cinzel text-gold tracking-[0.4em] text-[10px] md:text-[11px] uppercase font-semibold">
            {t.copyright}
          </span>
          <span className="hidden md:inline-block w-px h-4 bg-gold/40" />
          <span className="font-cinzel text-ivory/50 tracking-[0.35em] text-[10px] md:text-[11px] uppercase">
            {t.cities}
          </span>
          <span className="hidden md:inline-block w-px h-4 bg-gold/40" />
          <span className="font-cinzel text-ivory/50 tracking-[0.35em] text-[10px] md:text-[11px] uppercase">
            {t.allRights}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
