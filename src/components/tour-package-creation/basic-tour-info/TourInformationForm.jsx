import React, { useState } from "react";
import TourNameField from "./TourNameField";
import TourDescriptionField from "./TourDescriptionField";
import TourType from "./TourType";
import TourLocationDuration from "./TourLocationDuration";

const TourInformationForm = ({ formData, setFormData }) => {

  return (
    <div className="p-6 max-w-screen-lg mx-auto">
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
    </div>
  );
};

export default TourInformationForm;
