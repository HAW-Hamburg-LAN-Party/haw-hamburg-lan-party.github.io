<script lang="ts">
	import Seo from '$lib/components/SEO.svelte';

	let { data } = $props();
</script>

<Seo meta={data.meta} />

<section>
	<data.content />
</section>
