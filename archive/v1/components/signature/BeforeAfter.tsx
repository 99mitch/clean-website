import { BeforeAfterSlider } from './BeforeAfterSlider';

export type Chantier = {
  avant: string;
  apres: string;
  altAvant: string;
  altApres: string;
};

/**
 * Comparateur photographique.
 *
 * Il ne sert pas de solution de repli : il n'apparaît que lorsqu'un chantier
 * réellement photographié est fourni, et disparaît silencieusement sinon —
 * jamais de banque d'images générique (§6). Sans photo, c'est le plan de
 * cadence qui ouvre l'accueil.
 */
export function BeforeAfter({
  chantier,
  priority = false,
}: {
  chantier: Chantier | null;
  priority?: boolean;
}) {
  if (!chantier) return null;
  return <BeforeAfterSlider {...chantier} priority={priority} />;
}
