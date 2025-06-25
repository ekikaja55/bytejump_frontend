<script lang="ts">
	import { Label, Input, Button } from 'flowbite-svelte';
	import { register, authStore } from '$lib/stores/authStore';
	import { get } from 'svelte/store';
	import { goto } from '$app/navigation';

	let nama = '';
	let email = '';
	let password = '';
	let confirmPassword = '';
	let errorMessage: string | null = null;
	let successMessage: string | null = null;
	let passwordMismatch = false;

	const goBack = () => goto('/');
	const handleSubmit = async () => {
		passwordMismatch = password !== confirmPassword;
		errorMessage = null;
		successMessage = null;

		if (!passwordMismatch) {
			try {
				await register(email, password, nama, confirmPassword);
				const { message } = get(authStore);

				if (message?.toLowerCase().includes('success')) {
					successMessage = message;
					setTimeout(() => {
						goto('/auth/login');
					}, 2000);
				} else {
					errorMessage = message ?? 'Terjadi kesalahan saat registrasi.';
				}
			} catch (err) {
				errorMessage = 'Terjadi kesalahan saat mendaftar.';
			}
		}
	};
</script>

<div class="flex h-full min-h-screen w-full flex-col md:flex-row">
	<!-- LEFT SECTION -->
	<div
		class="relative flex w-full flex-col items-center justify-center bg-cover bg-center px-6 py-12 md:w-1/2"
		style="background-image: url('/registerImg.jpg');"
	>
		<!-- OVERLAY untuk mobile -->
		<div
			class="absolute inset-0 z-0 bg-gradient-to-br from-black/80 via-black/60 to-blue-900/70 md:hidden"
		></div>

		<!-- MOBILE FORM -->
		<div class="relative z-10 mx-auto w-full max-w-md text-center text-white md:hidden">
			<button
				on:click={goBack}
				class="mb-6 flex items-center text-sm text-gray-300 hover:text-white"
			>
				<span class="mr-2">←</span> Back
			</button>
			<h1 class="mb-2 text-4xl font-extrabold">
				<span
					class="bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent"
				>
					Daftar ByteJump
				</span>
			</h1>
			<p class="mb-6 text-gray-300">
				Buat akun baru dan mulai lompat bareng komunitas dev Indonesia.
			</p>

			<form class="rounded-xl bg-black/50 p-6 shadow-lg" on:submit={handleSubmit}>
				<!-- INPUTS -->
				<div class="mb-4">
					<Label for="nama" class="text-white">Nama Lengkap</Label>
					<Input id="nama" bind:value={nama} type="text" placeholder="Ekik Dev" required />
				</div>
				<div class="mb-4">
					<Label for="email" class="text-white">Email</Label>
					<Input
						id="email"
						bind:value={email}
						type="email"
						placeholder="ekik@example.com"
						required
					/>
				</div>
				<div class="mb-4">
					<Label for="password" class="text-white">Password</Label>
					<Input
						id="password"
						bind:value={password}
						type="password"
						placeholder="••••••••"
						required
					/>
				</div>
				<div class="mb-4">
					<Label for="confirm-password" class="text-white">Konfirmasi Password</Label>
					<Input
						id="confirm-password"
						bind:value={confirmPassword}
						type="password"
						placeholder="••••••••"
						required
					/>
				</div>

				<!-- ERROR/SUCCESS -->
				{#if passwordMismatch}
					<p class="mb-4 text-sm text-red-400">Password tidak cocok</p>
				{/if}
				{#if errorMessage}
					<p class="mb-4 text-sm text-red-400">{errorMessage}</p>
				{/if}
				{#if successMessage}
					<p class="mb-4 text-sm text-green-400">{successMessage}</p>
				{/if}

				<Button type="submit" color="pink" class="w-full">Sign Up</Button>
			</form>

			<div class="mt-4 text-sm text-gray-300">
				Sudah punya akun?
				<a href="/auth/login" class="font-semibold text-blue-400 hover:underline">Login</a>
			</div>
		</div>

		<!-- DESKTOP LEFT SIDE TEXT -->
		<div class="relative z-10 mx-auto hidden w-full max-w-lg text-left md:block">
			<div class="rounded-xl bg-black/60 p-10 shadow-xl">
				<h1 class="mb-6 text-5xl leading-tight font-extrabold text-white drop-shadow-lg">
					<span
						class="bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent"
					>
						Bergabung Sekarang
					</span>
				</h1>
				<p class="mb-2 text-xl text-gray-200">
					Buat akun ByteJump dan mulai jelajahi ekosistem developer Indonesia.
				</p>
				<p class="text-base text-gray-300">
					Belajar, berbagi, dan bangun proyek bareng komunitas yang solid.
				</p>
			</div>
		</div>
	</div>

	<!-- RIGHT SECTION DESKTOP FORM -->
	<div class="hidden w-1/2 flex-col items-center justify-center bg-[#111827] px-6 py-12 md:flex">
		<form class="w-full max-w-md" on:submit={handleSubmit}>
			<button
				on:click={goBack}
				class="mb-6 flex items-center text-lg text-gray-300 hover:text-white"
			>
				<span class="mr-2">←</span> Back
			</button>
			<h2 class="mb-6 text-4xl font-bold text-white">Register</h2>

			<div class="mb-4">
				<Label for="nama-desktop" class="text-white">Nama Lengkap</Label>
				<Input id="nama-desktop" bind:value={nama} type="text" placeholder="Ekik Dev" required />
			</div>
			<div class="mb-4">
				<Label for="email-desktop" class="text-white">Email</Label>
				<Input
					id="email-desktop"
					bind:value={email}
					type="email"
					placeholder="ekik@example.com"
					required
				/>
			</div>
			<div class="mb-4">
				<Label for="password-desktop" class="text-white">Password</Label>
				<Input
					id="password-desktop"
					bind:value={password}
					type="password"
					placeholder="••••••••"
					required
				/>
			</div>
			<div class="mb-4">
				<Label for="confirm-password-desktop" class="text-white">Konfirmasi Password</Label>
				<Input
					id="confirm-password-desktop"
					bind:value={confirmPassword}
					type="password"
					placeholder="••••••••"
					required
				/>
			</div>

			{#if passwordMismatch}
				<p class="mb-4 text-sm text-red-400">Password tidak cocok</p>
			{/if}
			{#if errorMessage}
				<p class="mb-4 text-sm text-red-400">{errorMessage}</p>
			{/if}
			{#if successMessage}
				<p class="mb-4 text-sm text-green-400">{successMessage}</p>
			{/if}

			<Button type="submit" color="pink" class="w-full">Sign Up</Button>

			<div class="mt-4 text-center text-sm text-gray-300">
				Sudah punya akun?
				<a href="/auth/login" class="font-semibold text-blue-400 hover:underline">Login</a>
			</div>
		</form>
	</div>
</div>

<style>
	@media (min-width: 768px) {
		html,
		body {
			overflow: hidden;
		}
	}
</style>
