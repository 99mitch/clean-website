import type { ReactNode } from 'react';

/**
 * Emplacement d'une donnée non encore validée par le client (§0).
 * Bloc neutre en développement, RIEN en production. Aucun chiffre, logo,
 * avis ou certification n'est inventé.
 */
export function PendingData({
  label,
  className = '',
}: {
  label: string;
  className?: string;
}) {
  if (process.env.NODE_ENV === 'production') return null;
  return (
    <p
      data-pending-data
      className={`border border-dashed border-graphite/70 bg-mist/60 px-4 py-3 font-mono text-13 text-slate ${className}`}
    >
      {'{{ '}
      {label}
      {' }}'}
    </p>
  );
}

/** Rend `children` si la donnée existe, sinon l'emplacement en attente. */
export function WhenAvailable<T>({
  value,
  label,
  children,
}: {
  value: T | null | undefined;
  label: string;
  children: (value: T) => ReactNode;
}) {
  if (
    value === null ||
    value === undefined ||
    (Array.isArray(value) && value.length === 0)
  ) {
    return <PendingData label={label} />;
  }
  return <>{children(value)}</>;
}
