"use client";
import { useEffect, useRef } from "react";
import debounce from "lodash.debounce";
import Select from "react-select";

export default function ResourceFilters({ filters, setFilters }) {
  const { Category, Resources_Type, Subjects } = filters;

  // ///////////////////////////
  // Searching (aka Name Filter)
  // ///////////////////////////

  const handleNameUpdate = event => {
    const value = event.target.value;

    setFilters(prev => ({ ...prev, Name: value }));
  };

  // /////////////////
  // Debouncing Search
  // /////////////////

  const debouncedHandleNameUpdate = useRef(
    debounce(handleNameUpdate, 400)
  ).current;

  useEffect(() => {
    return () => debouncedHandleNameUpdate.cancel();
  }, [debouncedHandleNameUpdate]);

  // /////////////
  // Other Filters
  // /////////////

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

  ////////Select box styles function will go here /////////////

  return (

    <div className="flex flex-box flex-col md:flex-row gap-4 justify-center my-[4px] text-black">
      <input
        type='text'
        className='
          bg-white
          border
          text-black
          py-1 px-4'
        placeholder='Search...'
        onChange={debouncedHandleNameUpdate}
      />

      <Select
        styles={{
            control: (baseStyles, state) => ({
                ...baseStyles,
                borderColor: state.isFocused ? 'blue' : 'black',
                borderRadius: 0,
                maxWidth: 1000,
                minWidth: 90,
                height: 33
                }),

            }}
        name="Category"
        placeholder="Category"
        options={categoryOptions}
        isClearable
        onChange={handleCategoryUpdate}
        value={
          Category.length > 0 ? { value: Category, label: Category } : null
        }
      />
      <Select
        styles={{
            control: (baseStyles, state) => ({
                ...baseStyles,
                borderColor: state.isFocused ? 'blue' : 'black',
                borderRadius: 0,
                width: 150,
                maxWidth: 1000,
                minWidth: 90,
                height: 33
                }),

            }}
        options={resourcesTypeOptions}
        isClearable
        onChange={handleResourcesTypeUpdate}
        placeholder="Resource Type"
        value={
          Resources_Type.length > 0
            ? { value: Resources_Type, label: Resources_Type }
            : null
        }
      />
      <Select
        styles={{
            control: (baseStyles, state) => ({
                ...baseStyles,
                borderColor: state.isFocused ? 'blue' : 'black',
                borderRadius: 0,
                maxWidth: 1000,
                minWidth: 90,
                height: 33
                }),

            }}
        options={subjectOptions}
        isMulti
        onChange={handleSubjectsUpdate}
        placeholder="Subject"
        value={Array.from(Subjects).map(filter => ({
          value: filter,
          label: filter,
        }))}
      />
    </div>
    
  );
}

  // ///////////////////////////
  // Options
  // ///////////////////////////
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
