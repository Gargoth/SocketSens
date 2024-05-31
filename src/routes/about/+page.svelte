<script>
    import video from '../../lib/sample-vid.mp4';
    import sched from '../../lib/schedules.png';

    let showModal = false;

    function toggleModal() {
        showModal = !showModal;
    }
</script>
<div class="h-[80vh] mt-4">  
    <h2 class="text-center text-4xl py-10">
        SocketSens
    </h2>
    <p class="text-center -mt-6">
        Some stuff here.
    </p>
    <div class="w-full mb-2 text-center p-6">
        <button class="px-5 p-2 rounded-full border-2 border-orange-500 text-orange-500 text-sm" on:click={toggleModal}>
            Watch Demo
        </button>
    </div>
</div>
<div class="h-[80vh] bg-gray-200">  
    <h2 class="ml-8 text-xl py-10">
        Track your daily energy consumption.
    </h2>
</div>
<div class="relative h-[80vh] overflow-hidden">
    <h2 class="mr-8 ml-10 text-right text-xl py-10">
        Automatically power on and off your appliances.
    </h2>
    <img src={sched} alt="Schedules" class="absolute top-32 bottom-0 h-full">
</div>
<div class="h-[80vh] bg-gray-200">  
    <h2 class="ml-12 mr-12 text-center text-xl py-10">
        Alternatively turn them on or off at a click.
    </h2>
</div>

{#if showModal}
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" on:click={toggleModal}>
        <div class="p-4 rounded-lg shadow-lg max-w-lg w-full" on:click|stopPropagation>
            <span class="float-right text-gray-500 text-2xl" on:click={toggleModal}>&times;</span>
            <video controls class="w-full mt-4">
                <source src={video} type="video/mp4">
                Your browser does not support the video tag.
            </video>
        </div>
    </div>
{/if}


<style>
    .close {
        color: #aaa;
        float: right;
        font-size: 28px;
        font-weight: bold;
    }

    .close:hover,
    .close:focus {
        color: black;
        text-decoration: none;
        cursor: pointer;
    }
</style>
