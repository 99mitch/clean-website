import { materiaux } from '@/lib/materiaux';
import { home } from '@/copy/home';

/**
 * L'ÉCHANTILLONNIER — pièce maîtresse du hero.
 *
 * Douze plaques de revêtement, générées en dégradés CSS. Chaque plaque porte
 * son nom et le protocole appliqué. Au survol, la trame se retire : la
 * surface est traitée.
 *
 * C'est le seul moment orchestré du site — les plaques se posent en cascade
 * au chargement, une fois, puis plus rien ne bouge. `prefers-reduced-motion`
 * annule la pose.
 */
export function Echantillonnier() {
  const copy = home.echantillonnier;

  return (
    <figure className="m-0">
      <div className="rule-head flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 pt-3">
        <h2 className="eyebrow text-ink">{copy.titre}</h2>
        <p className="font-mono text-13 text-slate">{copy.compte(materiaux.length)}</p>
      </div>

      <ul className="mt-5 grid list-none grid-cols-3 gap-px bg-graphite/40 sm:grid-cols-4">
        {materiaux.map((materiau, index) => (
          <li
            key={materiau.mat}
            className="sample-plate plate-in group bg-paper p-3"
            style={{ animationDelay: `${120 + index * 45}ms` }}
          >
            <span
              className="sample aspect-square w-full"
              data-mat={materiau.mat}
              aria-hidden="true"
            />
            <span className="mt-3 block text-15 leading-tight font-medium text-ink">
              {materiau.nom}
            </span>
            <span className="mt-1 block font-mono text-13 text-slate">
              {materiau.protocole}
            </span>
          </li>
        ))}
      </ul>

      <figcaption className="mt-5 max-w-[54ch] text-15 text-slate">
        {copy.note}
      </figcaption>
    </figure>
  );
}

/**
 * Bandeau de trame en tête de rubrique : 8px de revêtement, qui donne à
 * chaque section du site une identité matérielle sans un pixel d'image.
 */
export function BandeauSurface({ mat }: { mat: string }) {
  return (
    <div className="sample surface-strip w-full" data-mat={mat} aria-hidden="true" />
  );
}
