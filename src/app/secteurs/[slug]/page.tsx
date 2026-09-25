import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Ledger, LedgerEntry } from '@/components/content/Ledger';
import { Mdx } from '@/components/content/Mdx';
import { DevisCTA } from '@/components/cta/DevisCTA';
import { PageHeader } from '@/components/layout/PageHeader';
import { JsonLd } from '@/components/seo/JsonLd';
import { Icon } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';
import { Section, SectionHead } from '@/components/ui/Section';
import { secteurPage } from '@/copy/pages';
import { getSecteur, getSecteurs, servicesForSecteur } from '@/lib/content';
import { PHOTO_PAR_SECTEUR } from '@/lib/photos';
import { breadcrumbLd, faqLd, secteurLd } from '@/lib/seo/jsonld';
import { pageMetadata } from '@/lib/seo/metadata';

type Params = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const secteurs = await getSecteurs();
  return secteurs.map((secteur) => ({ slug: secteur.meta.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const secteur = await getSecteur(slug);
  if (!secteur) return {};

  return pageMetadata({
    title: secteur.meta.seo.title,
    description: secteur.meta.seo.description ?? secteur.meta.excerpt,
    path: `/secteurs/${slug}`,
    keywords: secteur.meta.seo.keywords,
  });
}

/**
 * Croisement secteur × services : c'est le cœur de la longue traîne (§4).
 * Un immeuble ne cherche pas « nettoyage » mais « entretien de parties
 * communes » — la page doit donc parler services depuis le point de vue du secteur.
 */
export default async function SecteurPage({ params }: Params) {
  const { slug } = await params;
  const secteur = await getSecteur(slug);
  if (!secteur) notFound();

  const services = await servicesForSecteur(slug);
  const photo = PHOTO_PAR_SECTEUR[slug];
  const { meta } = secteur;

  const fil = [
    { name: 'Accueil', url: '/' },
    { name: 'Secteurs', url: '/secteurs' },
    { name: meta.title, url: `/secteurs/${slug}` },
  ];

  return (
    <>
      <PageHeader
        rubrique="secteurs"
        label={secteurPage.eyebrow}
        titre={meta.title}
        intro={meta.excerpt}
        breadcrumbs={fil}
      />

      <Section>
        {photo ? (
          <div className="relative mb-12 aspect-[4/3] overflow-hidden rounded-card border border-ink sm:aspect-[21/9] lg:mb-16">
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              loading="eager"
              fetchPriority="high"
              sizes="(min-width: 1320px) 1240px, (min-width: 1024px) calc(100vw - 80px), calc(100vw - 48px)"
              className="object-cover"
            />
          </div>
        ) : null}

        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Mdx source={secteur.body} />
          </div>

          <aside className="lg:col-span-5">
            <Reveal className="border-t-2 border-ink pt-6">
              <Icon name={meta.icon} size={28} className="text-cobalt" />
              <h2 className="mt-6 text-21">{secteurPage.enjeuxTitre}</h2>
              <ul className="mt-5 space-y-3">
                {meta.enjeux.map((enjeu) => (
                  <li
                    key={enjeu}
                    className="relative pl-6 text-15 text-slate before:absolute before:left-0 before:top-[0.7em] before:h-px before:w-3 before:bg-graphite"
                  >
                    {enjeu}
                  </li>
                ))}
              </ul>
            </Reveal>
          </aside>
        </div>
      </Section>

      {services.length > 0 ? (
        <Section tone="white" labelledBy="services-secteur">
          <SectionHead
            id="services-secteur"
            title={secteurPage.servicesTitre}
            tone="white"
          />
          <Ledger>
            {services.map((service, index) => (
              <LedgerEntry
                key={service.meta.slug}
                href={`/services/${service.meta.slug}`}
                titre={service.meta.title}
                excerpt={service.meta.excerpt}
                icon={service.meta.icon}
                delay={index * 60}
              />
            ))}
          </Ledger>
        </Section>
      ) : null}

      {meta.faq.length > 0 ? (
        <Section labelledBy="faq-secteur">
          <SectionHead id="faq-secteur" title={secteurPage.faqTitre} />
          <dl className="mt-12 max-w-[68ch] divide-y divide-graphite/45 border-t-2 border-b border-ink">
            {meta.faq.map((item) => (
              <div key={item.question} className="py-7">
                <dt className="text-21">{item.question}</dt>
                <dd className="mt-3 text-17 text-slate">{item.reponse}</dd>
              </div>
            ))}
          </dl>
        </Section>
      ) : null}

      <DevisCTA secteur={meta.slug} />

      <JsonLd data={breadcrumbLd(fil)} />
      <JsonLd
        data={secteurLd({
          name: meta.title,
          description: meta.excerpt,
          url: `/secteurs/${slug}`,
          services: services.map((service) => ({
            title: service.meta.title,
            slug: service.meta.slug,
          })),
          image: photo?.src,
        })}
      />
      <JsonLd data={faqLd(meta.faq)} />
    </>
  );
}
