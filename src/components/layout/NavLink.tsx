'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

/**
 * Lien de navigation qui se sait actif : `aria-current="page"` sur la page
 * elle-même, `"true"` dans la rubrique (une fiche prestation garde
 * « Prestations » allumé). Le style passe par `aria-[current]:`, sans état
 * visuel porté par la seule couleur.
 */
export function NavLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: ReactNode;
}) {
  const pathname = usePathname();
  const exact = pathname === href;
  const rubrique = href !== '/' && pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      aria-current={exact ? 'page' : rubrique ? 'true' : undefined}
      className={className}
    >
      {children}
    </Link>
  );
}
