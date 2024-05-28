import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://dewnlawwegxhuprfzbrn.supabase.co';
const supabaseAnonkey =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRld25sYXd3ZWd4aHVwcmZ6YnJuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTU4NjU5NDYsImV4cCI6MjAzMTQ0MTk0Nn0.OIPl5-jEv0qsIG_-pKqMOvKNVkT_wUyRGWbgTp1nzw8';

const supabase = createClient(supabaseUrl, supabaseAnonkey);

export default supabase;

export async function insertNewElecRow(newData) {
	console.log(newData);
	const { data, error } = await supabase.from('elec').insert([newData]).select();
	addNewNotif(data);
}

function addNewNotif(newElec){
	// console.log(newElec);
	var currentThreshold = 20;              // SHOULDNT BE HARDCODED FRANCE AND CEEJ
    // const lastData = await getLatestElecRow();

    // notif types: threshold (T), warning (W), on/off (O)*
    var notif = 'default';		// di dapat maiinsert to table
    if (newElec[0].current >= currentThreshold){
      notif = 'T';
    } else if (newElec[0].current >= currentThreshold*0.8) { 
      notif = 'W';
    } else {
      notif = 'else';
    }
	console.log(notif);

    // if nag-change power value, notif = 'O';
	const newNotif = {
		elec_id: newElec[0].primaryid,
		notif_type: notif   // change to variable
	  };
	console.log(newNotif)
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
