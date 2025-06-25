<!-- src/routes/dashboard/member -->
<script lang="ts">
	import { authLocalStore } from '$lib/stores/authLocalStore';
	import { logout } from '$lib/stores/authStore';
	import { Spinner, Button } from 'flowbite-svelte';
	import {
		Sidebar,
		SidebarGroup,
		SidebarItem,
		SidebarBrand,
		SidebarButton,
		uiHelpers
	} from 'flowbite-svelte';
	import {
		BellSolid,
		CogSolid,
		UserCircleSolid
	} from 'flowbite-svelte-icons';
	import { onMount } from 'svelte';

	const sidebar = uiHelpers();

	// Reaktif: sinkronisasi nilai store
	$: user = $authLocalStore.user;
	$: loading = $authLocalStore.loading;
	$: message = $authLocalStore.message;
	$: isHydrated = $authLocalStore.isHydrated;


	const handleLogout = async () => {
		authLocalStore.set({ user: null, message: null, loading: false, isHydrated: true });
		await logout();
		window.location.href = '/auth/login';
	};
</script>

{#if !isHydrated}
	<!-- Menunggu store hydrate -->
	<div class="flex justify-center items-center h-screen bg-gray-900">
		<Spinner size="16" color="blue" />
	</div>

{:else if loading}
	<!-- Spinner saat loading -->
	<div class="flex justify-center items-center h-screen bg-gray-900">
		<Spinner size="16" color="blue" />
	</div>

{:else if user}
	<!-- Render dashboard -->
	<SidebarButton onclick={sidebar.toggle} class="mb-2 md:hidden text-white" />

	<div class="relative">
		<Sidebar
			backdrop={false}
			isOpen={sidebar.isOpen}
			closeSidebar={sidebar.close}
			params={{ x: -50, duration: 50 }}
			class="z-50 h-full dark:bg-gray-800"
			position="absolute"
			activeClass="p-2 text-white bg-gray-700"
			nonActiveClass="p-2 text-gray-400 hover:text-white hover:bg-gray-700"
		>
			<SidebarGroup>
				<SidebarBrand>
					<div class="flex items-center gap-2">
						<img src={user.user_avatar} alt="Avatar" class="w-10 h-10 rounded-full object-cover" />
						<div class="flex flex-col">
							<span class="text-white font-semibold">{user.user_nama}</span>
							<span class="text-xs text-gray-400 capitalize">{user.user_role}</span>
						</div>
					</div>
				</SidebarBrand>

				<SidebarItem href="/dashboard/member" label="Notifikasi">
					<BellSolid class="h-5 w-5" />
				</SidebarItem>

				<SidebarItem label="AI Section">
					<UserCircleSolid class="h-5 w-5" />
				</SidebarItem>

				<SidebarGroup class="ml-6">
					<SidebarItem href="/dashboard/member/image-generator" label="Image Generator" />
					<SidebarItem href="/dashboard/member/chatbot" label="Chatbot" />
				</SidebarGroup>

				<SidebarItem href="/dashboard/member/history" label="Riwayat Transaksi">
					<UserCircleSolid class="h-5 w-5" />
				</SidebarItem>

				<SidebarItem href="/dashboard/member/promo" label="Promosi Saldo Prompt">
					<UserCircleSolid class="h-5 w-5" />
				</SidebarItem>

				<SidebarItem label="Pengaturan">
					<CogSolid class="h-5 w-5" />
				</SidebarItem>

				<SidebarGroup class="ml-6">
					<SidebarItem href="/dashboard/member/settings" label="Update Profil" />
					<Button color="red" class="mt-2" onclick={handleLogout}>Logout</Button>
				</SidebarGroup>
			</SidebarGroup>
		</Sidebar>

		<!-- Content Area -->
		<div class="h-full min-h-screen overflow-auto px-4 md:ml-64 py-6 bg-gray-900 text-white">
			<div class="rounded-lg border-2 border-dashed border-gray-600 p-6">
				<h1 class="text-2xl font-bold mb-4">Selamat datang, {user.user_nama}!</h1>
				<p class="text-gray-300">Role Anda: <strong>{user.user_role}</strong></p>
				<p class="mt-4 text-sm text-gray-400">Silakan eksplor fitur-fitur dashboard Anda di sidebar.</p>
			</div>
		</div>
	</div>

{:else}
	<!-- User null setelah isHydrated -->
	<div class="flex flex-col items-center justify-center h-screen bg-gray-900 text-center">
		<p class="text-red-400 text-lg mb-4">Data tidak ditemukan. Silakan login ulang.</p>
		<Button color="blue" onclick={() => (window.location.href = '/auth/login')}>Login Ulang</Button>
	</div>
{/if}
