import { site } from '@/config/site';
import { frenchify } from '@/lib/typo';

export const servicesIndex = frenchify({
  meta: {
    title: 'Prestations de nettoyage professionnel à Paris',
    description:
      'Entretien régulier, remise en état, vitrerie et services associés à Paris et en Île-de-France. Chaque prestation suit un protocole écrit et vérifiable.',
  },
  eyebrow: 'Prestations',
  titre: 'Ce que nous faisons, et comment c\'est défini.',
  intro:
    'Chaque prestation repose sur un protocole écrit, une fréquence et un périmètre annexés au contrat. Rien n\'est laissé à l\'appréciation de l\'agent sur place.',
  voir: 'Détail de la prestation',
});

export const servicePage = frenchify({
  eyebrow: 'Prestation',
  frequencesTitre: 'Fréquences proposées',
  secteursTitre: 'Secteurs concernés',
  frequenceLabels: {
    quotidien: 'Quotidien',
    '2-3-par-semaine': '2 à 3 fois par semaine',
    hebdomadaire: 'Hebdomadaire',
    mensuel: 'Mensuel',
    ponctuel: 'Ponctuel',
  } as Record<string, string>,
});

export const secteursIndex = frenchify({
  meta: {
    title: 'Secteurs d\'intervention en Île-de-France',
    description:
      'Bureaux, industrie, copropriétés et bâtiments publics en Île-de-France : chaque lieu a ses contraintes, son protocole et sa traçabilité.',
  },
  eyebrow: 'Secteurs',
  titre: 'Chaque lieu a ses propres contraintes.',
  intro:
    'Une école, un atelier, un hall d\'immeuble : chacun impose ses produits, ses horaires et sa propre traçabilité.',
  voir: 'Détail du secteur',
});

export const secteurPage = frenchify({
  eyebrow: 'Secteur',
  enjeuxTitre: 'Les contraintes à traiter',
  servicesTitre: 'Prestations adaptées à ce secteur',
  faqTitre: 'Questions fréquentes',
  referencesTitre: 'Réalisations dans ce secteur',
});

export const referencesPage = frenchify({
  meta: {
    title: 'Références et études de cas',
    description:
      'Nos réalisations décrites par le contexte, la contrainte rencontrée et le dispositif mis en place. Publiées uniquement avec l\'accord écrit du client.',
  },
  eyebrow: 'Références',
  titre: 'Des chantiers décrits, pas une galerie de logos.',
  intro:
    'Chaque étude de cas indique le contexte, la contrainte et ce qui a été mis en place. Aucune référence n\'est publiée sans l\'accord écrit du client concerné.',
  vide:
    'Les premières études de cas sont en cours de validation avec les clients concernés. Nous ne publions ni nom, ni logo, ni chiffre avant d\'avoir cet accord par écrit.',
  videAction: 'Demander des références par téléphone',
  clientAnonyme: 'Client sous accord de confidentialité',
});

export const blogIndex = frenchify({
  meta: {
    title: 'Ressources sur la propreté professionnelle',
    description:
      'Méthode, comparaison de devis, fréquences, traçabilité : des articles utiles aux acheteurs et aux responsables de site, sans jargon commercial.',
  },
  eyebrow: 'Ressources',
  titre: 'Ce qu\'il faut savoir avant d\'acheter de la propreté.',
  intro:
    'Des articles écrits par ceux qui exploitent les contrats, pour ceux qui les achètent.',
  vide: 'Les premiers articles arrivent prochainement.',
  lire: 'Lire l\'article',
  par: 'Par',
});

/**
 * Texte fourni par le client (modèle « qui-sommes-nous », 22/10/2026), adapté à
 * nos données validées : zone, délais (`site.delais`) et préavis. Les chiffres
 * non validés du modèle (nombre de clients, délai de rappel, part de produits
 * écolabellisés) sont remplacés par nos engagements contractuels (§0).
 */
