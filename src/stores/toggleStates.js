import { writable } from 'svelte/store';

export const toggles = writable([false, false, false, false]);
export const isWaiting = writable([false, false, false, false]);