"use client";
import { useState } from "react";

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
    <h1 id="providers-hero-header">Providers</h1> 

    <main>
      {/* above the tiles section */}
      {/* next: clear selections option */}
      <h3 id="providers-tiles-header">Find a Provider</h3>
      <section id="providers-filters">
        {/* <p>State:</p> */}
        <select id="provider-state" defaultValue="blank-state-opt"onChange={handleStateChange} aria-labelledby="filtering-state">
          <option key="blank-state-opt" value="blank-state-opt" disabled>State?</option>
          { usStates.map((state) => <option key={`${state}-option`} value={state}>{state}</option>) }
        </select>
        {/* <p id="test">You selected this state: {selectedState}</p> */}
        
        {/* <p>Virtual Only?:</p> */}
        <select id="provider-mode" defaultValue="blank-mode-opt" onChange={handleModeChange} aria-labelledby="filtering-mode">
          <option key="blank-mode-opt" value="blank-mode-opt" disabled>Virtual Only?</option>
          <option key="yes-opt" value="Yes">Yes</option>
          <option key="no-opt" value="No">No</option>
        </select>
        {/* <p id="test">You selected this mode: {selectedMode}</p> */}
      </section>
      
      {/* tiles section */}
      {/* next: filtering this */}
      <section id="providers-display"></section>

      {/* next: load more providers using this button */}
      <button id="more-providers">Load More</button>
    </main>

  </>;
}