export const quiSommesNous = frenchify({
  meta: {
    title: 'Entreprise de nettoyage à Paris 14e : qui sommes-nous',
    description: `${site.nom} entretient bureaux et commerces à Paris et en Île-de-France : équipes fiables, produits écologiques, réponse rapide et tarifs clairs.`,
  },
  eyebrow: 'L\'entreprise',
  titre: 'Des locaux propres chaque matin, sans avoir à y penser.',
  intro: `${site.nom} entretient les bureaux et commerces de Paris et d'Île-de-France. Nous avons créé cette entreprise avec une idée simple : un prestataire de nettoyage doit être joignable, régulier, respectueux de votre santé et transparent sur ses prix.`,
  zone: 'Intervention à Paris et dans toute l\'Île-de-France.',
  boutons: { devis: 'Demander un devis gratuit', appeler: 'Nous appeler' },
  fiche: {
    label: 'Exemple de fiche de passage envoyée après une intervention',
    titre: 'Fiche de passage',
    date: 'Mardi, 7 h 00',
    lignes: [
      { tache: 'Bureaux et open space, 2ᵉ étage', heure: '7 h 40' },
      { tache: 'Sanitaires désinfectés, consommables remplis', heure: '8 h 05' },
      { tache: 'Cuisine et salle de pause', heure: '8 h 20' },
      { tache: 'Vitrine d\'entrée et accueil', heure: '8 h 35' },
    ],
    produits: 'Produits écolabellisés',
    termine: 'Terminé avant votre arrivée',
  },
  comparatif: {
    titre: 'Ce qui ne va pas avec le nettoyage, et ce que nous faisons autrement.',
    intro:
      'Beaucoup d\'entreprises changent de prestataire pour les mêmes raisons. Nous avons construit notre façon de travailler pour y répondre, point par point.',
    colonnes: { probleme: 'Ce que vous vivez souvent', reponse: 'Ce que nous faisons' },
    prefixes: { probleme: 'Problème :', reponse: 'Notre réponse :' },
    lignes: [
      {
        probleme: { titre: 'Un prestataire injoignable', texte: 'Un problème urgent, et personne ne répond au téléphone.' },
        reponse: {
          titre: 'Un interlocuteur unique',
          texte: `Une personne dédiée à votre site, qui vous répond directement, avec une intervention possible ${site.delais.urgence} en cas d'urgence.`,
        },
      },
      {
        probleme: { titre: 'Une qualité qui varie', texte: 'Un agent différent chaque semaine, des zones oubliées.' },
        reponse: {
          titre: 'La même équipe, un protocole écrit',
          texte:
            'Vos agents restent les mêmes, suivent un cahier des charges propre à vos locaux et sont contrôlés régulièrement.',
        },
      },
      {
        probleme: {
          titre: 'Des produits agressifs',
          texte: 'Odeurs fortes et produits irritants pour vos équipes et vos clients.',
        },
        reponse: {
          titre: 'Des produits écologiques',
          texte: 'Nous utilisons des produits écolabellisés et des méthodes qui limitent l\'eau et les déchets.',
        },
      },
      {
        probleme: {
          titre: 'Des prix flous et des contrats rigides',
          texte: 'Frais cachés, engagements longs, impossible d\'ajuster.',
        },
        reponse: {
          titre: 'Un tarif clair et un contrat souple',
          texte:
            'Un devis détaillé, sans frais cachés, et une fréquence que vous pouvez adapter à votre activité.',
        },
      },
    ],
  },
  chiffresLabel: 'Nos engagements en chiffres',
  chiffres: [
    { valeur: site.delais.devis, label: 'pour recevoir votre devis' },
    { valeur: site.delais.visite, label: 'pour la visite technique' },
    { valeur: 'Jour J', label: `intervention d'urgence possible ${site.delais.urgence}` },
    { valeur: site.preavis, label: 'de préavis, sans engagement de durée' },
  ],
  valeurs: {
    titre: 'Ce qui guide notre travail.',
    items: [
      {
        titre: 'Proximité',
        texte:
          'Nous sommes une entreprise locale. Vous connaissez les personnes qui entrent dans vos locaux, et vous pouvez nous joindre directement.',
      },
      {
        titre: 'Rigueur',
        texte:
          'Chaque site a son protocole, ses horaires et ses contrôles qualité. Ce qui est prévu au contrat est fait, à chaque passage.',
      },
      {
        titre: 'Respect de la santé et de l\'environnement',
        texte: 'Des produits sains pour vos équipes, des méthodes économes en eau, du matériel réutilisable.',
      },
      {
        titre: 'Réactivité et prix justes',
        texte:
          'Une réponse rapide quand vous avez besoin de nous, et un tarif adapté à la taille de vos locaux, sans surprise sur la facture.',
      },
    ],
  },
  etapes: {
    titre: 'Comment démarrer avec nous.',
    items: [
      { titre: 'Visite gratuite', texte: 'Nous venons voir vos locaux et écouter vos besoins.' },
      {
        titre: `Devis sous ${site.delais.devis}`,
        texte: 'Un prix détaillé, avec la fréquence et les tâches incluses.',
      },
      { titre: 'Premier passage', texte: 'Votre équipe démarre avec un protocole écrit pour votre site.' },
      { titre: 'Suivi régulier', texte: 'Point qualité avec votre interlocuteur et ajustements si besoin.' },
    ],
  },
  faq: {
    titre: 'Questions fréquentes',
    items: [
      {
        question: 'Quels types de locaux entretenez-vous ?',
        reponse:
          'Bureaux, open spaces, commerces, cabinets médicaux et professions libérales, showrooms et parties communes. Nous intervenons aussi pour des nettoyages ponctuels : fin de chantier, déménagement, remise en état.',
      },
      {
        question: 'À quels horaires intervenez-vous ?',
        reponse:
          'Tôt le matin, en journée ou le soir, selon ce qui gêne le moins votre activité. La plupart de nos clients préfèrent un passage avant l\'ouverture.',
      },
      {
        question: 'Faut-il s\'engager sur une longue durée ?',
        reponse: `Non. Nos contrats sont souples : vous pouvez ajuster la fréquence des passages et y mettre fin avec un préavis de ${site.preavis}, précisé dans votre devis.`,
      },
      {
        question: 'Que se passe-t-il si un agent est absent ?',
        reponse:
          'Nous le remplaçons par un agent qui connaît le protocole de votre site, et vous êtes prévenu à l\'avance.',
      },
      {
        question: 'Fournissez-vous les produits et le matériel ?',
        reponse:
          'Oui, tout est inclus : produits écolabellisés, matériel professionnel et, si vous le souhaitez, consommables (papier, savon, sacs).',
      },
      {
        question: 'Dans quelle zone intervenez-vous ?',
        reponse:
          'À Paris et dans toute l\'Île-de-France. Contactez-nous si vos locaux sont un peu plus loin : nous étudions chaque demande.',
      },
    ],
  },
  appel: {
    titre: 'Parlons de vos locaux.',
    texte: `Indiquez-nous la surface, le type de locaux et la fréquence souhaitée. Nous vous envoyons un devis gratuit sous ${site.delais.devis}, sans engagement.`,
  },
});

