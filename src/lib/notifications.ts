export async function testNotifications() {
	try {
		const result = await Notification.requestPermission();
		if (result === 'granted') {
			const registration = await navigator.serviceWorker.ready;
			registration.showNotification('Notification', {
				body: 'Thanks for using SocketSens!'
			})
		}
	} catch(e) {
		console.error(e)
	}
}

export async function notifyWarning(value) {
	try {
		const result = await Notification.requestPermission();
		if (result === 'granted') {
			const registration = await navigator.serviceWorker.ready;
			registration.showNotification('Soft Limit Breached', {
				body: `Warning! SocketSens detected that you have consumed ${value}kWh`
			})
		}
	} catch(e) {
		console.error(`Attempting with value ${value} but failed.`)
		console.error(e)
	}
}

export async function notifyUsingWarning(msg) {
	try {
		const result = await Notification.requestPermission();
		if (result === 'granted') {
			const registration = await navigator.serviceWorker.ready;
			registration.showNotification('SocketSens Warning!', {
				body: msg
			})
		}
	} catch(e) {
		console.error(e)
	}
}