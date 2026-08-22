import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { PendingData } from '@/components/ui/PendingData';
import { site, telHref } from '@/config/site';
import { footer, nav } from '@/copy/common';
import { Logo } from './Logo';

/**
 * Pied de dossier — compact : les mêmes pages que la navbar, pas un plan de
 * site. La vague en tête du pied de page est un aplat unique, dessiné à la
 * main sur le modèle Haikei (SVG statique, aucune requête réseau).
 */
export function Footer() {
  const tel = telHref();
  const annee = new Date().getFullYear();

  return (
    <footer className="on-dark bg-cobalt pb-24 text-paper sm:pb-0">
      {/*
        Vague de transition — sur le modèle Haikei (SVG statique, sans
        dépendance réseau) : le fond de la bande reprend la couleur de ce qui
        précède habituellement le pied de page (le bandeau <DevisCTA />, en
        abyss), et la vague en aplat cobalt annonce le pied de page.
      */}
      <div className="bg-abyss">
        <svg
          viewBox="0 0 1440 96"
          preserveAspectRatio="none"
          aria-hidden="true"
          className="block h-12 w-full sm:h-16"
        >
          <path
            fill="var(--color-cobalt)"
            d="M0,32L60,37.3C120,43,240,53,360,58.7C480,64,600,64,720,56C840,48,960,32,1080,29.3C1200,27,1320,37,1380,42.7L1440,48L1440,96L1380,96C1320,96,1200,96,1080,96C960,96,840,96,720,96C600,96,480,96,360,96C240,96,120,96,60,96L0,96Z"
          />
        </svg>
      </div>

      <Container className="pb-14 pt-4">
        <div className="grid gap-12 border-t-2 border-paper/80 pt-8 sm:grid-cols-2">
          <div>
            <Logo tone="paper" />
            <p className="mt-5 max-w-[30ch] text-15 text-paper/65">{site.baseline}</p>

            <dl className="mt-10 border-t border-paper/20">
              <div className="border-b border-paper/20 py-3">
                <dt className="eyebrow text-paper/45">{footer.zoneLabel}</dt>
                <dd className="mt-1">
                  {site.zoneIntervention ? (
                    <span className="text-15 text-paper/85">{site.zoneIntervention}</span>
                  ) : (
                    <PendingData label="ZONE_INTERVENTION" />
                  )}
                </dd>
              </div>
              <div className="border-b border-paper/20 py-3">
                <dt className="eyebrow text-paper/45">{footer.contactLabel}</dt>
                <dd className="mt-1 space-y-1">
                  {tel ? (
                    <a
                      href={tel}
                      data-analytics="tel_click"
                      className="block font-mono text-15 text-paper/85 hover:text-paper"
                    >
                      {site.telephone}
                    </a>
                  ) : (
                    <PendingData label="TELEPHONE" />
                  )}
                  {site.emailContact ? (
                    <a
                      href={`mailto:${site.emailContact}`}
                      className="block font-mono text-15 text-paper/85 hover:text-paper"
                    >
                      {site.emailContact}
                    </a>
                  ) : (
                    <PendingData label="EMAIL_CONTACT" />
                  )}
                </dd>
              </div>
            </dl>
          </div>

          <nav aria-label={nav.footerLabel} className="sm:justify-self-end">
            <ul className="list-none">
              {footer.liens.map((lien) => (
                <li key={lien.href} className="border-b border-paper/12">
                  <Link
                    href={lien.href}
                    className="flex min-h-11 items-center text-15 text-paper/80 hover:text-paper"
                  >
                    {lien.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-paper/20 pt-6 font-mono text-13 text-paper/45 sm:flex-row sm:items-center sm:justify-between">
          <p>{footer.copyright(annee, site.nom)}</p>
          <ul className="flex list-none flex-wrap gap-x-6">
            {footer.legal.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="inline-flex min-h-11 items-center hover:text-paper"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
