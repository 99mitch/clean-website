/**
 * Photographies du site, chemin et texte alternatif. Partagées entre les
 * pages et les images de partage (Open Graph) : une photo ajoutée ici apparaît
 * aux deux endroits.
 */
export type Photo = { src: string; alt: string };

export const PHOTO_HERO: Photo = {
  src: '/images/hero-agent-nettoyage.png',
  alt: 'Agent de propreté intervenant avec une autolaveuse dans un hall tertiaire vitré',
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
  'services-associes': {
    src: '/images/services/services-associes.png',
    alt: 'Agent balayant des gravats sur un chantier en fin de travaux',
  },
};

export const PHOTO_PAR_SECTEUR: Record<string, Photo> = {
  bureaux: {
    src: '/images/secteurs/bureaux.png',
    alt: 'Collaboratrice travaillant à son poste dans un bureau ouvert',
  },
  medical: {
    src: '/images/secteurs/medical.png',
    alt: 'Personnel de laboratoire en blouse examinant un prélèvement',
  },
  industrie: {
    src: '/images/secteurs/industrie.png',
    alt: 'Caristes manipulant des palettes dans un entrepôt logistique',
  },
  'immeubles-coproprietes': {
    src: '/images/secteurs/immeubles-coproprietes.png',
    alt: 'Façades d’immeubles haussmanniens en copropriété',
  },
  'infrastructures-publiques': {
    src: '/images/secteurs/infrastructures-publiques.png',
    alt: 'Cour intérieure d’un établissement recevant du public',
  },
};
