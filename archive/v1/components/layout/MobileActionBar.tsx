import Link from 'next/link';
import { Icon } from '@/components/ui/Icon';
import { telHref } from '@/config/site';
import { nav } from '@/copy/common';

/** Barre d'action fixe en bas sur mobile (§6) : Appeler / Devis. */
export function MobileActionBar() {
  const tel = telHref();

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-steel/30 bg-white/95 backdrop-blur-sm sm:hidden">
      <div className="grid grid-cols-2 gap-px bg-steel/30">
        {tel ? (
          <a
            href={tel}
            data-analytics="tel_click"
            className="flex min-h-14 items-center justify-center gap-2 bg-white text-15 font-medium text-navy"
          >
            <Icon name="phone" size={18} />
            {nav.appeler}
          </a>
        ) : (
          <Link
            href="/contact"
            className="flex min-h-14 items-center justify-center gap-2 bg-white text-15 font-medium text-navy"
          >
            <Icon name="mail" size={18} />
            Contact
          </Link>
        )}
        <Link
          href="/devis"
          className="flex min-h-14 items-center justify-center bg-azure text-15 font-medium text-white"
        >
          {nav.devis}
        </Link>
      </div>
    </div>
  );
}
