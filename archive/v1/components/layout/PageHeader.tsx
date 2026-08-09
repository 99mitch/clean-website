import { Breadcrumbs } from '@/components/content/Cards';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';

/**
 * En-tête de page interne.
 *
 * Même registre que le hero d'accueil : fond blanc, grille orthogonale,
 * filets d'un pixel, monospace sur les libellés. Le filet plein sous le fil
 * d'Ariane reprend celui qui coiffe le plan de cadence — c'est ce qui relie
 * les quinze gabarits entre eux, à la place de l'ancienne arête.
 */
export function PageHeader({
  eyebrow,
  titre,
  intro,
  breadcrumbs,
  children,
}: {
  eyebrow: string;
  titre: string;
  intro?: string;
  breadcrumbs?: Array<{ name: string; url: string }>;
  children?: React.ReactNode;
}) {
  return (
    <section className="border-b border-steel/25 pb-14 pt-10 lg:pb-20 lg:pt-14">
      <Container>
        <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 border-b border-ink pb-3">
          <p className="eyebrow text-ink">{eyebrow}</p>
          {breadcrumbs ? <Breadcrumbs items={breadcrumbs} /> : null}
        </div>

        <Reveal className="mt-10">
          <h1 className="max-w-[18ch] text-40 tracking-[-0.055em] lg:text-64">
            {titre}
          </h1>
          {intro ? (
            <p className="measure mt-6 max-w-[52ch] text-17 text-slate">{intro}</p>
          ) : null}
          {children}
        </Reveal>
      </Container>
    </section>
  );
}
