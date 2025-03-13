import React from "react";
import Select from "react-select";
import { State, City } from "country-state-city";

const TourLocationState = ({ country, state, setState, setLocations }) => {
  const states = State.getStatesOfCountry(country).map((s) => ({
    value: s.isoCode,
    label: s.name,
  }));

  const handleStateChange = (selected) => {
    setState(selected?.value || "");

    // Load cities
    const cities = City.getCitiesOfState(country, selected?.value || "").map((c) => ({
      value: c.name,
      label: c.name,
    }));

    // Mock Tourist Locations (Replace with API if needed)
    const touristSpots = [
      { value: "Beach Resort", label: "Beach Resort" },
      { value: "National Park", label: "National Park" },
      { value: "Waterfall", label: "Waterfall" },
    ];

    setLocations([...cities, ...touristSpots]); // Combine cities and tourist spots
  };

  return (
    <div className="w-full max-w-sm">
      <label className="block text-gray-700 font-semibold mb-2">Select State</label>
      <Select
        options={states}
        value={states.find((s) => s.value === state)}
        onChange={handleStateChange}
        placeholder="Choose a state"
        className="w-full"
        isDisabled={!country}
      />
    </div>
  );
};

export default TourLocationState;