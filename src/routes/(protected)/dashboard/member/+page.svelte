<script lang="ts">
	import { page } from '$app/state';
	import { onMount } from 'svelte';
	import { authStore } from '$lib/stores/authStore';
	import { Sidebar, SidebarGroup, SidebarItem, SidebarBrand, SidebarButton, uiHelpers } from 'flowbite-svelte';
	import { BellSolid, CogSolid, UserCircleSolid } from 'flowbite-svelte-icons';

	const sidebar = uiHelpers();
	let user = page.data;
  console.log(user);
  
</script>

<!-- Sidebar Toggle Button (Mobile) -->
<SidebarButton onclick={sidebar.toggle} class="mb-2 md:hidden" />

<div class="relative">
	<Sidebar 
		backdrop={false}
		isOpen={sidebar.isOpen}
		closeSidebar={sidebar.close}
		params={{ x: -50, duration: 50 }}
		class="z-50 h-full"
		position="absolute"
		activeClass="p-2"
		nonActiveClass="p-2"
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
				<BellSolid class="h-5 w-5 text-gray-400" />
			</SidebarItem>

			<SidebarItem label="AI Section">
				<UserCircleSolid class="h-5 w-5 text-gray-400" />
			</SidebarItem>
			<SidebarGroup class="ml-6">
				<SidebarItem href="/dashboard/member/image-generator" label="Image Generator" />
				<SidebarItem href="/dashboard/member/chatbot" label="Chatbot" />
			</SidebarGroup>

			<SidebarItem href="/dashboard/member/history" label="Riwayat Transaksi">
				<UserCircleSolid class="h-5 w-5 text-gray-400" />
			</SidebarItem>

			<SidebarItem href="/dashboard/member/promo" label="Promosi Saldo Prompt">
				<UserCircleSolid class="h-5 w-5 text-gray-400" />
			</SidebarItem>

			<SidebarItem label="Pengaturan">
				<CogSolid class="h-5 w-5 text-gray-400" />
			</SidebarItem>
			<SidebarGroup class="ml-6">
				<SidebarItem href="/dashboard/member/settings" label="Update Profil" />
				<SidebarItem href="/auth/logout" label="Logout" />
			</SidebarGroup>
		</SidebarGroup>
	</Sidebar>

	<!-- Content Area -->
	<div class="h-full min-h-screen overflow-auto px-4 md:ml-64 py-6">
		<div class="rounded-lg border-2 border-dashed border-gray-300 p-6 dark:border-gray-700">
			<h1 class="text-2xl font-bold text-gray-800 dark:text-white mb-4">Selamat datang, {user.user_nama}!</h1>
			<p class="text-gray-600 dark:text-gray-300">Role Anda: <strong>{user.user_role}</strong></p>
			<p class="mt-4 text-sm text-gray-400">Silakan eksplor fitur-fitur dashboard Anda di sidebar.</p>
		</div>
	</div>
</div>
