import { site } from '@/config/site';
import { secteurPage } from '@/copy/pages';
import { getSecteur, getSecteurs } from '@/lib/content';
import { PHOTO_PAR_SECTEUR } from '@/lib/photos';
import { OG_CONTENT_TYPE, OG_SIZE, renderOg } from '@/lib/seo/og';

export const alt = `Nettoyage professionnel par secteur d’activité — ${site.nom}`;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export async function generateStaticParams() {
  const secteurs = await getSecteurs();
  return secteurs.map((secteur) => ({ slug: secteur.meta.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const secteur = await getSecteur(slug);

  return renderOg({
    eyebrow: secteurPage.eyebrow,
    titre: secteur?.meta.title ?? site.nom,
    sousTitre: secteur?.meta.excerpt,
    photo: PHOTO_PAR_SECTEUR[slug],
  });
}
