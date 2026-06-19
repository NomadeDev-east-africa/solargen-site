"use client";

import Image from "next/image";
import Reveal from "./Reveal";
import { useT } from "@/lib/translations";
import { WHATSAPP_URL } from "@/lib/contact";

export default function CtaBand() {
  const t = useT();
  return (
    <section className="relative overflow-hidden py-20 sm:py-24">
      <Image
        src="/images/cta-toiture.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-leaf-deep/95 via-leaf/85 to-sky/75" />

      <Reveal className="relative mx-auto flex max-w-5xl flex-col items-center gap-7 px-5 text-center text-white sm:px-8">
        <h2 className="font-display text-3xl font-extrabold leading-tight sm:text-4xl md:text-5xl">
          {t.cta.title}
        </h2>
        <p className="max-w-2xl text-lg leading-relaxed text-white/90">{t.cta.paragraph}</p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a href="#contact" className="btn-sun rounded-full px-8 py-4 text-sm tracking-wide">
            {t.cta.primary}
          </a>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="btn-ghost-light inline-flex items-center gap-2.5 rounded-full px-8 py-4 text-sm font-semibold tracking-wide"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15l-1.3 4.7 4.8-1.3A10 10 0 1 0 12 2Zm5.3 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .1-1.7-.1a11 11 0 0 1-4.2-2.6 8.3 8.3 0 0 1-1.7-2.3c-.2-.4 0-.6.2-.8l.5-.6c.2-.2.2-.4.4-.6 0-.2 0-.4-.1-.6l-.8-2c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5 0-.7.3-.3.3-1 .9-1 2.3s1 2.7 1.2 2.9c.1.2 2 3.1 5 4.3 1.8.8 2.5.8 3.4.7.5-.1 1.6-.7 1.9-1.3.2-.6.2-1.2.1-1.3-.1-.1-.2-.2-.4-.3Z" /></svg>
            {t.cta.secondary}
          </a>
        </div>
      </Reveal>
    </section>
  );
}
