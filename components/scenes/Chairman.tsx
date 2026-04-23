"use client";

/**
 * Chairman — Mr. Ali Konaté, the sovereign guarantor of Kangala.
 *
 * Narrative position: between Hero (company identity) and Authority (credentials).
 * The viewer has just learned WHAT Kangala is; now they meet WHO stands behind it.
 *
 * Source: Kangala Sovereign Portfolio — page 05_leadership + text_extracted.txt.
 * Quote is the official chairman statement (verbatim).
 *
 * Layout: 50/50 grid — portrait (right in RTL desktop) / narrative (left).
 * Portrait receives subtle scroll-linked parallax; quote letters fade in.
 * Credentials row at bottom cross-references the two Authority medals + Dozoba.
 */

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import type { FullDict, SceneProps } from "@/lib/i18n";

const DICT: FullDict<{
  supra: string;
  mrName: string;
  titleSub: string;
  credentials: string;
  knightLabel: string;
  maliOrder: string;
  stallionOrder: string;
  dozoba: string;
  dozobaSub: string;
  sovereignLeadership: string;
  kangalaHolding: string;
  sovereign: string;
  statesman: string;
  community: string;
  portraitAlt: string;
  thumbSovereignAlt: string;
  thumbStatesmanAlt: string;
  thumbCommunityAlt: string;
  quote: string;
}> = {
  en: {
    supra: "THE CHAIRMAN",
    mrName: "Mr. Ali Konaté",
    titleSub: "Chairman & CEO  ·  Dozoba Sovereign Chief",
    credentials: "Sovereign Credentials",
    knightLabel: "Chevalier",
    maliOrder: "National Order of Mali",
    stallionOrder: "Ordre de l'Étalon · Burkina",
    dozoba: "Dozoba",
    dozobaSub: "Supreme Community Reference",
    sovereignLeadership: "Sovereign Leadership",
    kangalaHolding: "Kangala Holding Group",
    sovereign: "SOVEREIGN",
    statesman: "STATESMAN",
    community: "COMMUNITY",
    portraitAlt: "Mr. Ali Konaté — Chairman of Kangala Holding Group, in Dozoba ceremonial regalia",
    thumbSovereignAlt: "Dozoba sovereign chief",
    thumbStatesmanAlt: "Mr. Ali Konaté receiving the Chevalier of the National Order of Mali",
    thumbCommunityAlt: "Ali Konaté in Dozo initiation procession",
    quote: "We do not merely seek liquidity — we forge strategic alliances that embody our shared ambition to become the most trusted bridge between Dubai and Africa. Sovereign investment in pristine natural resources, paired with the localization of industrial processing technology.",
  },
  fr: {
    supra: "LE PRÉSIDENT",
    mrName: "M. Ali Konaté",
    titleSub: "Président-Directeur Général  ·  Chef Souverain Dozoba",
    credentials: "Références Souveraines",
    knightLabel: "Chevalier",
    maliOrder: "Ordre National du Mali",
    stallionOrder: "Ordre de l'Étalon · Burkina",
    dozoba: "Dozoba",
    dozobaSub: "Référence Suprême Communautaire",
    sovereignLeadership: "Direction Souveraine",
    kangalaHolding: "Kangala Holding Group",
    sovereign: "SOUVERAIN",
    statesman: "HOMME D'ÉTAT",
    community: "COMMUNAUTÉ",
    portraitAlt: "M. Ali Konaté — Président de Kangala Holding Group, en regalia cérémonielle Dozoba",
    thumbSovereignAlt: "Chef souverain Dozoba",
    thumbStatesmanAlt: "M. Ali Konaté recevant le Chevalier de l'Ordre National du Mali",
    thumbCommunityAlt: "Ali Konaté dans une procession d'initiation Dozo",
    quote: "Nous ne cherchons pas seulement la liquidité — nous forjons des alliances stratégiques qui incarnent notre ambition commune de devenir le pont le plus fiable entre Dubaï et l'Afrique. Un investissement souverain dans des ressources naturelles vierges, associé à la localisation de la technologie de traitement industriel.",
  },
  ar: {
    supra: "الرئيس",
    mrName: "السيد علي كوناتي",
    titleSub: "الرئيس التنفيذي · الزعيم السيادي دوزوبا",
    credentials: "المؤهلات السيادية",
    knightLabel: "فارس",
    maliOrder: "الوسام الوطني لمالي",
    stallionOrder: "وسام الفارس الذهبي · بوركينا",
    dozoba: "دزوبا",
    dozobaSub: "مرجعية المجتمع العليا",
    sovereignLeadership: "القيادة السيادية",
    kangalaHolding: "مجموعة كانغالا القابضة",
    sovereign: "سيادي",
    statesman: "رجل دولة",
    community: "مجتمع",
    portraitAlt: "السيد علي كوناتي — رئيس مجموعة كانغالا القابضة، بالزي الاحتفالي دوزوبا",
    thumbSovereignAlt: "الزعيم السيادي دوزوبا",
    thumbStatesmanAlt: "السيد علي كوناتي يتلقى وسام الفارس من الوسام الوطني لمالي",
    thumbCommunityAlt: "علي كوناتي في موكب إدخال الدوزو",
    quote: "لسنا نسعى فقط إلى السيولة — بل نصوغ تحالفاتٍ استراتيجية تُجسّد طموحنا المشترك في أن نكون الجسر الأكثر ثقةً بين دبي وأفريقيا. استثمارٌ سيادي في موارد طبيعية بكر، مقروناً بتوطين تقنية المعالجة الصناعية.",
  },
};

