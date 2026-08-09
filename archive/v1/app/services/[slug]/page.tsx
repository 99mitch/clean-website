import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CardGrid, EntryCard } from '@/components/content/Cards';
import { Mdx } from '@/components/content/Mdx';
import { DevisCTA } from '@/components/cta/DevisCTA';
import { PageHeader } from '@/components/layout/PageHeader';
import { JsonLd } from '@/components/seo/JsonLd';
import { Icon } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';
import { Section, SectionHeader } from '@/components/ui/Section';
import { servicePage } from '@/copy/pages';
import { getService, getServices, secteursForService } from '@/lib/content';
import { breadcrumbLd, serviceLd } from '@/lib/seo/jsonld';
import { pageMetadata } from '@/lib/seo/metadata';

type Params = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const services = await getServices();
  return services.map((service) => ({ slug: service.meta.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const service = await getService(slug);
  if (!service) return {};

  return pageMetadata({
    title: service.meta.seo.title,
    description: service.meta.seo.description ?? service.meta.excerpt,
    path: `/services/${slug}`,
    keywords: service.meta.seo.keywords,
  });
}

export default async function ServicePage({ params }: Params) {
  const { slug } = await params;
  const service = await getService(slug);
  if (!service) notFound();

  const secteurs = await secteursForService(slug);
  const { meta } = service;

  const fil = [
    { name: 'Accueil', url: '/' },
    { name: 'Prestations', url: '/services' },
    { name: meta.title, url: `/services/${slug}` },
  ];

  return (
    <>
      <PageHeader
        eyebrow={servicePage.eyebrow}
        titre={meta.title}
        intro={meta.excerpt}
        breadcrumbs={fil}
      />

      <Section>
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Mdx source={service.body} />
          </div>

          <aside className="lg:col-span-5">
            <Reveal className="rounded border border-steel/30 p-7">
              <Icon name={meta.icon} size={28} className="text-navy" />
              <h2 className="mt-6 text-21">{servicePage.prestationsTitre}</h2>
              <ul className="mt-5 space-y-3">
                {meta.prestations.map((prestation) => (
                  <li
                    key={prestation}
                    className="relative pl-6 text-15 text-slate before:absolute before:left-0 before:top-[0.7em] before:h-px before:w-3 before:bg-steel"
                  >
                    {prestation}
                  </li>
                ))}
              </ul>

              <h2 className="mt-10 text-21">{servicePage.frequencesTitre}</h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {meta.frequences.map((frequence) => (
                  <li
                    key={frequence}
                    className="rounded border border-steel/40 px-3 py-1 font-mono text-13 text-slate"
                  >
                    {servicePage.frequenceLabels[frequence] ?? frequence}
                  </li>
                ))}
              </ul>
            </Reveal>
          </aside>
        </div>
      </Section>

      {secteurs.length > 0 ? (
        <Section labelledBy="secteurs-service">
          <SectionHeader
            id="secteurs-service"
            title={servicePage.secteursTitre}
          />
          <CardGrid>
            {secteurs.map((secteur, index) => (
              <EntryCard
                key={secteur.meta.slug}
                href={`/secteurs/${secteur.meta.slug}`}
                title={secteur.meta.title}
                excerpt={secteur.meta.excerpt}
                icon={secteur.meta.icon}
                delay={index * 60}
              />
            ))}
          </CardGrid>
        </Section>
      ) : null}

      <DevisCTA service={meta.devisPrestation ?? meta.slug} />

      <JsonLd
        data={serviceLd({
          name: meta.title,
          description: meta.excerpt,
          url: `/services/${slug}`,
        })}
      />
      <JsonLd data={breadcrumbLd(fil)} />
    </>
  );
}
