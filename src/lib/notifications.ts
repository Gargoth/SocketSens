export async function testNotifications() {
	const result = await Notification.requestPermission();
	if (result === 'granted') {
		const registration = await navigator.serviceWorker.ready;
		registration.showNotification('Notification', {
			body: 'Thanks for using SocketSens!'
		})
	}
}
