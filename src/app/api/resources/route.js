import { getRecords } from "@/app/services/airtable";

export async function GET({ pageSize, offset }) {
  try {
    const data = await getRecords({
      tableName: "Resources",
      filters: "AND({Status}='Active')",
      pageSize: pageSize,
      offset: offset,
    });

    return Response.json(data);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Error!" });
  }
}
