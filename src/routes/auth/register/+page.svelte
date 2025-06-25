<script lang="ts">
	import { Label, Input, Button } from 'flowbite-svelte';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';

	let nama = '';
	let email = '';
	let password = '';
	let confirmPassword = '';

	let passwordMismatch = false;

	function handleSubmit(e: Event) {
		e.preventDefault();

		passwordMismatch = password !== confirmPassword;

		if (!passwordMismatch) {
			// Submit form logic di sini
			console.log('Submit:', { nama, email, password });
		}
	}
</script>

<style>
	@media (min-width: 768px) {
		html,
		body {
			overflow: hidden;
		}
	}
</style>

<div class="flex flex-col md:flex-row h-full min-h-screen w-full">
	<!-- Background section -->
	<div
		class="w-full md:w-1/2 bg-cover bg-center relative flex flex-col justify-center items-center px-6 py-12"
		style="background-image: url('/registerImg.jpg');"
	>
		<div class="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-blue-900/70 z-0 md:hidden"></div>

		<!-- MOBILE form -->
		<div class="relative z-10 w-full max-w-md mx-auto text-center text-white md:hidden">
			<h1 class="text-4xl font-extrabold mb-2">
				<span class="bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
					Daftar ByteJump
				</span>
			</h1>
			<p class="text-gray-300 mb-6">Buat akun baru dan mulai lompat bareng komunitas dev Indonesia.</p>

			<form class="bg-black/50 p-6 rounded-xl shadow-lg" on:submit={handleSubmit}>
				<div class="mb-4">
					<Label for="nama-mobile" class="text-white">Nama Lengkap</Label>
					<Input id="nama-mobile" bind:value={nama} type="text" placeholder="Ekik Dev" required />
				</div>
				<div class="mb-4">
					<Label for="email-mobile" class="text-white">Email</Label>
					<Input id="email-mobile" bind:value={email} type="email" placeholder="ekik@example.com" required />
				</div>
				<div class="mb-4">
					<Label for="password-mobile" class="text-white">Password</Label>
					<Input id="password-mobile" bind:value={password} type="password" placeholder="••••••••" required />
				</div>
				<div class="mb-4">
					<Label for="confirm-password-mobile" class="text-white">Konfirmasi Password</Label>
					<Input id="confirm-password-mobile" bind:value={confirmPassword} type="password" placeholder="••••••••" required />
				</div>
				{#if passwordMismatch}
					<p class="text-red-400 text-sm mb-4">Password tidak cocok</p>
				{/if}
				<Button type="submit" color="pink" class="w-full">Sign Up</Button>
			</form>

			<div class="mt-4 text-sm text-gray-300">
				Sudah punya akun?
				<a href="/auth/login" class="text-blue-400 hover:underline font-semibold">Login</a>
			</div>
		</div>

		<!-- DESKTOP Info -->
		<div class="relative z-10 hidden md:block w-full max-w-lg mx-auto text-left">
			<div class="bg-black/60 rounded-xl shadow-xl p-10">
				<h1 class="mb-6 text-5xl font-extrabold text-white leading-tight drop-shadow-lg">
					<span class="bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
						Bergabung Sekarang
					</span>
				</h1>
				<p class="text-xl text-gray-200 mb-2">
					Buat akun ByteJump dan mulai jelajahi ekosistem developer Indonesia.
				</p>
				<p class="text-base text-gray-300">
					Belajar, berbagi, dan bangun proyek bareng komunitas yang solid.
				</p>
			</div>
		</div>
	</div>

	<!-- DESKTOP form -->
	<div class="hidden md:flex w-1/2 flex-col justify-center items-center bg-[#111827] px-6 py-12">
		<form class="w-full max-w-md" on:submit={handleSubmit}>
			<h2 class="text-4xl font-bold text-white mb-6">Register</h2>

			<div class="mb-4">
				<Label for="nama-desktop" class="text-white">Nama Lengkap</Label>
				<Input id="nama-desktop" bind:value={nama} type="text" placeholder="Ekik Dev" required />
			</div>
			<div class="mb-4">
				<Label for="email-desktop" class="text-white">Email</Label>
				<Input id="email-desktop" bind:value={email} type="email" placeholder="ekik@example.com" required />
			</div>
			<div class="mb-4">
				<Label for="password-desktop" class="text-white">Password</Label>
				<Input id="password-desktop" bind:value={password} type="password" placeholder="••••••••" required />
			</div>
			<div class="mb-4">
				<Label for="confirm-password-desktop" class="text-white">Konfirmasi Password</Label>
				<Input id="confirm-password-desktop" bind:value={confirmPassword} type="password" placeholder="••••••••" required />
			</div>
			{#if passwordMismatch}
				<p class="text-red-400 text-sm mb-4">Password tidak cocok</p>
			{/if}
			<Button type="submit" color="pink" class="w-full">Sign Up</Button>

			<div class="mt-4 text-sm text-gray-300 text-center">
				Sudah punya akun?
				<a href="/auth/login" class="text-blue-400 hover:underline font-semibold">Login</a>
			</div>
		</form>
	</div>
</div>
