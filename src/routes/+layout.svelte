<script>
    import "../app.css";
    import Menu from 'virtual:icons/mdi/menu';
    import { page } from '$app/stores';

    let showNavbar = false;
    let userId = "89";

    $: navclass = showNavbar ? 'navbar' : '';
    $: console.log($page.url.pathname, showNavbar);

    function toggleNavbar() {
        showNavbar = !showNavbar;
    }
</script>

<nav class={"p-10 flex flex-row-reverse items-end " + ($page.url.pathname !== '/' ? 'bg-white' : '')}>
    <button on:click={toggleNavbar} class="z-50 relative">
        <Menu style={"font-size: 1.7em; " + ($page.url.pathname === "/" || showNavbar ? "color: white;" : "color: black;")} />
    </button>
</nav>

<div class={`fixed overflow-hidden top-0 right-0 h-screen w-screen bg-[#DF793F] z-40 text-white flex flex-col gap-y-3 px-9 py-28 transition-transform duration-300 ease-in-out ${showNavbar ? 'translate-x-0' : 'translate-x-full'}`}>
    {#if userId === ""}
        <a href="/" on:click={toggleNavbar}>Home</a>
        <a href="/login" on:click={toggleNavbar}>Login</a>
        <a href="/register" on:click={toggleNavbar}>Register</a>
    {:else}
        <a href="/" on:click={toggleNavbar}>Home</a>
        <a href="/app/dashboard" on:click={toggleNavbar}>Dashboard</a>
    {/if}
</div>

<slot />

<style>
    @font-face {
        font-family: "EncodeBold";
        src: url("/fonts/EncodeSansExpanded-Bold.ttf") format("truetype");
    }

    @font-face {
        font-family: "EncodeSB";
        src: url("/fonts/EncodeSansExpanded-SemiBold.ttf") format("truetype");
    }

    @font-face {
        font-family: "EncodeMed";
        src: url("/fonts/EncodeSansExpanded-Medium.ttf") format("truetype");
    }

    .translate-x-full {
        transform: translateX(100%);
    }

    .translate-x-0 {
        transform: translateX(0%);
    }

    .navbar {
        background: #DF793F;
    }

    a {
        font-size: 2em;
        font-family: "EncodeSB", sans-serif;
    }
</style>
