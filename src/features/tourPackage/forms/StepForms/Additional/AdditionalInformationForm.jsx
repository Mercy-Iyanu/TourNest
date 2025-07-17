import React, { useState } from "react";
import { Box } from "@mui/material";
import Requirements from "../Additional/components/Requirements";
import TourOperatorContactFormCard from "../Additional/components/TourOperatorContactFormCard";
import TourTags from "../Additional/components/TourTags";

const AdditionalInformationForm = ({ formData, setFormData }) => {
  const [requirements, setRequirements] = useState(formData.requirements || "");
  const [contact, setContact] = useState(
    formData.contact || { name: "", phone: "", email: "" }
  );
  const [selectedTags, setSelectedTags] = useState(formData.tags || []);

  const handleContactChange = (event) => {
    const { name, value } = event.target;
    setContact((prev) => {
      const updatedContact = { ...prev, [name]: value };
      setFormData((prevData) => ({
        ...prevData,
        additional: { ...prevData.additional, contact: updatedContact },
      }));
      return updatedContact;
    });
  };

  const handleTagsChange = (newTags) => {
    setSelectedTags(newTags);
    setFormData((prevData) => ({
      ...prevData,
      additional: { ...prevData.additional, tags: newTags },
    }));
  };

  const handleRequirementsChange = (newRequirements) => {
    setRequirements(newRequirements);
    setFormData((prevData) => ({
      ...prevData,
      additional: { ...prevData.additional, requirements: newRequirements },
    }));
  };

  return (
    <Box
      sx={{
        p: { xs: 3, sm: 4 },
        maxWidth: "100%",
        width: "100%",
        mx: "auto",
        "@media(min-width: 1024px)": {
          maxWidth: "1024px",
        },
      }}
    >
      <Requirements
        requirements={requirements}
        setRequirements={handleRequirementsChange}
      />
      <TourOperatorContactFormCard
        contact={contact}
        handleChange={handleContactChange}
      />
      <TourTags
        selectedTags={selectedTags}
        setSelectedTags={handleTagsChange}
      />
    </Box>
  );
};

export default AdditionalInformationForm;
