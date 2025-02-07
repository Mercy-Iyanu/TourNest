import React, {useState} from 'react';
import TourItineraryForm from '../Organisms/TourItineraryForm';
import TourCostPerPerson from '../Molecules/TourCostPerPerson';
import TourCurrencyDropdown from '../Molecules/TourCurrencyDropdown';
import TourCostCard from '../Organisms/TourCostCard';
import TourDiscountCard from '../Molecules/TourDiscountCard';
import TourDiscountCardList from '../Organisms/TourDiscountCardList';
import TourDuration from '../Organisms/TourDuration';

const TourInventoryPage = () => {

  return (
    <div className="container mx-auto p-6">
      <TourDuration />
    </div>
  );
};

export default TourInventoryPage;