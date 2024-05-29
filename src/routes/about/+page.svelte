<script>
    import video from '../../lib/sample-vid.mp4';

    let showModal = false;

    function openModal() {
        showModal = true;
    }

    function closeModal() {
        showModal = false;
    }
</script>

<div class="w-full mb-2 text-center p-6">
    <button class="w-64 p-2 text-white rounded-full bg-orange-500" on:click={openModal}>
        Watch Demo
    </button>
</div>

{#if showModal}
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" on:click={closeModal}>
        <div class="p-4 rounded-lg shadow-lg max-w-lg w-full" on:click|stopPropagation>
            <span class="float-right text-gray-500 text-2xl" on:click={closeModal}>&times;</span>
            <video controls class="w-full mt-4">
                <source src={video} type="video/mp4">
                Your browser does not support the video tag.
            </video>
        </div>
    </div>
{/if}


<style>
    @font-face {
        font-family: 'EncodeBold';
        src: url('/fonts/EncodeSansExpanded-Bold.ttf') format('truetype');
    }

    @font-face {
        font-family: 'EncodeSB';
        src: url('/fonts/EncodeSansExpanded-SemiBold.ttf') format('truetype');
    }

    @font-face {
        font-family: 'EncodeMed';
        src: url('/fonts/EncodeSansExpanded-Medium.ttf') format('truetype');
    }

    h1 {
        font-family: 'EncodeBold', sans-serif;
    }

    button {
        font-family: 'EncodeBold', sans-serif;
    }

    .name {
        font-family: 'EncodeBold', sans-serif;
    }

    .sub {
        font-family: 'EncodeMed', sans-serif;
    }
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

    :global(body) {
        min-height: 100vh;
    }
</style>
