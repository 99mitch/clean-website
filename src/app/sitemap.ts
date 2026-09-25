import { stat } from 'node:fs/promises';
import { join } from 'node:path';
import type { MetadataRoute } from 'next';
import { absoluteUrl } from '@/config/site';
import { getArticles, getOffres, getReferences, getSecteurs, getServices } from '@/lib/content';
import { PHOTO_HERO, PHOTO_PAR_SECTEUR, PHOTO_PAR_SERVICE } from '@/lib/photos';

/** Date de dernière modification du fichier MDX : un `lastmod` qui dit vrai. */
async function modifie(collection: string, slug: string): Promise<Date> {
  try {
    return (await stat(join(process.cwd(), 'content', collection, `${slug}.mdx`))).mtime;
  } catch {
    return new Date();
  }
}

/** Sitemap dynamique — canoniques absolues, images déclarées (§9). */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [services, secteurs, references, articles, offres] = await Promise.all([
    getServices(),
    getSecteurs(),
    getReferences(),
    getArticles(),
    getOffres(),
  ]);

  const statiques: Array<{ path: string; priority: number; images?: string[] }> = [
    { path: '/', priority: 1, images: [PHOTO_HERO.src] },
    { path: '/devis', priority: 0.9 },
    { path: '/services', priority: 0.8, images: Object.values(PHOTO_PAR_SERVICE).map((p) => p.src) },
    { path: '/secteurs', priority: 0.8, images: Object.values(PHOTO_PAR_SECTEUR).map((p) => p.src) },
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
  const image = (src?: string) => (src ? [absoluteUrl(src)] : undefined);

  return [
    ...statiques.map((entree) => ({
      url: absoluteUrl(entree.path),
      lastModified: now,
      priority: entree.priority,
      images: entree.images?.map((src) => absoluteUrl(src)),
    })),
    ...(await Promise.all(
      services.map(async (service) => ({
        url: absoluteUrl(`/services/${service.meta.slug}`),
        lastModified: await modifie('services', service.meta.slug),
        priority: 0.8,
        images: image(PHOTO_PAR_SERVICE[service.meta.slug]?.src),
      })),
    )),
    ...(await Promise.all(
      secteurs.map(async (secteur) => ({
        url: absoluteUrl(`/secteurs/${secteur.meta.slug}`),
        lastModified: await modifie('secteurs', secteur.meta.slug),
        priority: 0.8,
        images: image(PHOTO_PAR_SECTEUR[secteur.meta.slug]?.src),
      })),
    )),
    ...(await Promise.all(
      references.map(async (reference) => ({
        url: absoluteUrl(`/references/${reference.meta.slug}`),
        lastModified: await modifie('references', reference.meta.slug),
        priority: 0.5,
      })),
    )),
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
