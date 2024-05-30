import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://dewnlawwegxhuprfzbrn.supabase.co';
const supabaseAnonkey =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRld25sYXd3ZWd4aHVwcmZ6YnJuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTU4NjU5NDYsImV4cCI6MjAzMTQ0MTk0Nn0.OIPl5-jEv0qsIG_-pKqMOvKNVkT_wUyRGWbgTp1nzw8';

const supabase = createClient(supabaseUrl, supabaseAnonkey);

export default supabase;

export async function insertNewElecRow(newData, otherNotif=null) {
	const { data, error } = await supabase.from('elec').insert([newData]).select();
	if (!error) {
		console.log(`Creating notif: ${JSON.stringify(data)} ${otherNotif}`)
		await addNewNotif(data, otherNotif);
	} else {
		console.error(error)
	}
}

async function addNewNotif(newElec, otherNotif=null){				// EDIT: pwede i-remove yung message column
	const { data, error } = await supabase.from('users').select('threshold').eq('userid', 0);
<<<<<<< HEAD
	const { data: prevData, error2 } = await supabase.from('elec').select('*').order('primaryid', { ascending: false }).limit(2);
=======
	const { prevData, error2 } = await supabase.from('elec').select('energy').order('primaryid', { ascending: false }).limit(1);
>>>>>>> main
	let currentThreshold = 0.5;
	if (!error) {
		currentThreshold = data[0].threshold;
		console.log(`Got softlimit ${currentThreshold}`)
	} else {
		console.error(error);
	}

	console.log("now")
	console.log(newElec)
	console.log("prev")
	console.log(prevData)
	console.log("hresh")
	console.log(currentThreshold)
	
	const curDate = new Date(newElec[0].time)
	const prevDate = prevData ? new Date(prevData[1].time) : null
	console.log(curDate)
	console.log(prevDate)
	console.log(curDate-prevDate)

    // notif types: threshold (T), warning (W), on/off (O)*
    var notif = 'default';		// di dapat maiinsert to table
	var initMessage = 'bawal';

    if (newElec[0].power >= 230) {
      	notif = 'T';
	  	initMessage = `Overcurrent detected. Sockets had a total power of ${newElec[0].power}W but the limit is only 500W. Switched off all the sockets.`;
    } else if (newElec[0].energy >= currentThreshold && (!prevData || (curDate-prevDate)/(1000 * 60) > 5)) {
	  	initMessage = `Excess energy consumption detected. Consumed ${newElec[0].energy}kWh which is over the limit of ${currentThreshold}kWh.`;
    } else { // if nag-change power value, notif = 'O';
      	notif = '';
		initMessage = '';
    }

	console.log(newElec)
	console.log(initMessage)

	if (notif !== '') {
		const newNotif = {
			elec_id: newElec[0].primaryid,
			notif_type: notif,   // change to variable
			message: initMessage,
			processed: false
		};
		insertNewNotifRow(newNotif);
	}

	if (otherNotif !== null) {
		const newNotif = {
			elec_id: newElec[0].primaryid,
			notif_type: 'O',   // change to variable
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
		console.error(error)
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

export async function getLatestSchedule(userid: number) {
	const { data, error } = await supabase
		.from('sched') //table name
		.select('*') //columns to select from the database
		.order('primaryid', { ascending: false })
		.limit(1);

	return { data, error };
}

export async function upsertSchedule(userid: number, onScheds, offScheds) {
	const latestSched = await getLatestSchedule(0);
	const primaryId = await getLatestSchedule(0);

	const { data, error } = await supabase
		.from('sched')
		.upsert({
			userid: userid,
			time_on_1: onScheds[0],
			time_on_2: onScheds[1],
			time_on_3: onScheds[2],
			time_on_4: onScheds[3],
			time_off_1: offScheds[0],
			time_off_2: offScheds[1],
			time_off_3: offScheds[2],
			time_off_4: offScheds[3]
		})
		.select();
}

export async function getNotifs() {
	const { data, error } = await supabase.from('notif').select(`*, elec ( * )`).gt('primaryid', 1942).order('primaryid', { ascending: false }).limit(10);
	
	if (data) {
			for (let i = 0; i < data?.length; i++){
			const time = data[i].elec.time;
			const date = time.substring(0, 10);
			const timeOnly = time.substring(11, 19);
			data[i].date = date;
			data[i].time = timeOnly;
		}
	}
	return { data, error};
}

export async function getUnprocessedNotifs() {
	const { data, error } = await supabase.from('notif').select('*').eq('processed', false).order('primaryid', { ascending: false }).limit(2);
	if (data && data.length > 0) {
		return data;
	} else {
		return []
	}
}

export async function updateProcessedNotif(notif) {
	const newNotif = {
		...notif,
		processed: true
	}
	await supabase.from('notif').update(newNotif).eq('primaryid', notif.primaryid).select();
}

export async function updateUserThreshold(userid: number, newThreshold) {
	const { data, error } = await supabase
		.from('users')
		.update({ threshold: newThreshold })
		.eq('userid', userid)
		.select();
	if (error) {
		console.log(error);
	}
}

export async function getUser(userid: number) {
	const { data, error } = await supabase
		.from('users') //table name
		.select('*') //columns to select from the database
		.eq('userid', userid);
	if (error) {
		console.log(error);
	}

	return { data, error };
}

