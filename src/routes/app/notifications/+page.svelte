<script>
	import supabase, { getNotifs } from '$lib/supabase';
	import { onMount } from 'svelte';
	// @ts-ignore
	import Exclamation from 'virtual:icons/mdi/exclamation';
	// @ts-ignore
	import LightbulbOnOutline from 'virtual:icons/mdi/lightbulb-on-outline';
	// @ts-ignore
	import LightningBolt from 'virtual:icons/mdi/lightning-bolt';

	let notificationHistory = [];
	async function updateNotifsPage() {
		onMount(async () => {
			let { data, error } = await getNotifs();
			// console.log(data);
			notificationHistory = data.reverse();
		});
	}

	const notif = supabase
		.channel('notif-channel')
		.on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'notif' }, (payload) => {
			console.log('New notification received', payload);
			updateNotifsPage();
		})
		.subscribe();

	updateNotifsPage();
</script>

<div class="block">
	<h3 class="mysocket pl-6 text-2xl mx-1">Notifications</h3>
	<div class="notifcol flex flex-col-reverse pl-4 pt-6 pr-4">
		{#each notificationHistory as notif}
			<div class="notifs flex items-center">
				<div
					class={'iconbox rounded-full p-1 ml-4 mb-8 flex-shrink-0 ' +
						(notif.notif_type === 'W'
							? 'bg-[#F06346]'
							: notif.notif_type === 'O'
								? 'bg-[#F0A346]'
								: 'bg-[#F04646]')}
				>
					{#if notif.notif_type === 'W'}
						<LightningBolt class="text-2xl" style="color: white" />
					{:else if notif.notif_type === 'O'}
						<LightbulbOnOutline class="text-2xl" style="color: white" />
					{:else}
						<Exclamation class="text-2xl" style="color: white" />
					{/if}
				</div>
				<div class="flex flex-col ml-2 p-1 pl-4 pr-12 w-full">
					<div class="date text-sm">{notif.date} at {notif.time}</div>
					<!--TODO: change time format later-->
					{#if notif.notif_type === 'else'}
						<div class="message text-base leading-tight pt-1 pr-4">
							Socket {notif.elec.relay_state_1}
							<!--TODO: change to socket_num after POST from arduino-->
							{notif.message}
						</div>
					{:else if notif.notif_type === 'W'}
						<div class="message text-base leading-tight pt-1 pr-4">
							{notif.message}
						</div>
					{:else}
						<div class="message text-base leading-tight pt-1 pr-4">{notif.message}</div>
					{/if}
					<hr class="separator h-px mt-6 mb-4 bg-neutral-400 border-0" />
				</div>
			</div>
		{/each}
	</div>
</div>

<style>
	.notifcol {
		background-color: white;
	}

	.notifs {
		background-color: white;
	}

	.date {
		font-family: 'InterBold', sans-serif;
	}

	.message {
		font-family: 'InterReg', sans-serif;
	}

	.separator {
		width: 100%;
	}
</style>
