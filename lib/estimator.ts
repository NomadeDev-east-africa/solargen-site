/**
 * Moteur de calcul du Simulateur Solaire.
 * Estime le nombre de panneaux, batteries et l'onduleur nécessaires
 * à partir des équipements et habitudes de consommation renseignés.
 *
 * Basé sur le matériel réellement vendu par SOLARGEN GROUP (voir lib/products.ts) :
 * panneaux Jinko Tiger Neo 620 W, onduleurs SAJ H2-5K / H2-10K (monophasé),
 * SAJ 15 kVA et Huawei 50 kVA (triphasé, exemplaire unique en stock),
 * batteries SAJ B3-5.0-LV (5 120 Wh, LiFePO₄).
 *
 * ⚠️ C'est une estimation indicative pour qualifier une demande de devis,
 * pas un dimensionnement d'ingénierie. Le résultat le rappelle toujours.
 */

export type ApplianceId =
  | "frigo"
  | "congelateur"
  | "machineLaver"
  | "ventilateur"
  | "tv"
  | "ordinateur"
  | "eclairage"
  | "pompe"
  | "autre";

export interface ApplianceState {
  qty: number;
  hours: number;
}

export type ApplianceMap = Record<ApplianceId, ApplianceState>;

export type SiteType = "maison" | "villa" | "entreprise" | "ferme";
export type AutonomyChoice = 4 | 8 | 24 | 48;
export type PhaseType = "mono" | "tri";

/**
 * Puissance électrique moyenne d'un climatiseur split par puissance en "chevaux" (CV),
 * l'unité utilisée couramment à Djibouti plutôt que le BTU/h. COP ≈ 3 pris en compte.
 */
export const CLIM_CV_OPTIONS = [
  { cv: 1, watts: 850 },
  { cv: 1.5, watts: 1100 },
  { cv: 2, watts: 1650 },
  { cv: 3, watts: 2200 },
  { cv: 5, watts: 3200 },
] as const;

export type ClimCv = (typeof CLIM_CV_OPTIONS)[number]["cv"];

export function climWatts(cv: number): number {
  return CLIM_CV_OPTIONS.find((o) => o.cv === cv)?.watts ?? 1100;
}

/** Une ligne de climatiseur du formulaire : une maison a souvent plusieurs tailles différentes. */
export interface ClimUnit {
  id: string;
  cv: ClimCv;
  qty: number;
  hours: number;
}

export function createClimUnit(id: string): ClimUnit {
  return { id, cv: 1.5, qty: 0, hours: 8 };
}

// Puissance unitaire type (W) des autres équipements.
export const APPLIANCE_POWER: Record<Exclude<ApplianceId, "autre">, number> = {
  frigo: 150,
  congelateur: 200,
  machineLaver: 500,
  ventilateur: 60,
  tv: 120,
  ordinateur: 150,
  eclairage: 10, // par ampoule LED
  pompe: 750,
};

export const DEFAULT_APPLIANCES: ApplianceMap = {
  frigo: { qty: 1, hours: 24 },
  congelateur: { qty: 0, hours: 24 },
  machineLaver: { qty: 0, hours: 1 },
  ventilateur: { qty: 0, hours: 6 },
  tv: { qty: 1, hours: 4 },
  ordinateur: { qty: 0, hours: 6 },
  eclairage: { qty: 6, hours: 5 },
  pompe: { qty: 0, hours: 3 },
  autre: { qty: 0, hours: 4 },
};

// Dimensions d'un panneau Jinko Tiger Neo : 2,10 m × 1,10 m ≈ 2,31 m².
export const PANEL_LENGTH_M = 2.1;
export const PANEL_WIDTH_M = 1.1;
export const PANEL_AREA_M2 = Math.round(PANEL_LENGTH_M * PANEL_WIDTH_M * 100) / 100;

export interface EstimatorInput {
  siteType: SiteType;
  phase: PhaseType;
  climUnits: ClimUnit[];
  appliances: ApplianceMap;
  autreWatts: number;
  autonomy: AutonomyChoice;
  /** Surface toiture/sol disponible en m² pour les panneaux ; 0 = pas de contrainte connue. */
  availableAreaM2: number;
}

export interface EstimatorResult {
  dailyEnergyWh: number;
  peakPowerW: number;
  /** Nombre de panneaux réellement recommandé (peut être limité par l'espace disponible). */
  panelCount: number;
  /** Nombre de panneaux qu'il faudrait pour couvrir 100 % du besoin, sans contrainte d'espace. */
  panelCountNeeded: number;
  systemKwc: number;
  requiredAreaM2: number;
  spaceLimited: boolean;
  inverter: { model: string; count: number; approxKw: number; generic: boolean };
  suggestTriphase: boolean;
  batteryCount: number;
  batteryKwh: number;
}

