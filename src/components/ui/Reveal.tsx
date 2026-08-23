import type { ReactNode } from 'react';

/**
 * Révélation au scroll (§6). Purement CSS (scroll-driven animations) :
 * aucun JavaScript client, donc utilisable sur les pages 100 % RSC (§8).
 * `prefers-reduced-motion` neutralise l'effet dans `globals.css`.
 */
export function Reveal({
  children,
  className = '',
  delay,
  as: Tag = 'div',
  direction = 'up',
}: {
  children: ReactNode;
  className?: string;
  /** Décalage en ms, pour un effet d'escalier sur une liste. */
  delay?: number;
  as?: 'div' | 'li' | 'article' | 'header' | 'section';
  /** Sens de l'entrée : montée (défaut), ou glissement latéral discret. */
  direction?: 'up' | 'left' | 'right';
}) {
  const modifier = direction === 'up' ? '' : ` reveal-${direction}`;

  return (
    <Tag
      className={`reveal${modifier} ${className}`}
      style={delay ? { animationDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
