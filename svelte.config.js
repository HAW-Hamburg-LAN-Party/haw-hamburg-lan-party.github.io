import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeExternalLinks from 'rehype-external-links';

function getHeadings() {
	let visit;
	let tree_to_string;
	return async function transformer(tree, vFile) {
		if (!visit) {
			tree_to_string = (await import('mdast-util-to-string')).toString;
			visit = (await import('unist-util-visit')).visit;
		}

		vFile.data.headings = [];

		visit(tree, 'heading', (node) => {
			vFile.data.headings.push({
				level: node.depth,
				title: tree_to_string(node)
			});
		});

		if (!vFile.data.fm) vFile.data.fm = {};
		vFile.data.fm.headings = vFile.data.headings;
	};
}

const svgIcon = {
	type: 'element',
	tagName: 'svg',
	properties: {
		xmlns: 'http://www.w3.org/2000/svg',
		viewBox: '0 0 24 24',
		className: ['head-link-icon'],
		width: '54px',
		height: '54px'
	},
	children: [
		{
			type: 'element',
			tagName: 'path',
			properties: {
				d: 'M10.59,13.41C11,13.8 11,14.44 10.59,14.83C10.2,15.22 9.56,15.22 9.17,14.83C7.22,12.88 7.22,9.71 9.17,7.76V7.76L12.71,4.22C14.66,2.27 17.83,2.27 19.78,4.22C21.73,6.17 21.73,9.34 19.78,11.29L18.29,12.78C18.3,11.96 18.17,11.14 17.89,10.36L18.36,9.88C19.54,8.71 19.54,6.81 18.36,5.64C17.19,4.46 15.29,4.46 14.12,5.64L10.59,9.17C9.41,10.34 9.41,12.24 10.59,13.41M13.41,9.17C13.8,8.78 14.44,8.78 14.83,9.17C16.78,11.12 16.78,14.29 14.83,16.24V16.24L11.29,19.78C9.34,21.73 6.17,21.73 4.22,19.78C2.27,17.83 2.27,14.66 4.22,12.71L5.71,11.22C5.7,12.04 5.83,12.86 6.11,13.65L5.64,14.12C4.46,15.29 4.46,17.19 5.64,18.36C6.81,19.54 8.71,19.54 9.88,18.36L13.41,14.83C14.59,13.66 14.59,11.76 13.41,10.59C13,10.2 13,9.56 13.41,9.17Z'
			}
		}
	]
};

/** @type {import('mdsvex').MdsvexOptions} */
const mdsvexOptions = {
	extensions: ['.md'],
	remarkPlugins: [getHeadings],
	rehypePlugins: [
		rehypeSlug,
		[
			rehypeAutolinkHeadings,
			{
				behavior: 'append',
				content: svgIcon
			}
		],
		[
			rehypeExternalLinks,
			{
				rel: ['noopener'],
				target: '_blank'
			}
		]
	]
};

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	extensions: ['.svelte', '.md'],
	preprocess: [vitePreprocess(), mdsvex(mdsvexOptions)],

	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter({
			// default options are shown. On some platforms
			// these options are set automatically — see below
			pages: 'build',
			assets: 'build',
			fallback: undefined,
			precompress: false,
			strict: true
		})
	}
};

export default config;
