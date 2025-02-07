import React from "react";
import TourDate from "../Molecules/TourDate";

const TourDuration = () => {
  return (
    <div className="max-w-2xl mx-auto">
      <label className="block text-sm font-semibold text-gray-800 mb-2">
        Tour Duration
      </label>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Start Date */}
        <TourDate label="Start Date" />
        {/* End Date */}
        <TourDate label="End Date" />
      </div>
    </div>
  );
};

export default TourDuration;
