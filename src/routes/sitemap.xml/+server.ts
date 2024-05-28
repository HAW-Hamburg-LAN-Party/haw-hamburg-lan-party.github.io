// src/routes/sitemap.xml.ts
import { siteURL, staticRoutes } from '$lib/config';
import type { RequestHandler } from '@sveltejs/kit';
import type { Site } from '$lib/types';

export const prerender = true

interface BlogPost {
  slug: string;
}

async function getSites() {
	const sites: Site[] = [];

	const paths = import.meta.glob('/src/content/*.md', { eager: true });

	for (const path in paths) {
		const file = paths[path];
		const slug = path.split('/').at(-1)?.replace('.md', '');

		if (slug === 'home') {
			continue;
		}

		if (file && typeof file === 'object' && 'metadata' in file && slug) {
			const metadata = file.metadata as Omit<Site, 'slug'>;
			const site = { ...metadata, slug } satisfies Site;
			sites.push(site);
		}
	}

	return sites;
}

// Function to generate sitemap XML
const generateSitemap = (routes: string[]): string => {
  const urls = routes.map(route => `
    <url>
      <loc>${siteURL}${route}</loc>
    </url>`).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${urls}
    </urlset>`;
};

export const GET: RequestHandler = async () => {
  const blogPosts: BlogPost[] = await getSites(); // Fetch blog posts from your API or database
  const blogRoutes = blogPosts.map(post => `/${post.slug}`);

  const allRoutes = [...staticRoutes, ...blogRoutes];
  const sitemap = generateSitemap(allRoutes);

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml'
    }
  });
};