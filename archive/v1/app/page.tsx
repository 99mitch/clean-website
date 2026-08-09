import type { Metadata } from 'next';
import { CardGrid, EntryCard } from '@/components/content/Cards';
import { DevisCTA } from '@/components/cta/DevisCTA';
import { PlanDeCadence } from '@/components/home/PlanDeCadence';
import { Container } from '@/components/ui/Container';
import { ButtonLink } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { PendingData } from '@/components/ui/PendingData';
import { Reveal } from '@/components/ui/Reveal';
import { Section, SectionHeader } from '@/components/ui/Section';
import { site } from '@/config/site';
import { home } from '@/copy/home';
import { getSecteurs, getServices } from '@/lib/content';
import { pageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = pageMetadata({
  title: home.meta.title,
  description: home.meta.description,
  path: '/',
});

export default async function AccueilPage() {
  const [services, secteurs] = await Promise.all([getServices(), getSecteurs()]);

  return (
    <>
      {/*
        Hero : pas d'image, pas d'effet — un document.
        Le plan de cadence est la première chose que voit le visiteur, et il
        énonce la thèse du site avant le premier paragraphe : la fréquence se
        décide zone par zone. Grille strictement orthogonale, monospace sur
        toute donnée, zéro JavaScript.
      */}
      <section className="border-b border-steel/25 pb-16 pt-14 lg:pb-24 lg:pt-20">
        <Container>
          <div className="grid gap-x-6 gap-y-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="eyebrow text-slate">{home.hero.eyebrow}</p>
              <h1 className="mt-6 max-w-[15ch] text-40 tracking-[-0.055em] sm:text-64">
                {home.hero.titre}
              </h1>
            </div>

            <div className="flex flex-col justify-end lg:col-span-4 lg:col-start-9">
              <p className="max-w-[38ch] text-17 text-slate">{home.hero.texte}</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <ButtonLink href="/devis" variant="devis" size="lg">
                  {home.hero.ctaPrimaire}
                </ButtonLink>
                <ButtonLink href="/services" variant="outline" size="lg">
                  {home.hero.ctaSecondaire}
                </ButtonLink>
              </div>
            </div>
          </div>

          <div className="mt-16 lg:mt-20">
            <PlanDeCadence />
          </div>
        </Container>
      </section>

      {/* ---- Preuve par la donnée --------------------------------------- */}
      <Section tone="frost" labelledBy="preuve-titre">
        <SectionHeader
          id="preuve-titre"
          eyebrow={home.preuve.eyebrow}
          title={home.preuve.titre}
          intro={home.preuve.intro}
          tone="frost"
        />
        <Chiffres />
      </Section>

      {/* ---- Prestations ------------------------------------------------ */}
      <Section labelledBy="services-titre">
        <SectionHeader
          id="services-titre"
          eyebrow={home.services.eyebrow}
          title={home.services.titre}
          intro={home.services.intro}
        />
        <CardGrid>
          {services.map((service, index) => (
            <EntryCard
              key={service.meta.slug}
              href={`/services/${service.meta.slug}`}
              title={service.meta.title}
              excerpt={service.meta.excerpt}
              icon={service.meta.icon}
              delay={index * 60}
            />
          ))}
        </CardGrid>
      </Section>

      {/* ---- Secteurs --------------------------------------------------- */}
      <Section tone="frost" labelledBy="secteurs-titre">
        <SectionHeader
          id="secteurs-titre"
          eyebrow={home.secteurs.eyebrow}
          title={home.secteurs.titre}
          intro={home.secteurs.intro}
          tone="frost"
        />
        <CardGrid>
          {secteurs.map((secteur, index) => (
            <EntryCard
              key={secteur.meta.slug}
              href={`/secteurs/${secteur.meta.slug}`}
              title={secteur.meta.title}
              excerpt={secteur.meta.excerpt}
              icon={secteur.meta.icon}
              delay={index * 60}
            />
          ))}
        </CardGrid>
        <div className="mt-10">
          <ButtonLink href="/secteurs" variant="outline">
            {home.secteurs.tous}
          </ButtonLink>
        </div>
      </Section>

      {/* ---- Protocole : la numérotation porte du sens ici (§6) ---------- */}
      <Section tone="ink" labelledBy="protocole-titre">
        <SectionHeader
          id="protocole-titre"
          eyebrow={home.protocole.eyebrow}
          title={home.protocole.titre}
          intro={home.protocole.intro}
          tone="ink"
        />
        <ol className="mt-14 grid gap-px bg-white/15 sm:grid-cols-2 lg:grid-cols-4">
          {home.protocole.etapes.map((etape, index) => (
            <Reveal
              as="li"
              key={etape.titre}
              delay={index * 80}
              className="bg-ink p-7"
            >
              <p className="font-mono text-13 tracking-[0.08em] text-white/50">
                {String(index + 1).padStart(2, '0')}
              </p>
              <h3 className="mt-4 text-21 text-white">{etape.titre}</h3>
              <p className="mt-3 text-15 text-white/70">{etape.texte}</p>
            </Reveal>
          ))}
        </ol>
      </Section>

      {/* ---- Engagements ------------------------------------------------ */}
      <Section labelledBy="engagements-titre">
        <SectionHeader
          id="engagements-titre"
          eyebrow={home.differences.eyebrow}
          title={home.differences.titre}
        />
        <ul className="mt-12 grid list-none gap-x-6 gap-y-10 sm:grid-cols-2">
          {home.differences.points.map((point, index) => (
            <Reveal as="li" key={point.titre} delay={index * 60}>
              <Icon name="check" size={22} className="text-navy" />
              <h3 className="mt-4 text-21">{point.titre}</h3>
              <p className="measure mt-3 text-15 text-slate">{point.texte}</p>
            </Reveal>
          ))}
        </ul>
      </Section>

      <DevisCTA />
    </>
  );
}

/**
 * Chiffres clés — n'affiche que ce qui a été validé par le client (§0).
 * Le monospace sur les chiffres est ce qui rend la preuve crédible (§6).
 */
function Chiffres() {
  const entrees = [
    { valeur: site.chiffres.anneeCreation, label: home.preuve.labels.anneeCreation, suffixe: '' },
    { valeur: site.chiffres.nbSalaries, label: home.preuve.labels.nbSalaries, suffixe: '' },
    { valeur: site.chiffres.nbSitesClients, label: home.preuve.labels.nbSitesClients, suffixe: '' },
    { valeur: site.chiffres.m2TraitesAn, label: home.preuve.labels.m2TraitesAn, suffixe: '' },
    { valeur: site.chiffres.tauxSatisfaction, label: home.preuve.labels.tauxSatisfaction, suffixe: ' %' },
    { valeur: site.chiffres.delaiIntervention, label: home.preuve.labels.delaiIntervention, suffixe: ' h' },
  ];

  const disponibles = entrees.filter((entree) => entree.valeur !== null);

  if (disponibles.length === 0) {
    return <PendingData label="CHIFFRES_CLES — aucun chiffre validé" className="mt-12" />;
  }

  return (
    <dl className="mt-12 border-t border-steel/30">
      {disponibles.map((entree) => (
        <div
          key={entree.label}
          className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-1 border-b border-steel/30 py-6"
        >
          <dt className="text-17 text-slate">{entree.label}</dt>
          <dd className="font-mono text-28 tabular-nums text-ink lg:text-40">
            {new Intl.NumberFormat('fr-FR').format(entree.valeur as number)}
            {entree.suffixe}
          </dd>
        </div>
      ))}
    </dl>
  );
}
