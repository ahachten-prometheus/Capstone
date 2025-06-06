import { getRecords } from "@/services/airtable";
import { jsonResponse } from "@/lib/responseUtils";

export async function GET(request) {
  console.log('--getProviders() INVOKED @api/providers/route.js'); //remove after debugging;
  const { searchParams } = new URL(request.url);

  const pageSize = searchParams.get('pageSize');
  const offset = searchParams.get('offset');
  const state = searchParams.get('state')
  const virtualOnly = searchParams.get('virtualOnly')
  const name = searchParams.get('name')
  let filters = `AND({Status} = "Active"`
  if (state) filters += `, {State} = "${state}"`
  if (virtualOnly) filters += `, {Virtual Only} = "${virtualOnly}"`
  if (name) filters += `, FIND(LOWER("${name}"), LOWER({Name})) > 0`
  filters += ")"
  try {
    const [data, error] = await getRecords({
      tableName: 'Providers',
      filters: filters,
      pageSize: pageSize ?? 12,
      offset: offset ?? null,
    });

    if (error) return jsonResponse({ msg: `Service unavailable: Unable to retrieve providers, ${error}` }, 503);

    const records = data.records.map((record) => {
      const id = record["id"] ?? null;
      const name = record["Name"] ?? null;
      const licenses = record["Job Title"] ?? null;
      const virtualOnly = record["Virtual Only"] ?? null;
      const practice = record["Provider Practice"] ?? null;
      const address = record["Address"] ?? null;
      const states = record["State"] ?? null;
      const email = record["Email"] ?? null;
      const phone = record["Phone"] ?? null;

      return {
        id,
        name,
        licenses,
        virtualOnly,
        practice,
        address,
        states,
        email,
        phone
      };
    });

    const providers = {
      records,
      nextToken: data.offset ?? null
    }

    return jsonResponse(providers);
  } catch (error) {
    console.error('Unexpected error fetching providers:', error);
    return jsonResponse({ msg: `Internal: Unexpected error occurred while fetching providers, ${error}` }, 500);
  }
};
