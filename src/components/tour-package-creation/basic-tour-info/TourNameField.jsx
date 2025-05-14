import React from 'react';

const TourNameField = ({ value, onChange }) => {
  return (
    <div className="mb-6 md:mb-8">
      <label htmlFor="tourName" className="block text-sm font-medium text-gray-700 mb-2">
        Name of the Tour <span className="text-red-500">*</span>
      </label>
      <input
        type="text"
        id="tourName"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="e.g. Obudu Ranch"
        required
        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
      />
    </div>
  );
};

export default TourNameField;