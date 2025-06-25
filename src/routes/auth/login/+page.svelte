<script lang="ts">
	import { Label, Input, Button } from 'flowbite-svelte';
	import { login } from '$lib/stores/authStore';
	import { goto,} from '$app/navigation';
	import { get } from 'svelte/store';
	import { authStore } from '$lib/stores/authStore';

	
	let emailMobile = '';
	let passwordMobile = '';
	let emailDesktop = '';
	let passwordDesktop = '';
	let errorMessage:string | null  = null;

	const handleLogin = async ( isMobile = false) => {
		//muncul
		console.log("masuk login");
		
		const email = isMobile ? emailMobile : emailDesktop;
		const password = isMobile ? passwordMobile : passwordDesktop;

		//muncul
		console.log(email,password);
		
		try {
			await login(email, password);

			let userRole: string | null = null;
			

			authStore.subscribe((val) => {
				console.log("ini isi auth store dari login page",val);
				userRole = val.user?.user_role ?? null;
				errorMessage=val.message
			})();
			
			//muncul disini kasusnya di log "member"
			console.log(userRole);
			
			

			// Arahkan sesuai role
			if (userRole === 'admin') {
				goto('/dashboard/admin');
			} else if (userRole === 'member') {
				goto('/dashboard/member');
			} else {
				return
			}
		} catch (error:any) {
			console.log(error.message);
			errorMessage = 'Email atau password salah.';
		}
	};
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
	<!-- Mobile -->
	<div
		class="w-full md:w-1/2 bg-cover bg-center relative flex flex-col justify-center items-center px-6 py-12"
		style="background-image: url('/loginImg.jpg');"
	>
		<!-- Overlay -->
		<div class="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-blue-900/70 z-0 md:hidden"></div>

		<!-- Mobile Form -->
		<div class="relative z-10 w-full max-w-md mx-auto min-h-screen text-white md:hidden py-10">
			<h1 class="text-4xl font-extrabold mb-2 text-center">
				<span class="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
					ByteJump
				</span>
			</h1>
			<p class="text-gray-300 mb-6">Selamat datang kembali! Silakan login untuk lanjut.</p>

			<form class="bg-black/50 p-6 rounded-xl shadow-lg" on:submit={(e) => handleLogin( true)}>
				<div class="mb-4">
					<Label for="email" class="mb-2 text-white">Email address</Label>
					<Input bind:value={emailMobile} type="email" placeholder="ekik55@example.com" required />
				</div>
				<div class="mb-4">
					<Label for="password" class="mb-2 text-white">Password</Label>
					<Input bind:value={passwordMobile} type="password" placeholder="•••••••••" required />
				</div>
				{#if errorMessage}
					<p class="text-red-400 text-sm mb-4">{errorMessage}</p>
				{/if}
				<Button type="submit" color="indigo" class="w-full">Sign In</Button>
			</form>

			<div class="mt-4 text-sm text-gray-300 text-center">
				Belum punya akun?
				<a href="/auth/register" class="text-blue-400 hover:underline font-semibold">Sign Up</a>
			</div>
		</div>

		<!-- Desktop-only intro section -->
		<div class="relative z-10 hidden md:block w-full max-w-lg mx-auto text-left">
			<div class="bg-black/60 rounded-xl shadow-xl p-10">
				<h1 class="mb-6 text-5xl font-extrabold text-white leading-tight drop-shadow-lg">
					<span class="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
						Sign In
					</span>
				</h1>
				<p class="text-xl text-gray-200 mb-2">
					Selamat datang kembali di <span class="font-semibold text-blue-300">ByteJump</span>!
				</p>
				<p class="text-base text-gray-300">
					Masuk dan lanjutkan perjalanan coding Anda bersama komunitas developer Indonesia.
				</p>
			</div>
		</div>
	</div>

	<!-- Desktop-only form -->
	<div class="hidden md:flex w-1/2 flex-col justify-center items-center bg-[#111827] px-6 py-12">
		<form class="w-full max-w-md" on:submit={() => handleLogin()}>
			<h2 class="text-4xl font-bold text-white mb-6">Login Form</h2>
			<div class="mb-6">
				<Label for="email" class="mb-2 text-white">Email address</Label>
				<Input bind:value={emailDesktop} type="email" placeholder="ekik55@example.com" required />
			</div>
			<div class="mb-6">
				<Label for="password" class="mb-2 text-white">Password</Label>
				<Input bind:value={passwordDesktop} type="password" placeholder="•••••••••" required />
			</div>
			{#if errorMessage}
				<p class="text-red-400 text-sm mb-4">{errorMessage}</p>
			{/if}
			<Button type="submit" color="indigo" class="w-full">Sign In</Button>
			<div class="mt-4 text-sm text-gray-300 text-center">
				Belum punya akun?
				<a href="/auth/register" class="text-blue-400 hover:underline font-semibold">Sign Up</a>
			</div>
		</form>
	</div>
</div>
