import React from "react";
import { Box } from "@mui/material";
import TourNameField from "./components/TourNameField";
import TourDescriptionField from "./components/TourDescriptionField";
import TourType from "./components/TourType";
import TourLocationDuration from "./components/TourLocationDuration";

const TourInformationForm = ({ formData, setFormData }) => {
  return (
    <Box
      sx={{
        px: { xs: 2, md: 6 },
        py: 4,
        maxWidth: "1000px",
        mx: "auto",
      }}
    >
      <TourNameField
        value={formData.tour_name}
        onChange={(value) => setFormData({ ...formData, tour_name: value })}
      />
      <TourDescriptionField
        value={formData.description}
        onChange={(value) => setFormData({ ...formData, description: value })}
      />
      <TourType
        value={formData.tour_type}
        onChange={(value) => setFormData({ ...formData, tour_type: value })}
      />
      <TourLocationDuration
        locationData={formData}
        setLocationData={(updates) => setFormData({ ...formData, ...updates })}
      />
    </Box>
  );
};

export default TourInformationForm;
