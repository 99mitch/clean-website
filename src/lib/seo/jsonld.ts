import { absoluteUrl, site } from '@/config/site';

/**
 * JSON-LD (§9). On n'émet une propriété que si la donnée existe réellement :
 * un balisage qui ment est pire qu'un balisage absent.
 */

type Json = Record<string, unknown>;

function compact(obj: Json): Json {
  return Object.fromEntries(
    Object.entries(obj).filter(
      ([, v]) =>
        v !== null && v !== undefined && !(Array.isArray(v) && v.length === 0),
    ),
  );
}

const ORGANISATION_ID = absoluteUrl('/#organisation');
const SITE_ID = absoluteUrl('/#site');

/** Zones desservies : la région validée, et la ville du siège. */
function zonesDesservies(): Json[] {
  const zones: Json[] = [];
  if (site.zoneIntervention) {
    zones.push({ '@type': 'AdministrativeArea', name: site.zoneIntervention });
  }
  zones.push({ '@type': 'City', name: site.localisation.ville });
  return zones;
}

/** Adresse complète si elle est renseignée, sinon ce qui est validé (ville, code postal). */
function adresse(): Json {
  const a = site.adresseSiege;
  return compact({
    '@type': 'PostalAddress',
    streetAddress: a?.rue ?? null,
    postalCode: a?.codePostal ?? site.localisation.codePostal,
    addressLocality: a?.ville ?? site.localisation.ville,
    addressRegion: site.localisation.region,
    addressCountry: site.localisation.pays,
  });
}

/**
 * Entité de l'entreprise + site web, en un seul graphe émis sur toutes les
 * pages. Les autres blocs (Service, Article…) y renvoient par `@id`.
 */
export function organisationGraph(
  services: Array<{ title: string; slug: string; excerpt: string }>,
): Json {
  const business = compact({
    '@type': 'LocalBusiness',
    '@id': ORGANISATION_ID,
    name: site.nom,
    description: site.description,
    slogan: 'La propreté se voit. La nôtre se prouve.',
    url: absoluteUrl('/'),
    logo: { '@type': 'ImageObject', url: absoluteUrl('/logo.png'), width: 512, height: 512 },
    image: absoluteUrl('/opengraph-image'),
    telephone: site.telephone,
    email: site.emailContact,
    vatID: site.legal.tva,
    address: adresse(),
    areaServed: zonesDesservies(),
    knowsAbout: services.map((service) => service.title),
    knowsLanguage: 'fr',
    foundingDate: site.chiffres.anneeCreation
      ? String(site.chiffres.anneeCreation)
      : null,
    numberOfEmployees: site.chiffres.nbSalaries
      ? { '@type': 'QuantitativeValue', value: site.chiffres.nbSalaries }
      : null,
    sameAs: site.reseaux.map((reseau) => reseau.url),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Prestations de nettoyage professionnel',
      itemListElement: services.map((service) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: service.title,
          description: service.excerpt,
          url: absoluteUrl(`/services/${service.slug}`),
        },
      })),
    },
  });

  const website = {
    '@type': 'WebSite',
    '@id': SITE_ID,
    name: site.nom,
    url: absoluteUrl('/'),
    inLanguage: 'fr-FR',
    publisher: { '@id': ORGANISATION_ID },
  };

  return { '@context': 'https://schema.org', '@graph': [business, website] };
}

export function serviceLd(input: {
  name: string;
  description: string;
  url: string;
  prestations?: string[];
  image?: string;
}): Json {
  return compact({
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: input.name,
    description: input.description,
    url: absoluteUrl(input.url),
    serviceType: input.name,
    category: 'Nettoyage professionnel',
    image: input.image ? absoluteUrl(input.image) : null,
    provider: { '@id': ORGANISATION_ID },
    areaServed: zonesDesservies(),
    audience: { '@type': 'BusinessAudience', name: 'Entreprises, copropriétés et établissements' },
    hasOfferCatalog: input.prestations?.length
      ? {
          '@type': 'OfferCatalog',
          name: `${input.name} — ce qui est inclus`,
          itemListElement: input.prestations.map((prestation) => ({
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name: prestation },
          })),
        }
      : null,
  });
}

/** Page secteur : le nettoyage professionnel vu depuis un type de site. */
export function secteurLd(input: {
  name: string;
  description: string;
  url: string;
  services: Array<{ title: string; slug: string }>;
  image?: string;
}): Json {
  return compact({
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `Nettoyage professionnel — ${input.name}`,
    description: input.description,
    url: absoluteUrl(input.url),
    serviceType: 'Nettoyage professionnel',
    image: input.image ? absoluteUrl(input.image) : null,
    provider: { '@id': ORGANISATION_ID },
    areaServed: zonesDesservies(),
    audience: { '@type': 'BusinessAudience', name: input.name },
    isRelatedTo: input.services.map((service) => ({
      '@type': 'Service',
      name: service.title,
      url: absoluteUrl(`/services/${service.slug}`),
    })),
  });
}

export function breadcrumbLd(
  items: Array<{ name: string; url: string }>,
): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.url),
    })),
  };
}

export function faqLd(
  items: Array<{ question: string; reponse: string }>,
): Json | null {
  if (items.length === 0) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.reponse },
    })),
  };
}

export function jobPostingLd(input: {
  title: string;
  description: string;
  datePosted: string;
  employmentType: string;
  lieu: string;
  url: string;
}): Json {
  return compact({
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: input.title,
    description: input.description,
    datePosted: input.datePosted,
    employmentType: input.employmentType,
    url: absoluteUrl(input.url),
    hiringOrganization: {
      '@type': 'Organization',
      name: site.nom,
      sameAs: absoluteUrl('/'),
      logo: absoluteUrl('/logo.png'),
    },
    jobLocation: {
      '@type': 'Place',
      address: { '@type': 'PostalAddress', addressLocality: input.lieu },
    },
  });
}

export function articleLd(input: {
  title: string;
  description: string;
  datePublished: string;
  author: string;
  url: string;
}): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: input.title,
    description: input.description,
    datePublished: input.datePublished,
    dateModified: input.datePublished,
    inLanguage: 'fr-FR',
    image: absoluteUrl(`${input.url}/opengraph-image`),
    author: { '@type': 'Person', name: input.author },
    publisher: { '@id': ORGANISATION_ID },
    isPartOf: { '@id': SITE_ID },
    mainEntityOfPage: absoluteUrl(input.url),
  };
}