export const engagementsPage = frenchify({
  meta: {
    title: 'Nos engagements RSE, environnement et RH',
    description:
      'Réduction des produits chimiques, gestion des déchets, conditions de travail et insertion : ce sur quoi nous nous engageons, et comment c\'est vérifiable.',
  },
  eyebrow: 'Engagements',
  titre: 'Des engagements que vous pouvez vérifier.',
  intro:
    'Un engagement qui ne se mesure pas n\'en est pas un. Voici ce que nous tenons, et comment vous pouvez le contrôler.',
  blocs: [
    {
      titre: 'Environnement',
      points: [
        'Dosage centralisé des produits pour supprimer les surdosages sur site.',
        'Microfibre et lavage mécanisé plutôt que consommation de détergents.',
        'Tri des déchets d\'exploitation et reprise des contenants vides par le fournisseur.',
        'Produits écolabellisés, pour notre engagement RSE.',
      ],
    },
    {
      titre: 'Conditions de travail',
      points: [
        'Horaires regroupés plutôt qu\'éclatés entre plusieurs sites dans la journée.',
        'CDI dès que la charge le permet, temps partiel choisi et non subi.',
        'Équipements de protection fournis et remplacés, sans avance de frais.',
        'Formation aux gestes et postures avant la première intervention.',
      ],
    },
    {
      titre: 'Ce que vous pouvez vérifier',
      points: [
        'Fiches de données de sécurité des produits, disponibles sur site.',
        'Attestations de formation des agents intervenant chez vous.',
        'Déclarations sociales et contrats de travail, sur demande écrite.',
        'Comptes rendus de visites de contrôle sur toute la durée du contrat.',
      ],
    },
  ],
  certificationsLien: 'Voir nos certifications',
});

export const certificationsPage = frenchify({
  meta: {
    title: 'Certifications et qualifications',
    description:
      'Les certifications réellement détenues par l\'entreprise, avec organisme et date. Nous n\'affichons aucun label que nous ne pouvons pas justifier.',
  },
  eyebrow: 'Certifications',
  titre: 'Ce que nous détenons, et rien d\'autre.',
  intro:
    'Un label affiché sans certificat correspondant est un mensonge commercial. Cette page ne liste que des certifications en cours de validité, justificatif à l\'appui.',
  vide:
    'Aucune certification n\'est publiée à ce jour. Nous préférons cette page vide à une liste de labels invérifiables. Nos protocoles, fiches produits et attestations de formation sont communiqués sur simple demande.',
  organisme: 'Organisme',
  obtenue: 'Obtenue le',
  numero: 'Numéro',
});

