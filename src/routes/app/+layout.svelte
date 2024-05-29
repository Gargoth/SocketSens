<script>
	import HomeOutline from 'virtual:icons/mdi/home-outline';
	import CalendarBlankOutline from 'virtual:icons/mdi/calendar-blank-outline';
	import BellOutline from 'virtual:icons/mdi/bell-outline';
	import { softlimitThreshold } from '../../stores/thresholdStore';
	import { clientState } from '../../stores/clientState';
	import { getStores, navigating, page, updated } from '$app/stores';
	import { notifyWarning } from '../../lib/notifications'

	let currentPage = $page.url.pathname === '/app/dashboard' ? 'dashboard' : 'notifications';
	let currentEnergy = $clientState.energy

	$: console.log('current page', currentPage, currentPage === 'dashboard');

	function handleChangeTab(newTab) {
		currentPage = newTab;
	}

	$: {
		if (currentEnergy >= $softlimitThreshold) {
			notifyWarning(currentEnergy)
		}
	}
</script>

<div class="h-screen overflow-hidden bg-white">
	<slot />
	<nav class="fixed bottom-0 left-0 right-0 drop-shadow-[0_5px_5px_rgba(0,0,0,0.5)]">
		<div class="px-7 bg-white shadow-lg">
			<div class="flex pb-3">
				<div class="flex-1 group">
					<a
						on:click={() => handleChangeTab('dashboard')}
						href="/app/dashboard"
						class={(currentPage === 'dashboard'
							? 'text-[#F06346] border-[#F06346] '
							: 'group-hover:text-[#F06346] group-hover:border-[#F06346] text-gray-400 ') +
							'flex items-end justify-center text-center mx-auto px-4 pt-2 w-full border-b-2 border-transparent'}
					>
						<span class="block px-1 pt-1 pb-2">
							<HomeOutline class="text-2xl pt-1 block" />
						</span>
					</a>
				</div>
				<div class="flex-1 group">
					<a
						on:click={() => handleChangeTab('schedules')}
						href="/app/schedules"
						class={(currentPage === 'schedules'
							? 'text-[#F06346] border-[#F06346] '
							: 'group-hover:text-[#F06346] group-hover:border-[#F06346] text-gray-400 ') +
							'flex items-end justify-center text-center mx-auto px-4 pt-2 w-full border-b-2 border-transparent'}
					>
						<span class="block px-1 pt-1 pb-2">
							<CalendarBlankOutline class="text-2xl pt-1.5 block" />
						</span>
					</a>
				</div>
				<div class="flex-1 group">
					<a
						on:click={() => handleChangeTab('notifications')}
						href="/app/notifications"
						class={(currentPage === 'notifications'
							? 'text-[#F06346] border-[#F06346] '
							: 'group-hover:text-[#F06346] group-hover:border-[#F06346] text-gray-400 ') +
							'flex items-end justify-center text-center mx-auto px-4 pt-2 w-full border-b-2 border-transparent'}
					>
						<span class="block px-1 pt-1 pb-2">
							<BellOutline class="text-2xl pt-1.5 block" />
						</span>
					</a>
				</div>
			</div>
		</div>
	</nav>
</div>

<style>
</style>
