import type { Metadata } from 'next';
import { Ledger, LedgerEntry } from '@/components/content/Ledger';
import { DevisCTA } from '@/components/cta/DevisCTA';
import { Matrice } from '@/components/home/Matrice';
import { Echantillonnier } from '@/components/materiaux/Echantillonnier';
import { ButtonLink } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { PendingData } from '@/components/ui/PendingData';
import { Reveal } from '@/components/ui/Reveal';
import { Section, SectionHead } from '@/components/ui/Section';
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
        HERO — pas d'image, pas d'effet : un échantillonnier.
        Douze revêtements générés en CSS, chacun avec son protocole. C'est le
        vocabulaire d'entrée du métier, et c'est ce que le visiteur reconnaît
        avant d'avoir lu une ligne.
      */}
      <section className="bg-paper">
        <Container className="pb-20 pt-12 lg:pb-28 lg:pt-16">
          <div className="grid gap-x-12 gap-y-14 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <p className="eyebrow border-t-2 border-ink pt-3 text-ink">
                {home.hero.eyebrow}
              </p>

              <h1 className="mt-10 max-w-[13ch] text-40 tracking-[-0.06em] sm:text-64 lg:text-88">
                {home.hero.titre}
              </h1>

              <p className="measure mt-8 max-w-[44ch] text-21 text-slate">
                {home.hero.texte}
              </p>

              <div className="mt-10 flex flex-wrap gap-3">
                <ButtonLink href="/devis" variant="devis" size="lg">
                  {home.hero.ctaPrimaire}
                </ButtonLink>
                <ButtonLink href="/services" variant="outline" size="lg">
                  {home.hero.ctaSecondaire}
                </ButtonLink>
              </div>

              <ul className="mt-12 list-none border-t rule-hair">
                {home.hero.garanties.map((garantie) => (
                  <li
                    key={garantie}
                    className="border-b rule-hair py-3 font-mono text-13 uppercase tracking-[0.1em] text-slate"
                  >
                    {garantie}
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-6">
              <Echantillonnier />
            </div>
          </div>
        </Container>
      </section>

      {/* ---- Matrice secteurs × prestations : le croisement (§4) --------- */}
      <Section tone="white" labelledBy="matrice-titre">
        <SectionHead
          id="matrice-titre"
          label={home.matrice.label}
          title={home.matrice.titre}
          intro={home.matrice.intro}
          aside={home.matrice.aside}
          tone="white"
        />
        <Matrice services={services} secteurs={secteurs} />
      </Section>

      {/* ---- Registre des prestations ----------------------------------- */}
      <Section labelledBy="services-titre">
        <SectionHead
          id="services-titre"
          label={home.services.label}
          title={home.services.titre}
          intro={home.services.intro}
          aside={home.services.aside}
        />
        <Ledger>
          {services.map((service, index) => (
            <LedgerEntry
              key={service.meta.slug}
              href={`/services/${service.meta.slug}`}
              titre={service.meta.title}
              excerpt={service.meta.excerpt}
              icon={service.meta.icon}
              meta={service.meta.frequences.slice(0, 2)}
              delay={index * 40}
            />
          ))}
        </Ledger>
      </Section>

      {/* ---- Protocole : la numérotation porte du sens ici (§6) ---------- */}
      <Section tone="abyss" labelledBy="protocole-titre">
        <SectionHead
          id="protocole-titre"
          label={home.protocole.label}
          title={home.protocole.titre}
          intro={home.protocole.intro}
          aside={home.protocole.aside}
          tone="abyss"
        />
        <ol className="mt-14 list-none border-t border-paper/25">
          {home.protocole.etapes.map((etape, index) => (
            <Reveal
              as="li"
              key={etape.titre}
              delay={index * 60}
              className="grid gap-x-8 gap-y-3 border-b border-paper/20 py-8 md:grid-cols-12"
            >
              <span className="font-mono text-13 text-paper/45 md:col-span-1">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="text-21 text-paper md:col-span-3">{etape.titre}</h3>
              <p className="text-15 text-paper/70 md:col-span-5">{etape.texte}</p>
              <p className="font-mono text-13 text-paper/50 md:col-span-3 md:text-right">
                {etape.duree}
              </p>
            </Reveal>
          ))}
        </ol>
      </Section>

      {/* ---- Preuve par la donnée --------------------------------------- */}
      <Section tone="white" labelledBy="preuve-titre">
        <SectionHead
          id="preuve-titre"
          label={home.preuve.label}
          title={home.preuve.titre}
          intro={home.preuve.intro}
          aside={home.preuve.aside}
          tone="white"
        />
        <Chiffres />
      </Section>

      {/* ---- Engagements ------------------------------------------------ */}
      <Section labelledBy="engagements-titre">
        <SectionHead
          id="engagements-titre"
          label={home.differences.label}
          title={home.differences.titre}
          aside={home.differences.aside}
        />
        <ul className="mt-12 grid list-none border-t rule-hair sm:grid-cols-2">
          {home.differences.points.map((point, index) => (
            <Reveal
              as="li"
              key={point.titre}
              delay={index * 50}
              className="border-b rule-hair py-8 sm:odd:border-r sm:odd:pr-10 sm:even:pl-10"
            >
              <h3 className="text-21">{point.titre}</h3>
              <p className="measure mt-3 max-w-[46ch] text-15 text-slate">
                {point.texte}
              </p>
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
 * Lignes de registre, valeur en monospace alignée à droite : le monospace
 * sur les chiffres est ce qui rend la preuve crédible (§6).
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
    return (
      <PendingData label="CHIFFRES_CLES — aucun chiffre validé" className="mt-12" />
    );
  }

  return (
    <dl className="mt-12 border-t rule-hair">
      {disponibles.map((entree) => (
        <div
          key={entree.label}
          className="flex flex-wrap items-baseline justify-between gap-x-10 gap-y-1 border-b rule-hair py-6"
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
