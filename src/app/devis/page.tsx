import type { Metadata } from 'next';
import Link from 'next/link';
import { DevisWizard, type DevisPrefill } from '@/components/devis/DevisWizard';
import { Container } from '@/components/ui/Container';
import { Icon } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';
import { site, telHref } from '@/config/site';
import { devis as copy } from '@/copy/devis';
import { getSecteur, getService } from '@/lib/content';
import { TOTAL_STEPS, type Prestation, type TypeLocal } from '@/lib/devis/schema';
import { pageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = pageMetadata({
  title: copy.meta.title,
  description: copy.meta.description,
  path: '/devis',
  keywords: ['devis nettoyage', 'devis propreté', 'tarif nettoyage bureaux'],
});

type Search = { searchParams: Promise<Record<string, string | string[] | undefined>> };

/**
 * Le pré-remplissage vient de `?service=` / `?secteur=` (§7). Il est résolu
 * côté serveur à partir du contenu MDX : le composant client ne reçoit que
 * des valeurs déjà validées, et l'étape correspondante est sautée.
 */
async function resolvePrefill(
  searchParams: Search['searchParams'],
): Promise<DevisPrefill> {
  const params = await searchParams;
  const first = (value: string | string[] | undefined) =>
    Array.isArray(value) ? value[0] : value;

  const serviceSlug = first(params.service);
  const secteurSlug = first(params.secteur);

  const [service, secteur] = await Promise.all([
    serviceSlug ? getService(serviceSlug) : undefined,
    secteurSlug ? getSecteur(secteurSlug) : undefined,
  ]);

  const skip: number[] = [];
  const draft: DevisPrefill['draft'] = {};

  if (secteur) {
    draft.typeLocal = secteur.meta.devisTypeLocal as TypeLocal;
    skip.push(1);
  }
  if (service?.meta.devisPrestation) {
    draft.prestations = [service.meta.devisPrestation as Prestation];
    skip.push(4);
  }

  const origine = [serviceSlug && `service:${serviceSlug}`, secteurSlug && `secteur:${secteurSlug}`]
    .filter(Boolean)
    .join(' ');

  const step = Number(first(params.step));

  return {
    draft,
    skip,
    origine: origine || undefined,
    step: Number.isInteger(step) && step >= 1 && step <= TOTAL_STEPS ? step : undefined,
  };
}

export default async function DevisPage({ searchParams }: Search) {
  const prefill = await resolvePrefill(searchParams);
  const tel = telHref();

  return (
    <div className="py-14 lg:py-20">
      <Container>
        <Reveal className="max-w-[52ch]">
          <p className="eyebrow text-slate">{copy.entete.eyebrow}</p>
          <h1 className="mt-5 text-40 lg:text-64">{copy.entete.titre}</h1>
          <p className="mt-6 text-17 text-slate">{copy.entete.texte}</p>
        </Reveal>

        <div className="mt-16 max-w-4xl">
          <noscript>
            <p className="mb-8 border-l-2 border-ink bg-mist/60 p-5 text-17">
              {copy.secours.sansJs}{' '}
              <Link href="/contact" className="text-cobalt underline underline-offset-4">
                {copy.secours.lien}
              </Link>
            </p>
          </noscript>
          <DevisWizard prefill={prefill} />
        </div>

        {/* Toujours une issue si le parcours ne fonctionne pas sur un appareil. */}
        <div className="mt-16 max-w-4xl border-t border-graphite/45 pt-6">
          <p className="text-15 text-slate">{copy.secours.texte}</p>
          <div className="mt-3 flex flex-wrap gap-x-8">
            <Link
              href="/contact"
              className="inline-flex min-h-11 items-center gap-2 text-15 text-cobalt underline underline-offset-4 hover:text-signal"
            >
              <Icon name="mail" size={18} />
              {copy.secours.lien}
            </Link>
            {tel ? (
              <a
                href={tel}
                data-analytics="tel_click"
                className="inline-flex min-h-11 items-center gap-2 text-15 text-cobalt hover:text-signal"
              >
                <Icon name="phone" size={18} />
                {site.telephone}
              </a>
            ) : null}
          </div>
        </div>
      </Container>
    </div>
  );
}
