<script lang="ts">
	import { page } from '$app/stores';

	interface Props {
		href: string;
		children?: import('svelte').Snippet;
		[key: string]: any
	}

	let { ...props }: Props = $props();
</script>

<a
	{...props}
	{props.href}
	aria-current={props.href === $page.url.pathname ? 'page' : undefined}
	class="h-full px-4 {props.href === $page.url.pathname ? 'font-black' : ''}"
>
	{@render props.children?.()}
</a>
