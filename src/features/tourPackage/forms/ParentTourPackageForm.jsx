import React, { useState } from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import StepIndicator from "../../tourPackage/ui/StepIndicator";
import FormNavigation from "../../tourPackage/ui/FormNavigation";
import TourItineraryForm from "../../tourPackage/forms/StepForms/Itinerary/TourItineraryForm";
import BookingDetailsForm from "../../tourPackage/forms/StepForms/Booking/BookingDetailsForm";
import MediaAssetsForm from "../../tourPackage/forms/StepForms/MediaAssets/MediaAssetsForm";
import TourPricingForm from "../../tourPackage/forms/StepForms/Pricing/TourPricingForm";
import TourInformationForm from "../../tourPackage/forms/StepForms/BasicInfo/TourInformationForm";
import AdditionalInformationForm from "../../tourPackage/forms/StepForms/Additional/AdditionalInformationForm";
import PackageSummaryPreview from "../pages/PackageSummaryPreview";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { Box } from "@mui/material";

const steps = [
  "Basic tour information",
  "Itinerary details",
  "Pricing and availability",
  "Booking details",
  "Media and assets",
  "Additional information",
];

const ParentTourPackageForm = () => {
  const [formData, setFormData] = useState({
    basicInfo: {
      tour_name: "",
      description: "",
      tour_type: "",
      country: "",
      state: "",
      city: "",
      duration: "",
    },
    itinerary: {
      day: "",
      title: "",
      description: "",
      location: "",
      startTime: null,
      endTime: null,
    },
    pricing: {
      pricePerPerson: "",
      currency: "",
      discount: {
        discountType: "",
        discountValue: "",
        minGroupSize: "",
        startDate: "",
        endDate: "",
      },
      availability: [
        {
          start_date: "",
          end_date: "",
          is_available: true,
          max_guests: "",
        },
      ],
    },
    booking: {
      cancellationPolicy: "",
      paymentMethods: [],
      minGroupSize: "",
      maxGroupSize: "",
    },
    media: {
      tourImages: [],
      tourVideos: [],
      additionalFiles: [],
    },
    additional: {
      requirements: "",
      contact: {
        name: "",
        phone: "",
        email: "",
      },
      tags: [],
    },
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") return;
    setOpenSnackbar(false);
  };

  const [showSummary, setShowSummary] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = steps.length;
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  const nextStep = () =>
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));
  const goToStep = (step) => setCurrentStep(step);

  const user = JSON.parse(localStorage.getItem("authUser"));

  const handleSubmit = async () => {
    console.log("Final Form Data:", formData);
    const newId = Date.now().toString();

    const tablePackage = {
      id: newId,
      name: formData.basicInfo.tour_name,
      location: `${formData.basicInfo.city}, ${formData.basicInfo.state}, ${formData.basicInfo.country}`,
      duration: formData.basicInfo.duration,
      price: `${formData.pricing.currency}${formData.pricing.pricePerPerson}`,
      status: `${formData.is_available}`,
    };

    const fullPackage = {
      id: newId,
      ...formData,
      createdBy: user._id,
    };

    const existingPackages =
      JSON.parse(localStorage.getItem("tourPackages")) || [];
    localStorage.setItem(
      "tourPackages",
      JSON.stringify([...existingPackages, tablePackage])
    );

    const existingFullPackages =
      JSON.parse(localStorage.getItem("fullTourPackages")) || [];
    localStorage.setItem(
      "fullTourPackages",
      JSON.stringify({
        ...existingFullPackages,
        [newId]: fullPackage,
      })
    );

    try {
      const response = await fetch("http://localhost:5000/api/packages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(fullPackage),
      });

      if (!response.ok) {
        throw new Error("Failed to submit package to server");
      }

      console.log("Package submitted to API successfully");
    } catch (error) {
      console.error("API submission error:", error);
    }

    setOpenSnackbar(true);

    setTimeout(() => {
      navigate("/");
    }, 1500);
  };

  const renderFormStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <TourInformationForm
            formData={formData.basicInfo}
            setFormData={(newData) =>
              setFormData((prev) => ({
                ...prev,
                basicInfo: { ...prev.basicInfo, ...newData },
              }))
            }
          />
        );
      case 2:
        return (
          <TourItineraryForm
            formData={formData.itinerary}
            setFormData={(newData) =>
              setFormData((prev) => ({
                ...prev,
                itinerary: { ...prev.itinerary, ...newData },
              }))
            }
          />
        );
      case 3:
        return (
          <TourPricingForm
            formData={formData.pricing}
            setFormData={(newData) =>
              setFormData((prev) => ({
                ...prev,
                pricing: { ...prev.pricing, ...newData },
              }))
            }
          />
        );
      case 4:
        return (
          <BookingDetailsForm
            formData={formData.booking}
            setFormData={(newData) =>
              setFormData((prev) => ({
                ...prev,
                booking: { ...prev.booking, ...newData },
              }))
            }
          />
        );
      case 5:
        return (
          <MediaAssetsForm
            formData={formData.media}
            setFormData={(newData) =>
              setFormData((prev) => ({
                ...prev,
                media: { ...prev.media, ...newData },
              }))
            }
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
        <PackageSummaryPreview
          formData={formData}
          onBack={() => setShowSummary(false)}
        />
      ) : (
        <Box sx={{ p: { xs: 2, md: 4 } }}>
          <Typography variant="h5" fontWeight={600} mb={3}>
            Create Tour Package
          </Typography>
          <Breadcrumbs aria-label="breadcrumb">
            <Link
              underline="hover"
              color="primary"
              onClick={() => handleNavigation("/")}
              sx={{ cursor: "pointer" }}
            >
              Dashboard
            </Link>
            <Typography color="text.primary">Create Package</Typography>
          </Breadcrumbs>

          <StepIndicator
            currentStep={currentStep}
            steps={steps}
            onStepClick={goToStep}
          />
          {renderFormStep()}
          <FormNavigation
            currentStep={currentStep}
            totalSteps={totalSteps}
            onNext={nextStep}
            onPrevious={prevStep}
            onSubmit={handleSubmit}
          />
        </Box>
      )}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <MuiAlert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{ width: "100%" }}
          elevation={6}
          variant="filled"
        >
          Package Created Successfully!
        </MuiAlert>
      </Snackbar>
    </>
  );
};

export default ParentTourPackageForm;
