"use client";

import Image from "next/image";
import { useT } from "@/lib/translations";
import { PHONE_DISPLAY, PHONE2_DISPLAY, EMAIL, WEBSITE, TEL_URL, TEL_URL2 } from "@/lib/contact";

export default function Footer() {
  const t = useT();
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-night pt-16 text-white/80">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-12 pb-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          {/* Marque */}
          <div>
            <Image
              src="/images/logo.png"
              alt="SOLARGEN GROUP"
              width={400}
              height={150}
              className="h-10 w-auto"
            />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/65">{t.footer.tagline}</p>
          </div>

          {/* Explorer */}
          <FooterCol title={t.footer.explore} links={t.footer.exploreLinks} />
          {/* Services */}
          <FooterCol title={t.footer.servicesTitle} links={t.footer.servicesLinks} />

          {/* Contact */}
          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-white">{t.footer.contactTitle}</h4>
            <ul className="mt-5 space-y-2.5 text-sm">
              <li className="text-white/65">{t.contact.addressValue}</li>
              <li>
                <a href={TEL_URL} className="text-white/65 transition hover:text-sun-light">{PHONE_DISPLAY}</a>
              </li>
              <li>
                <a href={TEL_URL2} className="text-white/65 transition hover:text-sun-light">{PHONE2_DISPLAY}</a>
              </li>
              <li>
                <a href={`mailto:${EMAIL}`} className="text-white/65 transition hover:text-sun-light">{EMAIL}</a>
              </li>
              <li className="text-white/65">{WEBSITE}</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-white/10 py-7 text-sm text-white/55 sm:flex-row">
          <p>© {year} SOLARGEN GROUP SARL. {t.footer.rights}</p>
          <p className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-sun" />
            {t.footer.built}
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: readonly (readonly [string, string])[] }) {
  return (
    <div>
      <h4 className="font-display text-sm font-bold uppercase tracking-wider text-white">{title}</h4>
      <ul className="mt-5 space-y-2.5 text-sm">
        {links.map(([label, href]) => (
          <li key={label}>
            <a href={href} className="text-white/65 transition hover:text-sun-light">{label}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
