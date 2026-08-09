import { site } from '@/config/site';

/**
 * Marque typographique. Le carré plein évoque une surface traitée ;
 * la barre bleue accent est la seule signature colorée du logo.
 */
export function Logo({ tone = 'ink' }: { tone?: 'ink' | 'white' }) {
  return (
    <span className="inline-flex items-baseline gap-2">
      <span
        aria-hidden="true"
        className="relative inline-block h-4 w-4 translate-y-px bg-current"
      >
        <span className="absolute inset-x-0 bottom-0 block h-1 bg-azure" />
      </span>
      <span
        className={`font-display text-21 font-bold tracking-[-0.03em] ${
          tone === 'white' ? 'text-white' : 'text-ink'
        }`}
      >
        {site.nom}
      </span>
    </span>
  );
}
