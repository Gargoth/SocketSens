<script>
    import { createEventDispatcher } from 'svelte';

    export let socketNum;
    export let socketPwr;
    export let isSocketOn;

    $: isGreen = isSocketOn ? 'text-green-500' : ''

    const dispatch = createEventDispatcher();

    function toggleSwitch() {
        dispatch('toggle');
    }

</script>


<div class='socketbox rounded-3xl box-border h-40 w-full'>
    <div class='socketnum text-center pt-3.5 text-base'>
        Socket {socketNum}
    </div>
    <div class='socketpwr text-center text-2xl mt-2'>
        <span class={isGreen}>{socketPwr}</span> kWh
    </div>
    <div class='maxcap text-center text-base mt-2'>
        Max Cap: 1 kWh
    </div>
    <div class='togglestate text-center text-base mt-2.5'>
        <div class="z-0 flex w-full flex-col items-center justify-center gap-6">
            <label class="z-0 relative inline-flex cursor-pointer items-center">
              <input bind:checked={isSocketOn} on:change={()=>toggleSwitch()} id="switch" type="checkbox" class="peer sr-only" />
              <label for="switch" class="hidden"></label>
              <div class="z-0 peer h-6 w-11 rounded-full border bg-neutral-400 after:z-0 after:absolute after:left-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-green-500 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-green-300"></div>
            </label>
        </div>
    </div>
</div>


<style>
    @font-face {
        font-family: "InterBold";
        src: url("/fonts/Inter-Bold.ttf") format("truetype");
    }

    @font-face {
        font-family: "InterReg";
        src: url("/fonts/Inter-Regular.ttf") format("truetype");
    }

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

    .socketbox {
        background-color: #EEEEEE;
    }

    .socketnum {
        font-family: "InterBold", sans-serif;
    }
    .socketpwr {
        font-family: "EncodeBold", sans-serif;
    }
    .maxcap {
        font-family: "InterBold", sans-serif;
    }
</style>