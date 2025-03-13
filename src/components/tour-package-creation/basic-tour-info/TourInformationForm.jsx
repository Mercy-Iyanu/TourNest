import React from "react";
import { FaArrowRight } from "react-icons/fa";
import TourNameField from "./TourNameField";
import TourDescriptionField from "./TourDescriptionField";
import TourCardList from "./type-of-tour/TourCardList"
import TourLocationDuration from "./location-duration/TourLocationDuration";
import Button from "../shared/Button";

const TourInformationForm = ({ formData, updateFormData }) => {
  return (
    <div className="p-6 space-y-8 max-w-9xl mx-auto">
      <TourNameField formData={formData} updateFormData={updateFormData} />

      <TourDescriptionField formData={formData} updateFormData={updateFormData} />

      <TourCardList formData={formData} updateFormData={updateFormData} />

      <TourLocationDuration formData={formData} updateFormData={updateFormData} />
    </div>
  );
};

export default TourInformationForm;