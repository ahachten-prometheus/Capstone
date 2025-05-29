import { getRecords } from '../../services/airtable';

export async function GET() {
	try {
		//fetch records --> airtable calls their entries 'records' so for clarity we too will use {records}. Here, records = events
		const { records: events } = await getRecords({
			tableName: 'Events',
			filters: `{Status} = "Approved"`,
		});
		//if successful return in response
		return new Response(JSON.stringify(events), {
			status: 200,
			headers: { 'Content-Type': 'application/json' },
		});
		//if issue then ---> console.log the error with records(events)for debugging
	} catch (error) {
		console.error(
			`Encountered ${error} when trying to fetch records from Airtable`
		);
		//generic failure message to the client/frontend.
		return new Response(
			JSON.stringify({
				error: 'Failed to fetch events',
			}),
			{ status: 500 }
		);
	}
}

/*
Cleaner but no error handling
	const { records } = await getRecords({ tableName: 'Events' });
	return Response.json(records);
*/
