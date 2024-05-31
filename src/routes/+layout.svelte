<script>
	import '../app.css';
	import Menu from 'virtual:icons/mdi/menu';
	import { page } from '$app/stores';

	import blackLogo from '$lib/logo-black.png';
	import whiteLogo from '$lib/logo-white.png';
	import plug from '$lib/plug.png';

	let showNavbar = false;
	let userId = '89';

	//$: console.log($page.url.pathname, showNavbar);
	$: navclass = showNavbar ? 'navbar' : '';
	$: logoSrc = $page.url.pathname === '/' ? whiteLogo : blackLogo;

	function toggleNavbar() {
		showNavbar = !showNavbar;
	}
</script>

<nav
	class={'pl-6 pr-10 pt-10 flex flex-row-reverse items-center justify-between items-end ' +
		($page.url.pathname !== '/' ? 'bg-white' : '')}
>
	<button on:click={toggleNavbar} class="z-50 relative">
		<Menu
			style={'font-size: 1.7em; ' +
				($page.url.pathname === '/' || showNavbar ? 'color: white;' : 'color: black;')}
		/>
	</button>
	<div class="absolute z-10 left-5 flex items-center">
		{#if $page.url.pathname === '/'}
			<img src={logoSrc} alt="logo" width="50px" />
		{/if}
		{#if $page.url.pathname === '/'}
			<div class="title ml-1.5">SocketSens</div>
		{/if}
	</div>
	{#if $page.url.pathname !== '/'}
		<div></div>
	{/if}
</nav>

<div
	class={`fixed overflow-hidden top-0 right-0 overflow-hidden h-screen w-screen bg-[#DF793F] z-40 text-white flex flex-col gap-y-3 px-9 py-28 transition-transform duration-300 ease-in-out ${showNavbar ? 'translate-x-0' : 'translate-x-full'}`}
>
	{#if userId === ''}
		<a href="/" on:click={toggleNavbar}>Home</a>
		<a href="/login" on:click={toggleNavbar}>Login</a>
		<a href="/register" on:click={toggleNavbar}>Register</a>
	{:else}
		<a href="/" on:click={toggleNavbar}>Home</a>
		<a href="/app/dashboard" on:click={toggleNavbar}>Dashboard</a>
	{/if}
</div>

{#if $page.url.pathname === '/'}
	<div class="fixed bottom-1/2 left-1/2 transform -translate-x-1/2 translate-y-14">
		<div
			class="circle bg-gradient-to-r from-orange-500/[.8] to-orange-700/[.8] rounded-b-full overflow-hidden flex items-end justify-center"
		>
			<img src={plug} alt="Plug" class="relative w-screen top-1/4 mb-36" />
		</div>
	</div>
{/if}

<div class="relative z-10">
	<slot />
</div>

<style>
	.circle {
		width: 180vw;
		height: 200vw;
	}
	@media (max-height: 700px) {
		.circle img {
			width: 45%;
		}
	}
	@media (min-width: 640px) {
		.circle {
			border-radius: 1rem;
		}
		.circle img {
			width: 45%;
			margin-bottom: 3in;
		}
	}
	@media (min-width: 1280px) {
		.circle img {
			width: 18%;
			margin-bottom: 6in;
		}
	}
	.title {
		font-family: 'EncodeBold', sans-serif;
		font-size: 1.4em;
		color: white;
	}

	.translate-x-full {
		transform: translateX(100%);
	}

	.translate-x-0 {
		transform: translateX(0%);
	}

	.navbar {
		background: #df793f;
	}

	a {
		font-size: 2em;
		font-family: 'EncodeSB', sans-serif;
	}
</style>
