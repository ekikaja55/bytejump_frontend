<script lang="ts">
  import {
    Sidebar,
    SidebarGroup,
    SidebarItem,
    SidebarDropdownItem,
    SidebarButton,
    SidebarBrand,
    uiHelpers,
    CloseButton
  } from 'flowbite-svelte';
  import {
    BellSolid,
    UserSolid,
    UserSettingsSolid,
    ArrowRightAltSolid,
    BarsOutline
  } from 'flowbite-svelte-icons';
  import { authStore, logout } from '$lib/stores/authStore';
  import { page } from '$app/state';
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';

  let auth: any;
  const unsubscribe = authStore.subscribe((val) => (auth = val));
  onMount(() => () => unsubscribe());

  let activeUrl = $state(page.url.pathname);
  const spanClass = 'flex-1 ms-3 whitespace-nowrap';
  const sidebarUi = uiHelpers();
  let isOpen = $state(false);
  const closeSidebar = sidebarUi.close;

  $effect(() => {
    isOpen = sidebarUi.isOpen;
    activeUrl = page.url.pathname;
  });

  const handleLogout = async () => {
    await logout();
    goto('/auth/login');
  };
</script>

<SidebarButton onclick={sidebarUi.toggle} class="mb-2 dark:bg-gray-800 dark:text-white" />

<div class="relative">
  <Sidebar
    {activeUrl}
    {isOpen}
    {closeSidebar}
    params={{ x: -50, duration: 50 }}
    class="z-50 h-full dark:bg-gray-900 dark:text-white"
    position="absolute"
    activeClass="p-2 dark:bg-gray-800 dark:text-white"
    nonActiveClass="p-2 dark:bg-gray-900 dark:text-gray-300"
  >
    <CloseButton onclick={closeSidebar} color="gray" class="absolute top-3 right-1 p-2 md:hidden dark:bg-gray-800 dark:text-white" />

    <SidebarGroup>
      <SidebarBrand>
        <div class="flex items-center gap-3">
          <img
            src={auth?.user?.user_avatar || '/foto3.jpg'}
            alt="Avatar"
            class="h-10 w-10 rounded-full border-2 border-white"
          />
          <div>
            <p class="text-sm font-semibold text-white">{auth?.user?.user_nama || 'Guest'}</p>
            <p class="text-xs text-gray-300">{auth?.user?.user_role || 'user'}</p>
          </div>
        </div>
      </SidebarBrand>

      <SidebarItem label="Notifikasi" href="/dashboard/user/notifications" class="dark:hover:bg-gray-800 dark:text-white">
        <BellSolid class="h-5 w-5" />
      </SidebarItem>
      <SidebarDropdownItem label="AI Section" class="dark:text-white">
        <SidebarItem href="/dashboard/user/ai/image-generator" class="dark:hover:bg-gray-800 dark:text-white">
          <BarsOutline class="h-5 w-5" />
          <span class={spanClass}>Image Generator</span>
        </SidebarItem>
        <SidebarItem href="/dashboard/user/ai/chatbot" class="dark:hover:bg-gray-800 dark:text-white">
          <BarsOutline class="h-5 w-5" />
          <span class={spanClass}>Chatbot</span>
        </SidebarItem>
      </SidebarDropdownItem>

      <SidebarItem label="Riwayat Transaksi" href="/dashboard/user/history" class="dark:hover:bg-gray-800 dark:text-white">
        <BellSolid class="h-5 w-5" />
      </SidebarItem>
      <SidebarItem label="Promo & Paket" href="/dashboard/user/promo" class="dark:hover:bg-gray-800 dark:text-white">
        <BarsOutline class="h-5 w-5" />
      </SidebarItem>

      <SidebarDropdownItem label="Pengaturan" class="dark:text-white">
        <SidebarItem href="/dashboard/user/settings/profile" class="dark:hover:bg-gray-800 dark:text-white">
          <UserSolid class="h-5 w-5" />
          <span class={spanClass}>Perbarui Profil</span>
        </SidebarItem>
        <SidebarItem onclick={handleLogout} class="dark:hover:bg-gray-800 dark:text-white">
          <ArrowRightAltSolid class="h-5 w-5" />
          <span class={spanClass}>Keluar</span>
        </SidebarItem>
      </SidebarDropdownItem>
    </SidebarGroup>
  </Sidebar>

  <!-- Konten Halaman -->
  <div class="h-screen overflow-auto px-4 py-4 md:ml-64 dark:bg-gray-900">
    <div class="rounded-lg border-2 border-dashed border-gray-200 p-6 dark:border-gray-700 dark:bg-gray-800">
      <h1 class="mb-2 text-2xl font-bold text-white">Selamat datang, {auth?.user?.user_nama}!</h1>
      <p class="text-gray-300">
        Ini adalah dashboard pengguna ByteJump. Eksplorasi fitur yang tersedia di sidebar.
      </p>
    </div>
  </div>
</div>

<style>
  body {
    background-color: #111827;
  }
</style>
