import React, {useState} from "react";
import Requirements from "./Requirements";
import TourOperatorContactFormCard from "./TourOperatorContactFormCard";
import TourTags from "./TourTags";

const AdditionalInformationForm = () => {
    const [selectedTags, setSelectedTags] = useState([]);

  return (
    <div className="p-6 max-w-screen-lg mx-auto">
      <Requirements />
      <TourOperatorContactFormCard />
      <TourTags />
    </div>
  );
};

export default AdditionalInformationForm;