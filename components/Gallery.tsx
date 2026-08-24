"use client";

import { useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import Reveal from "./Reveal";
import Lightbox from "./Lightbox";
import { useT } from "@/lib/translations";

const IMAGES = [
  "/images/equipement-5.jpeg",
  "/images/cta-toiture.jpg",
  "/images/equipement-6.jpeg",
  "/images/projet-agropastoral-3.jpeg",
  "/images/equipement-7.jpeg",
  "/images/projet-halt-2.jpeg",
  "/images/equipement-8.jpeg",
  "/images/siege-halt.jpeg",
  "/images/equipement-9.jpeg",
  "/images/projet-agropastoral-5.jpeg",
  "/images/bureau.jpeg",
];

// Tailles variables pour un effet mosaïque (masonry).
const SPANS = [
  "row-span-2",
  "",
  "",
  "row-span-2",
  "",
  "",
  "row-span-2",
  "",
  "",
  "row-span-2",
  "",
];

export default function Gallery() {
  const t = useT();
  const [index, setIndex] = useState<number | null>(null);

  return (
    <section id="gallery" className="relative bg-snow py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal className="mb-4 flex items-center justify-center gap-4">
            <span className="h-px w-12 bg-sky" />
            <span className="eyebrow">{t.gallery.eyebrow}</span>
            <span className="h-px w-12 bg-sky" />
          </Reveal>
          <Reveal>
            <h2 className="font-display text-3xl font-extrabold leading-tight text-night sm:text-4xl md:text-5xl">
              {t.gallery.titlePre}
              <span className="text-solar-gradient">{t.gallery.titleEm}</span>
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="mt-5 text-lg leading-relaxed text-slate">{t.gallery.paragraph}</p>
          </Reveal>
        </div>

        <Reveal delay={120} className="mt-14">
          <div className="grid auto-rows-[180px] grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
            {IMAGES.map((src, i) => (
              <button
                key={src}
                onClick={() => setIndex(i)}
                className={clsx(
                  "group relative overflow-hidden rounded-2xl card-soft",
                  SPANS[i]
                )}
              >
                <Image
                  src={src}
                  alt={`SOLARGEN — réalisation ${i + 1}`}
                  fill
                  sizes="(max-width: 640px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-night/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <span className="absolute bottom-3 right-3 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-sky opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                  </svg>
                </span>
              </button>
            ))}
          </div>
        </Reveal>
      </div>

      <Lightbox
        images={IMAGES}
        alt="SOLARGEN — galerie"
        index={index}
        onIndex={setIndex}
        onClose={() => setIndex(null)}
      />
    </section>
  );
}
