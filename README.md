# TAPHCO - Tassili Arab Pharmaceutical Company

Redesign du site officiel de TAPHCO (Tassili Arab Pharmaceutical Company), une entreprise algérienne de fabrication de produits pharmaceutiques génériques située à la Zone Industrielle de Rouïba, Alger.

## Aperçu

Site vitrine moderne et responsive, construit en HTML/CSS/JavaScript pur (sans framework), reprenant l'intégralité des informations du site d'origine tout en offrant un design contemporain et dynamique.

## Fonctionnalités

- **Hero slider** — 4 slides animées (Solution Hydro-Alcoolique, Qualité, Capital Humain, Production)
- **Navigation** — barre sticky avec menus déroulants et menu mobile hamburger
- **Animations** — apparition au scroll, compteurs animés, survols interactifs
- **Contenu complet** — Qui sommes-nous, actionnaires, valeurs, objectifs, produits, engagements qualité, évènements, espace RH, liens utiles, contact
- **Formulaires** — candidature spontanée (avec sélection des 58 wilayas) et contact
- **Google Maps** — localisation intégrée de l'usine
- **Assets originaux** — logos, photos d'usine, icônes produit et visuels d'évènements récupérés du site officiel

## Structure

```
taphco-website/
├── index.html          # Page principale (single-page)
├── css/
│   └── style.css       # Styles et animations
├── js/
│   └── main.js         # Interactivité (slider, forms, reveal, compteurs)
└── assets/
    ├── logo/           # Logos TAPHCO et actionnaires
    ├── images/         # Photos et visuels
    ├── produits/       # Icônes des gammes produits
    └── evenements/     # Visuels des évènements scientifiques
```

## Lancer en local

```bash
cd taphco-website
python3 -m http.server 8000
# puis ouvrir http://localhost:8000
```

## Déployer sur GitHub Pages

Le site est hébergé via GitHub Pages à l'adresse :
https://abouda10ranem-source.github.io/taphco-website/

## Technologie

HTML5, CSS3 (variables, flex/grid, animations), JavaScript vanilla, Font Awesome, Google Fonts. Aucune dépendance de build.