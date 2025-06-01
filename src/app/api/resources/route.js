import { getRecords } from "@/services/airtable";
import { jsonResponse } from '@/lib/responseUtils';

export async function GET(req) {
  console.log('--getResources() INVOKED @api/resources/route.js'); //remove after debugging;
  const { searchParams } = new URL(request.url);

  const pageSize = searchParams.get('pageSize');
  const offset = searchParams.get('offset');

  try {
    const [resources, error] = await getRecords({
      tableName: 'Resources',
      filters: `{Status} = "Active"`,
      pageSize: pageSize ?? 8,
      offset: offset ?? null,
    });

    if (error) return jsonResponse({ msg: 'Service unavailable: Unable to retrieve resources' }, 503);

    return jsonResponse(resources);
  } catch (error) {
    console.error('Unexpected error fetching resources:', error);
    return jsonResponse({ msg: 'Internal: Unexpected error occurred while fetching resources' }, 500);
  }
};
