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

  /** Validé par le client (dossier du 25/09/2026). */
  zoneIntervention: 'Île-de-France' as string | null,
  /**
   * Localisation du siège, validée par le client (dossier du 25/09/2026) :
   * « en plein cœur du 14e arrondissement de Paris ». La rue reste à
   * renseigner dans `adresseSiege`.
   */
  localisation: {
    quartier: '14e arrondissement',
    ville: 'Paris',
    codePostal: '75014',
    region: 'Île-de-France',
    pays: 'FR',
  },
  /**
   * Présentation factuelle de l'entreprise, en une phrase : sert au JSON-LD,
   * à `llms.txt` et aux descriptions par défaut. Rien qui ne soit dans le
   * dossier client.
   */
  description:
    'Entreprise de nettoyage professionnel basée à Paris 14e, intervenant dans toute l’Île-de-France : entretien régulier, remise en état, vitrerie et services associés, avec un protocole écrit et vérifiable pour chaque intervention.',
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

  /**
   * ⚠️ CONTENU FICTIF — demandé explicitement pour visualiser la mise en
   * page (session du 22/08/2026), au mépris de la règle §0 du CLAUDE.md et
   * de l'interdiction légale des faux avis clients (Code de la consommation,
   * art. L. 111-7-2). À REMPLACER par de vrais avis, validés par écrit par
   * chaque client, avant toute mise en production réelle.
   */
  avisClients: [
    {
      citation:
        'Le passage est régulier et le référent répond le jour même. On n’a plus besoin de relancer.',
      auteur: 'Camille Fabre',
      role: 'Office manager',
      societe: 'Groupe Meridian',
      note: 4.5,
    },
    {
      citation:
        'Planning affiché, locaux poubelles impeccables : les résidents ont arrêté d’appeler le syndic pour ça.',
      auteur: 'Karim Belhadj',
      role: 'Gestionnaire d’immeuble',
      societe: 'Cabinet Vasseur & Associés',
      note: 4.5,
    },
    {
      citation:
        'Protocole écrit, fiches de traçabilité à jour : le dossier était prêt avant même le contrôle.',
      auteur: 'Sophie Renard',
      role: 'Responsable d’établissement',
      societe: 'Cabinet médical du Belvédère',
      note: 4.5,
    },
  ] as Array<{
    citation: string;
    auteur: string;
    role: string;
    societe: string;
    /** Note sur 5, par demi-point. */
    note: number;
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
