<script lang="ts">
	let { meta } = $props();
</script>

<!-- SEO -->
<svelte:head>
	<title>{meta.title} - HAW LAN-Party</title>
	<meta property="og:type" content="website" />
	<meta property="og:title" content={meta.seoTitle} />
	<meta property="og:description" content={meta.seoDescription} />
	<meta name="description" content={meta.seoDescription}>
</svelte:head>