import { getRecords } from "@/services/airtable";

export async function GET(req) {
  const params = req.nextUrl.searchParams;

  // //////////////
  // Filter Testing
  // //////////////

  // params.append("pageSize", 100);
  // params.append("filters", ["Category", "Getting the Help You Need"]);
  // params.append("filters", ["Resources Type", "Crisis Call Lines"]);
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
      /** RegEx Intentions:
       * Case-Insensitivity - Capitalization inconsistencies will match.
       * Partial Word Matching - If the term is inside the string, it will match.
       *                          Ex. "apple" WILL MATCH "apple pie" AND "pineapple".
       * Exact Phrase Matching - If multiple words are included, we do not break them apart and look to match the whole phrase.
       *                          Ex. "red car" WILL NOT MATCH "red bike", "blue car", or "My car is red". It WILL MATCH "My red car".
       */

      // Escape special RegEx characters in the input. Every character is treated literally.
      // Ex. "How. How??? How're you doing this?" --> "How\. How\?\?\? How're you doing this\?"
      const regex = value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

      // Case-Insensitivity is implemented by using LOWER() on both strings
      return `REGEX_MATCH(LOWER({${field}}),LOWER('${regex}'))`;
    } else {
      return `{${field}}='${value}'`;
    }
  });

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
