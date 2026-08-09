import type { Metadata } from 'next';
import { absoluteUrl, site } from '@/config/site';
import { fr } from '@/lib/typo';

/**
 * Une meta-description par route, jamais dupliquée (§9) — c'est l'erreur
 * du concurrent de référence. `description` est donc obligatoire.
 */
export function pageMetadata(input: {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  noindex?: boolean;
  type?: 'website' | 'article';
  publishedTime?: string;
}): Metadata {
  const url = absoluteUrl(input.path);
  const title = fr(input.title);
  const description = fr(input.description);

  return {
    title,
    description,
    keywords: input.keywords,
    alternates: { canonical: url },
    robots: input.noindex ? { index: false, follow: false } : undefined,
    openGraph: {
      type: input.type ?? 'website',
      title,
      description,
      url,
      siteName: site.nom,
      locale: 'fr_FR',
      publishedTime: input.publishedTime,
    },
    twitter: { card: 'summary_large_image', title, description },
  };
}
