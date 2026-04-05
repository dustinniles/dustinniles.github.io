import { MetadataRoute } from 'next';
import { projects } from '@/app/data/projects';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://dustinniles.github.io';

  const projectRoutes: MetadataRoute.Sitemap = projects
    .filter((p) => p.status === 'published')
    .map((p) => ({
      url: `${base}/portfolio/${p.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    }));

  return [
    { url: `${base}/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 1.0 },
    { url: `${base}/portfolio`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    ...projectRoutes,
    { url: `${base}/lab`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/activity`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/activity/cycling`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/activity/volunteering`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/links`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/privacy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${base}/terms`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
  ];
}
