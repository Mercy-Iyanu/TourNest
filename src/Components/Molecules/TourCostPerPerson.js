import React from 'react';
import { FaMoneyCheck } from 'react-icons/fa';

const TourCostPerPerson = () => {
  return (
    <div className="mb-6">
      <label className="font-semibold text-lg block mb-2">
      Cost per person <span className="text-red-500">*</span>
      </label>
      <div className="relative">
        <input
          type="text"
          placeholder="e.g 89,500"
          className="w-full p-3 pl-10 rounded-md border border-gray-300 focus:ring-2 focus:ring-[#1D777D] focus:outline-none text-base"
        />
        <FaMoneyCheck className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
      </div>
    </div>
  );
};

export default TourCostPerPerson;