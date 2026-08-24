"use client";

import { useMemo, useState } from "react";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { useT } from "@/lib/translations";
import { PHONE_INTL } from "@/lib/contact";
import {
  computeEstimate,
  createClimUnit,
  DEFAULT_APPLIANCES,
  type ApplianceId,
  type ApplianceMap,
  type AutonomyChoice,
  type ClimCv,
  type ClimUnit,
  type PhaseType,
  type SiteType,
} from "@/lib/estimator";
import { ApplianceIcon, AreaIcon, AutonomyIcon, ClimIcon, PhaseIcon, SiteIcon } from "./icons";

const SITE_TYPES: SiteType[] = ["maison", "villa", "entreprise", "ferme"];
const PHASES: PhaseType[] = ["mono", "tri"];
const AUTONOMY_CHOICES: AutonomyChoice[] = [4, 8, 24, 48];
const TOTAL_STEPS = 9;

const EASE = [0.16, 1, 0.3, 1] as const;

function Stepper({ value, onChange, min = 0, max = 20 }: { value: number; onChange: (v: number) => void; min?: number; max?: number }) {
  return (
    <div className="inline-flex items-center gap-3 rounded-full border border-sky/20 bg-snow px-2 py-1.5">
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        className="grid h-8 w-8 place-items-center rounded-full bg-mist text-night transition hover:bg-haze active:scale-90"
        aria-label="-"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M5 12h14" /></svg>
      </button>
      <span className="w-6 text-center font-display text-lg font-bold text-night">{value}</span>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        className="grid h-8 w-8 place-items-center rounded-full bg-sky text-white transition hover:brightness-105 active:scale-90"
        aria-label="+"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M12 5v14M5 12h14" /></svg>
      </button>
    </div>
  );
}

function HoursSlider({ value, onChange, label, unit }: { value: number; onChange: (v: number) => void; label: string; unit: string }) {
  const pct = Math.round((value / 24) * 100);
  return (
    <div className="mt-3">
      <div className="mb-1.5 flex items-center justify-between text-xs font-semibold text-slate">
        <span>{label}</span>
        <span className="text-sky-deep">
          {value} {unit}
        </span>
      </div>
      <input
        type="range"
        min={0}
        max={24}
        step={1}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="sg-range"
        style={{ "--sg-range-fill": `${pct}%` } as React.CSSProperties}
      />
    </div>
  );
}

function OptionCard({
  selected,
  onClick,
  icon,
  title,
  subtitle,
}: {
  selected: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileTap={{ scale: 0.96 }}
      className={clsx(
        "flex flex-col items-center gap-2.5 rounded-2xl border-2 px-4 py-5 text-center transition-colors duration-300",
        selected ? "border-sky bg-mist" : "border-transparent bg-cloud hover:bg-mist/60"
      )}
    >
      <span
        className={clsx(
          "grid h-12 w-12 place-items-center rounded-full transition-colors duration-300",
          selected ? "bg-sky text-white" : "bg-white text-sky"
        )}
      >
        {icon}
      </span>
      <span className="font-display text-sm font-bold text-night">{title}</span>
      {subtitle && <span className="text-xs leading-snug text-muted">{subtitle}</span>}
    </motion.button>
  );
}

