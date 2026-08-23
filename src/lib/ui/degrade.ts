/**
 * Dégradé de bleu partagé (accueil « Pourquoi nous », prestations) : du bleu
 * clair (mist) au cobalt plein, via des mélanges des tokens de marque.
 * Texte encre sur les tons clairs, papier sur les tons foncés (contraste
 * ≥ 4,5:1 vérifié sur chaque palier).
 */
export const DEGRADE_BLEU = [
  'bg-mist text-ink',
  'bg-[color-mix(in_oklab,var(--color-cobalt)_35%,var(--color-mist))] text-ink',
  'bg-[color-mix(in_oklab,var(--color-cobalt)_75%,var(--color-mist))] text-paper',
  'bg-cobalt text-paper',
] as const;
