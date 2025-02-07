import React, { useState } from "react";
import TourItineraryCard from "./TourItineraryCard";
import Button from "../Atoms/Button";
import { FaArrowRight } from "react-icons/fa";

const TourItineraryForm = () => {
  const [itineraries, setItineraries] = useState([{ id: 1 }]);

  const addNewItinerary = () => {
    setItineraries([...itineraries, { id: Date.now() }]);
  };

  const removeItinerary = (id) => {
    setItineraries(itineraries.filter((itinerary) => itinerary.id !== id));
  };

  return (
    <div className="p-6 space-y-8 max-w-9xl mx-auto">
      <TourItineraryCard />

      {itineraries.slice(1).map((itinerary) => (
        <div key={itinerary.id} className="relative">
          <TourItineraryCard />
          <div className="flex justify-end mt-2">
            <Button
              text="Delete"
              className="bg-red-600 hover:bg-red-500"
              onClick={() => removeItinerary(itinerary.id)}
            />
          </div>
        </div>
      ))}
        <div className="flex justify-end gap-6 mt-6">
        <Button text="Add New Itinerary" onClick={addNewItinerary} />
        <Button
          text={
            <span className="flex items-center space-x-2">
              <span>Next</span>
              <FaArrowRight />
            </span>
          }
          className="border border-[#1D777D] text-black hover:bg-[#145b5f] px-6 py-3"
        />
      </div>
    </div>
  );
};

export default TourItineraryForm;
