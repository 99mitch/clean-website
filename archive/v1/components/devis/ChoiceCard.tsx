'use client';

import type { ReactNode } from 'react';

/**
 * Choix d'un parcours devis. Radio ou checkbox natifs, visuellement masqués
 * mais focusables : navigation clavier et lecteurs d'écran conservés (§10).
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
      className={`group relative flex min-h-[4.5rem] cursor-pointer items-start gap-4 rounded border p-5 transition-colors duration-150 ${
        checked
          ? 'border-navy bg-frost'
          : 'border-steel/40 bg-white hover:border-navy'
      } has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-navy`}
    >
      <input
        type={type}
        name={name}
        value={value}
        checked={checked}
        onChange={(event) => onChange(value, event.currentTarget.checked)}
        aria-describedby={[aideId, describedBy].filter(Boolean).join(' ') || undefined}
        className="mt-1 size-5 shrink-0 accent-navy"
      />
      <span className="flex flex-col gap-1">
        <span className="text-17 font-medium text-ink">{label}</span>
        {aide ? (
          <span id={aideId} className="text-15 text-slate">
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
      <legend className="text-28 lg:text-40">{legend}</legend>
      {aide ? <p className="mt-4 max-w-[52ch] text-17 text-slate">{aide}</p> : null}
      {error ? (
        <p id={errorId} role="alert" className="mt-4 text-15 font-medium text-[#B3261E]">
          {error}
        </p>
      ) : null}
      <div className="mt-8 grid gap-3 sm:grid-cols-2">{children}</div>
    </fieldset>
  );
}
