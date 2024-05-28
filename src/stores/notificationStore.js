import { writable } from 'svelte/store';

const sample1 = {
    "date": "May 15, 2024",
    "time": "2:30 pm",
    "type": "softlimit",
    "socket": '',
    "message": "Extension breached the energy limit of"
}
const sample2 = {
    "date": "May 16, 2024",
    "time": "2:05 am",
    "type": "overcurrent",
    "socket": '',
    "message": "Extension breached the shorting limit of 1kWh. Switching off all the sockets."
}
const sample3 = {
    "date": "May 17, 2024",
    "time": "12:00 pm",
    "type": "scheduled",
    "socket": 2,
    "message": "turned on/off."
}

export const notificationHistory = writable([sample1, sample2, sample3]);