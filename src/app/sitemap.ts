import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  return [
    { url: `${base}/`, lastModified: new Date(), priority: 1.0, changeFrequency: 'weekly' },
    { url: `${base}/varieties`, lastModified: new Date(), priority: 0.8, changeFrequency: 'monthly' },
    { url: `${base}/order`, lastModified: new Date(), priority: 0.9, changeFrequency: 'weekly' },
  ];
}