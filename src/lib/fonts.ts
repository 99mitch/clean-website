import localFont from 'next/font/local';

/**
 * Polices auto-hébergées (§8) : subset latin, `display: swap`,
 * préchargement des graisses réellement utilisées.
 */

export const bricolage = localFont({
  src: [
    {
      path: '../fonts/BricolageGrotesque-400800.woff2',
      weight: '400 800',
      style: 'normal',
    },
  ],
  variable: '--font-bricolage',
  display: 'swap',
  preload: true,
  fallback: ['ui-sans-serif', 'system-ui', 'sans-serif'],
});

export const instrument = localFont({
  src: [
    {
      path: '../fonts/InstrumentSans-400700.woff2',
      weight: '400 700',
      style: 'normal',
    },
  ],
  variable: '--font-instrument',
  display: 'swap',
  preload: true,
  fallback: ['ui-sans-serif', 'system-ui', 'sans-serif'],
});

export const plexMono = localFont({
  src: [
    { path: '../fonts/IBMPlexMono-400.woff2', weight: '400', style: 'normal' },
    { path: '../fonts/IBMPlexMono-500.woff2', weight: '500', style: 'normal' },
  ],
  variable: '--font-plex-mono',
  display: 'swap',
  preload: true,
  fallback: ['ui-monospace', 'monospace'],
});

export const fontVariables = [
  bricolage.variable,
  instrument.variable,
  plexMono.variable,
].join(' ');
