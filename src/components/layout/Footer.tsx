import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Icon } from '@/components/ui/Icon';
import { site, telHref } from '@/config/site';
import { footer, nav } from '@/copy/common';
import { Logo } from './Logo';

/**
 * Pied de page — trois lignes : la marque et les pages, les deux moyens de
 * nous joindre, puis les mentions. Rien d'autre : les horaires et l'adresse
 * sont sur /contact.
 *
 * La vague de tête (SVG statique, modèle Haikei) prend la couleur de la
 * dernière section de la page (`.footer-vague` dans globals.css), pour que la
 * transition reste nette quelle que soit la page.
 */
export function Footer() {
  const tel = telHref();
  const annee = new Date().getFullYear();

  return (
    <footer className="on-dark text-paper">
      <div className="footer-vague">
        <svg
          viewBox="0 0 1440 96"
          preserveAspectRatio="none"
          aria-hidden="true"
          className="block h-10 w-full sm:h-14"
        >
          <path
            fill="var(--color-cobalt)"
            d="M0,32L60,37.3C120,43,240,53,360,58.7C480,64,600,64,720,56C840,48,960,32,1080,29.3C1200,27,1320,37,1380,42.7L1440,48L1440,96L1380,96C1320,96,1200,96,1080,96C960,96,840,96,720,96C600,96,480,96,360,96C240,96,120,96,60,96L0,96Z"
          />
        </svg>
      </div>

      {/* Fond porté par ce bloc et non par <footer> : aucun liseré cobalt au-dessus de la vague. */}
      <div className="-mt-px bg-cobalt pb-[calc(4.5rem+env(safe-area-inset-bottom))] sm:pb-0">
        <Container className="pb-8 pt-6 sm:pt-8">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <Link href="/" className="inline-flex" aria-label={`${site.nom}, retour à l’accueil`}>
                <Logo tone="paper" />
              </Link>
              <p className="mt-3 max-w-[34ch] text-15 text-paper/80">{site.baseline}</p>
            </div>
  
            <nav aria-label={nav.footerLabel}>
              <ul className="grid list-none grid-cols-2 gap-x-8 sm:flex sm:flex-wrap sm:gap-x-7 lg:justify-end">
                {footer.liens.map((lien) => (
                  <li key={lien.href}>
                    <Link
                      href={lien.href}
                      className="inline-flex min-h-11 items-center font-mono text-13 uppercase tracking-[0.12em] text-paper/80 hover:text-paper"
                    >
                      {lien.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
  
          <div className="mt-8 flex flex-col gap-1 border-y border-paper/20 py-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-10">
            {tel ? (
              <a
                href={tel}
                data-analytics="tel_click"
                className="inline-flex min-h-11 items-center gap-3 font-mono text-15 text-paper hover:text-paper/80"
              >
                <Icon name="phone" size={18} />
                {site.telephone}
              </a>
            ) : null}
            {site.emailContact ? (
              <a
                href={`mailto:${site.emailContact}`}
                className="inline-flex min-h-11 items-center gap-3 font-mono text-15 text-paper hover:text-paper/80"
              >
                <Icon name="mail" size={18} />
                {site.emailContact}
              </a>
            ) : null}
            <p className="inline-flex min-h-11 items-center gap-3 text-15 text-paper/80 sm:ml-auto">
              <Icon name="pin" size={18} />
              {footer.zone}
            </p>
          </div>
  
          <div className="mt-4 flex flex-col gap-1 font-mono text-13 text-paper/75 sm:flex-row sm:items-center sm:justify-between">
            <p className="py-3">{footer.copyright(annee, site.nom)}</p>
            <ul className="flex list-none flex-wrap gap-x-6">
              {footer.legal.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="inline-flex min-h-11 items-center hover:text-paper">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </div>
    </footer>
  );
}
