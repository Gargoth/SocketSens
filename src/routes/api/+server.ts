import { json, type RequestEvent } from '@sveltejs/kit';
import { clientState } from '../../stores/clientState';
import { get } from 'svelte/store';
import { toggles } from '../../stores/toggleStates';
import {
	getLatestElecRow,
	getLatestSchedule,
	getUser,
	insertNewElecRow,
	insertNewNotifRow,
	updateCurrentSchedules
} from '$lib/supabase';
import { getTimeDifference, onTimes, offTimes } from '../../stores/times';
import { softlimitThreshold } from '../../stores/thresholdStore';

export async function GET(event: RequestEvent): Promise<Response> {
	const data = await getLatestElecRow();

	// Compute time difference in milliseconds
	async function updateCurrentSchedules() {
		const { data, error } = await getLatestSchedule(0);
		console.log('Latest schedule retrieved');
		onTimes.set([data[0].time_on_1, data[0].time_on_2, data[0].time_on_3, data[0].time_on_4]);
		offTimes.set([data[0].time_off_1, data[0].time_off_2, data[0].time_off_3, data[0].time_off_4]);
	}

	await updateCurrentSchedules();
	const onTimeDiff = getTimeDifference(get(onTimes));
	const offTimeDiff = getTimeDifference(get(offTimes));

	// Handle Breached Limits
	const userData = await getUser(0);
	const limit = userData.data[0].threshold;
	if (data.data[0].energy > limit) {
		data.data[0].relay_state_1 = true;
		data.data[0].relay_state_2 = true;
		data.data[0].relay_state_3 = true;
		data.data[0].relay_state_4 = true;
	}

	const toggleStates = get(toggles);
	const returnValue = {
		currentThreshold: 20,
		relayPin_1: data.data[0].relay_state_1,
		relayPin_2: data.data[0].relay_state_2,
		relayPin_3: data.data[0].relay_state_3,
		relayPin_4: data.data[0].relay_state_4,
		socketSchedOn_1: onTimeDiff[0],
		socketSchedOn_2: onTimeDiff[1],
		socketSchedOn_3: onTimeDiff[2],
		socketSchedOn_4: onTimeDiff[3],
		socketSchedOff_1: offTimeDiff[0],
		socketSchedOff_2: offTimeDiff[1],
		socketSchedOff_3: offTimeDiff[2],
		socketSchedOff_4: offTimeDiff[3]
	};

	return json(returnValue);
}

export async function POST(event: RequestEvent): Promise<Response> {
	let parsedClientState: any;
	try {
		parsedClientState = await event.request.json();
	} catch (error) {
		return json({
			message: 'ERROR: Payload is not valid JSON'
		});
	}

	// Update clientState store
	clientState.set({
		relayPins: [
			parsedClientState.relayPin_1,
			parsedClientState.relayPin_2,
			parsedClientState.relayPin_3,
			parsedClientState.relayPin_4
		],
		current: parsedClientState.current,
		power: parsedClientState.power,
		energy: parsedClientState.energy
	});

<<<<<<< HEAD
  const newData = {
    userid: 0,
    time: new Date().toISOString(),
    energy: $clientState.energy,
    power: $clientState.power,
    current: $clientState.current,
    relay_state_1: $clientState.relayPins[0],
    relay_state_2: $clientState.relayPins[1],
    relay_state_3: $clientState.relayPins[2],
    relay_state_4: $clientState.relayPins[3]
  };
  insertNewElecRow(newData);

  var currentThreshold = 20;              // SHOULDNT BE HARDCODED FRANCE AND CEEJ
  const lastData = await getLatestElecRow();
  // notif types: threshold (T), warning (W), on/off (O)*
  var notif = 'default';
  if (lastData.lastData[0].current >= currentThreshold){
    notif = 'T';
  } else if (lastData.lastData[0].current >= currentThreshold*0.8) { 
    notif = 'W';
  } else {
    notif = 'else';
  }
  
  // if nag-change power value, notif = 'O';
  const newNotif = {
    elecid: lastData.lastData[0].primaryid,
    notif_type: notif   // change to variable
  };
  console.log(newNotif)
  insertNewNotifRow(newNotif);
	// TODO: Handle breached limits if any
=======
	const currentClientState = get(clientState);

	const newData = {
		userid: 0,
		time: new Date().toISOString(),
		energy: currentClientState.energy,
		power: currentClientState.power,
		current: currentClientState.current,
		relay_state_1: currentClientState.relayPins[0],
		relay_state_2: currentClientState.relayPins[1],
		relay_state_3: currentClientState.relayPins[2],
		relay_state_4: currentClientState.relayPins[3]
	};
	insertNewElecRow(newData);
>>>>>>> origin

	return json({
		message: 'POST Success',
		data: get(clientState)
	});
}
