<script lang="ts">
	// @ts-ignore
	import Navbar from '../../content/navbar.md';
	import { page } from '$app/stores';
	import { fade, slide } from 'svelte/transition';

	let showMobileMenu = false;
</script>

<header
	class="fixed top-0 left-0 right-0 sm:border-b-[1px] border-border z-20"
	style="--pathname: {$page.url.pathname}"
>
	<div class="flex flex-col sm:flex-row items-center h-16 justify-between" class:showMobileMenu>
		<div
			class="center-content h-full w-full flex flex-row items-center justify-between bg-page max-sm:border-b-[1px] border-border"
		>
			<!-- logo -->
			<a
				href="/"
				class="logo pl-0 h-full py-3 object-scale-down w-full"
				on:click={() => (showMobileMenu = false)}
			>
				<img
					class="img-logo h-full w-auto object-cover"
					src="logo.png"
					alt="haw-hamburg-lan-party-logo"
				/>
			</a>
			<!-- mobile menu button -->
			<!-- <div class="flex-1"></div> -->
			<button
				id="mobile-menu-toggle"
				class="sm:hidden px-6 m-0 -mr-6 bg-transparent h-full"
				aria-expanded="false"
				aria-controls="menu"
				on:click={() => (showMobileMenu = !showMobileMenu)}
			>
				{#if showMobileMenu}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						class="fill-primary w-[24px] h-full"
					>
						<title>close</title>
						<path
							d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"
						/>
					</svg>
				{:else}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="fill-primary w-[24px] h-full"
						viewBox="0 0 24 24"
					>
						<title>menu</title>
						<path d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z" />
					</svg>
				{/if}
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
                    w-full"
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

<style lang="postcss">
	nav:global(img) {
		@apply h-full py-3 object-scale-down;
	}
	nav:global(a) {
		@apply h-full flex items-center py-4 sm:px-4 max-sm:border-b-[1px] border-border max-sm:center-content;
	}
	nav:global(p) {
		@apply flex flex-col w-full sm:h-full sm:w-auto sm:flex-row;
	}
	nav:global(p a:last-child) {
		@apply max-sm:border-b-4;
	}
	nav:global(p:last-child a:last-child) {
		@apply pr-0 max-sm:border-b-[1px];
	}
</style>
