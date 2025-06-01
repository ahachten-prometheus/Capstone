import { getRecords } from '@/services/airtable';
import { jsonResponse } from '@/lib/responseUtils';

export async function GET() {
  console.log('--getEvents() INVOKED @api/events/route.js'); //remove after debugging;
  const { searchParams } = new URL(request.url);

  const pageSize = searchParams.get('pageSize');
  const offset = searchParams.get('offset');

  try {
    const [events, error] = await getRecords({
      tableName: 'Events',
      filters: `{Status} = "Approved"`,
      pageSize: pageSize ?? 8,
      offset: offset ?? null,
    });

    if (error) return jsonResponse({ msg: `Service unavailable: Unable to retrieve events, ${error}` }, 503);

    return jsonResponse(events);
  } catch (error) {
    console.error('Unexpected error fetching events:', error);
    return jsonResponse({ msg: `Internal: Unexpected error occurred while fetching events, ${error}` }, 500);
  }
};
