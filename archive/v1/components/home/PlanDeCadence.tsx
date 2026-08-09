import { home } from '@/copy/home';

/**
 * Plan de cadence — pièce maîtresse du hero.
 *
 * Ce n'est pas une illustration : c'est la forme réelle d'un plan de
 * prestation, et elle énonce la thèse du site avant le premier paragraphe —
 * la fréquence se décide zone par zone, pas au forfait.
 *
 * Rendu comme un vrai `<table>` : la structure est lue correctement par les
 * lecteurs d'écran, avec un résumé explicite en `<caption>`. Aucune image,
 * aucun JavaScript.
 */
export function PlanDeCadence() {
  const copy = home.hero.cadence;

  return (
    <figure className="m-0">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-ink pb-3">
        <h2 className="eyebrow text-ink">{copy.titre}</h2>
        <p className="font-mono text-13 text-slate">{copy.exemple}</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[34rem] border-collapse text-left">
          <caption className="sr-only">{copy.resume}</caption>
          <thead>
            <tr>
              <th scope="col" className="w-[38%] py-3 pr-4 text-15 font-normal text-slate">
                <span className="sr-only">Zone</span>
              </th>
              {copy.jours.map((jour) => (
                <th
                  key={jour}
                  scope="col"
                  className="py-3 text-center font-mono text-13 font-normal uppercase tracking-[0.08em] text-slate"
                >
                  {jour}
                </th>
              ))}
              <th
                scope="col"
                className="w-[16%] py-3 pl-4 text-right font-mono text-13 font-normal uppercase tracking-[0.08em] text-slate"
              >
                cadence
              </th>
            </tr>
          </thead>

          <tbody>
            {copy.zones.map((zone) => (
              <tr key={zone.nom} className="border-t border-steel/30">
                <th scope="row" className="py-4 pr-4 text-17 font-normal text-ink">
                  {zone.nom}
                </th>

                {zone.passages.map((passage, index) => (
                  <td key={copy.jours[index]} className="px-1 py-4">
                    <span
                      className={
                        passage
                          ? 'block h-7 w-full bg-ink'
                          : 'block h-7 w-full border border-steel/35 bg-frost'
                      }
                    >
                      <span className="sr-only">
                        {passage ? copy.passageOui : copy.passageNon}
                      </span>
                    </span>
                  </td>
                ))}

                <td className="py-4 pl-4 text-right font-mono text-15 tabular-nums text-ink">
                  {zone.frequence}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <figcaption className="measure mt-6 text-15 text-slate">
        {copy.note}
      </figcaption>
    </figure>
  );
}
