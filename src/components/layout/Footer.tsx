import Link from 'next/link';
import { BandeauSurface } from '@/components/materiaux/Echantillonnier';
import { Container } from '@/components/ui/Container';
import { PendingData } from '@/components/ui/PendingData';
import { site, telHref } from '@/config/site';
import { footer, nav } from '@/copy/common';
import { Logo } from './Logo';

/** Pied de dossier : dense, monospace, tout en filets. */
export function Footer() {
  const tel = telHref();
  const annee = new Date().getFullYear();

  return (
    <footer className="on-dark bg-abyss pb-24 text-paper sm:pb-0">
      <BandeauSurface mat="beton" />

      <Container className="pb-14 pt-16">
        <div className="grid gap-12 border-t-2 border-paper/80 pt-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
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

          <nav aria-label={nav.footerLabel} className="lg:col-span-8">
            <div className="grid gap-x-10 gap-y-10 sm:grid-cols-3">
              {footer.colonnes.map((colonne) => (
                <div key={colonne.titre}>
                  <h2 className="eyebrow border-b border-paper/25 pb-3 text-paper/50">
                    {colonne.titre}
                  </h2>
                  <ul className="mt-2 list-none">
                    {colonne.links.map((link) => (
                      <li key={link.href} className="border-b border-paper/12">
                        <Link
                          href={link.href}
                          className="flex min-h-11 items-center text-15 text-paper/80 hover:text-paper"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
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
