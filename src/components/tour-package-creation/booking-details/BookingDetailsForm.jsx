import React, {useState} from "react";
import TourCancellationTerms from "./TourCancellationTerms";
import NumberOfParticipants from "./NumberOfParticipants";
import PaymentMethodSelector from "./TourPaymentMode";

const BookingDetailsForm = ({formData, setFormData}) => {

  const updateFormData = (field, value) => {
    setFormData({ [field]: value });
  };

  return (
    <div className="p-6 max-w-screen-lg mx-auto">
      <TourCancellationTerms 
        value={formData?.cancellationPolicy || ''}
        onChange={(val) => updateFormData("cancellationPolicy", val)}
      />
      <PaymentMethodSelector 
        selectedMethods={formData?.paymentMethods || []}
        onChange={(methods) => updateFormData("paymentMethods", methods)}      
      />
      <NumberOfParticipants 
        minValue={formData?.minGroupSize || ''}
        maxValue={formData?.maxGroupSize || ''}
        onMinChange={(val) => updateFormData("minGroupSize", val)}
        onMaxChange={(val) => updateFormData("maxGroupSize", val)}
      />
    </div>
  );
};

export default BookingDetailsForm;