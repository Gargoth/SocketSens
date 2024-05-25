export async function testNotifications() {
	const result = await Notification.requestPermission();
	if (result === 'granted') {
		const noti = new Notification('Hello!', {
			body: 'Ang pogi ni Ceej!'
		});
		noti.onclick = () => alert('clicked');
	}
}
