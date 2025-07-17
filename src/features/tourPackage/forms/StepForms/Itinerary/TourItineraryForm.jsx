import React from "react";
import TourDayNumber from "./components/TourDayNumber";
import TourActivityTitle from "./components/TourActivityTitle";
import TourActivityDescription from "./components/TourActivityDescription";
import TourItineraryTime from "./components/TourItineraryTime";
import { Box } from "@mui/material";

const TourItineraryForm = ({ formData, setFormData }) => {
  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
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
      <TourDayNumber
        value={formData?.day || ""}
        onChange={(val) => handleChange("day", val)}
      />
      <TourActivityTitle
        value={formData?.title || ""}
        onChange={(val) => handleChange("title", val)}
      />
      <TourActivityDescription
        value={formData?.description || ""}
        onChange={(val) => handleChange("description", val)}
      />
      <TourItineraryTime
        location={formData?.location || ""}
        startTime={formData?.startTime || ""}
        endTime={formData?.endTime || ""}
        onChange={(field, val) => handleChange(field, val)}
      />
    </Box>
  );
};

export default TourItineraryForm;
