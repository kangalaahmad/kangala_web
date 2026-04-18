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
import type { SceneProps } from "@/lib/i18n";

export default function MedalBurkina(_props: SceneProps = {}) {
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
            NATIONAL DISTINCTION · BURKINA FASO · وسام وطني
          </div>

          <h2 className="font-cinzel text-ivory tracking-[0.15em] text-2xl md:text-4xl lg:text-5xl font-light leading-tight">
            KNIGHT OF THE ORDER
            <br />
            <span className="text-gold-gradient">OF THE STALLION</span>
          </h2>

          <div className="mt-4 font-cairo text-gold/75 text-sm md:text-base" dir="rtl">
            فارس وسام الحصان — أعلى أوسمة بوركينا فاسو
          </div>

          <div className="mt-3 font-cinzel text-ivory/45 tracking-[0.3em] text-[10px] md:text-xs uppercase">
            Chevalier de l&apos;Ordre de l&apos;Étalon · 6 December 2024
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
                alt="Ordre de l'Étalon — the authentic Burkinabé medal, a golden star on red-and-green ribbon"
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
              Ordre de l&apos;Étalon
            </div>
            <div className="mt-1 text-center font-cinzel text-ivory/40 tracking-[0.2em] text-[9px] uppercase">
              Burkina Faso
            </div>
          </motion.div>

          {/* ─── Column 2: Story ─── */}
          <motion.div style={{ opacity: textOpacity, y: textY }} className="relative">
            <div className="inline-block px-4 py-1.5 border border-gold/30 bg-gold/5 backdrop-blur-sm mb-6">
              <div className="font-cinzel text-gold tracking-[0.3em] text-[10px] uppercase">
                Burkina Faso&apos;s Highest Honor
              </div>
            </div>

            <p className="font-cairo text-ivory/85 text-sm md:text-base leading-relaxed">
              The Order of the Stallion{" "}
              <span className="text-ivory/60">(Ordre de l&apos;Étalon)</span> is
              the highest honorific order of Burkina Faso, established in{" "}
              <span className="text-gold">2017</span> to replace the former
              National Order. On{" "}
              <span className="text-gold">6 December 2024</span>, in an official
              state ceremony in Ouagadougou presided by{" "}
              <span className="text-ivory">Captain Ibrahim Traoré</span>,
              President of the Transition, Ali Konaté was decorated as Knight of
              the Order in recognition of his exceptional{" "}
              <span className="text-ivory">patriotism and service</span> to the
              nation.
            </p>

            {/* Three contribution facts */}
            <ul className="mt-8 space-y-4">
              <FactRow
                n="1"
                text={
                  <>
                    Donated <span className="text-gold">200 motorcycles</span> to
                    the Volunteers for the Defense of the Fatherland (VDP) and
                    traditional Dozo fighters in the war against terrorism
                  </>
                }
              />
              <FactRow
                n="2"
                text={
                  <>
                    Contributed{" "}
                    <span className="text-gold">100 tons of cement</span> and{" "}
                    <span className="text-gold">1,000 paving molds</span> to the
                    presidential initiative{" "}
                    <em className="text-ivory not-italic">“Faso Mêbô”</em> for
                    national infrastructure
                  </>
                }
              />
              <FactRow
                n="3"
                text={
                  <>
                    Built dozens of{" "}
                    <span className="text-ivory">water wells</span>, donated an{" "}
                    <span className="text-ivory">ambulance</span>, fully
                    rehabilitated the{" "}
                    <span className="text-gold">Nassou bridge</span>, and
                    distributed hundreds of tons of rice and sugar to vulnerable
                    communities
                  </>
                }
              />
            </ul>

            {/* Closing quote */}
            <blockquote className="mt-10 relative pl-5 md:pl-6 border-l-2 border-gold/40">
              <p className="font-cairo italic text-ivory/75 text-sm md:text-base leading-relaxed">
                <span className="text-gold/70 font-cinzel text-xl mr-1">“</span>
                When a citizen answers his nation&apos;s call with his own
                resources, he becomes more than a businessman — he becomes a
                pillar of sovereignty.
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
                alt="Mr. Ali Konaté wearing the Chevalier of the Order of the Stallion at the 6 December 2024 state ceremony in Ouagadougou"
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
              Official Ceremony
            </div>
            <div className="mt-1 text-center font-cinzel text-ivory/40 tracking-[0.2em] text-[9px] uppercase">
              Ouagadougou · 6 Dec 2024
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
