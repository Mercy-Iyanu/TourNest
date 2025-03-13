import React, {useState} from "react";
import StepIndicator from "./shared/StepIndicator";
import TourInformation from './basic-tour-info/TourInformationForm';
import FormNavigation from './shared/FormNavigation';
import TourItineraryForm from './itinerary-info/TourItineraryForm';
import TourPricingForm from './pricing-availability/TourPricingForm';
import BookingDetailsForm from './booking-details/BookingDetailsForm';
import MediaAssetsForm from './media-assets/MediaAssetsForm';
import AdditionalInformationForm from './additional-information/AdditionalInformationForm';

const steps = ['Basic tour information', 'Itinerary details', 'Pricing and availability', 'Booking details', 'Media and assets', 'Additional information'];

const ParentTourPackageForm = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const totalSteps = steps.length;

    const [formData, setFormData] = useState({
        packageName: "",
        destination: "",
        itinerary: "",
        price: "",
        booking: "",
        media: "",
        additionalInformation: ""
    });

    const updateFormData = (field, value) => {
        setFormData((prevData) => ({
          ...prevData,
          [field]: value,
        }));
    };

    const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
    const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

    const handleSubmit = () => {
        console.log("Final Form Data:", formData);
        alert("Package Created Successfully!");
    };

    const renderFormStep = () => {
        switch (currentStep) {
            case 1:
                return <TourInformation formData={formData} updateFormData={updateFormData} />;
            case 2:
                return <TourItineraryForm formData={formData} updateFormData={updateFormData} />;
            case 3:
                return <TourPricingForm formData={formData} updateFormData={updateFormData} />;
            case 4:
                return <BookingDetailsForm formData={formData} updateFormData={updateFormData} />;
            case 5:
                return <MediaAssetsForm formData={formData} updateFormData={updateFormData} />;
            case 6:
                return <AdditionalInformationForm formData={formData} updateFormData={updateFormData} />;  
            default:
                return <TourInformation formData={formData} updateFormData={updateFormData} />;
        }
    };

    return (
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Create Tour Package</h2>
          <StepIndicator currentStep={currentStep} steps={steps} />
          {renderFormStep()}
          <FormNavigation
            currentStep={currentStep}
            totalSteps={totalSteps}
            onNext={nextStep}
            onPrevious={prevStep}
            onSubmit={handleSubmit}
          />
        </div>
    );
};

export default ParentTourPackageForm;