import type { NextConfig } from "next";

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
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          }
        ]
      }
    ]
  },

  // Optimisations expérimentales
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
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

  // ESLint strict mode
  eslint: {
    // Ne pas ignorer les erreurs ESLint en build
    ignoreDuringBuilds: false,
  },

  // Redirections
  async redirects() {
    return [
      // Redirection www vers non-www (ou inverse selon votre config)
      // {
      //   source: '/:path*',
      //   has: [{ type: 'host', value: 'www.sconnectfrance.fr' }],
      //   destination: 'https://sconnectfrance.fr/:path*',
      //   permanent: true,
      // },
    ]
  },
};

export default nextConfig;

