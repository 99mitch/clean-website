import type { MetadataRoute } from 'next';
import { absoluteUrl } from '@/config/site';
import { getArticles, getOffres, getReferences, getSecteurs, getServices } from '@/lib/content';

/** Sitemap dynamique — canoniques absolues (§9). */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [services, secteurs, references, articles, offres] = await Promise.all([
    getServices(),
    getSecteurs(),
    getReferences(),
    getArticles(),
    getOffres(),
  ]);

  const statiques = [
    { path: '/', priority: 1 },
    { path: '/devis', priority: 0.9 },
    { path: '/services', priority: 0.8 },
    { path: '/secteurs', priority: 0.8 },
    { path: '/references', priority: 0.6 },
    { path: '/engagements', priority: 0.5 },
    { path: '/engagements/certifications', priority: 0.4 },
    { path: '/qui-sommes-nous', priority: 0.5 },
    { path: '/blog', priority: 0.6 },
    { path: '/recrutement', priority: 0.5 },
    { path: '/contact', priority: 0.7 },
    { path: '/mentions-legales', priority: 0.1 },
    { path: '/politique-de-confidentialite', priority: 0.1 },
    { path: '/accessibilite', priority: 0.1 },
  ];

  const now = new Date();

  return [
    ...statiques.map((entree) => ({
      url: absoluteUrl(entree.path),
      lastModified: now,
      priority: entree.priority,
    })),
    ...services.map((service) => ({
      url: absoluteUrl(`/services/${service.meta.slug}`),
      lastModified: now,
      priority: 0.8,
    })),
    ...secteurs.map((secteur) => ({
      url: absoluteUrl(`/secteurs/${secteur.meta.slug}`),
      lastModified: now,
      priority: 0.8,
    })),
    ...references.map((reference) => ({
      url: absoluteUrl(`/references/${reference.meta.slug}`),
      lastModified: now,
      priority: 0.5,
    })),
    ...articles.map((article) => ({
      url: absoluteUrl(`/blog/${article.meta.slug}`),
      lastModified: new Date(article.meta.date),
      priority: 0.5,
    })),
    ...offres.map((offre) => ({
      url: absoluteUrl(`/recrutement/${offre.meta.slug}`),
      lastModified: new Date(offre.meta.publieLe),
      priority: 0.4,
    })),
  ];
}
