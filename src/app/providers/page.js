'use client';
import { useState } from "react";
import ProvidersContainer from "@/components/ProvidersContainer";

export default function Providers() {
  const [selectedState, setState] = useState("");
  const [selectedMode, setMode] = useState("");

  const usStates = [
    "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
    "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
    "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
    "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
    "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"
  ];

  // for testing - making sure we can grab the selection value(s) from user
  const handleStateChange = (event) => {
    setState(event.target.value);
  }

  const handleModeChange = (event) => {
    setMode(event.target.value);
  }

  return <>
    {/* hero header */}
    <section
      className="
      w-screen
      w-[1440px] h-[407px]
      flex items-center justify-center"
      style={{ backgroundColor: '#C96C86B0' }}>
      <h1 id="providers-hero-header" className="text-4xl font-bold text-white">Providers</h1>
    </section>

    <main
      className="
      text-black
      flex flex-col items-center justify-center"
      style={{ backgroundColor: '#FFF5EA' }}>

      {/* above the tiles section */}
      {/* next: clear selections option */}
      <h3 id="providers-tiles-header"
        className="
      w-4/5 mx-auto
      border-b-1 border-black
      text-2xl font-bold text-black
      flex justify-center
      pt-8">
        Find a Provider</h3>

      <section
        id="providers-filters"
        className="
      flex justify-between
      pt-2 pb-8
      space-x-4">
        <select
          id="provider-state"
          className="
        bg-white hover:bg-[#C96C86B0]
        text-black
        py-2 px-4 rounded-full"
          defaultValue="blank-state-opt"
          onChange={handleStateChange}
          aria-labelledby="filtering-state">
          <option key="blank-state-opt" value="blank-state-opt" disabled>State?</option>
          {usStates.map((state) => <option key={`${state}-option`} value={state}>{state}</option>)}
        </select>
        {/* <p id="test">You selected this state: {selectedState}</p> */}

        <select
          id="provider-mode"
          className="
        bg-white hover:bg-[#C96C86B0]
        text-black
        py-2 px-4 rounded-full"
          defaultValue="blank-mode-opt"
          onChange={handleModeChange}
          aria-labelledby="filtering-mode">
          <option key="blank-mode-opt" value="blank-mode-opt" disabled>Virtual Only?</option>
          <option key="yes-opt" value="Yes">Yes</option>
          <option key="no-opt" value="No">No</option>
        </select>
        {/* <p id="test">You selected this mode: {selectedMode}</p> */}
      </section>

      {/* tiles section */}
      {/* next: filtering this */}
      <ProvidersContainer
        id="providers-display"
        className="pt-10 pb-10 pl-130 pr-130" />
    </main>

  </>;
}