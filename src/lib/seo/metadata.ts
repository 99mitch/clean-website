import type { Metadata } from 'next';
import { absoluteUrl, site } from '@/config/site';
import { fr } from '@/lib/typo';

/**
 * Image de partage par défaut : celle générée par `app/opengraph-image.tsx`.
 * Une route qui a son propre `opengraph-image` la remplace (les fichiers de
 * métadonnées priment sur la configuration).
 */
const TITRE_MAX = 65;

const IMAGE_PAR_DEFAUT = {
  url: absoluteUrl('/opengraph-image'),
  width: 1200,
  height: 630,
  type: 'image/png',
};

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
  /**
   * Ajoute la marque au titre. Le gabarit du layout ne s'applique pas à la
   * page racine : l'accueil passe donc `brand: true` explicitement.
   */
  brand?: boolean;
}): Metadata {
  const url = absoluteUrl(input.path);
  const title = fr(input.title);
  const avecMarque = `${title} — ${site.nom}`;
  // Au-delà d’environ 65 caractères, Google tronque : on sacrifie la marque
  // (qu'il ajoute souvent de lui-même) plutôt que la fin du titre.
  const titre =
    avecMarque.length > TITRE_MAX
      ? { absolute: title }
      : input.brand
        ? { absolute: avecMarque }
        : title;
  const description = fr(input.description);
  const image = { ...IMAGE_PAR_DEFAUT, alt: title };

  return {
    title: titre,
    description,
    keywords: input.keywords,
    alternates: { canonical: url },
    // Absent plutôt qu'`undefined` : sinon la directive du layout serait écrasée.
    ...(input.noindex ? { robots: { index: false, follow: false } } : {}),
    openGraph: {
      type: input.type ?? 'website',
      title,
      description,
      url,
      siteName: site.nom,
      locale: 'fr_FR',
      publishedTime: input.publishedTime,
      images: [image],
    },
    twitter: { card: 'summary_large_image', title, description, images: [image] },
  };
}
