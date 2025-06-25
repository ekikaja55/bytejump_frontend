<!-- src/routes/(protected)/+layout.svelte -->
<script lang="ts">
	import { getAuthLocal } from '$lib/utils/authToLocal';
	import { Spinner } from 'flowbite-svelte';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';

	const isAuthenticated = writable<boolean | null>(null); // null artinya belum dicek

	onMount(() => {
		const authLocal = getAuthLocal();
		if (!authLocal) {
			window.location.href = '/auth/login';
		} else {
			isAuthenticated.set(true);
		}
	});
</script>

{#if $isAuthenticated === null}
	<!-- Bisa tampilkan loading state -->
	<div class="flex justify-center items-center h-screen">
		<Spinner size="16"/>
	</div>
{:else if $isAuthenticated}
	<slot />
{/if}
