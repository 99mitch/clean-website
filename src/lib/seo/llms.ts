import { absoluteUrl, site } from '@/config/site';
import { home } from '@/copy/home';
import { quiSommesNous } from '@/copy/pages';
import { getArticles, getSecteurs, getServices } from '@/lib/content';

/**
 * GEO — `llms.txt` (https://llmstxt.org) : un résumé Markdown de l'entreprise
 * et de ses pages, pour que les moteurs de réponse (ChatGPT, Claude,
 * Perplexity, AI Overviews) décrivent l'entreprise avec ses propres mots.
 * Tout est tiré du contenu validé : aucune donnée ajoutée ici.
 */

const lien = (titre: string, path: string, note?: string) =>
  `- [${titre}](${absoluteUrl(path)})${note ? `: ${note}` : ''}`;

function faits(): string[] {
  const { localisation } = site;
  return [
    `- Activité : nettoyage professionnel et services associés, pour les entreprises, copropriétés, sites industriels et établissements recevant du public.`,
    `- Siège : ${localisation.ville}, ${localisation.quartier} (${localisation.codePostal}).`,
    `- Zone d'intervention : ${site.zoneIntervention ?? localisation.region}.`,
    `- Méthode : un protocole écrit et vérifiable pour chaque intervention, chaque passage daté et documenté.`,
    `- Devis : parcours en cinq questions (type de local, surface, fréquence, prestations, coordonnées) sur ${absoluteUrl('/devis')}.`,
    ...(site.telephone ? [`- Téléphone : ${site.telephone}`] : []),
    ...(site.emailContact ? [`- Email : ${site.emailContact}`] : []),
  ];
}

export async function llmsTxt(): Promise<string> {
  const [services, secteurs, articles] = await Promise.all([
    getServices(),
    getSecteurs(),
    getArticles(),
  ]);

  return [
    `# ${site.nom}`,
    '',
    `> ${site.description}`,
    '',
    ...faits(),
    '',
    '## Prestations',
    '',
    ...services.map((s) => lien(s.meta.title, `/services/${s.meta.slug}`, s.meta.excerpt)),
    '',
    "## Secteurs d'activité",
    '',
    ...secteurs.map((s) => lien(s.meta.title, `/secteurs/${s.meta.slug}`, s.meta.excerpt)),
    '',
    "## L'entreprise",
    '',
    lien('Qui sommes-nous', '/qui-sommes-nous', quiSommesNous.intro),
    lien('Demander un devis', '/devis', home.hero.texte),
    lien('Contact', '/contact'),
    '',
    ...(articles.length > 0
      ? [
          '## Ressources',
          '',
          ...articles.map((a) => lien(a.meta.title, `/blog/${a.meta.slug}`, a.meta.excerpt)),
          '',
        ]
      : []),
    '## Optional',
    '',
    lien('Contenu complet du site', '/llms-full.txt', 'toutes les pages prestations, secteurs et ressources en texte brut'),
    '',
  ].join('\n');
}

/** Retire les composants MDX éventuels : le texte seul intéresse un modèle. */
function texte(body: string): string {
  return body.replace(/<[A-Z][^>]*\/>/g, '').trim();
}

export async function llmsFullTxt(): Promise<string> {
  const [services, secteurs, articles] = await Promise.all([
    getServices(),
    getSecteurs(),
    getArticles(),
  ]);

  const blocs: string[] = [
    `# ${site.nom}`,
    '',
    `> ${site.description}`,
    '',
    ...faits(),
    '',
    `## Qui sommes-nous`,
    '',
    `Source : ${absoluteUrl('/qui-sommes-nous')}`,
    '',
    quiSommesNous.titre,
    '',
    quiSommesNous.intro,
    '',
    quiSommesNous.presentation,
    '',
    ...quiSommesNous.histoire.flatMap((p) => [p, '']),
    ...quiSommesNous.sections.flatMap((s) => [`### ${s.titre}`, '', s.texte, '']),
  ];

  for (const s of services) {
    blocs.push(
      `## Prestation — ${s.meta.title}`,
      '',
      `Source : ${absoluteUrl(`/services/${s.meta.slug}`)}`,
      '',
      s.meta.excerpt,
      '',
      texte(s.body),
      '',
      'Ce qui est inclus :',
      '',
      ...s.meta.prestations.map((p) => `- ${p}`),
      '',
    );
  }

  for (const s of secteurs) {
    blocs.push(
      `## Secteur — ${s.meta.title}`,
      '',
      `Source : ${absoluteUrl(`/secteurs/${s.meta.slug}`)}`,
      '',
      s.meta.excerpt,
      '',
      texte(s.body),
      '',
      'Contraintes traitées :',
      '',
      ...s.meta.enjeux.map((e) => `- ${e}`),
      '',
      ...s.meta.faq.flatMap((f) => [`### ${f.question}`, '', f.reponse, '']),
    );
  }

  for (const a of articles) {
    blocs.push(
      `## Ressource — ${a.meta.title}`,
      '',
      `Source : ${absoluteUrl(`/blog/${a.meta.slug}`)} (${a.meta.date})`,
      '',
      texte(a.body),
      '',
    );
  }

  return blocs.join('\n');
}
