import type { Metadata } from 'next';
import { LegalSections } from '@/components/content/LegalSections';
import { PageHeader } from '@/components/layout/PageHeader';
import { Section } from '@/components/ui/Section';
import { accessibilitePage } from '@/copy/pages';
import { accessibilite } from '@/copy/legal';
import { pageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = pageMetadata({
  title: accessibilitePage.meta.title,
  description: accessibilitePage.meta.description,
  path: '/accessibilite',
});

export default function AccessibilitePage() {
  return (
    <>
      <PageHeader
        eyebrow={accessibilitePage.eyebrow}
        titre={accessibilitePage.titre}
        intro={accessibilite.intro}
        breadcrumbs={[
          { name: 'Accueil', url: '/' },
          { name: 'Accessibilité', url: '/accessibilite' },
        ]}
      />
      <Section>
        <LegalSections blocs={accessibilite.blocs} />
      </Section>
    </>
  );
}
