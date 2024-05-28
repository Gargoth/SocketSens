<script>
	import Time from '../../../components/time.svelte';
	import Shutdown from 'virtual:icons/mdi/shutdown';
	import { offTimes, onTimes } from '../../../stores/times';
	import { upsertSchedule, getLatestSchedule } from '$lib/supabase';

	function onScheduleChange() {
		upsertSchedule(0, $onTimes, $offTimes);
	}

	async function updateCurrentSchedules() {
		const { data, error } = await getLatestSchedule(0);
    console.log("Latest schedule retrieved");
    $onTimes = [
      data[0].time_on_1,
      data[0].time_on_2,
      data[0].time_on_3,
      data[0].time_on_4,
    ];
    $offTimes = [
      data[0].time_off_1,
      data[0].time_off_2,
      data[0].time_off_3,
      data[0].time_off_4,
    ];
  }

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
		font-family: 'EncodeMed';
		src: url('/fonts/EncodeSansExpanded-Medium.ttf') format('truetype');
	}

	h3 {
		font-family: 'EncodeBold', sans-serif;
	}
</style>
