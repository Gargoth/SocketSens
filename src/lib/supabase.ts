import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://dewnlawwegxhuprfzbrn.supabase.co';
const supabaseAnonkey =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRld25sYXd3ZWd4aHVwcmZ6YnJuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTU4NjU5NDYsImV4cCI6MjAzMTQ0MTk0Nn0.OIPl5-jEv0qsIG_-pKqMOvKNVkT_wUyRGWbgTp1nzw8';

const supabase = createClient(supabaseUrl, supabaseAnonkey);

export default supabase;

export async function insertNewElecRow(newData) {
	const { data, error } = await supabase.from('elec').insert([newData]).select();
	if (!error) {
		console.log(data)
		addNewNotif(data);
	} else {
		console.error(error)
	}
}

function addNewNotif(newElec){				// EDIT: pwede i-remove yung message column
	var currentThreshold = 20;              // SHOULDNT BE HARDCODED FRANCE AND CEEJ

    // notif types: threshold (T), warning (W), on/off (O)*
    var notif = 'default';		// di dapat maiinsert to table
	var initMessage = 'bawal';
	console.log('test');
    if (newElec[0].current >= currentThreshold){
      notif = 'T';
	  initMessage = 'Extension breached the shorting limit of 1kWh. Switching off all the sockets.';
    } else if (newElec[0].current >= currentThreshold*0.8) { 
      notif = 'W';
	  initMessage = 'Extension breached the energy limit of';
    } else { // if nag-change power value, notif = 'O';
      notif = 'other';
	  initMessage = 'turned on/off.';
    }

	const newNotif = {
		elec_id: newElec[0].primaryid,
		notif_type: notif,   // change to variable
		message: initMessage
	  };
	insertNewNotifRow(newNotif);
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
	const { data, error } = await supabase.from('notif').select(`*, elec ( * )`).order('primaryid', { ascending: false }).limit(10);
	for (var i = 0; i < 10; i++){
		var time = data[i].elec.time;
		var date = time.substring(0, 10);
		var timeOnly = time.substring(11, 19);
		data[i].date = date;
		data[i].time = timeOnly;
		// console.log(date);

		// function convertTZ(date, tzString) {		// changing timezone (might not use)
		// 	return new Date((typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", {timeZone: tzString}));   
		// }
	}
	// console.log(data);

	// console.log(error);
	// console.log(data);
	return { data, error};
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