export const recrutementPage = frenchify({
  meta: {
    title: 'Recrutement : agents de propreté et chefs d\'équipe',
    description:
      'Nous recrutons des agents de propreté et des chefs d\'équipe. Horaires regroupés, CDI dès que possible, formation avant la première intervention.',
  },
  eyebrow: 'Recrutement',
  titre: 'Nous recrutons des gens que nous gardons.',
  intro:
    'Le turnover est le premier problème de ce métier. Nous le traitons par les horaires, le contrat et l\'encadrement.',
  ceQueNousOffrons: 'Ce que nous proposons',
  offres: 'Offres en cours',
  offresVides:
    'Aucune offre publiée en ce moment. Les candidatures spontanées sont lues et conservées six mois.',
  spontanee: 'Candidature spontanée',
  spontaneeTexte:
    'Décrivez votre expérience et vos disponibilités. Nous répondons à toutes les candidatures, y compris négativement.',
  points: [
    'Des horaires regroupés, plutôt qu\'éclatés sur la journée entre trois sites.',
    'Un CDI dès que la charge le permet, et un temps partiel choisi si vous le préférez.',
    'Une formation aux protocoles et à la sécurité avant votre première intervention.',
    'Un chef d\'équipe joignable, qui passe sur site et connaît votre poste.',
    'Les équipements de protection fournis et remplacés, sans avance de frais.',
  ],
  postuler: 'Postuler',
  contrat: 'Contrat',
  temps: 'Temps de travail',
  lieu: 'Lieu',
  missionsTitre: 'Missions',
  profilTitre: 'Profil recherché',
});

export const contactPage = frenchify({
  meta: {
    title: 'Nous contacter',
    description:
      'Téléphone, email et formulaire de contact. Pour une demande chiffrée, le parcours de devis en cinq questions donne une réponse plus rapide.',
  },
  eyebrow: 'Contact',
  titre: 'Écrivez-nous. Pour un prix, passez par le devis.',
  intro:
    'Le formulaire de contact sert aux questions. Pour obtenir une proposition chiffrée, le parcours de devis pose les cinq questions dont nous avons besoin.',
  versDevis: 'Demander un devis chiffré',
  coordonneesTitre: 'Coordonnées',
  zone: 'Zone d\'intervention : Paris et Île-de-France',
  formulaireDirect:
    'Le formulaire arrive directement à notre équipe. Pour un prix, le devis en cinq questions est plus rapide.',
  formulaireTitre: 'Nous écrire',
  champs: {
    nom: 'Nom et prénom',
    societe: 'Société',
    email: 'Email',
    telephone: 'Téléphone',
    sujet: 'Sujet',
    message: 'Votre message',
    optionnel: 'facultatif',
    consentement:
      'J\'accepte que ces informations soient utilisées pour traiter ma demande.',
  },
  sujets: [
    'Question sur une prestation',
    'Suivi d\'un contrat en cours',
    'Facturation',
    'Recrutement',
    'Données personnelles',
    'Autre',
  ],
  envoyer: 'Envoyer le message',
  envoi: 'Envoi en cours…',
  succes:
    'Message envoyé. Nous revenons vers vous par email dès que possible.',
  echec:
    'L\'envoi a échoué. Réessayez, ou joignez-nous directement par téléphone.',
});

export const accessibilitePage = frenchify({
  meta: {
    title: 'Déclaration d\'accessibilité',
    description:
      'État de conformité du site au RGAA 4.1, contenus non accessibles connus, moyens de nous signaler un défaut et voies de recours.',
  },
  eyebrow: 'Accessibilité',
  titre: 'Déclaration d\'accessibilité',
});

export const legalPage = frenchify({
  mentions: {
    meta: {
      title: 'Mentions légales',
      description:
        'Éditeur du site, directeur de la publication, hébergeur, propriété intellectuelle et conditions d\'utilisation du site.',
    },
    eyebrow: 'Informations légales',
    titre: 'Mentions légales',
  },
  confidentialite: {
    meta: {
      title: 'Politique de confidentialité',
      description:
        'Données collectées via les formulaires, finalités, durées de conservation, destinataires et exercice de vos droits au titre du RGPD.',
    },
    eyebrow: 'Données personnelles',
    titre: 'Politique de confidentialité',
  },
});
