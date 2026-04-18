"use client";

/**
 * MedalMali — Chevalier de l'Ordre National du Mali
 *
 * Dedicated scene narrating Ali Konaté's historic decoration by the
 * Republic of Mali. The ceremony photo (official state portrait with
 * the decree certificate) is paired with a museum-quality shot of the
 * real medal (replacing the prior abstract star icon).
 *
 * Narrative beats:
 *   1. Supra label      — Presidential Distinction · وسام رئاسي
 *   2. Title            — Knight of the National Order of Mali
 *   3. Three-column     — Real medal · Story · Ceremony portrait
 *   4. Three facts      — Historical weight, unprecedented honor, the Order's grades
 *   5. Closing quote    — The sovereign bond
 *
 * Source: Sovereign_Final/page07_medal_EN.html (verbatim body text).
 */

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import type { Dict, SceneProps } from "@/lib/i18n";

const DICT: Dict<{
  supra: string;
  titleA: string;
  titleB: string;
  subArabic: string;
  established: string;
  badge: string;
  bodyPart1: string;
  orderParen: string;
  bodyPart2: string;
  dateHighlight: string;
  bodyPart3: string;
  decreeHighlight: string;
  bodyPart4: string;
  citizenHighlight: string;
  bodyPart5: string;
  fact1: string;
  fact2PreLink: string;
  fact2Link: string;
  fact2Post: string;
  fact3Pre: string;
  fact3Grades: string;
  fact3Post: string;
  quote: string;
  orderLabel: string;
  orderSub: string;
  ceremonyLabel: string;
  ceremonySub: string;
  medalAlt: string;
  ceremonyAlt: string;
}> = {
  en: {
    supra: "PRESIDENTIAL DISTINCTION",
    titleA: "KNIGHT OF THE NATIONAL",
    titleB: "ORDER OF MALI",
    subArabic: "فارس الوسام الوطني لجمهورية مالي",
    established: "Chevalier de l'Ordre National du Mali · Est. 31 May 1963",
    badge: "Mali's Highest Honorific Order",
    bodyPart1: "The National Order of Mali ",
    orderParen: "(Ordre National du Mali)",
    bodyPart2: " is the highest of all honorific orders of the Republic of Mali, established on ",
    dateHighlight: "31 May 1963",
    bodyPart3: " to celebrate national independence. Modelled on the French Legion of Honor, it is awarded by ",
    decreeHighlight: "presidential decree",
    bodyPart4: ". In an unprecedented distinction, the President of Mali personally conferred the rank of Knight upon Ali Konaté — ",
    citizenHighlight: "a citizen of Burkina Faso",
    bodyPart5: ".",
    fact1: "Conferred personally by the President of Mali at an official state ceremony in Bamako",
    fact2PreLink: "Ali is a Burkinabé national — ",
    fact2Link: "the first non-Malian citizen",
    fact2Post: " to receive this honor, historically reserved for heads of state such as Erdoğan and Kim Il Sung",
    fact3Pre: "The Order comprises ",
    fact3Grades: "five grades",
    fact3Post: ": Grand Cross, Grand Officer, Commander, Officer, and Knight — awarded for extraordinary contributions to national development",
    quote: "When a sovereign nation bestows its highest honor upon a foreign citizen, it declares a bond deeper than diplomacy — a bond forged through service.",
    orderLabel: "Ordre National du Mali",
    orderSub: "R.M. · République du Mali",
    ceremonyLabel: "Official Ceremony",
    ceremonySub: "Bamako · Republic of Mali",
    medalAlt: "Knight of the National Order of Mali — the authentic medal, silver cross with gold enamel and RM monogram",
    ceremonyAlt: "Mr. Ali Konaté holding the Chevalier of the National Order of Mali decree at the official state ceremony in Bamako",
  },
  fr: {
    supra: "DISTINCTION PRÉSIDENTIELLE",
    titleA: "CHEVALIER DE L'ORDRE",
    titleB: "NATIONAL DU MALI",
    subArabic: "فارس الوسام الوطني لجمهورية مالي",
    established: "Chevalier de l'Ordre National du Mali · Inst. 31 mai 1963",
    badge: "Plus haute distinction honorifique du Mali",
    bodyPart1: "L'Ordre National du Mali ",
    orderParen: "(Ordre National du Mali)",
    bodyPart2: " est la plus haute de toutes les distinctions honorifiques de la République du Mali, instituée le ",
    dateHighlight: "31 mai 1963",
    bodyPart3: " pour célébrer l'indépendance nationale. Inspiré de la Légion d'honneur française, il est décerné par ",
    decreeHighlight: "décret présidentiel",
    bodyPart4: ". Dans une distinction sans précédent, le Président du Mali a personnellement conféré le grade de Chevalier à Ali Konaté — ",
    citizenHighlight: "un citoyen du Burkina Faso",
    bodyPart5: ".",
    fact1: "Remis personnellement par le Président du Mali lors d'une cérémonie officielle d'État à Bamako",
    fact2PreLink: "Ali est de nationalité burkinabè — ",
    fact2Link: "le premier citoyen non malien",
    fact2Post: " à recevoir cet honneur, historiquement réservé aux chefs d'État tels qu'Erdoğan et Kim Il Sung",
    fact3Pre: "L'Ordre comprend ",
    fact3Grades: "cinq grades",
    fact3Post: " : Grand-Croix, Grand Officier, Commandeur, Officier et Chevalier — décernés pour des contributions exceptionnelles au développement national",
    quote: "Lorsqu'une nation souveraine décerne sa plus haute distinction à un citoyen étranger, elle proclame un lien plus profond que la diplomatie — un lien forgé par le service.",
    orderLabel: "Ordre National du Mali",
    orderSub: "R.M. · République du Mali",
    ceremonyLabel: "Cérémonie Officielle",
    ceremonySub: "Bamako · République du Mali",
    medalAlt: "Chevalier de l'Ordre National du Mali — la médaille authentique, croix d'argent émaillée d'or avec monogramme RM",
    ceremonyAlt: "M. Ali Konaté tenant le décret de Chevalier de l'Ordre National du Mali lors de la cérémonie officielle d'État à Bamako",
  },
};

