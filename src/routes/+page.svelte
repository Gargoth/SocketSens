<script>
	import { testNotifications } from "$lib/notifications";
</script>

<div class='main mt-20 text-center text-white px-4'>
    <h1 class="text-4xl">
        Your Smart Home Solution for Energy Management
    </h1>

    <div class="sub mt-6 mx-4 text-base">
        <span class="name">SocketSens</span> offers unparalleled convenience by streamlining your household's electricity usage and ensuring the safety of your appliances at the same time.
    </div>

    <button on:click={testNotifications} class="text-base">
        Learn More
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
        margin-top: 2em;
        font-family: "EncodeBold", sans-serif;
    }

    :global(body) {
        min-height: 100vh;
        background: rgb(223,121,63);
        background: linear-gradient(rgba(223,121,63,1) 0%, rgba(178,83,30,1) 100%);
    }

    .name {
        font-family: "EncodeBold", sans-serif;
    }

    .sub {
        font-family: "EncodeMed", sans-serif;
    }   
</style>