export default function Chairman({ lang = "en" }: SceneProps = {}) {
  const t = DICT[lang ?? "en"];
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Portrait y parallax — single dominant motion (Dieter Rams: one gesture per space)
  const portraitY = useTransform(scrollYProgress, [0, 1], [-30, 30]);

  // Text column enters at 10% → 25%
  const textOpacity = useTransform(scrollYProgress, [0.05, 0.25], [0, 1]);
  const textY = useTransform(scrollYProgress, [0.05, 0.25], [50, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-[110vh] w-full bg-sovereign overflow-hidden py-32 md:py-40"
    >
      {/* Atmospheric gold glow from right */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 70% 50%, rgba(184,149,74,0.12) 0%, transparent 60%)",
        }}
      />

      {/* Faint diagonal texture */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, rgba(184,149,74,0.6) 0 1px, transparent 1px 60px)",
        }}
      />

      <div className="relative z-10 container mx-auto px-6 md:px-12 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-[55%_45%] gap-10 md:gap-14 lg:gap-20 items-center">
          {/* ═══ TEXT COLUMN ═══ */}
          <motion.div
            style={{ opacity: textOpacity, y: textY }}
            className="relative order-2 md:order-1"
          >
            {/* Supra label */}
            <div className="font-cinzel text-gold tracking-[0.6em] text-[10px] md:text-xs mb-6 opacity-80">
              {t.supra}
            </div>

            {/* Name — Arabic heading in AR mode, Latin heading in EN/FR */}
            {lang === "ar" ? (
              <h2 className="font-cairo display-lg font-light text-ivory leading-[1.1] tracking-tight text-right" dir="rtl">
                السيد
                <span className="text-gold-gradient font-normal"> علي كوناتي</span>
              </h2>
            ) : (
              <h2 className="font-cinzel display-lg font-light text-ivory leading-[1.1] tracking-[0.06em]">
                {t.mrName}
              </h2>
            )}

            {/* Subtitle */}
            <div className="mt-4 font-cinzel text-ivory/50 tracking-[0.28em] text-[10px] md:text-xs uppercase">
              {t.titleSub}
            </div>

            {/* Divider */}
            <div className="mt-8 mb-8 flex items-center gap-4 text-gold/50">
              <div className="w-20 h-px bg-gold/40" />
              <span className="text-xs">◆</span>
              <div className="w-8 h-px bg-gold/20" />
            </div>

            {/* The quote — locale-resolved from DICT */}
            <blockquote className="relative">
              <span
                aria-hidden="true"
                className="absolute -top-4 -right-2 md:-right-4 text-gold/30 font-cinzel text-6xl md:text-7xl leading-none select-none"
              >
                &ldquo;
              </span>
              <p
                className={`relative text-ivory/85 text-base md:text-lg lg:text-xl leading-relaxed ${lang === "ar" ? "font-cairo pr-4 md:pr-8 text-right" : "font-cormorant italic"}`}
                dir={lang === "ar" ? "rtl" : "ltr"}
              >
                {t.quote}
              </p>
              <span
                aria-hidden="true"
                className="absolute -bottom-8 left-2 text-gold/30 font-cinzel text-6xl md:text-7xl leading-none select-none"
              >
                &rdquo;
              </span>
            </blockquote>

            {/* Credentials row — cross-references Authority medals + Dozoba status */}
            <div className="mt-16 pt-8 border-t border-gold/15">
              <div className="font-cinzel text-gold/60 tracking-[0.3em] text-[11px] uppercase mb-5">
                {t.credentials}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
                <CredentialBadge
                  icon="★"
                  label={t.knightLabel}
                  subLabel={t.maliOrder}
                />
                <CredentialBadge
                  icon="★"
                  label={t.knightLabel}
                  subLabel={t.stallionOrder}
                />
                <CredentialBadge
                  icon="◈"
                  label={t.dozoba}
                  subLabel={t.dozobaSub}
                />
              </div>
            </div>
          </motion.div>

          {/* ═══ PORTRAIT COLUMN ═══ */}
          <div className="relative order-1 md:order-2">
            <motion.div
              style={{ y: portraitY }}
              className="relative w-full max-w-md mx-auto"
            >
              {/* Outer gold frame */}
              <div className="relative aspect-[3/4] overflow-hidden border border-gold/40">
                {/* Inner soft border */}
                <div className="absolute inset-2 border border-gold/15 z-20 pointer-events-none" />

                {/* Hero portrait — Ali Konaté, Chairman (ali_kangala) */}
                <Image
                  src="/images/ali_kangala.jpeg"
                  alt={t.portraitAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover object-[50%_35%] ken-burns--a"
                  priority
                />

                {/* Subtle cinematic vignette (respects regalia detail) */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 z-10 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(ellipse at 50% 45%, transparent 55%, rgba(10,25,47,0.45) 100%)",
                  }}
                />

                {/* Gold gradient tint from bottom */}
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-1/3 z-10 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(10,25,47,0.9) 0%, transparent 100%)",
                  }}
                />
              </div>

              {/* Corner ornaments */}
              <div className="absolute -top-1 -left-1 w-8 h-8 border-t-2 border-l-2 border-gold pointer-events-none z-30" />
              <div className="absolute -top-1 -right-1 w-8 h-8 border-t-2 border-r-2 border-gold pointer-events-none z-30" />
              <div className="absolute -bottom-1 -left-1 w-8 h-8 border-b-2 border-l-2 border-gold pointer-events-none z-30" />
              <div className="absolute -bottom-1 -right-1 w-8 h-8 border-b-2 border-r-2 border-gold pointer-events-none z-30" />

              {/* Bottom plate — identification */}
              <div className="mt-6 text-center">
                <div className="inline-block relative px-6 py-3 border border-gold/25 bg-sovereign-deep/40 backdrop-blur-sm">
                  <div className="font-cinzel text-gold tracking-[0.3em] text-[10px] md:text-[11px] uppercase">
                    {t.sovereignLeadership}
                  </div>
                  <div className="mt-1 font-cinzel text-ivory/60 tracking-[0.25em] text-[10px] md:text-[11px] uppercase">
                    {t.kangalaHolding}
                  </div>
                </div>
              </div>

              {/* Three-facets thumbnail strip — Sovereign · Statesman · Community */}
              <div className="mt-8 grid grid-cols-3 gap-2 md:gap-3">
                <FacetThumb
                  src="/images/ali_tripe2.jpg"
                  alt={t.thumbSovereignAlt}
                  label={t.sovereign}
                  objectPosition="50% 30%"
                  active
                />
                <FacetThumb
                  src="/images/ali.jpg"
                  alt={t.thumbStatesmanAlt}
                  label={t.statesman}
                  objectPosition="50% 25%"
                  filter="brightness(0.94) contrast(1.08) saturate(1.08) sepia(0.04)"
                />
                <FacetThumb
                  src="/images/ali_tripe1.jpg"
                  alt={t.thumbCommunityAlt}
                  label={t.community}
                  objectPosition="50% 30%"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Facet thumbnail — shows the three dimensions of the Chairman ─── */
