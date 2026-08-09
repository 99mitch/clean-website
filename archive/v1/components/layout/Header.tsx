import Link from 'next/link';
import { ButtonLink } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Icon } from '@/components/ui/Icon';
import { site, telHref } from '@/config/site';
import { nav } from '@/copy/common';
import { getSecteurs, getServices } from '@/lib/content';
import { Logo } from './Logo';

type MenuLink = { href: string; label: string };
type Groupe = {
  label: string;
  href: string;
  aide: string;
  links: MenuLink[];
};

/**
 * Header sticky, compacté après 120px de scroll (§6).
 *
 * Sept liens à plat rendaient la barre illisible et noyaient le CTA devis,
 * seul KPI du site. Ils sont regroupés en trois entrées, dont deux sont
 * alimentées par le contenu MDX : ajouter une prestation la fait apparaître
 * au menu sans intervention.
 *
 * Les menus sont des <details> exclusifs (`name="nav"`) : ouverture au clic,
 * pilotables au clavier, refermés dès qu'un autre s'ouvre. Aucun JavaScript
 * client (§8) — et, contrairement à un menu au survol, le contenu affiché
 * reste refermable par l'utilisateur.
 */
export async function Header() {
  const [services, secteurs] = await Promise.all([getServices(), getSecteurs()]);
  const tel = telHref();

  const groupes: Groupe[] = [
    {
      ...nav.groupes.services,
      links: services.map((service) => ({
        href: `/services/${service.meta.slug}`,
        label: service.meta.title,
      })),
    },
    {
      ...nav.groupes.secteurs,
      links: secteurs.map((secteur) => ({
        href: `/secteurs/${secteur.meta.slug}`,
        label: secteur.meta.title,
      })),
    },
    nav.groupes.entreprise,
  ];

  return (
    <header className="site-header sticky top-0 z-50 border-b border-steel/25 bg-white/95 py-5 backdrop-blur-sm">
      <Container>
        <div className="flex items-center justify-between gap-6">
          <Link href="/" className="shrink-0" aria-label={`${site.nom} — accueil`}>
            <Logo />
          </Link>

          <nav aria-label={nav.primaryLabel} className="hidden lg:block">
            <ul className="flex items-center gap-2">
              {groupes.map((groupe) => (
                <li key={groupe.label}>
                  <DesktopMenu groupe={groupe} />
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            {tel ? (
              <a
                href={tel}
                data-analytics="tel_click"
                className="hidden min-h-11 items-center gap-2 px-2 text-15 font-medium text-navy hover:text-azure md:inline-flex"
              >
                <Icon name="phone" size={18} />
                {site.telephone}
              </a>
            ) : null}
            <ButtonLink href="/devis" variant="devis" className="hidden sm:inline-flex">
              {nav.devis}
            </ButtonLink>
            <MobileMenu groupes={groupes} />
          </div>
        </div>
      </Container>
    </header>
  );
}

function DesktopMenu({ groupe }: { groupe: Groupe }) {
  return (
    <details name="nav" className="group relative">
      <summary className="flex min-h-11 cursor-pointer list-none items-center gap-2 rounded-xs px-3 text-15 text-slate hover:text-ink group-open:text-ink [&::-webkit-details-marker]:hidden">
        {groupe.label}
        <span
          aria-hidden="true"
          className="h-px w-3 bg-current transition-transform duration-150 group-open:rotate-90"
        />
      </summary>

      <div className="absolute left-0 top-[calc(100%+1.25rem)] w-[min(26rem,80vw)] rounded border border-steel/30 bg-white p-6 shadow-[0_20px_50px_rgba(10,14,18,0.12)]">
        <p className="text-15 text-slate">{groupe.aide}</p>
        <ul className="mt-5 border-t border-steel/25">
          {groupe.links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="flex min-h-11 items-center border-b border-steel/25 py-2 text-17 text-ink hover:text-navy"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href={groupe.href}
          className="mt-4 inline-flex min-h-11 items-center gap-2 font-mono text-13 uppercase tracking-[0.08em] text-navy hover:text-azure"
        >
          {nav.voirTout}
          <Icon name="arrow" size={16} />
        </Link>
      </div>
    </details>
  );
}

function MobileMenu({ groupes }: { groupes: Groupe[] }) {
  return (
    <details className="relative lg:hidden">
      <summary
        className="flex min-h-11 min-w-11 cursor-pointer list-none items-center justify-center rounded-xs border border-steel/40 px-3 [&::-webkit-details-marker]:hidden"
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
        className="absolute right-0 top-[calc(100%+0.75rem)] max-h-[70vh] w-[min(22rem,calc(100vw-3rem))] overflow-y-auto rounded border border-steel/30 bg-white p-4 shadow-[0_20px_50px_rgba(10,14,18,0.18)]"
      >
        <ul className="space-y-1">
          {groupes.map((groupe) => (
            <li key={groupe.label}>
              <details name="nav-mobile" className="group">
                <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-3 border-b border-steel/25 text-17 font-medium text-ink [&::-webkit-details-marker]:hidden">
                  {groupe.label}
                  <span
                    aria-hidden="true"
                    className="h-px w-3 bg-current transition-transform duration-150 group-open:rotate-90"
                  />
                </summary>
                <ul className="pb-3 pl-3">
                  {groupe.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="flex min-h-11 items-center text-15 text-slate hover:text-ink"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                  <li>
                    <Link
                      href={groupe.href}
                      className="flex min-h-11 items-center font-mono text-13 uppercase tracking-[0.08em] text-navy"
                    >
                      {nav.voirTout}
                    </Link>
                  </li>
                </ul>
              </details>
            </li>
          ))}
        </ul>
      </nav>
    </details>
  );
}
