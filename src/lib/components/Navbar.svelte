<script lang="ts">
    import {
        Navbar,
        NavBrand,
        NavLi,
        NavUl,
        NavHamburger,
        Button,
    } from 'flowbite-svelte';
</script>

<Navbar class="border-gray-700 bg-gray-900 fixed z-[9999]">
    <NavBrand href="/">
        <span
            class="self-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-2xl font-bold text-transparent"
        >
            ByteJump
        </span>
    </NavBrand>

    <!-- Desktop Login/Register -->
    <div class="hidden md:flex gap-2 md:order-2">
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
    </div>

    <!-- Hamburger always visible on mobile -->
    <div class="flex md:hidden gap-2 md:order-2">
        <NavHamburger class="text-gray-400" />
    </div>

    <NavUl class="md:space-x-8">
        <NavLi href="/" class="text-black md:text-white hover:text-blue-400">Home</NavLi>
        <NavLi href="/journey" class="text-black md:text-gray-300 hover:text-blue-400">Our Journey</NavLi>
        <NavLi href="/forums" class="text-black md:text-gray-300 hover:text-blue-400">Forums</NavLi>
        <NavLi href="/news" class="text-black md:text-gray-300 hover:text-blue-400">News</NavLi>
        <NavLi href="/wiki" class="text-black md:text-gray-300 hover:text-blue-400">Wiki</NavLi>
        <NavLi href="/chatbot" class="text-black md:text-gray-300 hover:text-blue-400">Chatbot</NavLi>
        <!-- Mobile Login/Register -->
        <div class="flex flex-col gap-2 mt-4 md:hidden">
            <a href="/auth/login">
                <Button
                    size="sm"
                    color="dark"
                    class="w-full bg-gray-800 text-white hover:bg-gray-700 border-gray-700"
                >
                    Login
                </Button>
            </a>
            <a href="/auth/register">
                <Button
                    size="sm"
                    class="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700"
                >
                    Register
                </Button>
            </a>
        </div>
    </NavUl>
</Navbar>