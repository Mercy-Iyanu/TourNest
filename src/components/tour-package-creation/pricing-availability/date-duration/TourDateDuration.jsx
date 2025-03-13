import React from "react";
import TourDate from "./TourDate";

const TourDateDuration = () => {
  return (
    <div className="max-w-2xl mx-auto ">
      <label className="block text-sm font-semibold text-gray-800 mb-2">
        Tour Duration <span className="text-red-500">*</span>
      </label>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TourDate label="Start Date" />
        <TourDate label="End Date" />
      </div>
    </div>
  );
};

export default TourDateDuration;