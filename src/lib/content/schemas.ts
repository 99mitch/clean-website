import { z } from 'zod';
import { iconKeys } from '@/components/ui/Icon';

/**
 * Frontmatter validé au build (§5). Un fichier invalide fait échouer
 * `pnpm build` — c'est voulu : pas de contenu à moitié rédigé en production.
 */

const slug = z
  .string()
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'slug en kebab-case ASCII');

const seo = z.object({
  title: z.string().min(10).max(70),
  description: z.string().min(50).max(160).optional(),
  keywords: z.array(z.string()).min(1).max(12),
});

export const frequenceValues = [
  'quotidien',
  '2-3-par-semaine',
  'hebdomadaire',
  'mensuel',
  'ponctuel',
] as const;

export const serviceSchema = z.object({
  title: z.string().min(3),
  slug,
  /** Sert aussi de meta-description par défaut — 140 caractères max. */
  excerpt: z.string().min(40).max(140),
  icon: z.enum(iconKeys),
  order: z.number().int().positive(),
  secteurs: z.array(slug).default([]),
  /** Liste concrète de ce qui est fait, pas des adjectifs. */
  prestations: z.array(z.string().min(10)).min(3),
  frequences: z.array(z.enum(frequenceValues)).min(1),
  /** Clé d'option du parcours devis pré-cochée depuis cette page. */
  devisPrestation: z.string().optional(),
  seo,
});

export const secteurSchema = z.object({
  title: z.string().min(3),
  slug,
  excerpt: z.string().min(40).max(140),
  icon: z.enum(iconKeys),
  order: z.number().int().positive(),
  /** Croisement secteur × services — cœur de la longue traîne (§4). */
  services: z.array(slug).min(1),
  /** Contraintes réelles du secteur, formulées côté client. */
  enjeux: z.array(z.string().min(10)).min(3),
  /** Type de local correspondant dans le parcours devis. */
  devisTypeLocal: z.enum([
    'bureaux',
    'commerce',
    'medical',
    'industriel',
    'immeuble',
    'autre',
  ]),
  faq: z
    .array(z.object({ question: z.string().min(10), reponse: z.string().min(20) }))
    .default([]),
  seo,
});

export const referenceSchema = z.object({
  title: z.string().min(3),
  slug,
  excerpt: z.string().min(40).max(140),
  secteur: slug,
  services: z.array(slug).min(1),
  order: z.number().int().positive(),
  /** Chiffres du cas client : uniquement s'ils sont validés par écrit (§0). */
  chiffres: z
    .array(z.object({ valeur: z.string(), label: z.string() }))
    .default([]),
  /** Nom du client — `null` tant que l'autorisation écrite n'est pas obtenue. */
  client: z.string().nullable().default(null),
  seo,
});

export const articleSchema = z.object({
  title: z.string().min(3),
  slug,
  excerpt: z.string().min(40).max(140),
  date: z.iso.date(),
  auteur: z.string().min(2),
  tags: z.array(z.string()).min(1).max(5),
  seo,
});

export const membreSchema = z.object({
  nom: z.string().min(2),
  slug,
  role: z.string().min(3),
  order: z.number().int().positive(),
  citation: z.string().min(20).optional(),
});

export const offreSchema = z.object({
  title: z.string().min(3),
  slug,
  excerpt: z.string().min(40).max(140),
  contrat: z.enum(['CDI', 'CDD', 'Alternance', 'Intérim']),
  temps: z.enum(['Temps plein', 'Temps partiel']),
  lieu: z.string().min(2),
  order: z.number().int().positive(),
  publieLe: z.iso.date(),
  missions: z.array(z.string().min(10)).min(3),
  profil: z.array(z.string().min(10)).min(2),
  seo,
});

export type Service = z.infer<typeof serviceSchema>;
export type Secteur = z.infer<typeof secteurSchema>;
export type Reference = z.infer<typeof referenceSchema>;
export type Article = z.infer<typeof articleSchema>;
export type Membre = z.infer<typeof membreSchema>;
export type Offre = z.infer<typeof offreSchema>;
