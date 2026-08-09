import type { DevisInput } from '@/lib/devis/schema';

/**
 * Point d'extension V2 (§11) — simulateur de prix instantané.
 *
 * Le parcours devis collecte déjà exactement les données nécessaires.
 * Brancher le simulateur = implémenter `estimate()` et ajouter un écran 4bis.
 * Rien n'est calculé en V1 : {{GRILLE TARIFAIRE À FOURNIR}}.
 */

export type PriceRange = {
  /** Borne basse, en euros HT par mois (ou par intervention si ponctuel). */
  min: number;
  /** Borne haute, même unité. */
  max: number;
  unite: 'mois' | 'intervention';
  /** Hypothèses retenues, affichées au visiteur — jamais un prix « magique ». */
  hypotheses: string[];
};

export type Estimator = (input: DevisInput) => PriceRange;

/**
 * Aucune implémentation en V1. Appeler cette fonction lève volontairement :
 * mieux vaut une erreur explicite qu'un prix inventé (§0).
 */
export const estimate: Estimator = () => {
  throw new Error(
    'Simulateur non implémenté : la grille tarifaire n’a pas été fournie (CLAUDE.md §14).',
  );
};

/** Permet à l'appelant de savoir si l'écran 4bis doit exister. */
export const estimationDisponible = false;
