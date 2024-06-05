<script lang="ts">
	import type { IHeading } from '../../../routes/wiki/+page';

	export let entryList: IHeading[];
</script>

{#each entryList as header}
	<li class:mb-3={header.level <= 2} class="">
		<a class="wiki-links inline-block leading-tight py-1" href={header.href}>{header.title}</a>
		{#if header.subtitles}
			<ul class="pl-5 list-none text-base">
				<svelte:self entryList={header.subtitles} />
			</ul>
		{/if}
	</li>
{/each}
