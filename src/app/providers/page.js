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

  const mockData = [
    { id: 1, name: "name1", practice: "something1", state: "", isVirtual: "" },
    { id: 2, name: "name2", practice: "something2", state: "NY", isVirtual: "Yes" },
    { id: 3, name: "name3", practice: "something3", state: "NY", isVirtual: "No" },
    { id: 4, name: "name4", practice: "something4", state: "HI", isVirtual: "Yes" }
  ];

  // have what the user selects here, filter what provider tiles are shown 
  const handleStateChange = (event) => {
    setState(event.target.value);
  }

  const handleModeChange = (event) => {
    setMode(event.target.value);
  }

  return <>
    {/* hero header */}
    <h1>Providers</h1> 

    <main>
      {/* above the tiles section */}
      <h3>Find a Provider</h3>
      <section id="providers-filters">
        <p>State:</p>
        <select id="provider-state" onChange={handleStateChange} aria-labelledby="filtering-state">
          <option value="--Select a State--" selected>--Select a State--</option>
          { usStates.map((state) => <option value={state}>{state}</option>) }
        </select>
        <p id="test">You selected this state: {selectedState}</p>
        
        <select id="provider-mode" onChange={handleModeChange} aria-labelledby="filtering-mode">
          <p>Virtual Only?:</p>
          <option value="--Select a Mode--" selected>--Select a Mode--</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
        <p id="test">You selected this mode: {selectedMode}</p>
      </section>
      
      {/* tiles section */}
      {/* next: filtering this */}
      <section id="providers-display">
        { mockData.map((data) => {
          return (
            <ul>
              <li>{data.name}</li>
              <li>{data.practice}</li>
              <li>{data.state}</li>
              <li>{data.isVirtual}</li>
            </ul>
          )
        }) }
      </section>

      {/* next: load more providers using this button */}
      <button id="more-providers">Load More</button>
    </main>

  </>;
}