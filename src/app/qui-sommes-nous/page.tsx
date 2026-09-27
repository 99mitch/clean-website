import type { Metadata } from 'next';
import { DevisCTA } from '@/components/cta/DevisCTA';
import { PageHeader } from '@/components/layout/PageHeader';
import { JsonLd } from '@/components/seo/JsonLd';
import { PlaceholderImage } from '@/components/ui/PlaceholderImage';
import { Reveal } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';
import { quiSommesNous as copy } from '@/copy/pages';
import { breadcrumbLd } from '@/lib/seo/jsonld';
import { pageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = pageMetadata({
  title: copy.meta.title,
  description: copy.meta.description,
  path: '/qui-sommes-nous',
});

/**
 * Page courte, lue d'un trait : titre, slogan, photo, puis le texte en
 * entonnoir — chaque bloc plus étroit que celui du dessus, tout centré.
 */
export default function QuiSommesNousPage() {
  const fil = [
    { name: 'Accueil', url: '/' },
    { name: 'Qui sommes-nous', url: '/qui-sommes-nous' },
  ];

  return (
    <>
      <PageHeader
        rubrique="entreprise"
        label={copy.eyebrow}
        titre={copy.titre}
        intro={copy.intro}
        breadcrumbs={fil}
        entonnoir
      />

      <Section className="pt-6! sm:pt-8! lg:pt-10!">
        <PlaceholderImage
          label={copy.photo}
          className="mx-auto aspect-[16/9] w-full max-w-[48rem] overflow-hidden rounded-card border border-ink"
        />

        <Reveal className="mx-auto mt-12 flex max-w-[92%] flex-col gap-6 text-center text-pretty sm:max-w-[min(28rem,76%)] lg:mt-16">
          <p className="text-17 text-ink">{copy.presentation}</p>
          {copy.histoire.map((paragraphe) => (
            <p key={paragraphe.slice(0, 32)} className="text-15 text-slate lg:text-17">
              {paragraphe}
            </p>
          ))}
        </Reveal>
      </Section>

      <DevisCTA />
      <JsonLd data={breadcrumbLd(fil)} />
    </>
  );
}
