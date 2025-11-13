<script lang="ts">
	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/components/Header.svelte';
	import '../app.scss';
	import '../content/theme-override.scss';
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();
</script>

<Header />
<main class="center-content pt-16">
	{@render children?.()}
</main>
<Footer />

<style>
	main {
		min-height: calc(100vh - 4.5rem);
	}
</style>
