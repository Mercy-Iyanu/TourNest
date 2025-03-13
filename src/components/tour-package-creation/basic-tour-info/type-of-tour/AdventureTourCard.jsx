import React, { useState } from 'react';
import { FaHiking } from 'react-icons/fa';

const AdventureTourCard = ({ selected, handleSelection, borderClass }) => {

  return (
    <div className={`max-w-sm ${borderClass} border border-black rounded-lg overflow-hidden shadow-lg bg-white p-4`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2 mb-4">
          <FaHiking className="text-green-500 text-xl" />
          <h2 className="font-semibold text-2xl">Adventure</h2>
        </div>
        <input
          type="radio"
          checked={selected === 'adventure'}
          onChange={() => handleSelection('adventure')}
          className="form-radio text-blue-500"
        />
      </div>
      
      <p className="text-gray-600 text-sm">
        Embark on an exhilarating adventure in Obudu, surrounded by rich natural
        vegetation and a picturesque view. The tour offers an unforgettable
        experience for those seeking a thrilling outdoor escapade, perfect for
        nature enthusiasts and adventurers alike.
      </p>
    </div>
  );
};

export default AdventureTourCard;
