/**
 * Source unique de vérité pour les données de l'entreprise.
 *
 * RÈGLE ABSOLUE (CLAUDE.md §0) : aucune donnée chiffrée, certification, avis
 * ou logo client en dur tant que le client ne l'a pas validée.
 * Une valeur non renseignée reste `null` — jamais une valeur inventée.
 * Le composant <PendingData /> rend un bloc neutre en dev et rien en prod.
 */

export type Pending = null;

export const site = {
  /** {{À REMPLIR}} */
  nom: 'SPOWCLEAN',
  /** Baseline courte, affichée sous le logo dans le footer. */
  baseline: 'Propreté industrielle & services associés',

  /** {{À REMPLIR}} — ex. « Île-de-France, rayon 50 km autour de Paris » */
  zoneIntervention: null as string | null,
  /** {{À REMPLIR}} */
  adresseSiege: null as {
    rue: string;
    codePostal: string;
    ville: string;
    pays: string;
  } | null,
  /** {{À REMPLIR}} — format +33 1 XX XX XX XX */
  telephone: null as string | null,
  /** {{À REMPLIR}} */
  emailContact: null as string | null,

  /** {{À REMPLIR}} — mentions légales */
  legal: {
    raisonSociale: null as string | null,
    formeJuridique: null as string | null,
    capital: null as string | null,
    siret: null as string | null,
    rcs: null as string | null,
    tva: null as string | null,
    directeurPublication: null as string | null,
  },

  /**
   * {{À REMPLIR}} — ex. https://spowclean.fr
   *
   * Sert aux canoniques, au sitemap et au JSON-LD. Tant que le domaine
   * définitif n'est pas connu, on retombe sur l'URL de production Vercel
   * plutôt que sur un placeholder : mieux vaut une canonique juste sur une
   * URL provisoire qu'une canonique fausse.
   */
  domaine:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : 'https://example.invalid'),

  /**
   * Chiffres clés. `null` = non validé par le client → rien ne s'affiche.
   * Ne JAMAIS remplir sans document source.
   */
  chiffres: {
    anneeCreation: null as number | null,
    nbSalaries: null as number | null,
    nbSitesClients: null as number | null,
    m2TraitesAn: null as number | null,
    tauxSatisfaction: null as number | null,
    /** Délai d'intervention annoncé, en heures. */
    delaiIntervention: null as number | null,
  },

  /**
   * Délai de réponse annoncé dans l'accusé de réception du devis (§7).
   * `null` → l'accusé reste volontairement muet sur le délai.
   */
  delaiReponseHeuresOuvrees: null as number | null,

  /** {{À REMPLIR}} — ne rien afficher si le client n'en détient aucune. */
  certifications: [] as Array<{
    nom: string;
    organisme: string;
    numero?: string;
    obtenue: string;
  }>,

  /** {{À REMPLIR}} — autorisation écrite requise avant affichage. */
  logosClients: [] as Array<{ nom: string; logo: string }>,

  /** {{À REMPLIR}} — avis clients, accord écrit requis avant publication. */
  avisClients: [] as Array<{
    citation: string;
    auteur: string;
    role: string;
    societe: string;
  }>,

  /** Plaquette PDF jointe à l'accusé de réception. `null` tant qu'absente. */
  plaquetteUrl: null as string | null,

  /** Réseaux — uniquement ceux qui existent réellement. */
  reseaux: [] as Array<{ nom: string; url: string }>,
} as const;

/** Téléphone au format `tel:` (E.164 approximé par suppression des espaces). */
export function telHref(): string | null {
  return site.telephone ? `tel:${site.telephone.replace(/[^\d+]/g, '')}` : null;
}

/** URL absolue — canoniques, sitemap, JSON-LD, Open Graph. */
export function absoluteUrl(path = '/'): string {
  return new URL(path, site.domaine).toString();
}
