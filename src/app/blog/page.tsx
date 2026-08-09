import type { Metadata } from 'next';
import Link from 'next/link';
import { DevisCTA } from '@/components/cta/DevisCTA';
import { PageHeader } from '@/components/layout/PageHeader';
import { JsonLd } from '@/components/seo/JsonLd';
import { Reveal } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';
import { blogIndex as copy } from '@/copy/pages';
import { getArticles } from '@/lib/content';
import { breadcrumbLd } from '@/lib/seo/jsonld';
import { pageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = pageMetadata({
  title: copy.meta.title,
  description: copy.meta.description,
  path: '/blog',
});

const dateFormat = new Intl.DateTimeFormat('fr-FR', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});

export default async function BlogPage() {
  const articles = await getArticles();
  const fil = [
    { name: 'Accueil', url: '/' },
    { name: 'Ressources', url: '/blog' },
  ];

  return (
    <>
      <PageHeader
        rubrique="blog"
        label={copy.eyebrow}
        titre={copy.titre}
        intro={copy.intro}
        breadcrumbs={fil}
      />

      <Section>
        {articles.length === 0 ? (
          <p className="text-17 text-slate">{copy.vide}</p>
        ) : (
          <ul className="grid list-none divide-y divide-graphite/30 border-y border-graphite/30">
            {articles.map((article, index) => (
              <Reveal as="li" key={article.meta.slug} delay={index * 60}>
                <Link
                  href={`/blog/${article.meta.slug}`}
                  className="group grid gap-4 py-8 md:grid-cols-12"
                >
                  <p className="font-mono text-13 text-slate md:col-span-3">
                    <time dateTime={article.meta.date}>
                      {dateFormat.format(new Date(article.meta.date))}
                    </time>
                  </p>
                  <div className="md:col-span-9">
                    <h2 className="text-21 group-hover:text-cobalt">
                      {article.meta.title}
                    </h2>
                    <p className="measure mt-3 text-15 text-slate">
                      {article.meta.excerpt}
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </ul>
        )}
      </Section>

      <DevisCTA />
      <JsonLd data={breadcrumbLd(fil)} />
    </>
  );
}
