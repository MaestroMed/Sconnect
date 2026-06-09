import type { NextConfig } from "next";
import bundleAnalyzer from "@next/bundle-analyzer";
import { withSentryConfig } from "@sentry/nextjs";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
  openAnalyzer: false,
});

const nextConfig: NextConfig = {
  // Configuration des images optimisées
  images: {
    // Domaines autorisés (remplacer ** par domaines spécifiques en prod)
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    // Formats d'images modernes
    formats: ['image/avif', 'image/webp'],
    // Tailles d'appareils pour l'optimisation responsive
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    // Tailles d'images pour les layouts
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Minimums pour optimisation
    minimumCacheTTL: 60,
  },

  // Headers de sécurité et performance
  async headers() {
    // Content Security Policy
    // - 'unsafe-inline' kept on script for the Schema.org JSON-LD injections
    //   and the Next.js runtime (which uses inline scripts for hydration).
    //   A follow-up step would migrate these to nonces via middleware.
    // - connect-src includes Supabase, Resend, Vercel Analytics + Speed Insights,
    //   Google Analytics/Tag Manager.
    const csp = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://va.vercel-scripts.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "img-src 'self' data: blob: https:",
      "font-src 'self' https://fonts.gstatic.com data:",
      "connect-src 'self' https://*.supabase.co https://api.resend.com https://www.google-analytics.com https://vitals.vercel-insights.com https://vercel.live",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "object-src 'none'",
      "upgrade-insecure-requests",
    ].join("; ");

    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Permissions-Policy',
            value:
              'camera=(), microphone=(), geolocation=(), interest-cohort=(), browsing-topics=()',
          },
          { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
          { key: 'Content-Security-Policy', value: csp },
        ],
      },
      // Long-lived immutable cache for static assets served by Next
      {
        source: '/_next/static/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ];
  },

  // Optimisations expérimentales
  experimental: {
    optimizePackageImports: [
      'lucide-react',
      'framer-motion',
      '@radix-ui/react-navigation-menu',
      '@radix-ui/react-accordion',
      '@radix-ui/react-dialog',
      '@radix-ui/react-tooltip',
      '@radix-ui/react-slot',
    ],
  },

  // Compiler optimisations
  compiler: {
    // Supprimer les console.log en production
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },

  // TypeScript strict mode
  typescript: {
    // Ne pas échouer le build sur les erreurs TS (à activer en prod)
    ignoreBuildErrors: false,
  },

  // ESLint strict mode — le lint tourne pendant `next build` via la flat config
  // (eslint.config.mjs, ESLint 9). `npm run lint` (= `eslint .`) est vert
  // (0 erreur, warnings only), donc on garde le garde-fou : une vraie erreur
  // ESLint fera échouer le build (et donc le deploy Vercel sur main).
  eslint: {
    ignoreDuringBuilds: false,
  },

  // Redirections
  async redirects() {
    return [
      // Legacy legal slug
      {
        source: '/confidentialite',
        destination: '/politique-confidentialite',
        permanent: true,
      },
    ];
  },
};

// Only wire the Sentry build plugin when a DSN AND org/project are provided.
// This keeps `npm run build` unchanged locally & in CI without secrets.
const shouldUseSentry = Boolean(
  process.env.SENTRY_DSN && process.env.SENTRY_ORG && process.env.SENTRY_PROJECT,
);

const composed = shouldUseSentry
  ? withSentryConfig(nextConfig, {
      org: process.env.SENTRY_ORG,
      project: process.env.SENTRY_PROJECT,
      authToken: process.env.SENTRY_AUTH_TOKEN,
      silent: !process.env.CI,
      widenClientFileUpload: true,
      sourcemaps: { disable: false },
      disableLogger: true,
      reactComponentAnnotation: { enabled: false },
    })
  : nextConfig;

export default withBundleAnalyzer(composed);

