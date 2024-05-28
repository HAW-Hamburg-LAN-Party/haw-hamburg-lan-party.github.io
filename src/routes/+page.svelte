<script lang="ts">
	export let data;
</script>

<!-- SEO -->
<svelte:head>
	<title>{data.meta.title}</title>
	<meta property="og:type" content="website" />
	<meta property="og:title" content={data.meta.seoTitle} />
	<meta property="og:description" content={data.meta.seoDescription} />
	<meta name="description" content={data.meta.seoDescription}>
</svelte:head>

<svelte:component this={data.content} />
