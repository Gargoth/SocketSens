import supabase from './SBClient';

export async function updateUserThreshold(userid: number, newThreshold: number) {
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
