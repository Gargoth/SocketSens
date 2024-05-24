<script>
    import "../app.css";
    import Menu from 'virtual:icons/mdi/menu'

    let showNavbar = true;
    let userId = "89";

    $: navclass = showNavbar ? 'navbar' : '' 

    function toggleNavbar() {
        showNavbar = !showNavbar;
    }
</script>

<nav class={navclass + " p-10 flex flex-row-reverse items-end"}>
    <button on:click={() => toggleNavbar()}>
        <Menu style="font-size: 1.7em; color: white" />
    </button>
</nav>
{#if showNavbar === true}
    <div class="navbar text-white fixed flex flex-col gap-y-3 px-9 h-screen w-screen">
        {#if userId === ""}
            <a href="/">Home</a>
            <a href="/login">Login</a>
            <a href="/register">Register</a>
        {:else}
            <a href="/" on:click={() => toggleNavbar()}>Home</a>
            <a href="/dashboard" on:click={() => toggleNavbar()}>Dashboard</a>
            <a href="/notification" on:click={() => toggleNavbar()}>Notifications</a>
        {/if}        
    </div>
{/if}

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

    .navbar {
        background: #DF793F;
    }

    a {
        font-size: 2em;
        font-family: "EncodeSB", sans-serif;
    }
</style>