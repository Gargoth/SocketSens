import supabase from "./SBClient";

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
			time_on_1: onScheds[0] ? onScheds[0] : null,
			time_on_2: onScheds[1] ? onScheds[1] : null,
			time_on_3: onScheds[2] ? onScheds[2] : null,
			time_on_4: onScheds[3] ? onScheds[3] : null,
			time_off_1: offScheds[0] ? offScheds[0] : null,
			time_off_2: offScheds[1] ? offScheds[1] : null,
			time_off_3: offScheds[2] ? offScheds[2] : null,
			time_off_4: offScheds[3] ? offScheds[3] : null
		})
		.select();
}

