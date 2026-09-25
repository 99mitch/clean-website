import { site } from '@/config/site';
import { servicePage } from '@/copy/pages';
import { getService, getServices } from '@/lib/content';
import { PHOTO_PAR_SERVICE } from '@/lib/photos';
import { OG_CONTENT_TYPE, OG_SIZE, renderOg } from '@/lib/seo/og';

export const alt = `Prestation de nettoyage professionnel — ${site.nom}`;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export async function generateStaticParams() {
  const services = await getServices();
  return services.map((service) => ({ slug: service.meta.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = await getService(slug);

  return renderOg({
    eyebrow: servicePage.eyebrow,
    titre: service?.meta.title ?? site.nom,
    sousTitre: service?.meta.excerpt,
    photo: PHOTO_PAR_SERVICE[slug],
  });
}
