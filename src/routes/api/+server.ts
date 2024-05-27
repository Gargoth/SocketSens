import { json, type RequestEvent } from '@sveltejs/kit';
import type { ClientState } from '$lib/clientState';

export async function GET(event: RequestEvent): Promise<Response> {
	const sampleValue = {
		name: 'Ceej',
		description: 'Very pogi',
    message: 'Great job submitting a GET request!',
		money: 0
	};

	return json(sampleValue);
}

export async function POST(event: RequestEvent): Promise<Response> {
  let clientState: ClientState;
  try {
    clientState = await event.request.json();
  } catch (error) {
    return json({
      message: "ERROR: Payload does not match ClientState interface",
    })
  }

  // TODO: Update database with values
  // TODO: Handle breached limits if any

  return json({
    message: "POST Success"
  })
}