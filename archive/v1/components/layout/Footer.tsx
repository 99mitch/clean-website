import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { PendingData } from '@/components/ui/PendingData';
import { site, telHref } from '@/config/site';
import { footer, nav } from '@/copy/common';
import { Logo } from './Logo';

export function Footer() {
  const tel = telHref();
  const annee = new Date().getFullYear();

  return (
    <footer className="on-dark bg-ink pb-24 pt-20 text-white sm:pb-20">
      <Container>
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <Logo tone="white" />
            <p className="mt-4 max-w-[34ch] text-15 text-white/60">
              {site.baseline}
            </p>

            <div className="mt-8 space-y-4 text-15">
              <div>
                <p className="eyebrow text-white/50">{footer.zoneLabel}</p>
                {site.zoneIntervention ? (
                  <p className="mt-1 text-white/80">{site.zoneIntervention}</p>
                ) : (
                  <PendingData label="ZONE_INTERVENTION" className="mt-2" />
                )}
              </div>

              <div>
                <p className="eyebrow text-white/50">{footer.contactLabel}</p>
                <div className="mt-1 space-y-1">
                  {tel ? (
                    <a
                      href={tel}
                      data-analytics="tel_click"
                      className="block text-white/80 hover:text-white"
                    >
                      {site.telephone}
                    </a>
                  ) : (
                    <PendingData label="TELEPHONE" className="mt-2" />
                  )}
                  {site.emailContact ? (
                    <a
                      href={`mailto:${site.emailContact}`}
                      className="block text-white/80 hover:text-white"
                    >
                      {site.emailContact}
                    </a>
                  ) : (
                    <PendingData label="EMAIL_CONTACT" className="mt-2" />
                  )}
                </div>
              </div>
            </div>
          </div>

          <nav aria-label={nav.footerLabel} className="md:col-span-8">
            <div className="grid gap-10 sm:grid-cols-3">
              {footer.colonnes.map((colonne) => (
                <div key={colonne.titre}>
                  <h2 className="eyebrow text-white/50">{colonne.titre}</h2>
                  <ul className="mt-4 space-y-1">
                    {colonne.links.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="inline-flex min-h-11 items-center text-15 text-white/80 hover:text-white"
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

        <div className="mt-16 flex flex-col gap-4 border-t border-white/15 pt-8 text-13 text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>{footer.copyright(annee, site.nom)}</p>
          <ul className="flex flex-wrap gap-x-6">
            {footer.legal.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="inline-flex min-h-11 items-center hover:text-white"
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
