import { track as vercelTrack } from '@vercel/analytics';

/** Événements suivis (§9). Liste fermée : pas d'événement improvisé. */
export type AnalyticsEvent =
  | `devis_step_${1 | 2 | 3 | 4 | 5}`
  | 'devis_submit'
  | 'tel_click'
  | 'plaquette_download';

type Props = Record<string, string | number | boolean>;

declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: Props }) => void;
  }
}

export function track(event: AnalyticsEvent, props?: Props) {
  if (typeof window === 'undefined') return;
  try {
    vercelTrack(event, props);
    window.plausible?.(event, props ? { props } : undefined);
  } catch {
    // L'analytics ne doit jamais casser un parcours de conversion.
  }
}
