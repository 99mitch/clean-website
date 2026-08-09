import type { ReactNode } from 'react';

/** Empan du dossier : 1320px, gouttière 24px, marges généreuses. */
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
    <Tag className={`mx-auto w-full max-w-[1320px] px-6 lg:px-10 ${className}`}>
      {children}
    </Tag>
  );
}
