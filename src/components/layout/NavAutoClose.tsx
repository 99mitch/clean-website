'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

/**
 * Referme les menus de navigation après un clic sur une de leurs entrées.
 *
 * Les menus sont des <details> natifs, sans JavaScript (§8). Mais la
 * navigation Next est côté client : le DOM du header n'est pas recréé, donc
 * l'attribut `open` survit au changement de page et le menu reste déployé.
 * Aucune règle CSS ne peut retirer cet attribut — c'est le seul endroit du
 * site où un peu de JavaScript client est nécessaire.
 *
 * Deux déclencheurs, parce qu'un seul ne suffit pas :
 *   — le changement de route, qui couvre la navigation normale ;
 *   — le clic sur un lien, qui couvre le cas d'un lien vers la page courante,
 *     où le chemin ne change pas et où l'effet ne se rejouerait donc jamais.
 */
export function NavAutoClose() {
  const pathname = usePathname();

  useEffect(() => {
    fermerLesMenus();
  }, [pathname]);

  useEffect(() => {
    function onClick(event: MouseEvent) {
      const cible = event.target as Element | null;
      if (cible?.closest('[data-nav-menu] a')) fermerLesMenus();
    }

    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  return null;
}

function fermerLesMenus() {
  const menus =
    document.querySelectorAll<HTMLDetailsElement>('[data-nav-menu][open]');
  for (const menu of menus) menu.open = false;
}
