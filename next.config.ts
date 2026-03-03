import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options",  value: "nosniff" },
  { key: "X-Frame-Options",         value: "DENY" },
  { key: "X-XSS-Protection",        value: "1; mode=block" },
  { key: "Referrer-Policy",         value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy",      value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
      {
        source: "/images/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
  async redirects() {
    return [
      // Redirige laroutedurhum.fr → laroutedurhum.com (301 permanent)
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'laroutedurhum.fr' }],
        destination: 'https://laroutedurhum.com/:path*',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.laroutedurhum.fr' }],
        destination: 'https://www.laroutedurhum.com/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
