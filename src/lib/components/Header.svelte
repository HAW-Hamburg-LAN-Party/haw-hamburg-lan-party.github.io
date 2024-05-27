<script lang="ts">
    import { page } from '$app/stores';  
	import NavigationLink from './NavigationLink.svelte';
</script>

<header class="fixed top-0 left-0 right-0 bg-page border-b-[1px] border-border">
	<div class="center-content flex flex-row items-center h-16 justify-between">
        <a href="/" class="h-full">
            <img src="logo.png" alt="haw-hamburg-lan-party-logo" class="h-full py-3 pr-3" />
        </a>
        <nav class="flex items-center">
            <NavigationLink href="/">Home</NavigationLink>
            <NavigationLink href="/wiki">Wiki</NavigationLink>
            <NavigationLink href="#">Tickets</NavigationLink>
            <NavigationLink href="https://www.instagram.com/hawhamburg_lan_party/" target="_blank">Instagram</NavigationLink>
        </nav>
	</div>
</header>