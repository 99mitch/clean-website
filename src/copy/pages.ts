import { frenchify } from '@/lib/typo';

export const servicesIndex = frenchify({
  meta: {
    title: 'Prestations de nettoyage professionnel',
    description:
      'Entretien régulier, remise en état, traitement des sols, vitrerie et services associés. Chaque prestation a un protocole écrit.',
  },
  eyebrow: 'Prestations',
  titre: 'Ce que nous faisons, et comment c\'est défini.',
  intro:
    'Chaque prestation repose sur un protocole écrit, une fréquence et un périmètre annexés au contrat. Rien n\'est laissé à l\'appréciation de l\'agent sur place.',
});

export const servicePage = frenchify({
  eyebrow: 'Prestation',
  prestationsTitre: 'Ce qui est inclus',
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
    title: 'Secteurs d\'intervention',
    description:
      'Bureaux, établissements de santé, industrie, copropriétés, écoles et crèches : les contraintes changent, le protocole aussi. Trouvez le vôtre.',
  },
  eyebrow: 'Secteurs',
  titre: 'Les contraintes ne sont pas les mêmes partout.',
  intro:
    'Un bloc opératoire, un atelier et un hall d\'immeuble n\'appellent ni les mêmes produits, ni les mêmes horaires, ni les mêmes preuves de traçabilité.',
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
    'Des articles écrits par ceux qui exploitent les contrats, pour ceux qui les achètent. Pas de contenu de remplissage.',
  vide: 'Les premiers articles arrivent prochainement.',
  lire: 'Lire l\'article',
  par: 'Par',
});

export const quiSommesNous = frenchify({
  meta: {
    title: 'Qui sommes-nous',
    description:
      'Notre organisation, notre encadrement et notre politique RH : ce qui explique la stabilité des équipes sur vos sites, et donc la qualité du service.',
  },
  eyebrow: 'L\'entreprise',
  titre: 'Une entreprise de services jugée sur la stabilité de ses équipes.',
  intro:
    'La propreté est un métier de main-d\'œuvre. La qualité que vous constatez sur site dépend d\'abord des conditions de travail de la personne qui intervient.',
  sections: [
    {
      titre: 'Une organisation à taille humaine',
      texte:
        'Un référent nommé par contrat, un encadrement de proximité et des équipes stables. Vous parlez à quelqu\'un qui connaît votre site, pas à un standard.',
    },
    {
      titre: 'Le recrutement avant tout',
      texte:
        'Nous recrutons en CDI dès que la charge le permet, avec des horaires regroupés plutôt qu\'éclatés. Un agent qui reste est un agent qui connaît vos locaux.',
    },
    {
      titre: 'La formation, sur le terrain',
      texte:
        'Protocoles, produits, sécurité, gestes et postures. La formation est faite avant la première intervention, et elle est documentée.',
    },
    {
      titre: 'Le contrôle qualité, écrit',
      texte:
        'Visites de contrôle planifiées, compte rendu remis au client, écarts corrigés au passage suivant. Un constat sans correction n\'est pas un contrôle.',
    },
  ],
  equipeTitre: 'L\'encadrement',
  equipeIntro:
    'Les personnes que vous aurez en face de vous, du premier appel au contrôle qualité.',
});

export const engagementsPage = frenchify({
  meta: {
    title: 'Nos engagements RSE, environnement et RH',
    description:
      'Réduction des produits chimiques, gestion des déchets, conditions de travail et insertion : ce sur quoi nous nous engageons, et comment c\'est vérifiable.',
  },
  eyebrow: 'Engagements',
  titre: 'Des engagements vérifiables, pas une charte décorative.',
  intro:
    'Un engagement qui ne se mesure pas n\'en est pas un. Voici ce que nous tenons, et comment vous pouvez le contrôler.',
  blocs: [
    {
      titre: 'Environnement',
      points: [
        'Dosage centralisé des produits pour supprimer les surdosages sur site.',
        'Microfibre et lavage mécanisé plutôt que consommation de détergents.',
        'Tri des déchets d\'exploitation et reprise des contenants vides par le fournisseur.',
        'Produits écolabellisés dès qu\'un équivalent existe pour l\'usage concerné.',
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
    title: 'Recrutement — agents de propreté et chefs d\'équipe',
    description:
      'Nous recrutons des agents de propreté et des chefs d\'équipe. Horaires regroupés, CDI dès que possible, formation avant la première intervention.',
  },
  eyebrow: 'Recrutement',
  titre: 'On recrute des gens qu\'on garde.',
  intro:
    'Le turnover est le premier problème de ce métier. Nous le traitons par les horaires, le contrat et l\'encadrement, pas par des affiches.',
  ceQueNousOffrons: 'Ce que nous proposons',
  offres: 'Offres en cours',
  offresVides:
    'Aucune offre publiée en ce moment. Les candidatures spontanées sont lues et conservées six mois.',
  spontanee: 'Candidature spontanée',
  spontaneeTexte:
    'Décrivez votre expérience et vos disponibilités. Nous répondons à toutes les candidatures, y compris négativement.',
  points: [
    'Des horaires regroupés, pas éclatés sur toute la journée entre trois sites.',
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
