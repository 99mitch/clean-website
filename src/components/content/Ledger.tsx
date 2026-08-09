import Link from 'next/link';
import type { ReactNode } from 'react';
import { Icon, type IconKey } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';

/**
 * REGISTRE — la forme de liste du site.
 *
 * Pas de cartes : des lignes pleine largeur, séparées par un filet, avec une
 * colonne de données en monospace à droite. C'est ainsi qu'un responsable de
 * site lit un catalogue de prestations — en balayant une colonne, pas en
 * parcourant une mosaïque de vignettes.
 */
export function Ledger({ children }: { children: ReactNode }) {
  return (
    <ul className="mt-12 list-none border-b rule-hair">{children}</ul>
  );
}

export function LedgerEntry({
  href,
  titre,
  excerpt,
  icon,
  meta,
  delay,
}: {
  href: string;
  titre: string;
  excerpt: string;
  icon?: IconKey;
  /** Colonne de droite : mots-clés, fréquences, secteurs — en monospace. */
  meta?: string[];
  delay?: number;
}) {
  return (
    <Reveal as="li" delay={delay} className="ledger-row">
      <Link
        href={href}
        className="grid grid-cols-1 items-baseline gap-x-8 gap-y-4 py-8 pl-5 pr-2 md:grid-cols-12 md:py-9"
      >
        <span className="md:col-span-5 lg:col-span-4">
          <span className="flex items-center gap-3">
            {icon ? <Icon name={icon} size={20} className="text-cobalt" /> : null}
            <span className="text-21 font-semibold tracking-[-0.03em] text-ink lg:text-28">
              {titre}
            </span>
          </span>
        </span>

        <span className="text-15 text-slate md:col-span-5 lg:col-span-5">
          {excerpt}
        </span>

        {meta && meta.length > 0 ? (
          <span className="flex flex-wrap gap-x-4 gap-y-1 font-mono text-13 text-slate md:col-span-2 lg:col-span-2 md:justify-end md:text-right">
            {meta.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </span>
        ) : (
          <span className="hidden md:col-span-2 md:block" />
        )}

        <span
          aria-hidden="true"
          className="hidden justify-self-end text-ink transition-transform duration-150 lg:col-span-1 lg:block"
        >
          <Icon name="arrow" size={20} />
        </span>
      </Link>
    </Reveal>
  );
}

/** Fil d'Ariane — le JSON-LD BreadcrumbList l'accompagne. */
export function Breadcrumbs({
  items,
}: {
  items: Array<{ name: string; url: string }>;
}) {
  return (
    <nav aria-label="Fil d'Ariane">
      <ol className="flex flex-wrap items-center gap-x-2 font-mono text-13 text-slate">
        {items.map((item, index) => {
          const last = index === items.length - 1;
          return (
            <li key={item.url} className="flex items-center gap-2">
              {last ? (
                <span aria-current="page" className="text-ink">
                  {item.name}
                </span>
              ) : (
                <>
                  <Link href={item.url} className="hover:text-ink">
                    {item.name}
                  </Link>
                  <span aria-hidden="true" className="text-graphite">
                    /
                  </span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
