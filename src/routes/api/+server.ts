import { json } from '@sveltejs/kit';

export async function GET(event) {
  const sampleValue = {
    name: 'Ceej',
    description: 'Very pogi',
    money: 0,
  };
	return json(sampleValue);
}

