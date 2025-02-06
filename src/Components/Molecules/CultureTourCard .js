import React, { useState } from 'react';
import { FaRegBuilding } from 'react-icons/fa'; 

const CultureTourCard = ({ selected, handleSelection,borderClass }) => {
  return (
    <div className={`max-w-sm ${borderClass} border border-black rounded-lg overflow-hidden bg-white p-4`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2 mb-4">
          <FaRegBuilding className="text-blue-500 text-xl" />
          <h2 className="font-semibold text-2xl">Cultural</h2>
        </div>
        <input
          type="radio"
          checked={selected === 'cultural'}
          onChange={() => handleSelection('cultural')}
          className="form-radio text-blue-500"
        />
      </div>

      <p className="text-gray-600 text-sm">
        Discover the rich history and vibrant culture of Obudu with this immersive cultural tour. Explore local heritage sites, interact with indigenous communities, and experience the traditions and customs that make the region unique.
      </p>
    </div>
  );
};

export default CultureTourCard;