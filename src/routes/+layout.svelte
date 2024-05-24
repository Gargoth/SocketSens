<script>
    import "../app.css";
    import Menu from 'virtual:icons/mdi/menu'
    import { getStores, navigating, page, updated } from '$app/stores';

    let showNavbar = false;
    let userId = "89";

    $: navclass = showNavbar ? 'navbar' : ''
    $: console.log($page.url.pathname, showNavbar) 

    function toggleNavbar() {
        showNavbar = !showNavbar;
    }

</script>

<nav class={navclass + " p-10 flex flex-row-reverse items-end " + ($page.url.pathname === "/" ? "" : "bg-white")}>
    <button on:click={() => toggleNavbar()}>
        <Menu style={"font-size: 1.7em; " + ($page.url.pathname === "/" || showNavbar ? "color: white;" : "color: black;")} />
    </button>
</nav>
{#if showNavbar === true}
    <div class="navbar z-100 text-white fixed flex flex-col gap-y-3 px-9 h-screen w-screen">
        {#if userId === ""}
            <a href="/">Home</a>
            <a href="/login">Login</a>
            <a href="/register">Register</a>
        {:else}
            <a href="/" on:click={() => {toggleNavbar()}}>Home</a>
            <a href="/app/dashboard" on:click={() => {toggleNavbar()}}>Dashboard</a>
        {/if}        
    </div>
{:else}
    <slot />
{/if}


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

    .navbar {
        background: #DF793F;
    }

    a {
        font-size: 2em;
        font-family: "EncodeSB", sans-serif;
    }
</style>