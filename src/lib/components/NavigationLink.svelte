<script lang="ts">
	import { page } from '$app/stores';

	export let href: string;
</script>

<a
	{...$$props}
	{href}
	aria-current={href === $page.url.pathname ? 'page' : undefined}
	class="h-full px-4 {href === $page.url.pathname ? 'font-black' : ''}"
>
	<slot />
</a>
