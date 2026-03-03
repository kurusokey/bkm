import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
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
