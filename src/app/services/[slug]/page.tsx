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
import { servicePage } from '@/copy/pages';
import { getService, getServices, secteursForService } from '@/lib/content';
import { PHOTO_PAR_SERVICE } from '@/lib/photos';
import { breadcrumbLd, serviceLd } from '@/lib/seo/jsonld';
import { pageMetadata } from '@/lib/seo/metadata';
import { DEGRADE_BLEU, palierBleu, palierFonce, suiteBleu } from '@/lib/ui/degrade';

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

  const [secteurs, services] = await Promise.all([secteursForService(slug), getServices()]);
  const photo = PHOTO_PAR_SERVICE[slug];
  const { meta } = service;

  // Même palier que la carte de la prestation sur /services, puis un palier
  // voisin pour la section suivante — même règle que les fiches secteur.
  const rang = services.findIndex((entree) => entree.meta.slug === slug);
  const [p1, p2] = suiteBleu(palierBleu(Math.max(rang, 0), services.length));
  const fond = (palier: number) =>
    `${DEGRADE_BLEU[palier]}${palierFonce(palier) ? ' on-dark' : ''}`;
  const head = (palier: number) => (palierFonce(palier) ? 'cobalt' : 'white');

  const fil = [
    { name: 'Accueil', url: '/' },
    { name: 'Prestations', url: '/services' },
    { name: meta.title, url: `/services/${slug}` },
  ];

  return (
    <>
      <PageHeader
        rubrique="services"
        label={servicePage.eyebrow}
        titre={meta.title}
        breadcrumbs={fil}
      />

      <Section surface={fond(p1)}>
        {photo ? (
          // Centrée, dans les proportions du fichier source et à sa largeur
          // réelle au plus : ni recadrage, ni agrandissement flou.
          <div
            className="relative mx-auto mb-12 w-full overflow-hidden rounded-card border border-current/25 lg:mb-16"
            style={{
              aspectRatio: photo.width && photo.height ? `${photo.width} / ${photo.height}` : '3 / 2',
              maxWidth: `min(100%, ${photo.width ?? 576}px)`,
            }}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              loading="eager"
              fetchPriority="high"
              quality={90}
              sizes="(min-width: 768px) 704px, calc(100vw - 48px)"
              className="object-cover"
            />
          </div>
        ) : null}

        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Mdx source={service.body} tone="inherit" />
          </div>

          <aside className="lg:col-span-5">
            <Reveal className="border-t-2 border-current pt-6">
              <Icon name={meta.icon} size={28} />
              <h2 className="mt-6 text-21">{servicePage.frequencesTitre}</h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {meta.frequences.map((frequence) => (
                  <li
                    key={frequence}
                    className="rounded-chip border border-current/40 px-3 py-1 font-mono text-13"
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
        <Section surface={fond(p2)} labelledBy="secteurs-service">
          <SectionHead
            id="secteurs-service"
            title={servicePage.secteursTitre}
            tone={head(p2)}
          />
          <Ledger inherit>
            {secteurs.map((secteur, index) => (
              <LedgerEntry
                key={secteur.meta.slug}
                href={`/secteurs/${secteur.meta.slug}`}
                titre={secteur.meta.title}
                excerpt={secteur.meta.excerpt}
                icon={secteur.meta.icon}
                delay={index * 60}
                inherit
              />
            ))}
          </Ledger>
        </Section>
      ) : null}

      <DevisCTA service={meta.devisPrestation ?? meta.slug} />

      <JsonLd
        data={serviceLd({
          name: meta.title,
          description: meta.excerpt,
          url: `/services/${slug}`,
          prestations: meta.prestations,
          image: photo?.src,
        })}
      />
      <JsonLd data={breadcrumbLd(fil)} />
    </>
  );
}
