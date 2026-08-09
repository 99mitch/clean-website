import { PendingData } from '@/components/ui/PendingData';
import { Reveal } from '@/components/ui/Reveal';
import { site } from '@/config/site';

type Bloc = { titre: string; paragraphes: string[]; champs?: string[] };

/**
 * Rendu des pages légales. Les identités juridiques non renseignées (§0)
 * apparaissent comme des emplacements en attente, jamais comme du texte inventé.
 */
export function LegalSections({ blocs }: { blocs: Bloc[] }) {
  return (
    <div className="measure">
      {blocs.map((bloc, index) => (
        <Reveal key={bloc.titre} delay={index * 40} className="mt-12 first:mt-0">
          <h2 className="text-21">{bloc.titre}</h2>
          {bloc.paragraphes.map((paragraphe) => (
            <p key={paragraphe} className="mt-4 text-17 text-slate">
              {paragraphe}
            </p>
          ))}
          {bloc.champs ? <LegalFields champs={bloc.champs} /> : null}
        </Reveal>
      ))}
    </div>
  );
}

function LegalFields({ champs }: { champs: string[] }) {
  const valeurs: Record<string, string | null> = {
    RAISON_SOCIALE: site.legal.raisonSociale,
    FORME_JURIDIQUE: site.legal.formeJuridique,
    CAPITAL: site.legal.capital,
    SIRET: site.legal.siret,
    RCS: site.legal.rcs,
    TVA: site.legal.tva,
    TELEPHONE: site.telephone,
    EMAIL_CONTACT: site.emailContact,
    DIRECTEUR_PUBLICATION: site.legal.directeurPublication,
    ADRESSE_SIEGE: site.adresseSiege
      ? `${site.adresseSiege.rue}, ${site.adresseSiege.codePostal} ${site.adresseSiege.ville}`
      : null,
  };

  const renseignes = champs.filter((champ) => valeurs[champ]);
  const manquants = champs.filter((champ) => !valeurs[champ]);

  return (
    <>
      {renseignes.length > 0 ? (
        <dl className="mt-6 space-y-2 font-mono text-13">
          {renseignes.map((champ) => (
            <div key={champ} className="flex flex-wrap gap-x-3">
              <dt className="text-slate">{champ.replaceAll('_', ' ').toLowerCase()}</dt>
              <dd className="text-ink">{valeurs[champ]}</dd>
            </div>
          ))}
        </dl>
      ) : null}
      {manquants.length > 0 ? (
        <PendingData label={manquants.join(' · ')} className="mt-6" />
      ) : null}
    </>
  );
}
