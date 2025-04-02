import React, { useState } from "react";
import TourNameField from "./TourNameField";
import TourDescriptionField from "./TourDescriptionField";
import TourType from "./TourType";
import TourLocationDuration from "./TourLocationDuration";

const TourInformationForm = () => {

  return (
    <div className="p-6 max-w-screen-lg mx-auto">
      <TourNameField />
      <TourDescriptionField />
      <TourType />
      <TourLocationDuration />
    </div>
  );
};

export default TourInformationForm;
