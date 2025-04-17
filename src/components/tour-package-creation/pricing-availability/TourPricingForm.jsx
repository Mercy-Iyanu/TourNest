import React, {useState} from "react";
import TourCostPerPerson from './TourCostPerPerson'
import TourDiscountCardList from "./TourDiscountCardList";
import TourDateDuration from "./TourDateDuration";
import TourCurrencyDropdown from "./TourCurrencyDropdown";

/**
 * The TourPricingForm component in JavaScript React manages form data for tour pricing including cost
 * per person, currency, discounts, and availability.
 * @returns The `TourPricingForm` component is being returned. It contains various child components
 * such as `TourCostPerPerson`, `TourCurrencyDropdown`, `TourDiscountCardList`, and `TourDateDuration`.
 * These child components receive props and functions to update the form data based on user input. The
 * main component manages the form data state and passes down the necessary functions to handle updates
 * for different fields like
 */
 const TourPricingForm = ({formData, setFormData}) => {

  const updateField = (field, value) => {
    setFormData({ [field]: value });
  };

  const updateDiscount = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      discount: {
        ...prev.discount,
        [field]: value,
      },
    }));
  };

  const updateAvailability = (value) => {
    setFormData((prev) => ({
      ...prev,
      availability: value,
    }));
  };

  return (
    <div className="p-6 space-y-8 max-w-5xl mx-auto">
      <TourCostPerPerson 
        value={formData?.pricePerPerson || ''}
        onChange={(val) => updateField('pricePerPerson', val)}
      />
      <TourCurrencyDropdown 
        currency={formData?.currency || ''}
        onChange={(val) => updateField('currency', val)}
      />
      <TourDiscountCardList 
        data={formData?.discount || ''}
        onChange={updateDiscount}
      />
      <TourDateDuration 
        availability={formData?.availability || []}
        onChange={updateAvailability}
      />
    </div>
  );
};

export default TourPricingForm;