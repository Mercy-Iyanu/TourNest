import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Button,
  Typography,
  Box,
  Stepper,
  Step,
  StepLabel,
  LinearProgress,
} from "@mui/material";
import { Formik, Form } from "formik";
import { toast } from "react-toastify";

import { uploadMedia } from "../services/common/uploadService";
import axios from "../../api/api";
import { tourFormConfig } from "../../config/formConfig";
import { mapApiToFormik } from "../../utils/mapApiToFormik";
import { getPackageById, updatePackage } from "../../api/packageApi";

import BasicInfoSection from "./BasicInfoSection";
import ItinerarySection from "./ItinerarySection";
import MediaUploadSection from "./MediaUploadSection";
import AvailabilitySection from "./AvailabilitySection";
import AdditionalInfoSection from "./AdditionalInfoSection";
import ConfirmationDialog from "../ui/ConfirmationDialog";
import PricingSection from "./PricingSection";

const TourPackageForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  const [initialValues, setInitialValues] = useState(
    tourFormConfig.initialValues
  );
  const [loading, setLoading] = useState(isEdit);

  const [uploading, setUploading] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [formValues, setFormValues] = useState(null);

  const [confirmBackOpen, setConfirmBackOpen] = useState(false);

  const steps = [
    "Basic Info",
    "Itinerary",
    "Pricing",
    "Availability",
    "Media",
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
      toast.info(isEdit ? "Updating package..." : "Submitting package...");

      const res = isEdit
        ? await updatePackage(id, formValues)
        : await axios.post("/api/packages", formValues);

      toast.success(
        isEdit
          ? "Tour package updated successfully!"
          : "Tour package created successfully!"
      );

      navigate("/owner-dashboard");
    } catch (err) {
      const message =
        err?.response?.data?.message || "Submission failed. Please try again.";
      toast.error(message);
      console.error(err);
    }
  };

  useEffect(() => {
    if (isEdit) {
      getPackageById(id)
        .then((res) => {
          const formatted = mapApiToFormik(res.data);
          setInitialValues(formatted);
        })
        .catch((err) => {
          toast.error("Failed to load package");
          console.error(err);
        })
        .finally(() => setLoading(false));
    }
  }, [id]);

  if (loading) {
    return <Typography>Loading package data...</Typography>;
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={tourFormConfig.validationSchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ values, errors, touched, dirty }) => (
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
          <Button
            onClick={() => {
              if (dirty) {
                setConfirmBackOpen(true);
              } else {
                navigate(-1);
              }
            }}
            sx={{ mb: 2 }}
          >
            ← Back
          </Button>
          <Typography variant="h5" mb={2}>
            {isEdit ? "Edit Tour Package" : "Create Tour Package"}
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
              {activeStep === 2 && <PricingSection />}
              {activeStep === 3 && <AvailabilitySection />}
              {activeStep === 4 && (
                <MediaUploadSection handleMediaUpload={handleMediaUpload} />
              )}

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
                      setTimeout(() => handleSubmit(values), 0);
                    } else {
                      setTimeout(() => setActiveStep((prev) => prev + 1), 0);
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
            title="Confirm Submission"
            description="Are you sure you want to submit this tour package? This action will save it to the database."
            confirmText="Yes, Submit"
            confirmColor="primary"
          />
          <ConfirmationDialog
            open={confirmBackOpen}
            onCancel={() => setConfirmBackOpen(false)}
            onConfirm={() => navigate(-1)}
            title="Discard Changes?"
            description="Are you sure you want to go back? Any unsaved changes will be lost."
            confirmText="Yes, Go Back"
            confirmColor="warning"
          />
        </>
      )}
    </Formik>
  );
};

export default TourPackageForm;
