import { site } from '@/config/site';

/**
 * Marque typographique. Le carré plein est une plaque d'échantillon ; sa
 * moitié basse porte la trame, sa moitié haute est traitée. Le logo dit donc
 * la même chose que le site.
 */
export function Logo({ tone = 'ink' }: { tone?: 'ink' | 'paper' }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <span
        aria-hidden="true"
        className={`sample block h-5 w-5 ${tone === 'paper' ? 'bg-paper/20' : ''}`}
        data-mat="terrazzo"
      />
      <span
        className={`font-display text-21 font-extrabold tracking-[-0.06em] ${
          tone === 'paper' ? 'text-paper' : 'text-ink'
        }`}
      >
        {site.nom}
      </span>
    </span>
  );
}
