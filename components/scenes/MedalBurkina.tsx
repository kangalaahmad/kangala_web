"use client";

/**
 * MedalBurkina — Chevalier de l'Ordre de l'Étalon (Burkina Faso, 2024)
 *
 * Dedicated scene documenting the 6 December 2024 state ceremony at
 * which Captain Ibrahim Traoré, President of the Transition, decorated
 * Ali Konaté as Knight of the Order of the Stallion — Burkina Faso's
 * highest national honor (established 2017).
 *
 * Visual composition mirrors MedalMali but with:
 *   • Red/green Burkinabé color whisper in the backdrop
 *   • Close-up ceremony portrait (seated, medal pinned on suit)
 *   • Three contribution facts with specific numeric impact
 *
 * Source: Sovereign_Final/page07b_medal_burkina_EN.html (verbatim body).
 */

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import type { Dict, SceneProps } from "@/lib/i18n";

type T = {
  supra: string;
  titleA: string;
  titleB: string;
  subArabic: string;
  subtitle: string;
  badge: string;
  bodyP1: string;
  orderParen: string;
  bodyP2: string;
  year2017: string;
  bodyP3: string;
  dateCeremony: string;
  bodyP4: string;
  traoreName: string;
  bodyP5: string;
  patriotism: string;
  bodyP6: string;
  fact1Pre: string;
  fact1Highlight: string;
  fact1Post: string;
  fact2Pre: string;
  fact2Cement: string;
  fact2Mid: string;
  fact2Molds: string;
  fact2Post: string;
  fact2Initiative: string;
  fact2End: string;
  fact3Pre: string;
  fact3Wells: string;
  fact3Mid1: string;
  fact3Ambulance: string;
  fact3Mid2: string;
  fact3Bridge: string;
  fact3Post: string;
  quote: string;
  orderLabel: string;
  orderSub: string;
  ceremonyLabel: string;
  ceremonySub: string;
  medalAlt: string;
  ceremonyAlt: string;
};

