import { supabase } from './supabase/SBClient';

export async function insertNewElecRow(newData, otherNotif = null) {
	const { data, error } = await supabase.from('elec').insert([newData]).select();
	if (!error) {
		console.log(`Creating notif: ${JSON.stringify(data)} ${otherNotif}`);
		await addNewNotif(data, otherNotif);
	} else {
		console.error(error);
	}
}

async function addNewNotif(newElec, otherNotif = null) {
	// EDIT: pwede i-remove yung message column
	const { data, error } = await supabase.from('users').select('threshold').eq('userid', 0);
	// WARN: `error2` might cause problems due to non-existing key
	// @ts-expect-error
	const { data: prevData, error2 } = await supabase
		.from('notif')
		.select('*, elec ( * )')
		.order('primaryid', { ascending: false })
		.eq('notif_type', 'W')
		.limit(1);
	let currentThreshold = 0.5;
	if (!error) {
		currentThreshold = data[0].threshold;
		console.log(`Got softlimit ${currentThreshold}`);
	} else {
		console.error(error);
	}

	const curDate = new Date(newElec[0].time);
	const prevDate = prevData ? new Date(prevData[0].elec.time) : null;

	// notif types: threshold (T), warning (W), on/off (O)*
	let notif = 'default'; // di dapat maiinsert to table
	let initMessage = 'bawal';

	if (newElec[0].power >= 230) {
		notif = 'T';
		initMessage = `Overcurrent detected. Sockets had a total power of ${newElec[0].power}W but the limit is only 230W. Switched off all the sockets.`;
	} else if (
		newElec[0].energy >= currentThreshold &&
		// @ts-expect-error: currDate and prevDate arithmetic wrongly categorized as error
		(!prevData || (curDate - prevDate) / (1000 * 60) > 2)
	) {
		notif = 'W';
		initMessage = `Excess energy consumption detected. Consumed ${newElec[0].energy}kWh which is over the limit of ${currentThreshold}kWh.`;
	} else {
		// if nag-change power value, notif = 'O';
		notif = '';
		initMessage = '';
	}

	if (notif !== '') {
		const newNotif = {
			elec_id: newElec[0].primaryid,
			notif_type: notif, // change to variable
			message: initMessage,
			processed: false
		};
		insertNewNotifRow(newNotif);
	}

	if (otherNotif !== null) {
		const newNotif = {
			elec_id: newElec[0].primaryid,
			notif_type: 'O', // change to variable
			message: otherNotif,
			processed: false
		};
		insertNewNotifRow(newNotif);
	}
}

export async function insertNewNotifRow(newNotif) {
	const { data, error } = await supabase.from('notif').insert([newNotif]).select();
	if (!error) {
		console.log(data);
	} else {
		console.error(error);
	}
}

export async function getLatestElecRow() {
	const { data, error } = await supabase
		.from('elec') //table name
		.select('*') //columns to select from the database
		.order('time', { ascending: false })
		.limit(1);

	return { data, error };
}

export async function getNotifs() {
	const { data, error } = await supabase
		.from('notif')
		.select(`*, elec ( * )`)
		.gt('primaryid', 1942)
		.order('primaryid', { ascending: false })
		.limit(10);

	if (data) {
		for (let i = 0; i < data?.length; i++) {
			const time = data[i].elec.time;
			const date = time.substring(0, 10);
			const timeOnly = time.substring(11, 19);
			data[i].date = date;
			data[i].time = timeOnly;
		}
	}
	return { data, error };
}

export async function getUnprocessedNotifs() {
	const { data, error } = await supabase
		.from('notif')
		.select('*')
		.eq('processed', false)
		.order('primaryid', { ascending: false })
		.limit(2);
	if (data && data.length > 0) {
		return data;
	} else {
		return [];
	}
}

export async function updateProcessedNotif(notif) {
	const newNotif = {
		...notif,
		processed: true
	};
	await supabase.from('notif').update(newNotif).eq('primaryid', notif.primaryid).select();
}

export async function updateUserThreshold(userid: number, newThreshold) {
	const { data, error } = await supabase
		.from('users')
		.update({ threshold: newThreshold })
		.eq('userid', userid)
		.select();
	if (error) {
		console.error(error);
	}
}

export async function getUser(userid: number) {
	const { data, error } = await supabase
		.from('users') //table name
		.select('*') //columns to select from the database
		.eq('userid', userid);
	if (error) {
		console.error(error);
	}

	return { data, error };
}

export async function getAllElecRowsToday() {
	const currDate = new Date();
	// TODO: Remove hardcoded date and uncomment setting currDateString
	const currDateString =
		currDate.getFullYear().toString() +
		'-' +
		(currDate.getMonth() + 1).toString().padStart(2, '0') +
		'-' +
		currDate.getDate().toString().padStart(2, '0');
	const { data, error } = await supabase
		.from('elec') // table name
		.select('*') // columns to select from the database
		.order('time')
		.gte('time', currDateString); // all rows since the start of day

	if (error) {
		console.error(error);
	}

	return { data, error };
}
