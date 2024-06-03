<script lang="ts">
	import Seo from '$lib/components/SEO.svelte';
	import SidebarEntry from '$lib/components/wiki/SidebarEntry.svelte';
	import { onDestroy, onMount } from 'svelte';
	export let data;

	onMount(() => {
		setTimeout(() => {
			try {
				document.documentElement.style.scrollBehavior = 'smooth';
			} catch (error) {}
		}, 100);
	});

	onDestroy(() => {
		try {
			document.documentElement.style.scrollBehavior = 'auto';
		} catch (error) {}
	});
</script>

<Seo meta={data.meta} />

<div class="flex flex-col sm:flex-row">
	<aside class="flex-shrink-0 sm:w-1/5 sm:sticky sm:top-16 h-full sm:pr-8 sm:pt-10">
		<h1 class="sm:mt-0 max-sm:text-center max-sm:inline-block max-sm:w-full">{data.meta.title}</h1>
		<ul class="list-none max-sm:hidden text-2xl">
			<SidebarEntry entryList={data.headers}></SidebarEntry>
		</ul>
	</aside>

	<div
		class="wiki-content sm:-mt-16 sm:-mb-4 sm:pt-28 sm:pb-4 sm:border-l sm:border-border sm:pl-8"
	>
		<svelte:component this={data.content} />
	</div>
</div>

<style lang="scss">
	:global(.wiki-content > *:first-child) {
		@apply mt-0;
	}

	.wiki-content {
		:global(h2:hover a),
		:global(h2:hover a),
		:global(h3:hover a),
		:global(h4:hover a),
		:global(h5:hover a),
		:global(h6:hover a) {
			@apply block;
		}
	}
</style>