const DICT: Dict<T> = {
  en: {
    supra: "NATIONAL DISTINCTION",
    titleA: "KNIGHT OF THE ORDER",
    titleB: "OF THE STALLION",
    subArabic: "فارس وسام الحصان — أعلى أوسمة بوركينا فاسو",
    subtitle: "Chevalier de l'Ordre de l'Étalon · 6 December 2024",
    badge: "Burkina Faso's Highest Honor",
    bodyP1: "The Order of the Stallion ",
    orderParen: "(Ordre de l'Étalon)",
    bodyP2: " is the highest honorific order of Burkina Faso, established in ",
    year2017: "2017",
    bodyP3: " to replace the former National Order. On ",
    dateCeremony: "6 December 2024",
    bodyP4: ", in an official state ceremony in Ouagadougou presided by ",
    traoreName: "Captain Ibrahim Traoré",
    bodyP5: ", President of the Transition, Ali Konaté was decorated as Knight of the Order in recognition of his exceptional ",
    patriotism: "patriotism and service",
    bodyP6: " to the nation.",
    fact1Pre: "Donated ",
    fact1Highlight: "200 motorcycles",
    fact1Post: " to the Volunteers for the Defense of the Fatherland (VDP) and traditional Dozo fighters in the war against terrorism",
    fact2Pre: "Contributed ",
    fact2Cement: "100 tons of cement",
    fact2Mid: " and ",
    fact2Molds: "1,000 paving molds",
    fact2Post: " to the presidential initiative ",
    fact2Initiative: "“Faso Mêô”",
    fact2End: " for national infrastructure",
    fact3Pre: "Built dozens of ",
    fact3Wells: "water wells",
    fact3Mid1: ", donated an ",
    fact3Ambulance: "ambulance",
    fact3Mid2: ", fully rehabilitated the ",
    fact3Bridge: "Nassou bridge",
    fact3Post: ", and distributed hundreds of tons of rice and sugar to vulnerable communities",
    quote: "When a citizen answers his nation's call with his own resources, he becomes more than a businessman — he becomes a pillar of sovereignty.",
    orderLabel: "Ordre de l'Étalon",
    orderSub: "Burkina Faso",
    ceremonyLabel: "Official Ceremony",
    ceremonySub: "Ouagadougou · 6 Dec 2024",
    medalAlt: "Ordre de l'Étalon — the authentic Burkinabé medal, a golden star on red-and-green ribbon",
    ceremonyAlt: "Mr. Ali Konaté wearing the Chevalier of the Order of the Stallion at the 6 December 2024 state ceremony in Ouagadougou",
  },
  fr: {
    supra: "DISTINCTION NATIONALE",
    titleA: "CHEVALIER DE L'ORDRE",
    titleB: "DE L'ÉTALON",
    subArabic: "فارس وسام الحصان — أعلى أوسمة بوركينا فاسو",
    subtitle: "Chevalier de l'Ordre de l'Étalon · 6 décembre 2024",
    badge: "Plus haute distinction du Burkina Faso",
    bodyP1: "L'Ordre de l'Étalon ",
    orderParen: "(Ordre de l'Étalon)",
    bodyP2: " est la plus haute distinction honorifique du Burkina Faso, créée en ",
    year2017: "2017",
    bodyP3: " pour remplacer l'ancien Ordre National. Le ",
    dateCeremony: "6 décembre 2024",
    bodyP4: ", lors d'une cérémonie officielle à Ouagadougou présidée par le ",
    traoreName: "Capitaine Ibrahim Traoré",
    bodyP5: ", Président de la Transition, Ali Konaté a été décoré Chevalier de l'Ordre en reconnaissance de son ",
    patriotism: "patriotisme exceptionnel",
    bodyP6: " et de ses services rendus à la nation.",
    fact1Pre: "Don de ",
    fact1Highlight: "200 motos",
    fact1Post: " aux Volontaires pour la Défense de la Patrie (VDP) et aux chasseurs traditionnels Dozos dans la lutte contre le terrorisme",
    fact2Pre: "Contribution de ",
    fact2Cement: "100 tonnes de ciment",
    fact2Mid: " et ",
    fact2Molds: "1 000 moules de pavés",
    fact2Post: " à l'initiative présidentielle ",
    fact2Initiative: "« Faso Mêô »",
    fact2End: " pour les infrastructures nationales",
    fact3Pre: "Construction de dizaines de ",
    fact3Wells: "puits d'eau",
    fact3Mid1: ", don d'une ",
    fact3Ambulance: "ambulance",
    fact3Mid2: ", réhabilitation complète du ",
    fact3Bridge: "pont de Nassou",
    fact3Post: ", et distribution de centaines de tonnes de riz et de sucre aux populations vulnérables",
    quote: "Lorsqu'un citoyen répond à l'appel de sa nation avec ses propres ressources, il devient plus qu'un homme d'affaires — il devient un pilier de souveraineté.",
    orderLabel: "Ordre de l'Étalon",
    orderSub: "Burkina Faso",
    ceremonyLabel: "Cérémonie Officielle",
    ceremonySub: "Ouagadougou · 6 déc. 2024",
    medalAlt: "Ordre de l'Étalon — la médaille burkinabé authentique, étoile dorée sur ruban rouge et vert",
    ceremonyAlt: "M. Ali Konaté portant le Chevalier de l'Ordre de l'Étalon lors de la cérémonie d'État du 6 décembre 2024 à Ouagadougou",
  },
};

