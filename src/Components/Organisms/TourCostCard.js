import React from "react";
import TourCostPerPerson from "../Molecules/TourCostPerPerson";
import TourCurrencyDropdown from "../Molecules/TourCurrencyDropdown";

const TourCostCard = () => {
  return (
    <div className="flex items-center space-x-4">
      <div className="w-1/2">
        <TourCostPerPerson />
      </div>

      <div className="w-1/2">
        <TourCurrencyDropdown />
      </div>

      <div className="flex items-center space-x-2">
        <input type="checkbox" id="availability" className="h-5 w-5" />
        <label htmlFor="availability" className="text-gray-700">
          Availability
        </label>
      </div>
    </div>
  );
};

export default TourCostCard;
