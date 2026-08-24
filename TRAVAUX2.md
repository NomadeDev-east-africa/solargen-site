# ☀️ SOLARGEN GROUP — TRAVAUX 2

**Projet** : Site web vitrine — énergie solaire (Djibouti)
**Statut** : ⚠️ Modifications en local, **pas encore commitées** (dernier commit : `d0e9968` — version initiale)
**Date** : 14 août 2026
**Suite de** : [TRAVAUX1.md](./TRAVAUX1.md)

---

## 1. Résumé de la session

Trois chantiers menés en parallèle : mise à jour du logo, ajout d'une 3ᵉ réalisation, et construction d'un **Simulateur Solaire** complet (outil de lead-gen), suivi d'une série de corrections après tests utilisateur.

---

## 2. Logo v2

- Remplacement de l'ancien logo par `Images/NewLogosolargen.png` → `public/images/logo.png` (900×300, fond transparent).
- Le segment « ARGEN » a un dégradé argent/gris qui **ne doit jamais être réencadré dans une boîte blanche** sur le footer sombre (`--color-night: #2c2f31`) — demande explicite de cohérence visuelle.
- Fichiers touchés : `public/images/logo.png`, `components/Footer.tsx`, `components/Navbar.tsx`.

---

## 3. Nouvelle réalisation : Installation Ali Sabieh

- 3ᵉ chantier ajouté aux réalisations (après Agropastoral d'Assamo et HALT).
- 7 photos : `public/images/projet-alisabieh-1.jpeg` → `-7.jpeg`.
- Entrée FR/EN ajoutée dans `lib/translations.ts` → `projects.items`.
- Photo de bureau (`public/images/bureau.jpeg`) intégrée à la mosaïque de `components/Gallery.tsx`.

---

## 4. Simulateur Solaire (`/simulateur`)

Nouvel outil de dimensionnement solaire en libre-service, pensé comme **génération de leads** (aucun devis n'était possible auparavant sans échange manuel).

### Points d'accès
- Bouton `btn-sun` à côté du CTA principal dans la navbar (desktop)
- Bouton mis en avant en haut du menu mobile
- Lien « Explorer » dans le footer

### Parcours (wizard 7 étapes) — `app/simulateur/` + `components/simulator/`
1. Type de site
2. Climatisation (liste répétable — plusieurs tailles de clim possibles dans une même maison)
3. Froid & lessive
4. Confort / bureau
5. Eau & autres besoins
6. Autonomie souhaitée (4 / 8 / 24 / 48h)
7. Coordonnées de contact

### Moteur de calcul — `lib/estimator.ts` (nouveau fichier)
Calcule : nombre de panneaux (**Jinko Tiger Neo 620 W**), choix de l'onduleur (**SAJ H2-5K / H2-10K / SAJ 15 kVA / Huawei 50 kVA**), nombre de batteries (**SAJ B3-5.0-LV, 5120 Wh**).

Hypothèses techniques retenues (à ajuster si de meilleures données arrivent) :
- Ensoleillement moyen Djibouti : **5,8 h/j**
- Taux de dérating système : **0,8**
- Profondeur de décharge batterie (LiFePO₄) : **0,9**
- Facteur de diversité de charge (dimensionnement onduleur) : **0,7**
- Puissance clim par CV : règle du pouce COP ≈ 3 (pas une valeur constructeur)

Le résultat se termine par un **envoi WhatsApp pré-rempli** avec la recommandation (même schéma que `Contact.tsx`, toujours pas de backend).

### Icônes
Aucune photo réelle de clim/appareils disponible → icônes SVG inline sur-mesure dans `components/simulator/icons.tsx`, même style de trait que le reste du site.

### Styles
Les classes `.sg-input` (et nouvelle `.sg-range` pour les sliders) sont sorties du `<style jsx>` local de `Contact.tsx` vers `app/globals.css` pour être partagées avec le simulateur.

---

## 5. Corrections après test utilisateur (même jour)

Le simulateur a été testé en conditions réelles ; plusieurs écarts avec les usages du marché djiboutien ont été corrigés :

| Problème constaté | Correction |
|---|---|
| Puissance clim demandée en BTU | Remplacé par des **CV (chevaux)** — unité réellement utilisée à Djibouti. `CLIM_CV_OPTIONS` (1 / 1.5 / 2 / 3 / 5 CV → watts, COP≈3) |
| Une seule taille de clim supposée par maison | Étape clim transformée en **liste répétable** (`ClimUnit[]`, ajout/suppression de lignes) |
| Pas de distinction mono/triphasé | Étape **Monophasé / Triphasé** ajoutée (`phase`) — catalogue et prix diffèrent beaucoup |
| Onduleurs triphasés manquants | Ajout des vrais produits dans `lib/products.ts` : `onduleur-saj-15k-tri` (SAJ 15 kVA) et `onduleur-huawei-50k-tri` (Huawei 50 kVA — **une seule unité en stock**, jamais traité comme un modèle disponible en série) |
| Règle de sélection triphasée | ≤15 kW → SAJ 15 kVA · ≤50 kW → Huawei 50 kVA · au-delà → « solution sur mesure, à confirmer » |
| Surface au sol erronée (≈3,1 m²/panneau) | Corrigé en **2,31 m²** (2,10 m × 1,10 m) — la valeur donnée par l'utilisateur était une erreur de calcul |
| Panneaux non limités par la surface dispo | Nouvelle étape « surface disponible » : le nombre de panneaux est plafonné si l'utilisateur renseigne la surface, avec avertissement si elle ne suffit pas |
| **Bug** : onduleur dimensionné seulement sur la charge instantanée | Cas test à 96,9 kWh/j (34 panneaux / 21 kWc) recommandait encore un seul onduleur 10 kW → sur-dimensionnement DC:AC ~2,1:1, écrêtage important. **Fix** : l'onduleur est maintenant dimensionné sur le max(charge de pointe, champ PV ÷ `MAX_DC_AC_RATIO`) avec `MAX_DC_AC_RATIO = 1,3` |

---

## 6. État du dépôt Git

**Rien n'a été commité depuis `d0e9968` (version initiale).** Tous les changements ci-dessus sont encore en local :

```
 M app/globals.css
 M components/Contact.tsx
 M components/Footer.tsx
 M components/Gallery.tsx
 M components/Navbar.tsx
 M lib/products.ts
 M lib/translations.ts
 M public/images/logo.png
?? app/simulateur/
?? components/simulator/
?? lib/estimator.ts
?? public/images/bureau.jpeg
?? public/images/projet-alisabieh-1..7.jpeg
```

8 fichiers modifiés (450 insertions / 39 suppressions) + fichiers nouveaux (simulateur, estimateur, 8 images).

---

## 7. ⏭️ Reste à faire

- [ ] **Commit** des changements ci-dessus (aucun commit demandé pendant la session)
- [ ] Vérifier `lib/contact.ts` — le numéro de téléphone placeholder signalé dans TRAVAUX1 (`+253 77 00 00 00`) était toujours à remplacer à ce stade ; à reconfirmer
- [ ] Compression des nouvelles photos (`bureau.jpeg`, `projet-alisabieh-*.jpeg`) si elles dépassent 500 Ko / 1920 px
- [ ] Tester le simulateur sur mobile (formulaire long, wizard 7 étapes)
- [ ] Mise en ligne Hostinger — toujours en attente

---

*Document de suivi — Travaux 2.*
