"use client";
import React from "react";
import Select from "react-select";

export default function ResourceFilters({ filters, setFilters }) {
  const { Name, Category, Resources_Type, Subjects } = filters;

  const handleCategoryUpdate = option => {
    // handling clear
    if (!option) option = { value: "" };

    setFilters(prev => ({ ...prev, Category: option.value }));
  };

  const handleResourcesTypeUpdate = option => {
    // handling clear
    if (!option) option = { value: "" };

    setFilters(prev => ({ ...prev, Resources_Type: option.value }));
  };

  const handleSubjectsUpdate = options => {
    const values = options.map(({ value }) => value);

    setFilters(prev => ({ ...prev, Subjects: new Set(values) }));
  };

  return (
    <>
      <Select
        options={categoryOptions}
        isClearable
        onChange={handleCategoryUpdate}
        value={
          Category.length > 0 ? { value: Category, label: Category } : null
        }
      />
      <Select
        options={resourcesTypeOptions}
        isClearable
        onChange={handleResourcesTypeUpdate}
        value={
          Resources_Type.length > 0
            ? { value: Resources_Type, label: Resources_Type }
            : null
        }
      />
      <Select
        options={subjectOptions}
        isMulti
        onChange={handleSubjectsUpdate}
        value={Array.from(Subjects).map(filter => ({
          value: filter,
          label: filter,
        }))}
      />
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

const categoryOptions = [
  { label: "Getting the Help You Need", value: "Getting the Help You Need" },
  {
    label: "Outreach & Advocacy Organizations",
    value: "Outreach & Advocacy Organizations",
  },
  {
    label: "Professional and Black-Centered Organizations",
    value: "Professional and Black-Centered Organizations",
  },
  { label: "Other Helpful Resources", value: "Other Helpful Resources" },
];

const resourcesTypeOptions = [
  { label: "Crisis Call Lines", value: "Crisis Call Lines" },
  {
    label: "Find a Mental Health Professional",
    value: "Find a Mental Health Professional",
  },
  {
    label: "Specialized Disorder Support",
    value: "Specialized Disorder Support",
  },
  {
    label: "Outreach & Activism Organizations",
    value: "Outreach & Activism Organizations",
  },
  {
    label: "National Government and Advocacy Organizations",
    value: "National Government and Advocacy Organizations",
  },
  {
    label: "Black-Focused Mental Health Organizations",
    value: "Black-Focused Mental Health Organizations",
  },
  { label: "Professional Associations", value: "Professional Associations" },
  { label: "For Black Girls", value: "For Black Girls" },
  { label: "Staying Informed", value: "Staying Informed" },
  { label: "Other", value: "Other" },
];

const subjectOptions = [
  { label: "ADD & ADHD", value: "ADD & ADHD" },
  {
    label: "Anxiety & Depression",
    value: "Anxiety & Depression",
  },
  { label: "Bipolar Disorder", value: "Bipolar Disorder" },
  { label: "Drug & Addiction", value: "Drug & Addiction" },
  { label: "Eating Disorder", value: "Eating Disorder" },
  { label: "OCD", value: "OCD" },
  { label: "Other", value: "Other" },
];
