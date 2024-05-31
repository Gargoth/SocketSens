<script>
	import PowerSocketJp from 'virtual:icons/mdi/power-socket-jp';
	import { offTimes, onTimes } from '../stores/times';
  export let onChange;
	export let num;
</script>

<div class="time grid grid-cols-7 py-3 gap-x-2 items-center">
	<div class="flex items-center gap-x-2">
		<PowerSocketJp class="text-s text-orange-600" /><h2>{num}</h2>
	</div>
	<input
		bind:value={$offTimes[num - 1]}
    on:change={onChange}
		type="time"
		class="h-10 w-full pl-4 col-span-3 bg-neutral-200 rounded-full justify-self-center"
	/>

	<input
		bind:value={$onTimes[num - 1]}
    on:change={onChange}
		type="time"
		class="h-10 w-full pl-4 col-span-3 bg-orange-500/[.8] rounded-full justify-self-center"
	/>
</div>

<style>
</style>
