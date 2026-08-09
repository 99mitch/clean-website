import type { Metadata } from 'next';
import { LegalSections } from '@/components/content/LegalSections';
import { PageHeader } from '@/components/layout/PageHeader';
import { Section } from '@/components/ui/Section';
import { legalPage } from '@/copy/pages';
import { mentions } from '@/copy/legal';
import { pageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = pageMetadata({
  title: legalPage.mentions.meta.title,
  description: legalPage.mentions.meta.description,
  path: '/mentions-legales',
});

export default function MentionsLegalesPage() {
  return (
    <>
      <PageHeader
        eyebrow={legalPage.mentions.eyebrow}
        titre={legalPage.mentions.titre}
        breadcrumbs={[
          { name: 'Accueil', url: '/' },
          { name: 'Mentions légales', url: '/mentions-legales' },
        ]}
      />
      <Section>
        <LegalSections blocs={mentions.blocs} />
      </Section>
    </>
  );
}
