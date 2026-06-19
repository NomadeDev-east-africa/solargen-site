"use client";

import Reveal from "./Reveal";
import { useT } from "@/lib/translations";

const icons = [
  <path key="i" d="M12 2 4 7v6c0 5 3.4 8 8 9 4.6-1 8-4 8-9V7l-8-5Zm-1 13-3-3 1.4-1.4L11 12.2l4.6-4.6L17 9l-6 6Z" />,
  <path key="i" d="M12 3s6 6.4 6 11a6 6 0 0 1-12 0c0-4.6 6-11 6-11Z" />,
  <><rect x="3" y="8" width="16" height="9" rx="2" /><path d="M22 11v3M7 12.5h6" /></>,
  <path key="i" d="M3 17l5-5 4 4 8-9M21 7v5h-5" />,
];

export default function Advantages() {
  const t = useT();
  return (
    <section className="relative overflow-hidden bg-night py-24 sm:py-32 text-white">
      {/* halos décoratifs */}
      <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-sky/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-sun/15 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal className="mb-4 flex items-center justify-center gap-4">
            <span className="h-px w-12 bg-sun" />
            <span className="text-xs font-bold uppercase tracking-[0.34em] text-sun-light">{t.advantages.eyebrow}</span>
            <span className="h-px w-12 bg-sun" />
          </Reveal>
          <Reveal>
            <h2 className="font-display text-3xl font-extrabold leading-tight sm:text-4xl md:text-5xl">
              {t.advantages.titlePre}
              <span className="text-sun-gradient">{t.advantages.titleEm}</span>
            </h2>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {t.advantages.items.map(([title, desc], i) => (
            <Reveal key={title} delay={(i % 4) * 80}>
              <div className="h-full rounded-2xl border border-white/10 bg-white/5 p-7 backdrop-blur-sm transition-colors duration-500 hover:border-sun/40 hover:bg-white/[0.07]">
                <span className="grid h-13 w-13 place-items-center rounded-2xl bg-sun/15 p-3 text-sun-light">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                    {icons[i]}
                  </svg>
                </span>
                <h3 className="mt-5 font-display text-lg font-bold">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/70">{desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
