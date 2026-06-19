# ☀️ SOLARGEN GROUP — TRAVAUX 1

**Projet** : Site web vitrine — énergie solaire (Djibouti)
**Statut** : ✅ Maquette fonctionnelle en local · compile sans erreur (`npm run build`)
**Date** : 17 juin 2026
**Type** : Site one-page (single page) responsive, bilingue FR/EN

---

## 1. Point de départ

Le dossier `site web/` ne contenait **qu'un sous-dossier `Images/`** (photos de techniciens, d'équipements et de chantiers). Tout le site a été conçu à partir de cette matière, des fiches techniques SAJ/Jinko et du flyer SOLARGEN.

**Informations société retenues :**
- Raison sociale : **SOLARGEN GROUP SARL** · NIF 2077796
- Activité : **Vente & installation de matériels solaires** — Djibouti
- Adresse : Rue de Marseille, 15 — Djibouti
- Web : `www.solargen-group.com` · E-mail : `contact@solargen-group.com`
- Slogan : *« un avenir énergétique propre et accessible »*
- Matériel : panneaux **Jinko Tiger Neo 620-625 W**, onduleurs **SAJ H2-5K / H2-10K**, batterie lithium **SAJ B3-5.0-LV (5,12 kWh)**

---

## 2. Stack technique (identique à vos autres sites)

| Technologie | Rôle |
|---|---|
| **Next.js 15** (App Router) | Framework React, performance et SEO |
| **TypeScript** | Code typé et fiable |
| **Tailwind CSS v4** | Système de design / styles |
| **Framer Motion** | Animations, transitions, micro-interactions |
| **Lenis** | Smooth scroll (défilement fluide premium) |

> Le projet **compile sans erreur** (`npm run build` ✅, page `/` = 69,4 kB / 175 kB First Load JS).

---

## 3. Direction artistique (DA)

La DA SOLARGEN est **accordée aux couleurs du logo officiel** (`Images/LOGOSOLARGEN.png`) : le « S » vert, le soleil doré/orange et « ARGEN » en gris anthracite.
- **Palette** : Vert SolarGen (`#3aa935` / `#1c7d1f`) · Soleil or-orange (`#f9b115` / `#f08a00`) · Gris anthracite pour le texte (`#2c2f31`) sur fonds clairs (blanc / vert très pâle)
- **Typographies** : *Sora* (titres, géométrique moderne) + *Manrope* (texte)
- **Ambiance** : propre, solaire, dynamique — dégradés verts, accents soleil, sections claires alternées avec un bandeau anthracite
- Le **vrai logo** est affiché dans la navbar et le footer.

Design system centralisé dans `app/globals.css`.

---

## 4. Sections réalisées (12 blocs)

| # | Section | Contenu & animations |
|---|---|---|
| 1 | **Navigation** | Barre transparente → verre dépoli au scroll · logo SolarGen · bascule **FR/EN** · CTA « Demander un devis » · menu mobile |
| 2 | **Hero** | Photo technicien plein écran · **parallax** · titre animé · badges (matériel certifié, clé en main) |
| 3 | **Statistiques** | 4 **compteurs animés** (installations, kWc, satisfaction, SAV 24/7) |
| 4 | **À propos** | Qui sommes-nous · image parallax · carte flottante « 3000h+ d'ensoleillement » · 4 atouts |
| 5 | **Services** | 6 prestations (étude, vente, installation, batterie, pompage solaire, maintenance) avec icônes animées |
| 6 | **Matériel** | Cartes **filtrables** (Panneaux / Onduleurs / Batteries) avec specs techniques réelles SAJ & Jinko |
| 7 | **Réalisations** | Projets **Agropastoral d'Assamo** & **HALT** · mosaïque d'images · **lightbox** (clavier ←/→/Échap) |
| 8 | **Avantages** | Bandeau bleu nuit · 4 raisons de passer au solaire (économies, énergie propre, autonomie, rentabilité) |
| 9 | **Galerie** | Mosaïque immersive matériel + chantiers · lightbox plein écran |
| 10 | **Bandeau CTA** | « Prêt à passer au solaire ? » sur photo de toiture · boutons devis + WhatsApp |
| 11 | **Contact** | Formulaire qui **ouvre WhatsApp pré-rempli** · adresse, téléphone, e-mail cliquables · carte Google Maps |
| 12 | **Footer** | Liens, coordonnées, copyright dynamique · barre de progression dorée en haut de page |

---

## 5. Fonctionnalités transverses

- ✅ **100 % responsive** (mobile, tablette, desktop)
- ✅ **Bilingue FR / EN** — bascule instantanée, préférence mémorisée (localStorage), **tout** le contenu traduit (y compris le message WhatsApp)
- ✅ **Smooth scroll** premium (Lenis) + barre de progression
- ✅ **Lightbox / galerie** réutilisable (clavier + clic)
- ✅ **Filtrage dynamique** du matériel par catégorie
- ✅ **Formulaire → WhatsApp** (aucun backend nécessaire)
- ✅ **SEO de base** (titres, description, mots-clés, Open Graph)
- ✅ **Accessibilité** : `prefers-reduced-motion`, labels ARIA
- ✅ Images servies directement (`unoptimized: true`) — prêt pour Hostinger

---

## 6. Organisation du projet

```
site web/
├── app/
│   ├── layout.tsx        → polices (Sora + Manrope), métadonnées SEO
│   ├── page.tsx          → assemblage des sections
│   └── globals.css       → design system (couleurs, animations)
├── components/           → 14 composants (Hero, Navbar, Products, Projects…)
├── lib/
│   ├── i18n.tsx          → contexte de langue + bascule FR/EN
│   ├── translations.ts   → 🟢 TOUS les textes du site (FR + EN)
│   ├── products.ts       → 🟢 le matériel (specs SAJ / Jinko)
│   └── contact.ts        → 🟢 coordonnées (téléphone, e-mail, WhatsApp)
├── public/images/        → toutes les images renommées proprement
└── Images/               → dossier source d'origine (conservé)
```

> 📌 **3 fichiers à connaître pour tout modifier** : `lib/translations.ts` (textes), `lib/products.ts` (matériel), `lib/contact.ts` (coordonnées).

---

## 7. ⏭️ Reste à faire / à fournir

- [ ] **☎️ NUMÉRO DE TÉLÉPHONE** — aucun numéro Solargen n'a été trouvé dans les fichiers. Un **placeholder `+253 77 00 00 00`** est en place dans `lib/contact.ts`. → **À remplacer par le vrai numéro** (il alimente le bouton WhatsApp, le formulaire et le footer).
- [ ] **Chiffres réels** — les statistiques (150 installations, 500 kWc, 98 %) sont des estimations à ajuster (`components/Stats.tsx`).
- [ ] **Compression d'images** — quelques PNG sources sont lourds (hero ~2 Mo, about ~2,3 Mo). À recompresser (JPG ≤ 1920 px, < 500 Ko) avant mise en ligne, car l'optimisation auto est désactivée.
- [ ] **Photos produits** — les cartes matériel utilisent des photos génériques d'équipement ; remplaçables par les vraies photos SAJ/Jinko (`lib/products.ts`).
- [ ] **Mise en ligne** — déploiement Hostinger via GitHub (même procédure que Property Hub).
- [ ] **Sécurité** — `next@15.1.6` a une CVE ; envisager un passage à un patch 15.x lors d'une prochaine session.

---

*Document de suivi — Travaux 1. Maquette à présenter pour validation.*
