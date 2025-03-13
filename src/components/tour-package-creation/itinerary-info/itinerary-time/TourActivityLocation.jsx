import React from "react";
import Select from "react-select";
import { FaMapMarkerAlt } from "react-icons/fa";

const TourActivityLocation = ({ locations, activityLocation, setActivityLocation }) => {
  return (
    <div className="w-full max-w-sm">
      <label className="block text-gray-700 font-semibold mb-2">
        Select Activity Location
      </label>
      <div className="flex items-center bg-white border rounded-lg px-3 py-2 shadow-sm">
        <FaMapMarkerAlt className="text-gray-500 mr-2" />
        <Select
          options={locations}
          value={locations.find((loc) => loc.value === activityLocation)}
          onChange={(selected) => setActivityLocation(selected?.value || "")}
          placeholder="Select a city or tourist spot"
          className="w-full"
          isDisabled={locations.length === 0}
        />
      </div>
    </div>
  );
};

export default TourActivityLocation;