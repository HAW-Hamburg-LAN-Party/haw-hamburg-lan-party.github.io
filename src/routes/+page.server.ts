import type { Site } from '$lib/types'

export async function load({ fetch }) {
	const response = await fetch('api/sites')
	const sites: Site[] = await response.json()
	return { posts: sites }
}
