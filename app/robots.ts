import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://nfdev21.com'; // Remplacez par votre domaine

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin-*',
          '/api/*',
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}

