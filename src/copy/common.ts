import { frenchify } from '@/lib/typo';

/** Aucune chaîne en dur dans un composant (§11) — tout passe par ici. */
export const nav = frenchify({
  skipToContent: 'Aller au contenu principal',
  primaryLabel: 'Navigation principale',
  footerLabel: 'Navigation de pied de page',
  openMenu: 'Ouvrir le menu',
  closeMenu: 'Fermer le menu',
  devis: 'Demander un devis',
  contact: 'Nous contacter',
  appeler: 'Appeler',

  /** Liens à plat — une page par titre, aucun menu déroulant. */
  liens: [
    { href: '/', label: 'Accueil' },
    { href: '/services', label: 'Prestations' },
    { href: '/secteurs', label: 'Secteurs d’activité' },
    { href: '/qui-sommes-nous', label: 'Qui sommes-nous' },
  ],
});

export const footer = frenchify({
  /** Mêmes pages que la navbar — un pied de page dense, pas un plan de site. */
  liens: [
    { href: '/', label: 'Accueil' },
    { href: '/services', label: 'Prestations' },
    { href: '/secteurs', label: 'Secteurs d’activité' },
    { href: '/qui-sommes-nous', label: 'Qui sommes-nous' },
    { href: '/contact', label: 'Nous contacter' },
  ],
  legal: [
    { href: '/mentions-legales', label: 'Mentions légales' },
    { href: '/politique-de-confidentialite', label: 'Confidentialité' },
    { href: '/accessibilite', label: 'Accessibilité' },
  ],
  zoneLabel: 'Zone d\'intervention',
  contactLabel: 'Contact',
  copyright: (annee: number, nom: string) => `© ${annee} ${nom}`,
});

export const cta = frenchify({
  eyebrow: 'Passer à l\'action',
  titre: 'Dites-nous ce qu\'il y a à nettoyer, on chiffre.',
  texte:
    'Cinq questions, moins de deux minutes. Vous recevez une proposition chiffrée, pas une brochure.',
  bouton: 'Demander un devis',
  secondaire: 'Nous écrire',
});

export const errors = frenchify({
  notFoundTitre: 'Cette page n\'existe pas',
  notFoundTexte:
    'Le lien est peut-être obsolète. Les prestations et les secteurs sont accessibles depuis le menu.',
  notFoundAction: 'Voir les prestations',
  genericTitre: 'Une erreur est survenue',
  genericTexte:
    'La page n\'a pas pu s\'afficher. Réessayez ; si le problème persiste, contactez-nous directement.',
  genericAction: 'Réessayer',
});
