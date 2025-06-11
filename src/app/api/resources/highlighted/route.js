import { getRecords } from "@/services/airtable";

export async function GET(req) {
  const params = req.nextUrl.searchParams;

  const pageSize = params.get("pageSize");
  const offset = params.get("offset");

  try {
    const [data, error] = await getRecords({
      tableName: "Resources",
      filters: `{Resource Highlight} = TRUE()`,
      pageSize: pageSize ?? 8,
      offset: offset,
    });

    return Response.json(data);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Error!" });
  }
}
