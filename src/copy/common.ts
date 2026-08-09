import { frenchify } from '@/lib/typo';

/** Aucune chaîne en dur dans un composant (§11) — tout passe par ici. */
export const nav = frenchify({
  skipToContent: 'Aller au contenu principal',
  primaryLabel: 'Navigation principale',
  footerLabel: 'Navigation de pied de page',
  openMenu: 'Ouvrir le menu',
  closeMenu: 'Fermer le menu',
  devis: 'Demander un devis',
  appeler: 'Appeler',
  /** Libellé du lien « voir toute la rubrique » en pied de menu. */
  voirTout: 'Vue d’ensemble',

  /**
   * Trois groupes plutôt que sept liens à plat. Les deux premiers sont
   * alimentés par le contenu MDX — un service ajouté apparaît au menu sans
   * qu'on y touche. Le troisième est fixe : ce sont des pages uniques.
   */
  groupes: {
    services: {
      label: 'Prestations',
      href: '/services',
      aide: 'Ce que nous faisons, et comment c’est défini au contrat.',
    },
    secteurs: {
      label: 'Secteurs',
      href: '/secteurs',
      aide: 'Les contraintes changent selon le type de site.',
    },
    entreprise: {
      label: 'L’entreprise',
      href: '/qui-sommes-nous',
      aide: 'Qui intervient, sur quoi nous nous engageons, ce qu’on peut vérifier.',
      links: [
        { href: '/qui-sommes-nous', label: 'Qui sommes-nous' },
        { href: '/engagements', label: 'Engagements' },
        { href: '/engagements/certifications', label: 'Certifications' },
        { href: '/references', label: 'Références' },
        { href: '/blog', label: 'Ressources' },
        { href: '/recrutement', label: 'Recrutement' },
        { href: '/contact', label: 'Contact' },
      ],
    },
  },
});

export const footer = frenchify({
  colonnes: [
    {
      titre: 'Prestations',
      links: [
        { href: '/services', label: 'Toutes les prestations' },
        { href: '/secteurs', label: 'Tous les secteurs' },
        { href: '/references', label: 'Études de cas' },
      ],
    },
    {
      titre: 'Entreprise',
      links: [
        { href: '/qui-sommes-nous', label: 'Qui sommes-nous' },
        { href: '/engagements', label: 'Engagements' },
        { href: '/engagements/certifications', label: 'Certifications' },
        { href: '/recrutement', label: 'Recrutement' },
        { href: '/blog', label: 'Ressources' },
      ],
    },
    {
      titre: 'Contact',
      links: [
        { href: '/devis', label: 'Demander un devis' },
        { href: '/contact', label: 'Nous écrire' },
      ],
    },
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
