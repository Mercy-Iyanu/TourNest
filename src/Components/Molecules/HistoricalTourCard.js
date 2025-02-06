import React, { useState } from 'react';
import { FaHistory } from 'react-icons/fa'; // Historical icon

const HistoricalTourCard = ({ selected, handleSelection,borderClass }) => {

  return (
    <div className={`max-w-sm ${borderClass} border border-black rounded-lg overflow-hidden bg-white p-4`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2 mb-4">
          <FaHistory className="text-brown-500 text-xl" />
          <h2 className="font-semibold text-2xl">Historical</h2>
        </div>
        <input
          type="radio"
          checked={selected === 'historical'}
          onChange={() => handleSelection('historical')}
          className="form-radio text-blue-500"
        />
      </div>

      <p className="text-gray-600 text-sm">
        Immerse yourself in the fascinating history of Obudu through this historical tour. Visit iconic landmarks, ancient sites, and hear the captivating stories of the region's past. This tour is perfect for history buffs and culture enthusiasts alike.
      </p>
    </div>
  );
};

export default HistoricalTourCard;