'use client';
import { useState } from "react";
import ProvidersContainer from "@/components/ProvidersContainer";
import debounce from "lodash.debounce";

export default function Providers() {
  const [selectedState, setState] = useState("");
  const [selectedMode, setMode] = useState("");
  const [name, setName] = useState("");
  const [query, setQuery] = useState({
    name : null,
    virtualOnly: null,
    state: null,
    isNew: true
  });

  const usStates = {
    AL: "Alabama",
    AK: "Alaska",
    AZ: "Arizona",
    AR: "Arkansas",
    CA: "California",
    CO: "Colorado",
    CT: "Connecticut",
    DE: "Delaware",
    FL: "Florida",
    GA: "Georgia",
    HI: "Hawaii",
    ID: "Idaho",
    IL: "Illinois",
    IN: "Indiana",
    IA: "Iowa",
    KS: "Kansas",
    KY: "Kentucky",
    LA: "Louisiana",
    ME: "Maine",
    MD: "Maryland",
    MA: "Massachusetts",
    MI: "Michigan",
    MN: "Minnesota",
    MS: "Mississippi",
    MO: "Missouri",
    MT: "Montana",
    NE: "Nebraska",
    NV: "Nevada",
    NH: "New Hampshire",
    NJ: "New Jersey",
    NM: "New Mexico",
    NY: "New York",
    NC: "North Carolina",
    ND: "North Dakota",
    OH: "Ohio",
    OK: "Oklahoma",
    OR: "Oregon",
    PA: "Pennsylvania",
    RI: "Rhode Island",
    SC: "South Carolina",
    SD: "South Dakota",
    TN: "Tennessee",
    TX: "Texas",
    UT: "Utah",
    VT: "Vermont",
    VA: "Virginia",
    WA: "Washington",
    WV: "West Virginia",
    WI: "Wisconsin",
    WY: "Wyoming"
  };

  const handleChange = (event) => {
    const id = event.target.id;
    const value = event.target.value;
    if (id === "provider-name-input") {
        setName(value);
        setQuery((prev) => ({
          ...prev,
          name: value || null,
      }));
    } 
    if (id === "provider-state") {
        setState(value);
        setQuery((prev) => ({
          ...prev,
          state: value || null,
      }));
    } 
    if (id === "provider-mode") {
        setMode(value);
        setQuery((prev) => ({
          ...prev,
          virtualOnly: value || null,
      }));
    }
  }

  const debounceChange = debounce(handleChange, 400);

  return <>
    {/* hero header */}
    <section 
      className="w-screen h-[407px] flex flex-col items-center justify-center"
      style={{ backgroundColor: '#C96C86B0' }}
    >
      <h1 id="providers-hero-header" className="text-4xl font-bold text-white">Providers</h1>
    </section>

    {/* below hero header: h3 header, filters section, tiles section */}
    <main 
      className="text-black pb-12 flex flex-col items-center justify-center"
      style={{ backgroundColor: '#FFF5EA' }}
    >
      {/* header - above the tiles section */}
      {/* next: add an option to clear selections */}
      <h3 
        id="providers-tiles-header"
        className="text-2xl font-bold text-black w-4/5 mx-auto pt-8 border-b-1 border-black flex justify-center"
      >
        Find a Provider
      </h3>

      {/* filters section */}
      <form
        id="providers-filters"
        className="w-full max-w-screen-lg px-4 py-6 flex flex-col sm:flex-row gap-4 pb-10 justify-center items-center"
      >
        <div id="provider-name-field">
          <label htmlFor="provider-name-input" className="sr-only">Search Provider</label>
          <input 
            id="provider-name-input"
            type="text"
            className="bg-white hover:bg-[#DCAD27] text-black py-2 px-4 rounded-full"
            onChange={debounceChange}
            placeholder="Name"
          />
        </div>

        <div id="provider-state-mode-fields">
          <label htmlFor="provider-state" className="sr-only">Provider State</label>
          <select
            id="provider-state"
            className="bg-white hover:bg-[#DCAD27] text-black py-2 px-4 mr-4 rounded-full"
            defaultValue="blank-state-opt"
            onChange={debounceChange}
            aria-labelledby="filtering-state"
          >
            <option key="blank-state-opt" value="blank-state-opt" disabled>State?</option>
            {Object.keys(usStates).map((abbr) => <option key={`${abbr}-option`} value={usStates[abbr]}>{abbr}</option>)}
          </select>

          <label htmlFor="provider-mode" className="sr-only">Provider Mode</label>
          <select
            id="provider-mode"
            className="bg-white hover:bg-[#DCAD27] text-black py-2 px-4 rounded-full"
            defaultValue="blank-mode-opt"
            onChange={debounceChange}
            aria-labelledby="filtering-mode"
          >
            <option key="blank-mode-opt" value="blank-mode-opt" disabled>Virtual Only?</option>
            <option key="yes-opt" value="Yes">Yes</option>
            <option key="no-opt" value="No">No</option>
          </select>
        </div>
      </form>

      {/* tiles section */}
      <ProvidersContainer id="providers-display" query={query} />
    </main>
  </>
}