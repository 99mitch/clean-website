import type { Metadata, Viewport } from 'next';
import { Analytics } from '@vercel/analytics/next';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { MobileActionBar } from '@/components/layout/MobileActionBar';
import { JsonLd } from '@/components/seo/JsonLd';
import { site } from '@/config/site';
import { nav } from '@/copy/common';
import { home } from '@/copy/home';
import { fontVariables } from '@/lib/fonts';
import { getServices } from '@/lib/content';
import { organisationGraph } from '@/lib/seo/jsonld';
import './globals.css';

const verificationGoogle = process.env.GOOGLE_SITE_VERIFICATION;
const verificationBing = process.env.BING_SITE_VERIFICATION;

export const metadata: Metadata = {
  metadataBase: new URL(site.domaine),
  title: {
    default: `${site.nom} — Entreprise de nettoyage à Paris et en Île-de-France`,
    template: `%s — ${site.nom}`,
  },
  description: home.meta.description,
  applicationName: site.nom,
  authors: [{ name: site.nom, url: site.domaine }],
  creator: site.nom,
  publisher: site.nom,
  category: 'business',
  formatDetection: { telephone: true, email: false, address: false },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    type: 'website',
    siteName: site.nom,
    locale: 'fr_FR',
  },
  twitter: { card: 'summary_large_image' },
  appleWebApp: { title: site.nom, statusBarStyle: 'default' },
  // Codes de validation Search Console / Bing Webmaster, fournis par variable d'environnement.
  verification: {
    google: verificationGoogle,
    other: verificationBing ? { 'msvalidate.01': verificationBing } : undefined,
  },
};

export const viewport: Viewport = {
  // Même teinte que le header sticky : la barre du navigateur mobile s'y fond.
  themeColor: '#F6F8FB',
  colorScheme: 'light',
  width: 'device-width',
  initialScale: 1,
  // Nécessaire pour que `env(safe-area-inset-bottom)` décolle la barre
  // d'action mobile de la barre d'accueil iOS.
  viewportFit: 'cover',
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const services = (await getServices()).map((service) => ({
    title: service.meta.title,
    slug: service.meta.slug,
    excerpt: service.meta.excerpt,
  }));
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
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-cobalt focus:px-4 focus:py-3 focus:text-white"
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

        <JsonLd data={organisationGraph(services)} />
        {/* Le script n'existe que sur l'infrastructure Vercel : ailleurs, il répondrait 404. */}
        {process.env.VERCEL ? <Analytics /> : null}
      </body>
    </html>
  );
}
