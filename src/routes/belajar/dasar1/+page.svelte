<!-- 
NOTES BUAT YAKININ KO MIMI :

1. $derived() itu "hitung nilai baru DARI $state() ini mirip banget kayak state react tanpa perlu setState() gajelas, yang bisa dipakai dimana mana karena dia itu rune dan bisa dipakai di DOM 

2. $memo() itu simpelnya kayak $derived(), tapi svelte akan ingat hasil sebelumnya tapi HANYA AKAN TERUPDATE kalo nilainya berubah jadi kalo nilainya sama kaya hasil kalkulasi sebelum $memo() tidak akan dijalankan "

3. $effect() itu mirip banget kayak use effect di react jadi buat monitorin "ada yang berubah gak ?" kayak side effect gitu

4. bind  itu to way binding langsung ngehubung ke DOM secara otomatis gaperlu handling kalo input berubah udah disediain sveltenya langsung

-->
<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	let name = $state('ekik');
	let status: 'OPEN' | 'CLOSED' = $state('OPEN'); 

    // 
	let full_name = $derived(name + ' ' + 'arkant');
	function handleClick() {
		status = status === 'OPEN' ? 'CLOSED' : 'OPEN';
	}
</script>

<h1 class="text-8xl">BASIC SYNTAX</h1>
<Header {name}  />

<h2 >full name : {full_name}</h2>

 <input type="text" bind:value={name} />

<p>Toko sekarang lagi {status}</p>
<button onclick={handleClick} class="rounded-3xl bg-amber-700 p-4">Toggle Status</button>
