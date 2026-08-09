import Link from 'next/link';
import { Icon, type IconKey } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';

/** Carte de prestation ou de secteur. Grille stricte, filet 1px, rayon 4px. */
export function EntryCard({
  href,
  title,
  excerpt,
  icon,
  eyebrow,
  delay,
}: {
  href: string;
  title: string;
  excerpt: string;
  icon: IconKey;
  eyebrow?: string;
  delay?: number;
}) {
  return (
    <Reveal as="li" delay={delay} className="h-full">
      <Link
        href={href}
        className="card-surface group flex h-full flex-col rounded border border-steel/30 bg-white p-7 transition-colors duration-150 hover:border-navy"
      >
        <span className="relative flex h-full flex-col">
          <Icon name={icon} size={28} className="text-navy" />
          {eyebrow ? <span className="eyebrow mt-6 block text-slate">{eyebrow}</span> : null}
          <h3 className="mt-4 text-21 group-hover:text-navy">{title}</h3>
          <span className="mt-3 block text-15 text-slate">{excerpt}</span>
          <span
            aria-hidden="true"
            className="mt-auto pt-6 text-navy transition-transform duration-150 group-hover:translate-x-1"
          >
            <Icon name="arrow" size={20} />
          </span>
        </span>
      </Link>
    </Reveal>
  );
}

export function CardGrid({ children }: { children: React.ReactNode }) {
  return (
    <ul className="mt-12 grid list-none gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {children}
    </ul>
  );
}

/** Fil d'Ariane visible — le JSON-LD BreadcrumbList l'accompagne. */
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
                  <span aria-hidden="true">/</span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
