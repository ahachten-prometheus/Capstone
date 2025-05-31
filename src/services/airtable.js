const API_KEY = process.env.AIRTABLE_API_KEY;
const BASE_ID = process.env.AIRTABLE_BASE_ID;

// Visit https://airtable.com/developers/web/api/list-records to learn more
export const getRecords = async ({
  tableName,
  filters = null,
  sortFields = null,
  pageSize = 10,
  offset = null,
}) => {

  if (!API_KEY || !BASE_ID) {
    const error = 'Missing required env variables: AIRTABLE_API_KEY or AIRTABLE_BASE_ID';
    return [null, error];
  }

  const params = new URLSearchParams();
  params.append("pageSize", pageSize.toString());

  if (offset) params.append("offset", offset);
  if (filters) params.append("filterByFormula", filters);

  if (sortFields && Array.isArray(sortFields)) {
    sortFields.forEach((sort, index) => {
      params.append(`sort[${index}][field]`, sort.field);
      params.append(`sort[${index}][direction]`, sort.direction || "asc");
    });
  }

  const url = `https://api.airtable.com/v0/${BASE_ID}/${encodeURIComponent(
    tableName
  )}?${params.toString()}`;
  console.log(url);

  try {
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    });

    if (!res.ok) {
      throw new Error(`Airtable request failed: ${res.status}, ${res.statusText}`);
    }

    const responseData = await res.json();
    const data = {
      records: responseData.records.map((r) => ({ id: r.id, ...r.fields })),
      offset: responseData.offset || null, // this value can be passed in future requests when doing pagination
    }

    return [data, null];
  } catch (error) {
    console.error(error.message);
    return [null, error];
  }
};
