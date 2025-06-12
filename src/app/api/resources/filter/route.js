import { getRecords } from "@/services/airtable";

export async function GET(req) {
  const params = req.nextUrl.searchParams;

  const pageSize = params.get("pageSize");
  const offset = params.get("offset");
  const filters = params.getAll("filters");

  const filterFormulas = filters.map(filter => {
    const idxToSplit = filter.findIndex(",");

    const field = filter.slice(0, idxToSplit);
    const value = filter.slice(idxToSplit + 1);

    if (field === "Name" || field === "Subject") {
      // TODO
      // RegEx matching
      return `REGEX_MATCH({${field}}, '(${value})')`;
    } else {
      return `{${field}} = '${value}'`;
    }
  });

  try {
    const [data, error] = await getRecords({
      tableName: "Resources",
      // filters: `AND({Status} = 'Active', ${filterFormulas.join(', ')})`,
      filters: `AND({Status} = 'Active', {Subject} = "Anxiety & Depression")`,
      pageSize: pageSize ?? 8,
      offset: offset,
    });

    return Response.json(data);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Error!" });
  }
}
