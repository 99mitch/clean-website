# SPOWCLEAN — site vitrine B2B

Site vitrine de propreté industrielle. **KPI unique : le nombre de demandes de
devis qualifiées.** Le brief complet est dans [`CLAUDE.md`](./CLAUDE.md) ; ce
fichier n'en est que le mode d'emploi technique.

## Démarrer

```bash
pnpm install
cp .env.example .env.local   # puis renseigner les variables
pnpm dev                     # http://localhost:3000
pnpm build                   # build de production
pnpm lint                    # eslint + tsc --noEmit
```

Node 20+ requis, `pnpm` obligatoire.

## Ce qu'il faut renseigner avant toute mise en ligne

Tout est centralisé dans **`src/config/site.ts`**. Chaque valeur à `null`
s'affiche comme un emplacement `<PendingData />` en développement et **rien du
tout en production** : aucun chiffre, logo, avis ou certification n'est inventé
(CLAUDE.md §0).

| À renseigner | Où |
| --- | --- |
| Nom, adresse, téléphone, email, zone d'intervention | `src/config/site.ts` |
| SIRET, TVA, RCS, directeur de publication | `src/config/site.ts` → `legal` |
| Chiffres clés (salariés, sites, m², satisfaction…) | `src/config/site.ts` → `chiffres` |
| Certifications réellement détenues | `src/config/site.ts` → `certifications` |
| Logos clients (autorisation écrite requise) | `src/config/site.ts` → `logosClients` |
| Délai de réponse annoncé dans l'accusé de réception | `delaiReponseHeuresOuvrees` |
| Plaquette PDF jointe au devis | `plaquetteUrl` |
| URL de production, clés Resend, domaine Plausible | `.env.local` |

## Contenu

Le contenu vit dans `content/`, en MDX, versionné avec le code. Pas de CMS.

```
content/services/*.mdx      7 prestations
content/secteurs/*.mdx      5 secteurs
content/blog/*.mdx          articles SEO
content/references/*.mdx    études de cas — vide tant qu'aucun accord client écrit
content/equipe/*.mdx        encadrement — vide tant que les fiches ne sont pas validées
content/offres/*.mdx        offres d'emploi — vide tant qu'aucune n'est ouverte
```

Le frontmatter est **validé par Zod au build** (`src/lib/content/schemas.ts`) :
un fichier invalide fait échouer `pnpm build`, volontairement.

Les répertoires vides sont un état normal, géré par chaque page (message
explicite plutôt que section fantôme).

## Architecture

```
src/
  app/                 routes App Router, 100 % RSC sauf /devis et /contact
  components/
    devis/             parcours multi-étapes (seul gros composant client)
    home/              matrice secteurs × prestations
    materiaux/         échantillonnier + bandeaux de rubrique
    content/           registre (Ledger), fil d'Ariane, rendu MDX
    ui/                primitives : Button, Section, Icon, Reveal, PendingData
  config/site.ts       source unique des données entreprise
  copy/                tous les textes, hors JSX (prêt pour l'i18n V2)
  lib/
    content/           chargement + validation MDX
    devis/             schémas Zod partagés client/serveur
    leads/             adaptateurs de destination des leads
    pricing/           point d'extension V2 — interface seule, non implémentée
    seo/               metadata + JSON-LD
```

## Parcours devis

`/devis` — 5 étapes, une question par écran, progression dans l'URL (`?step=n`)
et `sessionStorage`. Pré-remplissage depuis une page service ou secteur via
`?service=vitrerie&secteur=medical`, qui saute l'étape correspondante.

Anti-spam : honeypot + délai minimal de 3 s + rate-limit IP. Pas de captcha.

Soumission → `POST /api/devis` → revalidation Zod serveur → `sendLead()` →
redirection vers `/devis/merci` (page distincte, donc conversion mesurable).

## Emails

Resend + React Email (`src/emails/`). Deux envois par demande de devis :
notification interne détaillée et accusé de réception client.

Variables requises : `RESEND_API_KEY`, `LEADS_EMAIL_TO`, `LEADS_EMAIL_FROM`.
Sans elles, la route handler renvoie une erreur explicite plutôt que d'avaler
le lead en silence.

## Direction artistique — « l'échantillonnier »

Registre dossier technique. Le site parle la langue du métier : **douze revêtements**, chacun avec son protocole (`src/lib/materiaux.ts`), dont les textures sont **générées en dégradés CSS** (`.sample[data-mat=…]`) — aucune image, aucun octet réseau. Au survol, la trame se retire.

L'échantillonnier occupe la moitié du hero ; un bandeau de 8 px identifie chaque rubrique, le menu « Prestations » porte une plaque par entrée, une réglette des douze ferme la bande d'appel au devis. Deuxième pièce structurante : la **matrice secteurs × prestations**, le croisement du §4 rendu littéral.

| Token | Valeur | Usage |
| --- | --- | --- |
| `--color-abyss` | `#071320` | bandes denses, pied de page |
| `--color-ink` | `#0B1620` | texte, filets pleins |
| `--color-cobalt` | `#16467A` | couleur de marque, structure |
| `--color-signal` | `#2560E8` | **accent — bouton devis, étape active, ligne survolée. Rien d'autre.** |
| `--color-slate` | `#4A5A6B` | texte secondaire (6,4:1 sur papier) |
| `--color-graphite` | `#8494A5` | filets et décor — jamais de texte |
| `--color-mist` | `#E4EAF1` | aplats légers |
| `--color-paper` | `#F6F8FB` | fond courant |

**Rayon 0 partout**, sauf 2 px sur les champs de saisie. **Aucune carte** : les listes sont des lignes de registre pleine largeur, filet d'un pixel, données en monospace à droite. Échelle typographique stricte : 13 / 15 / 17 / 21 / 28 / 40 / 64 / 88.

Un seul moment animé : la pose en cascade des douze plaques au chargement. Le reste (révélations au scroll, compactage du header) est en CSS scroll-driven — aucun listener, les pages de contenu restent 100 % serveur.

Navigation : trois groupes (Prestations, Secteurs, L'entreprise), les deux premiers alimentés par le contenu MDX. Menus en `<details>` exclusifs — clavier, refermables. Seule dépendance client du header : `NavAutoClose`, qui les referme après un clic (la navigation Next ne recrée pas le DOM, l'attribut `open` y survivrait).

L'ancienne direction artistique est conservée dans `archive/v1/`, hors compilation et hors lint.

## Points d'extension V2 (prévus, non implémentés)

- `src/lib/pricing/` — `estimate(input): PriceRange`, en attente de la grille tarifaire.
- `src/lib/leads/` — ajouter un CRM = ajouter un adaptateur, sans toucher au parcours.
- `#assistant-slot` dans le layout — emplacement du futur widget d'assistant.
- Textes hors JSX dans `src/copy/` — prêt pour l'i18n.
