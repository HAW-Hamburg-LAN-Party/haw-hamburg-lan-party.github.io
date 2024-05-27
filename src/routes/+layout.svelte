<script>
	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/components/Header.svelte';
	import '../app.scss';
	import '../content/theme-override.scss';
</script>

<Header />
<main class="center-content">
	<slot />
</main>
<Footer />

<style>
	main {
		min-height: calc(100vh - 4.5rem);
		padding-top: 6.5rem;
	}
</style>
