import { frenchify } from '@/lib/typo';

export const home = frenchify({
  meta: {
    title: 'Entreprise de nettoyage professionnel — devis chiffré sous 24 h',
    description:
      'Entretien régulier, remise en état, vitrerie, bio-nettoyage. Décrivez vos locaux en cinq questions, recevez une proposition chiffrée. Contrat sans engagement.',
  },

  hero: {
    eyebrow: 'Propreté industrielle et services associés',
    titre: 'On ne vend pas de la propreté. On vend un état vérifiable.',
    texte:
      'Vous décrivez vos locaux en cinq questions. Vous recevez un prix, un protocole écrit et une date de démarrage. Pas une brochure.',
    ctaPrimaire: 'Demander un devis',
    ctaSecondaire: 'Voir les prestations',
    /** Trois engagements, affichés en filet sous le titre. */
    garanties: [
      'Réponse chiffrée',
      'Contrat sans engagement',
      'Référent nommé au contrat',
    ],
  },

  /**
   * L'échantillonnier — pièce maîtresse du hero. Ce sont des protocoles de
   * métier standard, pas des données client (§0).
   */
  echantillonnier: {
    titre: 'Échantillonnier',
    compte: (n: number) => `${n} revêtements — ${n} protocoles`,
    note:
      'La première question d’une visite technique n’est pas « quelle surface » mais « quel revêtement ». Le protocole, le produit et la machine en découlent.',
  },

  matrice: {
    label: 'Croisement',
    titre: 'Ce qui s’applique à votre type de site.',
    intro:
      'Un bloc opératoire, un atelier et un hall d’immeuble n’appellent ni les mêmes produits, ni les mêmes horaires, ni les mêmes preuves. Chaque en-tête est une entrée.',
    aside: 'secteurs × prestations',
    colonneSecteur: 'Secteur',
    propose: 'prestation proposée',
    nonPropose: 'prestation non proposée',
    resume:
      'Matrice de correspondance entre les secteurs d’intervention et les prestations proposées. Chaque ligne est un secteur, chaque colonne une prestation.',
    /** Libellés courts, pour tenir en tête de colonne. */
    abrev: {
      'entretien-regulier': 'Entretien',
      'remise-en-etat': 'Remise en état',
      'traitement-des-sols': 'Sols',
      vitrerie: 'Vitrerie',
      'hygiene-3d': 'Hygiène 3D',
      'bio-nettoyage': 'Bio-nettoyage',
      'services-associes': 'Associés',
    } as Record<string, string>,
  },

  services: {
    label: 'Prestations',
    titre: 'Sept familles, un protocole écrit pour chacune.',
    intro:
      'Chaque prestation est définie par un périmètre, une fréquence et une méthode annexés au contrat. Rien n’est laissé à l’appréciation de l’agent sur place.',
    aside: '7 entrées',
  },

  preuve: {
    label: 'Preuve',
    titre: 'Ce que nos clients peuvent vérifier.',
    intro:
      'Chaque chiffre affiché ici est issu de nos relevés d’exploitation. Tant qu’une donnée n’est pas consolidée, elle n’est pas affichée.',
    aside: 'relevés d’exploitation',
    labels: {
      anneeCreation: 'Année de création',
      nbSalaries: 'Salariés en CDI',
      nbSitesClients: 'Sites sous contrat',
      m2TraitesAn: 'm² traités par an',
      tauxSatisfaction: 'Satisfaction client',
      delaiIntervention: 'Délai d’intervention',
    },
  },

  protocole: {
    label: 'Méthode',
    titre: 'Comment se déroule une mise en place.',
    intro:
      'Quatre étapes, des délais annoncés, un référent unique du premier appel jusqu’au contrôle qualité.',
    aside: '4 étapes',
    etapes: [
      {
        titre: 'Visite technique',
        texte:
          'Relevé des surfaces, des revêtements et des contraintes d’accès. Sur site, avec le responsable des lieux.',
        duree: 'J+2 après votre demande',
      },
      {
        titre: 'Proposition chiffrée',
        texte:
          'Un cahier des charges lisible : périmètre, fréquences, produits, matériel, prix. Pas de ligne « divers ».',
        duree: '48 h après la visite',
      },
      {
        titre: 'Mise en place',
        texte:
          'Équipe nommée, remplaçants identifiés, cahier de liaison ouvert dès la première intervention.',
        duree: 'À la date convenue',
      },
      {
        titre: 'Contrôle qualité',
        texte:
          'Visites de contrôle planifiées et compte rendu écrit. Un écart constaté est corrigé, pas commenté.',
        duree: 'Tout au long du contrat',
      },
    ],
  },

  differences: {
    label: 'Engagements',
    titre: 'Ce sur quoi nous nous engageons par écrit.',
    aside: '4 clauses',
    points: [
      {
        titre: 'Contrat sans engagement de durée',
        texte:
          'Résiliable avec un préavis court. Nous préférons être gardés parce que le travail est bon.',
      },
      {
        titre: 'Un référent joignable',
        texte:
          'Un interlocuteur nommé au contrat, pas un standard. Il connaît votre site et vos horaires.',
      },
      {
        titre: 'Personnel déclaré et formé',
        texte:
          'Contrats en règle, formation aux protocoles et aux produits, équipements fournis.',
      },
      {
        titre: 'Traçabilité écrite',
        texte:
          'Cahier de liaison, fiches de contrôle, relevés d’intervention consultables à tout moment.',
      },
    ],
  },
});
