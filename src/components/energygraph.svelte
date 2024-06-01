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
		const cumulativeEnergy: { x: number, y: number }[] = [];
		const x : number[] = [];
		const y : number[] = [];
		if (elecRows) {
			// cumulativeEnergy.push({elecRows[0].time.getTime(), elecRows[0].energy});
			cumulativeEnergy.push({
				x: elecRows[0].time.getTime(),
				y: elecRows[0].energy
			});
			x.push(elecRows[0].time.getTime());
			y.push(elecRows[0].energy);
			for (let i = 1; i < elecRows.length; i++) {
				let convertDate = elecRows[i].time.getTime();
				// energy > 0 AND energy increased
				if (elecRows[i].energy > 0 && elecRows[i].energy > elecRows[i - 1].energy) {
					var prev = elecRows[i - 1].energy;
					if (elecRows[i-1].energy <= 0) {
						prev = 0;
					}
					cumulativeEnergy.push({
						x: convertDate,
						y:
							cumulativeEnergy[i - 1].y + elecRows[i].energy - prev
					});
					x.push(convertDate);
					y.push((cumulativeEnergy[i - 1].y + elecRows[i].energy - prev));
				} else {
					cumulativeEnergy.push({
						x: convertDate,
						y: cumulativeEnergy[i - 1].y
					});
					x.push(convertDate);
					y.push((cumulativeEnergy[i - 1].y));
				}
				// console.log(cumulativeEnergy[i].time);
			}
		}
		// console.log(cumulativeEnergy.time);
		$totalConsumption =
			cumulativeEnergy.length > 0 ? cumulativeEnergy[cumulativeEnergy.length - 1].totalEnergy : 0;
		return {cumulativeEnergy, x, y};
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
		let {cumulativeEnergy, x, y} = await computeTotalEnergy();
		console.log(cumulativeEnergy);
		// if (!cEnergy) {
		// 	return null;
		// }
		var minE = y[0];
		var maxE = y[0];
		for (var a of y) {
			if (a < minE) minE = a;
			if (a > maxE) maxE = a;
		}

		var chartData = new Chart(ctx, {
			type: 'scatter',
			data: cumulativeEnergy,
			// {
			// 	labels: cTime,
			// 	datasets: [{
			// 		label: 'Total Energy',
			// 		data: cEnergy,
			// 		// borderWidth: 0.3,
			// 		// tension: 0.3,
			// 		pointRadius: 0, 
			// 		// pointBackgroundColor: 'blue',
			// 		fill: false,
			// 		borderColor: 'white'
			// 		// backgroundColor: 'orange'
			// 	}]
			// },
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
