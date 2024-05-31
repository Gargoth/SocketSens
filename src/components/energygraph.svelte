<script lang="ts">
	import supabase, { getAllElecRowsToday } from '$lib/supabase';
	import { totalConsumption } from '../stores/totalConsumptionStore';
	import type { ElecRow } from '../lib/elecrowType';

	async function computeTotalEnergy() {
		const { data } = await getAllElecRowsToday();
		const elecRows = data as ElecRow[];
		const cumulativeEnergy: { time: Date; totalEnergy: number }[] = [];
		if (elecRows) {
			cumulativeEnergy.push({
				time: elecRows[0].time,
				totalEnergy: elecRows[0].energy
			});
			for (let i = 1; i < elecRows.length; i++) {
				if (elecRows[i].energy > 0 && elecRows[i].energy > elecRows[i - 1].energy) {
					cumulativeEnergy.push({
						time: elecRows[i].time,
						totalEnergy:
							cumulativeEnergy[i - 1].totalEnergy + elecRows[i].energy - elecRows[i - 1].energy
					});
				} else {
					cumulativeEnergy.push({
						time: elecRows[i].time,
						totalEnergy: cumulativeEnergy[i - 1].totalEnergy
					});
				}
			}
		}
		$totalConsumption =
			cumulativeEnergy.length > 0 ? cumulativeEnergy[cumulativeEnergy.length - 1].totalEnergy : 0;
		return cumulativeEnergy;
	}
  //
	// Subscribe to elec changes

	const elec = supabase
		.channel('elec-readings')
		.on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'elec' }, (payload) => {
      computeTotalEnergy();
		})
		.subscribe();

	computeTotalEnergy().then((result) => {
		console.table(result);
	});
</script>

<div>
	<span>Plot here!</span>
</div>
