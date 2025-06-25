 <!-- src/routes/(protected)/+layout.svelte -->
<script lang="ts">
	import { onMount } from 'svelte';
	import { authLocalStore } from '$lib/stores/authLocalStore';
</script>

<slot />

<style>
	:global(body) {
		background-color: #111827;
	} 	
</style>