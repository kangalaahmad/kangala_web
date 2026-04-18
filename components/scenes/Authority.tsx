"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

// Source: Kangala Sovereign Portfolio — page 07_medal (Mali) + page 07b_medal_burkina
// Both medals personally conferred; details verified from official state ceremonies.
const MEDALS = [
  {
    country: "République du Mali",
    countryAr: "جمهورية مالي",
    title: "Chevalier",
    titleAr: "فارس",
    order: "National Order of Mali",
    orderAr: "الوسام الوطني لمالي",
    year: "Bamako",
    note: "First non-Malian citizen — honor reserved for heads of state",
    noteAr: "أوّل مواطن غير مالي يُمنح هذا الوسام",
  },
  {
    country: "Burkina Faso",
    countryAr: "بوركينا فاسو",
    title: "Chevalier",
    titleAr: "فارس",
    order: "Ordre de l'Étalon",
    orderAr: "وسام الفحل",
    year: "6 Dec 2024",
    note: "Conferred by Captain Ibrahim Traoré, Transition President",
    noteAr: "منحه النقيب إبراهيم تراوري، رئيس المرحلة الانتقالية",
  },
];

export default function Authority() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const titleY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-[120vh] w-full bg-ivory text-sovereign overflow-hidden py-32"
    >
      {/* Background subtle gradient */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(184,149,74,0.06) 0%, transparent 60%)",
        }}
      />

      <motion.div
        style={{ y: titleY, opacity }}
        className="relative z-10 container mx-auto px-6 md:px-12 max-w-6xl"
      >
        {/* Section label */}
        <div className="text-center mb-20">
          <div className="font-cinzel text-gold tracking-[0.6em] text-[10px] md:text-xs mb-6 opacity-80">
            LEGITIMACY · EARNED
          </div>

          <h2 className="font-cairo display-lg font-light text-sovereign leading-tight tracking-tight">
            السلطة،
            <br />
            <span className="text-gold font-normal">لا تُدَّعى بل تُمنح.</span>
          </h2>

          <div className="mt-10 flex items-center justify-center gap-4 text-gold/50">
            <div className="w-20 h-px bg-gold/40" />
            <span className="text-xs">◆</span>
            <div className="w-20 h-px bg-gold/40" />
          </div>

          <p className="mt-10 font-cairo text-sovereign/70 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            وسامان فارسان، مُنحا شخصياً من رئيسَيْ دولتين،
            <br />
            شهادة على خدمة السيد علي كوناتي للسيادة الإقليمية.
          </p>
        </div>

        {/* Medals grid */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 mt-24">
          {MEDALS.map((m, i) => (
            <motion.div
              key={m.country}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2, delay: i * 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="group relative"
            >
              {/* Medal visual */}
              <div className="relative aspect-square max-w-sm mx-auto mb-8">
                {/* Outer ring */}
                <motion.div
                  whileInView={{ rotate: 360 }}
                  viewport={{ once: true }}
                  transition={{ duration: 3, delay: i * 0.3 }}
                  className="absolute inset-0 rounded-full border border-gold/30"
                />
                {/* Middle ring with dashes */}
                <div
                  className="absolute inset-8 rounded-full border-2 border-gold/60"
                  style={{
                    borderStyle: "dashed",
                  }}
                />
                {/* Inner filled circle */}
                <div className="absolute inset-16 rounded-full bg-gradient-to-br from-gold via-gold-bright to-gold-deep shadow-2xl flex items-center justify-center">
                  {/* Star */}
                  <svg
                    viewBox="0 0 24 24"
                    className="w-12 h-12 text-sovereign"
                    fill="currentColor"
                  >
                    <path d="M12 2l2.6 7.3L22 10l-5.5 5.3L18 23l-6-3.8L6 23l1.5-7.7L2 10l7.4-.7L12 2z" />
                  </svg>
                </div>
              </div>

              {/* Info */}
              <div className="text-center">
                <div className="font-cinzel text-gold tracking-[0.4em] text-xs uppercase mb-3 opacity-80">
                  {m.country}
                </div>
                <h3 className="font-cairo text-sovereign text-xl md:text-2xl font-semibold mb-2">
                  {m.orderAr}
                </h3>
                <div className="font-cairo text-sovereign/60 text-sm tracking-wide mb-4">
                  {m.titleAr}
                </div>
                {/* Context note — what makes this honor exceptional */}
                <div className="mx-auto max-w-xs pt-4 border-t border-gold/25">
                  <div className="font-cairo text-sovereign/75 text-xs md:text-sm leading-relaxed">
                    {m.noteAr}
                  </div>
                  <div className="font-cinzel text-gold/60 tracking-[0.25em] text-[9px] uppercase mt-3">
                    {m.year}
                  </div>
                </div>
              </div>

              {/* Corner frame */}
              <div className="absolute top-4 right-4 w-8 h-8 border-t border-r border-gold/30" />
              <div className="absolute bottom-4 left-4 w-8 h-8 border-b border-l border-gold/30" />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
