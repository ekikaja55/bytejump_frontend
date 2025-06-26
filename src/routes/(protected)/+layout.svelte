<!-- src/routes/(protected)/+layout.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { Spinner, Avatar } from 'flowbite-svelte';
  import { logout } from '$lib/stores/authStore';
  import { getAuthLocal } from '$lib/utils/authToLocal';
  import { user } from '$lib/stores/authDerived';
  import { writable } from 'svelte/store';

  const isAuthenticated = writable<boolean | null>(null);
  $: currentUser = $user;

  const menusMember = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Notifikasi', href: '/dashboard/notifikasi' },
    { name: 'Transaksi', href: '/dashboard/transaksi' },
    { name: 'Upgrade', href: '/dashboard/upgrade' },
    { name: 'Chatbot AI', href: '/dashboard/ai/chatbot' },
    { name: 'Generate Image', href: '/dashboard/ai/image' },
    { name: 'Update Profil', href: '/dashboard/profile' },
  ];

  const menusAdmin = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Master Transaksi', href: '/dashboard/admin/transaksi' },
    { name: 'Master Wiki', href: '/dashboard/admin/wiki' },
    { name: 'Master Admin', href: '/dashboard/admin/manage' },
    { name: 'Update Profil', href: '/dashboard/profile' },
  ];

  onMount(() => {
    const authLocal = getAuthLocal();
    if (!authLocal) {
      window.location.href = '/auth/login';
    } else {
      isAuthenticated.set(true);
    }
  });

  const handleLogout = async () => {
    localStorage.removeItem('dataUser');
    await logout();
    location.href = '/';
  };

  $: role = currentUser?.user?.user_role;
  $: menuList = role === 'admin' ? menusAdmin : menusMember;
</script>

{#if $isAuthenticated === null}
  <div class="flex h-screen items-center justify-center bg-gray-900 text-white">
    <Spinner size="16" />
  </div>
{:else if $isAuthenticated}
  <div class="flex h-screen bg-gray-900 text-white">
    <!-- Sidebar -->
    <aside class="w-64 space-y-6 bg-gray-800 p-6 overflow-y-auto">
      <h1 class="text-2xl font-bold text-blue-400">ByteJump</h1>

      <!-- Info User -->
      <div class="mt-4 space-y-1 border-b border-gray-700 pb-4">
        <Avatar src={currentUser?.user?.user_avatar ?? ''} alt="Avatar" class="h-12 w-12" rounded />
        <p class="text-sm font-semibold">{currentUser?.user?.user_nama}</p>
        <p class="text-xs text-gray-400">{currentUser?.user?.user_role}</p>
        {#if role === 'member'}
          <p class="text-sm text-green-400">Saldo: Rp {currentUser?.user?.user_balance}</p>
        {/if}
      </div>

      <!-- Navigation -->
      <nav class="space-y-2">
        {#each menuList as item}
          <a href={item.href} class="block rounded px-2 py-1 hover:bg-blue-700 hover:text-white">{item.name}</a>
        {/each}

        <!-- Logout -->
        <button on:click={handleLogout} class="mt-4 w-full rounded bg-red-600 px-2 py-1 text-left text-sm hover:bg-red-700">
          Logout
        </button>

        <!-- Link ke Home -->
        <a href="/" class="mt-2 block text-sm text-gray-400 hover:text-white">⬅️ Kembali ke Beranda</a>
      </nav>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 overflow-y-auto p-6">
      <slot />
    </main>
  </div>
{/if}
