<!--src/routes/protected/dashboard/admin/wiki/+page.svelte -->
<!-- aku pake flowbites disini  -->
<script lang="ts">
	import { postStore, getPost } from '$lib/stores/postStore';
	import { Card, Button, Spinner } from 'flowbite-svelte';
	import { onMount } from 'svelte';
	$: postData = $postStore;
	$: if (postData) {
		console.log('post data : ', postData);
	}
	onMount(async () => {
		await getPost();
	});
</script>

<div class="space-y-4 text-white">
	<h1 class="text-2xl font-bold">Master Wikipost</h1>
	{#if postData.loading}
		<Spinner size="16" color="indigo" />
	{:else}
		{#each postData.posts as item}
			<Card class="bg-neutral-800 text-white p-4 sm:p-6 md:p-8 min-w-full">
				<h1 class="mb-2 text-2xl font-bold tracking-tight">{item.post_title}</h1>
				<p class="mb-2 leading-tight font-bold ">{item.post_author}</p>
				<p class="mb-2 leading-tight font-normal ">{item.post_short_desc}</p>
				<p class="mb-2 leading-tight font-normal ">{item.post_long_desc}</p>
				<p class="mb-2 leading-tight font-bold text-red-500 ">{item.post_view}</p>
				<p class="mb-2 leading-tight font-normal ">{item.createdAt}</p>
				<p class="mb-2 leading-tight font-normal ">{item.updatedAt}</p>
				<p class="mb-2 leading-tight font-normal ">{item.deletedAt?"Dihapus":"Null"}</p>
				<Button class="mb-2 w-[50%]" color="lime">Update</Button>
				<Button class="mb-2 w-[50%]" color="red">Delete</Button>

			</Card>
		{/each}
	{/if}
</div>

<style>
</style>
