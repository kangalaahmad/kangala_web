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
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
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

export default function Governance(_props: import("@/lib/i18n").SceneProps = {}) {
  return (
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

      {/* Bottom handshake */}
      <div
        className="h-px w-full"
        style={{
          background:
            "linear-gradient(90deg, transparent, #B8954A 50%, transparent)",
        }}
      />
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════
// Act 1 — Governance Model
// ═══════════════════════════════════════════════════════════════════

function GovernanceAct() {
  return (
    <div className="relative py-20 md:py-28">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        <ActHeader
          pre="TRUST FRAMEWORK · حوكمة سيادية"
          title="GOVERNANCE"
          highlight="MODEL"
          sub="Checks, balances, and aligned incentives for sustainable value creation"
        />

        {/* 5-step decision flow */}
        <div className="mb-10 md:mb-14">
          <div className="font-cinzel text-gold tracking-[0.35em] text-[10px] uppercase mb-3">
            Decision Flow
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3 md:gap-4">
            {DECISION_FLOW.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.7,
                  delay: i * 0.08,
                  ease: [0.22, 1, 0.36, 1],
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
                <div className="font-cinzel text-ivory text-[9px] tracking-[0.15em] uppercase px-2 py-1 bg-gold self-start">
                  {step.owner}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Core principles */}
        <div>
          <div className="font-cinzel text-gold tracking-[0.35em] text-[10px] uppercase mb-3">
            Core Principles
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3">
            {CORE_PRINCIPLES.map((p, i) => (
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
  return (
    <div className="relative py-20 md:py-28 border-t border-gold/25 bg-ivory-dark/25">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        <ActHeader
          pre="Board & Committees"
          title="OVERSIGHT"
          highlight="STRUCTURE"
          sub="Strategic direction, risk management, and transparent governance"
        />

        {/* Org chain strip */}
        <div className="mb-10">
          <div className="flex flex-col md:flex-row items-stretch gap-2 md:gap-0">
            {ORG_CHAIN.map((node, i) => (
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
                    className={`mt-1 font-cinzel text-[9px] md:text-[10px] tracking-[0.15em] uppercase ${
                      node.primary ? "text-gold" : "text-sovereign/60"
                    }`}
                  >
                    {node.sub}
                  </div>
                </motion.div>
                {i < ORG_CHAIN.length - 1 && (
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
          <TableCard title="Committees & Mandates">
            <table className="w-full text-left">
              <thead>
                <tr
                  className="font-cinzel text-ivory tracking-[0.2em] text-[9px] uppercase"
                  style={{ background: "#0A192F", borderBottom: "3px solid #B8954A" }}
                >
                  <th className="px-3 md:px-4 py-2.5">Committee</th>
                  <th className="px-3 md:px-4 py-2.5">Composition</th>
                  <th className="px-3 md:px-4 py-2.5">Mandate</th>
                  <th className="px-3 md:px-4 py-2.5">Freq.</th>
                </tr>
              </thead>
              <tbody className="font-cormorant text-sovereign/90 text-[12.5px] md:text-[13px]">
                {COMMITTEES.map((c, i) => (
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

          <TableCard title="Decision Authority Matrix">
            <div className="divide-y divide-gold/15">
              {AUTHORITY_MATRIX.map((row) => (
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
  return (
    <div className="relative py-20 md:py-28 border-t border-gold/25">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        <ActHeader
          pre="Responsible Stewardship"
          title="ESG"
          highlight="FRAMEWORK"
          sub="Sustainable development, community value, and responsible stewardship"
        />

        {/* 3 pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 mb-10">
          {ESG_PILLARS.map((p, i) => (
            <motion.div
              key={p.letter}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.8,
                delay: i * 0.12,
                ease: [0.22, 1, 0.36, 1],
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
          {ESG_TARGETS.map((t) => (
            <div
              key={t.lbl}
              className="bg-sovereign text-center py-5 px-3 relative"
            >
              <span className="absolute top-0 left-[25%] right-[25%] h-[3px] bg-gold" />
              <div className="font-cinzel text-gold text-2xl md:text-3xl font-light">
                {t.val}
              </div>
              <div className="mt-1.5 font-cinzel text-ivory/60 tracking-[0.2em] text-[9px] uppercase">
                {t.lbl}
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
  return (
    <div className="relative py-20 md:py-28 border-t border-gold/25 bg-ivory-dark/25">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        <ActHeader
          pre="Dispute Resolution · الآلية القانونية"
          title="ARBITRATION"
          highlight="LADDER"
          sub="Clear, fair, and internationally recognized mechanisms"
        />

        {/* 3-tier ladder */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 mb-10">
          {DISPUTE_TIERS.map((tier, i) => (
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
                  <div className="font-cinzel text-gold/80 tracking-[0.2em] text-[9px] uppercase mt-0.5">
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
          <TableCard title="Legal Framework">
            <div className="divide-y divide-gold/15">
              {LEGAL_FRAMEWORK.map((r) => (
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
            {PROTECTIONS.map((p, i) => (
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
            “Effective governance aligns incentives, accelerates delivery, and
            ensures transparency at every stage of the partnership.”
          </blockquote>
          <div className="hidden md:block w-px h-16 bg-gold/40" />
          <p className="flex-[0.55] font-cormorant text-ivory/75 text-[13px] md:text-sm leading-relaxed">
            Governance framework subject to final partnership agreement. All
            mechanisms protect both parties' interests under internationally
            recognized standards.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
