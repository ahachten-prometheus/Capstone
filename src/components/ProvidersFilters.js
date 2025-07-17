"use client";
import { useEffect, useRef } from "react";
import debounce from "lodash.debounce";
import Select from "react-select";

export default function ProvidersFilters({query, debounceChange}) {
  const { name, state, virtualOnly, isNew } = query

  return (
    <div id="providersFilters"
    >
      <div id="provider-name-field">
        <input
          type="text"
        ></input>
      </div>
      <div id="provider-state-mode-fields">
        <Select
          options={usStatesOptions}
          isClearable
          onChange={debounceChange}
          
          instanceId={1}
        >

        </Select>
      </div>
    </div>
      // <form
      //   id="providers-filters"
      //   className="
      //   w-full max-w-screen-lg 
      //   flex flex-col sm:flex-row justify-center items-center 
      //   gap-4 pb-10 px-4 py-6"
      // >
      //   <div id="provider-name-field">
      //     <label htmlFor="provider-name-input" className="sr-only">Search Provider</label>
      //     <input 
      //       id="provider-name-input"
      //       type="text"
      //       className="text-black bg-white hover:bg-[#DCAD27] rounded-full py-2 px-4"
      //       onChange={debounceChange}
      //       placeholder="Name"
      //     />
      //   </div>

      //   <div id="provider-state-mode-fields">
      //     <label htmlFor="provider-state" className="sr-only">Provider State</label>
      //     <select
      //       id="provider-state"
      //       className="text-black bg-white hover:bg-[#DCAD27] rounded-full py-2 px-4 mr-4"
      //       defaultValue="blank-state-opt"
      //       onChange={debounceChange}
      //       aria-labelledby="filtering-state"
      //     >
      //       <option key="blank-state-opt" value="blank-state-opt" disabled>State?</option>
      //       {Object.keys(usStates).map((abbr) => <option key={`${abbr}-option`} value={usStates[abbr]}>{abbr}</option>)}
      //     </select>

      //     <label htmlFor="provider-mode" className="sr-only">Provider Mode</label>
      //     <select
      //       id="provider-mode"
      //       className="text-black bg-white hover:bg-[#DCAD27] rounded-full py-2 px-4"
      //       defaultValue="blank-mode-opt"
      //       onChange={debounceChange}
      //       aria-labelledby="filtering-mode"
      //     >
      //       <option key="blank-mode-opt" value="blank-mode-opt" disabled>Virtual Only?</option>
      //       <option key="yes-opt" value="Yes">Yes</option>
      //       <option key="no-opt" value="No">No</option>
      //     </select>
      //   </div>
      // </form>
  )
}

const usStatesOptions = [
  { label: "AL", value: "Alabama" },
  { label: "AK", value: "Alaska" },
  { label: "AZ", value: "Arizona" },
  { label: "AR", value: "Arkansas" },
  { label: "CA", value: "California" },
  { label: "CO", value: "Colorado" },
  { label: "CT", value: "Connecticut" },
  { label: "DE", value: "Delaware" },
  { label: "FL", value: "Florida" },
  { label: "GA", value: "Georgia" },
  { label: "HI", value: "Hawaii" },
  { label: "ID", value: "Idaho" },
  { label: "IL", value: "Illinois" },
  { label: "IN", value: "Indiana" },
  { label: "IA", value: "Iowa" },
  { label: "KS", value: "Kansas" },
  { label: "KY", value: "Kentucky" },
  { label: "LA", value: "Louisiana" },
  { label: "ME", value: "Maine" },
  { label: "MD", value: "Maryland" },
  { label: "MA", value: "Massachusetts" },
  { label: "MI", value: "Michigan" },
  { label: "MN", value: "Minnesota" },
  { label: "MS", value: "Mississippi" },
  { label: "MO", value: "Missouri" },
  { label: "MT", value: "Montana" },
  { label: "NE", value: "Nebraska" },
  { label: "NV", value: "Nevada" },
  { label: "NH", value: "New Hampshire" },
  { label: "NJ", value: "New Jersey" },
  { label: "NM", value: "New Mexico" },
  { label: "NY", value: "New York" },
  { label: "NC", value: "North Carolina" },
  { label: "ND", value: "North Dakota" },
  { label: "OH", value: "Ohio" },
  { label: "OK", value: "Oklahoma" },
  { label: "OR", value: "Oregon" },
  { label: "PA", value: "Pennsylvania" },
  { label: "RI", value: "Rhode Island" },
  { label: "SC", value: "South Carolina" },
  { label: "SD", value: "South Dakota" },
  { label: "TN", value: "Tennessee" },
  { label: "TX", value: "Texas" },
  { label: "UT", value: "Utah" },
  { label: "VT", value: "Vermont" },
  { label: "VA", value: "Virginia" },
  { label: "WA", value: "Washington" },
  { label: "WV", value: "West Virginia" },
  { label: "WI", value: "Wisconsin" },
  { label: "WY", value: "Wyoming" }
];

const virtualOnlyOptions = [
  {label: "Yes", value: "Yes"},
  {label: "No", value: "No"}
]