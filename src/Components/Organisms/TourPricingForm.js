import React from "react";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import Button from "../Atoms/Button";
import TourCostCard from "./TourCostCard";
import TourDiscountCardList from "./TourDiscountCardList";
import TourDateDuration from "./TourDateDuration";

const TourPricingForm = () => {
  return (
    <div className="p-6 space-y-8 max-w-5xl mx-auto bg-white shadow-lg rounded-2xl">
      <TourCostCard />
      <TourDiscountCardList />
      <TourDateDuration />

      <div className="flex justify-between mt-6">
        <Button
          text={
            <span className="flex items-center space-x-2">
              <FaArrowLeft />
              <span>Previous</span>
            </span>
          }
          className="bg-gray-500 text-white hover:bg-gray-600 px-6 py-3 rounded-lg"
        />
        
        <Button
          text={
            <span className="flex items-center space-x-2">
              <span>Next</span>
              <FaArrowRight />
            </span>
          }
          className="bg-[#1D777D] text-white hover:bg-[#145b5f] px-6 py-3 rounded-lg"
        />
      </div>
    </div>
  );
};

export default TourPricingForm;