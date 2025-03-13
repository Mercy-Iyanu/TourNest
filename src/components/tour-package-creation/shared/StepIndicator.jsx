import React from "react";

const StepIndicator = ({ currentStep, steps }) => {
    return (
      <div className="flex items-center space-x-4 mb-6">
        {steps.map((step, index) => {
          const isActive = currentStep === index + 1;
          return (
            <div key={index} className="flex items-center">
              <div
                className={`px-4 py-2 rounded-lg text-sm font-semibold ${
                  isActive ? "bg-green-600 text-white" : "bg-gray-300 text-gray-700"
                }`}
              >
                {step}
              </div>
              {index < steps.length - 1 && <span className="mx-2 text-gray-500">→</span>}
            </div>
          );
        })}
      </div>
    );
  };
  
  export default StepIndicator;