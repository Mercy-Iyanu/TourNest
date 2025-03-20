import React, {useState} from "react";
import { FaArrowRight } from "react-icons/fa";
import Requirements from "./Requirements";
import TourOperatorContactFormCard from "./TourOperatorContactFormCard";
import TourTags from "./TourTags";
import Button from "../shared/Button";

const AdditionalInformationForm = () => {
    const [selectedTags, setSelectedTags] = useState([]);

  return (
    <div className="p-6 space-y-8 max-w-9xl mx-auto">
      <Requirements />

      <TourOperatorContactFormCard />

      <TourTags onTagsChange={setSelectedTags} />
    </div>
  );
};

export default AdditionalInformationForm;