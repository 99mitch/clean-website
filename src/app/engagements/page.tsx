import type { Metadata } from 'next';
import { DevisCTA } from '@/components/cta/DevisCTA';
import { PageHeader } from '@/components/layout/PageHeader';
import { JsonLd } from '@/components/seo/JsonLd';
import { ButtonLink } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';
import { engagementsPage as copy } from '@/copy/pages';
import { breadcrumbLd } from '@/lib/seo/jsonld';
import { pageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = pageMetadata({
  title: copy.meta.title,
  description: copy.meta.description,
  path: '/engagements',
});

export default function EngagementsPage() {
  const fil = [
    { name: 'Accueil', url: '/' },
    { name: 'Engagements', url: '/engagements' },
  ];

  return (
    <>
      <PageHeader
        rubrique="entreprise"
        label={copy.eyebrow}
        titre={copy.titre}
        intro={copy.intro}
        breadcrumbs={fil}
      >
        <div className="mt-9">
          <ButtonLink href="/engagements/certifications" variant="outline">
            {copy.certificationsLien}
          </ButtonLink>
        </div>
      </PageHeader>

      <Section>
        <div className="grid gap-x-6 gap-y-14 lg:grid-cols-3">
          {copy.blocs.map((bloc, index) => (
            <Reveal key={bloc.titre} delay={index * 60}>
              <h2 className="text-21">{bloc.titre}</h2>
              <ul className="mt-6 space-y-4">
                {bloc.points.map((point) => (
                  <li key={point} className="flex gap-3 text-15 text-slate">
                    <Icon
                      name="check"
                      size={18}
                      className="mt-1 shrink-0 text-cobalt"
                    />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </Section>

      <DevisCTA />
      <JsonLd data={breadcrumbLd(fil)} />
    </>
  );
}
