import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://biokids.me';

  // Only include publicly accessible (free) articles
  const freeArticles = [
    { slug: 'how-your-child-grows', lastModified: '2026-03-06', priority: 1.0 },
    { slug: 'growth-blockers-to-avoid', lastModified: '2026-03-06', priority: 0.9 },
    { slug: 'sprinting-growth-hormone', lastModified: '2026-03-06', priority: 0.9 },
    { slug: 'dennis-rodman-growth', lastModified: '2026-03-06', priority: 0.8 },
    { slug: 'glyphosate-oats-grains', lastModified: '2026-03-06', priority: 0.8 },
  ];

  return [
    {
      url: baseUrl,
      lastModified: '2026-03-06',
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    ...freeArticles.map((article) => ({
      url: `${baseUrl}/learn/${article.slug}`,
      lastModified: article.lastModified,
      changeFrequency: 'monthly' as const,
      priority: article.priority,
    })),
  ];
}
