import { site } from '@/config/site';
import { frenchify } from '@/lib/typo';

const { delais } = site;

export const home = frenchify({
  meta: {
    // 48 caractères : avec « | Clean Bureau », le titre reste sous les 65 (audit).
    title: 'Entreprise de nettoyage à Paris et Île-de-France',
    description:
      'Nettoyage de bureaux, copropriétés, sites industriels et lieux publics en Île-de-France. Cinq questions : un prix, un protocole et une date.',
  },

  hero: {
    eyebrow: 'Propreté industrielle et services associés',
    titre: 'La propreté se voit. La nôtre se prouve.',
    /** Sous-titre visible : porte les mots-clés absents du H1 (audit). */
    texte:
      'Entreprise de nettoyage de bureaux, copropriétés et sites industriels à Paris et en Île-de-France. Vous décrivez vos locaux en cinq questions, nous vous répondons avec un prix, un protocole et une date.',
    ctaPrimaire: 'Demander un devis',
    ctaSecondaire: 'Voir les prestations',
    /** Trois engagements, affichés en filet sous le titre. */
    garanties: [
      `Devis sous ${delais.devis}`,
      'Contrat sans engagement de durée',
      'Référent nommé au contrat',
    ],
  },

  pourquoiNous: {
    label: 'Pourquoi nous',
    titre: 'Notre différence repose sur quatre piliers.',
    intro: 'Quatre engagements, tous écrits dans le contrat.',
    aside: '4 engagements',
    points: [
      {
        titre: 'Disponibilité',
        texte:
          `Un référent joignable, un devis sous ${delais.devis} et une intervention d'urgence possible ${delais.urgence}, y compris en dehors des horaires de bureau.`,
      },
      {
        titre: 'Flexibilité',
        texte:
          'Contrat sans engagement de durée, résiliable avec un préavis d’un mois. Fréquences ajustables et prestations ponctuelles sur simple demande.',
      },
      {
        titre: 'Efficacité',
        texte:
          'Un protocole écrit par revêtement et par secteur : le même résultat à chaque passage, quel que soit l’agent.',
      },
      {
        titre: 'Responsabilité',
        texte:
          'Personnel déclaré, formé et assuré. Produits écolabellisés, pour notre engagement RSE. Un écart constaté est signalé, puis corrigé.',
      },
    ],
  },

  /**
   * L'échantillonnier — pièce maîtresse du hero. Ce sont des protocoles de
   * métier standard, pas des données client (§0).
   */
  echantillonnier: {
    titre: 'Échantillonnier',
    compte: (n: number) => `${n} revêtements, ${n} protocoles`,
    note:
      'La première question d’une visite technique n’est pas « quelle surface » mais « quel revêtement ». Le protocole, le produit et la machine en découlent.',
  },

  matrice: {
    label: 'Croisement',
    titre: 'Un protocole par type de site.',
    intro:
      'Un plateau de bureaux, un atelier, un hall d’immeuble : ni les mêmes produits, ni les mêmes horaires, mais la même rigueur. Chaque en-tête ouvre sur un protocole différent.',
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
      vitrerie: 'Vitrerie',
      'services-associes': 'Services associés',
    } as Record<string, string>,
  },

  services: {
    label: 'Prestations',
    titre: 'Quatre familles, un protocole écrit pour chacune.',
    intro:
      'Chaque prestation est définie par un périmètre, une fréquence et une méthode annexés au contrat. Rien n’est laissé à l’appréciation de l’agent sur place.',
    aside: '4 entrées',
  },

  retourClients: {
    label: 'Retour clients',
    titre: 'Ce que nos clients en disent.',
    intro:
      'Tant qu’un avis n’est pas validé par écrit par le client concerné, il n’est pas affiché.',
    aside: 'avis vérifiés',
    vide: 'AVIS_CLIENTS : aucun avis validé par écrit à ce jour',
    google: 'Tous nos avis sur Google',
  },

  protocole: {
    label: 'Méthode',
    titre: 'De la première question à la première intervention.',
    intro:
      'Quatre étapes, des délais annoncés, un référent unique du premier appel jusqu’au contrôle qualité.',
    aside: '4 étapes',
    etapes: [
      {
        titre: 'Devis chiffré',
        texte:
          'À partir de vos cinq réponses : un premier prix, le périmètre et les fréquences proposées.',
        duree: `Sous ${delais.devis}`,
      },
      {
        titre: 'Visite technique',
        texte:
          'Relevé des surfaces, des revêtements et des accès, sur site avec le responsable des lieux. Le cahier des charges suit : périmètre, fréquences, produits, matériel, prix. Aucune ligne « divers ».',
        duree: `${delais.visite} après le devis chiffré`,
      },
      {
        titre: 'Mise en place',
        texte:
          'Équipe nommée, remplaçants identifiés, cahier de liaison ouvert dès la première intervention.',
        duree: `À la date convenue · urgence possible ${delais.urgence}`,
      },
      {
        titre: 'Contrôle qualité',
        texte:
          'Visites de contrôle planifiées et compte rendu écrit. Un écart constaté est corrigé au passage suivant.',
        duree: 'Tout au long du contrat',
      },
    ],
  },
});
