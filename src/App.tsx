import React, { useEffect, useState } from "react";
import Locations from "./components/Locations";

interface RegionsData {
  count: string;
  next: string;
  previous: string | null;
  results: RegionResult[];
}

interface RegionResult {
  name: string;
  url: string;
}

function App() {
  const [regions, setRegions] = useState<RegionResult[]>([]);
  const [selectedRegionName, setSelectedRegionName] = useState<string>();

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/region")
      .then((res) => res.json())
      .then((data: RegionsData) => setRegions(data.results));
  }, []);

  const resetRegionSelection = () => {
    setRegions([]);
    setSelectedRegionName(undefined);
  };

  return (
    <div>
      <div style={{ display: "flex", border: "1px solid red" }}>
        <ul>
          {regions.map((region) => (
            <li key={region.name}>
              <button onClick={() => setSelectedRegionName(region.name)}>
                {region.name}
              </button>
            </li>
          ))}
        </ul>

        <Locations
          regionName={selectedRegionName}
          resetRegionSelection={resetRegionSelection}
        />
      </div>
    </div>
  );
}

export default App;
