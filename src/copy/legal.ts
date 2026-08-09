import { frenchify } from '@/lib/typo';

type Bloc = { titre: string; paragraphes: string[]; champs?: string[] };

export const mentions = frenchify({
  blocs: [
    {
      titre: 'Éditeur du site',
      paragraphes: [
        'Le présent site est édité par la société identifiée ci-dessous. Les informations légales sont mises à jour à chaque modification statutaire.',
      ],
      champs: ['RAISON_SOCIALE', 'FORME_JURIDIQUE', 'CAPITAL', 'ADRESSE_SIEGE', 'SIRET', 'RCS', 'TVA', 'TELEPHONE', 'EMAIL_CONTACT'],
    },
    {
      titre: 'Directeur de la publication',
      paragraphes: [
        'Le directeur de la publication est le représentant légal de la société éditrice.',
      ],
      champs: ['DIRECTEUR_PUBLICATION'],
    },
    {
      titre: 'Hébergement',
      paragraphes: [
        'Le site est hébergé par Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis.',
      ],
    },
    {
      titre: 'Propriété intellectuelle',
      paragraphes: [
        'L’ensemble des contenus de ce site — textes, visuels, identité graphique, code — est protégé par le droit de la propriété intellectuelle. Toute reproduction, même partielle, est soumise à autorisation écrite préalable.',
        'Les marques et logos éventuellement cités appartiennent à leurs titulaires respectifs.',
      ],
    },
    {
      titre: 'Responsabilité',
      paragraphes: [
        'Les informations publiées sont fournies à titre indicatif et n’ont pas valeur contractuelle. Seule une proposition commerciale signée engage la société.',
        'Les liens vers des sites tiers n’engagent pas la responsabilité de l’éditeur quant à leur contenu.',
      ],
    },
  ] as Bloc[],
});

export const confidentialite = frenchify({
  intro:
    'Cette politique décrit les données collectées via ce site, leur usage et vos droits. Elle est rédigée pour être lue, pas pour être opposée.',
  blocs: [
    {
      titre: 'Données collectées',
      paragraphes: [
        'Formulaire de devis : type de local, surface estimée, fréquence souhaitée, prestations retenues, société, nom, email, téléphone si vous le renseignez, code postal du site et message libre.',
        'Formulaire de contact : nom, société si renseignée, email, téléphone si renseigné, sujet et message.',
        'Aucun cookie de mesure d’audience nécessitant votre consentement n’est déposé. La mesure d’audience utilisée est sans cookie et sans identifiant personnel.',
      ],
    },
    {
      titre: 'Finalités et base légale',
      paragraphes: [
        'Les données servent exclusivement à traiter votre demande, à établir une proposition commerciale et à assurer le suivi de la relation client.',
        'La base légale est l’exécution de mesures précontractuelles prises à votre demande, ou l’intérêt légitime de l’éditeur à répondre aux sollicitations qui lui sont adressées.',
      ],
    },
    {
      titre: 'Destinataires',
      paragraphes: [
        'Les données sont transmises aux seules personnes en charge du traitement des demandes au sein de la société éditrice, ainsi qu’à son prestataire d’envoi d’emails transactionnels, agissant en qualité de sous-traitant.',
        'Aucune donnée n’est vendue, louée ou cédée à des fins publicitaires.',
      ],
    },
    {
      titre: 'Durée de conservation',
      paragraphes: [
        'Demandes de devis non converties : trois ans à compter du dernier contact.',
        'Messages de contact : un an à compter de la réponse apportée.',
        'Candidatures spontanées : six mois, sauf accord explicite pour une conservation plus longue.',
      ],
    },
    {
      titre: 'Vos droits',
      paragraphes: [
        'Vous disposez d’un droit d’accès, de rectification, d’effacement, de limitation et d’opposition, ainsi que d’un droit à la portabilité de vos données.',
        'Ces droits s’exercent par email ou par courrier auprès de l’éditeur, aux coordonnées figurant dans les mentions légales. Une réponse vous est apportée dans un délai d’un mois.',
        'En cas de désaccord persistant, vous pouvez saisir la CNIL — 3 place de Fontenoy, TSA 80715, 75334 Paris Cedex 07, www.cnil.fr.',
      ],
    },
    {
      titre: 'Sécurité',
      paragraphes: [
        'Les échanges avec ce site sont chiffrés en transit. Les formulaires sont protégés contre les envois automatisés par des mécanismes ne nécessitant ni cookie ni captcha tiers.',
      ],
    },
  ] as Bloc[],
});

export const accessibilite = frenchify({
  intro:
    'Cette déclaration porte sur l’ensemble du site. Elle est mise à jour à chaque évolution significative.',
  blocs: [
    {
      titre: 'État de conformité',
      paragraphes: [
        'Le site a été conçu selon le référentiel général d’amélioration de l’accessibilité (RGAA 4.1) et les critères WCAG 2.2 niveau AA.',
        'L’audit de conformité complet n’a pas encore été réalisé par un tiers indépendant : le taux de conformité déclaré sera publié ici dès la remise du rapport.',
      ],
    },
    {
      titre: 'Ce qui a été mis en œuvre',
      paragraphes: [
        'Navigation clavier complète, ordre de tabulation cohérent et indicateur de focus visible sur tous les éléments interactifs.',
        'Contrastes vérifiés : 4,5:1 minimum pour le texte, 3:1 pour les composants d’interface.',
        'Le comparateur avant/après est pilotable au clavier et dispose d’une alternative textuelle décrivant les deux états.',
        'Le parcours de devis annonce chaque changement d’étape aux technologies d’assistance et relie chaque message d’erreur à son champ.',
        'Cibles tactiles d’au moins 44 × 44 pixels et respect de la préférence système de réduction des animations.',
      ],
    },
    {
      titre: 'Contenus non accessibles connus',
      paragraphes: [
        'Aucun contenu non accessible n’est identifié à ce jour. Les documents PDF téléchargeables, lorsqu’ils seront publiés, feront l’objet d’une vérification spécifique avant mise en ligne.',
      ],
    },
    {
      titre: 'Retour d’information',
      paragraphes: [
        'Si vous rencontrez un obstacle d’accessibilité sur ce site, signalez-le nous par email ou par téléphone : nous vous répondons et vous transmettons l’information recherchée par un autre moyen.',
      ],
    },
    {
      titre: 'Voies de recours',
      paragraphes: [
        'Si un signalement reste sans réponse satisfaisante, vous pouvez saisir le Défenseur des droits — formulaire en ligne sur defenseurdesdroits.fr, ou courrier gratuit sans affranchissement à Défenseur des droits, Libre réponse 71120, 75342 Paris Cedex 07.',
      ],
    },
  ] as Bloc[],
});
