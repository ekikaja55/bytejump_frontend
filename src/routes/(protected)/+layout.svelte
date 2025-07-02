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
  const sidebarOpen = writable(false);
  $: currentUser = $user;

  const menusMember = [
    { name: 'Dashboard', href: '/dashboard', icon: '📊' },
    { name: 'Notifikasi', href: '/dashboard/notifikasi', icon: '🔔' },
    { name: 'Transaksi', href: '/dashboard/transaksi', icon: '💳' },
    { name: 'Upgrade', href: '/dashboard/upgrade', icon: '⭐' },
    { name: 'Chatbot AI', href: '/dashboard/ai/chatbot', icon: '🤖' },
    { name: 'Generate Image', href: '/dashboard/ai/image', icon: '🎨' },
    { name: 'Update Profil', href: '/dashboard/profile', icon: '👤' },
  ];

  const menusAdmin = [
    { name: 'Dashboard', href: '/dashboard', icon: '📊' },
    { name: 'Master Transaksi', href: '/dashboard/admin/transaksi', icon: '💼' },
    { name: 'Master Wiki', href: '/dashboard/admin/wiki', icon: '📚' },
    { name: 'Master Admin', href: '/dashboard/admin/manage', icon: '⚙️' },
    { name: 'Update Profil', href: '/dashboard/profile', icon: '👤' },
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

  const toggleSidebar = () => {
    sidebarOpen.update(n => !n);
  };

  const closeSidebar = () => {
    sidebarOpen.set(false);
  };

  $: role = currentUser?.user?.user_role;
  $: menuList = role === 'admin' ? menusAdmin : menusMember;
</script>

<style>
  .gradient-text {
    background: linear-gradient(to right, #60a5fa, #a78bfa);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .glass-effect {
    backdrop-filter: blur(10px);
    background: rgba(31, 41, 55, 0.8);
    border: 1px solid rgba(75, 85, 99, 0.3);
  }

  .sidebar-shadow {
    box-shadow: 4px 0 15px rgba(0, 0, 0, 0.3);
  }

  .hover-scale {
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }

  .hover-scale:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
  }

  .mobile-overlay {
    backdrop-filter: blur(4px);
    background: rgba(0, 0, 0, 0.5);
  }

  @media (max-width: 768px) {
    .sidebar-mobile {
      transform: translateX(-100%);
      transition: transform 0.3s ease-in-out;
    }
    
    .sidebar-mobile.open {
      transform: translateX(0);
    }
  }
</style>

{#if $isAuthenticated === null}
  <div class="flex h-screen items-center justify-center" style="background-color: #111827;">
    <div class="text-center">
      <Spinner size="16" color="blue" />
      <p class="mt-4 text-white">Loading...</p>
    </div>
  </div>
{:else if $isAuthenticated}
  <div class="flex h-screen" style="background-color: #111827;">
    <!-- Mobile Menu Button -->
    <button
      class="fixed top-4 left-4 z-50 rounded-lg bg-gray-800 p-2 text-white hover:bg-gray-700 md:hidden"
      onclick={toggleSidebar}
      aria-label="Toggle menu"
    >
      <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
      </svg>
    </button>

    <!-- Mobile Overlay -->
    {#if $sidebarOpen}
      <div 
        class="fixed inset-0 z-40 mobile-overlay md:hidden"
        onclick={closeSidebar}
        role="button"
        tabindex="-1"
        onkeydown={(e) => e.key === 'Escape' && closeSidebar()}
      ></div>
    {/if}

    <!-- Sidebar -->
    <aside class="sidebar-mobile sidebar-shadow fixed inset-y-0 left-0 z-40 w-64 space-y-6 overflow-y-auto bg-gray-800 p-6 md:relative md:translate-x-0 {$sidebarOpen ? 'open' : ''}">
      <!-- Header -->
      <div class="flex items-center justify-between">
        <h1 class="gradient-text text-2xl font-bold">ByteJump</h1>
        <button
          class="rounded-lg p-1 text-gray-400 hover:bg-gray-700 hover:text-white md:hidden"
          onclick={closeSidebar}
          aria-label="Close menu"
        >
          <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>

      <!-- User Info Card -->
      <div class="glass-effect rounded-xl p-4 space-y-3">
        <div class="flex items-center space-x-3">
          <Avatar 
            src={currentUser?.user?.user_avatar ?? ''} 
            alt="Avatar" 
            class="h-12 w-12 ring-2 ring-blue-400/50" 
            rounded 
          />
          <div class="flex-1 min-w-0">
            <p class="text-sm font-semibold text-white truncate">
              {currentUser?.user?.user_nama}
            </p>
            <p class="text-xs text-gray-400 capitalize">
              {currentUser?.user?.user_role}
            </p>
          </div>
        </div>
        
        {#if role === 'member'}
          <div class="rounded-lg bg-green-500/10 border border-green-500/20 p-2">
            <p class="text-sm text-green-400 font-medium">
              💰 Saldo: Rp {currentUser?.user?.user_balance?.toLocaleString('id-ID') || '0'}
            </p>
          </div>
        {/if}
      </div>

      <!-- Navigation -->
      <nav class="space-y-2">
        <p class="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Menu</p>
        {#each menuList as item}
          <a 
            href={item.href} 
            class="hover-scale group flex items-center space-x-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-300 hover:bg-blue-600/20 hover:text-white transition-all duration-200"
            onclick={closeSidebar}
          >
            <span class="text-lg">{item.icon}</span>
            <span class="flex-1">{item.name}</span>
            <svg class="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </a>
        {/each}

        <!-- Divider -->
        <div class="border-t border-gray-700 my-4"></div>

        <!-- Action Buttons -->
        <div class="space-y-2">
          <button 
            onclick={handleLogout} 
            class="hover-scale group flex w-full items-center space-x-3 rounded-lg bg-red-600/20 border border-red-600/30 px-3 py-2.5 text-sm font-medium text-red-400 hover:bg-red-600 hover:text-white transition-all duration-200"
          >
            <span class="text-lg">🚪</span>
            <span class="flex-1 text-left">Logout</span>
          </button>

          <a 
            href="/" 
            class="hover-scale group flex items-center space-x-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-400 hover:bg-gray-700 hover:text-white transition-all duration-200"
            onclick={closeSidebar}
          >
            <span class="text-lg">🏠</span>
            <span class="flex-1">Kembali ke Beranda</span>
          </a>
        </div>
      </nav>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 overflow-y-auto">
      <!-- Top Bar for Mobile -->
      <div class="sticky top-0 z-30 bg-gray-800/95 backdrop-blur-sm border-b border-gray-700 p-4 md:hidden">
        <div class="flex items-center justify-between">
          <h2 class="gradient-text text-lg font-semibold">Dashboard</h2>
          <div class="flex items-center space-x-2">
            <Avatar 
              src={currentUser?.user?.user_avatar ?? ''} 
              alt="Avatar" 
              class="h-8 w-8" 
              rounded 
            />
          </div>
        </div>
      </div>

      <!-- Content Area -->
      <div class="p-4 md:p-6 lg:p-8">
        <slot />
      </div>
    </main>
  </div>
{/if}