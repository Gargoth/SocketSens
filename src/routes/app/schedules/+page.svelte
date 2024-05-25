<script>
    import Time from '../../../components/time.svelte';
  </script>
  
  <div>
    <h3 class="pl-4 text-2xl mx-1">
      Schedules
    </h3>
    <div class="grid grid-cols-3 gap-4 p-4">
      <p></p>
      <p>TURN OFF</p>
      <p>TURN ON</p>
    </div>
    <Time num="1" />
    <Time num="2" />
    <Time num="3" />
    <Time num="4" />
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