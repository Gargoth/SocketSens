<script>
	import Time from '../../../components/time.svelte';
	import Shutdown from 'virtual:icons/mdi/shutdown';
	import { getTimeStringDates, offTimes, onTimes } from '../../../stores/times';
	import { upsertSchedule, getLatestSchedule } from '$lib/supabase';
	import supabase from '$lib/supabase';

	function onScheduleChange() {
		upsertSchedule(0, $onTimes, $offTimes);
	}

	async function updateCurrentSchedules() {
		const { data, error } = await getLatestSchedule(0);
		console.log('Latest schedule retrieved');
		$onTimes = [data[0].time_on_1, data[0].time_on_2, data[0].time_on_3, data[0].time_on_4];
		$offTimes = [data[0].time_off_1, data[0].time_off_2, data[0].time_off_3, data[0].time_off_4];
	}

	const sched_updates = supabase
		.channel('sched-updates')
		.on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'sched' }, (payload) => {
			console.log('New scheduels received!');
			updateCurrentSchedules();
		})
		.subscribe();

	updateCurrentSchedules();
</script>

<div class="mx-6">
	<h3 class="text-2xl">Schedules</h3>
	<div class="grid grid-cols-7 p-3 gap-x-2 -mb-2">
		<p></p>
		<div class="col-span-3 flex flex-col items-center justify-center">
			<Shutdown class="text-4xl pt-1.5" />
			<p class="text-xs">OFF</p>
		</div>
		<div class="col-span-3 flex flex-col items-center justify-center text-orange-600">
			<Shutdown class="text-4xl pt-1.5" />
			<p class="text-xs">ON</p>
		</div>
	</div>
	<Time num="1" onChange={onScheduleChange} />
	<Time num="2" onChange={onScheduleChange} />
	<Time num="3" onChange={onScheduleChange} />
	<Time num="4" onChange={onScheduleChange} />
</div>

<style>
</style>
