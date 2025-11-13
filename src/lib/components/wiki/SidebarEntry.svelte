<script lang="ts">
	import SidebarEntry from './SidebarEntry.svelte';
	import type { IHeading } from '../../../routes/wiki/+page';

	interface Props {
		entryList: IHeading[];
	}

	let { entryList }: Props = $props();
</script>

{#each entryList as header}
	<li class:mb-3={header.level <= 2} class="">
		<a class="wiki-links inline-block leading-tight py-1" href={header.href}>{header.title}</a>
		{#if header.subtitles}
			<ul class="pl-5 list-none text-base">
				<SidebarEntry entryList={header.subtitles} />
			</ul>
		{/if}
	</li>
{/each}
