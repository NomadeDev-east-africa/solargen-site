"use client";

import { useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import Reveal from "./Reveal";
import { useT } from "@/lib/translations";
import { useLang, tr } from "@/lib/i18n";
import { products } from "@/lib/products";

export default function Products() {
  const t = useT();
  const { lang } = useLang();
  const [filter, setFilter] = useState("all");

  const visible = products.filter((p) => filter === "all" || p.category === filter);

  return (
    <section id="products" className="relative bg-snow py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal className="mb-4 flex items-center justify-center gap-4">
            <span className="h-px w-12 bg-sky" />
            <span className="eyebrow">{t.products.eyebrow}</span>
            <span className="h-px w-12 bg-sky" />
          </Reveal>
          <Reveal>
            <h2 className="font-display text-3xl font-extrabold leading-tight text-night sm:text-4xl md:text-5xl">
              {t.products.titlePre}
              <span className="text-solar-gradient">{t.products.titleEm}</span>
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="mt-5 text-lg leading-relaxed text-slate">{t.products.paragraph}</p>
          </Reveal>
        </div>

        {/* Filtres */}
        <Reveal delay={120} className="mt-10 flex flex-wrap justify-center gap-3">
          {t.products.filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={clsx(
                "rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300",
                filter === f.key
                  ? "bg-sky text-white shadow-[0_10px_24px_-12px_rgba(58,169,53,0.85)]"
                  : "border border-sky/20 bg-cloud text-slate hover:border-sky/40 hover:text-night"
              )}
            >
              {f.label}
            </button>
          ))}
        </Reveal>

        {/* Grille */}
        <motion.div layout className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((p) => (
              <motion.article
                key={p.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="group flex flex-col overflow-hidden rounded-2xl border border-sky/10 bg-snow card-soft"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-mist">
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold uppercase tracking-wider text-sky-deep backdrop-blur">
                    {p.brand}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-xl font-bold text-night">{p.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate">{tr(p.tagline, lang)}</p>

                  <dl className="mt-5 grid grid-cols-2 gap-3 border-t border-sky/10 pt-5">
                    {p.specs.map((s, i) => (
                      <div key={i}>
                        <dt className="text-[0.7rem] uppercase tracking-wider text-muted">{tr(s.label, lang)}</dt>
                        <dd className="font-display text-base font-bold text-night">{s.value}</dd>
                      </div>
                    ))}
                  </dl>

                  <a
                    href="#contact"
                    className="btn-ghost mt-6 inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold"
                  >
                    {t.products.cta}
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </a>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
