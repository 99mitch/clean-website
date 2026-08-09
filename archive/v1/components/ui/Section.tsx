import type { ReactNode } from 'react';
import { Container } from './Container';
import { Reveal } from './Reveal';

type Tone = 'light' | 'frost' | 'navy' | 'ink';

const tones: Record<Tone, string> = {
  light: 'bg-white text-ink',
  frost: 'bg-frost text-ink',
  navy: 'bg-navy text-white on-dark',
  ink: 'bg-ink text-white on-dark',
};

export function Section({
  children,
  tone = 'light',
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

export function SectionHeader({
  eyebrow,
  title,
  intro,
  id,
  tone = 'light',
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  id?: string;
  tone?: Tone;
}) {
  const dim = tone === 'navy' || tone === 'ink' ? 'text-white/70' : 'text-slate';
  return (
    <Reveal className="max-w-[52ch]">
      {eyebrow ? (
        <p className={`eyebrow mb-4 ${tone === 'light' || tone === 'frost' ? 'text-slate' : 'text-white/60'}`}>
          {eyebrow}
        </p>
      ) : null}
      <h2 id={id} className="text-28 lg:text-40">
        {title}
      </h2>
      {intro ? <p className={`mt-5 text-17 ${dim}`}>{intro}</p> : null}
    </Reveal>
  );
}
