import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Mdx } from '@/components/content/Mdx';
import { DevisCTA } from '@/components/cta/DevisCTA';
import { PageHeader } from '@/components/layout/PageHeader';
import { JsonLd } from '@/components/seo/JsonLd';
import { Section } from '@/components/ui/Section';
import { blogIndex as copy } from '@/copy/pages';
import { getArticle, getArticles } from '@/lib/content';
import { articleLd, breadcrumbLd } from '@/lib/seo/jsonld';
import { pageMetadata } from '@/lib/seo/metadata';

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export async function generateStaticParams() {
  const articles = await getArticles();
  return articles.map((article) => ({ slug: article.meta.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) return {};

  return pageMetadata({
    title: article.meta.seo.title,
    description: article.meta.seo.description ?? article.meta.excerpt,
    path: `/blog/${slug}`,
    keywords: article.meta.seo.keywords,
    type: 'article',
    publishedTime: article.meta.date,
  });
}

const dateFormat = new Intl.DateTimeFormat('fr-FR', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});

export default async function ArticlePage({ params }: Params) {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) notFound();

  const { meta } = article;
  const fil = [
    { name: 'Accueil', url: '/' },
    { name: 'Ressources', url: '/blog' },
    { name: meta.title, url: `/blog/${slug}` },
  ];

  return (
    <>
      <PageHeader
        rubrique="blog"
        label={`${copy.par} ${meta.auteur}`}
        titre={meta.title}
        intro={meta.excerpt}
        breadcrumbs={fil}
      >
        <p className="mt-6 font-mono text-13 text-slate">
          <time dateTime={meta.date}>
            {dateFormat.format(new Date(meta.date))}
          </time>
        </p>
      </PageHeader>

      <Section>
        <article>
          <Mdx source={article.body} />
        </article>
      </Section>

      <DevisCTA />

      <JsonLd data={breadcrumbLd(fil)} />
      <JsonLd
        data={articleLd({
          title: meta.title,
          description: meta.excerpt,
          datePublished: meta.date,
          author: meta.auteur,
          url: `/blog/${slug}`,
        })}
      />
    </>
  );
}
