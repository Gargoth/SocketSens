import { json, type RequestEvent } from '@sveltejs/kit';

export async function GET(event: RequestEvent) : Promise<Response> {
  const sampleValue = {
    name: 'Ceej',
    description: 'Very pogi',
    money: 0,
  };
	return json(sampleValue);
}

export async function POST(event: RequestEvent) : Promise<Response> {
  const request = event.request;
	return await request.json();
}
