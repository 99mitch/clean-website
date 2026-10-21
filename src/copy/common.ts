import { site } from '@/config/site';
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
  appelerLabel: (numero: string) => `Nous appeler au ${numero}`,

  /** Liens à plat — une page par titre, aucun menu déroulant. */
  liens: [
    { href: '/', label: 'Accueil' },
    { href: '/services', label: 'Prestations' },
    { href: '/secteurs', label: 'Secteurs' },
    { href: '/qui-sommes-nous', label: 'Qui sommes-nous' },
  ],
});

export const footer = frenchify({
  /** Pages principales, sans l'accueil (le logo y ramène) : pas un plan de site. */
  liens: [
    { href: '/services', label: 'Prestations' },
    { href: '/secteurs', label: 'Secteurs' },
    { href: '/qui-sommes-nous', label: 'Qui sommes-nous' },
    { href: '/blog', label: 'Ressources' },
    { href: '/recrutement', label: 'Nous rejoindre' },
    { href: '/contact', label: 'Contact' },
  ],
  legal: [
    { href: '/mentions-legales', label: 'Mentions légales' },
    { href: '/politique-de-confidentialite', label: 'Confidentialité' },
    { href: '/accessibilite', label: 'Accessibilité' },
  ],
  zone: 'Paris et Île-de-France',
  copyright: (annee: number, nom: string) => `© ${annee} ${nom}`,
});

export const cta = frenchify({
  eyebrow: 'Passer à l\'action',
  titre: 'Dites-nous ce qu\'il y a à nettoyer, nous chiffrons.',
  texte:
    `Cinq questions, moins de deux minutes. Vous recevez une proposition chiffrée sous ${site.delais.devis}.`,
  bouton: 'Demander un devis',
  secondaire: 'Nous contacter',
});

export const errors = frenchify({
  notFoundTitre: 'Cette page n\'existe pas',
  notFoundTexte:
    'Le lien est peut-être obsolète. Les prestations et les secteurs sont accessibles depuis le menu.',
  notFoundAction: 'Voir les prestations',
  notFoundAccueil: 'Retour à l\'accueil',
  genericTitre: 'Une erreur est survenue',
  genericTexte:
    'La page n\'a pas pu s\'afficher. Réessayez ; si le problème persiste, contactez-nous directement.',
  genericAction: 'Réessayer',
});
