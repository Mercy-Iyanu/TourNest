import React from "react";
import TourCostPerPerson from './TourCostPerPerson'
import TourDiscountCardList from "./TourDiscountCardList";
import TourDateDuration from "./TourDateDuration";
import TourCurrencyDropdown from "./TourCurrencyDropdown";

const TourPricingForm = () => {
  return (
    <div className="p-6 space-y-8 max-w-5xl mx-auto">
      <TourCostPerPerson />
      <TourCurrencyDropdown />
      <TourDiscountCardList />
      <TourDateDuration />
    </div>
  );
};

export default TourPricingForm;