import type { Metadata } from 'next';
import Image from 'next/image';
import { DevisCTA } from '@/components/cta/DevisCTA';
import { PageHeader } from '@/components/layout/PageHeader';
import { JsonLd } from '@/components/seo/JsonLd';
import { Icon } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';
import { secteursIndex } from '@/copy/pages';
import { getSecteurs } from '@/lib/content';
import { materiaux } from '@/lib/materiaux';
import { breadcrumbLd } from '@/lib/seo/jsonld';
import { pageMetadata } from '@/lib/seo/metadata';
import { DEGRADE_BLEU } from '@/lib/ui/degrade';

export const metadata: Metadata = pageMetadata({
  title: secteursIndex.meta.title,
  description: secteursIndex.meta.description,
  path: '/secteurs',
  keywords: ['nettoyage par secteur', 'propreté bureaux', 'nettoyage industriel', 'bionettoyage'],
});

/** Revêtement de l'échantillonnier associé à chaque secteur. */
const PLAQUE_PAR_SECTEUR: Record<string, string> = {
  bureaux: 'moquette',
  medical: 'resine',
  industrie: 'beton',
  'immeubles-coproprietes': 'carrelage',
  'infrastructures-publiques': 'terrazzo',
};

/** Photo associée à un secteur, quand elle est disponible (sinon plaque d'échantillon). */
const PHOTO_PAR_SECTEUR: Record<string, { src: string; alt: string }> = {
  bureaux: {
    src: '/images/secteurs/bureaux.png',
    alt: 'Collaboratrice travaillant à son poste dans un bureau ouvert',
  },
  medical: {
    src: '/images/secteurs/medical.png',
    alt: 'Personnel de laboratoire en blouse examinant un prélèvement',
  },
  industrie: {
    src: '/images/secteurs/industrie.png',
    alt: 'Caristes manipulant des palettes dans un entrepôt logistique',
  },
  'immeubles-coproprietes': {
    src: '/images/secteurs/immeubles-coproprietes.png',
    alt: 'Façades d’immeubles haussmanniens en copropriété',
  },
  'infrastructures-publiques': {
    src: '/images/secteurs/infrastructures-publiques.png',
    alt: 'Cour intérieure d’un établissement recevant du public',
  },
};

export default async function SecteursPage() {
  const secteurs = await getSecteurs();
  const nomMateriau = new Map(materiaux.map((materiau) => [materiau.mat, materiau.nom]));
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
        centre
        breadcrumbs={fil}
      />

      <Section>
        <div className="flex flex-col gap-6">
          {secteurs.map((secteur, index) => {
            const inversee = index % 2 === 1;
            const mat = PLAQUE_PAR_SECTEUR[secteur.meta.slug] ?? materiaux[0].mat;
            const degrade = DEGRADE_BLEU[index] ?? DEGRADE_BLEU[3];
            const photo = PHOTO_PAR_SECTEUR[secteur.meta.slug];
            const bordures = inversee
              ? 'border-b lg:order-2 lg:border-b-0 lg:border-l'
              : 'border-b lg:border-b-0 lg:border-r';

            return (
              <Reveal
                as="article"
                key={secteur.meta.slug}
                delay={index * 60}
                direction={inversee ? 'right' : 'left'}
                className="grid overflow-hidden border border-ink lg:grid-cols-2"
              >
                {photo ? (
                  <div
                    className={`relative min-h-[16rem] border-ink lg:min-h-[26rem] ${bordures}`}
                  >
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div
                    className={`sample-plate relative flex min-h-[16rem] flex-col justify-between border-ink p-10 sm:p-12 lg:min-h-[26rem] ${bordures}`}
                  >
                    <span className="sample absolute inset-0" data-mat={mat} aria-hidden="true" />

                    <div className="relative z-10 flex items-start justify-between">
                      <Icon name={secteur.meta.icon} size={28} className="text-ink" />
                      <span className="font-mono text-13 text-slate">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>

                    <span className="relative z-10 font-mono text-13 uppercase tracking-[0.14em] text-ink">
                      {nomMateriau.get(mat)}
                    </span>
                  </div>
                )}

                <div className={`flex flex-col justify-center gap-5 p-8 sm:p-12 ${degrade}`}>
                  <h2 className="text-28 tracking-[-0.04em] lg:text-40">{secteur.meta.title}</h2>
                  <p className="measure text-15 opacity-80 lg:text-17">{secteur.meta.excerpt}</p>

                  <ul className="mt-1 flex list-none flex-col gap-2 border-t border-current/15 pt-4">
                    {secteur.meta.enjeux.slice(0, 4).map((enjeu) => (
                      <li key={enjeu} className="measure text-15 opacity-90">
                        {enjeu}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Section>

      <DevisCTA />
      <JsonLd data={breadcrumbLd(fil)} />
    </>
  );
}
