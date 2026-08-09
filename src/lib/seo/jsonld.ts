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

export function localBusiness(): Json {
  return compact({
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': absoluteUrl('/#organisation'),
    name: site.nom,
    description: site.baseline,
    url: absoluteUrl('/'),
    telephone: site.telephone,
    email: site.emailContact,
    vatID: site.legal.tva,
    address: site.adresseSiege
      ? {
          '@type': 'PostalAddress',
          streetAddress: site.adresseSiege.rue,
          postalCode: site.adresseSiege.codePostal,
          addressLocality: site.adresseSiege.ville,
          addressCountry: site.adresseSiege.pays,
        }
      : null,
    areaServed: site.zoneIntervention
      ? { '@type': 'AdministrativeArea', name: site.zoneIntervention }
      : null,
    foundingDate: site.chiffres.anneeCreation
      ? String(site.chiffres.anneeCreation)
      : null,
    numberOfEmployees: site.chiffres.nbSalaries
      ? { '@type': 'QuantitativeValue', value: site.chiffres.nbSalaries }
      : null,
  });
}

export function serviceLd(input: {
  name: string;
  description: string;
  url: string;
}): Json {
  return compact({
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: input.name,
    description: input.description,
    url: absoluteUrl(input.url),
    serviceType: input.name,
    provider: { '@id': absoluteUrl('/#organisation') },
    areaServed: site.zoneIntervention
      ? { '@type': 'AdministrativeArea', name: site.zoneIntervention }
      : null,
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
    author: { '@type': 'Person', name: input.author },
    publisher: { '@id': absoluteUrl('/#organisation') },
    mainEntityOfPage: absoluteUrl(input.url),
  };
}
