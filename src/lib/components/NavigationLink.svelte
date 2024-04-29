<script lang="ts">
	import { page } from '$app/stores';

	export let href: string;
	$: active = href === $page.url.pathname;
</script>

<a {...$$props} {href} aria-current={active ? 'page' : undefined} class:active>
	<slot />
</a>

<style lang="scss">
	a {
		height: 100%;
		padding: 0 1rem;
		text-decoration: none;
		color: #ffffff;
		&.active {
			font-weight: 900;
		}
	}
</style>
