import React from "react";
import TourActivityLocation from "../Molecules/TourActivityLocation";
import TourActivityStartTime from "../Molecules/TourActivityStartTime";
import TourActivityEndTime from "../Molecules/TourActivityEndTime";

const TourItineraryTime = () => {
  return (
    <div className="flex flex-wrap gap-6">
      <TourActivityLocation />
      
      <TourActivityStartTime />
      
      <TourActivityEndTime />
    </div>
  );
};

export default TourItineraryTime;
