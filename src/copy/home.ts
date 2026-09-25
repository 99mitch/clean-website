import { frenchify } from '@/lib/typo';

export const home = frenchify({
  meta: {
    title: 'Entreprise de nettoyage à Paris et en Île-de-France',
    description:
      'Nettoyage de bureaux, copropriétés, sites industriels et lieux publics en Île-de-France. Cinq questions : un prix, un protocole et une date.',
  },

  hero: {
    eyebrow: 'Propreté industrielle et services associés',
    titre: 'La propreté se voit. La nôtre se prouve.',
    texte:
      'Vous décrivez vos locaux en cinq questions. On vous répond avec un prix, un protocole et une date. Pas avec une brochure.',
    ctaPrimaire: 'Demander un devis',
    ctaSecondaire: 'Voir les prestations',
    /** Trois engagements, affichés en filet sous le titre. */
    garanties: [
      'Réponse chiffrée',
      'Contrat sans engagement',
      'Référent nommé au contrat',
    ],
  },

  pourquoiNous: {
    label: 'Pourquoi nous',
    titre: 'Notre différence repose sur quatre piliers.',
    intro: 'Quatre engagements tenus au contrat, pas de simples adjectifs.',
    aside: '4 engagements',
    points: [
      {
        titre: 'Disponibilité',
        texte:
          'Un référent joignable et des équipes mobilisables sous 24 à 48 h, y compris en dehors des horaires de bureau.',
      },
      {
        titre: 'Flexibilité',
        texte:
          'Contrat sans engagement de durée, fréquences ajustables et prestations ponctuelles activables sur simple demande.',
      },
      {
        titre: 'Efficacité',
        texte:
          'Un protocole écrit par revêtement et par secteur : le même résultat à chaque passage, quel que soit l’agent.',
      },
      {
        titre: 'Responsabilité',
        texte:
          'Personnel déclaré, formé et assuré. Un écart constaté est signalé et corrigé, jamais dissimulé.',
      },
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
    titre: 'Adapté à votre site, pas à un standard.',
    intro:
      'Un bloc opératoire, un atelier, un hall d’immeuble : ni les mêmes produits, ni les mêmes horaires, mais la même rigueur. Chaque en-tête ouvre sur un protocole différent.',
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
      'services-associes': 'Associés',
    } as Record<string, string>,
  },

  services: {
    label: 'Prestations',
    titre: 'Cinq familles, un protocole écrit pour chacune.',
    intro:
      'Chaque prestation est définie par un périmètre, une fréquence et une méthode annexés au contrat. Rien n’est laissé à l’appréciation de l’agent sur place.',
    aside: '5 entrées',
  },

  retourClients: {
    label: 'Retour clients',
    titre: 'Ce que nos clients en disent.',
    intro:
      'Chaque avis publié ici est signé et vérifiable. Tant qu’un avis n’est pas validé par écrit par le client concerné, il n’est pas affiché.',
    aside: 'avis vérifiés',
    vide: 'AVIS_CLIENTS — aucun avis validé par écrit à ce jour',
  },

  protocole: {
    label: 'Méthode',
    titre: 'De la première question à la première intervention.',
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
});
