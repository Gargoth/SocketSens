<script>
	import Model from '../../components/model.svelte';
	import demo from '../../lib/Socketsens.mp4';
	import dash from '../../lib/dash.png';
	import energy from '../../lib/energy.png';
	import appliances from '../../lib/extension.png';
	import notifs from '../../lib/notifs.png';
</script>

<div class="h-[80vh] mt-4 overflow-hidden">
	<h2 class="text-center text-4xl py-10">SocketSens</h2>
	<div class="mod w-full mb-2 text-center h-1/2">
		<p class="px-16 -mb-8">Explore the smart power strip with this visualization.</p>
		<Model />
	</div>
</div>
<div class="h-[80vh] bg-gray-200">
	<h2 class="ml-8 text-xl py-10">Track your daily energy consumption.</h2>
	<div class="relative h-3/4 w-full flex justify-end">
		<img src={energy} alt="Energy Meter" class="relative h-3/5" />
	</div>
</div>
<div class="relative h-[80vh] overflow-hidden">
	<h2 class="mr-8 ml-10 text-right text-xl pt-10">
		Automatically power on and off your appliances.
	</h2>
	<p class="mr-8 ml-10 text-right text-xs pb-10">(with real-time notifications!)</p>
	<img src={appliances} alt="Appliances" class="appliance relative right-24 w-auto h-64" />
	<div class="relative h-3/4 w-full flex justify-end">
		<img src={notifs} alt="Notifications" class="relative h-full -rotate-12" />
	</div>
</div>
<div class="h-[80vh] bg-gray-200">
	<h2 class="ml-12 mr-12 text-center text-xl py-10">
		Alternatively turn them on or off at a click.
	</h2>
	<img src={dash} alt="Notifications" class="relative m-auto h-2/3" />
</div>
<div class="py-10 bg-gray-200">
	<h2 class="text-center mb-4">Watch the demo below.</h2>
	<div class="jh-full m-auto max-w-screen-md">
		<video controls>
			<source src={demo} type="video/mp4" />
			Your browser does not support the video tag.
		</video>
	</div>
	<div class="flex justify-center py-10">
		<a
			href="/app/dashboard"
			class="w-48 p-2.5 m-auto text-white text-center rounded-full bg-gray-700 hover:opacity-90"
		>
			Go to Dashboard
		</a>
	</div>
</div>

<style>
	@media (min-width: 1280px) {
		.mod {
			height: 80lvh;
		}
	}
</style>
