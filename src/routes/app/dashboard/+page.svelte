<script>
	import Socket from '../../../components/socket.svelte';
	import { getLatestElecRow, insertNewElecRow } from '$lib/supabase';
	import { clientState } from '../../../stores/clientState';
	import { toggles, isWaiting } from '../../../stores/toggleStates';
	import { softlimitThreshold } from '../../../stores/thresholdStore';
	import { totalConsumption } from '../../../stores/totalConsumptionStore';

  // WARN: Not working as intended
	function waitForToggleSync(index, delay) {
		if ($clientState.relayPins[index] == $toggles[index]) {
			$isWaiting[index] = !$isWaiting[index];
			console.log($clientState);
		} else {
			setTimeout(waitForToggleSync, delay, index, delay);
			console.log(`Toggle #${index} not synced, wait for ${delay}ms`);
		}
	}

	function changeWaitingStates(index) {
    // NOTE: Stop waiting since `waitForToggleSync` not working
		// $isWaiting[index] = !$isWaiting[index];
		$toggles[index] = !$toggles[index];
		// Update latest clientState to reflect the new states
		const newData = {
			userid: 0,
			time: new Date().toISOString(),
			energy: $clientState.energy,
			power: $clientState.power,
			current: $clientState.current,
			relay_state_1: !$toggles[0],
			relay_state_2: !$toggles[1],
			relay_state_3: !$toggles[2],
			relay_state_4: !$toggles[3]
		};
		insertNewElecRow(newData);
    // NOTE: Stop waiting since `waitForToggleSync` not working
		// waitForToggleSync(index, 500);
	}

	async function updateCurrentState() {
		const data = await getLatestElecRow();
		clientState.set({
			relayPins: [
				data.data[0].relay_state_1,
				data.data[0].relay_state_2,
				data.data[0].relay_state_3,
				data.data[0].relay_state_4
			],
			current: data.data[0].current,
			power: data.data[0].power,
			energy: data.data[0].energy
		});

		// Sync toggle states on page load
		for (let i = 0; i < 4; i++) {
			$toggles[i] = !$clientState.relayPins[i];
		}
	}

	updateCurrentState();
</script>

<div class="power">
	<h3 class="mysocket pl-6 text-2xl mx-1 pb-4">Dashboard</h3>
	<div
		class="bg-gradient-to-r from-orange-500/[.8] to-orange-700/[.8] rounded-2xl h-24 mx-4 p-3 px-4"
	>
		<span class="bg-white rounded-full px-2 py-1 text-orange-600 text-xs"
			>Total Energy Consumption</span
		>
		<p class="text-3xl text-white mt-2">{$clientState.energy} kWh</p>
	</div>
</div>

<div class="mt-6">
	<h3 class="mysocket pl-6 text-2xl mx-1">Energy Limit</h3>
	<div class="mx-14 mt-6">
		<select
			bind:value={$softlimitThreshold}
			name="threshold"
			class="block appearance-none w-full text-center text-xl bg-gray-200 border border-gray-200 text-black py-3 px-4 pr-8 rounded-xl leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
		>
			<option value={0.008}>0.008 kWh</option>
			<option value={0.5}>0.5 kWh</option>
			<option value={1}>1 kWh</option>
		</select>
	</div>
</div>

<div class="mt-6">
	<h3 class="mysocket pl-6 text-2xl mx-1">My Sockets</h3>
	<div class="thingy grid grid-cols-2 gap-4 p-4 pt-6">
		<Socket
			socketNum={1}
			socketName={'Electric Fan'}
			socketPwr={0.15}
			isSocketOn={$toggles[0]}
			on:toggle={() => changeWaitingStates(0)}
			isSocketWaiting={$isWaiting[0]}
		/>
		<Socket
			socketNum={2}
			socketName={'Lamp'}
			socketPwr={0.35}
			isSocketOn={$toggles[1]}
			on:toggle={() => changeWaitingStates(1)}
			isSocketWaiting={$isWaiting[1]}
		/>
		<Socket
			socketNum={3}
			socketName={'Charger'}
			socketPwr={0.1}
			isSocketOn={$toggles[2]}
			on:toggle={() => changeWaitingStates(2)}
			isSocketWaiting={$isWaiting[2]}
		/>
		<Socket
			socketNum={4}
			socketName={'Hairdryer'}
			socketPwr={0.5}
			isSocketOn={$toggles[3]}
			on:toggle={() => changeWaitingStates(3)}
			isSocketWaiting={$isWaiting[3]}
		/>
	</div>
</div>

<style>
	@font-face {
		font-family: 'InterBold';
		src: url('/fonts/Inter-Bold.ttf') format('truetype');
	}

	@font-face {
		font-family: 'InterReg';
		src: url('/fonts/Inter-Regular.ttf') format('truetype');
	}

	@font-face {
		font-family: 'EncodeBold';
		src: url('/fonts/EncodeSansExpanded-Bold.ttf') format('truetype');
	}

	@font-face {
		font-family: 'EncodeSB';
		src: url('/fonts/EncodeSansExpanded-SemiBold.ttf') format('truetype');
	}

	@font-face {
		font-family: 'EncodeSB';
		src: url('/fonts/EncodeSansExpanded-SemiBold.ttf') format('truetype');
	}

	@font-face {
		font-family: 'EncodeMed';
		src: url('/fonts/EncodeSansExpanded-Medium.ttf') format('truetype');
	}

	option,
	select {
		font-family: 'EncodeBold', sans-serif;
	}

	h3 {
		font-family: 'EncodeBold', sans-serif;
	}

	.power {
		font-family: 'InterBold', sans-serif;
	}
</style>
