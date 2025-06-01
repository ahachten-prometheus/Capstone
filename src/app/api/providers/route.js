import { getRecords } from "@/services/airtable";
import { jsonResponse } from "@/lib/responseUtils";

export async function GET(request) {
  console.log('--getProviders() INVOKED @api/providers/route.js'); //remove after debugging;
  const { searchParams } = new URL(request.url);

  const pageSize = searchParams.get('pageSize');
  const offset = searchParams.get('offset');

  try {
    const [data, error] = await getRecords({
      tableName: 'Providers',
      filters: `{Status} = "Active"`,
      pageSize: pageSize ?? 12,
      offset: offset ?? null,
    });

    if (error) return jsonResponse({ msg: `Service unavailable: Unable to retrieve providers, ${error}` }, 503);

    return jsonResponse(providers);
  } catch (error) {
    console.error('Unexpected error fetching providers:', error);
    return jsonResponse({ msg: `Internal: Unexpected error occurred while fetching providers, ${error}` }, 500);
  }
};
