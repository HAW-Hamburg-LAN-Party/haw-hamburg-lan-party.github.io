import { error } from '@sveltejs/kit'

export async function load({ params }) {
	try {
		if (params.slug === "home") {
			error(404, `Could not find ${params.slug}`)
		}
		const site = await import(`../../content/${params.slug}.md`)

		return {
			content: site.default,
			meta: site.metadata
		}
	} catch (e) {
		error(404, `Could not find ${params.slug}`)
	}
}
