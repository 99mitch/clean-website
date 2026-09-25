# CLAUDE.md — Site SPOWCLEAN · Propreté industrielle & services associés

Fichier de contexte pour Claude Code. Lis-le entièrement avant toute modification.
Objectif du dépôt : un site vitrine B2B haute performance dont le seul KPI est **le nombre de demandes de devis qualifiées**.

---

## 0. Variables à remplir avant de commencer

Ces valeurs sont référencées partout dans le code (`src/config/site.ts`). Tant qu'elles ne sont pas renseignées, garde le placeholder visible — ne jamais inventer une donnée chiffrée, une certification ou un nom de client.

| Clé | Valeur | Statut |
|---|---|---|
| `NOM_ENTREPRISE` | {{À REMPLIR}} | ❌ |
| `ZONE_INTERVENTION` | {{ex. Île-de-France, rayon 50 km autour de Paris}} | ❌ |
| `ADRESSE_SIEGE` | {{À REMPLIR}} | ❌ |
| `TELEPHONE` | {{format +33 1 XX XX XX XX}} | ❌ |
| `EMAIL_CONTACT` | {{À REMPLIR}} | ❌ |
| `SIRET` / `TVA` | {{pour mentions légales}} | ❌ |
| `DOMAINE` | {{ex. https://nomentreprise.fr}} | ❌ |
| `ANNEE_CREATION`, `NB_SALARIES`, `NB_SITES_CLIENTS`, `M2_TRAITES_AN`, `TAUX_SATISFACTION`, `DELAI_INTERVENTION` | {{chiffres réels uniquement}} | ❌ |
| `CERTIFICATIONS` | {{Qualipropre ? ISO 9001 ? Ecolabel ? sinon : ne rien afficher}} | ❌ |
| `DESTINATION_LEADS` | {{email seul / Airtable / HubSpot / Pipedrive}} | ❌ |

**Règle absolue : aucun chiffre clé, logo client, avis ou certification en dur tant que le client ne l'a pas validé.** Utiliser le composant `<PendingData label="…" />` qui rend un bloc neutre en dev et rien en production.

---

## 1. Périmètre

### V1 — à livrer (ce dépôt)
Site vitrine complet + **parcours de devis multi-étapes**. Rien d'autre.

### V2 — à préparer mais NE PAS construire
Simulateur de prix instantané, assistant IA de qualification, prise de RDV en ligne, avis Google via API, QR code satisfaction, espace client, EN.
→ L'architecture doit les accueillir sans refonte : voir §11. Ne pas installer de dépendance « au cas où ».

---

## 2. Positionnement (contexte marché)

Le concurrent de référence est **pacific-sa.fr** (Wix, design 2019). Ce qu'il fait bien et qu'on garde : segmentation claire par secteur, promesses de réactivité / proximité / flexibilité contractuelle (contrat sans engagement, réponse < 24 h), logos clients.
Ce qu'il rate et qui est notre angle d'attaque :

- aucune preuve chiffrée, aucun avis client détaillé ;
- aucun parcours de conversion : un formulaire de contact générique, point final ;
- contenu obsolète en page d'accueil (bandeau désinfection Covid toujours en ligne) ;
- SEO technique nul (Wix générique, meta-description dupliquée, faute d'orthographe dans les balises).

**Notre thèse : chez nous on obtient une réponse chiffrée, pas une brochure.** Chaque page doit rapprocher le visiteur d'une demande de devis.

### Cibles (par ordre de priorité)
1. Décideurs B2B : office managers, gestionnaires d'immeubles, syndics, DAF, directeurs d'établissement (clinique, EHPAD, école).
2. Professions libérales / commerces pour prestations ponctuelles.
3. Candidats (agents de propreté, chefs d'équipe) — page recrutement, tunnel séparé.

### Ton éditorial
Professionnel, direct, orienté preuve. Phrases courtes, voix active, pas de jargon institutionnel (« acteur incontournable », « solutions sur-mesure » = interdits). On écrit ce que le client obtient, pas ce qu'on est.

---

## 3. Stack

- **Next.js 15** (App Router, React Server Components par défaut) — TypeScript strict
- **Tailwind CSS v4** (config par `@theme` dans le CSS, pas de `tailwind.config.js` étendu)
- **Contenu : MDX dans le dépôt**, pas de CMS. Parsing avec `next-mdx-remote` ou `@next/mdx` + `gray-matter`, validation du frontmatter par **Zod**.
- Formulaires : `react-hook-form` + `zod` (schéma partagé client/serveur)
- Emails transactionnels : **Resend** + **React Email**
- Animations : **Motion** (`motion/react`), uniquement là où c'est spécifié
- Déploiement : Vercel. Node 20+, `pnpm`.

**Ne pas ajouter** : librairie de composants (shadcn inclus), state manager global, ORM, i18n runtime, analytics tiers autres que celui listé en §9.

### Commandes
```bash
pnpm dev            # dev server
pnpm build          # build de prod — doit passer sans warning
pnpm lint           # eslint + typecheck
pnpm test:e2e       # playwright : parcours devis de bout en bout
pnpm lighthouse     # budget perf, voir §8
```

---

## 4. Arborescence des routes

```
/                                   Accueil
/qui-sommes-nous                    Histoire, équipe, engagement humain
/services                           Index des prestations
/services/[slug]                    entretien-regulier, remise-en-etat,
                                    traitement-des-sols, vitrerie, hygiene-3d,
                                    bio-nettoyage, services-associes
                                    → {{CONFIRMER LA LISTE RÉELLE}}
/secteurs                           Index des secteurs
/secteurs/[slug]                    bureaux, medical, industrie,
                                    immeubles-coproprietes, ecoles-creches
/engagements                        RSE, environnement, politique RH
/engagements/certifications
/references                         Études de cas + logos clients
/blog                               Index (SEO)
/blog/[slug]
/recrutement                        Offres + candidature spontanée
/devis                              ⭐ Parcours multi-étapes
/contact
/mentions-legales  /politique-de-confidentialite  /accessibilite
```

`/services/[slug]` et `/secteurs/[slug]` sont générés depuis les MDX via `generateStaticParams`. **Chaque page secteur croise le secteur avec les services pertinents** (une clinique ne cherche pas « nettoyage » mais « bionettoyage protocole DASRI ») — c'est le cœur de la stratégie SEO longue traîne.

---

## 5. Modèle de contenu

```
content/
  services/entretien-regulier.mdx
  secteurs/milieu-medical.mdx
  references/{slug}.mdx
  blog/{slug}.mdx
  equipe/{slug}.mdx
```

Frontmatter service (validé par Zod, build en échec si invalide) :

```yaml
---
title: "Entretien régulier"
slug: "entretien-regulier"
excerpt: "…"          # 140 car. max, sert aussi de meta-description
icon: "recurring"      # clé du set d'icônes maison, pas de lucide générique
order: 1
secteurs: ["bureaux", "immeubles-coproprietes"]
prestations:           # liste concrète, pas des adjectifs
  - "Sanitaires : désinfection et réapprovisionnement quotidien"
  - "Sols : aspiration et lavage selon protocole défini au contrat"
frequences: ["quotidien", "hebdomadaire", "mensuel", "ponctuel"]
seo:
  title: "…"
  keywords: ["…"]
---
```

Règle de rédaction MDX : chaque page service ouvre sur **ce que le client obtient**, jamais sur « Notre société propose ». Chaque page se termine par un `<DevisCTA service="…" />` qui pré-remplit le parcours devis.

---

## 6. Direction artistique — « L'ÉCHANTILLONNIER »

Registre : **dossier technique**. Le site parle la langue du métier — les revêtements. Pas de photographie, pas d'icône décorative, pas de vignette arrondie. Des filets, des plaques d'échantillon générées en CSS, et de la donnée en monospace.

### Tokens (`src/app/globals.css`, bloc `@theme`)

```css
--color-abyss:    #071320;  /* bandes denses, pied de page */
--color-ink:      #0B1620;  /* texte, filets pleins */
--color-cobalt:   #16467A;  /* couleur de marque, structure */
--color-signal:   #2560E8;  /* ACCENT — usage strictement limité */
--color-slate:    #4A5A6B;  /* texte secondaire — 6,4:1 sur papier */
--color-graphite: #8494A5;  /* filets et décor — JAMAIS de texte (2,8:1) */
--color-mist:     #E4EAF1;  /* aplats légers */
--color-paper:    #F6F8FB;  /* fond courant */
--color-white:    #FFFFFF;
```

Neutres tirés vers le bleu, jamais des gris purs. Le fond courant est le papier, pas le blanc : le blanc est réservé aux plans qui remontent (survol d'une ligne de registre, sections alternées).

Le **signal** n'apparaît que sur trois choses : le bouton devis, l'étape active du parcours devis, la ligne survolée de la matrice. Si un quatrième usage apparaît, le supprimer. Blanc sur signal = 5,4:1, conforme AA.

### Typographie
- Display : **Bricolage Grotesque**, `wght 800`, `tracking -0.045em` en courant, jusqu'à `-0.07em` sur les très grandes tailles.
- Texte : **Instrument Sans** — corps 17px/1.6, mesure 68 caractères max.
- Utilitaire : **IBM Plex Mono**, `wght 500`, `tracking 0.14em`, capitales — libellés de section, chiffres, protocoles, libellés de boutons. **Tout ce qui est donnée passe en monospace** : c'est ce qui rend la preuve crédible.

Échelle : 13 / 15 / 17 / 21 / 28 / 40 / 64 / 88. Pas de valeur intermédiaire.

### Élément signature : l'échantillonnier

Douze revêtements — moquette, PVC, marbre, béton quartzé, carrelage, parquet, résine, vitrage, inox, linoléum, terrazzo, textile — chacun avec son protocole (`src/lib/materiaux.ts`). Les textures sont **générées en dégradés CSS** (`.sample[data-mat=…]`) : aucune image, aucun octet réseau, aucune banque d'images. Au survol, la trame se retire — la surface est traitée.

L'échantillonnier occupe la moitié du hero d'accueil. Il se rejoue ailleurs : un bandeau de 8px identifie chaque rubrique (`bandeauParRubrique`), le menu « Prestations » porte une plaque par entrée, une réglette des douze ferme la bande d'appel au devis.

**Deuxième pièce structurante : la matrice secteurs × prestations** (`src/components/home/Matrice.tsx`). Le croisement du §4 rendu littéral, en vrai `<table>` avec en-têtes de ligne et de colonne cliquables.

### Formes et listes
- **Coins arrondis sur les cartes** (`rounded-card`, 16px) et les étiquettes (`rounded-chip`, 6px) — demande client du 25/09/2026. 2px sur les champs de saisie, 0 ailleurs. Ni pilule, ni verre, ni halo, ni ombre décorative.
- **Aucune carte.** Les listes sont des **lignes de registre** (`.ledger-row`) : pleine largeur, filet d'un pixel, colonne de données en monospace à droite, onglet d'encre qui se déploie au survol et au focus.
- Filet plein 2px en tête de chaque section et de chaque page — c'est la structure qui tient le site ensemble.
- Trois fonds seulement : papier (courant), blanc (plan qui remonte), abyss (bandes denses).

### Navigation
Trois groupes : **Prestations**, **Secteurs**, **L'entreprise**. Les deux premiers sont alimentés par le contenu MDX — ajouter une prestation la fait apparaître au menu sans intervention. Menus en `<details>` exclusifs (`name="nav"`) : clic pour ouvrir, refermables, clavier. Un menu au survol ne satisferait pas le critère WCAG 1.4.13.

Seule dépendance client du header : `<NavAutoClose />`, qui referme les menus après un clic sur une entrée. La navigation Next ne recrée pas le DOM du header, donc l'attribut `open` y survivrait au changement de page, et aucune règle CSS ne peut le retirer.

### Motion
- Un seul moment orchestré : la pose en cascade des douze plaques au chargement (45ms d'écart). Ensuite, plus rien ne bouge tout seul.
- Révélation au scroll : `opacity + translateY(12px)`, 400ms, en CSS scroll-driven — zéro JS, donc les pages de contenu restent 100 % RSC.
- Survols 150-220ms. `prefers-reduced-motion: reduce` annule tout.
- CTA permanent : header sticky papier à filet d'encre, compacté après 120px. Sur mobile, barre d'action fixe en bas (Appeler / Devis).

> L'ancienne direction artistique est conservée dans `archive/v1/`, hors compilation et hors lint.

## 7. Parcours devis (`/devis`) — cœur du projet

5 étapes, une question par écran, progression persistée dans l'URL (`?step=2`) et `sessionStorage` pour tolérer un rafraîchissement. Pas de `<form>` multi-page classique : chaque étape valide son schéma Zod avant de laisser passer.

```
01 · Type de local        bureaux · commerce · médical · industriel · immeuble · autre
02 · Surface              < 100 / 100-300 / 300-1000 / 1000-3000 / > 3000 m²
03 · Fréquence            quotidien · 2-3×/sem · hebdo · mensuel · ponctuel/one-shot
04 · Prestations          multi-sélection, filtrée selon l'étape 01
05 · Coordonnées          société, nom, email, téléphone, code postal, message libre
```

Règles :
- Étapes 01-04 en un clic (pas de bouton « suivant » quand le choix est unique) ; l'étape 04 en a un.
- Retour arrière toujours possible sans perte de données.
- Champs contact : le téléphone est **facultatif** (il fait chuter la conversion), l'email obligatoire.
- Anti-spam : honeypot + champ `renderedAt` (rejet si soumission < 3 s) + rate-limit IP côté route handler. **Pas de captcha** en V1.
- Soumission → route handler `app/api/devis/route.ts` : re-validation Zod serveur, envoi Resend en double (notification interne détaillée + accusé de réception client), écriture dans `DESTINATION_LEADS`, puis redirection `/devis/merci` (page distincte = conversion mesurable).
- L'accusé de réception annonce un délai de réponse explicite ({{X}} heures ouvrées) et joint la plaquette PDF.
- En cas d'échec d'envoi : message d'erreur qui donne le téléphone et l'email en secours, et conserve les réponses saisies. Une erreur ne s'excuse pas, elle indique quoi faire.

Le pré-remplissage depuis une page service ou secteur passe par `?service=vitrerie&secteur=medical` et saute l'étape correspondante.

---

## 8. Performance & qualité

Budgets, vérifiés en CI, build en échec si dépassement :

| Métrique | Cible |
|---|---|
| LCP (mobile, 4G simulée) | < 2,0 s |
| CLS | < 0,05 |
| INP | < 200 ms |
| JS initial (route `/`) | < 110 kB gzip |
| Lighthouse Perf / A11y / SEO | ≥ 95 / 100 / 100 |

- Images : `next/image`, AVIF + WebP, `sizes` toujours explicite, `priority` sur le seul visuel du hero.
- Polices : `next/font/local`, `display: swap`, subset latin, préchargement des deux graisses utilisées.
- Les pages de contenu sont 100 % RSC. Le seul JS client est `/devis`, `/contact`, le comparateur photographique et `<NavAutoClose />` (≈ 1 ko, voir §6).

---

## 9. SEO technique

- `generateMetadata` par route, jamais de meta-description dupliquée (l'erreur du concurrent).
- JSON-LD : `LocalBusiness` (siège + `areaServed`) sur toutes les pages, `Service` sur `/services/[slug]`, `BreadcrumbList`, `FAQPage` là où il y a une FAQ, `JobPosting` sur les offres.
- `sitemap.ts` et `robots.ts` dynamiques. Canoniques absolues.
- Cibles prioritaires : `entreprise de nettoyage {{VILLE}}`, `propreté industrielle {{RÉGION}}`, `nettoyage bureaux {{VILLE}}`, `bionettoyage clinique {{RÉGION}}`, `société de nettoyage copropriété {{VILLE}}`.
- Pages locales : ne créer une page ville que s'il existe du contenu réellement spécifique (références locales, délai d'intervention). Pas de doorway pages dupliquées.
- Analytics : Vercel Analytics + Plausible (sans cookie, donc pas de bandeau de consentement à gérer en V1). Événements suivis : `devis_step_{n}`, `devis_submit`, `tel_click`, `plaquette_download`.

---

## 10. Accessibilité (RGAA 4.1 / WCAG 2.2 AA) — non négociable

- Contraste ≥ 4,5:1 pour le texte, ≥ 3:1 pour les composants. `--color-copper` sur blanc ne passe pas en texte fin : ne l'utiliser qu'en fond de bouton avec texte `--color-ink`, ou en texte ≥ 21px bold. Vérifier avant de committer.
- Navigation clavier complète, focus visible (anneau 2px `--color-petrol`, offset 2px), jamais `outline: none`.
- Parcours devis : `aria-live="polite"` sur le changement d'étape, erreurs liées par `aria-describedby`, groupes de choix en `<fieldset>/<legend>`.
- Le comparateur avant/après reste utilisable au clavier et sans souris ; alternative textuelle décrivant les deux états.
- Cibles tactiles ≥ 44×44 px (WCAG 2.2 « Target Size »).
- Page `/accessibilite` avec déclaration de conformité (obligation légale FR pour les acteurs concernés).
- Test axe-core intégré au E2E ; zéro violation critique tolérée.

---

## 11. Points d'extension pour la V2

Prévoir sans implémenter :
- `src/lib/pricing/` — module vide avec l'interface `estimate(input: DevisInput): PriceRange`. Le parcours devis passe déjà les bonnes données ; brancher le simulateur = implémenter cette fonction et ajouter un écran 4bis. {{Grille tarifaire à fournir}}
- `src/lib/leads/` — adaptateur `sendLead(lead)` avec une implémentation email ; ajouter CRM = ajouter un adaptateur.
- Slot vide dans le layout pour un widget d'assistant (chargé en `dynamic(..., { ssr: false })` le jour venu).
- Routes de contenu prêtes pour l'i18n : garder tous les textes hors JSX dans `content/` ou `src/copy/`, jamais de chaîne en dur dans un composant.

---

## 12. Conventions

- Composants en `PascalCase`, un fichier par composant, colocation dans `src/components/{domaine}/`.
- Server Components par défaut ; `"use client"` uniquement sur les feuilles interactives, jamais sur un layout.
- Tailwind uniquement, pas de CSS module. Classes ordonnées layout → box → typo → couleur → état.
- Pas de `any`, pas de `@ts-ignore`. Pas de `console.log` en production.
- Commits conventionnels (`feat:`, `fix:`, `content:`).
- Textes en français avec apostrophes typographiques (’) et espaces insécables avant `: ; ? !` et dans « … ».

---

## 13. Definition of Done (par page)

1. Contenu MDX validé par Zod, aucun lorem, aucun chiffre inventé.
2. Metadata + JSON-LD en place.
3. Responsive vérifié à 360 / 768 / 1280 / 1920.
4. Parcours clavier complet, axe-core propre.
5. Budgets §8 respectés en build de prod.
6. Un chemin évident vers `/devis` existe sur la page.

---

## 14. Questions ouvertes (à trancher avec le client)

- [ ] Liste exacte des prestations (le cahier des charges laisse trois lignes vides dans l'arborescence).
- [ ] Grille tarifaire réelle pour le simulateur V2, ou renoncer à l'affichage de prix.
- [ ] Existence de photos avant/après et de visuels d'équipe → conditionne la DA du hero.
- [ ] Certifications réellement détenues (ne rien afficher sinon).
- [ ] Logos clients : autorisation écrite obtenue ?
- [ ] Newsletter conservée ou supprimée (elle existe chez le concurrent, sans usage visible).
- [ ] EN nécessaire dès la V1 ou reporté ?

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
