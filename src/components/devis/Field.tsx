'use client';

import type { ComponentProps, ReactNode } from 'react';

/*
 * Champs de formulaire : pas de boîte arrondie, un filet plein sous la ligne
 * de saisie — la même écriture que les tableaux du site.
 */
const control =
  'w-full min-h-11 border-0 border-b-2 border-graphite/60 bg-transparent px-0 py-3 text-17 text-ink placeholder:text-graphite focus:border-ink focus:outline-none';

export function Field({
  id,
  label,
  optionnel,
  aide,
  error,
  children,
}: {
  id: string;
  label: string;
  optionnel?: string;
  aide?: string;
  error?: string;
  children: (props: {
    id: string;
    'aria-invalid': boolean | undefined;
    'aria-describedby': string | undefined;
    className: string;
  }) => ReactNode;
}) {
  const aideId = aide ? `${id}-aide` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [aideId, errorId].filter(Boolean).join(' ') || undefined;

  return (
    <div>
      <label htmlFor={id} className="flex items-baseline gap-2 text-15 font-medium text-ink">
        {label}
        {optionnel ? (
          <span className="font-mono text-13 font-normal text-slate">
            {optionnel}
          </span>
        ) : null}
      </label>
      {aide ? (
        <p id={aideId} className="mt-1 text-13 text-slate">
          {aide}
        </p>
      ) : null}
      <div className="mt-2">
        {children({
          id,
          'aria-invalid': error ? true : undefined,
          'aria-describedby': describedBy,
          className: `${control} ${error ? 'border-[#B3261E]!' : ''}`,
        })}
      </div>
      {error ? (
        <p id={errorId} className="mt-2 text-13 font-medium text-[#B3261E]">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function TextArea(props: ComponentProps<'textarea'>) {
  return <textarea rows={4} {...props} />;
}
