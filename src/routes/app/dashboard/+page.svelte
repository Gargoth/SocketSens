<script>
	import Socket from "../../../components/socket.svelte";
	import { clientState } from "../../../stores/clientState";
  import { toggles, isWaiting } from "../../../stores/toggleStates";
  import { until } from "$lib/utils";

  function changeStates(index) {
    $toggles[index] = !$toggles[index]
  }

  async function changeWaitingStates(index) {
    $isWaiting[index] = !$isWaiting[index];
    changeStates(index);

    await until(_ => !$clientState.relayPins[index] == $toggles[index])

    $isWaiting[index] = !$isWaiting[index];
  }

  // Sync toggle states on page load
  for (let i=0; i < 4; i++) {
    $toggles[i] = !$clientState.relayPins[i];
  }
</script>

<div class='power'>
  <h3 class="mysocket pl-6 text-2xl mx-1 pb-4">
    Dashboard
  </h3>
  <div class="bg-gradient-to-r from-orange-500/[.8] to-orange-700/[.8] rounded-2xl h-24 mx-4 p-3 px-4">
    <span class="bg-white rounded-full px-2 py-1 text-orange-600 text-xs">Daily Power Usage</span>
    <p class="text-3xl text-white mt-2">10.33 kWh</p>
  </div>
</div>

<div class="mt-6">
  <h3 class="mysocket pl-6 text-2xl mx-1">
    My Sockets
  </h3>
  <div class="thingy grid grid-cols-2 gap-4 p-4 pt-6">
    <Socket socketNum={1} socketPwr={0.15} isSocketOn={$toggles[0]} on:toggle={()=>changeWaitingStates(0)} isSocketWaiting={$isWaiting[0]}/>
    <Socket socketNum={2} socketPwr={0.35} isSocketOn={$toggles[1]} on:toggle={()=>changeWaitingStates(1)} isSocketWaiting={$isWaiting[1]}/>
    <Socket socketNum={3} socketPwr={0.1} isSocketOn={$toggles[2]} on:toggle={()=>changeWaitingStates(2)} isSocketWaiting={$isWaiting[2]}/>
    <Socket socketNum={4} socketPwr={0.5} isSocketOn={$toggles[3]} on:toggle={()=>changeWaitingStates(3)} isSocketWaiting={$isWaiting[3]}/>
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

    .power {
        font-family: "InterBold", sans-serif;
    }
  </style>
