import type { Metadata } from 'next';
import Image from 'next/image';
import { Breadcrumbs } from '@/components/content/Ledger';
import { BandeauSurface } from '@/components/materiaux/Echantillonnier';
import { JsonLd } from '@/components/seo/JsonLd';
import { ButtonLink } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { Section, SectionHead } from '@/components/ui/Section';
import { telHref } from '@/config/site';
import { quiSommesNous as copy } from '@/copy/pages';
import { bandeauParRubrique } from '@/lib/materiaux';
import { PHOTO_EQUIPE } from '@/lib/photos';
import { breadcrumbLd, faqLd } from '@/lib/seo/jsonld';
import { pageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = pageMetadata({
  title: copy.meta.title,
  description: copy.meta.description,
  path: '/qui-sommes-nous',
});

/**
 * Page de présentation, du constat à l'appel au devis : hero (photo de
 * l'équipe et fiche de passage), comparatif problème / réponse, engagements
 * chiffrés, valeurs, étapes de démarrage, FAQ, appel final.
 */
export default function QuiSommesNousPage() {
  const fil = [
    { name: 'Accueil', url: '/' },
    { name: 'Qui sommes-nous', url: '/qui-sommes-nous' },
  ];
  const tel = telHref();

  return (
    <>
      <Hero fil={fil} tel={tel} />
      <Comparatif />
      <Chiffres />
      <Valeurs />
      <Etapes />
      <Faq />
      <Appel tel={tel} />

      <JsonLd data={breadcrumbLd(fil)} />
      <JsonLd data={faqLd(copy.faq.items)} />
    </>
  );
}

function Hero({ fil, tel }: { fil: Array<{ name: string; url: string }>; tel: string | null }) {
  return (
    <section className="bg-paper">
      <BandeauSurface mat={bandeauParRubrique.entreprise ?? 'beton'} />

      <Container className="pb-16 pt-8 sm:pt-10 lg:pb-24 lg:pt-14">
        <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 border-t-2 border-ink pt-3">
          <p className="eyebrow text-ink">{copy.eyebrow}</p>
          <Breadcrumbs items={fil} />
        </div>

        <div className="mt-10 grid items-center gap-x-14 gap-y-12 lg:mt-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-6">
            <h1 className="max-w-[16ch] text-40 tracking-[-0.055em] text-balance lg:text-64">
              {copy.titre}
            </h1>
            <p className="measure mt-6 max-w-[52ch] text-17 text-slate sm:text-21">{copy.intro}</p>
            <p className="mt-5 font-medium text-ink">{copy.zone}</p>
            <div className="mt-8 grid gap-3 sm:flex sm:flex-wrap">
              <ButtonLink href="/devis" variant="devis" size="lg">
                {copy.boutons.devis}
              </ButtonLink>
              {tel ? (
                <ButtonLink href={tel} variant="outline" size="lg">
                  {copy.boutons.appeler}
                </ButtonLink>
              ) : null}
            </div>
          </Reveal>

          <Reveal delay={120} className="lg:col-span-6">
            <div className="relative aspect-[1280/854] overflow-hidden rounded-card border border-ink">
              <Image
                src={PHOTO_EQUIPE.src}
                alt={PHOTO_EQUIPE.alt}
                fill
                preload
                quality={90}
                sizes="(min-width: 1024px) 50vw, calc(100vw - 48px)"
                className="object-cover"
              />
            </div>
            <FichePassage />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

/** Fiche de passage d'exemple, posée en biais sur le bas de la photo. */
function FichePassage() {
  const { fiche } = copy;
  return (
    <div
      role="group"
      aria-label={fiche.label}
      className="relative -mt-10 ml-auto w-[94%] rotate-[1.5deg] rounded-card border border-ink/15 bg-white p-5 shadow-[0_18px_40px_-22px_rgba(22,70,122,0.55)] sm:-mt-16 sm:w-[82%] sm:p-6"
    >
      <div className="flex items-baseline justify-between gap-4 border-b-2 border-dashed border-ink/15 pb-3">
        <strong className="font-display text-21 tracking-[-0.03em] text-cobalt">{fiche.titre}</strong>
        <span className="whitespace-nowrap font-mono text-13 text-slate">{fiche.date}</span>
      </div>
      <ul className="mt-2">
        {fiche.lignes.map((ligne) => (
          <li
            key={ligne.tache}
            className="grid grid-cols-[1.5rem_1fr_auto] items-start gap-3 border-b border-ink/10 py-2.5 text-15 last:border-b-0"
          >
            <Coche />
            <span>{ligne.tache}</span>
            <span className="whitespace-nowrap font-mono text-13 text-slate tabular-nums">{ligne.heure}</span>
          </li>
        ))}
      </ul>
      <div className="mt-3 flex flex-wrap items-center justify-between gap-3 text-15 text-slate">
        <span>{fiche.produits}</span>
        <span className="rounded-chip bg-cobalt px-2.5 py-1 font-medium text-white">{fiche.termine}</span>
      </div>
    </div>
  );
}

function Coche() {
  return (
    <span aria-hidden="true" className="mt-0.5 grid h-5 w-5 place-items-center rounded-full bg-cobalt">
      <svg viewBox="0 0 12 12" fill="none" stroke="#fff" strokeWidth="2" className="h-3 w-3">
        <path d="M2 6.5 5 9l5-6" />
      </svg>
    </span>
  );
}

/** Problème vécu à gauche, notre réponse à droite ; empilés sur mobile. */
function Comparatif() {
  const { comparatif } = copy;
  return (
    <Section tone="white" labelledBy="comparatif-titre">
      <SectionHead id="comparatif-titre" title={comparatif.titre} intro={comparatif.intro} tone="white" />

      <Reveal className="mt-12 overflow-hidden rounded-card border border-ink/15">
        <div aria-hidden="true" className="hidden grid-cols-2 bg-mist font-mono text-13 uppercase tracking-[0.12em] sm:grid">
          <div className="px-7 py-4 text-slate">{comparatif.colonnes.probleme}</div>
          <div className="border-l border-ink/15 px-7 py-4 text-cobalt">{comparatif.colonnes.reponse}</div>
        </div>
        {comparatif.lignes.map((ligne) => (
          <div key={ligne.probleme.titre} className="grid border-t border-ink/15 sm:grid-cols-2">
            <div className="px-6 pb-3 pt-6 sm:px-7 sm:py-6">
              <h3 className="text-17 text-ink sm:text-21">
                <span className="mb-1.5 block font-mono text-13 uppercase tracking-[0.12em] text-slate sm:sr-only">{comparatif.prefixes.probleme}</span>
                {ligne.probleme.titre}
              </h3>
              <p className="mt-1.5 text-15 text-slate">{ligne.probleme.texte}</p>
            </div>
            <div className="bg-mist/45 px-6 pb-6 pt-3 sm:border-l sm:border-ink/15 sm:px-7 sm:py-6">
              <h3 className="text-17 text-cobalt sm:text-21">
                <span className="mb-1.5 block font-mono text-13 uppercase tracking-[0.12em] sm:sr-only">{comparatif.prefixes.reponse}</span>
                {ligne.reponse.titre}
              </h3>
              <p className="mt-1.5 text-15 text-ink">{ligne.reponse.texte}</p>
            </div>
          </div>
        ))}
      </Reveal>
    </Section>
  );
}

/** Engagements contractuels chiffrés (`site.delais`, préavis) : rien d'inventé. */
function Chiffres() {
  return (
    <section aria-label={copy.chiffresLabel} className="on-dark bg-cobalt text-paper">
      <Container>
        <dl className="grid grid-cols-2 lg:grid-cols-4">
          {copy.chiffres.map((chiffre, index) => (
            <Reveal
              key={chiffre.label}
              delay={index * 60}
              className={`flex flex-col-reverse justify-end py-9 pr-4 sm:py-12 ${index % 2 === 1 ? 'border-l border-paper/25 pl-5 sm:pl-8' : ''} ${
                index >= 2 ? 'border-t border-paper/25 lg:border-t-0' : ''
              } ${index === 2 ? 'lg:border-l lg:border-paper/25 lg:pl-8' : ''}`}
            >
              {/* dt avant dd dans le DOM ; la valeur reste affichée en tête. */}
              <dt className="mt-3 text-15 text-paper/85 sm:text-17">{chiffre.label}</dt>
              <dd className="font-mono text-40 leading-none text-white lg:text-64">{chiffre.valeur}</dd>
            </Reveal>
          ))}
        </dl>
      </Container>
    </section>
  );
}

function Valeurs() {
  const { valeurs } = copy;
  return (
    <Section labelledBy="valeurs-titre">
      <SectionHead id="valeurs-titre" title={valeurs.titre} />
      <div className="mt-12 grid gap-x-14 gap-y-10 md:grid-cols-2">
        {valeurs.items.map((valeur, index) => (
          <Reveal key={valeur.titre} delay={index * 60} className="border-l-4 border-cobalt pl-5">
            <h3 className="text-21">{valeur.titre}</h3>
            <p className="measure mt-2 text-17 text-slate">{valeur.texte}</p>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function Etapes() {
  const { etapes } = copy;
  return (
    <Section surface="bg-mist text-ink" labelledBy="etapes-titre">
      <SectionHead id="etapes-titre" title={etapes.titre} />
      <ol className="mt-12 grid list-none gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {etapes.items.map((etape, index) => (
          <Reveal
            as="li"
            key={etape.titre}
            delay={index * 60}
            className="rounded-card border border-ink/10 bg-white p-6"
          >
            <span
              aria-hidden="true"
              className="grid h-10 w-10 place-items-center rounded-full bg-cobalt font-mono text-15 text-white"
            >
              {String(index + 1).padStart(2, '0')}
            </span>
            <h3 className="mt-5 text-21">{etape.titre}</h3>
            <p className="mt-2 text-15 text-slate">{etape.texte}</p>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}

function Faq() {
  const { faq } = copy;
  return (
    <Section tone="white" labelledBy="faq-titre">
      <SectionHead id="faq-titre" title={faq.titre} tone="white" />
      <div className="mt-10 max-w-[48rem] border-t border-ink/15">
        {faq.items.map((item) => (
          <details key={item.question} className="group border-b border-ink/15">
            <summary className="relative flex min-h-11 cursor-pointer list-none items-center py-5 pr-10 text-17 font-medium text-ink [&::-webkit-details-marker]:hidden">
              {item.question}
              <span
                aria-hidden="true"
                className="absolute right-1 top-1/2 -translate-y-1/2 font-mono text-28 leading-none text-cobalt transition-transform duration-200 group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <p className="measure pb-5 text-17 text-slate">{item.reponse}</p>
          </details>
        ))}
      </div>
    </Section>
  );
}

function Appel({ tel }: { tel: string | null }) {
  return (
    <Section>
      <Reveal className="on-dark grid items-center gap-8 rounded-card bg-cobalt p-8 text-paper sm:p-12 lg:grid-cols-12 lg:p-14">
        <div className="lg:col-span-7">
          <h2 className="text-28 lg:text-40">{copy.appel.titre}</h2>
          <p className="mt-4 max-w-[48ch] text-17 text-paper/85">{copy.appel.texte}</p>
        </div>
        <div className="grid gap-3 sm:flex sm:flex-wrap lg:col-span-5 lg:justify-end">
          <ButtonLink href="/devis" variant="paper" size="lg">
            {copy.boutons.devis}
          </ButtonLink>
          {tel ? (
            <ButtonLink href={tel} variant="adaptive" size="lg">
              {copy.boutons.appeler}
            </ButtonLink>
          ) : null}
        </div>
      </Reveal>
    </Section>
  );
}
