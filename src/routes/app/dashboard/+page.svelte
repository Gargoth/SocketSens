<script lang="ts">
	import Socket from '../../../components/socket.svelte';
	import { getLatestElecRow, insertNewElecRow, updateUserThreshold, getUser } from '$lib/supabase';
	import { clientState } from '../../../stores/clientState';
	import { toggles, isWaiting } from '../../../stores/toggleStates';
	import { softlimitThreshold } from '../../../stores/thresholdStore';
	import { totalConsumption } from '../../../stores/totalConsumptionStore';
	import supabase from '$lib/supabase/SBClient';
	import Energygraph from '../../../components/energygraph.svelte';

	function changeWaitingStates(index: number) {
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
	}

	async function updateCurrentState() {
		const data = await getLatestElecRow();
		if (data.error) {
			console.error(data.error);
		} else {
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

		// Sync threshold
		const userData = await getUser(0);
		$softlimitThreshold = userData.data[0].threshold;
		console.log('New data synced');
	}

	async function changeSoftLimitThreshold() {
		updateUserThreshold(0, $softlimitThreshold);
	}

	// Subscribe to elec changes

	const elec = supabase
		.channel('elec-readings')
		.on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'elec' }, (payload) => {
			console.log('New reading received');
			updateCurrentState();
		})
		.subscribe();

	updateCurrentState();
</script>

<h3 class="mysocket pl-6 text-2xl pb-4">Dashboard</h3>

<div class="bg-gradient-to-r from-orange-500/[.8] to-orange-700/[.8] rounded-2xl mx-5 p-3 px-4">
	<div class="flex">
		<span class="bg-white rounded-full px-2 mb-auto py-1 text-orange-600 text-xs"
			>Daily Energy Consumption</span
		>
		<h2 class="text-xl text-white ml-auto">{$totalConsumption.toFixed(3)} kWh</h2>
	</div>

	<Energygraph />
</div>

<div class="mx-6 my-4 flex gap-4">
	<div class="w-full">
		<h2 class="tile text-xs mb-1">Energy Limit</h2>
		<select
			bind:value={$softlimitThreshold}
			on:change={changeSoftLimitThreshold}
			name="threshold"
			class="w-full appearance-none text-center text-lg bg-gray-200 border border-gray-200 py-3 px-4 pr-8 rounded-xl leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
		>
			<option value={0.001}>0.001 kWh</option>
			<option value={0.002}>0.002 kWh</option>
			<option value={0.005}>0.005 kWh</option>
			<option value={0.008}>0.008 kWh</option>
			<option value={0.01}>0.01 kWh</option>
			<option value={20}>20 kWh</option>
		</select>
	</div>

	<div class="w-full">
		<h2 class="tile text-xs mb-1">Latest Power Reading</h2>
		<div
			class="block text-center text-lg bg-gray-200 border py-3 px-4 pr-8 rounded-xl leading-tight focus:border-gray-500"
		>
			{$clientState.power} W
		</div>
	</div>
</div>

<div class="mt-8">
	<h3 class="mysocket pl-6 text-2xl">My Sockets</h3>
	<div class="thingy grid grid-cols-2 gap-4 p-4 mx-1">
		<Socket
			socketNum={1}
			isSocketOn={$toggles[0]}
			on:toggle={() => changeWaitingStates(0)}
			isSocketWaiting={$isWaiting[0]}
		/>
		<Socket
			socketNum={2}
			isSocketOn={$toggles[1]}
			on:toggle={() => changeWaitingStates(1)}
			isSocketWaiting={$isWaiting[1]}
		/>
		<Socket
			socketNum={3}
			isSocketOn={$toggles[2]}
			on:toggle={() => changeWaitingStates(2)}
			isSocketWaiting={$isWaiting[2]}
		/>
		<Socket
			socketNum={4}
			isSocketOn={$toggles[3]}
			on:toggle={() => changeWaitingStates(3)}
			isSocketWaiting={$isWaiting[3]}
		/>
	</div>
</div>

<style>
	@media (min-width: 380px) {
		.tile {
			font-size: 15px;
		}
	}
	@media (min-width: 1280px) {
		.thingy {
			grid-template-columns: auto auto auto auto;
		}
	}
</style>
