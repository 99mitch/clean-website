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
import { DEGRADE_BLEU, palierBleu, palierFonce, suiteBleu } from '@/lib/ui/degrade';

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

  const [services, secteurs] = await Promise.all([servicesForSecteur(slug), getSecteurs()]);
  const photo = PHOTO_PAR_SECTEUR[slug];
  const { meta } = secteur;

  // Même palier que la carte du secteur sur /secteurs, puis deux paliers
  // voisins pour les sections suivantes : la fiche prolonge sa carte.
  const rang = secteurs.findIndex((entree) => entree.meta.slug === slug);
  const [p1, p2, p3] = suiteBleu(palierBleu(Math.max(rang, 0), secteurs.length));
  const fond = (palier: number) =>
    `${DEGRADE_BLEU[palier]}${palierFonce(palier) ? ' on-dark' : ''}`;
  const head = (palier: number) => (palierFonce(palier) ? 'cobalt' : 'white');

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
        breadcrumbs={fil}
      />

      <Section surface={fond(p1)}>
        {photo ? (
          // Centrée, dans les proportions du fichier source et à sa largeur
          // réelle au plus : ni recadrage, ni agrandissement flou.
          <div
            className="relative mx-auto mb-12 w-full overflow-hidden rounded-card border border-current/25 lg:mb-16"
            style={{
              aspectRatio: photo.width && photo.height ? `${photo.width} / ${photo.height}` : '4 / 3',
              maxWidth: `min(100%, ${photo.width ?? 704}px)`,
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
            <Mdx source={secteur.body} tone="inherit" />
          </div>

          <aside className="lg:col-span-5">
            <Reveal className="border-t-2 border-current pt-6">
              <Icon name={meta.icon} size={28} />
              <h2 className="mt-6 text-21">{secteurPage.enjeuxTitre}</h2>
              <ul className="mt-5 space-y-3">
                {meta.enjeux.map((enjeu) => (
                  <li
                    key={enjeu}
                    className="relative pl-6 text-15 opacity-80 before:absolute before:left-0 before:top-[0.7em] before:h-px before:w-3 before:bg-current"
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
        <Section surface={fond(p2)} labelledBy="services-secteur">
          <SectionHead
            id="services-secteur"
            title={secteurPage.servicesTitre}
            tone={head(p2)}
          />
          <Ledger inherit>
            {services.map((service, index) => (
              <LedgerEntry
                key={service.meta.slug}
                href={`/services/${service.meta.slug}`}
                titre={service.meta.title}
                excerpt={service.meta.excerpt}
                icon={service.meta.icon}
                delay={index * 60}
                inherit
              />
            ))}
          </Ledger>
        </Section>
      ) : null}

      {meta.faq.length > 0 ? (
        <Section surface={fond(p3)} labelledBy="faq-secteur">
          <SectionHead id="faq-secteur" title={secteurPage.faqTitre} tone={head(p3)} />
          <dl className="mt-12 max-w-[68ch] divide-y divide-current/25 border-t-2 border-b border-current">
            {meta.faq.map((item) => (
              <div key={item.question} className="py-7">
                <dt className="text-21">{item.question}</dt>
                <dd className="mt-3 text-17 opacity-80">{item.reponse}</dd>
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
