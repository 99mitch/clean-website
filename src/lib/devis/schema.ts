import { z } from 'zod';

/** Schémas partagés client/serveur (§3) — la route handler revalide tout. */

export const typeLocalValues = [
  'bureaux',
  'commerce',
  'medical',
  'industriel',
  'immeuble',
  'autre',
] as const;

export const surfaceValues = [
  'moins-100',
  '100-300',
  '300-1000',
  '1000-3000',
  'plus-3000',
] as const;

export const frequenceValues = [
  'quotidien',
  '2-3-par-semaine',
  'hebdomadaire',
  'mensuel',
  'ponctuel',
] as const;

export const prestationValues = [
  'entretien-regulier',
  'remise-en-etat',
  'traitement-des-sols',
  'vitrerie',
  'hygiene-3d',
  'bio-nettoyage',
  'services-associes',
] as const;

export type TypeLocal = (typeof typeLocalValues)[number];
export type Surface = (typeof surfaceValues)[number];
export type Frequence = (typeof frequenceValues)[number];
export type Prestation = (typeof prestationValues)[number];

/** Prestations proposées à l'étape 04, filtrées selon l'étape 01 (§7). */
export const prestationsParTypeLocal: Record<TypeLocal, Prestation[]> = {
  bureaux: [
    'entretien-regulier',
    'vitrerie',
    'traitement-des-sols',
    'remise-en-etat',
    'services-associes',
  ],
  commerce: [
    'entretien-regulier',
    'vitrerie',
    'traitement-des-sols',
    'hygiene-3d',
    'remise-en-etat',
  ],
  medical: [
    'bio-nettoyage',
    'entretien-regulier',
    'hygiene-3d',
    'vitrerie',
    'traitement-des-sols',
  ],
  industriel: [
    'entretien-regulier',
    'remise-en-etat',
    'traitement-des-sols',
    'hygiene-3d',
    'services-associes',
  ],
  immeuble: [
    'entretien-regulier',
    'vitrerie',
    'hygiene-3d',
    'remise-en-etat',
    'services-associes',
  ],
  autre: [...prestationValues],
};

export const step1Schema = z.object({ typeLocal: z.enum(typeLocalValues) });
export const step2Schema = z.object({ surface: z.enum(surfaceValues) });
export const step3Schema = z.object({ frequence: z.enum(frequenceValues) });
export const step4Schema = z.object({
  prestations: z.array(z.enum(prestationValues)).min(1),
});

export const contactSchema = z.object({
  societe: z.string().trim().min(2).max(120),
  nom: z.string().trim().min(2).max(120),
  email: z.email().max(160),
  /** Facultatif : exiger le téléphone fait chuter la conversion (§7). */
  telephone: z
    .string()
    .trim()
    .max(30)
    .regex(/^[+0-9 ().-]{6,}$/u, 'Numéro invalide')
    .optional()
    .or(z.literal('')),
  codePostal: z
    .string()
    .trim()
    .regex(/^\d{5}$/u, 'Code postal à 5 chiffres'),
  message: z.string().trim().max(2000).optional().or(z.literal('')),
  consentement: z.literal(true),
});

/** Réponses complètes du parcours, telles que postées. */
export const devisSchema = step1Schema
  .extend(step2Schema.shape)
  .extend(step3Schema.shape)
  .extend(step4Schema.shape)
  .extend(contactSchema.shape)
  .extend({
    /** Honeypot — doit rester vide (§7). */
    societeWeb: z.string().max(0).optional().default(''),
    /** Horodatage du rendu, en ms. Rejet si soumission < 3 s. */
    renderedAt: z.number().int().positive(),
    /** Pré-remplissage éventuel depuis une page service/secteur. */
    origine: z.string().max(120).optional(),
  });

export type DevisInput = z.infer<typeof devisSchema>;

/** Réponses partielles telles que stockées dans sessionStorage / l'URL. */
export type DevisDraft = Partial<
  Pick<DevisInput, 'typeLocal' | 'surface' | 'frequence' | 'prestations'>
> &
  Partial<z.infer<typeof contactSchema>>;

export const TOTAL_STEPS = 5;

export const stepSchemas = [
  step1Schema,
  step2Schema,
  step3Schema,
  step4Schema,
  contactSchema,
] as const;

/** Délai minimal entre le rendu du formulaire et la soumission. */
export const MIN_FILL_MS = 3000;
