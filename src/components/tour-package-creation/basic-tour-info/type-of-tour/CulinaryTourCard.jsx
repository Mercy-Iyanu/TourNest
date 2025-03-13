import React, { useState } from 'react';
import { FaUtensils } from 'react-icons/fa'; // Culinary icon

const CulinaryTourCard = ({ selected, handleSelection,borderClass }) => {

  return (
    <div className={`max-w-sm ${borderClass} border border-black rounded-lg overflow-hidden shadow-lg bg-white p-4`}>
      {/* Header Section */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2 mb-4">
          <FaUtensils className="text-yellow-500 text-xl" />
          <h2 className="font-semibold text-2xl">Culinary</h2>
        </div>
        <input
          type="radio"
          checked={selected === 'culinary'}
          onChange={() => handleSelection('culinary')}
          className="form-radio text-blue-500"
        />
      </div>

      {/* Summary Section */}
      <p className="text-gray-600 text-sm">
        Embark on a flavorful culinary tour in Obudu, exploring the rich and diverse food culture. Taste authentic local delicacies, learn traditional cooking techniques, and indulge in a one-of-a-kind gastronomic adventure.
      </p>
    </div>
  );
};

export default CulinaryTourCard;
