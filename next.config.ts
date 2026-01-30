import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [{
      source: '/:path*',
      headers: [
        { key: 'X-DNS-Prefetch-Control', value: 'on' },
        { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
      ]
    }];
  },

  images: {
    formats: ['image/avif', 'image/webp'],
  },

  compress: true,
  poweredByHeader: false,

  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  experimental: {
    optimizePackageImports: ['three', 'lucide-react'],
  },

  // Turbopack configuration for Next.js 16
  turbopack: {
    // Empty turbopack config to satisfy Next.js 16 requirement
  },
};

export default nextConfig;
