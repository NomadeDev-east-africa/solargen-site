"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useT } from "@/lib/translations";

const ease = [0.16, 1, 0.3, 1] as const;

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.35 } },
};
const item = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 1, ease } },
};

export default function Hero() {
  const t = useT();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "26%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.16]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  return (
    <section id="top" ref={ref} className="relative h-[100svh] min-h-[640px] w-full overflow-hidden">
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <Image
          src="/images/hero-technicien.png"
          alt="Technicien SOLARGEN devant une centrale solaire à Djibouti"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </motion.div>

      {/* overlays — bleu nuit pour lisibilité du texte */}
      <div className="absolute inset-0 bg-gradient-to-r from-night/92 via-night/55 to-night/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-night/80 via-transparent to-night/30" />

      {/* soleil décoratif */}
      <div className="absolute -right-24 top-24 h-72 w-72 rounded-full bg-sun/30 blur-3xl sm:h-96 sm:w-96" />

      <motion.div
        style={{ opacity }}
        className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-center px-5 pt-28 pb-20 sm:px-8"
      >
        <motion.div variants={container} initial="hidden" animate="show" className="max-w-3xl">
          <motion.div variants={item} className="mb-6 flex items-center gap-4">
            <span className="h-px w-12 bg-sun" />
            <span className="text-xs font-bold uppercase tracking-[0.34em] text-sun-light">{t.hero.eyebrow}</span>
          </motion.div>

          <motion.h1
            variants={item}
            className="font-display text-4xl font-extrabold leading-[1.06] text-white sm:text-6xl md:text-7xl"
          >
            {t.hero.titleLine1}
            <br />
            <span className="text-sun-gradient">{t.hero.titleLine2}</span>
          </motion.h1>

          <motion.p variants={item} className="mt-7 max-w-xl text-lg leading-relaxed text-white/80">
            {t.hero.paragraph}
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-4">
            <a href="#contact" className="btn-sun rounded-full px-8 py-4 text-sm tracking-wide">
              {t.hero.ctaPrimary}
            </a>
            <a href="#projects" className="btn-ghost-light rounded-full px-8 py-4 text-sm font-semibold tracking-wide">
              {t.hero.ctaSecondary}
            </a>
          </motion.div>

          <motion.div variants={item} className="mt-10 flex flex-wrap gap-x-7 gap-y-3">
            {[t.hero.badge1, t.hero.badge2].map((b) => (
              <span key={b} className="flex items-center gap-2 text-sm font-medium text-white/85">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-leaf-light">
                  <path d="m5 12 4 4L19 6" />
                </svg>
                {b}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* scroll hint */}
      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 flex flex-col items-center gap-3">
        <span className="text-[0.65rem] tracking-[0.4em] text-white/60">{t.hero.scroll}</span>
        <span className="relative grid h-10 w-6 justify-center rounded-full border border-white/40 pt-2">
          <span
            className="h-2 w-1 rounded-full bg-sun"
            style={{ animation: "scroll-hint 2s ease-in-out infinite" }}
          />
        </span>
      </div>
    </section>
  );
}
