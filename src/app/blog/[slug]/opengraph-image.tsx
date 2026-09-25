import { site } from '@/config/site';
import { blogIndex } from '@/copy/pages';
import { getArticle, getArticles } from '@/lib/content';
import { OG_CONTENT_TYPE, OG_SIZE, renderOg } from '@/lib/seo/og';

export const alt = `Article sur la propreté professionnelle — ${site.nom}`;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export async function generateStaticParams() {
  const articles = await getArticles();
  return articles.map((article) => ({ slug: article.meta.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getArticle(slug);

  return renderOg({
    eyebrow: blogIndex.eyebrow,
    titre: article?.meta.title ?? site.nom,
    sousTitre: article?.meta.excerpt,
  });
}
