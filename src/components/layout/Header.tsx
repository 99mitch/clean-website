import Link from 'next/link';
import { ButtonLink } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Icon } from '@/components/ui/Icon';
import { site, telHref } from '@/config/site';
import { nav } from '@/copy/common';
import { getSecteurs, getServices } from '@/lib/content';
import { materiaux } from '@/lib/materiaux';
import { Logo } from './Logo';
import { NavAutoClose } from './NavAutoClose';

type MenuLink = { href: string; label: string; mat?: string };
type Groupe = { label: string; href: string; aide: string; links: MenuLink[] };

/**
 * Bandeau de tête — sticky, compacté après 120px de scroll (§6).
 *
 * Trois groupes plutôt que sept liens à plat : la barre reste lisible et le
 * bouton devis, seul KPI du site, garde son poids. Les deux premiers groupes
 * sont alimentés par le contenu MDX — ajouter une prestation la fait
 * apparaître au menu sans intervention.
 *
 * Les menus sont des <details> exclusifs (`name="nav"`) : ouverture au clic,
 * refermables, pilotables au clavier. Leur seule dépendance client est
 * `<NavAutoClose />`, qui les referme après un clic — la navigation Next ne
 * recréant pas le DOM du header, l'attribut `open` y survivrait sinon.
 *
 * Chaque entrée de prestation porte sa plaque de revêtement — le menu est
 * lui-même un échantillonnier.
 */
export async function Header() {
  const [services, secteurs] = await Promise.all([getServices(), getSecteurs()]);
  const tel = telHref();

  const groupes: Groupe[] = [
    {
      ...nav.groupes.services,
      links: services.map((service, index) => ({
        href: `/services/${service.meta.slug}`,
        label: service.meta.title,
        mat: materiaux[index % materiaux.length]?.mat,
      })),
    },
    {
      ...nav.groupes.secteurs,
      links: secteurs.map((secteur, index) => ({
        href: `/secteurs/${secteur.meta.slug}`,
        label: secteur.meta.title,
        mat: materiaux[(index + 7) % materiaux.length]?.mat,
      })),
    },
    nav.groupes.entreprise,
  ];

  return (
    <header className="site-header sticky top-0 z-50 border-b border-ink bg-paper/95 py-4 backdrop-blur-sm">
      <Container>
        <div className="flex items-center justify-between gap-6">
          <Link href="/" className="shrink-0" aria-label={`${site.nom} — accueil`}>
            <Logo />
          </Link>

          <nav aria-label={nav.primaryLabel} className="hidden lg:block">
            <ul className="flex items-center">
              {groupes.map((groupe) => (
                <li key={groupe.label}>
                  <DesktopMenu groupe={groupe} />
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
            <ButtonLink href="/devis" variant="devis" className="hidden sm:inline-flex">
              {nav.devis}
            </ButtonLink>
            <MobileMenu groupes={groupes} />
          </div>
        </div>
      </Container>

      {/* Referme les menus après un clic — voir NavAutoClose. */}
      <NavAutoClose />
    </header>
  );
}

function DesktopMenu({ groupe }: { groupe: Groupe }) {
  return (
    <details name="nav" data-nav-menu className="group relative">
      <summary className="flex min-h-11 cursor-pointer list-none items-center gap-2 px-4 font-mono text-13 uppercase tracking-[0.12em] text-slate hover:text-ink group-open:text-ink [&::-webkit-details-marker]:hidden">
        {groupe.label}
        <span
          aria-hidden="true"
          className="block h-px w-3 bg-current transition-transform duration-150 group-open:rotate-90"
        />
      </summary>

      <div className="absolute left-0 top-[calc(100%+1rem)] w-[min(30rem,80vw)] border border-ink bg-white p-7 shadow-[10px_10px_0_rgba(11,22,32,0.08)]">
        <p className="measure text-15 text-slate">{groupe.aide}</p>

        <ul className="mt-6 list-none border-t rule-hair">
          {groupe.links.map((link) => (
            <li key={link.href} className="border-b rule-hair">
              <Link
                href={link.href}
                className="group/link flex min-h-11 items-center gap-4 py-2.5 text-17 text-ink hover:text-signal"
              >
                {link.mat ? (
                  <span
                    aria-hidden="true"
                    className="sample h-6 w-6 shrink-0"
                    data-mat={link.mat}
                  />
                ) : (
                  <span aria-hidden="true" className="h-6 w-6 shrink-0 border rule-hair" />
                )}
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href={groupe.href}
          className="mt-6 inline-flex min-h-11 items-center gap-2 font-mono text-13 uppercase tracking-[0.12em] text-ink hover:text-signal"
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
        className="absolute right-0 top-[calc(100%+0.75rem)] max-h-[70vh] w-[min(23rem,calc(100vw-3rem))] overflow-y-auto border border-ink bg-white p-4"
      >
        <ul className="list-none">
          {groupes.map((groupe) => (
            <li key={groupe.label}>
              <details name="nav-mobile" data-nav-menu className="group">
                <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-3 border-b border-ink font-mono text-13 uppercase tracking-[0.12em] text-ink [&::-webkit-details-marker]:hidden">
                  {groupe.label}
                  <span
                    aria-hidden="true"
                    className="block h-px w-3 bg-current transition-transform duration-150 group-open:rotate-90"
                  />
                </summary>
                <ul className="list-none pb-4 pl-1">
                  {groupe.links.map((link) => (
                    <li key={link.href} className="border-b rule-hair">
                      <Link
                        href={link.href}
                        className="flex min-h-11 items-center text-15 text-ink"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                  <li>
                    <Link
                      href={groupe.href}
                      className="flex min-h-11 items-center font-mono text-13 uppercase tracking-[0.12em] text-slate"
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
