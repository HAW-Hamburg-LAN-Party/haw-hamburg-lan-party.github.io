import { json } from '@sveltejs/kit'
import type { Site } from '$lib/types'

export const prerender = true

async function getSites() {
	let sites: Site[] = []

	const paths = import.meta.glob('/src/content/*.md', { eager: true })

	for (const path in paths) {
		const file = paths[path]
		const slug = path.split('/').at(-1)?.replace('.md', '')

		if (file && typeof file === 'object' && 'metadata' in file && slug) {
			const metadata = file.metadata as Omit<Site, 'slug'>
			const site = { ...metadata, slug } satisfies Site
			sites.push(site)
		}
	}

	return sites
}

export async function GET() {
	const posts = await getSites()
	return json(posts)
}
