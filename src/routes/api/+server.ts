import { json, type RequestEvent } from '@sveltejs/kit';

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
	const sampleValue = {
		name: 'Ceej',
		description: 'Very pogi',
    message: 'Great job submitting a POST request!',
		money: 1
	};

	return json(sampleValue);
}
