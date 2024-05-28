import { writable } from 'svelte/store';

export const offTimes = writable([null, null, null, null]);
export const onTimes = writable([null, null, null, null]);

export function getTimeStringDates(timeStrings) {
  const dates = [
    new Date(),
    new Date(),
    new Date(),
    new Date(),
  ]

  for (let i=0; i < 4; i++) {
    if (timeStrings[i] != null && timeStrings[i] != '') {
      dates[i] = new Date();
      dates[i].setHours(timeStrings[i].substring(0, 2));
      dates[i].setMinutes(timeStrings[i].substring(3, 5));
      dates[i].setSeconds(0);
    } else {
      dates[i] = null;
    }
  }

  return dates;
}
