import React from "react";
import TourCancellationTerms from "../Booking/components/TourCancellationTerms";
import NumberOfParticipants from "../Booking/components/NumberOfParticipants";
import PaymentMethodSelector from "../Booking/components/TourPaymentMode";
import { Box } from "@mui/material";

const BookingDetailsForm = ({ formData, setFormData }) => {
  const updateFormData = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Box
      sx={{
        px: { xs: 2, md: 6 },
        py: 4,
        maxWidth: "1000px",
        mx: "auto",
      }}
    >
      <TourCancellationTerms
        value={formData?.cancellationPolicy || ""}
        onChange={(val) => updateFormData("cancellationPolicy", val)}
      />

      <PaymentMethodSelector
        selectedMethods={formData?.paymentMethods || []}
        onChange={(methods) => updateFormData("paymentMethods", methods)}
      />

      <NumberOfParticipants
        minValue={formData?.minGroupSize || ""}
        maxValue={formData?.maxGroupSize || ""}
        onMinChange={(val) => updateFormData("minGroupSize", val)}
        onMaxChange={(val) => updateFormData("maxGroupSize", val)}
      />
    </Box>
  );
};

export default BookingDetailsForm;
