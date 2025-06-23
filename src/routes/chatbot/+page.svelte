<script lang="ts">
	import { chatStore } from '$lib/stores/chatStore';
	let message = '';
	const { sendMessage } = chatStore;
</script>

<form on:submit|preventDefault={() => {
	sendMessage(message);
	message = '';
}}>
	<input bind:value={message} placeholder="Tanya sesuatu..." />
	<button type="submit">Kirim</button>
</form>

{#each $chatStore.messages as msg}
	<p><strong>{msg.role}:</strong> {msg.content}</p>
{/each}

{#if $chatStore.loading}
	<p>Mengetik...</p>
{/if}
{#if $chatStore.error}
	<p class="text-red-500">{$chatStore.error}</p>
{/if}
