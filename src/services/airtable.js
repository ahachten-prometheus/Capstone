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
  const params = new URLSearchParams();

  params.append("pageSize", pageSize.toString());

  if (offset) {
    params.append("offset", offset);
  }

  if (filters) {
    params.append("filterByFormula", filters);
  }

  if (sortFields && Array.isArray(sortFields)) {
    sortFields.forEach((sort, index) => {
      params.append(`sort[${index}][field]`, sort.field);
      params.append(`sort[${index}][direction]`, sort.direction || "asc");
    });
  }

  const url = `https://api.airtable.com/v0/${BASE_ID}/${encodeURIComponent(
    tableName
  )}?${params.toString()}`;

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  });

  if (!res.ok) {
    throw new Error(`Airtable request failed: ${res.statusText}`);
  }

  const data = await res.json();
  return {
    records: data.records.map((r) => ({ id: r.id, ...r.fields })),
    offset: data.offset || null, // this value can be passed in future requests when doing pagination
  };
};
