<script>
	import Socket from "../../../components/socket.svelte";
  import { toggles, isWaiting } from "../../../stores/toggleStates";

  function changeStates(index) {
    $toggles[index] = !$toggles[index]
  }

  function changeWaitingStates(index) {
    $isWaiting[index] = !$isWaiting[index]
    // currently used setTimeout to simulate waiting for the socket to turn on/off (modify na lang once backend stuff is ok na)
    setTimeout(() => {
      changeStates(index)
      $isWaiting[index] = !$isWaiting[index]
    }, 2000)
  }
</script>

<div class='block'>
  <h3 class="mysocket pl-6 text-2xl mx-1">
    My Sockets
  </h3>

  <div class="thingy grid grid-cols-2 gap-4 p-4 pt-8">
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
  </style>