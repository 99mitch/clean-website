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
}: {
  children: ReactNode;
  className?: string;
  /** Décalage en ms, pour un effet d'escalier sur une liste. */
  delay?: number;
  as?: 'div' | 'li' | 'article' | 'header' | 'section';
}) {
  return (
    <Tag
      className={`reveal ${className}`}
      style={delay ? { animationDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
