import React, { useState } from "react";
import {
  Button,
  Typography,
  Box,
  Stepper,
  Step,
  StepLabel,
  MobileStepper,
  LinearProgress,
} from "@mui/material";
import { Formik, Form } from "formik";
import { uploadMedia } from "../services/common/uploadService";
import axios from "../../features/tourPackage/services/api";
import { toast } from "react-toastify";
import { tourFormConfig } from "../../config/formConfig";
import BasicInfoSection from "./BasicInfoSection";
import ItinerarySection from "./ItinerarySection";
import MediaUploadSection from "./MediaUploadSection";
import AvailabilitySection from "./AvailabilitySection";
import BookingSection from "./BookingSection";
import AdditionalInfoSection from "./AdditionalInfoSection";
import ConfirmationDialog from "./ConfirmationDialog";

const TourPackageForm = () => {
  const [uploading, setUploading] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [formValues, setFormValues] = useState(null);
  const steps = [
    "Basic Info",
    "Itinerary",
    "Media",
    "Availability",
    "Booking",
    "Additional Info",
  ];
  const [activeStep, setActiveStep] = useState(0);

  const handleMediaUpload = async (files, setProgress) => {
    return await uploadMedia(files, setProgress);
  };

  const handleSubmit = async (values) => {
    console.log("Submitting form...", values);
    setFormValues(values);
    setConfirmOpen(true);
  };

  const handleConfirmSubmit = async () => {
    setConfirmOpen(false);
    try {
      toast.info("Submitting package...");
      const res = await axios.post("/api/packages", formValues);
      toast.success("Tour package created successfully!");
    } catch (err) {
      const message =
        err?.response?.data?.message || "Submission failed. Please try again.";
      toast.error(message);
      console.error(err);
    }
  };

  return (
    <Formik
      initialValues={tourFormConfig.initialValues}
      validationSchema={tourFormConfig.validationSchema}
      onSubmit={handleSubmit}
    >
      {({
        values,
        handleChange,
        setFieldValue,
        errors,
        touched,
        resetForm,
      }) => (
        <>
          {uploading && (
            <LinearProgress
              sx={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                zIndex: 9999,
              }}
            />
          )}
          <Typography variant="h5" mb={2}>
            Create Tour Package
          </Typography>
          <Stepper activeStep={activeStep}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <Box mt={2}>
            {Object.keys(errors).length > 0 && (
              <Typography color="error" variant="body2">
                Please correct the errors highlighted in the form.
              </Typography>
            )}
          </Box>
          <Form>
            <Box sx={{ p: 3 }}>
              {activeStep === 0 && <BasicInfoSection />}
              {activeStep === 1 && <ItinerarySection />}
              {activeStep === 2 && (
                <MediaUploadSection handleMediaUpload={handleMediaUpload} />
              )}
              {activeStep === 3 && <AvailabilitySection />}
              {activeStep === 4 && <BookingSection />}
              {activeStep === 5 && <AdditionalInfoSection />}

              <Box display="flex" justifyContent="space-between" mt={4}>
                <Button
                  disabled={activeStep === 0}
                  onClick={() => setActiveStep((prev) => prev - 1)}
                >
                  Back
                </Button>
                <Button
                  variant="contained"
                  onClick={() => {
                    if (activeStep === steps.length - 1) {
                      handleSubmit(values);
                    } else {
                      setActiveStep((prev) => prev + 1);
                    }
                  }}
                >
                  {activeStep === steps.length - 1 ? "Submit" : "Next"}
                </Button>
              </Box>
            </Box>
          </Form>
          <ConfirmationDialog
            open={confirmOpen}
            onCancel={() => setConfirmOpen(false)}
            onConfirm={handleConfirmSubmit}
          />
        </>
      )}
    </Formik>
  );
};

export default TourPackageForm;
