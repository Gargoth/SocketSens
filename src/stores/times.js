import { writable } from 'svelte/store';

export const offTimes = writable([null, null, null, null]);
export const onTimes = writable([null, null, null, null]);
