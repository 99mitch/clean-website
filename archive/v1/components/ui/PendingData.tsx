import type { ReactNode } from 'react';

/**
 * Emplacement d'une donnée non encore validée par le client (§0).
 * Rend un bloc neutre en développement, RIEN en production.
 * Aucun chiffre, logo, avis ou certification ne doit être inventé.
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
    <div
      data-pending-data
      className={`rounded border border-dashed border-steel/60 bg-frost px-4 py-3 font-mono text-13 text-slate ${className}`}
    >
      {'{{ '}
      {label}
      {' }}'}
    </div>
  );
}

/**
 * Rend `children` seulement si la donnée existe, sinon un `PendingData`.
 * Évite d'éparpiller les tests de nullité dans les pages.
 */
export function WhenAvailable<T>({
  value,
  label,
  children,
}: {
  value: T | null | undefined;
  label: string;
  children: (value: T) => ReactNode;
}) {
  if (value === null || value === undefined || (Array.isArray(value) && value.length === 0)) {
    return <PendingData label={label} />;
  }
  return <>{children(value)}</>;
}
