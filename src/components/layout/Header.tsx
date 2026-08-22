import Link from 'next/link';
import { ButtonLink } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Icon } from '@/components/ui/Icon';
import { site, telHref } from '@/config/site';
import { nav } from '@/copy/common';
import { Logo } from './Logo';
import { NavAutoClose } from './NavAutoClose';

/**
 * Bandeau de tête — sticky, compacté après 120px de scroll (§6).
 * Liens à plat, une page par titre : pas de menu déroulant.
 */
export function Header() {
  const tel = telHref();

  return (
    <header className="site-header sticky top-0 z-50 border-b border-ink bg-paper/95 py-4 backdrop-blur-sm">
      <Container>
        <div className="flex items-center justify-between gap-6">
          <Link href="/" className="shrink-0" aria-label={`${site.nom} — accueil`}>
            <Logo />
          </Link>

          <nav aria-label={nav.primaryLabel} className="hidden lg:block">
            <ul className="flex items-center">
              {nav.liens.map((lien) => (
                <li key={lien.href}>
                  <Link
                    href={lien.href}
                    className="flex min-h-11 items-center px-4 font-mono text-13 uppercase tracking-[0.12em] text-slate hover:text-ink"
                  >
                    {lien.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-4">
            {tel ? (
              <a
                href={tel}
                data-analytics="tel_click"
                className="hidden min-h-11 items-center gap-2 font-mono text-13 tracking-[0.06em] text-ink hover:text-signal md:inline-flex"
              >
                <Icon name="phone" size={16} />
                {site.telephone}
              </a>
            ) : null}
            <ButtonLink href="/contact" variant="devis" className="hidden sm:inline-flex">
              {nav.contact}
            </ButtonLink>
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
    <details data-nav-menu className="relative lg:hidden">
      <summary
        className="flex min-h-11 min-w-11 cursor-pointer list-none items-center justify-center border border-ink px-3 [&::-webkit-details-marker]:hidden"
        aria-label={nav.openMenu}
      >
        <span aria-hidden="true" className="flex flex-col gap-[5px]">
          <span className="block h-px w-5 bg-ink" />
          <span className="block h-px w-5 bg-ink" />
          <span className="block h-px w-5 bg-ink" />
        </span>
      </summary>

      <nav
        aria-label={nav.primaryLabel}
        className="absolute right-0 top-[calc(100%+0.75rem)] w-[min(20rem,calc(100vw-3rem))] border border-ink bg-white p-4"
      >
        <ul className="list-none">
          {nav.liens.map((lien) => (
            <li key={lien.href} className="border-b rule-hair">
              <Link href={lien.href} className="flex min-h-11 items-center text-17 text-ink">
                {lien.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/contact"
              className="flex min-h-11 items-center font-mono text-13 uppercase tracking-[0.12em] text-cobalt"
            >
              {nav.contact}
            </Link>
          </li>
        </ul>
      </nav>
    </details>
  );
}
