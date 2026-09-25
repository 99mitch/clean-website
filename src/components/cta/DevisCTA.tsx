import { ButtonLink } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { cta } from '@/copy/common';
import { materiaux } from '@/lib/materiaux';

/**
 * Chemin évident vers /devis, présent sur chaque page (§13-6).
 * `service` et `secteur` pré-remplissent le parcours et sautent l'étape
 * correspondante (§7).
 *
 * La bande est bordée d'une réglette d'échantillons : les douze revêtements
 * défilent en bas de page, rappel discret de ce qui est traité.
 */
export function DevisCTA({
  service,
  secteur,
  titre,
}: {
  service?: string;
  secteur?: string;
  titre?: string;
}) {
  const params = new URLSearchParams();
  if (service) params.set('service', service);
  if (secteur) params.set('secteur', secteur);
  const href = params.size > 0 ? `/devis?${params.toString()}` : '/devis';

  return (
    <section className="on-dark hatch-dark bg-abyss text-paper">
      <Container className="py-20 lg:py-24">
        <Reveal className="grid gap-10 border-t-2 border-paper/80 pt-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="eyebrow text-paper/70">{cta.eyebrow}</p>
            <h2 className="mt-6 max-w-[18ch] text-28 lg:text-40">
              {titre ?? cta.titre}
            </h2>
          </div>

          <div className="flex flex-col justify-end lg:col-span-5">
            <p className="max-w-[42ch] text-17 text-paper/70">{cta.texte}</p>
            <div className="mt-8 grid gap-3 sm:flex sm:flex-wrap">
              <ButtonLink href={href} variant="devis" size="lg">
                {cta.bouton}
              </ButtonLink>
              <ButtonLink href="/contact" size="lg" variant="adaptive">
                {cta.secondaire}
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </Container>

      {/* Réglette des douze revêtements — décor structurel, pas ornemental. */}
      <div
        aria-hidden="true"
        className="grid grid-cols-6 gap-px bg-paper/15 sm:grid-cols-12"
      >
        {materiaux.map((materiau) => (
          <span
            key={materiau.mat}
            className="sample h-3 w-full opacity-70"
            data-mat={materiau.mat}
          />
        ))}
      </div>
    </section>
  );
}
