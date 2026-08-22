import type { ReactNode } from 'react';
import { Container } from './Container';
import { Reveal } from './Reveal';

type Tone = 'paper' | 'white' | 'abyss' | 'cobalt';

const tones: Record<Tone, string> = {
  paper: 'bg-paper text-ink',
  white: 'bg-white text-ink',
  abyss: 'on-dark hatch-dark bg-abyss text-paper',
  cobalt: 'on-dark hatch-dark bg-cobalt text-paper',
};

export function Section({
  children,
  tone = 'paper',
  className = '',
  id,
  labelledBy,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
  id?: string;
  labelledBy?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={`${tones[tone]} py-20 lg:py-28 ${className}`}
    >
      <Container>{children}</Container>
    </section>
  );
}

/**
 * Tête de section : filet plein, libellé monospace à gauche, complément à
 * droite. C'est la structure d'un dossier — la même en tête de chaque page
 * et de chaque section, ce qui donne au site son unité sans effet visuel.
 */
export function SectionHead({
  label,
  title,
  intro,
  aside,
  id,
  tone = 'paper',
}: {
  /** Libellé monospace du filet de tête. Facultatif sur les sous-sections. */
  label?: string;
  title: string;
  intro?: string;
  /** Complément aligné à droite du filet : compte, référence, unité. */
  aside?: string;
  id?: string;
  tone?: Tone;
}) {
  const dark = tone === 'abyss' || tone === 'cobalt';
  const ruleColor = dark ? 'border-paper/85' : 'border-ink';
  const dim = dark ? 'text-paper/65' : 'text-slate';

  return (
    <Reveal>
      <div
        className={`flex flex-wrap items-baseline justify-between gap-x-8 gap-y-1 border-t-2 pt-3 ${ruleColor}`}
      >
        {label ? <p className="eyebrow">{label}</p> : <span />}
        {aside ? <p className={`font-mono text-13 ${dim}`}>{aside}</p> : null}
      </div>

      <h2 id={id} className="mt-8 max-w-[20ch] text-28 lg:text-40">
        {title}
      </h2>
      {intro ? (
        <p className={`measure mt-5 max-w-[54ch] text-17 ${dim}`}>{intro}</p>
      ) : null}
    </Reveal>
  );
}
