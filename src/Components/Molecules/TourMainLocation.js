import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";

const TourMainLocation = () => {
  return (
    <div className="w-full max-w-sm">
      {/* Label */}
      <label className="block text-gray-700 font-semibold mb-2">
        Main location or city where the tour operates
        <span className="text-red-500 ml-1">*</span>
      </label>

      {/* Input Container */}
      <div className="flex items-center bg-white border rounded-lg px-3 py-2 shadow-sm focus-within:border-[#1D777D] focus-within:ring-1 focus-within:ring-[#1D777D]">
        <FaMapMarkerAlt className="text-gray-500 mr-2" />
        <input
          type="text"
          placeholder="e.g Zanzibar"
          className="w-full outline-none bg-transparent placeholder-gray-400 text-sm"
        />
      </div>
    </div>
  );
};

export default TourMainLocation;
