import Link from 'next/link';
import { home } from '@/copy/home';
import type { Entry } from '@/lib/content';
import type { Secteur, Service } from '@/lib/content/schemas';

/**
 * MATRICE SECTEURS × PRESTATIONS.
 *
 * Le croisement secteur × service est le cœur de la stratégie de contenu
 * (§4) : un immeuble ne cherche pas « nettoyage » mais « entretien de
 * parties communes ». Cette matrice le rend littéral — on lit d'un coup d'œil
 * ce qui s'applique à son type de site, et chaque en-tête est une entrée.
 *
 * Vrai `<table>`, en-têtes de ligne et de colonne déclarés, état de chaque
 * cellule explicité pour les lecteurs d'écran.
 */
export function Matrice({
  services,
  secteurs,
}: {
  services: Entry<Service>[];
  secteurs: Entry<Secteur>[];
}) {
  const copy = home.matrice;

  return (
    <div className="mt-12 overflow-x-auto">
      <table className="w-full min-w-[52rem] border-collapse text-left">
        <caption className="sr-only">{copy.resume}</caption>

        <thead>
          <tr>
            <th scope="col" className="w-[22%] border-b-2 border-ink pb-3 align-bottom">
              <span className="eyebrow text-ink">{copy.colonneSecteur}</span>
            </th>
            {services.map((service) => (
              <th
                key={service.meta.slug}
                scope="col"
                className="border-b-2 border-ink px-2 pb-3 align-bottom"
              >
                <Link
                  href={`/services/${service.meta.slug}`}
                  className="block font-mono text-13 leading-tight text-slate hover:text-ink"
                >
                  {copy.abrev[service.meta.slug] ?? service.meta.title}
                </Link>
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {secteurs.map((secteur) => {
            const proposes = new Set(secteur.meta.services);
            return (
              <tr key={secteur.meta.slug} className="group border-b rule-hair">
                <th scope="row" className="py-5 pr-4 align-middle font-normal">
                  <Link
                    href={`/secteurs/${secteur.meta.slug}`}
                    className="text-17 font-semibold tracking-[-0.02em] text-ink group-hover:text-signal lg:text-21"
                  >
                    {secteur.meta.title}
                  </Link>
                </th>

                {services.map((service) => {
                  const propose = proposes.has(service.meta.slug);
                  return (
                    <td key={service.meta.slug} className="px-2 py-5 align-middle">
                      <span
                        className={
                          propose
                            ? 'block h-6 w-full bg-ink transition-colors duration-150 group-hover:bg-signal'
                            : 'block h-6 w-full border border-graphite/45 bg-transparent'
                        }
                      >
                        <span className="sr-only">
                          {propose ? copy.propose : copy.nonPropose}
                        </span>
                      </span>
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
