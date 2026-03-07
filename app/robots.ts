import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const gatedArticles = [
    '/learn/fava-beans-growth-hormone',
    '/learn/glycine-secret-weapon',
    '/learn/zinc-gh-igf1-axis',
    '/learn/a1-vs-a2-milk',
    '/learn/raw-milk-tallest-people',
    '/learn/milk-nutrient-profile',
    '/learn/keep-growth-plates-open',
    '/learn/jamaican-sprinter-model',
    '/learn/gh-igf1-axis',
  ];

  const privateRoutes = [
    '/api/',
    '/dashboard/',
    '/settings/',
    '/onboarding/',
    '/auth/',
    '/science',
    '/protocol/',
    '/stage/',
    '/windows/',
    '/jarvis/',
  ];

  const disallow = [...privateRoutes, ...gatedArticles];

  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/learn/how-your-child-grows', '/learn/growth-blockers-to-avoid', '/learn/sprinting-growth-hormone', '/learn/dennis-rodman-growth', '/learn/glyphosate-oats-grains'],
        disallow,
      },
      {
        userAgent: 'GPTBot',
        allow: ['/', '/learn/how-your-child-grows', '/learn/growth-blockers-to-avoid', '/learn/sprinting-growth-hormone', '/learn/dennis-rodman-growth', '/learn/glyphosate-oats-grains'],
        disallow,
      },
      {
        userAgent: 'ClaudeBot',
        allow: ['/', '/learn/how-your-child-grows', '/learn/growth-blockers-to-avoid', '/learn/sprinting-growth-hormone', '/learn/dennis-rodman-growth', '/learn/glyphosate-oats-grains'],
        disallow,
      },
      {
        userAgent: 'PerplexityBot',
        allow: ['/', '/learn/how-your-child-grows', '/learn/growth-blockers-to-avoid', '/learn/sprinting-growth-hormone', '/learn/dennis-rodman-growth', '/learn/glyphosate-oats-grains'],
        disallow,
      },
      {
        userAgent: 'Google-Extended',
        allow: ['/', '/learn/how-your-child-grows', '/learn/growth-blockers-to-avoid', '/learn/sprinting-growth-hormone', '/learn/dennis-rodman-growth', '/learn/glyphosate-oats-grains'],
        disallow,
      },
      {
        userAgent: 'Googlebot',
        allow: ['/', '/learn/how-your-child-grows', '/learn/growth-blockers-to-avoid', '/learn/sprinting-growth-hormone', '/learn/dennis-rodman-growth', '/learn/glyphosate-oats-grains'],
        disallow,
      },
      {
        userAgent: 'Bingbot',
        allow: ['/', '/learn/how-your-child-grows', '/learn/growth-blockers-to-avoid', '/learn/sprinting-growth-hormone', '/learn/dennis-rodman-growth', '/learn/glyphosate-oats-grains'],
        disallow,
      },
    ],
    sitemap: 'https://biokids.me/sitemap.xml',
  };
}
