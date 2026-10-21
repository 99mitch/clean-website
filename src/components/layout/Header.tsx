import Link from 'next/link';
import { ButtonLink } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Icon } from '@/components/ui/Icon';
import { site, telAffiche, telHref } from '@/config/site';
import { nav } from '@/copy/common';
import { Logo } from './Logo';
import { NavAutoClose } from './NavAutoClose';
import { NavLink } from './NavLink';

/**
 * Bandeau de tête — sticky, compacté après 120px de scroll (§6).
 * Liens à plat, une page par titre : pas de menu déroulant. La page courante
 * est signalée par `aria-current` (voir NavLink).
 */
export function Header() {
  const tel = telHref();
  const numero = telAffiche();

  return (
    <header className="site-header sticky top-0 z-50 border-b border-ink bg-paper/95 py-4 backdrop-blur-sm">
      <Container>
        <div className="flex items-center justify-between gap-6">
          <Link href="/" className="shrink-0" aria-label={`${site.nom}, retour à l’accueil`}>
            <Logo />
          </Link>

          <nav aria-label={nav.primaryLabel} className="hidden lg:block">
            <ul className="flex items-center">
              {nav.liens.map((lien) => (
                // Entre lg et xl, « Accueil » cède sa place au bouton d'appel : le logo y ramène déjà.
                <li key={lien.href} className={lien.href === '/' ? 'lg:max-xl:hidden' : undefined}>
                  <NavLink
                    href={lien.href}
                    className="flex min-h-11 items-center whitespace-nowrap border-b-2 border-transparent px-3.5 font-mono text-13 uppercase tracking-[0.12em] text-slate hover:text-ink aria-[current]:border-ink aria-[current]:text-ink xl:px-5"
                  >
                    {lien.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3 sm:gap-4">
            {/* Appel direct : icône seule quand la place manque, numéro en clair dès xl. */}
            {tel && numero ? (
              <a
                href={tel}
                data-analytics="tel_click"
                aria-label={nav.appelerLabel(numero)}
                className="inline-flex min-h-11 min-w-11 items-center justify-center gap-2.5 border border-ink px-3 font-mono text-13 font-medium tracking-[0.06em] text-ink transition-colors duration-150 hover:bg-ink hover:text-paper xl:px-4"
              >
                <Icon name="phone" size={17} />
                <span aria-hidden="true" className="hidden whitespace-nowrap sm:inline lg:hidden xl:inline">
                  {numero}
                </span>
              </a>
            ) : null}
            <div className="hidden sm:block">
              <ButtonLink href="/devis" variant="devis" className="whitespace-nowrap">
                {nav.devis}
              </ButtonLink>
            </div>
            <MobileMenu />
          </div>
        </div>
      </Container>

      {/* Referme le menu mobile après un clic — voir NavAutoClose. */}
      <NavAutoClose />
    </header>
  );
}

function MobileMenu() {
  return (
    <details data-nav-menu className="group relative lg:hidden">
      <summary
        className="flex min-h-11 min-w-11 cursor-pointer list-none items-center justify-center rounded-chip border border-ink px-3 [&::-webkit-details-marker]:hidden"
        aria-label={nav.openMenu}
      >
        {/* Trois traits qui se croisent à l'ouverture : l'état se lit sans texte. */}
        <span aria-hidden="true" className="relative block h-3 w-5">
          <span className="absolute left-0 top-0 block h-px w-5 bg-ink transition-transform duration-200 group-open:top-1.5 group-open:rotate-45" />
          <span className="absolute left-0 top-1.5 block h-px w-5 bg-ink transition-opacity duration-150 group-open:opacity-0" />
          <span className="absolute left-0 top-3 block h-px w-5 bg-ink transition-transform duration-200 group-open:top-1.5 group-open:-rotate-45" />
        </span>
      </summary>

      <nav
        aria-label={nav.primaryLabel}
        className="absolute right-0 top-[calc(100%+0.75rem)] w-[min(20rem,calc(100vw-3rem))] rounded-card border border-ink bg-white p-4"
      >
        <ul className="list-none">
          {nav.liens.map((lien) => (
            <li key={lien.href} className="border-b rule-hair">
              <NavLink
                href={lien.href}
                className="flex min-h-12 items-center text-17 text-ink aria-[current]:font-semibold aria-[current]:text-cobalt"
              >
                {lien.label}
              </NavLink>
            </li>
          ))}
          <li>
            <Link
              href="/devis"
              className="flex min-h-11 items-center font-mono text-13 uppercase tracking-[0.12em] text-cobalt"
            >
              {nav.devis}
            </Link>
          </li>
        </ul>
      </nav>
    </details>
  );
}
