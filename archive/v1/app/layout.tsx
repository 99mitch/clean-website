import type { Metadata, Viewport } from 'next';
import { Analytics } from '@vercel/analytics/next';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { MobileActionBar } from '@/components/layout/MobileActionBar';
import { JsonLd } from '@/components/seo/JsonLd';
import { site } from '@/config/site';
import { nav } from '@/copy/common';
import { fontVariables } from '@/lib/fonts';
import { localBusiness } from '@/lib/seo/jsonld';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(site.domaine),
  title: {
    default: `${site.nom} — ${site.baseline}`,
    template: `%s — ${site.nom}`,
  },
  description: site.baseline,
  applicationName: site.nom,
  formatDetection: { telephone: true },
};

export const viewport: Viewport = {
  themeColor: '#0B2E4F',
  colorScheme: 'light',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;

  return (
    <html lang="fr" className={fontVariables}>
      <head>
        {/* Plausible : sans cookie, donc aucun bandeau de consentement (§9). */}
        {plausibleDomain ? (
          <script
            defer
            data-domain={plausibleDomain}
            src="https://plausible.io/js/script.js"
          />
        ) : null}
      </head>
      <body className="flex min-h-dvh flex-col antialiased">
        <a
          href="#contenu"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-navy focus:px-4 focus:py-3 focus:text-white"
        >
          {nav.skipToContent}
        </a>

        <Header />

        <main id="contenu" className="flex-1">
          {children}
        </main>

        <Footer />
        <MobileActionBar />

        {/* Slot réservé au widget d'assistant V2 (§11) — vide en V1. */}
        <div id="assistant-slot" />

        <JsonLd data={localBusiness()} />
        <Analytics />
      </body>
    </html>
  );
}
