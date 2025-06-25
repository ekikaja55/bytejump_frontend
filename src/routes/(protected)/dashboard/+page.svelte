<!--/(protected)/dashboard/+page.svelte -->
<script lang="ts">
	import { goto } from '$app/navigation';
	import { logout } from '$lib/stores/authStore';
	import { user, isReady, isLoading } from '$lib/stores/authDerived';
	import { Avatar, Button, Spinner } from 'flowbite-svelte';

	$: currentUser = $user;
	$: ready = $isReady;
	$: loading = $isLoading;
	$: userInfoList = currentUser
		? [
			
				{ label: 'id', value: currentUser.user.id },
				{ label: 'Nama', value: currentUser.user.user_nama },
				{ label: 'Email', value: currentUser.user.user_email },
				{ label: 'Role', value: currentUser.user.user_role },
				{ label: 'Balance', value: currentUser.user.user_balance }

			]
		: [];

	console.log('currentUser:', currentUser);
	console.log('ready:', ready);
	console.log('loading:', loading);

	const handleLogout = async () => {
		localStorage.removeItem('dataUser');
		await logout();
		location.href = '/';
	};
</script>

{#if !ready || loading}
	<Spinner size="16" />
{:else if currentUser}
	<!-- hasil stringfy 
	{"user":{"id":"685bf7f782fa89b3ffd3c9f5","user_email":"robert@gmail.com","user_nama":"Robert","user_avatar":"https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg","user_balance":250,"user_role":"member"},"is_auth":true,"loading":false,"message":"Success Login"} 
	-->

	<Avatar src={currentUser.user.user_avatar} class="mr-3 h-10 w-10 rounded-full" alt="User" />
	
	{#each userInfoList as info}
		<h1>{info.label}: {info.value}</h1>
	{/each}

	<Button color="red" class="mt-2" onclick={handleLogout}>Logout</Button>
	<Button color="blue" class="mt-2" onclick={() => goto('/')}>Home</Button>
{:else}
	<!-- Fallback: kalau data sudah siap tapi user null -->
	<p>Data user tidak tersedia. <a href="/auth/login">Login</a></p>
{/if}

<style>
	:global(body) {
		background-color: #111827;
		color: aliceblue;
	}
</style>
