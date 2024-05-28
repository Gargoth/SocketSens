<script>
	import Time from '../../../components/time.svelte';
	import Shutdown from 'virtual:icons/mdi/shutdown';
  
  // TODO: Update schedules based on latest from database
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
	<Time num="1" />
	<Time num="2" />
	<Time num="3" />
	<Time num="4" />
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