export default function MedalMali({ lang = "en" }: SceneProps = {}) {
  const t = DICT[lang];
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Medal floats up as we enter
  const medalY = useTransform(scrollYProgress, [0, 0.5, 1], [40, 0, -40]);
  const medalScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.92, 1, 1.02]);

  // Ceremony photo drifts gently (parallax)
  const ceremonyY = useTransform(scrollYProgress, [0, 1], [-30, 30]);

  // Text column fade-in
  const textOpacity = useTransform(scrollYProgress, [0.1, 0.35], [0, 1]);
  const textY = useTransform(scrollYProgress, [0.1, 0.35], [40, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-[110vh] w-full bg-sovereign overflow-hidden py-28 md:py-36"
    >
      {/* Malian tri-color whisper — yellow/green/red gradient, extremely subtle */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-[0.06]"
        style={{
          background:
            "linear-gradient(90deg, rgba(16,122,66,0.4) 0%, rgba(252,209,22,0.4) 50%, rgba(206,17,38,0.4) 100%)",
        }}
      />

      {/* Radial gold atmosphere */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 30%, rgba(184,149,74,0.10) 0%, transparent 65%)",
        }}
      />

      {/* Header block */}
      <div className="relative z-10 container mx-auto px-6 md:px-12 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16 md:mb-20"
        >
          <div className="font-cinzel text-gold tracking-[0.6em] text-[10px] md:text-xs mb-4 opacity-80">
            {t.supra} · وسام رئاسي
          </div>

          <h2 className="font-cinzel text-ivory tracking-[0.15em] text-2xl md:text-4xl lg:text-5xl font-light leading-tight">
            {t.titleA}
            <br />
            <span className="text-gold-gradient">{t.titleB}</span>
          </h2>

          <div className="mt-4 font-cairo text-gold/75 text-sm md:text-base" dir="rtl">
            {t.subArabic}
          </div>

          <div className="mt-3 font-cinzel text-ivory/45 tracking-[0.3em] text-[10px] md:text-xs uppercase">
            {t.established}
          </div>

          {/* Decorative divider */}
          <div className="mt-8 flex items-center justify-center gap-4 text-gold/50">
            <div className="w-20 md:w-32 h-px bg-gold/30" />
            <span className="text-base">★</span>
            <div className="w-20 md:w-32 h-px bg-gold/30" />
          </div>
        </motion.div>

        {/* ═══ 3-column showcase: Medal · Story · Ceremony ═══ */}
        <div className="grid grid-cols-1 lg:grid-cols-[23%_42%_30%] gap-8 md:gap-10 lg:gap-12 items-start">
          {/* ─── Column 1: The real medal ─── */}
          <motion.div
            style={{ y: medalY, scale: medalScale }}
            className="relative mx-auto lg:mx-0 w-full max-w-[240px]"
          >
            <div className="relative aspect-[2/3] overflow-hidden border border-gold/40 bg-sovereign-deep/30">
              {/* Inner soft frame */}
              <div className="absolute inset-2 border border-gold/15 z-20 pointer-events-none" />

              <Image
                src="/images/medal_mali.jpg"
                alt={t.medalAlt}
                fill
                sizes="(max-width: 1024px) 50vw, 20vw"
                className="object-contain p-4"
              />

              {/* Soft gold glow behind medal */}
              <div
                aria-hidden="true"
                className="absolute inset-0 -z-10 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle at 50% 50%, rgba(184,149,74,0.25) 0%, transparent 65%)",
                }}
              />
            </div>

            {/* Corner ornaments */}
            <div className="absolute -top-1 -left-1 w-6 h-6 border-t-2 border-l-2 border-gold pointer-events-none" />
            <div className="absolute -top-1 -right-1 w-6 h-6 border-t-2 border-r-2 border-gold pointer-events-none" />
            <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-2 border-l-2 border-gold pointer-events-none" />
            <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-2 border-r-2 border-gold pointer-events-none" />

            <div className="mt-4 text-center font-cinzel text-gold/80 tracking-[0.25em] text-[10px] uppercase">
              {t.orderLabel}
            </div>
            <div className="mt-1 text-center font-cinzel text-ivory/40 tracking-[0.2em] text-[9px] uppercase">
              {t.orderSub}
            </div>
          </motion.div>

          {/* ─── Column 2: Story ─── */}
          <motion.div style={{ opacity: textOpacity, y: textY }} className="relative">
            {/* Badge */}
            <div className="inline-block px-4 py-1.5 border border-gold/30 bg-gold/5 backdrop-blur-sm mb-6">
              <div className="font-cinzel text-gold tracking-[0.3em] text-[10px] uppercase">
                {t.badge}
              </div>
            </div>

            {/* Body */}
            <p className="font-cairo text-ivory/85 text-sm md:text-base leading-relaxed">
              {t.bodyPart1}
              <span className="text-ivory/60">{t.orderParen}</span>
              {t.bodyPart2}
              <span className="text-gold">{t.dateHighlight}</span>
              {t.bodyPart3}
              <span className="text-ivory">{t.decreeHighlight}</span>
              {t.bodyPart4}
              <span className="text-gold">{t.citizenHighlight}</span>
              {t.bodyPart5}
            </p>

            {/* Three facts */}
            <ul className="mt-8 space-y-4">
              <FactRow n="1" text={t.fact1} />
              <FactRow
                n="2"
                text={
                  <>
                    {t.fact2PreLink}
                    <span className="text-gold">{t.fact2Link}</span>
                    {t.fact2Post}
                  </>
                }
              />
              <FactRow
                n="3"
                text={
                  <>
                    {t.fact3Pre}
                    <span className="text-ivory">{t.fact3Grades}</span>
                    {t.fact3Post}
                  </>
                }
              />
            </ul>

            {/* Closing quote */}
            <blockquote className="mt-10 relative pl-5 md:pl-6 border-l-2 border-gold/40">
              <p className="font-cairo italic text-ivory/75 text-sm md:text-base leading-relaxed">
                <span className="text-gold/70 font-cinzel text-xl mr-1">“</span>
                {t.quote}
                <span className="text-gold/70 font-cinzel text-xl ml-1">”</span>
              </p>
            </blockquote>
          </motion.div>

          {/* ─── Column 3: Ceremony portrait ─── */}
          <motion.div
            style={{ y: ceremonyY }}
            className="relative mx-auto lg:mx-0 w-full max-w-[320px]"
          >
            <div className="relative aspect-[3/4] overflow-hidden border border-gold/40">
              <div className="absolute inset-2 border border-gold/15 z-20 pointer-events-none" />

              <Image
                src="/images/ali_mali_ceremony.png"
                alt={t.ceremonyAlt}
                fill
                sizes="(max-width: 1024px) 60vw, 25vw"
                className="object-cover object-[50%_20%]"
              />

              {/* Vignette */}
              <div
                aria-hidden="true"
                className="absolute inset-0 z-10 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse at 50% 40%, transparent 55%, rgba(10,25,47,0.5) 100%)",
                }}
              />

              {/* Bottom gold fade */}
              <div
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-1/4 z-10 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(to top, rgba(10,25,47,0.85) 0%, transparent 100%)",
                }}
              />
            </div>

            {/* Corner ornaments */}
            <div className="absolute -top-1 -left-1 w-7 h-7 border-t-2 border-l-2 border-gold pointer-events-none" />
            <div className="absolute -top-1 -right-1 w-7 h-7 border-t-2 border-r-2 border-gold pointer-events-none" />
            <div className="absolute -bottom-1 -left-1 w-7 h-7 border-b-2 border-l-2 border-gold pointer-events-none" />
            <div className="absolute -bottom-1 -right-1 w-7 h-7 border-b-2 border-r-2 border-gold pointer-events-none" />

            <div className="mt-4 text-center font-cinzel text-gold/80 tracking-[0.25em] text-[10px] uppercase">
              {t.ceremonyLabel}
            </div>
            <div className="mt-1 text-center font-cinzel text-ivory/40 tracking-[0.2em] text-[9px] uppercase">
              {t.ceremonySub}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─── Single fact row ─── */
function FactRow({
  n,
  text,
  highlightIndices: _h,
}: {
  n: string;
  text: React.ReactNode;
  highlightIndices?: number[];
}) {
  return (
    <li className="flex items-start gap-3 md:gap-4">
      <div className="flex-shrink-0 mt-0.5 w-6 h-6 rounded-full border border-gold/50 flex items-center justify-center font-cinzel text-gold text-[10px]">
        {n}
      </div>
      <div className="font-cairo text-ivory/75 text-sm md:text-[15px] leading-relaxed">
        {text}
      </div>
    </li>
  );
}
