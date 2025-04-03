import React from "react";
import TourCancellationTerms from "./TourCancellationTerms";
import NumberOfParticipants from "./NumberOfParticipants";
import PaymentMethodSelector from "./TourPaymentMode";

const BookingDetailsForm = () => {
  return (
    <div className="p-6 max-w-screen-lg mx-auto">
      <TourCancellationTerms />
      <PaymentMethodSelector />
      <NumberOfParticipants />
    </div>            
  );
};

export default BookingDetailsForm;