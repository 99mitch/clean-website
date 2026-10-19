import type { Metadata } from 'next';
import { DevisCTA } from '@/components/cta/DevisCTA';
import { PageHeader } from '@/components/layout/PageHeader';
import { JsonLd } from '@/components/seo/JsonLd';
import { PlaceholderImage } from '@/components/ui/PlaceholderImage';
import { PendingData } from '@/components/ui/PendingData';
import { Reveal } from '@/components/ui/Reveal';
import { Section, SectionHead } from '@/components/ui/Section';
import { site } from '@/config/site';
import { quiSommesNous as copy } from '@/copy/pages';
import { breadcrumbLd } from '@/lib/seo/jsonld';
import { pageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = pageMetadata({
  title: copy.meta.title,
  description: copy.meta.description,
  path: '/qui-sommes-nous',
});

/**
 * Page courte, lue d'un trait : titre, slogan, photo, puis le texte en
 * entonnoir — chaque bloc plus étroit que celui du dessus, tout centré.
 */
export default function QuiSommesNousPage() {
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
        entonnoir
      />

      <Section className="pt-6! sm:pt-8! lg:pt-10!">
        <PlaceholderImage
          label={copy.photo}
          className="mx-auto aspect-[16/9] w-full max-w-[48rem] overflow-hidden rounded-card border border-ink"
        />

        <Reveal className="mx-auto mt-12 flex max-w-[92%] flex-col gap-6 text-center text-pretty sm:max-w-[min(28rem,76%)] lg:mt-16">
          <p className="text-17 text-ink">{copy.presentation}</p>
          {copy.histoire.map((paragraphe) => (
            <p key={paragraphe.slice(0, 32)} className="text-15 text-slate lg:text-17">
              {paragraphe}
            </p>
          ))}
        </Reveal>

        <Chiffres />
      </Section>

      <Section tone="white" labelledBy="methode-titre">
        <SectionHead id="methode-titre" title={copy.sectionsTitre} tone="white" />
        <ol className="mt-12 grid list-none gap-x-12 border-t border-ink md:grid-cols-2">
          {copy.sections.map((section, index) => (
            <Reveal
              as="li"
              key={section.titre}
              delay={index * 60}
              className="border-b border-graphite/45 py-8"
            >
              <span className="font-mono text-13 text-slate">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-3 text-21">{section.titre}</h3>
              <p className="mt-3 text-15 text-slate lg:text-17">{section.texte}</p>
            </Reveal>
          ))}
        </ol>
      </Section>

      <DevisCTA />
      <JsonLd data={breadcrumbLd(fil)} />
    </>
  );
}

/**
 * Chiffres clés : uniquement ceux validés dans `site.chiffres` (§0). Aucun
 * n'est renseigné → emplacement en attente en dev, rien en production.
 */
function Chiffres() {
  const unites: Record<string, string> = { tauxSatisfaction: ' %' };
  const entrees = Object.entries(copy.chiffres).flatMap(([cle, label]) => {
    const valeur = site.chiffres[cle as keyof typeof site.chiffres];
    return valeur === null
      ? []
      : [{
          cle,
          label,
          // Une année ne prend pas d'espace de milliers.
          valeur:
            cle === 'anneeCreation'
              ? String(valeur)
              : `${valeur.toLocaleString('fr-FR')}${unites[cle] ?? ''}`,
        }];
  });

  if (entrees.length === 0) {
    return <PendingData label="CHIFFRES CLÉS : année, agents, sites, m², satisfaction" className="mx-auto mt-12 max-w-[48rem]" />;
  }

  return (
    <dl className="mx-auto mt-14 grid max-w-[48rem] grid-cols-2 border-t-2 border-ink sm:grid-cols-3">
      {entrees.map((entree) => (
        <div key={entree.cle} className="border-b border-graphite/45 py-5 pr-4">
          <dt className="eyebrow text-slate">{entree.label}</dt>
          <dd className="mt-2 font-mono text-28 text-ink">{entree.valeur}</dd>
        </div>
      ))}
    </dl>
  );
}
