import { getRecords } from "@/app/services/airtable";

// An example API endpoint, showing how to call getRecords
export async function GET(request) {
  try {
    const data = await getRecords({
      tableName: "Providers",
      filters: "FIND('Active', {Status})"
    });
    console.log(data)
    return Response.json(data);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Error!" });
  }
}