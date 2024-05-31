import { writable } from 'svelte/store';

export const offTimes = writable([null, null, null, null]);
export const onTimes = writable([null, null, null, null]);

export function getTimeStringDates(timeStrings) {
	const currentDate = new Date();
	const dates = [new Date(), new Date(), new Date(), new Date()];

	for (let i = 0; i < 4; i++) {
		if (timeStrings[i] != null && timeStrings[i] != '') {
			dates[i] = new Date();
			dates[i].setHours(timeStrings[i].substring(0, 2));
			dates[i].setMinutes(timeStrings[i].substring(3, 5));
			dates[i].setSeconds(0);

			if (dates[i] < currentDate) {
				dates[i].setDate(currentDate.getDate() + 1);
			}
		} else {
			dates[i] = null;
		}
	}

	return dates;
}

export function getTimeDifference(timeStrings) {
	const currentDate = new Date();
	const dates = getTimeStringDates(timeStrings);
	const millis = [-5000000, -5000000, -5000000, -5000000];
	for (let i = 0; i < 4; i++) {
		if (dates[i] == null) continue;

		millis[i] = dates[i] - currentDate;
	}

	return millis;
}
