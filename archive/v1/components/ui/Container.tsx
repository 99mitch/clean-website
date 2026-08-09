import type { ReactNode } from 'react';

/** Grille 12 colonnes, gouttière 24px, marges généreuses (§6). */
export function Container({
  children,
  className = '',
  as: Tag = 'div',
}: {
  children: ReactNode;
  className?: string;
  as?: 'div' | 'header' | 'footer' | 'section' | 'nav';
}) {
  return (
    <Tag className={`mx-auto w-full max-w-[1280px] px-6 lg:px-10 ${className}`}>
      {children}
    </Tag>
  );
}

export function Grid({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`grid grid-cols-4 gap-6 md:grid-cols-12 ${className}`}>
      {children}
    </div>
  );
}
