"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import Reveal from "./Reveal";
import { useT } from "@/lib/translations";

export default function About() {
  const t = useT();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "10%"]);

  return (
    <section id="about" className="relative overflow-hidden bg-snow py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20">
        {/* Image */}
        <Reveal className="relative">
          <div ref={ref} className="relative aspect-[4/5] overflow-hidden rounded-3xl card-glow">
            <motion.div style={{ y }} className="absolute inset-0 scale-110">
              <Image
                src="/images/about-equipe.png"
                alt="Équipe SOLARGEN en installation à Djibouti"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </motion.div>
          </div>
          {/* carte flottante */}
          <div className="absolute -bottom-7 -right-3 w-52 rounded-2xl bg-night p-5 text-white card-glow sm:right-6">
            <span className="font-display text-4xl font-extrabold text-sun-gradient">3000h+</span>
            <p className="mt-1 text-xs leading-snug text-white/75">{t.about.cardText}</p>
          </div>
          <div className="absolute -left-3 -top-3 grid h-16 w-16 place-items-center rounded-2xl bg-sun text-night animate-float-slow">
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M19.1 4.9 17 7M7 17l-2.1 2.1" />
            </svg>
          </div>
        </Reveal>

        {/* Texte */}
        <div>
          <Reveal className="mb-5 flex items-center gap-4">
            <span className="h-px w-12 bg-sky" />
            <span className="eyebrow">{t.about.eyebrow}</span>
          </Reveal>
          <Reveal>
            <h2 className="font-display text-3xl font-extrabold leading-tight text-night sm:text-4xl md:text-5xl">
              {t.about.titlePre}
              <span className="text-solar-gradient">{t.about.titleEm}</span>
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="mt-6 text-lg leading-relaxed text-slate">{t.about.paragraph1}</p>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-4 leading-relaxed text-slate">{t.about.paragraph2}</p>
          </Reveal>

          <Reveal delay={220} className="mt-9 grid gap-5 sm:grid-cols-2">
            {t.about.features.map(([title, desc]) => (
              <div key={title} className="flex gap-3.5">
                <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full bg-mist text-sky">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <path d="m5 12 4 4L19 6" />
                  </svg>
                </span>
                <div>
                  <p className="font-semibold text-night">{title}</p>
                  <p className="mt-0.5 text-sm leading-snug text-muted">{desc}</p>
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
