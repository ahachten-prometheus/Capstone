import { getRecords } from '@/services/airtable'

export async function GET(request) {
	const { searchParams } = new URL(request.url)

	const pageSize = searchParams.get('pageSize')
	const offset = searchParams.get('offset')
	const search = searchParams.get('search')
	
	/* without a search term,only “Approved” events are returned
	with a search term, return 'approved” events where name or description that contains search term */
	let filters = `{Status} = "Approved"`
	if (search) {
		filters = `AND({Status} = "Approved", OR(
		FIND(LOWER("${search}"), LOWER({Name})),
        FIND(LOWER("${search}"), LOWER({Description})))
    )`
}
	try {
		//fetch records --> airtable calls their entries 'records'.
		const data = await getRecords({
			tableName: 'Events',
			filters,
			pageSize: pageSize ?? 6,
			offset: offset ?? null,
		});
		return Response.json(data, { status: 200 });
	} catch (error) {
		console.error(
			`Encountered ${error} when trying to fetch records from Airtable`
		);
		return Response.json({ error: 'Failed to fetch events' }), { status: 500 };
	}
}
