"use client";

import { useEffect, useRef, useState } from "react";
import { useT } from "@/lib/translations";

const VALUES = [150, 500, 98, 24];

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1600;
          const start = performance.now();
          const tick = (now: number) => {
            const p = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - p, 3);
            setValue(Math.round(eased * target));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref} className="font-display text-4xl font-extrabold text-night sm:text-5xl">
      {value}
      <span className="text-sky">{suffix}</span>
    </span>
  );
}

export default function Stats() {
  const t = useT();
  return (
    <section className="relative z-20 mx-auto -mt-16 max-w-6xl px-5 sm:px-8">
      <div className="card-glow grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-sky/10 bg-haze/60 lg:grid-cols-4">
        {t.stats.items.map((item, i) => (
          <div key={i} className="flex flex-col items-center justify-center gap-2 bg-snow px-4 py-9 text-center">
            <Counter target={VALUES[i]} suffix={item.suffix} />
            <span className="text-sm font-medium text-slate">{item.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
