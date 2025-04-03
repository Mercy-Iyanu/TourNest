import React, {useState} from "react";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import StepIndicator from "./shared/StepIndicator";
import TourInformationForm from './basic-tour-info/TourInformationForm';
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
    const navigate = useNavigate();

    const handleNavigation = (path) => {
    navigate(path);
    };

    const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
    const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));
    const goToStep = (step) => setCurrentStep(step);

    const handleSubmit = () => {
        console.log("Final Form Data:", formData);
        alert("Package Created Successfully!");
    };

    const renderFormStep = () => {
        switch (currentStep) {
            case 1:
                return <TourInformationForm />;
            case 2:
                return <TourItineraryForm />;
            case 3:
                return <TourPricingForm />;
            case 4:
                return <BookingDetailsForm />;
            case 5:
                return <MediaAssetsForm />;
            case 6:
                return <AdditionalInformationForm />;  
            default:
                return <TourInformationForm />;
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Create Tour Package</h2>
            <Breadcrumbs aria-label="breadcrumb">
                <Link underline="hover" className="text-blue" onClick={() => handleNavigation('/')}>
                    Dashboard
                </Link>
                <Typography>Create Package</Typography>
            </Breadcrumbs>
          <StepIndicator currentStep={currentStep} steps={steps} onStepClick={goToStep} />
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