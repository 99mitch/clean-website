import type { Metadata } from 'next';
import Image from 'next/image';
import { Ledger, LedgerEntry } from '@/components/content/Ledger';
import { DevisCTA } from '@/components/cta/DevisCTA';
import { Matrice } from '@/components/home/Matrice';
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
        HERO — plein écran, photo en fond, texte posé sur la partie gauche.
        Le dégradé garantit la lecture du texte sans dépendre de la zone de
        l'image : abyss plein à gauche, transparent à droite.
      */}
      <section className="on-dark relative isolate flex min-h-[100svh] items-center overflow-hidden bg-abyss text-paper">
        <Image
          src="/images/hero-agent-nettoyage.png"
          alt="Agent de propreté intervenant avec une autolaveuse dans un hall tertiaire vitré"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-abyss from-10% via-abyss/75 via-45% to-abyss/10"
        />

        <Container className="relative py-24">
          <div className="max-w-xl">
            <p className="eyebrow border-t-2 border-paper pt-3 text-paper">
              {home.hero.eyebrow}
            </p>

            <h1 className="mt-10 max-w-[13ch] text-40 tracking-[-0.06em] sm:text-64 lg:text-88">
              {home.hero.titre}
            </h1>

            <p className="measure mt-8 max-w-[44ch] text-21 text-paper/80">
              {home.hero.texte}
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              <ButtonLink href="/devis" variant="devis" size="lg">
                {home.hero.ctaPrimaire}
              </ButtonLink>
              <ButtonLink href="/services" variant="adaptive" size="lg">
                {home.hero.ctaSecondaire}
              </ButtonLink>
            </div>

            <ul className="mt-12 list-none border-t border-paper/25">
              {home.hero.garanties.map((garantie) => (
                <li
                  key={garantie}
                  className="border-b border-paper/25 py-3 font-mono text-13 uppercase tracking-[0.1em] text-paper/70"
                >
                  {garantie}
                </li>
              ))}
            </ul>
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

      {/* ---- Pourquoi nous : 4 engagements, en cartes verticales --------- */}
      <Section tone="white" labelledBy="pourquoi-nous-titre">
        <SectionHead
          id="pourquoi-nous-titre"
          label={home.pourquoiNous.label}
          title={home.pourquoiNous.titre}
          intro={home.pourquoiNous.intro}
          aside={home.pourquoiNous.aside}
          tone="white"
        />
        <div className="mt-12 flex flex-col gap-4">
          {home.pourquoiNous.points.map((point, index) => (
            <Reveal
              as="article"
              key={point.titre}
              delay={index * 60}
              className="border border-ink p-8 lg:p-10"
            >
              <p className="font-mono text-13 text-cobalt">
                {String(index + 1).padStart(2, '0')}
              </p>
              <h3 className="mt-3 text-21 lg:text-28">{point.titre}</h3>
              <p className="measure mt-3 max-w-[60ch] text-15 text-slate">{point.texte}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ---- Protocole : la numérotation porte du sens ici (§6) ---------- */}
      <Section tone="cobalt" labelledBy="protocole-titre">
        <SectionHead
          id="protocole-titre"
          label={home.protocole.label}
          title={home.protocole.titre}
          intro={home.protocole.intro}
          aside={home.protocole.aside}
          tone="cobalt"
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

      {/* ---- Retour clients ---------------------------------------------- */}
      <Section tone="white" labelledBy="retour-clients-titre">
        <SectionHead
          id="retour-clients-titre"
          label={home.retourClients.label}
          title={home.retourClients.titre}
          intro={home.retourClients.intro}
          aside={home.retourClients.aside}
          tone="white"
        />
        <RetourClients />
      </Section>

      <DevisCTA />
    </>
  );
}

/**
 * Retour clients — n'affiche que des avis validés par écrit (§0). Lignes de
 * registre : citation à gauche, signature en monospace alignée à droite.
 */
function RetourClients() {
  const avis = site.avisClients;

  if (avis.length === 0) {
    return <PendingData label={home.retourClients.vide} className="mt-12" />;
  }

  return (
    <ul className="mt-12 list-none border-t rule-hair">
      {avis.map((entree, index) => (
        <Reveal
          as="li"
          key={entree.auteur}
          delay={index * 50}
          className="ledger-row grid gap-x-8 gap-y-3 py-8 pl-5 pr-2 md:grid-cols-12"
        >
          <p className="measure text-17 text-ink md:col-span-8 lg:col-span-9">
            « {entree.citation} »
          </p>
          <p className="font-mono text-13 text-slate md:col-span-4 md:text-right lg:col-span-3">
            {entree.auteur}
            <br />
            {entree.role}, {entree.societe}
          </p>
        </Reveal>
      ))}
    </ul>
  );
}
