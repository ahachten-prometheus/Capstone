"use client";

import { useEffect, useState } from "react";
import { fetchHighlightedResources, fetchResources } from "@/components/adapter";
import ResourceTiles from "@/components/ResourceTiles";
import ResourceTileGrid from "./ResourceTileGrid";

export default function TestResources() {
  const [highlighted, setHighlighted] = useState([]);
  const [active, setActive] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchResources();
        console.log({data})

        // setHighlighted(highlightedData.records);
        // console.log(highlightedData.records)
        if (data) setActive(data.records);
      } catch (err) {
        setError(err.message);
      }
    }

    fetchData();
  }, []);

  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="space-y-8 p-4">
      <section>
        <h2 className="text-xl font-bold mb-2">🌟 Highlighted Resources</h2>
        <div className="grid grid-cols-4 gap-4">
          {highlighted.length > 0 ? (
            highlighted.map((resource) => (
              <ResourceTiles key={resource.id} prop={resource} />
            ))
          ) : (
            <p>Loading highlighted...</p>
          )}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-2">✅ Active Resources</h2>
          {active?.length > 0 ? (
            <ResourceTileGrid resources={active} />
          ) : (
            <p>Loading active...</p>
          )}
      </section>
    </div>
  );
}

