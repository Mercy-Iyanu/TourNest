import React from 'react';
import { FaEnvelopeOpenText, FaSortNumericDown } from 'react-icons/fa';

const TourActivityTitle = () => {
  return (
    <div className="mb-6">
      <label className="font-semibold text-lg block mb-2">
      Title of the activity for the day <span className="text-red-500">*</span>
      </label>
      <div className="relative">
        <input
          type="text"
          placeholder="e.g Registration and setting out to the cattle ranch"
          className="w-full p-3 pl-10 rounded-md border border-gray-300 focus:ring-2 focus:ring-[#1D777D] focus:outline-none text-base"
        />
        <FaEnvelopeOpenText className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
      </div>
    </div>
  );
};

export default TourActivityTitle;