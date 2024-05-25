<script>
	import Socket from "../../../components/socket.svelte";
  import { toggles } from "../../../stores/toggleStates";

  function changeStates(index) {
    $toggles[index] = !$toggles[index]
  }

</script>

<div class='block'>
  <h3 class="mysocket pl-6 text-2xl mx-1">
    My Sockets
  </h3>

  <div class="thingy grid grid-cols-2 gap-4 p-4 pt-8">
    <Socket socketNum={1} socketPwr={0.15} isSocketOn={$toggles[0]} on:toggle={()=>changeStates(0)}/>
    <Socket socketNum={2} socketPwr={0.35} isSocketOn={$toggles[1]} on:toggle={()=>changeStates(1)}/>
    <Socket socketNum={3} socketPwr={0.1} isSocketOn={$toggles[2]} on:toggle={()=>changeStates(2)}/>
    <Socket socketNum={4} socketPwr={0.5} isSocketOn={$toggles[3]} on:toggle={()=>changeStates(3)}/>
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

    h3 {
        font-family: "EncodeBold", sans-serif;
    }
  </style>