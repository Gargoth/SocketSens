<script>
	import Model from '../../components/model.svelte';
	import sched from '../../lib/schedules.png';
    import demo from '../../lib/Socketsens.mp4'
</script>

<div class="h-[80vh] mt-4">
	<h2 class="text-center text-4xl py-10">SocketSens</h2>
	<div class="w-full mb-2 text-center px-16">
		Explore the smart power strip with this visualization.
		<Model />
	</div>
</div>
<div class="h-[80vh] bg-gray-200">
	<h2 class="ml-8 text-xl py-10">Track your daily energy consumption.</h2>
</div>
<div class="relative h-[80vh] overflow-hidden">
	<h2 class="mr-8 ml-10 text-right text-xl py-10">
		Automatically power on and off your appliances.
	</h2>
	<img src={sched} alt="Schedules" class="relative m-auto h-full" />
</div>
<div class="h-[80vh] bg-gray-200">
	<h2 class="ml-12 mr-12 text-center text-xl py-10">
		Alternatively turn them on or off at a click.
	</h2>
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
	<a href="/app/dashboard" class="w-48 p-2.5 m-auto text-white text-center rounded-full bg-orange-500 hover:opacity-90">
		Go to Dashboard
	</div>
</div>

<style>
	.close {
		color: #aaa;
		float: right;
		font-size: 28px;
		font-weight: bold;
	}

	.close:hover,
	.close:focus {
		color: black;
		text-decoration: none;
		cursor: pointer;
	}
</style>
