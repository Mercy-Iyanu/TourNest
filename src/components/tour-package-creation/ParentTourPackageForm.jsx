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
import PackageSummaryPreview from "../../pages/PackageSummaryPreview";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const steps = [
    'Basic tour information', 
    'Itinerary details', 
    'Pricing and availability', 
    'Booking details', 
    'Media and assets', 
    'Additional information'
];

const ParentTourPackageForm = () => {
    const [formData, setFormData] = useState({
        basicInfo: {
          tour_name: '',
          description: '',
          tour_type: '',
          country: '',
          state: '',
          city: '',
          duration: ''
        },
        itinerary: {
            day: '',
            title: '',
            description: '',
            location: '',
            startTime: null,
            endTime: null
        },
        pricing: {
          pricePerPerson: '',
          currency: '',
          discount: { 
            discountType: '', 
            discountValue: '', 
            minGroupSize: '', 
            startDate: '', 
            endDate: '' 
          },
          availability: [{ 
            start_date: '', 
            end_date: '', 
            is_available: true, 
            max_guests: '' 
        }]
        },
        booking: {
          cancellationPolicy: "",
          paymentMethods: [],
          minGroupSize: "",
          maxGroupSize: ""
        },
        media: {
          tourImages: [],
          tourVideos: [],
          additionalFiles: []
        },
        additional: {
          requirements: "",
          contact: { 
            name: "", 
            phone: "", 
            email: "" 
        },
          tags: []
        }
    });

    const [openSnackbar, setOpenSnackbar] = useState(false);
    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') return;
        setOpenSnackbar(false);
    };

    const [showSummary, setShowSummary] = useState(false);
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
        setOpenSnackbar(true);
        setShowSummary(true);
    };

    const renderFormStep = () => {
        switch (currentStep) {
            case 1:
                return (
                    <TourInformationForm 
                        formData={formData.basicInfo}
                        setFormData={(newData) => setFormData(prev => ({
                        ...prev,
                        basicInfo: { ...prev.basicInfo, ...newData }
                        }))}
                    />
                );
            case 2:
                return (
                    <TourItineraryForm 
                    formData={formData.itinerary} 
                    setFormData={(newData) => setFormData(prev => ({
                      ...prev,
                      itinerary: { ...prev.itinerary, ...newData }
                        }))}
                    />
                );
            case 3:
                return (
                    <TourPricingForm 
                    formData={formData.pricing}
                    setFormData={(newData) => setFormData(prev => ({
                      ...prev,
                      pricing: { ...prev.pricing, ...newData }
                        }))}
                    />
                );
            case 4:
                return (
                    <BookingDetailsForm 
                        formData={formData.booking}
                        setFormData={(newData) => setFormData(prev => ({
                        ...prev,
                        booking: { ...prev.booking, ...newData }
                        }))}
                    />
                );
            case 5:
                return (
                    <MediaAssetsForm 
                        formData={formData.media}
                        setFormData={(newData) => setFormData(prev => ({
                        ...prev,
                        media: { ...prev.media, ...newData }
                        }))}
                    />
                );
            case 6:
                return (
                    <AdditionalInformationForm 
                        formData={formData.additional}
                        setFormData={setFormData}
                    />
                ); 
            default:
                return null;
        }
    };

    return (
        <>
            {showSummary ? (
            <PackageSummaryPreview formData={formData} onBack={() => setShowSummary(false)} />
            ) : (
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
            )}
            <Snackbar 
                open={openSnackbar} 
                autoHideDuration={4000} 
                onClose={handleSnackbarClose} 
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <MuiAlert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }} elevation={6} variant="filled">
                    Package Created Successfully!
                </MuiAlert>
            </Snackbar>
        </>
    );
};

export default ParentTourPackageForm;