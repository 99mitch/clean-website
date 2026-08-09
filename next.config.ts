import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // TypeScript strict bloquant : le build de prod doit passer sans warning (§3).
  // Le lint tourne via `pnpm lint`, séparément du build sous Next 16.
  typescript: { ignoreBuildErrors: false },

  images: {
    // AVIF puis WebP (§8).
    formats: ['image/avif', 'image/webp'],
  },

  poweredByHeader: false,

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
