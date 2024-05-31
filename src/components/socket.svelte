<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import socket from '$lib/socket.png';

	export let socketNum;
	export let socketPwr;
	export let isSocketOn: boolean;
	export let isSocketWaiting;

	$: isGreen = isSocketOn ? 'text-green-500' : '';

	const dispatch = createEventDispatcher();

	function toggleSwitch() {
		dispatch('toggle');
	}
</script>

<div class="socketbox rounded-3xl box-border  overflow-hidden">
	<div class="socketnum flex pt-3.5 text-base mx-4">
		<h2 class={isGreen}>Socket {socketNum}</h2>
		<div class="togglestate ml-auto text-center text-base">
			{#if isSocketWaiting == true}
				<div class="animate-pulse">Waiting...</div>
			{:else}
				<div class="z-0 flex w-full flex-col items-center justify-center gap-6	">
					<label class="z-0 relative inline-flex cursor-pointer items-center">
						<input
							bind:checked={isSocketOn}
							on:click={() => toggleSwitch()}
							id="switch"
							type="checkbox"
							class="peer sr-only"
						/>
						<label for="switch" class="hidden"></label>
						<div
							class="z-0 peer h-6 w-11 rounded-full border bg-neutral-400 after:z-0 after:absolute after:left-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-green-500 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-green-300"
						></div>
					</label>
				</div>
			{/if}
		</div>
	</div>	
	<!-- <div class='socketpwr text-center text-2xl mt-2'>
        <span class={isGreen}>{socketPwr}</span> kWh
    </div> -->
	<div class="sck h-20">
		<img src={socket} alt="Schedules" class="relative top-2 m-auto h-24">
	</div>
	<!-- <div class='maxcap text-center text-base mt-2'>
        {socketName}
    </div> -->

</div>

<style>
	.socketbox {
		background-color: #eeeeee;
	}

	.socketpwr {
		font-family: 'InterBold', sans-serif;
	}
	.maxcap {
		font-family: 'InterBold', sans-serif;
	}

	@media (min-width: 1280px) {
		.sck img {
			width: 30%;
			height: auto;
		}
		.sck {
			height: 96px;
		}
	}
</style>