function ApplianceRow({
  id,
  label,
  state,
  onQty,
  onHours,
  hoursLabel,
  hoursUnit,
}: {
  id: ApplianceId;
  label: string;
  state: { qty: number; hours: number };
  onQty: (v: number) => void;
  onHours: (v: number) => void;
  hoursLabel: string;
  hoursUnit: string;
}) {
  return (
    <div className={clsx("rounded-2xl border border-sky/10 bg-cloud p-4 transition-colors", state.qty > 0 && "bg-mist/70")}>
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white text-sky">
            <ApplianceIcon id={id} className="h-5 w-5" />
          </span>
          <span className="font-semibold text-night">{label}</span>
        </div>
        <Stepper value={state.qty} onChange={onQty} />
      </div>
      <AnimatePresence>
        {state.qty > 0 && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="overflow-hidden"
          >
            <HoursSlider value={state.hours} onChange={onHours} label={hoursLabel} unit={hoursUnit} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

let climUid = 0;
const nextClimId = () => `clim-${++climUid}`;

function ClimUnitCard({
  unit,
  onChange,
  onRemove,
  removable,
  cvLabel,
  cvOptions,
  qtyLabel,
  hoursLabel,
  hoursUnit,
  removeLabel,
  unitLabel,
  index,
}: {
  unit: ClimUnit;
  onChange: (patch: Partial<ClimUnit>) => void;
  onRemove: () => void;
  removable: boolean;
  cvLabel: string;
  cvOptions: readonly { value: number; label: string }[];
  qtyLabel: string;
  hoursLabel: string;
  hoursUnit: string;
  removeLabel: string;
  unitLabel: string;
  index: number;
}) {
  return (
    <div className={clsx("rounded-2xl border border-sky/10 bg-cloud p-5 transition-colors", unit.qty > 0 && "bg-mist/70")}>
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-sun/15 text-sun-deep">
            <ClimIcon className="h-6 w-6" />
          </span>
          <div>
            <p className="font-semibold text-night">
              {unitLabel} {index + 1}
            </p>
            <p className="text-xs font-semibold text-muted">{qtyLabel}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Stepper value={unit.qty} onChange={(v) => onChange({ qty: v })} />
          {removable && (
            <button
              type="button"
              onClick={onRemove}
              aria-label={removeLabel}
              className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-muted transition hover:bg-haze hover:text-night"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 6l12 12M18 6 6 18" /></svg>
            </button>
          )}
        </div>
      </div>
      <AnimatePresence>
        {unit.qty > 0 && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="overflow-hidden"
          >
            <div className="mt-6 border-t border-sky/10 pt-5">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate">{cvLabel}</p>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {cvOptions.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => onChange({ cv: opt.value as ClimCv })}
                    className={clsx(
                      "rounded-xl border-2 px-3.5 py-2.5 text-left text-xs font-semibold transition-colors",
                      unit.cv === opt.value ? "border-sky bg-mist text-sky-deep" : "border-transparent bg-snow text-slate hover:bg-mist/60"
                    )}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
              <HoursSlider value={unit.hours} onChange={(v) => onChange({ hours: v })} label={hoursLabel} unit={hoursUnit} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function SolarSimulator() {
  const t = useT();
  const s = t.simulator;

  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [siteType, setSiteType] = useState<SiteType>("maison");
  const [city, setCity] = useState("");
  const [phase, setPhase] = useState<PhaseType>("mono");
  const [climUnits, setClimUnits] = useState<ClimUnit[]>([createClimUnit(nextClimId())]);
  const [appliances, setAppliances] = useState<ApplianceMap>(DEFAULT_APPLIANCES);
  const [autreOn, setAutreOn] = useState(false);
  const [autreWatts, setAutreWatts] = useState(100);
  const [areaInput, setAreaInput] = useState("");
  const [autonomy, setAutonomy] = useState<AutonomyChoice>(8);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const updateAppliance = (id: ApplianceId, patch: Partial<ApplianceMap[ApplianceId]>) =>
    setAppliances((prev) => ({ ...prev, [id]: { ...prev[id], ...patch } }));

  const updateClimUnit = (id: string, patch: Partial<ClimUnit>) =>
    setClimUnits((prev) => prev.map((u) => (u.id === id ? { ...u, ...patch } : u)));
  const addClimUnit = () => setClimUnits((prev) => [...prev, createClimUnit(nextClimId())]);
  const removeClimUnit = (id: string) => setClimUnits((prev) => prev.filter((u) => u.id !== id));

  const effectiveAppliances = useMemo(() => {
    if (autreOn) return appliances;
    return { ...appliances, autre: { ...appliances.autre, qty: 0 } };
  }, [appliances, autreOn]);

  const availableAreaM2 = Number(areaInput) || 0;

  const result = useMemo(
    () =>
      computeEstimate({
        siteType,
        phase,
        climUnits,
        appliances: effectiveAppliances,
        autreWatts,
        autonomy,
        availableAreaM2,
      }),
    [siteType, phase, climUnits, effectiveAppliances, autreWatts, autonomy, availableAreaM2]
  );

  const canSubmit = name.trim().length > 0 && phone.trim().length > 0;

  const goNext = () => (step < TOTAL_STEPS - 1 ? setStep((v) => v + 1) : canSubmit && setSubmitted(true));
  const goBack = () => step > 0 && setStep((v) => v - 1);

  const restart = () => {
    setSubmitted(false);
    setStep(0);
    setSiteType("maison");
    setCity("");
    setPhase("mono");
    setClimUnits([createClimUnit(nextClimId())]);
    setAppliances(DEFAULT_APPLIANCES);
    setAutreOn(false);
    setAutreWatts(100);
    setAreaInput("");
    setAutonomy(8);
    setName("");
    setPhone("");
  };

  const sendWhatsapp = () => {
    const r = s.results;
    const phaseLabel = s.steps.phase.options[phase].label;
    const lines = [
      r.waGreeting,
      "",
      `${r.waName} : ${name}`,
      `${r.waPhone} : ${phone}`,
      `${r.waPhaseLabel} : ${phaseLabel}`,
      "",
      `${r.waPanels} : ${result.panelCount} × ${r.panelsModel}`,
      `${r.waPower} : ${result.systemKwc} kWc`,
      `${r.waInverter} : ${result.inverter.count > 1 ? `${result.inverter.count} × ` : ""}${result.inverter.model}`,
      `${r.waBatteries} : ${result.batteryCount} × ${r.batteriesModel}`,
      `${r.waCapacity} : ${result.batteryKwh} kWh`,
      `${r.waDaily} : ${(result.dailyEnergyWh / 1000).toFixed(1)} kWh/j`,
    ];
    const text = encodeURIComponent(lines.join("\n"));
    window.open(`https://wa.me/${PHONE_INTL}?text=${text}`, "_blank");
  };

  return (
    <section className="relative bg-cloud py-28 sm:py-36">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-4 flex items-center justify-center gap-4">
            <span className="h-px w-12 bg-sky" />
            <span className="eyebrow">{s.hero.eyebrow}</span>
            <span className="h-px w-12 bg-sky" />
          </div>
          <h1 className="font-display text-3xl font-extrabold leading-tight text-night sm:text-4xl md:text-5xl">
            {s.hero.titlePre}
            <span className="text-solar-gradient">{s.hero.titleEm}</span>
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-slate">{s.hero.paragraph}</p>
        </div>

        <div className="card-glow mt-14 overflow-hidden rounded-3xl border border-sky/10 bg-snow">
          {!submitted ? (
            <>
              {/* Progress */}
              <div className="border-b border-sky/10 bg-cloud/60 px-6 py-4 sm:px-9">
                <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-muted">
                  <span>{s.progress(step + 1, TOTAL_STEPS)}</span>
                </div>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-mist">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: "var(--solar-gradient)" }}
                    animate={{ width: `${((step + 1) / TOTAL_STEPS) * 100}%` }}
                    transition={{ duration: 0.5, ease: EASE }}
                  />
                </div>
              </div>

              <div className="p-6 sm:p-9">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -24 }}
                    transition={{ duration: 0.35, ease: EASE }}
                  >
                    {step === 0 && (
                      <div>
                        <StepHeader title={s.steps.site.title} subtitle={s.steps.site.subtitle} />
                        <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-4">
                          {SITE_TYPES.map((id) => (
                            <OptionCard
                              key={id}
                              selected={siteType === id}
                              onClick={() => setSiteType(id)}
                              icon={<SiteIcon id={id} className="h-6 w-6" />}
                              title={s.steps.site.options[id]}
                            />
                          ))}
                        </div>
                        <label className="mt-7 block">
                          <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-slate">
                            {s.steps.site.cityLabel}
                          </span>
                          <input
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            placeholder={s.steps.site.cityPh}
                            className="sg-input"
                          />
                        </label>
                      </div>
                    )}

                    {step === 1 && (
                      <div>
                        <StepHeader title={s.steps.phase.title} subtitle={s.steps.phase.subtitle} />
                        <div className="grid grid-cols-2 gap-3.5">
                          {PHASES.map((p) => (
                            <OptionCard
                              key={p}
                              selected={phase === p}
                              onClick={() => setPhase(p)}
                              icon={<PhaseIcon id={p} className="h-6 w-6" />}
                              title={s.steps.phase.options[p].label}
                              subtitle={s.steps.phase.options[p].desc}
                            />
                          ))}
                        </div>
                        <p className="mt-5 text-xs leading-relaxed text-muted">{s.steps.phase.unknown}</p>
                      </div>
                    )}

                    {step === 2 && (
                      <div>
                        <StepHeader title={s.steps.clim.title} subtitle={s.steps.clim.subtitle} />
                        <div className="space-y-4">
                          {climUnits.map((unit, i) => (
                            <ClimUnitCard
                              key={unit.id}
                              unit={unit}
                              index={i}
                              removable={climUnits.length > 1}
                              onChange={(patch) => updateClimUnit(unit.id, patch)}
                              onRemove={() => removeClimUnit(unit.id)}
                              cvLabel={s.steps.clim.cvLabel}
                              cvOptions={s.steps.clim.cvOptions}
                              qtyLabel={s.steps.clim.qtyLabel}
                              hoursLabel={s.hoursLabel}
                              hoursUnit={s.hoursUnit}
                              removeLabel={s.steps.clim.remove}
                              unitLabel={s.steps.clim.unitLabel}
                            />
                          ))}
                          <button
                            type="button"
                            onClick={addClimUnit}
                            className="btn-ghost w-full rounded-2xl py-3 text-sm font-semibold"
                          >
                            {s.steps.clim.addAnother}
                          </button>
                        </div>
                      </div>
                    )}

                    {step === 3 && (
                      <div>
                        <StepHeader title={s.steps.cooling.title} subtitle={s.steps.cooling.subtitle} />
                        <div className="space-y-3">
                          {(["frigo", "congelateur", "machineLaver", "ventilateur"] as const).map((id) => (
                            <ApplianceRow
                              key={id}
                              id={id}
                              label={s.steps.cooling.labels[id]}
                              state={appliances[id]}
                              onQty={(v) => updateAppliance(id, { qty: v })}
                              onHours={(v) => updateAppliance(id, { hours: v })}
                              hoursLabel={s.hoursLabel}
                              hoursUnit={s.hoursUnit}
                            />
                          ))}
                        </div>
                      </div>
                    )}

                    {step === 4 && (
                      <div>
                        <StepHeader title={s.steps.comfort.title} subtitle={s.steps.comfort.subtitle} />
                        <div className="space-y-3">
                          {(["tv", "ordinateur", "eclairage"] as const).map((id) => (
                            <ApplianceRow
                              key={id}
                              id={id}
                              label={s.steps.comfort.labels[id]}
                              state={appliances[id]}
                              onQty={(v) => updateAppliance(id, { qty: v })}
                              onHours={(v) => updateAppliance(id, { hours: v })}
                              hoursLabel={s.hoursLabel}
                              hoursUnit={s.hoursUnit}
                            />
                          ))}
                        </div>
                      </div>
                    )}

                    {step === 5 && (
                      <div>
                        <StepHeader title={s.steps.other.title} subtitle={s.steps.other.subtitle} />
                        <div className="space-y-3">
                          <ApplianceRow
                            id="pompe"
                            label={s.steps.other.labels.pompe}
                            state={appliances.pompe}
                            onQty={(v) => updateAppliance("pompe", { qty: v })}
                            onHours={(v) => updateAppliance("pompe", { hours: v })}
                            hoursLabel={s.hoursLabel}
                            hoursUnit={s.hoursUnit}
                          />

                          <div className="rounded-2xl border border-sky/10 bg-cloud p-4">
                            <label className="flex items-center gap-3.5">
                              <input
                                type="checkbox"
                                checked={autreOn}
                                onChange={(e) => {
                                  setAutreOn(e.target.checked);
                                  updateAppliance("autre", { qty: e.target.checked ? 1 : 0 });
                                }}
                                className="h-5 w-5 accent-[#3aa935]"
                              />
                              <span className="font-semibold text-night">{s.steps.other.autreToggle}</span>
                            </label>
                            <AnimatePresence>
                              {autreOn && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.3, ease: EASE }}
                                  className="overflow-hidden"
                                >
                                  <div className="mt-5 grid gap-4 border-t border-sky/10 pt-5 sm:grid-cols-2">
                                    <label className="block">
                                      <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-slate">
                                        {s.steps.other.autreWattsLabel}
                                      </span>
                                      <input
                                        type="number"
                                        min={0}
                                        value={autreWatts}
                                        onChange={(e) => setAutreWatts(Number(e.target.value))}
                                        className="sg-input"
                                      />
                                    </label>
                                    <div className="flex items-end">
                                      <Stepper value={appliances.autre.qty} onChange={(v) => updateAppliance("autre", { qty: v })} />
                                    </div>
                                  </div>
                                  <HoursSlider
                                    value={appliances.autre.hours}
                                    onChange={(v) => updateAppliance("autre", { hours: v })}
                                    label={s.hoursLabel}
                                    unit={s.hoursUnit}
                                  />
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </div>
                      </div>
                    )}

                    {step === 6 && (
                      <div>
                        <StepHeader title={s.steps.space.title} subtitle={s.steps.space.subtitle} />
                        <div className="rounded-2xl border border-sky/10 bg-cloud p-5">
                          <div className="flex items-center gap-3.5">
                            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-white text-sky">
                              <AreaIcon className="h-6 w-6" />
                            </span>
                            <div className="flex-1">
                              <label className="block">
                                <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-slate">
                                  {s.steps.space.label}
                                </span>
                                <div className="flex items-center gap-3">
                                  <input
                                    type="number"
                                    min={0}
                                    value={areaInput}
                                    onChange={(e) => setAreaInput(e.target.value)}
                                    placeholder={s.steps.space.placeholder}
                                    className="sg-input"
                                  />
                                  <span className="shrink-0 font-semibold text-slate">{s.steps.space.unit}</span>
                                </div>
                              </label>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => setAreaInput("")}
                            className="mt-4 text-xs font-semibold text-sky-deep underline decoration-dotted underline-offset-4"
                          >
                            {s.steps.space.unknown}
                          </button>
                        </div>
                      </div>
                    )}

                    {step === 7 && (
                      <div>
                        <StepHeader title={s.steps.autonomy.title} subtitle={s.steps.autonomy.subtitle} />
                        <div className="grid grid-cols-2 gap-3.5">
                          {AUTONOMY_CHOICES.map((h) => (
                            <OptionCard
                              key={h}
                              selected={autonomy === h}
                              onClick={() => setAutonomy(h)}
                              icon={<AutonomyIcon id={h} className="h-6 w-6" />}
                              title={s.steps.autonomy.options[h].label}
                              subtitle={s.steps.autonomy.options[h].desc}
                            />
                          ))}
                        </div>
                      </div>
                    )}

                    {step === 8 && (
                      <div>
                        <StepHeader title={s.steps.contactInfo.title} subtitle={s.steps.contactInfo.subtitle} />
                        <div className="space-y-5">
                          <label className="block">
                            <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-slate">
                              {s.steps.contactInfo.name}
                            </span>
                            <input value={name} onChange={(e) => setName(e.target.value)} placeholder={s.steps.contactInfo.namePh} className="sg-input" />
                          </label>
                          <label className="block">
                            <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-slate">
                              {s.steps.contactInfo.phone}
                            </span>
                            <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder={s.steps.contactInfo.phonePh} className="sg-input" />
                          </label>
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* Navigation */}
                <div className="mt-9 flex items-center justify-between gap-4 border-t border-sky/10 pt-6">
                  <button
                    type="button"
                    onClick={goBack}
                    disabled={step === 0}
                    className="btn-ghost rounded-full px-5 py-2.5 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-0"
                  >
                    {s.nav.back}
                  </button>
                  <button
                    type="button"
                    onClick={goNext}
                    disabled={step === TOTAL_STEPS - 1 && !canSubmit}
                    className="btn-solar rounded-full px-7 py-3 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {step === TOTAL_STEPS - 1 ? s.nav.seeResult : s.nav.next}
                  </button>
                </div>
              </div>
            </>
          ) : (
            <ResultsView result={result} availableAreaM2={availableAreaM2} onRestart={restart} onSend={sendWhatsapp} />
          )}
        </div>
      </div>
    </section>
  );
}

function StepHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="mb-7">
      <h2 className="font-display text-2xl font-extrabold text-night sm:text-[1.7rem]">{title}</h2>
      <p className="mt-1.5 text-sm leading-relaxed text-slate">{subtitle}</p>
    </div>
  );
}

function StatCard({
  label,
  value,
  suffix,
  note,
  accent = false,
}: {
  label: string;
  value: string;
  suffix?: string;
  note?: string;
  accent?: boolean;
}) {
  return (
    <div className={clsx("rounded-2xl border p-5", accent ? "border-sun/30 bg-sun/10" : "border-sky/10 bg-cloud")}>
      <p className="text-xs font-semibold uppercase tracking-wider text-muted">{label}</p>
      <p className="mt-2 font-display text-2xl font-extrabold text-night sm:text-3xl">
        {value}
        {suffix && <span className="ml-1 text-base font-semibold text-sky-deep">{suffix}</span>}
      </p>
      {note && <p className="mt-1 text-xs leading-snug text-muted">{note}</p>}
    </div>
  );
}

function ResultsView({
  result,
  availableAreaM2,
  onRestart,
  onSend,
}: {
  result: ReturnType<typeof computeEstimate>;
  availableAreaM2: number;
  onRestart: () => void;
  onSend: () => void;
}) {
  const t = useT();
  const r = t.simulator.results;

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: EASE }} className="p-6 sm:p-9">
      <div className="text-center">
        <span className="eyebrow">{r.eyebrow}</span>
        <h2 className="mt-3 font-display text-2xl font-extrabold text-night sm:text-3xl">{r.title}</h2>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-3.5 sm:grid-cols-3">
        <StatCard
          label={r.panels}
          value={`${result.panelCount}`}
          suffix={r.panelsModel}
          note={`${r.panelsArea} : ${result.requiredAreaM2} m²`}
        />
        <StatCard label={r.systemPower} value={`${result.systemKwc}`} suffix="kWc" accent />
        <StatCard
          label={r.inverter}
          value={result.inverter.count > 1 ? `${result.inverter.count} ×` : "1 ×"}
          suffix={result.inverter.model}
          note={result.inverter.generic ? r.inverterGenericNote : undefined}
        />
        <StatCard label={r.batteries} value={`${result.batteryCount}`} suffix={r.batteriesModel} />
        <StatCard label={r.batteryCapacity} value={`${result.batteryKwh}`} suffix="kWh" accent />
        <StatCard label={r.dailyEnergy} value={(result.dailyEnergyWh / 1000).toFixed(1)} suffix="kWh / jour" />
      </div>

      {result.spaceLimited && (
        <div className="mt-6 rounded-2xl border border-sun/30 bg-sun/10 p-4">
          <p className="text-sm font-bold text-night">{r.spaceWarningTitle}</p>
          <p className="mt-1 text-xs leading-relaxed text-slate">
            {r.spaceWarning(result.panelCount, result.panelCountNeeded, availableAreaM2)}
          </p>
        </div>
      )}

      {result.suggestTriphase && (
        <div className="mt-4 rounded-2xl border border-sky/20 bg-mist p-4">
          <p className="text-sm font-bold text-night">{r.triphaseNoteTitle}</p>
          <p className="mt-1 text-xs leading-relaxed text-slate">{r.triphaseNote}</p>
        </div>
      )}

      <p className="mt-7 rounded-2xl bg-mist p-4 text-center text-xs leading-relaxed text-slate">{r.disclaimer}</p>

      <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
        <button
          type="button"
          onClick={onSend}
          className="inline-flex items-center gap-3 rounded-full bg-leaf px-6 py-3.5 text-sm font-semibold text-white shadow-[0_12px_30px_-12px_rgba(33,168,75,0.8)] transition hover:-translate-y-0.5 hover:brightness-105"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15l-1.3 4.7 4.8-1.3A10 10 0 1 0 12 2Zm5.3 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .1-1.7-.1a11 11 0 0 1-4.2-2.6 8.3 8.3 0 0 1-1.7-2.3c-.2-.4 0-.6.2-.8l.5-.6c.2-.2.2-.4.4-.6 0-.2 0-.4-.1-.6l-.8-2c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5 0-.7.3-.3.3-1 .9-1 2.3s1 2.7 1.2 2.9c.1.2 2 3.1 5 4.3 1.8.8 2.5.8 3.4.7.5-.1 1.6-.7 1.9-1.3.2-.6.2-1.2.1-1.3-.1-.1-.2-.2-.4-.3Z" /></svg>
          {r.whatsappCta}
        </button>
        <button type="button" onClick={onRestart} className="btn-ghost rounded-full px-6 py-3.5 text-sm font-semibold">
          {r.restart}
        </button>
      </div>
    </motion.div>
  );
}
