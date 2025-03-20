import React from "react";
import TourCancellationTerms from "./TourCancellationTerms";
import NumberOfParticipants from "./NumberOfParticipants";
import PaymentMethodSelector from "./TourPaymentMode";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import Button from "../shared/Button";

const BookingDetailsForm = () => {
  return (
    <>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
                <TourCancellationTerms />
            </div>

            <div>
                <PaymentMethodSelector />
                <NumberOfParticipants />
            </div>

            
            </div>
            <div className="flex justify-between mt-6">
        
        </div>
    </>
  );
};

export default BookingDetailsForm;
