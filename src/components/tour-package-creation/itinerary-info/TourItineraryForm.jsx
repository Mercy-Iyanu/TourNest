import React, { useState } from "react";
import TourDayNumber from "./TourDayNumber";
import TourActivityTitle from "./TourActivityTitle";
import TourActivityDescription from "./TourActivityDescription";
import TourItineraryTime from "./TourItineraryTime";

const TourItineraryForm = () => {
  const [itineraries, setItineraries] = useState([{ id: 1 }]);

  const addNewItinerary = () => {
    setItineraries([...itineraries, { id: Date.now() }]);
  };

  const removeItinerary = (id) => {
    setItineraries(itineraries.filter((itinerary) => itinerary.id !== id));
  };

  return (
    <div className="p-6 max-w-screen-lg mx-auto">
        <TourDayNumber />
        <TourActivityTitle />
        <TourActivityDescription />
        <TourItineraryTime />
    </div>
  );
};

export default TourItineraryForm;