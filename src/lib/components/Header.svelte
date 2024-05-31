<script lang="ts">
	// @ts-ignore
	import Navbar from '../../content/navbar.md';
	import { fade, slide } from 'svelte/transition';

	let showMobileMenu = false;
</script>

<header class="fixed top-0 left-0 right-0 sm:border-b-[1px] border-border">
	<div class="flex flex-col sm:flex-row items-center h-16 justify-between" class:showMobileMenu>
		<div
			class="center-content h-full w-full flex flex-row items-center justify-between bg-page max-sm:border-b-[1px] border-border"
		>
			<!-- logo -->
			<a
				href="/"
				class="logo pl-0 h-full py-3 object-scale-down"
				on:click={() => (showMobileMenu = false)}
			>
				<img class="img-logo h-full" src="logo.png" alt="haw-hamburg-lan-party-logo" />
			</a>
			<!-- mobile menu button -->
			<button
				id="mobile-menu-toggle"
				class="sm:hidden px-6 m-0 -mr-6 bg-transparent h-full"
				aria-expanded="false"
				aria-controls="menu"
				on:click={() => (showMobileMenu = !showMobileMenu)}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					height="24px"
					viewBox="0 0 24 24"
					width="24px"
					class="fill-primary"
					><path d="M0 0h24v24H0z" fill="none" /><path
						d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"
					/></svg
				>
			</button>
			<!-- navigation desktop links -->
			<nav
				class="hidden
                sm:flex
                flex-row
                items-center
                justify-between
                h-full
                w-full"
			>
				<div></div>
				<Navbar />
			</nav>
		</div>

		{#if showMobileMenu}
			<div class="h-full w-full sm:hidden" on:click={() => (showMobileMenu = false)}>
				<nav
					transition:slide={{ duration: 250, axis: 'y' }}
					class="bg-black
                    sm:bg-transparent
                    flex
                    flex-col
                    sm:hidden
                    items-center
                    justify-between
                    w-full
                    mt-[1px]"
				>
					<Navbar />
				</nav>
				<div
					class="bg-opacity-80 fixed inset-0 bg-black sm:hidden -z-50"
					in:fade={{ duration: 250 }}
					out:fade={{ duration: 250, delay: 100 }}
					on:click={() => (showMobileMenu = false)}
				></div>
			</div>
		{/if}
		<!-- desktop mobile links -->
	</div>
</header>

<style lang="scss">
	nav {
		:global(img) {
			@apply h-full py-3 object-scale-down;
		}
		:global(a) {
			@apply h-full flex items-center py-4 sm:px-4 max-sm:border-b-[1px] border-border max-sm:center-content;
		}
		:global(p) {
			@apply flex flex-col w-full sm:h-full sm:w-auto sm:flex-row;
		}
		:global(p a:last-child) {
			@apply max-sm:border-b-4;
		}
		:global(p:last-child a:last-child) {
			@apply pr-0 max-sm:border-b-[1px];
		}
	}
</style>
