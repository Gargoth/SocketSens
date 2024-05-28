<script>
	import PowerSocketJp from 'virtual:icons/mdi/power-socket-jp';
	import { offTimes, onTimes } from '../stores/times';
	export let num;
</script>

<div class="time grid grid-cols-7 py-3 gap-x-2 items-center">
	<div class="flex items-center gap-x-2">
		<PowerSocketJp class="text-s text-orange-600" />{num}
	</div>
	<input
		bind:value={$offTimes[num - 1]}
		type="time"
		class="h-10 w-full pl-4 col-span-3 bg-neutral-200 rounded-full justify-self-center"
	/>

	<input
		bind:value={$onTimes[num - 1]}
		type="time"
		class="h-10 w-full pl-4 col-span-3 bg-orange-500/[.8] rounded-full justify-self-center"
	/>
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

	.time {
		font-family: 'InterBold', sans-serif;
	}
</style>