export default function MedalBurkina({ lang = "en" }: SceneProps = {}) {
  const t = DICT[lang];
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const medalY = useTransform(scrollYProgress, [0, 0.5, 1], [40, 0, -40]);
  const medalScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.92, 1, 1.02]);
  const ceremonyY = useTransform(scrollYProgress, [0, 1], [-30, 30]);
  const textOpacity = useTransform(scrollYProgress, [0.1, 0.35], [0, 1]);
  const textY = useTransform(scrollYProgress, [0.1, 0.35], [40, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-[110vh] w-full bg-sovereign overflow-hidden py-28 md:py-36"
    >
      {/* Burkinabé flag whisper — red top + green bottom (subtle) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-[0.07]"
        style={{
          background:
            "linear-gradient(180deg, rgba(239,42,53,0.35) 0%, transparent 40%, transparent 60%, rgba(0,158,73,0.35) 100%)",
        }}
      />

      {/* Gold radial atmosphere */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 30%, rgba(184,149,74,0.10) 0%, transparent 65%)",
        }}
      />

      <div className="relative z-10 container mx-auto px-6 md:px-12 max-w-7xl">
        {/* ═══ Header ═══ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16 md:mb-20"
        >
          <div className="font-cinzel text-gold tracking-[0.6em] text-[10px] md:text-xs mb-4 opacity-80">
            {t.supra} · BURKINA FASO · وسام وطني
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
            {t.subtitle}
          </div>

          <div className="mt-8 flex items-center justify-center gap-4 text-gold/50">
            <div className="w-20 md:w-32 h-px bg-gold/30" />
            <span className="text-base">★</span>
            <div className="w-20 md:w-32 h-px bg-gold/30" />
          </div>
        </motion.div>

        {/* ═══ 3-column: Medal · Story · Ceremony ═══ */}
        <div className="grid grid-cols-1 lg:grid-cols-[23%_42%_30%] gap-8 md:gap-10 lg:gap-12 items-start">
          {/* ─── Column 1: Real medal ─── */}
          <motion.div
            style={{ y: medalY, scale: medalScale }}
            className="relative mx-auto lg:mx-0 w-full max-w-[240px]"
          >
            <div className="relative aspect-[2/3] overflow-hidden border border-gold/40 bg-sovereign-deep/30">
              <div className="absolute inset-2 border border-gold/15 z-20 pointer-events-none" />

              <Image
                src="/images/medal_burkina.jpg"
                alt={t.medalAlt}
                fill
                sizes="(max-width: 1024px) 50vw, 20vw"
                className="object-contain p-4"
              />

              <div
                aria-hidden="true"
                className="absolute inset-0 -z-10 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle at 50% 50%, rgba(184,149,74,0.25) 0%, transparent 65%)",
                }}
              />
            </div>

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
            <div className="inline-block px-4 py-1.5 border border-gold/30 bg-gold/5 backdrop-blur-sm mb-6">
              <div className="font-cinzel text-gold tracking-[0.3em] text-[10px] uppercase">
                {t.badge}
              </div>
            </div>

            <p className="font-cairo text-ivory/85 text-sm md:text-base leading-relaxed">
              {t.bodyP1}
              <span className="text-ivory/60">{t.orderParen}</span>
              {t.bodyP2}
              <span className="text-gold">{t.year2017}</span>
              {t.bodyP3}
              <span className="text-gold">{t.dateCeremony}</span>
              {t.bodyP4}
              <span className="text-ivory">{t.traoreName}</span>
              {t.bodyP5}
              <span className="text-ivory">{t.patriotism}</span>
              {t.bodyP6}
            </p>

            {/* Three contribution facts */}
            <ul className="mt-8 space-y-4">
              <FactRow
                n="1"
                text={
                  <>
                    {t.fact1Pre}
                    <span className="text-gold">{t.fact1Highlight}</span>
                    {t.fact1Post}
                  </>
                }
              />
              <FactRow
                n="2"
                text={
                  <>
                    {t.fact2Pre}
                    <span className="text-gold">{t.fact2Cement}</span>
                    {t.fact2Mid}
                    <span className="text-gold">{t.fact2Molds}</span>
                    {t.fact2Post}
                    <em className="text-ivory not-italic">{t.fact2Initiative}</em>
                    {t.fact2End}
                  </>
                }
              />
              <FactRow
                n="3"
                text={
                  <>
                    {t.fact3Pre}
                    <span className="text-ivory">{t.fact3Wells}</span>
                    {t.fact3Mid1}
                    <span className="text-ivory">{t.fact3Ambulance}</span>
                    {t.fact3Mid2}
                    <span className="text-gold">{t.fact3Bridge}</span>
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
                src="/images/ali_burkina_ceremony.png"
                alt={t.ceremonyAlt}
                fill
                sizes="(max-width: 1024px) 60vw, 25vw"
                className="object-cover object-[50%_25%]"
              />

              <div
                aria-hidden="true"
                className="absolute inset-0 z-10 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse at 50% 40%, transparent 55%, rgba(10,25,47,0.5) 100%)",
                }}
              />

              <div
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-1/4 z-10 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(to top, rgba(10,25,47,0.85) 0%, transparent 100%)",
                }}
              />
            </div>

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

function FactRow({ n, text }: { n: string; text: React.ReactNode }) {
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
