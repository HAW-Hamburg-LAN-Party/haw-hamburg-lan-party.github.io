
<script lang="ts">
	export let data
</script>

<svelte:head>
	<title>HAW-LAN</title>
</svelte:head>

<h1>Hello HAW Hamburg LAN-Part y</h1>

<!-- Posts -->
<section>
	<ul class="posts">
		{#each data.posts as post}
			<li class="post">
				<a href={post.slug} class="title">{post.title}</a>
			</li>
		{/each}
	</ul>
</section>
