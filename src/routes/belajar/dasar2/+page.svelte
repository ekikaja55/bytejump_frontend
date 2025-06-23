<!-- 
NOTES BUAT YAKININ KO MIMI :

1. $derived() itu "hitung nilai baru DARI $state() ini mirip banget kayak state react tanpa perlu setState(), yang bisa dipakai dimana mana karena dia itu rune dan bisa dipakai di DOM 

2. $memo() itu simpelnya kayak $derived(), tapi svelte akan ingat hasil sebelumnya tapi HANYA AKAN TERUPDATE kalo nilainya berubah jadi kalo nilainya sama kaya hasil kalkulasi sebelum $memo() tidak akan dijalankan "

3. $effect() itu mirip banget kayak use effect di react jadi buat monitorin "ada yang berubah gak ?" kayak side effect gitu

4. bind  itu to way binding langsung ngehubung ke DOM secara otomatis gaperlu handling kalo input berubah udah disediain sveltenya langsung

-->
<script lang="ts">
	import Header from '$lib/components/Header.svelte';

	let formState = $state({
		name: '',
		birthday: '',
		step: 0,
		error: ''
	} as {
		name: string;
		birthday: string;
		step: number;
		error: string;
		[key: string]: string | number;
	});
</script>

<main class="flex flex-col gap-2 p-4 text-xl">
	<h1 class="text-6xl">BASIC FORM HANDLING</h1>
	<Header name={formState.name} />
	{#if formState.error}
		<p class="text-red-600">error: {formState.error}</p>
	{/if}
	<p>Step : {formState.step + 1}</p>

	{#if formState.step === 0}
		<div class="flex gap-2">
			<label for="name">Masukan Nama Anda</label>
			<input type="text" id="name" bind:value={formState.name} />
		</div>
		<button
			class="mt-4 w-50 rounded-lg bg-zinc-900 p-2 text-white"
			onclick={() => {
				if (formState.name !== '') {
					formState.step += 1;
					formState.error = '';
				} else {
					formState.error = 'Inputan Nama Tidak Boleh Kosong';
				}
			}}>Next</button
		>
	{:else if formState.step === 1}
		<div class="flex gap-2">
			<label for="birthday">Masukan Tanggal Lahir Anda</label>
			<input type="date" id="birthday" bind:value={formState.birthday} />
		</div>
		<button
			class="mt-4 w-50 rounded-lg bg-zinc-900 p-2 text-white"
			onclick={() => {
				if (formState.birthday !== '') {
					formState.step += 1;
					formState.error = '';
				} else {
					formState.error = 'Inputan Tanggal Lahir Tidak Boleh Kosong';
				}
			}}>Next</button
		>
	{/if}

	<!-- {@render formStep({ question: 'What Is Your Name ?', id: 'name', type: 'text' })} -->
</main>

{#snippet formStep({ question, id, type }: { question: string; id: string; type: string })}
	<article>
		<div class="flex gap-2">
			<label for={id}>{question}</label>
			<input {type} {id} bind:value={formState[id]} />
		</div>
		
	</article>
{/snippet}
