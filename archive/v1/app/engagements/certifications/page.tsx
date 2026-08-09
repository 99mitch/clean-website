import type { Metadata } from 'next';
import { DevisCTA } from '@/components/cta/DevisCTA';
import { PageHeader } from '@/components/layout/PageHeader';
import { JsonLd } from '@/components/seo/JsonLd';
import { PendingData } from '@/components/ui/PendingData';
import { Reveal } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';
import { site } from '@/config/site';
import { certificationsPage as copy } from '@/copy/pages';
import { breadcrumbLd } from '@/lib/seo/jsonld';
import { pageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = pageMetadata({
  title: copy.meta.title,
  description: copy.meta.description,
  path: '/engagements/certifications',
});

/**
 * Aucune certification n'est affichée tant qu'elle n'est pas justifiée (§0).
 * La page vide est un choix éditorial assumé, pas un oubli.
 */
export default function CertificationsPage() {
  const fil = [
    { name: 'Accueil', url: '/' },
    { name: 'Engagements', url: '/engagements' },
    { name: 'Certifications', url: '/engagements/certifications' },
  ];

  return (
    <>
      <PageHeader
        eyebrow={copy.eyebrow}
        titre={copy.titre}
        intro={copy.intro}
        breadcrumbs={fil}
      />

      <Section>
        {site.certifications.length === 0 ? (
          <Reveal className="max-w-[60ch]">
            <p className="text-17 text-slate">{copy.vide}</p>
            <PendingData label="CERTIFICATIONS" className="mt-10" />
          </Reveal>
        ) : (
          <ul className="grid list-none gap-6 sm:grid-cols-2">
            {site.certifications.map((certification) => (
              <li
                key={certification.nom}
                className="rounded border border-steel/30 p-7"
              >
                <h2 className="text-21">{certification.nom}</h2>
                <dl className="mt-4 space-y-1 font-mono text-13 text-slate">
                  <div className="flex gap-2">
                    <dt>{copy.organisme}</dt>
                    <dd className="text-ink">{certification.organisme}</dd>
                  </div>
                  <div className="flex gap-2">
                    <dt>{copy.obtenue}</dt>
                    <dd className="text-ink">{certification.obtenue}</dd>
                  </div>
                  {certification.numero ? (
                    <div className="flex gap-2">
                      <dt>{copy.numero}</dt>
                      <dd className="text-ink">{certification.numero}</dd>
                    </div>
                  ) : null}
                </dl>
              </li>
            ))}
          </ul>
        )}
      </Section>

      <DevisCTA />
      <JsonLd data={breadcrumbLd(fil)} />
    </>
  );
}
