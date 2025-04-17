import React, {useState} from "react";
import Requirements from "./Requirements";
import TourOperatorContactFormCard from "./TourOperatorContactFormCard";
import TourTags from "./TourTags";

const AdditionalInformationForm = ({ formData, setFormData }) => {
  const [requirements, setRequirements] = useState(formData.requirements || "");
  const [contact, setContact] = useState(formData.contact || { name: "", phone: "", email: ""});
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
    <div className="p-6 max-w-screen-lg mx-auto">
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
    </div>
  );
};  

export default AdditionalInformationForm;