"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { useLang } from "@/lib/i18n";
import { useT } from "@/lib/translations";

function LangToggle({ className }: { className?: string }) {
  const { lang, setLang } = useLang();
  return (
    <div
      className={clsx(
        "inline-flex items-center rounded-full border border-sky/30 p-0.5 text-xs font-bold",
        className
      )}
      role="group"
      aria-label="Langue / Language"
    >
      {(["fr", "en"] as const).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className={clsx(
            "rounded-full px-2.5 py-1 uppercase tracking-wider transition",
            lang === l ? "bg-sky text-white" : "text-slate hover:text-night"
          )}
        >
          {l}
        </button>
      ))}
    </div>
  );
}

export default function Navbar() {
  const t = useT();
  const pathname = usePathname();
  const onHome = pathname === "/";
  const links = t.nav.links;
  const resolveHref = (href: string) => (onHome ? href : `/${href}`);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      className={clsx(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled ? "glass border-b border-sky/10 py-2.5 shadow-[0_8px_30px_-20px_rgba(11,31,51,0.4)]" : "py-4"
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-8">
        <a href={resolveHref("#top")} className="flex items-center gap-2.5 group">
          <Image
            src="/images/logo.png"
            alt="SOLARGEN GROUP"
            width={400}
            height={150}
            priority
            className="h-9 w-auto sm:h-10"
          />
          <span className="hidden text-[0.6rem] font-semibold tracking-[0.28em] text-muted sm:inline">
            GROUP · DJIBOUTI
          </span>
        </a>

        <ul className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={resolveHref(l.href)}
                className="group relative text-sm font-semibold tracking-wide text-slate transition hover:text-night"
              >
                {l.label}
                <span className="absolute -bottom-1.5 left-0 h-0.5 w-0 rounded-full bg-sky transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <LangToggle className="hidden sm:inline-flex" />
          <a
            href="/simulateur"
            className="btn-sun hidden rounded-full px-5 py-2.5 text-sm font-semibold md:inline-flex"
          >
            {t.simulator.navLabel}
          </a>
          <a
            href={resolveHref("#contact")}
            className="btn-solar hidden rounded-full px-6 py-2.5 text-sm font-semibold sm:inline-flex"
          >
            {t.nav.cta}
          </a>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
            className="grid h-10 w-10 place-items-center rounded-full border border-sky/30 text-night lg:hidden"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              {open ? <path d="M18 6 6 18M6 6l12 12" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="glass overflow-hidden border-t border-sky/10 lg:hidden"
          >
            <ul className="flex flex-col gap-1 px-6 py-5">
              <li>
                <a
                  href="/simulateur"
                  onClick={() => setOpen(false)}
                  className="btn-sun mb-2 flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="4" />
                    <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M19.1 4.9 17 7M7 17l-2.1 2.1" />
                  </svg>
                  {t.simulator.navLabel}
                </a>
              </li>
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={resolveHref(l.href)}
                    onClick={() => setOpen(false)}
                    className="block py-3 font-semibold tracking-wide text-slate"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li className="mt-2 flex items-center justify-between gap-3">
                <a
                  href={resolveHref("#contact")}
                  onClick={() => setOpen(false)}
                  className="btn-solar inline-flex flex-1 justify-center rounded-full px-6 py-3 text-sm font-semibold"
                >
                  {t.nav.cta}
                </a>
                <LangToggle />
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
