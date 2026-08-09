import 'server-only';

/**
 * Rate-limit par IP (§7). Implémentation en mémoire : suffisante en V1 avec
 * Fluid Compute (les instances sont réutilisées entre requêtes) et sans
 * dépendance supplémentaire. À remplacer par un store partagé si le volume
 * de trafic le justifie.
 */

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

export function rateLimit(
  key: string,
  { limit = 5, windowMs = 10 * 60 * 1000 } = {},
): { ok: boolean; retryAfter: number } {
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, retryAfter: 0 };
  }

  bucket.count += 1;

  // Purge opportuniste : évite que la Map grossisse indéfiniment.
  if (buckets.size > 5000) {
    for (const [k, b] of buckets) if (b.resetAt <= now) buckets.delete(k);
  }

  if (bucket.count > limit) {
    return { ok: false, retryAfter: Math.ceil((bucket.resetAt - now) / 1000) };
  }
  return { ok: true, retryAfter: 0 };
}

/** IP client derrière le proxy Vercel. `unknown` si absente. */
export function clientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  return forwarded?.split(',')[0]?.trim() || 'unknown';
}

/** IP tronquée pour la journalisation — on ne conserve pas l'adresse complète. */
export function anonymiseIp(ip: string): string {
  if (ip.includes(':')) return `${ip.split(':').slice(0, 3).join(':')}::`;
  return `${ip.split('.').slice(0, 3).join('.')}.0`;
}
