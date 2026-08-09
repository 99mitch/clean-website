/**
 * Les douze revêtements de l'échantillonnier.
 *
 * Ce n'est pas une décoration : c'est le vocabulaire d'entrée d'un
 * responsable de site. « Quel revêtement ? » est la première question posée
 * en visite technique, et le protocole en découle. Les protocoles listés ici
 * sont des méthodes de métier standard — aucune donnée client (§0).
 *
 * Le rendu visuel de chaque plaque est généré en dégradés CSS
 * (`.sample[data-mat=…]` dans globals.css) : aucune image, aucun octet réseau.
 */
export type Materiau = {
  mat: string;
  nom: string;
  protocole: string;
};

export const materiaux: Materiau[] = [
  { mat: 'moquette', nom: 'Moquette', protocole: 'Injection-extraction' },
  { mat: 'pvc', nom: 'PVC', protocole: 'Décapage + émulsion' },
  { mat: 'marbre', nom: 'Marbre', protocole: 'Cristallisation' },
  { mat: 'beton', nom: 'Béton quartzé', protocole: 'Autolaveuse' },
  { mat: 'carrelage', nom: 'Carrelage', protocole: 'Détartrage des joints' },
  { mat: 'parquet', nom: 'Parquet', protocole: 'Nettoyage à sec' },
  { mat: 'resine', nom: 'Résine', protocole: 'Monobrosse pH neutre' },
  { mat: 'vitrage', nom: 'Vitrage', protocole: 'Eau osmosée' },
  { mat: 'inox', nom: 'Inox', protocole: 'Dégraissage + lustrage' },
  { mat: 'linoleum', nom: 'Linoléum', protocole: 'Spray-méthode' },
  { mat: 'terrazzo', nom: 'Terrazzo', protocole: 'Ponçage + protection' },
  { mat: 'textile', nom: 'Textile mural', protocole: 'Aspiration + détachage' },
];

/** Revêtement servant de bandeau de tête à une rubrique du site. */
export const bandeauParRubrique: Record<string, string> = {
  accueil: 'terrazzo',
  services: 'pvc',
  secteurs: 'carrelage',
  references: 'marbre',
  blog: 'textile',
  entreprise: 'beton',
  recrutement: 'moquette',
  devis: 'vitrage',
  contact: 'inox',
  legal: 'resine',
};
