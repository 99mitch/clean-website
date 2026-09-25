import type { MetadataRoute } from 'next';
import { absoluteUrl } from '@/config/site';

/** Pages sans intérêt en résultat de recherche : confirmation et API. */
const EXCLUS = ['/devis/merci', '/api/'];

/**
 * Robots des moteurs de réponse IA, autorisés explicitement (GEO) : c'est
 * par eux que l'entreprise est citée dans ChatGPT, Claude, Perplexity ou
 * les AI Overviews. Le résumé à leur intention est dans `/llms.txt`.
 */
const ROBOTS_IA = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-SearchBot',
  'Claude-User',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'Applebot-Extended',
  'Bingbot',
  'CCBot',
  'MistralAI-User',
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: EXCLUS },
      { userAgent: ROBOTS_IA, allow: '/', disallow: EXCLUS },
    ],
    sitemap: absoluteUrl('/sitemap.xml'),
  };
}
