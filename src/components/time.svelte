<script>
    export let num;
    let timeInput;
  
    function logTime() {
      console.log(`${label} - ${timeInput.value}`);
    }
  </script>
  
  <div class="grid grid-cols-3 p-4">
    <p>Socket {num}</p>
    <input type="time" class="pl-4" bind:this={timeInput} on:change={logTime} />
    <input type="time" class="pl-4" bind:this={timeInput} on:change={logTime} />
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