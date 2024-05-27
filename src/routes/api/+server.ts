import { json, type RequestEvent } from '@sveltejs/kit';
import type { ClientState } from '$lib/clientState';
import { clientState } from '../../stores/clientState';

export async function GET(event: RequestEvent): Promise<Response> {
	const sampleValue = {
    currentThreshold: 20,
    relayPin_1: 0,
    relayPin_2: 1,
    relayPin_3: 0,
    relayPin_4: 1,
	};

	return json(sampleValue);
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
