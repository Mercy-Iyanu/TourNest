import React from "react";
import { FaUsers } from "react-icons/fa";

const NumberOfParticipants = () => {
  return (
    <div className="mb-6 flex gap-6">
      <div className="mb-4">
        <label className="font-semibold text-sm block mb-2">
          Minimum No. of Participants <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <input
            type="number"
            placeholder="e.g 5"
            className="w-full p-3 pl-10 rounded-md border border-gray-300 focus:ring-2 focus:ring-[#1D777D] focus:outline-none text-base"
          />
          <FaUsers className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </div>
      </div>

      <div>
        <label className="font-semibold text-sm block mb-2">
          Maximum No. of Participants <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <input
            type="number"
            placeholder="e.g 20"
            className="w-full p-3 pl-10 rounded-md border border-gray-300 focus:ring-2 focus:ring-[#1D777D] focus:outline-none text-base"
          />
          <FaUsers className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </div>
      </div>
    </div>
  );
};

export default NumberOfParticipants;
