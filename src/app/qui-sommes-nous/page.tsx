import type { Metadata } from 'next';
import { DevisCTA } from '@/components/cta/DevisCTA';
import { PageHeader } from '@/components/layout/PageHeader';
import { JsonLd } from '@/components/seo/JsonLd';
import { PendingData } from '@/components/ui/PendingData';
import { PlaceholderImage } from '@/components/ui/PlaceholderImage';
import { Reveal } from '@/components/ui/Reveal';
import { Section, SectionHead } from '@/components/ui/Section';
import { quiSommesNous as copy } from '@/copy/pages';
import { getEquipe } from '@/lib/content';
import { breadcrumbLd } from '@/lib/seo/jsonld';
import { pageMetadata } from '@/lib/seo/metadata';
import { DEGRADE_BLEU } from '@/lib/ui/degrade';

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
        <Reveal>
          <p className="measure text-21 text-ink">{copy.presentation}</p>
        </Reveal>

        <PlaceholderImage
          label={copy.photo}
          className="mt-14 aspect-[21/9] w-full overflow-hidden rounded-card border border-ink"
        />

        <Reveal className="mt-14 grid gap-8 lg:grid-cols-2 lg:gap-14">
          {copy.histoire.map((paragraphe) => (
            <p key={paragraphe.slice(0, 32)} className="text-17 text-slate">
              {paragraphe}
            </p>
          ))}
        </Reveal>
      </Section>

      <Section tone="white">
        <div className="flex flex-col gap-6">
          {copy.sections.map((section, index) => {
            const inversee = index % 2 === 1;
            const degrade = DEGRADE_BLEU[index] ?? DEGRADE_BLEU[3];

            return (
              <Reveal
                as="article"
                key={section.titre}
                delay={index * 60}
                direction={inversee ? 'right' : 'left'}
                className="grid overflow-hidden rounded-card border border-ink lg:grid-cols-2"
              >
                <PlaceholderImage
                  label={`Photo — ${section.titre}`}
                  className={`min-h-[16rem] border-ink lg:min-h-[22rem] ${
                    inversee
                      ? 'border-b lg:order-2 lg:border-b-0 lg:border-l'
                      : 'border-b lg:border-b-0 lg:border-r'
                  }`}
                />

                <div className={`flex flex-col justify-center gap-4 p-8 sm:p-12 ${degrade}`}>
                  <p className="font-mono text-13 opacity-80">
                    {String(index + 1).padStart(2, '0')}
                  </p>
                  <h2 className="text-28 tracking-[-0.04em]">{section.titre}</h2>
                  <p className="measure text-15 opacity-85 lg:text-17">{section.texte}</p>
                </div>
              </Reveal>
            );
          })}
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
              <Reveal as="li" key={membre.meta.slug} delay={index * 60} className="overflow-hidden rounded-card border border-ink">
                <PlaceholderImage
                  label={`Photo — ${membre.meta.nom}`}
                  className="aspect-square w-full border-b border-ink"
                />
                <div className="bg-white p-7">
                  <h3 className="text-21">{membre.meta.nom}</h3>
                  <p className="mt-1 font-mono text-13 text-slate">{membre.meta.role}</p>
                  {membre.meta.citation ? (
                    <blockquote className="mt-4 border-l-2 border-signal pl-4 text-15 text-slate">
                      {membre.meta.citation}
                    </blockquote>
                  ) : null}
                </div>
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