const PANEL_WP = 620;
const PANEL_MODEL_LABEL = "Jinko Tiger Neo 620 W";
const BATTERY_WH = 5120;
const BATTERY_DOD = 0.9; // profondeur de décharge exploitable (LiFePO₄)
const PEAK_SUN_HOURS = 5.8; // ensoleillement exploitable moyen à Djibouti
const SYSTEM_DERATE = 0.8; // pertes câblage/onduleur/poussière/température
const LOAD_DIVERSITY = 0.7; // tous les équipements ne tournent jamais en même temps
const INVERTER_UNIT_W = 10000; // palier SAJ H2-10K-LS2 (monophasé)
const SAJ_TRI_W = 15000; // onduleur triphasé SAJ 15 kVA
const HUAWEI_TRI_W = 50000; // onduleur triphasé Huawei 50 kVA (exemplaire unique en stock)
const MAX_DC_AC_RATIO = 1.3; // évite un onduleur trop petit pour la taille du champ solaire
const TRIPHASE_SUGGEST_W = 15000; // au-delà, le monophasé n'est généralement plus adapté

export function computeEstimate(input: EstimatorInput): EstimatorResult {
  const { appliances, climUnits, autreWatts, autonomy, phase, availableAreaM2 } = input;

  let dailyEnergyWh = 0;
  let connectedLoadW = 0;
  let biggestUnitW = 0;

  climUnits.forEach((unit) => {
    if (unit.qty <= 0) return;
    const unitPower = climWatts(unit.cv);
    const totalPower = unitPower * unit.qty;
    dailyEnergyWh += totalPower * unit.hours;
    connectedLoadW += totalPower;
    biggestUnitW = Math.max(biggestUnitW, unitPower);
  });

  (Object.keys(appliances) as ApplianceId[]).forEach((id) => {
    const state = appliances[id];
    if (!state || state.qty <= 0) return;
    const unitPower = id === "autre" ? autreWatts : APPLIANCE_POWER[id];
    const totalPower = unitPower * state.qty;
    dailyEnergyWh += totalPower * state.hours;
    connectedLoadW += totalPower;
  });

  // Puissance de pointe : charge simultanée réaliste + surcharge de démarrage
  // du plus gros climatiseur (appel de courant au démarrage du compresseur).
  const peakPowerW = Math.round(connectedLoadW * LOAD_DIVERSITY + biggestUnitW * 0.6);

  // Panneaux nécessaires pour couvrir l'énergie quotidienne.
  const panelWcNeeded = dailyEnergyWh / (PEAK_SUN_HOURS * SYSTEM_DERATE);
  const panelCountNeeded = Math.max(2, Math.ceil(panelWcNeeded / PANEL_WP));
  const requiredAreaM2 = Math.round(panelCountNeeded * PANEL_AREA_M2 * 10) / 10;

  let panelCount = panelCountNeeded;
  let spaceLimited = false;
  if (availableAreaM2 > 0) {
    const maxBySpace = Math.max(0, Math.floor(availableAreaM2 / PANEL_AREA_M2));
    if (maxBySpace < panelCountNeeded) {
      panelCount = Math.max(2, maxBySpace);
      spaceLimited = true;
    }
  }
  const systemKwc = Math.round((panelCount * PANEL_WP) / 10) / 100;

  // L'onduleur doit couvrir la charge de pointe ET rester cohérent avec la taille
  // du champ solaire (ratio DC:AC) : un gros champ derrière un petit onduleur écrête la production.
  const inverterTargetW = Math.max(peakPowerW * 1.2, (panelCount * PANEL_WP) / MAX_DC_AC_RATIO);
  const inverterCount = Math.max(1, Math.ceil(inverterTargetW / INVERTER_UNIT_W));
  const approxKw = Math.round((inverterCount * INVERTER_UNIT_W) / 100) / 10;

  let inverter: EstimatorResult["inverter"];
  if (phase === "mono") {
    const model = inverterCount === 1 && inverterTargetW <= 5000 ? "SAJ H2-5K-LS2" : "SAJ H2-10K-LS2";
    inverter = { model, count: inverterCount, approxKw, generic: false };
  } else if (inverterTargetW <= SAJ_TRI_W) {
    inverter = { model: "SAJ 15 kVA (triphasé)", count: 1, approxKw: SAJ_TRI_W / 1000, generic: false };
  } else if (inverterTargetW <= HUAWEI_TRI_W) {
    inverter = { model: "Huawei 50 kVA (triphasé)", count: 1, approxKw: HUAWEI_TRI_W / 1000, generic: false };
  } else {
    // Au-delà de la plus grosse référence triphasée en stock (Huawei 50 kVA, exemplaire unique) :
    // solution à étudier au cas par cas avec un technicien SOLARGEN.
    inverter = { model: "Solution triphasée sur mesure (> 50 kVA)", count: 1, approxKw: Math.round(inverterTargetW / 100) / 10, generic: true };
  }
  const suggestTriphase = phase === "mono" && inverterTargetW > TRIPHASE_SUGGEST_W;

  const batteryWhNeeded = (dailyEnergyWh * (autonomy / 24)) / BATTERY_DOD;
  const batteryCount = Math.max(1, Math.ceil(batteryWhNeeded / BATTERY_WH));
  const batteryKwh = Math.round((batteryCount * BATTERY_WH) / 10) / 100;

  return {
    dailyEnergyWh: Math.round(dailyEnergyWh),
    peakPowerW,
    panelCount,
    panelCountNeeded,
    systemKwc,
    requiredAreaM2,
    spaceLimited,
    inverter,
    suggestTriphase,
    batteryCount,
    batteryKwh,
  };
}

export { PANEL_MODEL_LABEL };
