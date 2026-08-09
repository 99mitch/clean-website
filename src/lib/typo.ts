/**
 * Typographie française (§12) : apostrophes typographiques et espaces
 * insécables avant `: ; ? !` et à l'intérieur des guillemets « … ».
 *
 * Les fichiers de `src/copy/` s'écrivent naturellement, avec des apostrophes
 * droites et des espaces normales ; `frenchify()` normalise à l'export.
 */

const NBSP = ' ';

export function fr(text: string): string {
  return (
    text
      // Apostrophe typographique — jamais entre deux chiffres (3'20 n'existe pas ici).
      .replace(/(\p{L})'(\p{L})/gu, '$1’$2')
      // Espace insécable avant la ponctuation haute.
      .replace(/[ ]+([;:?!])/g, `${NBSP}$1`)
      // Guillemets français.
      .replace(/«[ ]+/g, `«${NBSP}`)
      .replace(/[ ]+»/g, `${NBSP}»`)
      // Espace insécable dans les unités et les grands nombres.
      .replace(/(\d)[ ]+(%|€|m²|h|km|kg|min)/g, `$1${NBSP}$2`)
  );
}

type Frenchifiable = string | number | boolean | null | undefined | object;

/** Applique `fr()` à toutes les chaînes d'une structure, en profondeur. */
export function frenchify<T extends Frenchifiable>(value: T): T {
  if (typeof value === 'string') return fr(value) as T;
  if (Array.isArray(value)) return value.map(frenchify) as T;
  if (value && typeof value === 'object') {
    const out: Record<string, unknown> = {};
    for (const [key, val] of Object.entries(value)) {
      out[key] = frenchify(val as Frenchifiable);
    }
    return out as T;
  }
  return value;
}
