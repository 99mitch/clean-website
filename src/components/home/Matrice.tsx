'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
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
 *
 * Les bandes se remplissent une fois, à l'arrivée sur la section — déclenché
 * par IntersectionObserver, pas par la position de scroll : la durée du
 * remplissage reste constante quelle que soit la vitesse de défilement.
 */
export function Matrice({
  services,
  secteurs,
}: {
  services: Entry<Service>[];
  secteurs: Entry<Secteur>[];
}) {
  const copy = home.matrice;
  const rootRef = useRef<HTMLDivElement>(null);
  const [rempli, setRempli] = useState(false);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRempli(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={rootRef} className="mt-12 overflow-x-auto">
      <table className="w-full min-w-[52rem] border-collapse text-left">
        <caption className="sr-only">{copy.resume}</caption>

        <thead>
          <tr>
            <th
              scope="col"
              className="w-[22%] border-b-2 border-b-ink border-r border-r-graphite/45 pb-3 pr-4 align-bottom"
            >
              <span className="eyebrow text-cobalt">{copy.colonneSecteur}</span>
            </th>
            {services.map((service) => (
              <th
                key={service.meta.slug}
                scope="col"
                className="border-b-2 border-ink px-2 pb-3 align-bottom"
              >
                <Link
                  href={`/services/${service.meta.slug}`}
                  className="block font-mono text-13 leading-tight text-cobalt hover:text-ink"
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
              <tr key={secteur.meta.slug} className="border-b rule-hair">
                <th
                  scope="row"
                  className="border-r border-r-graphite/45 py-5 pr-4 align-middle font-normal"
                >
                  <Link
                    href={`/secteurs/${secteur.meta.slug}`}
                    className="text-17 font-semibold tracking-[-0.02em] text-cobalt lg:text-21"
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
                            ? `band-fill block h-6 w-full rounded-sm bg-cobalt ${rempli ? 'is-filled' : ''}`
                            : 'block h-6 w-full rounded-sm border border-graphite/45 bg-transparent'
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
