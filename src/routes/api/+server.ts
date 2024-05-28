import { json, type RequestEvent } from '@sveltejs/kit';
import { clientState } from '../../stores/clientState';
import { get } from 'svelte/store';
import { toggles } from '../../stores/toggleStates';
import { getLatestElecRow, insertNewElecRow} from '$lib/supabase';

export async function GET(event: RequestEvent): Promise<Response> {
	// TODO: Set $clientState to latest clientState from database
	const data = await getLatestElecRow();

	// TODO: toggles -> clientState
	// TODO: Compute and send scheds

	const toggleStates = get(toggles);
	const returnValue = {
		currentThreshold: 20,
		relayPin_1: data.data[0].relay_state_1,
		relayPin_2: data.data[0].relay_state_2,
		relayPin_3: data.data[0].relay_state_3,
		relayPin_4: data.data[0].relay_state_4,
		socketSchedOn_1: -1,
		socketSchedOn_2: -1,
		socketSchedOn_3: -1,
		socketSchedOn_4: -1,
		socketSchedOff_1: -1,
		socketSchedOff_2: -1,
		socketSchedOff_3: -1,
		socketSchedOff_4: -1
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
	// TODO: Handle breached limits if any

	return json({
		message: 'POST Success',
		data: get(clientState)
	});
}
