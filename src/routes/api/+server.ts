import { json, type RequestEvent } from '@sveltejs/kit';
import { clientState } from '../../stores/clientState';
import { get } from 'svelte/store';
import { toggles } from '../../stores/toggleStates';

export async function GET(event: RequestEvent): Promise<Response> {
  const toggleStates = get(toggles);
	const returnValue = {
    currentThreshold: 20,
    relayPin_1: toggleStates[0],
    relayPin_2: toggleStates[1],
    relayPin_3: toggleStates[2],
    relayPin_4: toggleStates[3],
	};

	return json(returnValue);
}

export async function POST(event: RequestEvent): Promise<Response> {
  let parsedClientState: any;
  try {
    parsedClientState = await event.request.json();
  } catch (error) {
    return json({
      message: "ERROR: Payload is not valid JSON",
    })
  }

  // Update clientState store
  clientState.set({
    relayPins: [parsedClientState.relayPin_1, parsedClientState.relayPin_2, parsedClientState.relayPin_3, parsedClientState.relayPin_4, ],
    current: parsedClientState.current,
    power: parsedClientState.power,
    energy: parsedClientState.energy,
  });

  // TODO: Update database with values
  // TODO: Handle breached limits if any

  return json({
    message: "POST Success",
    data: parsedClientState,
  })
}
