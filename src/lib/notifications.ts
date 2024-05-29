export async function testNotifications() {
	const result = await Notification.requestPermission();
	if (result === 'granted') {
		const registration = await navigator.serviceWorker.ready;
		registration.showNotification('Notification', {
			body: 'Thanks for using SocketSens!'
		})
	}
}

export async function notifyWarning(value) {
	const result = await Notification.requestPermission();
	if (result === 'granted') {
		const registration = await navigator.serviceWorker.ready;
		registration.showNotification('Soft Limit Breached', {
			body: `Warning! SocketSens detected that you have consumed ${value}kWh`,
			vibrate: [200]
		})
	}
}
