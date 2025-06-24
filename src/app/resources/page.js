"use client";
import ResourceTileGrid from "@/components/ResourceTileGrid";
import ResourceFilters from "@/components/ResourceFilters";
import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

export default function Resources() {
  return (
    <Suspense>
      <PageContents />
    </Suspense>
  );
}

function PageContents() {
  const params = useSearchParams();
  const router = useRouter();

  const [resources, setResources] = useState([]);
  const [filters, setFilters] = useState(new Filters(params));
  const [offset, setOffset] = useState(null);
  const [highlightedResources, setHighlighted] = useState([]);
  // const [highlightedOffset, setHighOffset] = useState(null);
  const [error, setError] = useState(null);

  // console.log(params);

  useEffect(() => {
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

    function handleUpdateParams() {
      const current = new URLSearchParams(Array.from(params.entries()));

      if (filters.Category) current.set("category", filters.Category);
      else current.delete("category");

      if (filters.Resources_Type)
        current.set("resourcesType", filters.Resources_Type);
      else current.delete("resourcesType");

      current.delete("subject");
      Array.from(filters.Subjects).forEach(subject =>
        current.append("subject", subject)
      );

      router.replace(`?${current.toString()}`);
    }

    handleUpdateParams();
    fetchData();
  }, [filters]);

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

  //lines bc everything looks the same ////////////////////////////////////////////////////////////////////////////

  return (
    <div className="bg-[#FFF5EA]">
      <h2 className="custom-header-font text-[35px] text-center text-black"> Resources </h2>

      {/* resource page recommendation block component */}
      {highlightedResources.length > 0 && (
        <div className='highlighted-resource-block'>
          {/* highlightedResources[Math.floor(Math.random() * highlightedResources.length)] */}
        </div>
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
            className='flex justify-self-center justify-center mt-[3px] mx-[3px] rounded-[47.5px] bg-[#C96C86] color-[#FFF5EA] text-4xl border-[10px] border-[#C96C86] rounded-2xl w-[350px]  px-[8px] py-[16px]'>
            Load More
          </button>
        )}
      </div>
    </div>
  );
}

//lines bc everything looks the same ////////////////////////////////////////////////////////////////////////////

async function fetchResources({ pageSize = 8, offset, filters } = {}) {
  //   console.log(filters);
  const { Status, Category, Resources_Type, Subjects } = filters;

  const params = new URLSearchParams();
  params.append("pageSize", pageSize.toString());
  if (offset) params.append("offset", offset.toString());

  // ///////
  // Filters
  // ///////

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

//lines bc everything looks the same ////////////////////////////////////////////////////////////////////////////

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

//lines bc everything looks the same ////////////////////////////////////////////////////////////////////////////

class Filters {
  Status = "Active";
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
