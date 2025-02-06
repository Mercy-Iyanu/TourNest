import React, { useState } from 'react';
import AdventureTourCard from '../Molecules/AdventureTourCard';
import CultureTourCard from '../Molecules/CultureTourCard ';
import HistoricalTourCard from '../Molecules/HistoricalTourCard';
import CulinaryTourCard from '../Molecules/CulinaryTourCard';

const TourCardList = () => {
  const [selected, setSelected] = useState(null); 

  const handleSelection = (id) => {
    setSelected(id);
  };

  return (
    <div className="p-6 border-4 border-[#1D777D] rounded-lg mb-4">
      <div className="mb-4 text-xl font-semibold">
        <span>Type of Tour</span>
        <span className="text-red-500 ml-1">*</span>
      </div>

      <div className="flex space-x-4 overflow-x-auto">
        <AdventureTourCard selected={selected} handleSelection={handleSelection} borderClass={selected === 'adventure' ? 'border-4 border-[#1D777D]' : ''}/>

        <CultureTourCard selected={selected} handleSelection={handleSelection} borderClass={selected === 'cultural' ? 'border-4 border-[#1D777D]' : ''}/>

        <HistoricalTourCard selected={selected} handleSelection={handleSelection} borderClass={selected === 'historical' ? 'border-4 border-[#1D777D]' : ''}/>

        <CulinaryTourCard selected={selected} handleSelection={handleSelection} borderClass={selected === 'culinary' ? 'border-4 border-[#1D777D]' : ''}/>
      </div>
    </div>
  );
};

export default TourCardList;
