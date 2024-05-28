import { writable, type Writable } from 'svelte/store';
import type { ClientState } from '$lib/clientState';

export const clientState: Writable<ClientState> = writable({
	relayPins: [false, false, false, false],
	current: -1,
	power: -1,
	energy: -1
});
