<!-- /auth/login/+page.svelte -->

<script lang="ts">
	import { Label, Input, Button } from 'flowbite-svelte';
	import { login } from '$lib/stores/authStore';
	import { goto } from '$app/navigation';
	import { get } from 'svelte/store';
	import { authStore } from '$lib/stores/authStore';

	let emailMobile = '';
	let passwordMobile = '';
	let emailDesktop = '';
	let passwordDesktop = '';
	let errorMessage: string | null = null;

	const goBack = () => goto('/');
	const handleLogin = async (isMobile = false) => {
		//muncul
		console.log('masuk login');

		const email = isMobile ? emailMobile : emailDesktop;
		const password = isMobile ? passwordMobile : passwordDesktop;

		//muncul
		console.log(email, password);

		try {
			await login(email, password);

			let userRole: string | null = null;

			authStore.subscribe((val) => {
				console.log('ini isi auth store dari login page', val);
				userRole = val.user?.user_role ?? null;
				errorMessage = val.message;
			})();

			//muncul disini kasusnya di log "member"
			console.log(userRole);

			
			if (userRole) {
				setTimeout(() => {
					goto('/');
				}, 2000);
			} else {
				return;
			}
		} catch (error: any) {
			console.log(error.message);
			errorMessage = 'Email atau password salah.';
		}
	};
</script>

<div class="flex h-full min-h-screen w-full flex-col md:flex-row">
	<!-- Mobile -->
	<div
		class="relative flex w-full flex-col items-center justify-center bg-cover bg-center px-6 py-12 md:w-1/2"
		style="background-image: url('/loginImg.jpg');"
	>
		<!-- Overlay -->
		<div
			class="absolute inset-0 z-0 bg-gradient-to-br from-black/80 via-black/60 to-blue-900/70 md:hidden"
		></div>

		<!-- Mobile Form -->
		<div class="relative z-10 mx-auto min-h-screen w-full max-w-md py-10 text-white md:hidden">
			<button
				on:click={goBack}
				class="mb-6 flex items-center text-sm text-gray-300 hover:text-white"
			>
				<span class="mr-2">←</span> Back
			</button>

			<h1 class="mb-2 text-center text-4xl font-extrabold">
				<span
					class="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
				>
					ByteJump
				</span>
			</h1>
			<p class="mb-6 text-gray-300">Selamat datang kembali! Silakan login untuk lanjut.</p>

			<form class="rounded-xl bg-black/50 p-6 shadow-lg" on:submit={(e) => handleLogin(true)}>
				<div class="mb-4">
					<Label for="email" class="mb-2 text-white">Email address</Label>
					<Input bind:value={emailMobile} type="email" placeholder="ekik55@example.com" required />
				</div>
				<div class="mb-4">
					<Label for="password" class="mb-2 text-white">Password</Label>
					<Input bind:value={passwordMobile} type="password" placeholder="•••••••••" required />
				</div>
				{#if errorMessage}
					<p class="mb-4 text-sm text-red-400">{errorMessage}</p>
				{/if}
				<Button type="submit" color="indigo" class="w-full">Sign In</Button>
			</form>

			<div class="mt-4 text-center text-sm text-gray-300">
				Belum punya akun?
				<a href="/auth/register" class="font-semibold text-blue-400 hover:underline">Sign Up</a>
			</div>
		</div>

		<!-- Desktop-only intro section -->
		<div class="relative z-10 mx-auto hidden w-full max-w-lg text-left md:block">
			<div class="rounded-xl bg-black/60 p-10 shadow-xl">
				<h1 class="mb-6 text-5xl leading-tight font-extrabold text-white drop-shadow-lg">
					<span
						class="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
					>
						Sign In
					</span>
				</h1>
				<p class="mb-2 text-xl text-gray-200">
					Selamat datang kembali di <span class="font-semibold text-blue-300">ByteJump</span>!
				</p>
				<p class="text-base text-gray-300">
					Masuk dan lanjutkan perjalanan coding Anda bersama komunitas developer Indonesia.
				</p>
			</div>
		</div>
	</div>

	<!-- Desktop-only form -->
	<div class="hidden w-1/2 flex-col items-center justify-center bg-[#111827] px-6 py-12 md:flex">
		
		<form class="w-full max-w-md" on:submit={() => handleLogin()}>
			<button on:click={goBack} class="mb-6 flex items-center text-lg text-gray-300 hover:text-white">
			<span class="mr-2">←</span> Back
		</button>
			<h2 class="mb-6 text-4xl font-bold text-white">Login Form</h2>
			<div class="mb-6">
				<Label for="email" class="mb-2 text-white">Email address</Label>
				<Input bind:value={emailDesktop} type="email" placeholder="ekik55@example.com" required />
			</div>
			<div class="mb-6">
				<Label for="password" class="mb-2 text-white">Password</Label>
				<Input bind:value={passwordDesktop} type="password" placeholder="•••••••••" required />
			</div>
			{#if errorMessage}
				<p class="mb-4 text-sm text-red-400">{errorMessage}</p>
			{/if}
			<Button type="submit" color="indigo" class="w-full">Sign In</Button>
			<div class="mt-4 text-center text-sm text-gray-300">
				Belum punya akun?
				<a href="/auth/register" class="font-semibold text-blue-400 hover:underline">Sign Up</a>
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
