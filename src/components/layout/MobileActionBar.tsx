import Link from 'next/link';
import { Icon } from '@/components/ui/Icon';
import { telHref } from '@/config/site';
import { nav } from '@/copy/common';

/** Barre d'action fixe en bas sur mobile (§6) : Appeler / Devis. */
export function MobileActionBar() {
  const tel = telHref();

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 border-t border-ink bg-paper pb-[env(safe-area-inset-bottom)] sm:hidden">
      {tel ? (
        <a
          href={tel}
          data-analytics="tel_click"
          className="flex min-h-14 items-center justify-center gap-2 border-r border-ink px-2 text-center font-mono text-13 font-medium uppercase tracking-[0.06em] min-[375px]:tracking-[0.12em] text-ink"
        >
          <Icon name="phone" size={17} />
          {nav.appeler}
        </a>
      ) : (
        <Link
          href="/contact"
          className="flex min-h-14 items-center justify-center gap-2 border-r border-ink px-2 text-center font-mono text-13 font-medium uppercase tracking-[0.06em] min-[375px]:tracking-[0.12em] text-ink"
        >
          <Icon name="mail" size={17} />
          Contact
        </Link>
      )}
      <Link
        href="/devis"
        className="flex min-h-14 items-center justify-center bg-signal px-2 text-center font-mono text-13 font-medium uppercase tracking-[0.06em] min-[375px]:tracking-[0.12em] text-white"
      >
        {nav.devis}
      </Link>
    </div>
  );
}
