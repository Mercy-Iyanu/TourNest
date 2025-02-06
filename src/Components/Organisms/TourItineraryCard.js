import React from "react";
import TourDayNumber from "../Molecules/TourDayNumber";
import TourActivityTitle from "../Molecules/TourActivityTitle";
import TourActivityDescription from "./TourActivityDescription";
import TourItineraryTime from "./TourItineraryTime";

const TourItineraryCard = () => {
  return (
    <div className="p-6 space-y-8 max-w-9xl mx-auto">
      <TourDayNumber />
      <TourActivityTitle />
      <TourActivityDescription />
      <TourItineraryTime />
      <hr className="border border-grey rounded-lg" />
    </div>
  );
};

export default TourItineraryCard;