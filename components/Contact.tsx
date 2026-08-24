"use client";

import { useState } from "react";
import Reveal from "./Reveal";
import { useT } from "@/lib/translations";
import { PHONE_DISPLAY, PHONE2_DISPLAY, EMAIL, TEL_URL, TEL_URL2, WHATSAPP_URL, PHONE_INTL } from "@/lib/contact";

export default function Contact() {
  const t = useT();
  const [sent, setSent] = useState(false);
  // On stocke le centre d'intérêt par index pour qu'il reste cohérent
  // quand l'utilisateur change de langue.
  const [form, setForm] = useState({ name: "", phone: "", interest: 0, message: "" });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const c = t.contact;
    const text = encodeURIComponent(
      `${c.waGreeting}\n\n${c.waName} : ${form.name}\n${c.waPhone} : ${form.phone}\n${c.waInterest} : ${c.interestOptions[form.interest]}\n\n${form.message}`
    );
    window.open(`https://wa.me/${PHONE_INTL}?text=${text}`, "_blank");
    setSent(true);
  };

  const updateText =
    (k: "name" | "phone" | "message") =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  return (
    <section id="contact" className="relative bg-cloud py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16">
        {/* Gauche — infos */}
        <div>
          <Reveal className="mb-5 flex items-center gap-4">
            <span className="h-px w-12 bg-sky" />
            <span className="eyebrow">{t.contact.eyebrow}</span>
          </Reveal>
          <Reveal>
            <h2 className="font-display text-3xl font-extrabold leading-tight text-night sm:text-4xl md:text-5xl">
              {t.contact.titlePre}
              <span className="text-solar-gradient">{t.contact.titleEm}</span>
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-slate">{t.contact.paragraph}</p>
          </Reveal>

          <Reveal delay={180} className="mt-10 space-y-5">
            <InfoRow
              label={t.contact.addressLabel}
              value={t.contact.addressValue}
              icon={<><path d="M12 21s-7-5.2-7-11a7 7 0 0 1 14 0c0 5.8-7 11-7 11Z" /><circle cx="12" cy="10" r="2.4" /></>}
            />
            <InfoRow
              label={t.contact.phoneLabel}
              value={PHONE_DISPLAY}
              href={TEL_URL}
              icon={<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.6A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.6a2 2 0 0 1-.4 2.1L8 9.6a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.4c.8.3 1.7.5 2.6.6a2 2 0 0 1 1.7 2Z" />}
            />
            <InfoRow
              label={t.contact.phoneLabel}
              value={PHONE2_DISPLAY}
              href={TEL_URL2}
              icon={<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.6A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.6a2 2 0 0 1-.4 2.1L8 9.6a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.4c.8.3 1.7.5 2.6.6a2 2 0 0 1 1.7 2Z" />}
            />
            <InfoRow
              label={t.contact.emailLabel}
              value={EMAIL}
              href={`mailto:${EMAIL}`}
              icon={<><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>}
            />

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 rounded-full bg-leaf px-6 py-3.5 text-sm font-semibold text-white shadow-[0_12px_30px_-12px_rgba(33,168,75,0.8)] transition hover:-translate-y-0.5 hover:brightness-105"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15l-1.3 4.7 4.8-1.3A10 10 0 1 0 12 2Zm5.3 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .1-1.7-.1a11 11 0 0 1-4.2-2.6 8.3 8.3 0 0 1-1.7-2.3c-.2-.4 0-.6.2-.8l.5-.6c.2-.2.2-.4.4-.6 0-.2 0-.4-.1-.6l-.8-2c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5 0-.7.3-.3.3-1 .9-1 2.3s1 2.7 1.2 2.9c.1.2 2 3.1 5 4.3 1.8.8 2.5.8 3.4.7.5-.1 1.6-.7 1.9-1.3.2-.6.2-1.2.1-1.3-.1-.1-.2-.2-.4-.3Z" /></svg>
              {t.contact.whatsappBtn}
            </a>
          </Reveal>
        </div>

        {/* Droite — formulaire */}
        <Reveal delay={150}>
          <form onSubmit={onSubmit} className="card-glow rounded-3xl border border-sky/10 bg-snow p-7 sm:p-9">
            <h3 className="font-display text-2xl font-bold text-night">{t.contact.formTitle}</h3>
            <p className="mt-1 text-sm text-muted">{t.contact.formSubtitle}</p>

            <div className="mt-7 space-y-5">
              <Field label={t.contact.fieldName}>
                <input required value={form.name} onChange={updateText("name")} placeholder={t.contact.fieldNamePh} className="sg-input" />
              </Field>
              <Field label={t.contact.fieldPhone}>
                <input required value={form.phone} onChange={updateText("phone")} placeholder={t.contact.fieldPhonePh} className="sg-input" />
              </Field>
              <Field label={t.contact.fieldInterest}>
                <select
                  value={form.interest}
                  onChange={(e) => setForm((f) => ({ ...f, interest: Number(e.target.value) }))}
                  className="sg-input"
                >
                  {t.contact.interestOptions.map((opt, idx) => (
                    <option key={idx} value={idx}>
                      {opt}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label={t.contact.fieldMessage}>
                <textarea value={form.message} onChange={updateText("message")} rows={4} placeholder={t.contact.fieldMessagePh} className="sg-input resize-none" />
              </Field>
            </div>

            <button type="submit" className="btn-solar mt-7 w-full rounded-full py-4 text-sm font-semibold tracking-wide">
              {t.contact.submit}
            </button>
            {sent && <p className="mt-4 text-center text-sm font-medium text-leaf-deep">{t.contact.sent}</p>}
          </form>
        </Reveal>
      </div>

      {/* Carte */}
      <Reveal delay={100} className="mx-auto mt-16 max-w-7xl px-5 sm:px-8">
        <div className="overflow-hidden rounded-3xl border border-sky/10 card-soft">
          <iframe
            title={t.contact.mapTitle}
            src="https://www.google.com/maps?q=Djibouti%20ville&output=embed"
            className="h-[360px] w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </Reveal>
    </section>
  );
}

function InfoRow({
  label,
  value,
  href,
  icon,
}: {
  label: string;
  value: string;
  href?: string;
  icon: React.ReactNode;
}) {
  const content = (
    <div className="flex items-start gap-4">
      <span className="mt-0.5 grid h-11 w-11 shrink-0 place-items-center rounded-full bg-mist text-sky">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          {icon}
        </svg>
      </span>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-muted">{label}</p>
        <p className="mt-0.5 font-medium text-night">{value}</p>
      </div>
    </div>
  );
  return href ? (
    <a href={href} className="block transition hover:opacity-80">
      {content}
    </a>
  ) : (
    content
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-slate">{label}</span>
      {children}
    </label>
  );
}
