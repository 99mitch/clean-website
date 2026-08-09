import type { Metadata } from 'next';
import { Ledger, LedgerEntry } from '@/components/content/Ledger';
import { DevisCTA } from '@/components/cta/DevisCTA';
import { PageHeader } from '@/components/layout/PageHeader';
import { JsonLd } from '@/components/seo/JsonLd';
import { Section } from '@/components/ui/Section';
import { secteursIndex } from '@/copy/pages';
import { getSecteurs } from '@/lib/content';
import { breadcrumbLd } from '@/lib/seo/jsonld';
import { pageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = pageMetadata({
  title: secteursIndex.meta.title,
  description: secteursIndex.meta.description,
  path: '/secteurs',
  keywords: ['nettoyage par secteur', 'propreté bureaux', 'nettoyage industriel', 'bionettoyage'],
});

export default async function SecteursPage() {
  const secteurs = await getSecteurs();
  const fil = [
    { name: 'Accueil', url: '/' },
    { name: 'Secteurs', url: '/secteurs' },
  ];

  return (
    <>
      <PageHeader
        rubrique="secteurs"
        label={secteursIndex.eyebrow}
        titre={secteursIndex.titre}
        intro={secteursIndex.intro}
        breadcrumbs={fil}
      />

      <Section>
        <Ledger>
          {secteurs.map((secteur, index) => (
            <LedgerEntry
              key={secteur.meta.slug}
              href={`/secteurs/${secteur.meta.slug}`}
              titre={secteur.meta.title}
              excerpt={secteur.meta.excerpt}
              icon={secteur.meta.icon}
              delay={index * 60}
            />
          ))}
        </Ledger>
      </Section>

      <DevisCTA />
      <JsonLd data={breadcrumbLd(fil)} />
    </>
  );
}
