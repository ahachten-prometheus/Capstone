import { getRecords } from "@/app/services/airtable";

// gets all active providers
export async function GET(request) {
  try {
    const data = await getRecords({
      tableName: "Providers",
      filters: "FIND('Active', {Status})"
    });

    return Response.json(data);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Error!" });
  }
}