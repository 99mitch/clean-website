import type { Metadata } from 'next';
import { CardGrid, EntryCard } from '@/components/content/Cards';
import { DevisCTA } from '@/components/cta/DevisCTA';
import { PageHeader } from '@/components/layout/PageHeader';
import { JsonLd } from '@/components/seo/JsonLd';
import { Section } from '@/components/ui/Section';
import { servicesIndex } from '@/copy/pages';
import { getServices } from '@/lib/content';
import { breadcrumbLd } from '@/lib/seo/jsonld';
import { pageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = pageMetadata({
  title: servicesIndex.meta.title,
  description: servicesIndex.meta.description,
  path: '/services',
  keywords: ['prestations nettoyage', 'entreprise de propreté', 'nettoyage professionnel'],
});

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <>
      <PageHeader
        eyebrow={servicesIndex.eyebrow}
        titre={servicesIndex.titre}
        intro={servicesIndex.intro}
        breadcrumbs={[
          { name: 'Accueil', url: '/' },
          { name: 'Prestations', url: '/services' },
        ]}
      />

      <Section>
        <CardGrid>
          {services.map((service, index) => (
            <EntryCard
              key={service.meta.slug}
              href={`/services/${service.meta.slug}`}
              title={service.meta.title}
              excerpt={service.meta.excerpt}
              icon={service.meta.icon}
              delay={index * 60}
            />
          ))}
        </CardGrid>
      </Section>

      <DevisCTA />

      <JsonLd
        data={breadcrumbLd([
          { name: 'Accueil', url: '/' },
          { name: 'Prestations', url: '/services' },
        ])}
      />
    </>
  );
}
