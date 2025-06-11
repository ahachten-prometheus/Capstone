import { getRecords } from "@/services/airtable";

export async function GET(request) {
  console.info('[PROVIDERS/INFO] GET /api/providers invoked'); //remove after debugging;
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

    if (error) {
      console.error('[PROVIDERS/ERROR] Failed to fetch providers from Airtable:', error); //helpful for debugging, containing error stack trace server-side
      return Response.json(
        { error: 'Service is temporarily unavailable. Please try again shortly.' }, //user-facing error text; we don't send the raw error object to the frontend as this can expose sensitive info. also noting that the error property is just a property name not an Error object
        { status: 503 }
      );
    }

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

    const providersPayload = {
      records,
      nextToken: data.offset
    }

    console.info(`[PROVIDERS/INFO] Successfully retrieved ${records.length} provider records`); //remove after debugging
    return Response.json(providersPayload);
  } catch (err) {
    console.error('[PROVIDERS/UNEXPECTED_ERROR] An unexpected internal error occurred. Unhandled exception:', err); //note that namespacing logs as [RESOURCE/ERROR_TYPE] is common in robust codebases to make log searching + filtering easier in centralized logging systems like Datadog, Logstash or Cloudwatch
    return Response.json(
      { error: 'An unexpected error occurred. Please try again later.' },
      { status: 500 }
    );
  }
};
