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

      <div className="flex justify-end mt-6">
        <Button
          text={
            <span className="flex items-center space-x-2">
              <span>Create Package</span>
              <FaArrowRight />
            </span>
          }
          className="bg-[#1D777D] text-white hover:bg-[#145b5f] px-6 py-3"
        />
      </div>
    </div>
  );
};

export default AdditionalInformationForm;