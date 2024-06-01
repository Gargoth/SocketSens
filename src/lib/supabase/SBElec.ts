import supabase from './SBClient';
import { addNewNotif } from './SBNotif';

export async function insertNewElecRow(newData, otherNotif = null) {
	const { data, error } = await supabase.from('elec').insert([newData]).select();
	if (!error) {
		console.log(`Creating notif: ${JSON.stringify(data)} ${otherNotif}`);
		await addNewNotif(data, otherNotif);
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
