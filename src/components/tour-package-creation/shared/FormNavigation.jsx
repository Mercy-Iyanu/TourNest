import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const FormNavigation = ({ currentStep, totalSteps, onNext, onPrevious, onSubmit }) => {
  return (
    <div className="flex justify-between mt-6">
      {currentStep > 1 && (
        <button
          onClick={onPrevious}
          className="bg-gray-500 text-white hover:bg-gray-600 px-6 py-3 rounded-lg flex items-center space-x-2"
        >
          <FaArrowLeft />
          <span>Previous</span>
        </button>
      )}

      {currentStep < totalSteps ? (
        <button
          onClick={onNext}
          className="bg-[#1D777D] text-white hover:bg-[#145b5f] px-6 py-3 rounded-lg flex items-center space-x-2"
        >
          <span>Next</span>
          <FaArrowRight />
        </button>
      ) : (
        <button
          onClick={onSubmit}
          className="bg-green-600 text-white hover:bg-green-700 px-6 py-3 rounded-lg"
        >
          Create Package
        </button>
      )}
    </div>
  );
};

export default FormNavigation;