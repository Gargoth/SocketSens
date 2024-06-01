<div>
	<span>
		<canvas id = 'chartData'></canvas>
	</span>
</div>

<script lang="ts">
	import supabase, { getAllElecRowsToday } from '$lib/supabase';
	import { totalConsumption } from '../stores/totalConsumptionStore';
	import type { ElecRow } from '../lib/elecrowType';
	import { onMount } from 'svelte';
	import Chart from 'chart.js/auto';

	async function computeTotalEnergy() {
		const { data } = await getAllElecRowsToday();
		const elecRows = data as ElecRow[];
		const cumulativeEnergy: { time: string; totalEnergy: number }[] = [];
		const cTime : string[] = [];
		const cEnergy : string[] = [];
		if (elecRows) {
			cumulativeEnergy.push({
				time: elecRows[0].time.toLocaleString().substring(11, 16),
				totalEnergy: elecRows[0].energy
			});
			cTime.push(elecRows[0].time.toLocaleString().substring(11, 16));
			cEnergy.push(elecRows[0].energy.toString());
			for (let i = 1; i < elecRows.length; i++) {
				let convertDate = elecRows[i].time.toLocaleString().substring(11, 16);
				// energy > 0 AND energy increased
				if (elecRows[i].energy > 0 && elecRows[i].energy > elecRows[i - 1].energy) {
					var prev = elecRows[i - 1].energy;
					if (elecRows[i-1].energy <= 0) {
						prev = 0;
					}
					cumulativeEnergy.push({
						time: convertDate,
						totalEnergy:
							cumulativeEnergy[i - 1].totalEnergy + elecRows[i].energy - prev
					});
					cTime.push(convertDate);
					cEnergy.push((cumulativeEnergy[i - 1].totalEnergy + elecRows[i].energy - prev).toString());
				} else {
					cumulativeEnergy.push({
						time: convertDate,
						totalEnergy: cumulativeEnergy[i - 1].totalEnergy
					});
					cTime.push(convertDate);
					cEnergy.push((cumulativeEnergy[i - 1].totalEnergy).toString());
				}
				// console.log(cumulativeEnergy[i].time);
			}
		}
		// console.log(cumulativeEnergy.time);
		$totalConsumption =
			cumulativeEnergy.length > 0 ? cumulativeEnergy[cumulativeEnergy.length - 1].totalEnergy : 0;
		return {cumulativeEnergy, cTime, cEnergy};
	}
  //
	// Subscribe to elec changes

	const elec = supabase
		.channel('elec-readings')
		.on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'elec' }, (payload) => {
      computeTotalEnergy();
		})
		.subscribe();

	// computeTotalEnergy().then((result) => {
	// 	console.log(result);
	// });

	// let data = computeTotalEnergy();
	let ctx = 'chartData';
	onMount( async () => {
		let {cumulativeEnergy, cTime, cEnergy} = await computeTotalEnergy();
		console.log(cumulativeEnergy);
		// if (!cEnergy) {
		// 	return null;
		// }
		var minE = cEnergy[0];
		var maxE = cEnergy[0];
		for (var a of cEnergy) {
			if (a < minE) minE = a;
			if (a > maxE) maxE = a;
		}

		var chartData = new Chart(ctx, {
			type: 'line',
			data: {
				labels: cTime,
				datasets: [{
					label: 'Total Energy',
					data: cEnergy,
					// borderWidth: 0.3,
					// tension: 0.3,
					pointRadius: 0, 
					// pointBackgroundColor: 'blue',
					fill: false,
					borderColor: 'white'
					// backgroundColor: 'orange'
				}]
			},
			options: {
				scales: {
					x: {
						grid: {display: false},
						ticks: {
							color: 'white'	
						}
					},
					y: {
						beginAtZero: true,
						min: minE,
						max: maxE,
						ticks: {
							color: 'white'
						}
						// ,
						// ticks: {
						// 	padding: 200
						// }
					}
				},
				responsive: true,
				maintainAspectRatio: false,
				plugins: {
					legend: {
						display: false,
						labels: {
							color: 'white' // Legend labels color set to white
						}
					}
				}
			}
		});
	});
</script>
