import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/panier', '/acces-refuse', '/admin'],
      },
    ],
    sitemap: 'https://blackbeard-umber.vercel.app/sitemap.xml',
  };
}
