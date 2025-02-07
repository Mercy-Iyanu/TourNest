import React from "react";

const TourDiscountCard = ({ label }) => {
  return (
    <div className="max-w-sm border border-black rounded-lg overflow-hidden shadow-lg bg-white p-4">
      <h2 className="text-sm font-semibold text-gray-800 mb-4">
        Tour Discount ({label})
      </h2>
      <div className="flex items-center space-x-4">
        <label htmlFor={`discount-${label}`} className="text-gray-700">
          Discount Percentage:
        </label>
        <input
          id={`discount-${label}`}
          type="number"
          min="0"
          max="100"
          placeholder="Enter %"
          className="border border-gray-300 rounded-lg px-3 py-2 w-24 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1D777D]"
        />
        <span className="text-gray-600">%</span>
      </div>
    </div>
  );
};

export default TourDiscountCard;
