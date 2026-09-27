/**
 * Dégradé de bleu partagé (accueil « Pourquoi nous », prestations) : du bleu
 * clair (mist) au cobalt plein, via des mélanges des tokens de marque.
 * Texte encre sur les tons clairs, papier sur les tons foncés (contraste
 * ≥ 4,5:1 vérifié sur chaque palier, y compris pour les textes secondaires
 * posés à 80 % d'opacité — ne pas descendre en dessous).
 */
export const DEGRADE_BLEU = [
  'bg-mist text-ink',
  'bg-[color-mix(in_oklab,var(--color-cobalt)_30%,var(--color-mist))] text-ink',
  'bg-[color-mix(in_oklab,var(--color-cobalt)_85%,var(--color-mist))] text-paper',
  'bg-cobalt text-paper',
] as const;

/**
 * Palier du dégradé pour la `index`-ième carte d'une liste de `total` :
 * répartit la liste sur toute l'étendue, du mist au cobalt, quel que soit
 * le nombre d'entrées (ajouter ou retirer une fiche ne casse pas la rampe).
 */
export function degradeBleu(index: number, total: number): string {
  if (total <= 1) return DEGRADE_BLEU[0];
  const palier = Math.round((index * (DEGRADE_BLEU.length - 1)) / (total - 1));
  return DEGRADE_BLEU[palier];
}
