import type { SVGProps } from 'react';

/**
 * Set d'icônes maison (§5 : `icon` du frontmatter). Vocabulaire visuel du
 * métier — surfaces, états, protocoles, cadence. Traits droits, angles vifs,
 * aucune goutte d'eau ni bulle de savon.
 */
export const iconKeys = [
  'recurring',
  'restore',
  'floor',
  'glass',
  'pest',
  'biocleaning',
  'associated',
  'arrow',
  'phone',
  'mail',
  'check',
  'pin',
] as const;

export type IconKey = (typeof iconKeys)[number];

const paths: Record<IconKey, React.ReactNode> = {
  // Cadence : quatre passages réguliers sur une même surface.
  recurring: (
    <>
      <path d="M3 5h18M3 11h18M3 17h18" />
      <path d="M7 2v6M13 8v6M19 14v6" />
    </>
  ),
  // Remise en état : une surface dégradée redevient pleine.
  restore: (
    <>
      <path d="M3 4h18v16H3z" />
      <path d="M3 14h18" />
      <path d="M6 17h4M13 17h5" />
      <path d="M6 7h5" />
    </>
  ),
  // Traitement des sols : couches successives (décapage, émulsion, lustrage).
  floor: (
    <>
      <path d="M2 8l10-5 10 5-10 5z" />
      <path d="M2 13l10 5 10-5" />
      <path d="M2 18l10 4" />
    </>
  ),
  // Vitrerie : vitrage et sa traverse.
  glass: (
    <>
      <path d="M4 3h16v18H4z" />
      <path d="M12 3v18M4 10h16" />
      <path d="M15 14l3 3" />
    </>
  ),
  // Hygiène 3D : périmètre traité, foyer encerclé.
  pest: (
    <>
      <path d="M3 3h18v18H3z" />
      <path d="M12 8v8M8 12h8" />
      <path d="M7 7l2 2M17 7l-2 2M7 17l2-2M17 17l-2-2" />
    </>
  ),
  // Bio-nettoyage : protocole en zones successives, du propre au souillé.
  biocleaning: (
    <>
      <path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6z" />
      <path d="M9 12l2 2 4-4" />
    </>
  ),
  // Services associés : modules ajoutés au contrat de base.
  associated: (
    <>
      <path d="M3 3h8v8H3zM13 3h8v8h-8zM3 13h8v8H3z" />
      <path d="M17 13v8M13 17h8" />
    </>
  ),
  arrow: <path d="M4 12h15M13 6l6 6-6 6" />,
  phone: (
    <>
      <path d="M7 3h4l2 5-2.5 1.5a11 11 0 005 5L17 12l5 2v4a2 2 0 01-2 2A16 16 0 013 5a2 2 0 012-2z" />
    </>
  ),
  mail: (
    <>
      <path d="M3 5h18v14H3z" />
      <path d="M3 6l9 7 9-7" />
    </>
  ),
  check: <path d="M4 12l5 5L20 6" />,
  pin: (
    <>
      <path d="M12 22s7-6.4 7-12a7 7 0 10-14 0c0 5.6 7 12 7 12z" />
      <path d="M12 8v4h3" />
    </>
  ),
};

export function Icon({
  name,
  size = 24,
  className = '',
  ...rest
}: {
  name: IconKey;
  size?: number;
} & SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="square"
      strokeLinejoin="miter"
      aria-hidden="true"
      focusable="false"
      className={className}
      {...rest}
    >
      {paths[name]}
    </svg>
  );
}

export function isIconKey(value: string): value is IconKey {
  return (iconKeys as readonly string[]).includes(value);
}
