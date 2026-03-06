import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://biokids.me';

  const articles = [
    { slug: 'how-your-child-grows', lastModified: '2026-03-06', priority: 1.0 },
    { slug: 'growth-blockers-to-avoid', lastModified: '2026-03-06', priority: 0.9 },
    { slug: 'sprinting-growth-hormone', lastModified: '2026-03-06', priority: 0.9 },
    { slug: 'fava-beans-growth-hormone', lastModified: '2026-03-06', priority: 0.8 },
    { slug: 'raw-milk-tallest-people', lastModified: '2026-03-06', priority: 0.8 },
    { slug: 'glycine-secret-weapon', lastModified: '2026-03-06', priority: 0.8 },
    { slug: 'zinc-gh-igf1-axis', lastModified: '2026-03-06', priority: 0.8 },
    { slug: 'a1-vs-a2-milk', lastModified: '2026-03-06', priority: 0.8 },
    { slug: 'milk-nutrient-profile', lastModified: '2026-03-06', priority: 0.7 },
    { slug: 'keep-growth-plates-open', lastModified: '2026-03-06', priority: 0.8 },
    { slug: 'dennis-rodman-growth', lastModified: '2026-03-06', priority: 0.7 },
    { slug: 'glyphosate-oats-grains', lastModified: '2026-03-06', priority: 0.7 },
    { slug: 'jamaican-sprinter-model', lastModified: '2026-03-06', priority: 0.7 },
    { slug: 'gh-igf1-axis', lastModified: '2026-03-06', priority: 0.6 },
  ];

  return [
    {
      url: baseUrl,
      lastModified: '2026-03-06',
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/science`,
      lastModified: '2026-03-06',
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...articles.map((article) => ({
      url: `${baseUrl}/learn/${article.slug}`,
      lastModified: article.lastModified,
      changeFrequency: 'monthly' as const,
      priority: article.priority,
    })),
  ];
}
