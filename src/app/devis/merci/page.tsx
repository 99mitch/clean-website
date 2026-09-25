import type { Metadata } from 'next';
import { ButtonLink } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { site } from '@/config/site';
import { devis as copy } from '@/copy/devis';
import { pageMetadata } from '@/lib/seo/metadata';

/**
 * Page distincte pour rendre la conversion mesurable (§7).
 * Non indexée : elle n'a aucun intérêt en résultat de recherche.
 */
export const metadata: Metadata = pageMetadata({
  title: copy.merci.meta.title,
  description: copy.merci.meta.description,
  path: '/devis/merci',
  noindex: true,
});

export default function MerciPage() {
  const delai = site.delaiReponseHeuresOuvrees;

  return (
    <div className="py-14 sm:py-20 lg:py-28">
      <Container>
        <Reveal className="max-w-[60ch]">
          <p className="eyebrow text-slate">{copy.merci.eyebrow}</p>
          <h1 className="mt-5 text-40 lg:text-64">{copy.merci.titre}</h1>
          <p className="mt-6 text-17 text-slate">{copy.merci.texte}</p>
          {delai ? (
            <p className="mt-4 font-mono text-15 text-ink">
              {copy.merci.delai(delai)}
            </p>
          ) : null}

          <h2 className="mt-14 text-21">{copy.merci.suite}</h2>
          <ol className="mt-6 space-y-4">
            {copy.merci.etapes.map((etape, index) => (
              <li key={etape} className="flex gap-4">
                <span className="font-mono text-13 text-cobalt">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="text-17 text-slate">{etape}</span>
              </li>
            ))}
          </ol>

          <div className="mt-12 grid gap-3 sm:flex sm:flex-wrap">
            <ButtonLink href="/" variant="ink">
              {copy.merci.retour}
            </ButtonLink>
            <ButtonLink href="/blog" variant="outline">
              {copy.merci.lire}
            </ButtonLink>
          </div>
        </Reveal>
      </Container>
    </div>
  );
}
