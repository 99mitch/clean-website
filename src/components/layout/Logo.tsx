import Image from 'next/image';
import { site } from '@/config/site';
import { LOGO_MARQUE } from '@/lib/photos';

/**
 * Logo : monogramme CB suivi de la graphie en minuscules. Le monogramme est
 * décoratif ici, le nom écrit à côté porte l'information.
 */
export function Logo({ tone = 'ink' }: { tone?: 'ink' | 'paper' }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <Image
        src={LOGO_MARQUE.src}
        alt=""
        // Taille d'affichage fixe : srcset 1x / 2x, chargé d'emblée (au-dessus de la ligne de flottaison).
        width={48}
        height={Math.round((48 * LOGO_MARQUE.height) / LOGO_MARQUE.width)}
        loading="eager"
        className="h-9 w-auto"
      />
      <span
        className={`font-display text-21 font-extrabold tracking-[-0.06em] ${
          tone === 'paper' ? 'text-paper' : 'text-ink'
        }`}
      >
        {site.logo}
      </span>
    </span>
  );
}
