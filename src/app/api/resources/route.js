import { getRecords } from "@/services/airtable";

export async function GET(req) {
  const params = req.nextUrl.searchParams;

  const pageSize = params.get("pageSize");
  const offset = params.get("offset");

  // ///////
  // Filters
  // ///////

  const statusFilter = params.get("status");
  const categoryFilter = params.get("category");
  const resourcesTypeFilter = params.get("resourcesType");
  const subjectFilters = params.getAll("subject");

  const filterFormulas = [];

  if (statusFilter && statusFilter.length > 0) {
    const statusFormula = `{Status}='${statusFilter}'`;

    filterFormulas.push(statusFormula);
  }

  if (categoryFilter && categoryFilter.length > 0) {
    const categoryFormula = `{Category}='${categoryFilter}'`;

    filterFormulas.push(categoryFormula);
  }

  if (resourcesTypeFilter && resourcesTypeFilter.length > 0) {
    const resourcesTypeFormula = `{Resources Type}='${resourcesTypeFilter}'`;

    filterFormulas.push(resourcesTypeFormula);
  }

  if (subjectFilters.length > 0) {
    const subjectFormulas = subjectFilters.map(
      filter => `FIND('${filter}',{Subject})`
    );

    filterFormulas.push(subjectFormulas.toString());
    // filterFormulas.push(`OR(${subjectFormulas.toString()})`);
  }

  try {
    const [data, error] = await getRecords({
      tableName: "Resources",
      filters: `AND(${
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
