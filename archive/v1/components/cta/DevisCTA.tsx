import { ButtonLink } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { cta } from '@/copy/common';

/**
 * Chemin évident vers /devis, présent sur chaque page (§13-6).
 * `service` et `secteur` pré-remplissent le parcours et sautent l'étape
 * correspondante (§7).
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
    <section className="on-dark hatch-dark bg-ink py-20 text-white lg:py-24">
      <Container>
        <Reveal className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-[46ch]">
            <p className="eyebrow text-white/60">{cta.eyebrow}</p>
            <h2 className="mt-4 text-28 lg:text-40">{titre ?? cta.titre}</h2>
            <p className="mt-5 text-17 text-white/75">{cta.texte}</p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-4">
            <ButtonLink href={href} variant="devis" size="lg">
              {cta.bouton}
            </ButtonLink>
            <ButtonLink href="/contact" size="lg" variant="adaptive">
              {cta.secondaire}
            </ButtonLink>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
