import type { MetadataRoute } from 'next';
import { site } from '@/config/site';

/** Manifeste web : nom, couleurs et icônes pour l'ajout à l'écran d'accueil. */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.nom} — ${site.baseline}`,
    short_name: site.nom,
    description: site.description,
    lang: 'fr',
    dir: 'ltr',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    background_color: '#F6F8FB',
    theme_color: '#F6F8FB',
    categories: ['business'],
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: '/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
    shortcuts: [
      { name: 'Demander un devis', url: '/devis', icons: [{ src: '/icon-192.png', sizes: '192x192' }] },
      { name: 'Nous contacter', url: '/contact', icons: [{ src: '/icon-192.png', sizes: '192x192' }] },
    ],
  };
}
