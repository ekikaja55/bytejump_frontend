<script lang="ts">
	import {
		Navbar,
		NavBrand,
		NavLi,
		NavUl,
		NavHamburger,
		Button,
		Avatar,
		Dropdown,
		DropdownItem,
		DropdownHeader,
		DropdownGroup
	} from 'flowbite-svelte';
	import { onMount } from 'svelte';
	import { logout } from '$lib/stores/authStore';

	let user: any = null;

	onMount(() => {
		const data = localStorage.getItem('dataUser');
		if (data) {
			try {
				user = JSON.parse(data);
			} catch (e) {
				user = null;
			}
		}
	});

	const handleLogout = async() => {
		localStorage.removeItem('dataUser');
		await logout()
		location.href = '/';
	};
</script>

<Navbar class="border-gray-700 bg-gray-900 fixed z-[9999] w-full">
	<!-- Brand -->
	<NavBrand href="/">
		<span class="self-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-2xl font-bold text-transparent">
			ByteJump
		</span>
	</NavBrand>

	<!-- Kanan -->
	<div class="flex items-center md:order-2 gap-2">
		{#if user}
			<!-- Avatar dan Dropdown -->
			<Avatar id="avatar-menu" src={user.user.user_avatar || '/foto1.jpg'} alt="Profile" />
			<Dropdown placement="bottom" triggeredBy="#avatar-menu">
				<DropdownHeader>
					<span class="block text-sm font-semibold">{user.user.user_nama}</span>
					<span class="block text-sm text-gray-500 truncate">{user.user.user_email}</span>
				</DropdownHeader>
				<DropdownGroup>
					<!-- <DropdownItem href="/profile">Profile</DropdownItem> -->
					<DropdownItem href="/dashboard">Dashboard</DropdownItem>
				</DropdownGroup>
				<DropdownItem onclick={handleLogout}>Logout</DropdownItem>
			</Dropdown>
		{:else}
			<!-- Tombol Login & Register -->
			<a href="/auth/login">
				<Button
					size="sm"
					color="dark"
					class="bg-gray-800 text-white hover:bg-gray-700 border-gray-700"
				>
					Login
				</Button>
			</a>
			<a href="/auth/register">
				<Button
					size="sm"
					class="bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700"
				>
					Register
				</Button>
			</a>
		{/if}

		<NavHamburger class="text-gray-400 md:hidden" />
	</div>

	<!-- Nav Links -->
	<NavUl class="md:space-x-8">
		<NavLi href="/journey" class="text-black md:text-gray-300 hover:text-blue-400">Our Journey</NavLi>
		<NavLi href="/forums" class="text-black md:text-gray-300 hover:text-blue-400">Forums</NavLi>
		<NavLi href="/news" class="text-black md:text-gray-300 hover:text-blue-400">News</NavLi>
		<NavLi href="/wiki" class="text-black md:text-gray-300 hover:text-blue-400">Wiki</NavLi>
		<NavLi href="/chatbot" class="text-black md:text-gray-300 hover:text-blue-400">Chatbot</NavLi>
	</NavUl>
</Navbar>
