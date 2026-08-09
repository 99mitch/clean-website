'use client';

import type { ReactNode } from 'react';

/**
 * Choix du parcours devis — une ligne de registre, pas une carte.
 *
 * Radio ou case native, visuellement remplacée par une plaque carrée : le
 * contrôle reste focusable et annoncé, la cible dépasse largement 44px (§10).
 * Sélectionné, la ligne s'inverse en encre — l'état est lisible sans couleur.
 */
export function ChoiceCard({
  type,
  name,
  value,
  label,
  aide,
  checked,
  onChange,
  describedBy,
}: {
  type: 'radio' | 'checkbox';
  name: string;
  value: string;
  label: string;
  aide?: string;
  checked: boolean;
  onChange: (value: string, checked: boolean) => void;
  describedBy?: string;
}) {
  const aideId = aide ? `${name}-${value}-aide` : undefined;

  return (
    <label
      className={`group flex min-h-[4.5rem] cursor-pointer items-center gap-5 border-b border-graphite/45 px-4 py-5 transition-colors duration-150 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:-outline-offset-2 has-[:focus-visible]:outline-signal ${
        checked ? 'bg-ink text-paper' : 'bg-transparent text-ink hover:bg-white'
      }`}
    >
      <input
        type={type}
        name={name}
        value={value}
        checked={checked}
        onChange={(event) => onChange(value, event.currentTarget.checked)}
        aria-describedby={[aideId, describedBy].filter(Boolean).join(' ') || undefined}
        className="sr-only"
      />

      {/* Plaque d'état : pleine quand sélectionné, filetée sinon. */}
      <span
        aria-hidden="true"
        className={`block h-5 w-5 shrink-0 border transition-colors duration-150 ${
          checked ? 'border-paper bg-paper' : 'border-ink bg-transparent'
        }`}
      />

      <span className="flex flex-1 flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
        <span className="text-17 font-medium">{label}</span>
        {aide ? (
          <span
            id={aideId}
            className={`font-mono text-13 ${checked ? 'text-paper/65' : 'text-slate'}`}
          >
            {aide}
          </span>
        ) : null}
      </span>
    </label>
  );
}

export function Fieldset({
  legend,
  aide,
  error,
  errorId,
  children,
}: {
  legend: string;
  aide?: string;
  error?: string;
  errorId?: string;
  children: ReactNode;
}) {
  return (
    <fieldset>
      <legend className="max-w-[16ch] text-28 tracking-[-0.05em] lg:text-40">
        {legend}
      </legend>
      {aide ? (
        <p className="mt-5 max-w-[52ch] text-17 text-slate">{aide}</p>
      ) : null}
      {error ? (
        <p
          id={errorId}
          role="alert"
          className="mt-5 border-l-2 border-[#B3261E] pl-4 text-15 font-medium text-[#B3261E]"
        >
          {error}
        </p>
      ) : null}
      <div className="mt-10 border-t-2 border-ink">{children}</div>
    </fieldset>
  );
}
