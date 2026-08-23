import { Breadcrumbs } from '@/components/content/Ledger';
import { BandeauSurface } from '@/components/materiaux/Echantillonnier';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { bandeauParRubrique } from '@/lib/materiaux';

/**
 * En-tête de rubrique — la chemise du dossier.
 *
 * Un bandeau de revêtement de 8px identifie la rubrique, puis le filet plein,
 * le libellé monospace et le fil d'Ariane sur la même ligne. C'est la même
 * structure sur les quinze gabarits : c'est ce qui tient le site ensemble,
 * sans effet visuel.
 */
export function PageHeader({
  rubrique,
  label,
  titre,
  intro,
  breadcrumbs,
  centre = false,
  children,
}: {
  /** Clé de `bandeauParRubrique` — choisit le revêtement du bandeau. */
  rubrique?: keyof typeof bandeauParRubrique | string;
  label: string;
  titre: string;
  intro?: string;
  breadcrumbs?: Array<{ name: string; url: string }>;
  /** Titre et intro centrés l'un sous l'autre, au lieu de la grille titre/intro. */
  centre?: boolean;
  children?: React.ReactNode;
}) {
  const mat = bandeauParRubrique[rubrique ?? 'entreprise'] ?? 'beton';

  return (
    <section className="bg-paper">
      <BandeauSurface mat={mat} />

      <Container className="pb-16 pt-10 lg:pb-24 lg:pt-14">
        <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 border-t-2 border-ink pt-3">
          <p className="eyebrow text-ink">{label}</p>
          {breadcrumbs ? <Breadcrumbs items={breadcrumbs} /> : null}
        </div>

        {centre ? (
          <Reveal className="mt-10 flex flex-col items-center text-center">
            <h1 className="max-w-[22ch] text-40 tracking-[-0.055em] lg:text-64">{titre}</h1>

            {intro ? (
              <div className="mt-6 max-w-[54ch]">
                <p className="measure mx-auto text-17 text-slate">{intro}</p>
                {children}
              </div>
            ) : (
              children
            )}
          </Reveal>
        ) : (
          <Reveal className="mt-10 grid gap-x-10 gap-y-6 lg:grid-cols-12">
            <h1 className="max-w-[16ch] text-40 tracking-[-0.055em] lg:col-span-7 lg:text-64">
              {titre}
            </h1>

            {intro ? (
              <div className="lg:col-span-5 lg:self-end">
                <p className="measure max-w-[46ch] text-17 text-slate">{intro}</p>
                {children}
              </div>
            ) : (
              children
            )}
          </Reveal>
        )}
      </Container>
    </section>
  );
}
