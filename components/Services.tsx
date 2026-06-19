"use client";

import Reveal from "./Reveal";
import { useT } from "@/lib/translations";

const icons = [
  // Étude & dimensionnement — loupe/graph
  <path key="i" d="M3 3v18h18M7 14l3-3 3 3 5-6" />,
  // Vente de matériel — panier
  <><circle cx="9" cy="20" r="1.4" /><circle cx="17" cy="20" r="1.4" /><path d="M3 4h2l2.4 12.2a1 1 0 0 0 1 .8h8.2a1 1 0 0 0 1-.8L20 8H6" /></>,
  // Installation — clé
  <path key="i" d="M14.7 6.3a4 4 0 0 0 5 5l-9.4 9.4a2 2 0 0 1-2.8-2.8L14.7 6.3Z M13 8 4 17" />,
  // Batterie
  <><rect x="3" y="8" width="16" height="9" rx="2" /><path d="M22 11v3M7 12.5h6" /></>,
  // Pompage solaire — goutte
  <path key="i" d="M12 3s6 6.4 6 11a6 6 0 0 1-12 0c0-4.6 6-11 6-11Z" />,
  // Maintenance — engrenage
  <><circle cx="12" cy="12" r="3.2" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M19.1 4.9 17 7M7 17l-2.1 2.1" /></>,
];

export default function Services() {
  const t = useT();
  return (
    <section id="services" className="relative bg-cloud py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal className="mb-4 flex items-center justify-center gap-4">
            <span className="h-px w-12 bg-sky" />
            <span className="eyebrow">{t.services.eyebrow}</span>
            <span className="h-px w-12 bg-sky" />
          </Reveal>
          <Reveal>
            <h2 className="font-display text-3xl font-extrabold leading-tight text-night sm:text-4xl md:text-5xl">
              {t.services.titlePre}
              <span className="text-solar-gradient">{t.services.titleEm}</span>
            </h2>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {t.services.items.map(([title, desc], i) => (
            <Reveal key={title} delay={(i % 3) * 90}>
              <div className="group h-full rounded-2xl border border-sky/10 bg-snow p-7 card-soft transition-all duration-500 hover:-translate-y-1.5 hover:border-sky/30">
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-sky/10 to-leaf/10 text-sky transition-colors duration-500 group-hover:from-sky group-hover:to-sky-deep group-hover:text-white">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                    {icons[i]}
                  </svg>
                </span>
                <h3 className="mt-5 font-display text-xl font-bold text-night">{title}</h3>
                <p className="mt-2.5 leading-relaxed text-slate">{desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
