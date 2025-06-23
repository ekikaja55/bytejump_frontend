<script lang="ts">
	let { name, fake_name = 'default value' }: { name: string; fake_name?: string } = $props();
</script>

 <div class="">
	{#if name}
		<h1>{name} form</h1>
	{/if}
 </div>