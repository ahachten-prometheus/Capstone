"use client";
import { useRouter } from "next/compat/router";
import { useEffect } from "react";
import React from "react";

export default function ResourceFilters() {
  const router = useRouter();

  const handleUpdate = async () => {
    try {
      const [data, error] = await fetchResources({ offset });
      if (data) {
        setResources([...resources, ...data.records]);
        setOffset(data.offset);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <div className='filter-form-block'>
        <select
          id='category-filter'
          name='Category'>
          <option
            value=''
            selected
            disabled>
            {" "}
            Categories
          </option>
          <option>Getting the Help You Need</option>
          <option>Outreach & Advocacy Organizations</option>
          <option>Professional, Black-Centered Organizations</option>
          <option>Other Helpful Resources</option>
        </select>

        <select
          id='type-filter'
          name='Resource Type'>
          <option
            value=''
            selected
            disabled>
            Types
          </option>
          <option>Crisis Call Lines</option>
          <option>Find A Mental Health Professional</option>
          <option>Specialized Disorder Support</option>
          <option>Outreach & Activism Organizations</option>
          <option>National Government & Advocacy Organizations</option>
          <option>Black-Focused Mental Health Organizations</option>
          <option>Professional Associations</option>
          <option>For Black Girls</option>
          <option>Staying Informed</option>
          <option>Other</option>
        </select>

        <select
          id='subject-filter'
          name='Subject'>
          <option
            value=''
            selected
            disabled>
            Subjects
          </option>
          <option>ADD & ADHD</option>
          <option>Anxiety & Depression</option>
          <option>Bipolar Disorder</option>
          <option>Drugs & Addiction</option>
          <option>Eating Disorder</option>
          <option>OCD</option>
          <option>Other</option>
        </select>
      </div>
    </>
  );
}

async function fetchFilteredResources({ pageSize = 8, offset, filters }) {
  const params = new URLSearchParams();

  params.append("pageSize", pageSize.toString());
  if (offset) params.append("offset", offset.toString());

  // Category Filter
  if (filters.Category && filters.Category.length > 0) {
    params.append("filters", ["Category", filters.Category]); // 'field,value'
  }

  // Resources Type Filter
  if (filters.Resources_Type && filters.Resources_Type.length > 0) {
    params.append("filters", ["Resources Type", filters.Resources_Type]);
  }

  // Subject Filters
  filters.Subjects.forEach(subject => {
    params.append("filters", ["Subject", subject]);
  });

  try {
    const response = await fetch(`/api/resources/filter?${params.toString()}`);

    if (!response.ok)
      throw new Error(
        `Fetch failed: ${response.status} - ${response.statusText}`
      );

    const data = await response.json();
    return [data, null];
  } catch (error) {
    console.error("unable to fetch filtered resources", error);
    return [null, error];
  }
}
