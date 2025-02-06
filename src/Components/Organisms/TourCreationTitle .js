import React from 'react';
import CancelButton from '../Atoms/CancelButton';

const TourCreationTitle = () => {
  return (
    <div className="flex justify-between items-center p-4 bg-gray-100 rounded-lg shadow-md">
      {/* Left Side: Title and Summary */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-800">Create Tour Package</h1>
        <p className="text-sm text-gray-600 mt-1">
          Fill in the details to create a new tour package. Ensure all information is accurate before submission.
        </p>
      </div>

      {/* Right Side: Cancel Package Button */}
      <CancelButton text="Cancel Package" onClick={() => alert('Package creation canceled!')} />
    </div>
  );
};

export default TourCreationTitle;
