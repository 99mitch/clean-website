import type { Metadata } from 'next';
import Image from 'next/image';
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

/**
 * Dégradé des quatre cartes « Pourquoi nous » : du bleu clair (mist) au cobalt
 * plein, via des mélanges des tokens. Texte encre sur les deux premières,
 * papier sur les deux dernières (contraste ≥ 4,5:1 vérifié).
 */
const DEGRADE_POURQUOI = [
  'bg-mist text-ink',
  'bg-[color-mix(in_oklab,var(--color-cobalt)_35%,var(--color-mist))] text-ink',
  'bg-[color-mix(in_oklab,var(--color-cobalt)_75%,var(--color-mist))] text-paper',
  'bg-cobalt text-paper',
] as const;

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
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {home.pourquoiNous.points.map((point, index) => (
            <Reveal
              as="article"
              key={point.titre}
              delay={index * 60}
              className={`flex flex-col p-8 ${DEGRADE_POURQUOI[index] ?? DEGRADE_POURQUOI[3]}`}
            >
              <p className="font-mono text-13 opacity-70">
                {String(index + 1).padStart(2, '0')}
              </p>
              <h3 className="mt-6 text-21 leading-tight">{point.titre}</h3>
              <p className="mt-4 text-15 leading-relaxed opacity-80">{point.texte}</p>
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
 * Retour clients — n'affiche que des avis validés par écrit (§0). Trois cartes
 * verticales : note en étoiles, citation, puis signature abrégée (prénom +
 * initiale du nom) en monospace.
 */
function RetourClients() {
  const avis = site.avisClients.slice(0, 3);

  if (avis.length === 0) {
    return <PendingData label={home.retourClients.vide} className="mt-12" />;
  }

  return (
    <ul className="mt-12 grid list-none gap-4 md:grid-cols-3">
      {avis.map((entree, index) => (
        <Reveal
          as="li"
          key={entree.auteur}
          delay={index * 60}
          className="flex flex-col border border-ink p-8"
        >
          <Etoiles note={entree.note} id={`avis-${index}`} />
          <p className="mt-6 text-17 leading-relaxed text-ink">« {entree.citation} »</p>
          <p className="mt-auto pt-8 font-mono text-13 uppercase tracking-[0.1em] text-slate">
            {abregerNom(entree.auteur)}
            <br />
            <span className="normal-case tracking-normal">{entree.role}</span>
          </p>
        </Reveal>
      ))}
    </ul>
  );
}

/** « Camille Fabre » → « Camille F. » */
function abregerNom(nom: string): string {
  const [prenom, ...reste] = nom.trim().split(/\s+/);
  const initiale = reste.at(-1)?.charAt(0);
  return initiale ? `${prenom} ${initiale}.` : prenom;
}

/** Note sur 5 rendue en étoiles pleines / demi / vides, avec texte alternatif. */
function Etoiles({ note, id }: { note: number; id: string }) {
  const etoiles = Array.from({ length: 5 }, (_, i) => {
    const reste = note - i;
    return reste >= 1 ? 1 : reste >= 0.5 ? 0.5 : 0;
  });

  return (
    <p className="flex items-center gap-2" aria-label={`Note : ${note} sur 5`}>
      <span className="flex gap-0.5" aria-hidden="true">
        {etoiles.map((valeur, i) => (
          <svg key={i} viewBox="0 0 20 20" className="h-4 w-4 text-cobalt">
            <defs>
              <clipPath id={`${id}-demi-${i}`}>
                <rect x="0" y="0" width="10" height="20" />
              </clipPath>
            </defs>
            <path
              d="M10 1.5l2.6 5.5 6 .7-4.4 4.1 1.2 5.9L10 14.8l-5.4 2.9 1.2-5.9L1.4 7.7l6-.7z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.3"
            />
            {valeur > 0 && (
              <path
                d="M10 1.5l2.6 5.5 6 .7-4.4 4.1 1.2 5.9L10 14.8l-5.4 2.9 1.2-5.9L1.4 7.7l6-.7z"
                fill="currentColor"
                clipPath={valeur === 0.5 ? `url(#${id}-demi-${i})` : undefined}
              />
            )}
          </svg>
        ))}
      </span>
      <span className="font-mono text-13 text-slate" aria-hidden="true">
        {note.toString().replace('.', ',')}/5
      </span>
    </p>
  );
}
