import React from "react";
import TourCostPerPerson from "./components/TourCostPerPerson";
import TourDiscountCardList from "./components/TourDiscountCardList";
import TourDateDuration from "./components/TourDateDuration";
import TourCurrencyDropdown from "./components/TourCurrencyDropdown";
import { Box } from "@mui/material";

/**
 * Handles pricing form inputs including price, currency, discounts, and availability.
 */
const TourPricingForm = ({ formData, setFormData }) => {
  const updateField = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const updateDiscount = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      discount: {
        ...prev.discount,
        [field]: value,
      },
    }));
  };

  const updateAvailability = (value) => {
    setFormData((prev) => ({
      ...prev,
      availability: value,
    }));
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
      <TourCostPerPerson
        value={formData?.pricePerPerson || ""}
        onChange={(val) => updateField("pricePerPerson", val)}
      />

      <TourCurrencyDropdown
        currency={formData?.currency || ""}
        onChange={(val) => updateField("currency", val)}
      />

      <TourDiscountCardList
        data={formData?.discount || {}}
        onChange={updateDiscount}
      />

      <TourDateDuration
        availability={formData?.availability || []}
        onChange={updateAvailability}
      />
    </Box>
  );
};

export default TourPricingForm;
