import type { Metadata } from 'next';
import Link from 'next/link';
import { DevisCTA } from '@/components/cta/DevisCTA';
import { PageHeader } from '@/components/layout/PageHeader';
import { JsonLd } from '@/components/seo/JsonLd';
import { ButtonLink } from '@/components/ui/Button';
import { PendingData } from '@/components/ui/PendingData';
import { Reveal } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';
import { site, telHref } from '@/config/site';
import { referencesPage as copy } from '@/copy/pages';
import { getReferences } from '@/lib/content';
import { breadcrumbLd } from '@/lib/seo/jsonld';
import { pageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = pageMetadata({
  title: copy.meta.title,
  description: copy.meta.description,
  path: '/references',
});

/**
 * Aucune référence n'est publiée sans autorisation écrite (§0, §14).
 * L'état vide est donc un état normal, pas un bug : il est traité comme tel.
 */
export default async function ReferencesPage() {
  const references = await getReferences();
  const tel = telHref();
  const fil = [
    { name: 'Accueil', url: '/' },
    { name: 'Références', url: '/references' },
  ];

  return (
    <>
      <PageHeader
        rubrique="references"
        label={copy.eyebrow}
        titre={copy.titre}
        intro={copy.intro}
        breadcrumbs={fil}
      />

      <Section>
        {references.length === 0 ? (
          <Reveal className="max-w-[60ch]">
            <p className="text-17 text-slate">{copy.vide}</p>
            <div className="mt-8">
              {tel ? (
                <ButtonLink href={tel} variant="outline" size="lg">
                  {site.telephone}
                </ButtonLink>
              ) : (
                <ButtonLink href="/contact" variant="outline" size="lg">
                  {copy.videAction}
                </ButtonLink>
              )}
            </div>
            <PendingData label="LOGOS_CLIENTS / ETUDES_DE_CAS" className="mt-10" />
          </Reveal>
        ) : (
          <ul className="grid list-none gap-6 sm:grid-cols-2">
            {references.map((reference, index) => (
              <Reveal as="li" key={reference.meta.slug} delay={index * 60}>
                <Link
                  href={`/references/${reference.meta.slug}`}
                  className="flex h-full flex-col border-t-2 border-ink bg-white p-7 transition-colors duration-150 hover:bg-mist"
                >
                  <p className="eyebrow text-slate">
                    {reference.meta.client ?? copy.clientAnonyme}
                  </p>
                  <h2 className="mt-4 text-21">{reference.meta.title}</h2>
                  <p className="mt-3 text-15 text-slate">{reference.meta.excerpt}</p>
                </Link>
              </Reveal>
            ))}
          </ul>
        )}
      </Section>

      <DevisCTA />
      <JsonLd data={breadcrumbLd(fil)} />
    </>
  );
}
