import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Mdx } from '@/components/content/Mdx';
import { DevisCTA } from '@/components/cta/DevisCTA';
import { PageHeader } from '@/components/layout/PageHeader';
import { JsonLd } from '@/components/seo/JsonLd';
import { Section } from '@/components/ui/Section';
import { referencesPage as copy } from '@/copy/pages';
import { getReference, getReferences } from '@/lib/content';
import { breadcrumbLd } from '@/lib/seo/jsonld';
import { pageMetadata } from '@/lib/seo/metadata';

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export async function generateStaticParams() {
  const references = await getReferences();
  return references.map((reference) => ({ slug: reference.meta.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const reference = await getReference(slug);
  if (!reference) return {};

  return pageMetadata({
    title: reference.meta.seo.title,
    description: reference.meta.seo.description ?? reference.meta.excerpt,
    path: `/references/${slug}`,
    keywords: reference.meta.seo.keywords,
  });
}

export default async function ReferencePage({ params }: Params) {
  const { slug } = await params;
  const reference = await getReference(slug);
  if (!reference) notFound();

  const { meta } = reference;
  const fil = [
    { name: 'Accueil', url: '/' },
    { name: 'Références', url: '/references' },
    { name: meta.title, url: `/references/${slug}` },
  ];

  return (
    <>
      <PageHeader
        rubrique="references"
        label={meta.client ?? copy.clientAnonyme}
        titre={meta.title}
        intro={meta.excerpt}
        breadcrumbs={fil}
      />

      <Section>
        {/* Chiffres du cas client : uniquement ceux validés par écrit (§0). */}
        {meta.chiffres.length > 0 ? (
          <dl className="mb-14 grid gap-px border border-graphite/30 bg-graphite/30 sm:grid-cols-3">
            {meta.chiffres.map((chiffre) => (
              <div key={chiffre.label} className="bg-mist p-7">
                <dd className="font-mono text-40 tabular-nums text-ink">
                  {chiffre.valeur}
                </dd>
                <dt className="mt-2 text-15 text-slate">{chiffre.label}</dt>
              </div>
            ))}
          </dl>
        ) : null}

        <Mdx source={reference.body} />
      </Section>

      <DevisCTA secteur={meta.secteur} />
      <JsonLd data={breadcrumbLd(fil)} />
    </>
  );
}
