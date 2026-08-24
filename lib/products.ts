import type { Localized } from "./i18n";

export type ProductCategory = "panneau" | "onduleur" | "batterie";

export interface Product {
  id: string;
  category: ProductCategory;
  brand: string;
  name: string;
  image: string;
  tagline: Localized;
  /** Caractéristiques clés affichées sur la carte. */
  specs: { label: Localized; value: string }[];
}

/**
 * Catalogue du matériel vendu et installé par SOLARGEN GROUP.
 * Données issues des fiches techniques (SAJ + Jinko Solar).
 * 👉 C'est le seul fichier à modifier pour ajouter / éditer un produit.
 */
export const products: Product[] = [
  {
    id: "panneau-tiger-neo",
    category: "panneau",
    brand: "Jinko Solar",
    name: "Tiger Neo N-type 78HL4",
    image: "/images/jinko-tiger-neo.jpg",
    tagline: {
      fr: "Module monofacial haut rendement, technologie N-Type pour une production maximale.",
      en: "High-efficiency monofacial module, N-Type technology for maximum output.",
    },
    specs: [
      { label: { fr: "Puissance", en: "Power" }, value: "620 – 625 W" },
      { label: { fr: "Rendement", en: "Efficiency" }, value: "22,3 %" },
      { label: { fr: "Technologie", en: "Technology" }, value: "N-Type Mono" },
      { label: { fr: "Garantie", en: "Warranty" }, value: "12 / 30 ans" },
    ],
  },
  {
    id: "onduleur-h2-5k",
    category: "onduleur",
    brand: "SAJ",
    name: "Onduleur H2-5K-LS2",
    image: "/images/equipement-2.jpeg",
    tagline: {
      fr: "Onduleur hybride 5 kW : autoconsommation, stockage et secours réseau.",
      en: "5 kW hybrid inverter: self-consumption, storage and grid backup.",
    },
    specs: [
      { label: { fr: "Puissance", en: "Power" }, value: "5 000 W" },
      { label: { fr: "Type", en: "Type" }, value: "Hybride" },
      { label: { fr: "Phase", en: "Phase" }, value: "Mono" },
      { label: { fr: "Usage", en: "Use" }, value: "Résidentiel" },
    ],
  },
  {
    id: "onduleur-h2-10k",
    category: "onduleur",
    brand: "SAJ",
    name: "Onduleur H2-10K-LS2",
    image: "/images/equipement-3.jpeg",
    tagline: {
      fr: "Onduleur hybride 10 kW pour villas et petits sites professionnels.",
      en: "10 kW hybrid inverter for villas and small commercial sites.",
    },
    specs: [
      { label: { fr: "Puissance", en: "Power" }, value: "10 000 W" },
      { label: { fr: "Type", en: "Type" }, value: "Hybride" },
      { label: { fr: "Phase", en: "Phase" }, value: "Mono" },
      { label: { fr: "Usage", en: "Use" }, value: "Pro / Villa" },
    ],
  },
  {
    id: "onduleur-saj-15k-tri",
    category: "onduleur",
    brand: "SAJ",
    name: "Onduleur triphasé 15 kVA",
    image: "/images/equipement-5.jpeg",
    tagline: {
      fr: "Onduleur hybride triphasé 15 kVA : pour villas et sites professionnels à forte puissance.",
      en: "15 kVA three-phase hybrid inverter: for villas and higher-power professional sites.",
    },
    specs: [
      { label: { fr: "Puissance", en: "Power" }, value: "15 000 VA" },
      { label: { fr: "Type", en: "Type" }, value: "Hybride" },
      { label: { fr: "Phase", en: "Phase" }, value: "Triphasé" },
      { label: { fr: "Usage", en: "Use" }, value: "Villa / Entreprise" },
    ],
  },
  {
    id: "onduleur-huawei-50k-tri",
    category: "onduleur",
    brand: "Huawei",
    name: "Onduleur triphasé 50 kVA",
    image: "/images/equipement-6.jpeg",
    tagline: {
      fr: "Onduleur hybride triphasé 50 kVA Huawei : pour les gros sites industriels et professionnels.",
      en: "50 kVA Huawei three-phase hybrid inverter: for large industrial and business sites.",
    },
    specs: [
      { label: { fr: "Puissance", en: "Power" }, value: "50 000 VA" },
      { label: { fr: "Type", en: "Type" }, value: "Hybride" },
      { label: { fr: "Phase", en: "Phase" }, value: "Triphasé" },
      { label: { fr: "Usage", en: "Use" }, value: "Industriel / Gros site" },
    ],
  },
  {
    id: "batterie-b3-5",
    category: "batterie",
    brand: "SAJ",
    name: "Batterie B3-5.0-LV",
    image: "/images/equipement-4.jpeg",
    tagline: {
      fr: "Batterie lithium LiFePO₄ haute durabilité pour stocker votre énergie jour et nuit.",
      en: "High-durability LiFePO₄ lithium battery to store your energy day and night.",
    },
    specs: [
      { label: { fr: "Capacité", en: "Capacity" }, value: "5 120 Wh" },
      { label: { fr: "Tension", en: "Voltage" }, value: "51,2 V" },
      { label: { fr: "Courant", en: "Current" }, value: "100 Ah" },
      { label: { fr: "Chimie", en: "Chemistry" }, value: "Li-ion" },
    ],
  },
];
