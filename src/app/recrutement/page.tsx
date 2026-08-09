import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHeader } from '@/components/layout/PageHeader';
import { JsonLd } from '@/components/seo/JsonLd';
import { ButtonLink } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Icon } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';
import { Section, SectionHead } from '@/components/ui/Section';
import { site } from '@/config/site';
import { recrutementPage as copy } from '@/copy/pages';
import { getOffres } from '@/lib/content';
import { breadcrumbLd, jobPostingLd } from '@/lib/seo/jsonld';
import { pageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = pageMetadata({
  title: copy.meta.title,
  description: copy.meta.description,
  path: '/recrutement',
  keywords: ['emploi agent de propreté', 'recrutement nettoyage', 'offre emploi chef d\'équipe propreté'],
});

/** Tunnel distinct du parcours devis (§2, cible 3). */
export default async function RecrutementPage() {
  const offres = await getOffres();
  const fil = [
    { name: 'Accueil', url: '/' },
    { name: 'Recrutement', url: '/recrutement' },
  ];

  return (
    <>
      <PageHeader
        rubrique="recrutement"
        label={copy.eyebrow}
        titre={copy.titre}
        intro={copy.intro}
        breadcrumbs={fil}
      />

      <Section tone="white" labelledBy="offre-titre">
        <SectionHead id="offre-titre" title={copy.ceQueNousOffrons} tone="white" />
        <ul className="mt-10 grid list-none gap-x-6 gap-y-5 sm:grid-cols-2">
          {copy.points.map((point) => (
            <li key={point} className="flex gap-3 text-17 text-slate">
              <Icon name="check" size={20} className="mt-1 shrink-0 text-cobalt" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section labelledBy="offres-titre">
        <SectionHead id="offres-titre" title={copy.offres} />
        {offres.length === 0 ? (
          <p className="mt-8 max-w-[60ch] text-17 text-slate">
            {copy.offresVides}
          </p>
        ) : (
          <ul className="mt-12 grid list-none divide-y divide-graphite/30 border-y border-graphite/30">
            {offres.map((offre, index) => (
              <Reveal as="li" key={offre.meta.slug} delay={index * 60}>
                <Link
                  href={`/recrutement/${offre.meta.slug}`}
                  className="group grid gap-3 py-8 md:grid-cols-12"
                >
                  <div className="md:col-span-8">
                    <h3 className="text-21 group-hover:text-cobalt">
                      {offre.meta.title}
                    </h3>
                    <p className="measure mt-2 text-15 text-slate">
                      {offre.meta.excerpt}
                    </p>
                  </div>
                  <p className="font-mono text-13 text-slate md:col-span-4 md:text-right">
                    {offre.meta.contrat} · {offre.meta.temps}
                    <br />
                    {offre.meta.lieu}
                  </p>
                </Link>
              </Reveal>
            ))}
          </ul>
        )}
      </Section>

      <section className="on-dark bg-ink py-20 text-white lg:py-24">
        <Container>
          <Reveal className="max-w-[60ch]">
            <h2 className="text-28 lg:text-40">{copy.spontanee}</h2>
            <p className="mt-5 text-17 text-white/75">{copy.spontaneeTexte}</p>
            <div className="mt-9">
              {site.emailContact ? (
                <ButtonLink
                  href={`mailto:${site.emailContact}?subject=Candidature spontanée`}
                  variant="devis"
                  size="lg"
                >
                  {copy.postuler}
                </ButtonLink>
              ) : (
                <ButtonLink href="/contact" variant="devis" size="lg">
                  {copy.postuler}
                </ButtonLink>
              )}
            </div>
          </Reveal>
        </Container>
      </section>

      <JsonLd data={breadcrumbLd(fil)} />
      {offres.map((offre) => (
        <JsonLd
          key={offre.meta.slug}
          data={jobPostingLd({
            title: offre.meta.title,
            description: offre.meta.excerpt,
            datePosted: offre.meta.publieLe,
            employmentType: offre.meta.contrat,
            lieu: offre.meta.lieu,
            url: `/recrutement/${offre.meta.slug}`,
          })}
        />
      ))}
    </>
  );
}
