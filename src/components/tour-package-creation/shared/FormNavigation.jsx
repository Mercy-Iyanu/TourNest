import { Button } from "@mui/material";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const FormNavigation = ({ currentStep, totalSteps, onNext, onPrevious, onSubmit }) => {
  return (
    <div className="sticky bottom-0 left-0 w-full bg-white shadow-md py-3 mb-4">
      <div className="max-w-screen-lg mx-auto flex justify-center space-x-4">
        {currentStep > 1 && (
          <Button
            onClick={onPrevious}
            variant="contained"
            color="secondary"
            className="flex items-center space-x-2 bg-gray-500 hover:bg-gray-600"
          >
            <FaArrowLeft />
            <span>Previous</span>
          </Button>
        )}

        {currentStep < totalSteps ? (
          <Button
            onClick={onNext}
            variant="contained"
            className="flex items-center space-x-2 bg-[#1D777D] hover:bg-[#145b5f]"
          >
            <span>Next</span>
            <FaArrowRight />
          </Button>
        ) : (
          <Button
            onClick={onSubmit}
            variant="contained"
            color="success"
            className="bg-green-600 hover:bg-green-700"
          >
            Create Package
          </Button>
        )}
      </div>
    </div>
  );
};

export default FormNavigation;
