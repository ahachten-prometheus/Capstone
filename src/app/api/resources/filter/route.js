import { getRecords } from "@/services/airtable";

export async function GET(req) {
  const params = req.nextUrl.searchParams;

  // params.append("pageSize", 100);
  // params.append("filters", ["Subject", "Anxiety & Depression"]);
  // params.append("filters", ["Subject", "Bipolar Disorder"]);
  // params.append("filters", ["Subject", "Eating Disorder"]);

  const pageSize = params.get("pageSize");
  const offset = params.get("offset");
  const filters = params.getAll("filters");

  const filterFormulas = filters.map(filter => {
    const idxToSplit = filter.indexOf(",");

    const field = filter.slice(0, idxToSplit);
    const value = filter.slice(idxToSplit + 1);

    if (field === "Subject") {
      // TODO
      // Test RegEx matching
      const regex = value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      // console.log(regex);

      return `REGEX_MATCH(LOWER({${field}}),LOWER('(${regex})'))`;
    } else {
      return `{${field}} = '${value}'`;
    }
  });

  try {
    const [data, error] = await getRecords({
      tableName: "Resources",
      filters: `AND({Status}='Active',${
        filterFormulas.length > 0 ? filterFormulas.toString() : "TRUE()"
      })`,
      pageSize: pageSize ?? 8,
      offset: offset,
    });

    return Response.json(data);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Error!" });
  }
}
