import React from "react";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import Button from "../shared/Button";
import TourCostCard from "./discount-card/TourCostCard";
import TourDiscountCardList from "./discount-card/TourDiscountCardList";
import TourDateDuration from "./date-duration/TourDateDuration";

const TourPricingForm = () => {
  return (
    <div className="p-6 space-y-8 max-w-5xl mx-auto">
      <TourCostCard />
      <TourDiscountCardList />
      <TourDateDuration />
    </div>
  );
};

export default TourPricingForm;