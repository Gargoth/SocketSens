<script>
	import Model from '../../components/model.svelte';
	import sched from '../../lib/schedules.png';
    import notifs from '../../lib/notifs.png';
    import appliances from '../../lib/extension.png';
	import dash from '../../lib/dash.png';
	import energy from '../../lib/energy.png';
    import demo from '../../lib/Socketsens.mp4';
</script>

<div class="main h-[80vh] mt-4 overflow-hidden">
	<h1 class="text-center text-5xl py-10">SocketSens</h1>
	<div class="mod w-full mb-2 text-center h-1/2">
		<p class="px-16 -mb-8">Explore the smart power strip with this three-dimensional visualization.</p>
		<Model />
	</div>
</div>

<div class="main h-[80vh] bg-gray-200 w-screen overflow-hidden">
	<h2 class="daily text-center text-xl py-10 px-16 mt-16">Track your daily energy consumption.</h2>
	<div class="chart relative m-auto px-4">
		<img src={energy} alt="Energy Meter" class="relative h-3/5 w-screen" />
    </div>
</div>

<div class="main relative h-[80vh] overflow-hidden">
	<h2 class="mr-8 ml-10 text-right text-xl pt-10">
		Automatically power on and off your appliances.
	</h2>
	<p class="mr-8 ml-10 text-right text-xs pb-10">
		(with real-time notifications)
	</p>
	<div class="flex h-screen">
	<img src={appliances} alt="Appliances" class="app1 h-64 -ml-36" />
        <img src={notifs} alt="Notifications" class="app2 ml-auto mr-12 mt-auto mb-24 h-2/3 -rotate-12" />
    </div>
</div>

<div class="main h-[80vh] bg-gray-200 overflow-hidden">
	<h2 class="ml-12 mr-12 text-center text-xl py-10">
		Alternatively turn them on or off at a click.
	</h2>
	<img src={dash} alt="Notifications" class="relative m-auto h-full" />
</div>

<div class="py-10 bg-gray-200">
    <h2 class="text-center mb-4">
        Watch the demo below.
    </h2>
    <div class="jh-full m-auto max-w-screen-md">
        <video controls>
            <source src={demo} type="video/mp4">
            Your browser does not support the video tag.
        </video>
    </div>
    <div class="flex justify-center py-10">
	<a href="/app/dashboard" class="w-48 p-2.5 m-auto text-white text-center rounded-full bg-gray-700 hover:opacity-90">
		Go to Dashboard
	</div>
</div>

<style>
	@media (min-width: 1280px) {
		h2 {
			font-size: x-large;
		}
		.mod {
			height: 80lvh;
		}
		.chart {
			width: 50%;
		}
		.app1 {
		height: 66%; /* Equivalent to h-3/4 */
		margin-left: -12rem; /* Equivalent to -ml-36 */
		margin-top: -5rem; /* Equivalent to -mt-20 */
		}

		.app2 {
		margin-left: auto; /* Equivalent to ml-auto */
		margin-right: 3rem; /* Equivalent to mr-12 */
		margin-top: 3rem; /* Equivalent to mt-12 */
		height: 100%; /* Equivalent to h-full */
		transform: rotate(-12deg); /* Equivalent to -rotate-12 */
		}
		.daily {
			margin-top: 12px;
		}

	}
</style>
