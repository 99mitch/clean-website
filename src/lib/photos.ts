/**
 * Photographies du site, chemin et texte alternatif. Partagées entre les
 * pages et les images de partage (Open Graph) : une photo ajoutée ici apparaît
 * aux deux endroits.
 *
 * Audit du 27/09/2026 : la photo sans rapport de « Services associés »
 * (gravats) a été retirée ; bureaux et industrie sont conservées à la
 * demande du client, en attendant des photos de l'équipe réelle. Une
 * rubrique sans photo affiche une plaque d'échantillon. N'ajouter ici que des
 * photos de l'équipe réelle en intervention.
 */
export type Photo = {
  src: string;
  alt: string;
  /** Dimensions du fichier source : l'image est affichée dans ses proportions. */
  width?: number;
  height?: number;
};

export const PHOTO_HERO: Photo = {
  src: '/images/hero-agent-nettoyage.png',
  alt: 'Agent de propreté intervenant avec une autolaveuse dans un hall tertiaire vitré',
};

export const PHOTO_EQUIPE: Photo = {
  // Agrandie ×2 (Lanczos + accentuation légère) depuis l'original de 640 px.
  src: '/images/equipe/equipe-clean-bureau.webp',
  alt: 'Agents d’entretien en tenue Clean Bureau, avec chariot, gants et produits, dans un espace de bureaux',
  width: 1280,
  height: 854,
};

export const PHOTO_PAR_SERVICE: Record<string, Photo> = {
  'entretien-regulier': {
    src: '/images/services/entretien-regulier.png',
    alt: 'Agents de propreté lavant les sols d’un hall d’immeuble tertiaire',
  },
  'remise-en-etat': {
    src: '/images/services/remise-en-etat.png',
    alt: 'Agent effectuant une injection-extraction de moquette après travaux',
  },
  vitrerie: {
    src: '/images/services/vitrerie.png',
    alt: 'Agent nettoyant une vitre extérieure à la raclette',
  },
};

export const PHOTO_PAR_SECTEUR: Record<string, Photo> = {
  bureaux: {
    src: '/images/secteurs/bureaux.png',
    width: 677,
    height: 596,
    alt: 'Collaboratrice travaillant à son poste dans un bureau ouvert',
  },
  industrie: {
    src: '/images/secteurs/industrie.png',
    width: 655,
    height: 577,
    alt: 'Caristes manipulant des palettes dans un entrepôt logistique',
  },
  'immeubles-coproprietes': {
    src: '/images/secteurs/immeubles-coproprietes.png',
    width: 574,
    height: 357,
    alt: 'Façades d’immeubles haussmanniens en copropriété',
  },
  'infrastructures-publiques': {
    src: '/images/secteurs/infrastructures-publiques.png',
    width: 679,
    height: 624,
    alt: 'Cour intérieure d’un établissement recevant du public',
  },
};
