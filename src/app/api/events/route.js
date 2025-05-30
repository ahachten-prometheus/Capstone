import { getRecords } from '../../services/airtable';

export async function GET() {
	try {
		//fetch records --> airtable calls their entries 'records'.
		const { records: events } = await getRecords({
			tableName: 'Events',
			filters: `{Status} = "Approved"`,
		});
		return Response.json(events, { status: 200 });
	} catch (error) {
		console.error(
			`Encountered ${error} when trying to fetch records from Airtable`
		);
		return Response.json({ error: 'Failed to fetch events' }), { status: 500 };
	}
}
