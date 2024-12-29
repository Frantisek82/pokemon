import React, { useEffect, useState } from "react";
import LocationDetail from "./LocationDetail";

interface Props {
  regionName?: string;
  resetRegionSelection: () => void;
}

interface Location {
  name: string;
  url: string;
}

interface RegionData {
  locations: Location[];
}

const Locations: React.FC<Props> = (props) => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [selectedLocationName, setSelectedLocationName] = useState<string>();

  useEffect(() => {
    if (props.regionName) {
      fetch(`https://pokeapi.co/api/v2/region/${props.regionName}`)
        .then((res) => res.json())
        .then((data: RegionData) => setLocations(data.locations));
    }
  }, [props.regionName]);

  const resetLocationSelection = () => {
    setLocations([]);
    setSelectedLocationName(undefined);
  };

  return (
    <div style={{ display: "flex", border: "1px solid blue" }}>
      <h1>Locations</h1>
      <ul>
        {locations.map((location) => (
          <li key={location.name}>
            <button onClick={() => setSelectedLocationName(location.name)}>
              {location.name}
            </button>
          </li>
        ))}
      </ul>
      <LocationDetail
        locationName={selectedLocationName}
        resetLocationSelection={resetLocationSelection}
        resetRegionSelection={props.resetRegionSelection}
      />
    </div>
  );
};

export default Locations;
