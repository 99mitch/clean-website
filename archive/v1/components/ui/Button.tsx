import Link from 'next/link';
import type { ComponentProps, ReactNode } from 'react';

type Variant = 'devis' | 'navy' | 'outline' | 'adaptive' | 'ghost';
type Size = 'md' | 'lg';

/**
 * Cibles tactiles ≥ 44×44 px (§10).
 * `devis` est le SEUL usage du bleu accent en aplat (§6) : blanc sur azure
 * = 4,77:1, conforme AA — et il reste identique des deux côtés de l'arête.
 *
 * `adaptive` hérite de la couleur de sa couche : c'est ce qui permet au même
 * balisage de rester lisible sur le fond sombre comme sur la zone traitée,
 * sans dupliquer les classes.
 */
const base =
  'inline-flex items-center justify-center gap-2 rounded font-medium transition-colors duration-150 min-h-11';

const variants: Record<Variant, string> = {
  devis: 'bg-azure text-white hover:bg-[#1559b4]',
  navy: 'bg-navy text-white hover:bg-ink',
  outline:
    'border border-steel/50 text-ink hover:border-navy hover:text-navy bg-transparent',
  adaptive:
    'border border-current/35 text-current hover:border-current bg-transparent',
  ghost: 'text-navy underline underline-offset-4 hover:text-azure',
};

const sizes: Record<Size, string> = {
  md: 'px-5 py-3 text-15',
  lg: 'px-7 py-4 text-17',
};

function classes(variant: Variant, size: Size, className?: string) {
  const sizing = variant === 'ghost' ? 'min-h-11 py-2' : sizes[size];
  return `${base} ${variants[variant]} ${sizing} ${className ?? ''}`.trim();
}

export function ButtonLink({
  href,
  variant = 'navy',
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
  const external = href.startsWith('http') || href.startsWith('tel:');
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
  variant = 'navy',
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
      className={`${classes(variant, size, className)} disabled:cursor-not-allowed disabled:opacity-50`}
      {...rest}
    >
      {children}
    </button>
  );
}
