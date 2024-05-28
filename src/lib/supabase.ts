import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://dewnlawwegxhuprfzbrn.supabase.co';
const supabaseAnonkey =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRld25sYXd3ZWd4aHVwcmZ6YnJuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTU4NjU5NDYsImV4cCI6MjAzMTQ0MTk0Nn0.OIPl5-jEv0qsIG_-pKqMOvKNVkT_wUyRGWbgTp1nzw8';

const supabase = createClient(supabaseUrl, supabaseAnonkey);

export default supabase;

export async function insertNewElecRow(newData) {
	const { data, error } = await supabase.from('elec').insert([newData]);
}

export async function insertNewNotifRow(newNotif) {
	const { data, error } = await supabase.from('notif').insert([newNotif]);
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
