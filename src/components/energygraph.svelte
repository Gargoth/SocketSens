<div>
	<span>
		<canvas id = 'chartData' height = 300></canvas>
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
		if (elecRows) {
			cumulativeEnergy.push({
				time: elecRows[0].time.toLocaleString().substring(11, 19),
				totalEnergy: elecRows[0].energy
			});
			for (let i = 1; i < elecRows.length; i++) {
				let convertDate = elecRows[i].time.toLocaleString().substring(11, 19);
				if (elecRows[i].energy > 0 && elecRows[i].energy > elecRows[i - 1].energy) {
					cumulativeEnergy.push({
						time: convertDate,
						totalEnergy:
							cumulativeEnergy[i - 1].totalEnergy + elecRows[i].energy - elecRows[i - 1].energy
					});
				} else {
					cumulativeEnergy.push({
						time: convertDate,
						totalEnergy: cumulativeEnergy[i - 1].totalEnergy
					});
				}
				// let subTime = convertDate;
			}
		}
		// console.log(cumulativeEnergy.time);
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

	// computeTotalEnergy().then((result) => {
	// 	console.log(result);
	// });

	// let data = computeTotalEnergy();
	let ctx = 'chartData';
	onMount( async () => {
		let cumulativeEnergy = computeTotalEnergy();
		// const time = Array.from(cumulativeEnergy['time']);
		// const totalEnergy = Array.from(cumulativeEnergy['totalEnergy']);
		// console.log(cumulativeEnergy);
		var chartData = new Chart(ctx, {
			type: 'line',
			data: {
				labels: cumulativeEnergy.time,
				datasets: [{
					label: 'Total Energy',
					data: cumulativeEnergy.totalEnergy,
					borderWidth: 1,
					tension: 0.3,
					// radius: 8, 
					pointBackgroundColor: 'blue',
					fill: true,
					backgroundColor: 'orange'
				}]
			},
			options: {
				scales: {
					x: {
						grid: {display: false}
					},
					y: {
						beginAtZero: true,
						min: 0,
						max: 0.02,
						ticks: {
							stepSize: 0.001
						}
					}
				}
			}
		});
	});
	// getChartData();
	// data might need labels, datasets: {label, data, backgroundColor, borderColor, borderWidth}
</script>