function FacetThumb({
  src,
  alt,
  label,
  objectPosition,
  filter,
  active = false,
}: {
  src: string;
  alt: string;
  label: string;
  objectPosition?: string;
  filter?: string;
  active?: boolean;
}) {
  return (
    <div
      className={`relative aspect-[3/4] overflow-hidden border ${
        active ? "border-gold/60" : "border-gold/20"
      } group`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 33vw, 15vw"
        className="object-cover transition-transform duration-700 group-hover:scale-105"
        style={{ objectPosition, filter }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-sovereign-deep/85 via-sovereign-deep/20 to-transparent"
      />
      <div className="absolute inset-x-0 bottom-1.5 text-center font-cinzel text-gold/90 tracking-[0.25em] text-[10px] md:text-[11px] uppercase">
        {label}
      </div>
    </div>
  );
}

/* ─── Credential badge component ─── */
function CredentialBadge({
  icon,
  label,
  subLabel,
}: {
  icon: string;
  label: string;
  subLabel: string;
}) {
  return (
    <div className="relative border border-gold/20 bg-sovereign-deep/30 p-4 backdrop-blur-sm group hover:border-gold/50 transition-colors duration-500">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-8 h-8 rounded-full border border-gold/40 flex items-center justify-center text-gold text-sm">
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-cinzel text-gold tracking-[0.2em] text-[10px] uppercase">
            {label}
          </div>
          <div className="font-cinzel text-ivory/45 text-[11px] tracking-[0.15em] uppercase mt-2 leading-tight">
            {subLabel}
          </div>
        </div>
      </div>
    </div>
  );
}
