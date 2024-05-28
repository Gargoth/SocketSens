import { json, type RequestEvent } from '@sveltejs/kit';
import { clientState } from '../../stores/clientState';
import { get } from 'svelte/store';
import { toggles } from '../../stores/toggleStates';
import { getLatestElecRow, insertNewElecRow, insertNewNotifRow } from '$lib/supabase';
import { getTimeDifference, onTimes, offTimes } from '../../stores/times';

export async function GET(event: RequestEvent): Promise<Response> {
	const data = await getLatestElecRow();

	// Compute time difference in milliseconds
  const onTimeDiff = getTimeDifference(get(onTimes));
  const offTimeDiff = getTimeDifference(get(offTimes));

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
		socketSchedOff_4: offTimeDiff[3],
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
	// TODO: Handle breached limits if any

	return json({
		message: 'POST Success',
		data: get(clientState)
	});
}
