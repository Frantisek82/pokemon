import React, { useEffect, useState } from "react";

interface Props {
  locationName?: string;
  resetRegionSelection: () => void;
  resetLocationSelection: () => void;
}

interface LocationDetailData {
  names: string[];
  generations: string[];
}

const LocationDetail: React.FC<Props> = (props) => {
  const [locationDetails, setLocationDetails] = useState<LocationDetailData>();

  useEffect(() => {
    if (props.locationName) {
      fetch(`https://pokeapi.co/api/v2/location/${props.locationName}`)
        .then((res) => res.json())
        .then((data) =>
          setLocationDetails({
            names: data.names.map((item: any) => item.name),
            generations: data.game_indices.map(
              (item: any) => item.generation.name
            ),
          })
        );
    }
  }, [props.locationName]);

  return (
    <div style={{ border: "1px solid green" }}>
      <h1>Details</h1>
      <ul>
        <p>{locationDetails?.names.join(", ")}</p>
        <p>{locationDetails?.generations.join(", ")}</p>
      </ul>
      <button
        onClick={() => {
          props.resetLocationSelection();
          props.resetRegionSelection();
          setLocationDetails(undefined);
        }}
      >
        Reset
      </button>
    </div>
  );
};

export default LocationDetail;
