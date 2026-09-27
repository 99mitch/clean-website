import type { Metadata } from 'next';
import Image from 'next/image';
import { Mdx } from '@/components/content/Mdx';
import { DevisCTA } from '@/components/cta/DevisCTA';
import { PageHeader } from '@/components/layout/PageHeader';
import { JsonLd } from '@/components/seo/JsonLd';
import { Reveal } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';
import { servicesIndex } from '@/copy/pages';
import { getServices } from '@/lib/content';
import { PHOTO_PAR_SERVICE } from '@/lib/photos';
import { breadcrumbLd } from '@/lib/seo/jsonld';
import { pageMetadata } from '@/lib/seo/metadata';
import { DEGRADE_BLEU } from '@/lib/ui/degrade';

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
                className={`grid overflow-hidden rounded-card border border-ink lg:grid-cols-2 ${degrade}`}
              >
                {/*
                  Photo encadrée à sa taille d'origine (≈ 550 px) plutôt
                  qu'étirée sur toute la hauteur du bloc : les sources sont
                  petites, les agrandir les rend floues.
                */}
                <div
                  className={`flex items-center p-5 pb-0 sm:p-8 sm:pb-0 lg:p-10 ${
                    inversee ? 'lg:order-2 lg:pl-0' : 'lg:pr-0'
                  }`}
                >
                  {photo ? (
                    <div className="relative mx-auto aspect-[3/2] w-full max-w-[34rem] overflow-hidden rounded-chip border border-ink/20">
                      <Image
                        src={photo.src}
                        alt={photo.alt}
                        fill
                        quality={90}
                        sizes="(min-width: 1024px) 544px, calc(100vw - 64px)"
                        className="object-cover"
                      />
                    </div>
                  ) : null}
                </div>

                <div className="flex flex-col justify-center gap-5 p-8 sm:p-12">
                  <h2 className="text-28 tracking-[-0.04em] lg:text-40">{service.meta.title}</h2>
                  <div className="border-t border-current/15">
                    <Mdx source={service.body} tone="inherit" />
                  </div>
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
