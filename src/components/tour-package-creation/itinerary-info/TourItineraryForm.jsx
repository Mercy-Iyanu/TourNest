import React, { useState } from "react";
import TourDayNumber from "./TourDayNumber";
import TourActivityTitle from "./TourActivityTitle";
import TourActivityDescription from "./TourActivityDescription";
import TourItineraryTime from "./TourItineraryTime";

const TourItineraryForm = ({ formData, setFormData }) => {

  const handleChange = (field, value) => {
    setFormData({ [field]: value });
  };

  return (
    <div className="p-6 max-w-screen-lg mx-auto">
        <TourDayNumber 
          value={formData?.day || ''} 
          onChange={(val) => handleChange('day', val)}
        />
        <TourActivityTitle 
          value={formData?.title || ''} 
          onChange={(val) => handleChange('title', val)}
        />
        <TourActivityDescription 
          value={formData?.description || ''} 
          onChange={(val) => handleChange('description', val)}
        />
        <TourItineraryTime 
          location={formData?.location || ''}
          startTime={formData?.startTime || ''}
          endTime={formData?.endTime || ''}
          onChange={(field, val) => handleChange(field, val)}
        />
    </div>
  );
};

export default TourItineraryForm;