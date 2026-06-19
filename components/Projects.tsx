"use client";

import { useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import Reveal from "./Reveal";
import Lightbox from "./Lightbox";
import { useT } from "@/lib/translations";

export default function Projects() {
  const t = useT();
  // Lightbox global : on garde la liste d'images du projet ouvert + l'index.
  const [active, setActive] = useState<{ images: readonly string[]; alt: string } | null>(null);
  const [index, setIndex] = useState<number | null>(null);

  const openAt = (images: readonly string[], alt: string, i: number) => {
    setActive({ images, alt });
    setIndex(i);
  };

  return (
    <section id="projects" className="relative bg-cloud py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal className="mb-4 flex items-center justify-center gap-4">
            <span className="h-px w-12 bg-sky" />
            <span className="eyebrow">{t.projects.eyebrow}</span>
            <span className="h-px w-12 bg-sky" />
          </Reveal>
          <Reveal>
            <h2 className="font-display text-3xl font-extrabold leading-tight text-night sm:text-4xl md:text-5xl">
              {t.projects.titlePre}
              <span className="text-solar-gradient">{t.projects.titleEm}</span>
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="mt-5 text-lg leading-relaxed text-slate">{t.projects.paragraph}</p>
          </Reveal>
        </div>

        <div className="mt-16 space-y-20">
          {t.projects.items.map((project, pi) => {
            const reversed = pi % 2 === 1;
            return (
              <div
                key={project.title}
                className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14"
              >
                {/* Mosaïque d'images */}
                <Reveal className={clsx(reversed && "lg:order-2")}>
                  <div className="grid grid-cols-2 grid-rows-2 gap-3">
                    {project.images.slice(0, 4).map((src, i) => (
                      <button
                        key={src}
                        onClick={() => openAt(project.images, project.title, i)}
                        className={clsx(
                          "group relative overflow-hidden rounded-2xl card-soft",
                          i === 0 ? "col-span-2 aspect-[16/9]" : "aspect-square"
                        )}
                      >
                        <Image
                          src={src}
                          alt={`${project.title} — ${i + 1}`}
                          fill
                          sizes="(max-width: 1024px) 50vw, 25vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <span className="absolute inset-0 bg-night/0 transition-colors duration-500 group-hover:bg-night/20" />
                        {i === 3 && project.images.length > 4 && (
                          <span className="absolute inset-0 grid place-items-center bg-night/55 font-display text-2xl font-bold text-white">
                            +{project.images.length - 4}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </Reveal>

                {/* Texte */}
                <Reveal delay={120} className={clsx(reversed && "lg:order-1")}>
                  <span className="inline-flex items-center gap-2 rounded-full bg-leaf/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-leaf-deep">
                    <span className="h-1.5 w-1.5 rounded-full bg-leaf" />
                    {project.tag}
                  </span>
                  <h3 className="mt-5 font-display text-2xl font-extrabold text-night sm:text-3xl">
                    {project.title}
                  </h3>
                  <p className="mt-4 text-lg leading-relaxed text-slate">{project.text}</p>
                  <button
                    onClick={() => openAt(project.images, project.title, 0)}
                    className="btn-solar mt-7 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold"
                  >
                    {t.projects.viewLabel}
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </button>
                </Reveal>
              </div>
            );
          })}
        </div>
      </div>

      <Lightbox
        images={active?.images ?? []}
        alt={active?.alt ?? ""}
        index={index}
        onIndex={setIndex}
        onClose={() => setIndex(null)}
      />
    </section>
  );
}
