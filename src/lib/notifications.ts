export async function testNotifications() {
	const result = await Notification.requestPermission();
	if (result === 'granted') {
		const noti = new Notification('Notifications is Enabled!', {
			body: 'Thanks for subscribing'
		});
		noti.onclick = () => alert('clicked');
	}
}

export async function askNotifications() {
	const result = await Notification.requestPermission();
	if (result === 'granted') {
		const noti = new Notification('Notifications is Enabled!', {
			body: 'Thanks for subscribing'
		});
		noti.onclick = () => alert('clicked');
	}
}

export async function NotifyWarning() {
	try{
		const noti = new Notification('Hello!', {
			body: '2nd notif!'
		});
		noti.onclick = () => alert('clicked');

	} catch (e) {
		console.log(e)
	}
}