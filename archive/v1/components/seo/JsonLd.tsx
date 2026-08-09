export function JsonLd({ data }: { data: Record<string, unknown> | null }) {
  if (!data) return null;
  return (
    <script
      type="application/ld+json"
      // Données construites côté serveur à partir de contenu validé par Zod.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
