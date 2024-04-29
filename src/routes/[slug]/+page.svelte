<script lang="ts">
	export let data
</script>

<!-- SEO -->
<svelte:head>
	<title>{data.meta.title}</title>
	<meta property="og:type" content="article" />
	<meta property="og:title" content={data.meta.title} />
</svelte:head>

<article>
  <!-- Title -->
	<hgroup>
		<h1>{data.meta.title}</h1>
	</hgroup>

  <!-- Post -->
	<div class="prose">
		<svelte:component this={data.content} />
	</div>
</article>
