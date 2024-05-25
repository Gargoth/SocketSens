<script>
    import { notificationHistory } from "../../../stores/notificationStore";
    import Exclamation from 'virtual:icons/mdi/exclamation'
    import LightningBolt from 'virtual:icons/mdi/lightning-bolt'
</script>

<div class='block'>
    <h3 class="mysocket pl-6 text-2xl mx-1">
      Notifications
    </h3>
    
    <div class="notifcol flex flex-col-reverse pl-4 pt-6 pr-4">
        {#each $notificationHistory as notif}
            <div class="notifs flex items-center">
                <div class={"iconbox rounded-full p-1 ml-4 mb-16 " + (notif.type === "softlimit" ? "bg-[#F06346]" : "bg-[#F04646]")}>
                    {#if notif.type === "softlimit"}
                        <LightningBolt class="text-2xl" style="color: white"/>
                    {:else}
                        <Exclamation class="text-2xl" style="color: white"/>
                    {/if}
                </div>
                <div class="flex flex-col ml-2 p-1 pl-4 pr-12">
                    <div class="date text-sm">{notif.date} at {notif.time}</div>
                    <div class="message text-base leading-tight pt-1 pr-4">Socket {notif.socket} {notif.message}</div>
                    <hr class="h-px mt-4 mb-2 bg-neutral-400 border-0" />
                </div>
            </div>
        {/each}
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

    .notifcol {
        background-color: white;
    }

    .notifs {
        background-color: white;
    }

    .date {
        font-family: "InterBold", sans-serif;
    }

    .message {
        font-family: "InterReg", sans-serif;
    }
  </style>