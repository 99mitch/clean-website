import type { Metadata } from 'next';
import { LegalSections } from '@/components/content/LegalSections';
import { PageHeader } from '@/components/layout/PageHeader';
import { Section } from '@/components/ui/Section';
import { legalPage } from '@/copy/pages';
import { confidentialite } from '@/copy/legal';
import { pageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = pageMetadata({
  title: legalPage.confidentialite.meta.title,
  description: legalPage.confidentialite.meta.description,
  path: '/politique-de-confidentialite',
});

export default function ConfidentialitePage() {
  return (
    <>
      <PageHeader
        rubrique="legal"
        label={legalPage.confidentialite.eyebrow}
        titre={legalPage.confidentialite.titre}
        intro={confidentialite.intro}
        breadcrumbs={[
          { name: 'Accueil', url: '/' },
          { name: 'Confidentialité', url: '/politique-de-confidentialite' },
        ]}
      />
      <Section>
        <LegalSections blocs={confidentialite.blocs} />
      </Section>
    </>
  );
}
