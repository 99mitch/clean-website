import { site } from '@/config/site';
import { home } from '@/copy/home';
import { PHOTO_HERO } from '@/lib/photos';
import { OG_CONTENT_TYPE, OG_SIZE, renderOg } from '@/lib/seo/og';

export const alt = `${site.nom} — ${home.hero.titre}`;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOg({
    eyebrow: home.hero.eyebrow,
    titre: home.hero.titre,
    sousTitre: 'Un prix, un protocole et une date. Pas une brochure.',
    photo: PHOTO_HERO,
  });
}
