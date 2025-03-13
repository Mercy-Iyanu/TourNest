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
        <Button
        text={
            <span className="flex items-center space-x-2">
            <FaArrowLeft />
            <span>Previous</span>
            </span>
        }
        className="bg-gray-500 text-white hover:bg-gray-600 px-6 py-3 rounded-lg"
        />
        
        <Button
        text={
            <span className="flex items-center space-x-2">
            <span>Next</span>
            <FaArrowRight />
            </span>
        }
        className="bg-[#1D777D] text-white hover:bg-[#145b5f] px-6 py-3 rounded-lg"
        />
        </div>
    </>
  );
};

export default BookingDetailsForm;
