import React from "react";
import { FaArrowRight } from "react-icons/fa";
import TourNameField from "../Molecules/TourNameField ";
import TourDescriptionField from "./TourDescriptionField";
import TourCardList from "./TourCardList";
import TourLocationDuration from "./TourLocationDuration";
import Button from "../Atoms/Button";

const TourInformationForm = () => {
  return (
    <div className="p-6 space-y-8 max-w-9xl mx-auto">
      <TourNameField />

      <TourDescriptionField />

      <TourCardList />

      <TourLocationDuration />

      <div className="flex justify-end mt-6">
        <Button
          text={
            <span className="flex items-center space-x-2">
              <span>Next</span>
              <FaArrowRight />
            </span>
          }
          className="bg-[#1D777D] text-white hover:bg-[#145b5f] px-6 py-3"
        />
      </div>
    </div>
  );
};

export default TourInformationForm;
