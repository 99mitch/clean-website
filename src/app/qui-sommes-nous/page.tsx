import type { Metadata } from 'next';
import { DevisCTA } from '@/components/cta/DevisCTA';
import { PageHeader } from '@/components/layout/PageHeader';
import { JsonLd } from '@/components/seo/JsonLd';
import { PendingData } from '@/components/ui/PendingData';
import { Reveal } from '@/components/ui/Reveal';
import { Section, SectionHead } from '@/components/ui/Section';
import { quiSommesNous as copy } from '@/copy/pages';
import { getEquipe } from '@/lib/content';
import { breadcrumbLd } from '@/lib/seo/jsonld';
import { pageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = pageMetadata({
  title: copy.meta.title,
  description: copy.meta.description,
  path: '/qui-sommes-nous',
});

export default async function QuiSommesNousPage() {
  const equipe = await getEquipe();
  const fil = [
    { name: 'Accueil', url: '/' },
    { name: 'Qui sommes-nous', url: '/qui-sommes-nous' },
  ];

  return (
    <>
      <PageHeader
        rubrique="entreprise"
        label={copy.eyebrow}
        titre={copy.titre}
        intro={copy.intro}
        breadcrumbs={fil}
      />

      <Section>
        <div className="grid gap-x-6 gap-y-14 sm:grid-cols-2">
          {copy.sections.map((section, index) => (
            <Reveal key={section.titre} delay={index * 60}>
              <p className="font-mono text-13 text-signal">
                {String(index + 1).padStart(2, '0')}
              </p>
              <h2 className="mt-4 text-21">{section.titre}</h2>
              <p className="measure mt-3 text-17 text-slate">{section.texte}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="white" labelledBy="equipe-titre">
        <SectionHead
          id="equipe-titre"
          title={copy.equipeTitre}
          intro={copy.equipeIntro}
          tone="white"
        />
        {equipe.length === 0 ? (
          <PendingData label="EQUIPE — photos et fonctions à valider" className="mt-10" />
        ) : (
          <ul className="mt-12 grid list-none gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {equipe.map((membre, index) => (
              <Reveal
                as="li"
                key={membre.meta.slug}
                delay={index * 60}
                className="border-t-2 border-ink bg-white p-7"
              >
                <h3 className="text-21">{membre.meta.nom}</h3>
                <p className="mt-1 font-mono text-13 text-slate">
                  {membre.meta.role}
                </p>
                {membre.meta.citation ? (
                  <blockquote className="mt-4 border-l-2 border-signal pl-4 text-15 text-slate">
                    {membre.meta.citation}
                  </blockquote>
                ) : null}
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
