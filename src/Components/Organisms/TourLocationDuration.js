import React from "react";
import TourMainLocation from "../Molecules/TourMainLocation";
import TourLocationState from "../Molecules/TourLocationState";
import TourDuration from "./TourDuration ";

const TourLocationDuration = () => {
  return (
    <div className="flex flex-wrap gap-6">
      {/* Main Location */}
      <TourMainLocation />
      
      {/* State and Country */}
      <TourLocationState />
      
      {/* Duration */}
      <TourDuration />
    </div>
  );
};

export default TourLocationDuration;
