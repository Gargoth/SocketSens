<script>
    import PowerSocketJp from 'virtual:icons/mdi/power-socket-jp';
    import { offTimes, onTimes } from "../stores/times";
    export let num;
</script>
  
  <div class="time grid grid-cols-7 py-3 gap-x-2">
    <div class="flex items-center gap-x-2">
        <PowerSocketJp class="text-s text-orange-600"/>{num}
    </div>
    <input bind:value={$offTimes[num-1]} type="time" class="h-10 pl-4 col-span-3 bg-neutral-300 rounded-full " />
    
    <input bind:value={$onTimes[num-1]} type="time" class="h-10 pl-4 col-span-3 bg-orange-400 rounded-full" />
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

    .time {
        font-family: "InterBold", sans-serif;
    }

</style>