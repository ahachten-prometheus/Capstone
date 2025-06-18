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
    const subjectFormulas = subjectFilters.map(filter => {
      /** RegEx Intentions:
       * Case-Insensitivity - Capitalization inconsistencies will match.
       * Partial Word Matching - If the term is inside the string, it will match.
       *                          Ex. "apple" WILL MATCH "apple pie" AND "pineapple".
       * Exact Phrase Matching - If multiple words are included, we do not break them apart and look to match the whole phrase.
       *                          Ex. "red car" WILL NOT MATCH "red bike", "blue car", or "My car is red". It WILL MATCH "My red car".
       */

      // Escape special RegEx characters in the input. Every character is treated literally.
      // Ex. "How. How??? How're you doing this?" --> "How\. How\?\?\? How're you doing this\?"
      const regex = filter.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

      // Case-Insensitivity is implemented by using LOWER() on both strings
      return `REGEX_MATCH(LOWER({Subject}),LOWER('${regex}'))`;
    });

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
