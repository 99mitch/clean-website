import 'server-only';
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';
import { cache } from 'react';
import type { z } from 'zod';
import {
  articleSchema,
  membreSchema,
  offreSchema,
  referenceSchema,
  secteurSchema,
  serviceSchema,
} from './schemas';

const CONTENT_DIR = path.join(process.cwd(), 'content');

export type Entry<T> = {
  meta: T;
  /** Corps MDX brut — compilé par `<Mdx />` côté page. */
  body: string;
};

async function loadCollection<S extends z.ZodType>(
  dir: string,
  schema: S,
): Promise<Entry<z.infer<S>>[]> {
  let files: string[];
  try {
    files = (await readdir(path.join(CONTENT_DIR, dir))).filter((f) =>
      f.endsWith('.mdx'),
    );
  } catch {
    return [];
  }

  const entries = await Promise.all(
    files.map(async (file) => {
      const raw = await readFile(path.join(CONTENT_DIR, dir, file), 'utf8');
      const { data, content } = matter(raw);
      const parsed = schema.safeParse(data);
      if (!parsed.success) {
        throw new Error(
          `Frontmatter invalide — content/${dir}/${file}\n${JSON.stringify(
            parsed.error.issues,
            null,
            2,
          )}`,
        );
      }
      return { meta: parsed.data, body: content } as Entry<z.infer<S>>;
    }),
  );

  return entries.sort((a, b) => {
    const am = a.meta as { order?: number; date?: string };
    const bm = b.meta as { order?: number; date?: string };
    if (am.date && bm.date) return bm.date.localeCompare(am.date);
    return (am.order ?? 0) - (bm.order ?? 0);
  });
}

export const getServices = cache(() => loadCollection('services', serviceSchema));
export const getSecteurs = cache(() => loadCollection('secteurs', secteurSchema));
export const getReferences = cache(() =>
  loadCollection('references', referenceSchema),
);
export const getArticles = cache(() => loadCollection('blog', articleSchema));
export const getEquipe = cache(() => loadCollection('equipe', membreSchema));
export const getOffres = cache(() => loadCollection('offres', offreSchema));

async function findBySlug<T extends { slug: string }>(
  entries: Promise<Entry<T>[]>,
  slug: string,
): Promise<Entry<T> | undefined> {
  return (await entries).find((entry) => entry.meta.slug === slug);
}

export const getService = (slug: string) => findBySlug(getServices(), slug);
export const getSecteur = (slug: string) => findBySlug(getSecteurs(), slug);
export const getReference = (slug: string) => findBySlug(getReferences(), slug);
export const getArticle = (slug: string) => findBySlug(getArticles(), slug);
export const getOffre = (slug: string) => findBySlug(getOffres(), slug);

/** Services pertinents pour un secteur — croisement §4. */
export async function servicesForSecteur(secteurSlug: string) {
  const [services, secteurs] = await Promise.all([getServices(), getSecteurs()]);
  const secteur = secteurs.find((s) => s.meta.slug === secteurSlug);
  const wanted = new Set(secteur?.meta.services ?? []);
  return services.filter((s) => wanted.has(s.meta.slug));
}

/** Secteurs pertinents pour un service — croisement inverse. */
export async function secteursForService(serviceSlug: string) {
  const [services, secteurs] = await Promise.all([getServices(), getSecteurs()]);
  const service = services.find((s) => s.meta.slug === serviceSlug);
  const wanted = new Set(service?.meta.secteurs ?? []);
  return secteurs.filter((s) => wanted.has(s.meta.slug));
}

export async function referencesForSecteur(secteurSlug: string) {
  return (await getReferences()).filter((r) => r.meta.secteur === secteurSlug);
}
