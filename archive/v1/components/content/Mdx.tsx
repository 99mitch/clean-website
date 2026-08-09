import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import type { ComponentProps } from 'react';
import { fr } from '@/lib/typo';

/**
 * Rendu MDX 100 % serveur : aucune dépendance client sur les pages de
 * contenu (§8). Les composants exposés au MDX sont volontairement peu
 * nombreux — le contenu reste du texte, pas de la mise en page.
 */

function frText(children: React.ReactNode): React.ReactNode {
  if (typeof children === 'string') return fr(children);
  if (Array.isArray(children)) return children.map((c, i) => <span key={i}>{frText(c)}</span>);
  return children;
}

const components = {
  h2: (props: ComponentProps<'h2'>) => (
    <h2 {...props} className="mt-14 text-28">
      {frText(props.children)}
    </h2>
  ),
  h3: (props: ComponentProps<'h3'>) => (
    <h3 {...props} className="mt-10 text-21">
      {frText(props.children)}
    </h3>
  ),
  p: (props: ComponentProps<'p'>) => (
    <p {...props} className="mt-5 text-17 text-slate">
      {frText(props.children)}
    </p>
  ),
  ul: (props: ComponentProps<'ul'>) => (
    <ul {...props} className="mt-5 space-y-3" />
  ),
  ol: (props: ComponentProps<'ol'>) => (
    <ol {...props} className="mt-5 list-decimal space-y-3 pl-5" />
  ),
  li: (props: ComponentProps<'li'>) => (
    <li
      {...props}
      className="relative pl-6 text-17 text-slate before:absolute before:left-0 before:top-[0.7em] before:h-px before:w-3 before:bg-steel marker:font-mono marker:text-slate [ol>&]:pl-0 [ol>&]:before:hidden"
    >
      {frText(props.children)}
    </li>
  ),
  strong: (props: ComponentProps<'strong'>) => (
    <strong {...props} className="font-semibold text-ink" />
  ),
  a: ({ href = '#', children, ...rest }: ComponentProps<'a'>) => {
    const cls = 'text-navy underline underline-offset-4 hover:text-azure';
    if (href.startsWith('/')) {
      return (
        <Link href={href} className={cls}>
          {children}
        </Link>
      );
    }
    return (
      <a href={href} rel="noopener noreferrer" className={cls} {...rest}>
        {children}
      </a>
    );
  },
  blockquote: (props: ComponentProps<'blockquote'>) => (
    <blockquote
      {...props}
      className="mt-8 border-l-2 border-azure pl-6 text-21 text-ink"
    />
  ),
  hr: () => <hr className="rule my-12 border-t" />,
};

export function Mdx({ source }: { source: string }) {
  return (
    <div className="measure">
      <MDXRemote source={source} components={components} />
    </div>
  );
}
