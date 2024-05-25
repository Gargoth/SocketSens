import { writable } from 'svelte/store';

const sample1 = {
    "date": "May 15, 2024",
    "time": "2:30 pm",
    "type": "softlimit",
    "socket": 4,
    "message": "breached the limit of 0.35kWh."
}
const sample2 = {
    "date": "May 16, 2024",
    "time": "2:05 am",
    "type": "overcurrent",
    "socket": '',
    "message": "breached the shorting limit of 1kWh. Shutting down all the sockets."
}

export const notificationHistory = writable([sample1, sample2, sample1, sample2]);