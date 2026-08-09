import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Mdx } from '@/components/content/Mdx';
import { PageHeader } from '@/components/layout/PageHeader';
import { JsonLd } from '@/components/seo/JsonLd';
import { ButtonLink } from '@/components/ui/Button';
import { Section } from '@/components/ui/Section';
import { site } from '@/config/site';
import { recrutementPage as copy } from '@/copy/pages';
import { getOffre, getOffres } from '@/lib/content';
import { breadcrumbLd, jobPostingLd } from '@/lib/seo/jsonld';
import { pageMetadata } from '@/lib/seo/metadata';

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export async function generateStaticParams() {
  const offres = await getOffres();
  return offres.map((offre) => ({ slug: offre.meta.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const offre = await getOffre(slug);
  if (!offre) return {};

  return pageMetadata({
    title: offre.meta.seo.title,
    description: offre.meta.seo.description ?? offre.meta.excerpt,
    path: `/recrutement/${slug}`,
    keywords: offre.meta.seo.keywords,
  });
}

export default async function OffrePage({ params }: Params) {
  const { slug } = await params;
  const offre = await getOffre(slug);
  if (!offre) notFound();

  const { meta } = offre;
  const fil = [
    { name: 'Accueil', url: '/' },
    { name: 'Recrutement', url: '/recrutement' },
    { name: meta.title, url: `/recrutement/${slug}` },
  ];

  return (
    <>
      <PageHeader
        rubrique="recrutement"
        label={copy.eyebrow}
        titre={meta.title}
        intro={meta.excerpt}
        breadcrumbs={fil}
      >
        <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-3 font-mono text-13">
          <div>
            <dt className="text-slate">{copy.contrat}</dt>
            <dd className="mt-1 text-ink">{meta.contrat}</dd>
          </div>
          <div>
            <dt className="text-slate">{copy.temps}</dt>
            <dd className="mt-1 text-ink">{meta.temps}</dd>
          </div>
          <div>
            <dt className="text-slate">{copy.lieu}</dt>
            <dd className="mt-1 text-ink">{meta.lieu}</dd>
          </div>
        </dl>
      </PageHeader>

      <Section>
        <div className="measure">
          <h2 className="text-21">{copy.missionsTitre}</h2>
          <ul className="mt-5 space-y-3">
            {meta.missions.map((mission) => (
              <li
                key={mission}
                className="relative pl-6 text-17 text-slate before:absolute before:left-0 before:top-[0.7em] before:h-px before:w-3 before:bg-graphite"
              >
                {mission}
              </li>
            ))}
          </ul>

          <h2 className="mt-12 text-21">{copy.profilTitre}</h2>
          <ul className="mt-5 space-y-3">
            {meta.profil.map((point) => (
              <li
                key={point}
                className="relative pl-6 text-17 text-slate before:absolute before:left-0 before:top-[0.7em] before:h-px before:w-3 before:bg-graphite"
              >
                {point}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-12">
          <Mdx source={offre.body} />
        </div>

        <div className="mt-12">
          {site.emailContact ? (
            <ButtonLink
              href={`mailto:${site.emailContact}?subject=Candidature — ${meta.title}`}
              variant="devis"
              size="lg"
            >
              {copy.postuler}
            </ButtonLink>
          ) : (
            <ButtonLink href="/contact" variant="devis" size="lg">
              {copy.postuler}
            </ButtonLink>
          )}
        </div>
      </Section>

      <JsonLd data={breadcrumbLd(fil)} />
      <JsonLd
        data={jobPostingLd({
          title: meta.title,
          description: meta.excerpt,
          datePosted: meta.publieLe,
          employmentType: meta.contrat,
          lieu: meta.lieu,
          url: `/recrutement/${slug}`,
        })}
      />
    </>
  );
}
