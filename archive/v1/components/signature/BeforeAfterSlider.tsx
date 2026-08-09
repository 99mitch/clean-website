'use client';

import Image from 'next/image';
import { useCallback, useId, useRef, useState } from 'react';
import { home } from '@/copy/home';

/**
 * Élément signature (§6) : comparateur avant/après.
 * Seul endroit du site où l'on dépense de l'audace ; c'est aussi le seul,
 * avec le bouton devis, à porter le bleu accent.
 *
 * Accessibilité (§10) : poignée `role="slider"`, pilotable aux flèches,
 * `aria-valuetext` explicite, alternative textuelle décrivant les deux états.
 */
export function BeforeAfterSlider({
  avant,
  apres,
  altAvant,
  altApres,
  priority = false,
}: {
  avant: string;
  apres: string;
  altAvant: string;
  altApres: string;
  priority?: boolean;
}) {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const labelId = useId();
  const copy = home.comparateur;

  const setFromClientX = useCallback((clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect || rect.width === 0) return;
    const ratio = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(100, Math.max(0, Math.round(ratio))));
  }, []);

  const onKeyDown = (event: React.KeyboardEvent) => {
    const pas = event.shiftKey ? 10 : 2;
    const actions: Record<string, () => void> = {
      ArrowLeft: () => setPosition((p) => Math.max(0, p - pas)),
      ArrowRight: () => setPosition((p) => Math.min(100, p + pas)),
      ArrowDown: () => setPosition((p) => Math.max(0, p - pas)),
      ArrowUp: () => setPosition((p) => Math.min(100, p + pas)),
      Home: () => setPosition(0),
      End: () => setPosition(100),
    };
    const action = actions[event.key];
    if (!action) return;
    event.preventDefault();
    action();
  };

  return (
    <figure className="m-0">
      <div
        ref={containerRef}
        className="relative aspect-[16/10] w-full select-none overflow-hidden rounded bg-frost"
        onPointerDown={(event) => {
          dragging.current = true;
          event.currentTarget.setPointerCapture(event.pointerId);
          setFromClientX(event.clientX);
        }}
        onPointerMove={(event) => {
          if (dragging.current) setFromClientX(event.clientX);
        }}
        onPointerUp={() => {
          dragging.current = false;
        }}
        onPointerCancel={() => {
          dragging.current = false;
        }}
      >
        <Image
          src={avant}
          alt={altAvant}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 60vw, 100vw"
          className="object-cover"
        />

        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 0 0 ${position}%)` }}
        >
          <Image
            src={apres}
            alt={altApres}
            fill
            priority={priority}
            sizes="(min-width: 1024px) 60vw, 100vw"
            className="object-cover"
          />
        </div>

        {/* Étiquettes d'état, en monospace comme toute donnée. */}
        <span className="absolute left-4 top-4 bg-ink/80 px-3 py-1 font-mono text-13 uppercase tracking-[0.08em] text-white">
          {home.hero.fallbackAvant}
        </span>
        <span className="absolute right-4 top-4 bg-ink/80 px-3 py-1 font-mono text-13 uppercase tracking-[0.08em] text-white">
          {home.hero.fallbackApres}
        </span>

        {/* Poignée — bleu accent, l'un des trois usages autorisés. */}
        <div
          className="absolute inset-y-0 w-px bg-azure"
          style={{ left: `${position}%` }}
          aria-hidden="true"
        />
        <div
          role="slider"
          tabIndex={0}
          aria-labelledby={labelId}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={position}
          aria-valuetext={copy.valueText(position)}
          aria-orientation="horizontal"
          onKeyDown={onKeyDown}
          className="absolute top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize items-center justify-center rounded-full bg-azure text-white shadow-lg"
          style={{ left: `${position}%` }}
        >
          <span aria-hidden="true" className="flex items-center gap-1">
            <span className="block h-3 w-px bg-white" />
            <span className="block h-4 w-px bg-white" />
            <span className="block h-3 w-px bg-white" />
          </span>
        </div>
      </div>

      <figcaption id={labelId} className="mt-4 max-w-[60ch] text-15 text-slate">
        {copy.instructions}
        <span className="sr-only"> {copy.alternative}</span>
      </figcaption>
    </figure>
  );
}
