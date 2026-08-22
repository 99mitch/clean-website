import Link from 'next/link';
import type { ComponentProps, ReactNode } from 'react';

type Variant = 'devis' | 'ink' | 'outline' | 'adaptive' | 'ghost';
type Size = 'md' | 'lg';

/**
 * Boutons rectangulaires — le dossier technique n'a pas d'angles arrondis.
 * Libellés en capitales monospace : ce sont des commandes, pas des phrases.
 *
 * `devis` est le SEUL aplat de bleu cobalt du site (§6) : blanc sur cobalt
 * passe largement l'AA. Pas de changement de couleur au survol. Cibles ≥ 44px (§10).
 */
const base =
  'inline-flex min-h-11 items-center justify-center gap-3 font-mono text-13 font-medium uppercase tracking-[0.12em] transition-colors duration-150';

const variants: Record<Variant, string> = {
  devis: 'bg-cobalt text-white',
  ink: 'bg-ink text-paper hover:bg-cobalt',
  outline: 'border border-ink text-ink hover:bg-ink hover:text-paper',
  adaptive: 'border border-current text-current hover:bg-current',
  ghost:
    'border-b border-current pb-1 text-ink hover:text-signal min-h-11 px-0',
};

const sizes: Record<Size, string> = {
  md: 'px-5 py-3',
  lg: 'px-7 py-4',
};

function classes(variant: Variant, size: Size, className?: string) {
  const sizing = variant === 'ghost' ? '' : sizes[size];
  return `${base} ${variants[variant]} ${sizing} ${className ?? ''}`.trim();
}

export function ButtonLink({
  href,
  variant = 'ink',
  size = 'md',
  className,
  children,
  ...rest
}: {
  href: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
} & Omit<ComponentProps<typeof Link>, 'href' | 'className'>) {
  const external = href.startsWith('http') || href.startsWith('tel:') || href.startsWith('mailto:');
  if (external) {
    return (
      <a href={href} className={classes(variant, size, className)}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes(variant, size, className)} {...rest}>
      {children}
    </Link>
  );
}

export function Button({
  variant = 'ink',
  size = 'md',
  className,
  children,
  ...rest
}: {
  variant?: Variant;
  size?: Size;
} & ComponentProps<'button'>) {
  return (
    <button
      className={`${classes(variant, size, className)} disabled:cursor-not-allowed disabled:opacity-45`}
      {...rest}
    >
      {children}
    </button>
  );
}
