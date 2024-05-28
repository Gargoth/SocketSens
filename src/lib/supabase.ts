import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://dewnlawwegxhuprfzbrn.supabase.co';
const supabaseAnonkey =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRld25sYXd3ZWd4aHVwcmZ6YnJuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTU4NjU5NDYsImV4cCI6MjAzMTQ0MTk0Nn0.OIPl5-jEv0qsIG_-pKqMOvKNVkT_wUyRGWbgTp1nzw8';

const supabase = createClient(supabaseUrl, supabaseAnonkey);

export default supabase;

export async function insertNewElecRow(newData) {
	const { data, error } = await supabase.from('elec').insert([newData]).select();
	addNewNotif(data);
}

function addNewNotif(newElec) {
	// console.log(newElec);
	var currentThreshold = 20; // SHOULDNT BE HARDCODED FRANCE AND CEEJ
	// const lastData = await getLatestElecRow();

	// notif types: threshold (T), warning (W), on/off (O)*
	var notif = 'default'; // di dapat maiinsert to table
	if (newElec[0].current >= currentThreshold) {
		notif = 'T';
	} else if (newElec[0].current >= currentThreshold * 0.8) {
		notif = 'W';
	} else {
		notif = 'else';
	}
	console.log(notif);

	// if nag-change power value, notif = 'O';
	const newNotif = {
		elec_id: newElec[0].primaryid,
		notif_type: notif // change to variable
	};
	console.log(newNotif);
	insertNewNotifRow(newNotif);
}

export async function insertNewNotifRow(newNotif) {
	const { data, error } = await supabase.from('notif').insert(newNotif);
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

