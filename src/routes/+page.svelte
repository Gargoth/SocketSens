<script>
	import { testNotifications } from "$lib/notifications";
</script>

<div class='text flex flex-col justify-center items-center text-center px-6'>
    <h1 class="fixed text-3xl top-1/2 mt-20 px-4">
        Your Smart Home Solution for Effortless Energy Management
    </h1>

    <!-- <div class="sub mt-6 mx-4 text-base">
        <span class="name">SocketSens</span> offers unparalleled convenience by streamlining your household's electricity usage and ensuring the safety of your appliances at the same time.
    </div> -->
</div>

<div class='fixed bottom-0 w-full mb-2 text-center p-6'>
    <button on:click={testNotifications} class="w-64 p-2 text-white rounded-full bg-orange-500">
        Get Started
    </button>
</div>

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
    h1 {
        font-family: "EncodeBold", sans-serif;
    }
    
    button {
        font-family: "EncodeBold", sans-serif;
    }

    :global(body) {
        min-height: 100vh;
    }

    .name {
        font-family: "EncodeBold", sans-serif;
    }

    .sub {
        font-family: "EncodeMed", sans-serif;
    }
</style>