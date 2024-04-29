<script lang="ts">
    import { page } from '$app/stores';  
	import NavigationLink from './NavigationLink.svelte';
</script>

<header>
	<div class="wrapper">
        <a href="/">
            <img src="logo.png" alt="" class="logo" />
        </a>
        <nav>
            <NavigationLink href="/">Home</NavigationLink>
            <NavigationLink href="/wiki">Wiki</NavigationLink>
            <NavigationLink href="#">Tickets</NavigationLink>
            <NavigationLink href="https://www.instagram.com/hawhamburg_lan_party/" target="_blank">Instagram</NavigationLink>
        </nav>
	</div>
</header>

<style lang="scss">
	header {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        background-color: #000000;
		border-bottom: 1px solid #333333;
		.wrapper {
			display: flex;
			align-items: center;
			height: 4.5rem;
            justify-content: space-between;
            nav {
                display: flex;
			    align-items: center;

            }
		}
		.logo {
			height: 2.625rem;
		}
	}
</style>
