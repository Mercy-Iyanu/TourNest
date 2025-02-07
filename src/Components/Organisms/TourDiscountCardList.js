import React from "react";
import Button from "../Atoms/Button";
import TourDiscountCard from "../Molecules/TourDiscountCard";

const TourDiscountCardList = () => {
  const discountLabels = [
    { label: "<5 People" },
    { label: "5 to 10 People" },
    { label: ">10 People" },
  ];

  const handleSave = () => {
    // Logic to handle saving the discount values
    console.log("Discount values saved!");
  };

  return (
    <div className="space-y-6">
        <label className="block text-gray-700 font-semibold mb-2">
        Discounts available for group sizes or advance bookings
        <span className="text-red-500 ml-1">*</span>
      </label>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {discountLabels.map((discount, index) => (
          <TourDiscountCard key={index} label={discount.label} />
        ))}
      </div>
      <div className="flex justify-end mt-4">
        <Button text="Save" onClick={handleSave} className="px-6 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-md" />
      </div>
    </div>
  );
};

export default TourDiscountCardList;
