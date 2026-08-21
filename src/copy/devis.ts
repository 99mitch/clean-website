import { frenchify } from '@/lib/typo';

type StepOption = { value: string; label: string; aide?: string };
type StepCopy = {
  numero: string;
  titre: string;
  aide: string;
  options: StepOption[];
};

const steps: StepCopy[] = [
  {
    numero: '01',
    titre: 'Quel type de local ?',
    aide: 'Si plusieurs sites sont concernés, choisissez le principal ; vous préciserez le reste à la fin.',
    options: [
      { value: 'bureaux', label: 'Bureaux', aide: 'Tertiaire, open space, sièges sociaux' },
      { value: 'commerce', label: 'Commerce', aide: 'Boutique, showroom, restauration' },
      { value: 'medical', label: 'Établissement de santé', aide: 'Cabinet, clinique, EHPAD, laboratoire' },
      { value: 'industriel', label: 'Site industriel', aide: 'Atelier, entrepôt, logistique' },
      { value: 'immeuble', label: 'Immeuble / copropriété', aide: 'Parties communes, syndic, résidence' },
      { value: 'autre', label: 'Autre', aide: 'École, crèche, salle de sport, lieu de culte…' },
    ],
  },
  {
    numero: '02',
    titre: 'Quelle surface à traiter ?',
    aide: 'Une estimation suffit. Elle sera vérifiée pendant la visite technique.',
    options: [
      { value: 'moins-100', label: 'Moins de 100 m²' },
      { value: '100-300', label: 'De 100 à 300 m²' },
      { value: '300-1000', label: 'De 300 à 1 000 m²' },
      { value: '1000-3000', label: 'De 1 000 à 3 000 m²' },
      { value: 'plus-3000', label: 'Plus de 3 000 m²' },
    ],
  },
  {
    numero: '03',
    titre: 'À quelle fréquence ?',
    aide: 'Le rythme conditionne l\'organisation des équipes et le prix au m².',
    options: [
      { value: 'quotidien', label: 'Quotidien' },
      { value: '2-3-par-semaine', label: '2 à 3 fois par semaine' },
      { value: 'hebdomadaire', label: 'Hebdomadaire' },
      { value: 'mensuel', label: 'Mensuel' },
      { value: 'ponctuel', label: 'Ponctuel — une intervention unique' },
    ],
  },
  {
    numero: '04',
    titre: 'Quelles prestations ?',
    aide: 'Plusieurs choix possibles. La liste s\'adapte au type de local indiqué à l\'étape 01.',
    options: [
      { value: 'entretien-regulier', label: 'Entretien régulier', aide: 'Sols, sanitaires, poussières, déchets' },
      { value: 'remise-en-etat', label: 'Remise en état', aide: 'Après travaux, avant emménagement, fin de bail' },
      { value: 'traitement-des-sols', label: 'Traitement des sols', aide: 'Décapage, protection, cristallisation, lustrage' },
      { value: 'vitrerie', label: 'Vitrerie', aide: 'Vitres, façades, verrières, accès difficiles' },
      { value: 'services-associes', label: 'Services associés', aide: 'Consommables, espaces verts, manutention' },
    ],
  },
  {
    numero: '05',
    titre: 'Où vous répondre ?',
    aide: 'Nous revenons vers vous avec une proposition chiffrée. Aucune newsletter, aucun démarchage.',
    options: [],
  },
];

export const devis = frenchify({
  steps,
  meta: {
    title: 'Demander un devis de nettoyage — réponse chiffrée',
    description:
      'Cinq questions sur vos locaux, votre surface et votre fréquence. Vous recevez une proposition chiffrée avec le protocole d\'intervention détaillé.',
  },

  entete: {
    eyebrow: 'Devis',
    titre: 'Cinq questions, une réponse chiffrée.',
    texte:
      'Pas de formulaire fourre-tout. On demande exactement ce qu\'il faut pour vous répondre avec un prix, et rien de plus.',
  },

  progression: {
    label: 'Progression du devis',
    etape: (n: number, total: number) => `Étape ${n} sur ${total}`,
    retour: 'Étape précédente',
    suivant: 'Continuer',
    envoyer: 'Envoyer ma demande',
    envoi: 'Envoi en cours…',
  },


  champs: {
    societe: { label: 'Société', placeholder: '' },
    nom: { label: 'Nom et prénom', placeholder: '' },
    email: { label: 'Email professionnel', placeholder: '' },
    telephone: {
      label: 'Téléphone',
      optionnel: 'facultatif',
      aide: 'Uniquement si vous préférez qu\'on vous appelle.',
    },
    codePostal: { label: 'Code postal du site', placeholder: '' },
    message: {
      label: 'Précisions',
      optionnel: 'facultatif',
      aide: 'Horaires d\'accès, nombre de sites, contraintes particulières.',
    },
    consentement:
      'J\'accepte que ces informations soient utilisées pour traiter ma demande de devis.',
    honeypot: 'Ne pas remplir ce champ',
  },

  erreurs: {
    requis: 'Ce champ est obligatoire.',
    email: 'Indiquez un email valide.',
    telephone: 'Ce numéro ne semble pas valide.',
    codePostal: 'Indiquez un code postal à 5 chiffres.',
    prestations: 'Sélectionnez au moins une prestation.',
    consentement: 'Votre accord est nécessaire pour traiter la demande.',
    titre: 'La demande n\'a pas pu être envoyée',
    resume: (n: number) =>
      n === 1
        ? 'Un champ doit être corrigé.'
        : `${n} champs doivent être corrigés.`,
    reseau:
      'L\'envoi a échoué. Vos réponses sont conservées : réessayez, ou contactez-nous directement.',
    reseauSecours: 'Nous joindre autrement',
  },

  recap: {
    titre: 'Vos réponses',
    modifier: 'Modifier',
  },

  merci: {
    meta: {
      title: 'Demande de devis envoyée',
      description:
        'Votre demande de devis a bien été enregistrée. Un accusé de réception vient de vous être envoyé par email.',
    },
    eyebrow: 'Demande enregistrée',
    titre: 'C\'est reçu. On revient vers vous avec un chiffre.',
    texte:
      'Un accusé de réception vient de partir par email. Si vous ne le voyez pas, vérifiez les indésirables.',
    delai: (heures: number) =>
      `Notre réponse vous parviendra sous ${heures} heures ouvrées.`,
    suite: 'Et ensuite',
    etapes: [
      'Nous relisons votre demande et préparons les questions manquantes.',
      'Nous convenons d\'une visite technique sur site, ou d\'un échange téléphonique si le périmètre est simple.',
      'Vous recevez une proposition chiffrée avec le protocole détaillé.',
    ],
    retour: 'Retour à l\'accueil',
    lire: 'Lire nos ressources en attendant',
  },
});
