import React, { useState } from "react";
import TourNameField from "./TourNameField";
import TourDescriptionField from "./TourDescriptionField";
import TourCardList from "./type-of-tour/TourCardList"
import TourLocationDuration from "./location-duration/TourLocationDuration";
import Button from "../shared/Button";
import { FaArrowRight } from "react-icons/fa";

const TourInformationForm = ({ formData, updateFormData }) => {
  const [errors, setErrors] = useState({});
  const validateForm = () => {
    let newErrors = {};

    if (!formData.tourName || formData.tourName.trim() === "") {
      newErrors.tourName = "Tour name is required.";
    }
    if (!formData.tourDescription || formData.tourDescription.trim() === "") {
      newErrors.tourDescription = "Tour description is required.";
    }
    if (!formData.tourType) {
      newErrors.tourType = "Please select a tour type.";
    }
    if (!formData.country) {
      newErrors.country = "Please select a country.";
    }
    if (!formData.state) {
      newErrors.state = "Please select a state.";
    }
    if (!formData.duration) {
      newErrors.duration = "Tour duration is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      console.log("Form is valid, proceed to next step.");
    } else {
      console.log("Form has errors.");
    }
  };

  return (
    <div className="p-6 space-y-8 max-w-9xl mx-auto">
      <TourNameField formData={formData} updateFormData={updateFormData} error={errors.tourName} />

      <TourDescriptionField formData={formData} updateFormData={updateFormData} error={errors.tourDescription} />

      <TourCardList formData={formData} updateFormData={updateFormData} error={errors.tourType} />

      <TourLocationDuration formData={formData} updateFormData={updateFormData} error={errors} />

      <div className="flex justify-end">
        <Button onClick={handleNext} disabled={Object.keys(errors).length > 0}>
          Next <FaArrowRight className="ml-2" />
        </Button>
      </div>

      {Object.keys(errors).length > 0 && (
        <div className="text-red-500 text-sm mt-2">
          Please fill all required fields before proceeding.
        </div>
      )}
    </div>
  );
};

export default TourInformationForm;