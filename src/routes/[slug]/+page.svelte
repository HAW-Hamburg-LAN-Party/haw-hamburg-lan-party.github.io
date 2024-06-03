<script lang="ts">
	import Seo from '$lib/components/SEO.svelte';

	export let data
</script>

<Seo meta={data.meta} />

<section>
	<svelte:component this={data.content} />
</section>
