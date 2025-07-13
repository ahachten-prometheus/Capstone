"use client";
import ResourceTileGrid from "@/components/ResourceTileGrid";
import ResourceFilters from "@/components/ResourceFilters";
import ResourceHighlightedTiles from "@/components/ResourceHighlightedTiles";
import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function Resources() {
  return (
    <Suspense>
      <PageContents />
    </Suspense>
  );
}

function PageContents() {
  const urlParams = useSearchParams();
  const router = useRouter();

  const [resources, setResources] = useState([]);
  const [filters, setFilters] = useState(new Filters(urlParams));
  const [offset, setOffset] = useState(null);
  const [highlightedResources, setHighlighted] = useState([]);
  const [highlightedOffset, setHighOffset] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // ///////////////////////////
    // Fetching resources on filter change
    // ///////////////////////////
    async function fetchData() {
      try {
        const [data, error] = await fetchResources({
          pageSize: 8,
          filters,
        });

        if (data) {
          setResources(data.records);
          setOffset(data.offset);
        }
      } catch (error) {
        console.error(error);
        setError(error.message);
      }
    }

    // ///////////////////////////
    // Updating Params on filter change
    // ///////////////////////////
    function handleUpdateParams() {
      const { Status, Category, Resources_Type, Subjects } = filters;
      const params = new URLSearchParams();

      if (Status && Status.length > 0) {
        params.append("status", Status);
      }

      if (Category && Category.length > 0) {
        params.append("category", Category);
      }

      if (Resources_Type && Resources_Type.length > 0) {
        params.append("resourcesType", Resources_Type);
      }

      Subjects.forEach(subject => {
        params.append("subject", subject);
      });

      router.replace(`?${params.toString()}`);
    }

    handleUpdateParams();
    fetchData();
  }, [filters]);

  useEffect(() => {
    async function fetchHighlightedData() {
      try {
        const [data, error] = await fetchHighlightedResources();

        if (data) {
          setHighlighted(data.records);
          setHighOffset(data.offset);
        }
      } catch (error) {
        console.error(error);
        setError(error.message);
      }
    }

    fetchHighlightedData();
  }, []);

  //button function to render more resourceess
  const handleLoadMoreClick = async event => {
    try {
      const [data, error] = await fetchResources({
        pageSize: 8,
        offset,
        filters,
      });
      if (data) {
        setResources([...resources, ...data.records]);
        setOffset(data.offset);
      }
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  };

  return (
    <div className="bg-[#FFF5EA] overscroll-y-none">
      <h2 className="custom-header-font text-[35px] text-center text-black"> Resources </h2>

      {/* resource page recommendation block component */}
      {(highlightedResources.length > 0 || resources.length > 0) && (
        <ResourceHighlightedTiles
          resource={
            highlightedResources[
              Math.floor(Math.random() * highlightedResources.length)
            ] ?? resources[0] // remove the resources[0] in production
          }
        />
      )}

      <div className='flex-col content-center'>
        <h2 className="custom-header-font text-[25px] text-center text-black">All Resources</h2>
        <hr />
        {/* search bar & filter drop downs*/}
        <ResourceFilters
          filters={filters}
          setFilters={setFilters}
        />
        {/* resource tiles */}
        <ResourceTileGrid resources={resources} />
        {/* pagination button (if there is an offset) */}
        {offset && (
          <button
            onClick={handleLoadMoreClick}
            className='flex justify-self-center justify-center mt-[3px] mx-[3px] rounded-[47.5px] bg-[#C96C86] hover:bg-[#B55772] color-[#FFF5EA] text-4xl border-[10px] border-[#C96C86] rounded-2xl w-[350px] px-[8px] py-[16px] hover:cursor-pointer'>
            Load More
          </button>
        )}
      </div>
    </div>
  );
}

async function fetchResources({ pageSize = 8, offset, filters }) {
  const { Status, Name, Category, Resources_Type, Subjects } = filters;

  const params = new URLSearchParams();
  params.append("pageSize", pageSize.toString());
  if (offset) params.append("offset", offset.toString());

  // ///////
  // Filters
  // ///////

  if (Status && Status.length > 0) {
    params.append("status", Status);
  }

  if (Name && Name.length > 0) {
    params.append("name", Name);
  }

  if (Category && Category.length > 0) {
    params.append("category", Category);
  }

  if (Resources_Type && Resources_Type.length > 0) {
    params.append("resourcesType", Resources_Type);
  }

  Subjects.forEach(subject => {
    params.append("subject", subject);
  });

  try {
    const response = await fetch(`/api/resources?${params.toString()}`);

    if (!response.ok)
      throw new Error(
        `Fetch failed: ${response.status} - ${response.statusText}`
      );

    const data = await response.json();

    return [data, null];
  } catch (error) {
    console.error("unable to fetch resources", error);
    return [null, error];
  }
}

async function fetchHighlightedResources(
  { pageSize = 10, offset } = { pageSize: 10 }
) {
  const params = new URLSearchParams();
  params.append("pageSize", pageSize.toString());
  if (offset) params.append("offset", offset.toString());

  try {
    const response = await fetch(
      `/api/resources/highlighted?${params.toString()}`
    );

    if (!response.ok)
      throw new Error(
        `Fetch failed: ${response.status} - ${response.statusText}`
      );

    const data = await response.json();
    return [data, null];
  } catch (error) {
    console.error("unable to fetch highlighted resources", error);
    return [null, error];
  }
}

class Filters {
  Status = "Active";
  Name = "";
  Category = "";
  Resources_Type = "";
  Subjects = new Set();

  constructor(urlParams) {
    if (!urlParams) return;

    const categoryFilter = urlParams.get("category");
    const resourcesTypeFilter = urlParams.get("resourcesType");
    const subjectFilters = urlParams.getAll("subject");

    if (categoryFilter) this.Category = categoryFilter;
    if (resourcesTypeFilter) this.Resources_Type = resourcesTypeFilter;
    this.Subjects = new Set(subjectFilters);
  }
}
