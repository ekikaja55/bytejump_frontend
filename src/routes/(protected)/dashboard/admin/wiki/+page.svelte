<!--src/routes/protected/dashboard/admin/wiki/+page.svelte -->
<!-- aku pake flowbites disini  -->
<script lang="ts">
	import { postStore, getPost, addPost } from '$lib/stores/postStore';
	import { formPostData, type PostPayload } from '$lib/types/post';
	import { Card, Button, Spinner, Modal, Input, Label, Textarea } from 'flowbite-svelte';
	import { onMount } from 'svelte';

	// reactive store
	$: postData = $postStore;
	$: isOpenAdd = false;
	$: isOpenUpdate = false;
	$: formData = formPostData;

	// reactive hanya jika data ada langsung log
	$: if (postData) {
		console.log('post data store : ', postData);
	}

	const resetForm = () => {
		console.log("reset form setelah submit");
		formData.post_title = '';
		formData.post_author = '';
		formData.post_banner = '';
		formData.post_short_desc = '';
		formData.post_long_desc = '';
	};
	const handleSubmit = async () => {
		console.log('ini data form wiki post : ', formData);
		addPost(formData);
		resetForm
	};

	onMount(async () => {
		await getPost();
	});
</script>

<div class="space-y-4 text-white">
	<h1 class="text-2xl font-bold">Master Wikipost</h1>
	
	{#if postData.loading}
		<Spinner size="16" color="indigo" />
	{:else}
		<p class="text-blue-300">{postData.message}</p>
		<Button class="mb-2 " color="indigo" onclick={() => ((isOpenAdd = true), console.log(formData))}
			>Add</Button
		>
		<Modal class="bg-white text-white" title="Add WikiPost" bind:open={isOpenAdd} autoclose>
			<form on:submit|preventDefault={handleSubmit} class="space-y-4">
				<div class="mb-2">
					<Label>Title</Label>
					<Input type="text" bind:value={formData.post_title} clearable />
				</div>
				<div class="mb-2">
					<Label>Author</Label>
					<Input type="text" bind:value={formData.post_author} clearable />
				</div>
				<div class="mb-2">
					<Label>Short Description ( for preview )</Label>
					<Input type="text" bind:value={formData.post_short_desc} clearable />
				</div>
				<div class="mb-2">
					<Label>Description</Label>
					<Textarea bind:value={formData.post_long_desc} clearable />
				</div>

				<div class="mb-2">
					<Button type="submit" color="cyan">Submit</Button>
				</div>
			</form>
		</Modal>

		{#each postData.posts as item}
			<Card class="min-w-50 bg-transparent p-4 text-white sm:p-6 md:p-8">
				<h1 class="mb-2 text-2xl font-bold tracking-tight">{item.post_title}</h1>
				<p class="mb-2 leading-tight font-bold">{item.post_author}</p>
				<p class="mb-2 leading-tight font-normal">{item.post_short_desc}</p>
				<p class="mb-2 leading-tight font-normal">{item.post_long_desc}</p>
				<p class="mb-2 leading-tight font-bold text-red-500">{item.post_view}</p>
				<p class="mb-2 leading-tight font-normal">{item.createdAt}</p>
				<p class="mb-2 leading-tight font-normal">{item.updatedAt}</p>
				<p class="mb-2 leading-tight font-normal">{item.deletedAt ? 'Dihapus' : 'Null'}</p>

				<Button class="mb-2 w-[50%]" color="lime" onclick={() => (isOpenUpdate = true)}
					>Update</Button
				>
				<Modal
					class="bg-white text-white"
					title="Update WikiPost"
					bind:open={isOpenUpdate}
					autoclose
				></Modal>

				<Button class="mb-2 w-[50%]" color="red">Delete</Button>
			</Card>
		{/each}
	{/if}
</div>

<style>
</style>
