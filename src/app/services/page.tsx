import type { Metadata } from 'next';
import { DevisCTA } from '@/components/cta/DevisCTA';
import { PageHeader } from '@/components/layout/PageHeader';
import { JsonLd } from '@/components/seo/JsonLd';
import { Icon } from '@/components/ui/Icon';
import { ButtonLink } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';
import { servicesIndex } from '@/copy/pages';
import { getServices } from '@/lib/content';
import { materiaux } from '@/lib/materiaux';
import { breadcrumbLd } from '@/lib/seo/jsonld';
import { pageMetadata } from '@/lib/seo/metadata';

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

/** Revêtement de l'échantillonnier associé à chaque prestation restante. */
const PLAQUE_PAR_SERVICE: Record<string, string> = {
  'entretien-regulier': 'moquette',
  'remise-en-etat': 'beton',
  vitrerie: 'vitrage',
  'services-associes': 'resine',
};

export default async function ServicesPage() {
  const services = (await getServices()).filter(
    (service) => service.meta.slug !== EXCLUE_DE_L_INDEX,
  );
  const nomMateriau = new Map(materiaux.map((materiau) => [materiau.mat, materiau.nom]));

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
            const mat = PLAQUE_PAR_SERVICE[service.meta.slug] ?? materiaux[0].mat;

            return (
              <Reveal
                as="article"
                key={service.meta.slug}
                delay={index * 60}
                className="grid overflow-hidden border border-ink lg:grid-cols-2"
              >
                <div
                  className={`sample-plate relative flex min-h-[16rem] flex-col justify-between border-ink p-10 sm:p-12 lg:min-h-[26rem] ${
                    inversee
                      ? 'border-b lg:order-2 lg:border-b-0 lg:border-l'
                      : 'border-b lg:border-b-0 lg:border-r'
                  }`}
                >
                  <span className="sample absolute inset-0" data-mat={mat} aria-hidden="true" />

                  <div className="relative z-10 flex items-start justify-between">
                    <Icon name={service.meta.icon} size={28} className="text-ink" />
                    <span className="font-mono text-13 text-slate">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <span className="relative z-10 font-mono text-13 uppercase tracking-[0.14em] text-ink">
                    {nomMateriau.get(mat)}
                  </span>
                </div>

                <div className="flex flex-col justify-center gap-5 p-8 sm:p-12">
                  <h2 className="text-28 tracking-[-0.04em] lg:text-40">{service.meta.title}</h2>
                  <p className="measure text-15 text-slate lg:text-17">{service.meta.excerpt}</p>

                  <ul className="mt-1 flex list-none flex-col gap-2 border-t border-ink/15 pt-4">
                    {service.meta.prestations.slice(0, 4).map((prestation) => (
                      <li key={prestation} className="measure text-15 text-ink">
                        {prestation}
                      </li>
                    ))}
                  </ul>

                  <ButtonLink
                    href={`/services/${service.meta.slug}`}
                    variant="outline"
                    className="mt-2 self-start"
                  >
                    Voir le détail
                  </ButtonLink>
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
