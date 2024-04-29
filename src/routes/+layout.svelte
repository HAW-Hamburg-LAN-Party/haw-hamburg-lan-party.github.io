<script>
	import Footer from '$lib/components/Footer.svelte';
import Header from '$lib/components/Header.svelte';
	import '../global.scss';
</script>

<Header />
<main>
  <slot />
</main>
<Footer />

<style>
	main {
		min-height: calc(100vh - 4.5rem);
		padding-top: 4.5rem;
	}
</style>