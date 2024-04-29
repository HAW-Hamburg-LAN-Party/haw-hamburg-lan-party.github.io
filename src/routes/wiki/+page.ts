import { error } from '@sveltejs/kit'

export async function load({ params }) {
	try {
		const site = await import(`../../content/wiki.md`)

		return {
			content: site.default,
			meta: site.metadata
		}
	} catch (e) {
		error(404, `Could not find Wiki`)
	}
}
