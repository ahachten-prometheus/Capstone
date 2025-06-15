"use client";
import ResourceTileGrid from "@/components/ResourceTileGrid";
import ResourceFilters from "@/components/ResourceFilters";
import { useState, useEffect } from "react";
import React from "react";

export default function Resources() {
  const [resources, setResources] = useState([]);
  const [offset, setOffset] = useState(null);
  const [highlightedResources, setHighlighted] = useState([]);
  // const [highlightedOffset, setHighOffset] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const [data, error] = await fetchResources();

        if (data) {
          setResources(data.records);
          setOffset(data.offset);
        }
      } catch (error) {
        setError(error.message);
      }
    }

    fetchData();
  }, []);

  //button function to render more resourceess
  const handleLoadMoreClick = async event => {
    try {
      const [data, error] = await fetchResources({ pageSize: 8, offset });
      if (data) {
        setResources([...resources, ...data.records]);
        setOffset(data.offset);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h2> Resources </h2>

      {/* resource page recommendation block component */}
      {highlightedResources.length > 0 && (
        <div className='highlighted-resource-block'>
          {/* highlightedResources[Math.floor(Math.random() * highlightedResources.length)] */}
        </div>
      )}

      <div className='all-resources'>
        <h2>All Resources</h2>
        <hr />
        {/* search bar & filter drop downs*/}
        <ResourceFilters />
        {/* resource tiles */}
        <ResourceTileGrid resources={resources} />
        {/* pagination button (if there is an offset) */}
        {offset && (
          <button
            onClick={handleLoadMoreClick}
            className='bg-[#C96C86] hover:bg-[#8F5E72] cursor-pointer px-4 py-2 '>
            load more
          </button>
        )}
      </div>
    </div>
  );
}

async function fetchResources({ pageSize = 8, offset } = { pageSize: 8 }) {
  console.log("fetching resources...");

  const params = new URLSearchParams();
  params.append("pageSize", pageSize.toString());
  if (offset) params.append("offset", offset.toString());

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
  Category = "";
  Resources_Type = "";
  Subjects = new Set();

  constructor(urlParams) {
    const categoryFilter = urlParams.get("category");
    const resourcesTypeFilter = urlParams.get("resourcesType");
    const subjectFilters = urlParams.getAll("category");

    if (categoryFilter) this.Category = categoryFilter;
    if (resourcesTypeFilter) this.Resources_Type = resourcesTypeFilter;

    subjectFilters.forEach(filter => {
      this.Subjects.add(filter);
    });
  }
}
