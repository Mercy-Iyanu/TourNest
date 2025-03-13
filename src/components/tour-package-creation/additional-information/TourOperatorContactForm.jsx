import React from "react";
import { FaUser, FaPhone, FaEnvelope } from "react-icons/fa";

const TourOperatorContactForm = () => {
  return (
    <div className="mx-auto bg-white">

      <div className="mb-4 flex items-center border p-3 rounded-lg">
        <FaUser className="text-gray-500 mr-3" />
        <input
          type="text"
          placeholder="e.g. Noah Nnamdi"
          className="w-full outline-none text-gray-700 placeholder-gray-400"
        />
      </div>

      <div className="flex gap-4">
        <div className="flex-1 flex items-center border p-3 rounded-lg">
          <FaPhone className="text-gray-500 mr-3" />
          <input
            type="tel"
            placeholder="e.g. 0706 0000 000"
            className="w-full outline-none text-gray-700 placeholder-gray-400"
          />
        </div>

        <div className="flex-1 flex items-center border p-3 rounded-lg">
          <FaEnvelope className="text-gray-500 mr-3" />
          <input
            type="email"
            placeholder="e.g. noah_nnamdi@gmail.com"
            className="w-full outline-none text-gray-700 placeholder-gray-400"
          />
        </div>
      </div>
      <hr className="mt-6"/>
    </div>
  );
};

export default TourOperatorContactForm;