import type { Metadata } from 'next';
import Image from 'next/image';
import { DevisCTA } from '@/components/cta/DevisCTA';
import { PageHeader } from '@/components/layout/PageHeader';
import { JsonLd } from '@/components/seo/JsonLd';
import { Reveal } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';
import { servicesIndex } from '@/copy/pages';
import { getServices } from '@/lib/content';
import { breadcrumbLd } from '@/lib/seo/jsonld';
import { pageMetadata } from '@/lib/seo/metadata';
import { DEGRADE_BLEU } from '@/lib/ui/degrade';

export const metadata: Metadata = pageMetadata({
  title: servicesIndex.meta.title,
  description: servicesIndex.meta.description,
  path: '/services',
  keywords: ['prestations nettoyage', 'entreprise de propreté', 'nettoyage professionnel'],
});

/**
 * Écartée de l'index : `{{CONFIRMER LA LISTE RÉELLE}}` (§4 CLAUDE.md) — la
 * fiche reste accessible en direct, elle n'apparaît juste plus ici.
 */
const EXCLUE_DE_L_INDEX = 'traitement-des-sols';

/** Photo associée à chaque prestation restante. */
const PHOTO_PAR_SERVICE: Record<string, { src: string; alt: string }> = {
  'entretien-regulier': {
    src: '/images/services/entretien-regulier.png',
    alt: 'Agents de propreté lavant les sols d’un hall d’immeuble tertiaire',
  },
  'remise-en-etat': {
    src: '/images/services/remise-en-etat.png',
    alt: 'Agent effectuant une injection-extraction de moquette après travaux',
  },
  vitrerie: {
    src: '/images/services/vitrerie.png',
    alt: 'Agent nettoyant une vitre extérieure à la raclette',
  },
  'services-associes': {
    src: '/images/services/services-associes.png',
    alt: 'Agent balayant des gravats sur un chantier en fin de travaux',
  },
};

export default async function ServicesPage() {
  const services = (await getServices()).filter(
    (service) => service.meta.slug !== EXCLUE_DE_L_INDEX,
  );

  return (
    <>
      <PageHeader
        rubrique="services"
        label={servicesIndex.eyebrow}
        titre={servicesIndex.titre}
        intro={servicesIndex.intro}
        centre
        breadcrumbs={[
          { name: 'Accueil', url: '/' },
          { name: 'Prestations', url: '/services' },
        ]}
      />

      <Section>
        <div className="flex flex-col gap-6">
          {services.map((service, index) => {
            const inversee = index % 2 === 1;
            const photo = PHOTO_PAR_SERVICE[service.meta.slug];
            const degrade = DEGRADE_BLEU[index] ?? DEGRADE_BLEU[3];

            return (
              <Reveal
                as="article"
                key={service.meta.slug}
                delay={index * 60}
                className="grid overflow-hidden rounded-card border border-ink lg:grid-cols-2"
              >
                <div
                  className={`relative min-h-[16rem] border-ink lg:min-h-[26rem] ${
                    inversee
                      ? 'border-b lg:order-2 lg:border-b-0 lg:border-l'
                      : 'border-b lg:border-b-0 lg:border-r'
                  }`}
                >
                  {photo ? (
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="object-cover"
                    />
                  ) : null}
                </div>

                <div className={`flex flex-col justify-center gap-5 p-8 sm:p-12 ${degrade}`}>
                  <h2 className="text-28 tracking-[-0.04em] lg:text-40">{service.meta.title}</h2>
                  <p className="measure text-15 opacity-80 lg:text-17">{service.meta.excerpt}</p>

                  <ul className="mt-1 flex list-none flex-col gap-2 border-t border-current/15 pt-4">
                    {service.meta.prestations.slice(0, 4).map((prestation) => (
                      <li key={prestation} className="measure text-15 opacity-90">
                        {prestation}
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

      <JsonLd
        data={breadcrumbLd([
          { name: 'Accueil', url: '/' },
          { name: 'Prestations', url: '/services' },
        ])}
      />
    </>
  );
}
