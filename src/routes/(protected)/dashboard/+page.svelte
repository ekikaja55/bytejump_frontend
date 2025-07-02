<!-- src/routes/(protected)/dashboard/+page.svelte -->
<script lang="ts">
	import { user } from '$lib/stores/authDerived';
	import { onMount } from 'svelte';

	// onMount(() => {
	// 	console.log('Data user saat mount:', $user);
	// });

	$: currentUser = $user;
</script>

<div class="space-y-4 text-white">
	<h1 class="text-2xl font-bold">Selamat datang, {currentUser?.user?.user_nama}!</h1>
	<p class="text-lg font-semibold capitalize">{currentUser?.user?.user_role}</p>

	<p class="text-gray-400">Berikut adalah ringkasan akun kamu:</p>

	<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
		<div class="rounded-xl bg-gray-800 p-4 shadow-md">
			<h2 class="text-sm text-gray-400">Role</h2>
			<p class="text-lg font-semibold capitalize">{currentUser?.user?.user_role}</p>
		</div>

		{#if currentUser?.user?.user_role === 'member'}
			<div class="rounded-xl bg-gray-800 p-4 shadow-md">
				<h2 class="text-sm text-gray-400">Saldo</h2>
				<p class="text-lg font-semibold">
					Rp {currentUser?.user?.user_balance}
				</p>
			</div>
		{/if}

		<div class="rounded-xl bg-gray-800 p-4 shadow-md">
			<h2 class="text-sm text-gray-400">Email</h2>
			<p class="text-lg font-semibold">{currentUser?.user?.user_email}</p>
		</div>
	</div>
</div>
